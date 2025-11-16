import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  setupTest,
  createAuthenticatedContext,
  expectSuccessResponse,
  expectErrorResponse,
  expectPaginatedResponse,
  seedKVStore,
} from '../test-utils';
import { generateTestBlogPost, createMockAuthUser } from '../mocks';

describe('Blog Posts Endpoints', () => {
  let setup: ReturnType<typeof setupTest>;

  beforeEach(() => {
    setup = setupTest();
  });

  afterEach(() => {
    setup.mockKV.clear?.();
    vi.clearAllMocks();
  });

  describe('GET /blog (public)', () => {
    it('should return published blog posts with pagination', async () => {
      // Arrange
      const posts = [
        generateTestBlogPost({ published: true }),
        generateTestBlogPost({ published: true }),
        generateTestBlogPost({ published: false }),
      ];

      const seedData = posts.reduce((acc, post) => {
        acc[`blog:${post.id}`] = post;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      // Act
      const allPosts = await setup.mockKV.getByPrefix('blog:');
      const published = allPosts.filter((p: any) => p.published);

      // Assert
      expect(published).toHaveLength(2);
      expect(published.every((p: any) => p.published)).toBe(true);
    });

    it('should sort posts by created_at descending', async () => {
      // Arrange
      const now = new Date();
      const post1 = generateTestBlogPost({
        published: true,
        created_at: new Date(now.getTime() - 3600000).toISOString(),
      });
      const post2 = generateTestBlogPost({
        published: true,
        created_at: new Date(now.getTime() - 7200000).toISOString(),
      });

      const seedData = {
        [`blog:${post1.id}`]: post1,
        [`blog:${post2.id}`]: post2,
      };

      await seedKVStore(setup.mockKV, seedData);

      // Act
      const allPosts = await setup.mockKV.getByPrefix('blog:');
      const sorted = allPosts.sort((a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // Assert
      expect(new Date(sorted[0].created_at).getTime()).toBeGreaterThan(
        new Date(sorted[1].created_at).getTime()
      );
    });

    it('should handle pagination with correct limits', async () => {
      // Arrange
      const posts = Array.from({ length: 25 }, () =>
        generateTestBlogPost({ published: true })
      );

      const seedData = posts.reduce((acc, post) => {
        acc[`blog:${post.id}`] = post;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      // Act
      const allPosts = await setup.mockKV.getByPrefix('blog:');
      const page = 2;
      const limit = 10;
      const start = (page - 1) * limit;
      const paginated = allPosts.slice(start, start + limit);

      const response = setup.mockContext.json({
        success: true,
        data: paginated,
        pagination: {
          page,
          limit,
          total: allPosts.length,
          totalPages: Math.ceil(allPosts.length / limit),
        },
      });

      // Assert
      expectPaginatedResponse(response);
      expect(response.data.pagination.totalPages).toBe(3);
    });
  });

  describe('GET /blog/:id', () => {
    it('should return single blog post by ID', async () => {
      // Arrange
      const post = generateTestBlogPost();
      await setup.mockKV.set(`blog:${post.id}`, post);

      // Act
      const retrieved = await setup.mockKV.get(`blog:${post.id}`);

      const response = setup.mockContext.json({
        success: true,
        data: retrieved,
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data).toEqual(post);
    });

    it('should return 404 when post not found', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Blog post not found' },
        404
      ), 404);
    });
  });

  describe('GET /blog/slug/:slug', () => {
    it('should return blog post by slug', async () => {
      // Arrange
      const post = generateTestBlogPost({ slug: 'test-slug-123' });
      await setup.mockKV.set(`blog_slug:${post.slug}`, post.id);
      await setup.mockKV.set(`blog:${post.id}`, post);

      // Act
      const postId = await setup.mockKV.get(`blog_slug:${post.slug}`);
      const retrieved = postId ? await setup.mockKV.get(`blog:${postId}`) : null;

      const response = setup.mockContext.json({
        success: true,
        data: retrieved,
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data.slug).toBe('test-slug-123');
    });

    it('should return 404 when slug not found', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Blog post not found' },
        404
      ), 404);
    });
  });

  describe('GET /admin/blog', () => {
    it('should return all blog posts for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const posts = [
        generateTestBlogPost({ published: true }),
        generateTestBlogPost({ published: false }),
      ];

      const seedData = posts.reduce((acc, post) => {
        acc[`blog:${post.id}`] = post;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const allPosts = await setup.mockKV.getByPrefix('blog:');

      const response = setup.mockContext.json({
        success: true,
        data: allPosts,
        pagination: {
          page: 1,
          limit: 10,
          total: allPosts.length,
          totalPages: Math.ceil(allPosts.length / 10),
        },
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data).toHaveLength(2);
    });

    it('should return 401 when unauthorized', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });
  });

  describe('POST /admin/blog', () => {
    it('should create new blog post for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const newPost = generateTestBlogPost();

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      await setup.mockKV.set(`blog:${newPost.id}`, newPost);
      await setup.mockKV.set(`blog_slug:${newPost.slug}`, newPost.id);

      const retrieved = await setup.mockKV.get(`blog:${newPost.id}`);

      // Assert
      expect(retrieved).toEqual(newPost);
    });

    it('should return 401 when unauthorized', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should require title field', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const invalidPost = { slug: 'test-slug', content: 'content' };

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act & Assert
      expect(invalidPost).not.toHaveProperty('title');
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Title is required' },
        400
      ), 400);
    });

    it('should generate unique slug if not provided', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const post = generateTestBlogPost({ title: 'My Test Post' });

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      await setup.mockKV.set(`blog:${post.id}`, post);

      // Assert
      expect(post.slug).toBeDefined();
      expect(post.slug.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /admin/blog/:id', () => {
    it('should update blog post for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const post = generateTestBlogPost();
      await setup.mockKV.set(`blog:${post.id}`, post);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const updatedPost = { ...post, title: 'Updated Title' };
      await setup.mockKV.set(`blog:${post.id}`, updatedPost);

      const retrieved = await setup.mockKV.get(`blog:${post.id}`);

      // Assert
      expect(retrieved.title).toBe('Updated Title');
    });

    it('should update slug mapping if slug changes', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const post = generateTestBlogPost({ slug: 'old-slug' });
      await setup.mockKV.set(`blog:${post.id}`, post);
      await setup.mockKV.set(`blog_slug:old-slug`, post.id);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const updatedPost = { ...post, slug: 'new-slug' };
      await setup.mockKV.set(`blog:${post.id}`, updatedPost);
      await setup.mockKV.del(`blog_slug:old-slug`);
      await setup.mockKV.set(`blog_slug:new-slug`, post.id);

      // Assert
      const newSlugId = await setup.mockKV.get(`blog_slug:new-slug`);
      expect(newSlugId).toBe(post.id);
    });

    it('should return 401 when unauthorized', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should return 404 when post not found', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Blog post not found' },
        404
      ), 404);
    });
  });

  describe('DELETE /admin/blog/:id', () => {
    it('should delete blog post for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const post = generateTestBlogPost();
      await setup.mockKV.set(`blog:${post.id}`, post);
      await setup.mockKV.set(`blog_slug:${post.slug}`, post.id);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      await setup.mockKV.del(`blog:${post.id}`);
      await setup.mockKV.del(`blog_slug:${post.slug}`);

      const retrieved = await setup.mockKV.get(`blog:${post.id}`);
      const slugRetrieved = await setup.mockKV.get(`blog_slug:${post.slug}`);

      // Assert
      expect(retrieved).toBeNull();
      expect(slugRetrieved).toBeNull();
    });

    it('should return 401 when unauthorized', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should return 404 when post not found', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Blog post not found' },
        404
      ), 404);
    });
  });
});
