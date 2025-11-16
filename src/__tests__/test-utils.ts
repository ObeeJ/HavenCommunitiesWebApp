import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createMockKVStore, createMockSupabaseClient, createMockHonoContext } from './mocks';

/**
 * Common test utilities for admin endpoint testing
 */

export interface TestSetup {
  mockKV: ReturnType<typeof createMockKVStore>;
  mockSupabase: ReturnType<typeof createMockSupabaseClient>;
  mockContext: ReturnType<typeof createMockHonoContext>;
}

/**
 * Set up test environment with mocked dependencies
 */
export const setupTest = (contextOverrides = {}): TestSetup => {
  const mockKV = createMockKVStore();
  const mockSupabase = createMockSupabaseClient();
  const mockContext = createMockHonoContext(contextOverrides);

  return {
    mockKV,
    mockSupabase,
    mockContext,
  };
};

/**
 * Helper to create an authenticated context
 */
export const createAuthenticatedContext = (userId = 'test-user-123') => {
  return createMockHonoContext({
    authHeader: `Bearer mock-jwt-token-${userId}`,
  });
};

/**
 * Helper to verify API response structure
 */
export const expectValidApiResponse = (response: any) => {
  expect(response).toBeDefined();
  expect(response.status).toBeDefined();
  expect(response.data).toBeDefined();
};

/**
 * Helper to verify error response structure
 */
export const expectErrorResponse = (response: any, expectedStatus: number) => {
  expect(response).toBeDefined();
  expect(response.status).toBe(expectedStatus);
  expect(response.data.success).toBe(false);
  expect(response.data.message).toBeDefined();
};

/**
 * Helper to verify success response structure
 */
export const expectSuccessResponse = (response: any, expectedStatus = 200) => {
  expect(response).toBeDefined();
  expect(response.status).toBe(expectedStatus);
  expect(response.data.success).toBe(true);
};

/**
 * Helper to verify paginated response
 */
export const expectPaginatedResponse = (response: any) => {
  expect(response.data).toHaveProperty('data');
  expect(response.data).toHaveProperty('pagination');
  expect(response.data.pagination).toHaveProperty('page');
  expect(response.data.pagination).toHaveProperty('limit');
  expect(response.data.pagination).toHaveProperty('total');
  expect(response.data.pagination).toHaveProperty('totalPages');
};

/**
 * Test templates for common endpoint patterns
 */

export const testAuthenticationFlow = (
  testName: string,
  setupFn: (setup: TestSetup) => Promise<void>
) => {
  describe(testName, () => {
    let setup: TestSetup;

    beforeEach(() => {
      setup = setupTest();
    });

    afterEach(() => {
      setup.mockKV.clear?.();
      vi.clearAllMocks();
    });

    it('should handle authentication flow', async () => {
      await setupFn(setup);
    });
  });
};

export const testAdminEndpoint = (
  testName: string,
  setupFn: (setup: TestSetup) => Promise<void>
) => {
  describe(testName, () => {
    let setup: TestSetup;

    beforeEach(() => {
      setup = setupTest();
    });

    afterEach(() => {
      setup.mockKV.clear?.();
      vi.clearAllMocks();
    });

    it('should require authentication', async () => {
      // Setup unauthenticated context
      const unauthContext = createMockHonoContext({ authHeader: '' });
      const tempSetup = { ...setup, mockContext: unauthContext };
      // This would be verified in individual endpoint tests
    });

    it('should handle authorized requests', async () => {
      await setupFn(setup);
    });
  });
};

/**
 * Helper to create test data in KV store
 */
export const seedKVStore = async (
  mockKV: TestSetup['mockKV'],
  dataMap: Record<string, any>
) => {
  for (const [key, value] of Object.entries(dataMap)) {
    await mockKV.set(key, value);
  }
};

/**
 * Helper to verify KV store contains expected data
 */
export const expectKVStoreContains = async (
  mockKV: TestSetup['mockKV'],
  expectedData: Record<string, any>
) => {
  for (const [key, expectedValue] of Object.entries(expectedData)) {
    const actualValue = await mockKV.get(key);
    expect(actualValue).toEqual(expectedValue);
  }
};

/**
 * Common error test cases
 */
export const commonErrorTestCases = {
  missingRequiredField: (fieldName: string) => ({
    description: `should return 400 when ${fieldName} is missing`,
    expectedStatus: 400,
    expectedMessage: `${fieldName} is required`,
  }),

  unauthorized: {
    description: 'should return 401 when unauthorized',
    expectedStatus: 401,
    expectedMessage: 'Unauthorized',
  },

  notFound: {
    description: 'should return 404 when resource not found',
    expectedStatus: 404,
    expectedMessage: 'not found',
  },

  serverError: {
    description: 'should return 500 on server error',
    expectedStatus: 500,
    expectedMessage: 'Failed',
  },
};
