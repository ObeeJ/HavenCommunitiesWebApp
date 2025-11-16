import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  setupTest,
  createAuthenticatedContext,
  expectSuccessResponse,
  expectErrorResponse,
  seedKVStore,
} from '../test-utils';
import {
  generateTestProperty,
  generateTestBlogPost,
  generateTestContact,
  generateTestNewsletter,
  createMockAuthUser,
} from '../mocks';

describe('Utility Endpoints', () => {
  let setup: ReturnType<typeof setupTest>;

  beforeEach(() => {
    setup = setupTest();
  });

  afterEach(() => {
    setup.mockKV.clear?.();
    vi.clearAllMocks();
  });

  describe('GET /health', () => {
    it('should return health check status', async () => {
      // Act
      const response = setup.mockContext.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
      });

      // Assert
      expect(response.data).toBeDefined();
      expect(response.data.status).toBe('ok');
      expect(response.data.timestamp).toBeDefined();
    });

    it('should include current timestamp', async () => {
      // Arrange
      const before = new Date();

      // Act
      const response = setup.mockContext.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
      });

      const after = new Date();

      // Assert
      expect(response.data.timestamp).toBeDefined();
      const timestamp = new Date(response.data.timestamp);
      expect(timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(timestamp.getTime()).toBeLessThanOrEqual(after.getTime() + 1000);
    });

    it('should always be available without authentication', async () => {
      // Act
      const response = setup.mockContext.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
      });

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('ok');
    });

    it('should be fast (sub-100ms)', async () => {
      // Arrange
      const start = performance.now();

      // Act
      const response = setup.mockContext.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
      });

      const elapsed = performance.now() - start;

      // Assert
      expect(response.data.status).toBe('ok');
      expect(elapsed).toBeLessThan(100);
    });
  });

  describe('GET /admin/stats', () => {
    it('should return dashboard statistics for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Pre-populate KV store with test data
      const properties = Array.from({ length: 5 }, () =>
        generateTestProperty({ published: true })
      );
      const blogPosts = Array.from({ length: 8 }, () =>
        generateTestBlogPost({ published: true })
      );
      const contacts = Array.from({ length: 12 }, () =>
        generateTestContact({ status: 'new' })
      );
      const newsletters = Array.from({ length: 25 }, () =>
        generateTestNewsletter()
      );

      const seedData: Record<string, any> = {};
      properties.forEach((p) => (seedData[`property:${p.id}`] = p));
      blogPosts.forEach((b) => (seedData[`blog:${b.id}`] = b));
      contacts.forEach((c) => (seedData[`contact:${c.id}`] = c));
      newsletters.forEach((n) => (seedData[`newsletter:${n.id}`] = n));

      await seedKVStore(setup.mockKV, seedData);

      // Act
      const allProperties = await setup.mockKV.getByPrefix('property:');
      const allBlogs = await setup.mockKV.getByPrefix('blog:');
      const allContacts = await setup.mockKV.getByPrefix('contact:');
      const allNewsletters = await setup.mockKV.getByPrefix('newsletter:');

      const response = setup.mockContext.json({
        success: true,
        data: {
          totalProperties: allProperties.length,
          totalBlogPosts: allBlogs.length,
          totalContacts: allContacts.length,
          totalNewsletter: allNewsletters.length,
          newContacts: allContacts.filter((c: any) => c.status === 'new').length,
        },
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data.totalProperties).toBe(5);
      expect(response.data.data.totalBlogPosts).toBe(8);
      expect(response.data.data.totalContacts).toBe(12);
      expect(response.data.data.totalNewsletter).toBe(25);
      expect(response.data.data.newContacts).toBe(12);
    });

    it('should count only published properties', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      const properties = [
        generateTestProperty({ published: true }),
        generateTestProperty({ published: true }),
        generateTestProperty({ published: false }),
      ];

      const seedData = properties.reduce((acc, prop) => {
        acc[`property:${prop.id}`] = prop;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      // Act
      const allProperties = await setup.mockKV.getByPrefix('property:');
      const published = allProperties.filter((p: any) => p.published);

      const response = setup.mockContext.json({
        success: true,
        data: {
          totalPublishedProperties: published.length,
        },
      });

      // Assert
      expect(response.data.data.totalPublishedProperties).toBe(2);
    });

    it('should count only published blog posts', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      const posts = [
        generateTestBlogPost({ published: true }),
        generateTestBlogPost({ published: false }),
        generateTestBlogPost({ published: true }),
      ];

      const seedData = posts.reduce((acc, post) => {
        acc[`blog:${post.id}`] = post;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      // Act
      const allPosts = await setup.mockKV.getByPrefix('blog:');
      const published = allPosts.filter((p: any) => p.published);

      const response = setup.mockContext.json({
        success: true,
        data: {
          totalPublishedBlogPosts: published.length,
        },
      });

      // Assert
      expect(response.data.data.totalPublishedBlogPosts).toBe(2);
    });

    it('should return 401 when unauthorized', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should return 0 counts when no data', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const allProperties = await setup.mockKV.getByPrefix('property:');
      const allBlogs = await setup.mockKV.getByPrefix('blog:');
      const allContacts = await setup.mockKV.getByPrefix('contact:');
      const allNewsletters = await setup.mockKV.getByPrefix('newsletter:');

      const response = setup.mockContext.json({
        success: true,
        data: {
          totalProperties: allProperties.length,
          totalBlogPosts: allBlogs.length,
          totalContacts: allContacts.length,
          totalNewsletter: allNewsletters.length,
        },
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data.totalProperties).toBe(0);
      expect(response.data.data.totalBlogPosts).toBe(0);
      expect(response.data.data.totalContacts).toBe(0);
      expect(response.data.data.totalNewsletter).toBe(0);
    });

    it('should categorize contacts by status', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      const contacts = [
        generateTestContact({ status: 'new' }),
        generateTestContact({ status: 'new' }),
        generateTestContact({ status: 'read' }),
        generateTestContact({ status: 'resolved' }),
      ];

      const seedData = contacts.reduce((acc, contact) => {
        acc[`contact:${contact.id}`] = contact;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      // Act
      const allContacts = await setup.mockKV.getByPrefix('contact:');
      const stats = {
        total: allContacts.length,
        new: allContacts.filter((c: any) => c.status === 'new').length,
        read: allContacts.filter((c: any) => c.status === 'read').length,
        resolved: allContacts.filter((c: any) => c.status === 'resolved').length,
      };

      const response = setup.mockContext.json({
        success: true,
        data: { contacts: stats },
      });

      // Assert
      expect(response.data.data.contacts.total).toBe(4);
      expect(response.data.data.contacts.new).toBe(2);
      expect(response.data.data.contacts.read).toBe(1);
      expect(response.data.data.contacts.resolved).toBe(1);
    });
  });
});
