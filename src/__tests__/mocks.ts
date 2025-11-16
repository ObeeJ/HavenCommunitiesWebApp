import { vi } from 'vitest';

/**
 * Mock Supabase client for testing
 */
export const createMockSupabaseClient = () => ({
  auth: {
    getUser: vi.fn(),
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
    admin: {
      createUser: vi.fn(),
    },
  },
});

/**
 * Mock KV store for testing
 */
export const createMockKVStore = () => {
  const store = new Map<string, any>();

  return {
    get: vi.fn(async (key: string) => store.get(key) || null),
    set: vi.fn(async (key: string, value: any) => {
      store.set(key, value);
      return true;
    }),
    del: vi.fn(async (key: string) => {
      return store.delete(key);
    }),
    getByPrefix: vi.fn(async (prefix: string) => {
      const results = [];
      for (const [key, value] of store.entries()) {
        if (key.startsWith(prefix)) {
          results.push(value);
        }
      }
      return results;
    }),
    clear: () => store.clear(),
    getStore: () => store,
  };
};

/**
 * Mock Hono Context for testing endpoints
 */
export const createMockHonoContext = (overrides: any = {}) => {
  const defaultContext = {
    req: {
      header: vi.fn((name: string) => {
        const headers: Record<string, string> = {
          'Authorization': overrides.authHeader || '',
          'Content-Type': 'application/json',
          ...overrides.headers,
        };
        return headers[name];
      }),
      query: vi.fn((param: string) => {
        const params: Record<string, string> = {
          page: '1',
          limit: '10',
          ...overrides.queryParams,
        };
        return params[param];
      }),
      param: vi.fn((param: string) => {
        return overrides.pathParams?.[param];
      }),
      json: vi.fn(async () => overrides.body || {}),
    },
    json: vi.fn((data: any, status?: number) => ({
      status: status || 200,
      data,
    })),
    text: vi.fn((text: string, status?: number) => ({
      status: status || 200,
      text,
    })),
  };

  return {
    ...defaultContext,
    ...overrides.customContext,
  };
};

/**
 * Test data generators
 */
export const generateTestUser = (overrides = {}) => ({
  id: 'test-user-' + Math.random().toString(36).substr(2, 9),
  email: 'test@example.com',
  password: 'TestPassword123!',
  name: 'Test User',
  role: 'admin',
  created_at: new Date().toISOString(),
  ...overrides,
});

export const generateTestProperty = (overrides = {}) => ({
  id: 'prop-' + Math.random().toString(36).substr(2, 9),
  title: 'Test Property',
  description: 'A test property description',
  location: 'Test City, Test State',
  price: 150000,
  bedrooms: 3,
  bathrooms: 2,
  published: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const generateTestBlogPost = (overrides = {}) => ({
  id: 'blog-' + Math.random().toString(36).substr(2, 9),
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  content: 'This is test blog content',
  excerpt: 'Test excerpt',
  author: 'Test Author',
  published: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const generateTestContact = (overrides = {}) => ({
  id: 'contact-' + Math.random().toString(36).substr(2, 9),
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  message: 'Test contact message',
  status: 'new',
  created_at: new Date().toISOString(),
  ...overrides,
});

export const generateTestNewsletter = (overrides = {}) => ({
  id: 'newsletter-' + Math.random().toString(36).substr(2, 9),
  email: 'subscriber@example.com',
  subscribed_at: new Date().toISOString(),
  ...overrides,
});

/**
 * Mock auth responses
 */
export const createMockAuthUser = (overrides = {}) => ({
  id: 'auth-user-' + Math.random().toString(36).substr(2, 9),
  email: 'auth@example.com',
  user_metadata: { name: 'Auth User' },
  created_at: new Date().toISOString(),
  ...overrides,
});

export const createMockAuthSession = (overrides = {}) => ({
  access_token: 'mock-access-token-' + Math.random().toString(36).substr(2, 9),
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'mock-refresh-token-' + Math.random().toString(36).substr(2, 9),
  user: createMockAuthUser(),
  ...overrides,
});
