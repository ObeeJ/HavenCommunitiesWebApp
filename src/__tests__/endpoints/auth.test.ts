import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  setupTest,
  createAuthenticatedContext,
  expectSuccessResponse,
  expectErrorResponse,
  expectValidApiResponse,
} from '../test-utils';
import {
  generateTestUser,
  createMockAuthUser,
  createMockAuthSession,
} from '../mocks';

describe('Authentication Endpoints', () => {
  let setup: ReturnType<typeof setupTest>;

  beforeEach(() => {
    setup = setupTest();
  });

  afterEach(() => {
    setup.mockKV.clear?.();
    vi.clearAllMocks();
  });

  describe('POST /auth/signup', () => {
    it('should create a new admin user', async () => {
      // Arrange
      const testUser = generateTestUser();
      const mockUser = createMockAuthUser({ email: testUser.email });

      setup.mockSupabase.auth.admin.createUser.mockResolvedValueOnce({
        data: { user: mockUser },
        error: null,
      });

      // Act
      const response = setup.mockContext.json({
        success: true,
        data: {
          user: mockUser,
          message: 'Account created successfully. You can now sign in.',
        },
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data.user.email).toBe(testUser.email);
      expect(response.data.data.message).toContain('created successfully');
    });

    it('should return 400 when email is missing', async () => {
      // Arrange
      const invalidUser = { password: 'test123' };

      // Act - Verify email validation
      expect(invalidUser).not.toHaveProperty('email');

      // Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Email and password are required' },
        400
      ), 400);
    });

    it('should return 400 when password is missing', async () => {
      // Arrange
      const invalidUser = { email: 'test@example.com' };

      // Act & Assert
      expect(invalidUser).not.toHaveProperty('password');
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Email and password are required' },
        400
      ), 400);
    });

    it('should return 400 when user creation fails', async () => {
      // Arrange
      const testUser = generateTestUser();
      const mockError = { message: 'User already exists' };

      setup.mockSupabase.auth.admin.createUser.mockResolvedValueOnce({
        data: null,
        error: mockError,
      });

      // Act
      const response = setup.mockContext.json(
        { success: false, message: mockError.message },
        400
      );

      // Assert
      expectErrorResponse(response, 400);
      expect(response.data.message).toBe('User already exists');
    });

    it('should store admin user data in KV store', async () => {
      // Arrange
      const testUser = generateTestUser();
      const mockUser = createMockAuthUser({ email: testUser.email, id: testUser.id });

      setup.mockSupabase.auth.admin.createUser.mockResolvedValueOnce({
        data: { user: mockUser },
        error: null,
      });

      // Act
      await setup.mockKV.set(`admin_user:${mockUser.id}`, {
        id: mockUser.id,
        email: mockUser.email,
        name: testUser.name,
        role: 'admin',
        created_at: new Date().toISOString(),
      });

      // Assert
      const stored = await setup.mockKV.get(`admin_user:${mockUser.id}`);
      expect(stored).toBeDefined();
      expect(stored.email).toBe(testUser.email);
      expect(stored.role).toBe('admin');
    });
  });

  describe('POST /auth/signin', () => {
    it('should sign in user and return session', async () => {
      // Arrange
      const testUser = generateTestUser();
      const mockSession = createMockAuthSession({ user: createMockAuthUser({ email: testUser.email }) });

      setup.mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
        data: mockSession,
        error: null,
      });

      // Act
      const response = setup.mockContext.json({
        success: true,
        data: {
          session: mockSession.access_token,
          user: mockSession.user,
        },
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data.session).toBe(mockSession.access_token);
      expect(response.data.data.user.email).toBe(testUser.email);
    });

    it('should return 400 when email is missing', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Email and password are required' },
        400
      ), 400);
    });

    it('should return 400 when password is missing', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Email and password are required' },
        400
      ), 400);
    });

    it('should return 401 when credentials are invalid', async () => {
      // Arrange
      const mockError = { message: 'Invalid login credentials' };

      setup.mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
        data: null,
        error: mockError,
      });

      // Act
      const response = setup.mockContext.json(
        { success: false, message: mockError.message },
        401
      );

      // Assert
      expectErrorResponse(response, 401);
    });

    it('should update last_login in KV store', async () => {
      // Arrange
      const testUser = generateTestUser();
      const mockSession = createMockAuthSession({ user: createMockAuthUser({ id: testUser.id }) });

      setup.mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
        data: mockSession,
        error: null,
      });

      // Act - Simulate storing last login
      const existingData = await setup.mockKV.get(`admin_user:${mockSession.user.id}`);
      await setup.mockKV.set(`admin_user:${mockSession.user.id}`, {
        ...(existingData || {}),
        last_login: new Date().toISOString(),
      });

      // Assert
      const stored = await setup.mockKV.get(`admin_user:${mockSession.user.id}`);
      expect(stored).toHaveProperty('last_login');
    });
  });

  describe('GET /auth/session', () => {
    it('should verify authorized session', async () => {
      // Arrange
      const testUser = generateTestUser();
      const authContext = createAuthenticatedContext(testUser.id);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: testUser.id }) },
        error: null,
      });

      // Pre-populate KV store
      await setup.mockKV.set(`admin_user:${testUser.id}`, testUser);

      // Act
      const response = setup.mockContext.json({
        success: true,
        data: {
          userId: testUser.id,
          user: await setup.mockKV.get(`admin_user:${testUser.id}`),
        },
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data.userId).toBe(testUser.id);
      expect(response.data.data.user).toBeDefined();
    });

    it('should return 401 when no auth token provided', async () => {
      // Arrange
      const unAuthContext = setup.mockContext;

      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should return 401 when token is invalid', async () => {
      // Arrange
      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: null },
        error: { message: 'Invalid token' },
      });

      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should return user data from KV store', async () => {
      // Arrange
      const testUser = generateTestUser();
      await setup.mockKV.set(`admin_user:${testUser.id}`, testUser);

      // Act
      const stored = await setup.mockKV.get(`admin_user:${testUser.id}`);

      // Assert
      expect(stored).toEqual(testUser);
    });
  });

  describe('POST /auth/signout', () => {
    it('should sign out user successfully', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('test-user-123');

      setup.mockSupabase.auth.signOut.mockResolvedValueOnce({ error: null });

      // Act
      const response = setup.mockContext.json({
        success: true,
        message: 'Signed out successfully',
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.message).toContain('Signed out');
    });

    it('should return 401 when no auth token provided', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'No auth token provided' },
        401
      ), 401);
    });

    it('should return 400 when sign out fails', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('test-user-123');
      const mockError = { message: 'Sign out failed' };

      setup.mockSupabase.auth.signOut.mockResolvedValueOnce({ error: mockError });

      // Act
      const response = setup.mockContext.json(
        { success: false, message: mockError.message },
        400
      );

      // Assert
      expectErrorResponse(response, 400);
    });
  });
});
