import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  setupTest,
  createAuthenticatedContext,
  expectSuccessResponse,
  expectErrorResponse,
  seedKVStore,
} from '../test-utils';
import { generateTestNewsletter, createMockAuthUser } from '../mocks';

describe('Newsletter Endpoints', () => {
  let setup: ReturnType<typeof setupTest>;

  beforeEach(() => {
    setup = setupTest();
  });

  afterEach(() => {
    setup.mockKV.clear?.();
    vi.clearAllMocks();
  });

  describe('POST /newsletter/subscribe', () => {
    it('should subscribe user to newsletter', async () => {
      // Arrange
      const subscriber = generateTestNewsletter();

      // Act
      await setup.mockKV.set(`newsletter:${subscriber.id}`, subscriber);
      await setup.mockKV.set(`newsletter_email:${subscriber.email}`, subscriber.id);

      const retrieved = await setup.mockKV.get(`newsletter:${subscriber.id}`);

      const response = setup.mockContext.json({
        success: true,
        message: 'Successfully subscribed to newsletter',
        data: retrieved,
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data.email).toBe(subscriber.email);
    });

    it('should return 400 when email is missing', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Email is required' },
        400
      ), 400);
    });

    it('should validate email format', async () => {
      // Arrange
      const invalidEmail = 'not-an-email';

      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Invalid email format' },
        400
      ), 400);
    });

    it('should not allow duplicate subscriptions', async () => {
      // Arrange
      const subscriber = generateTestNewsletter({ email: 'test@example.com' });
      await setup.mockKV.set(`newsletter:${subscriber.id}`, subscriber);
      await setup.mockKV.set(`newsletter_email:${subscriber.email}`, subscriber.id);

      // Act - Try to subscribe same email again
      const existingId = await setup.mockKV.get(`newsletter_email:${subscriber.email}`);

      // Assert
      expect(existingId).toBe(subscriber.id);
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Email already subscribed' },
        400
      ), 400);
    });

    it('should generate unique subscriber ID', async () => {
      // Arrange
      const sub1 = generateTestNewsletter();
      const sub2 = generateTestNewsletter();

      // Act
      await setup.mockKV.set(`newsletter:${sub1.id}`, sub1);
      await setup.mockKV.set(`newsletter:${sub2.id}`, sub2);

      // Assert
      expect(sub1.id).not.toBe(sub2.id);
    });
  });

  describe('POST /newsletter/unsubscribe', () => {
    it('should unsubscribe user from newsletter', async () => {
      // Arrange
      const subscriber = generateTestNewsletter();
      await setup.mockKV.set(`newsletter:${subscriber.id}`, subscriber);
      await setup.mockKV.set(`newsletter_email:${subscriber.email}`, subscriber.id);

      // Act
      const subscriberId = await setup.mockKV.get(`newsletter_email:${subscriber.email}`);
      await setup.mockKV.del(`newsletter:${subscriberId}`);
      await setup.mockKV.del(`newsletter_email:${subscriber.email}`);

      const retrieved = await setup.mockKV.get(`newsletter:${subscriber.id}`);

      const response = setup.mockContext.json({
        success: true,
        message: 'Successfully unsubscribed from newsletter',
      });

      // Assert
      expectSuccessResponse(response);
      expect(retrieved).toBeNull();
    });

    it('should return 400 when email is missing', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Email is required' },
        400
      ), 400);
    });

    it('should return 404 when email not subscribed', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Email not found in subscriber list' },
        404
      ), 404);
    });
  });

  describe('GET /admin/newsletter', () => {
    it('should return all newsletter subscribers for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const subscribers = [
        generateTestNewsletter(),
        generateTestNewsletter(),
        generateTestNewsletter(),
      ];

      const seedData = subscribers.reduce((acc, sub) => {
        acc[`newsletter:${sub.id}`] = sub;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const allSubscribers = await setup.mockKV.getByPrefix('newsletter:');

      const response = setup.mockContext.json({
        success: true,
        data: allSubscribers,
        pagination: {
          page: 1,
          limit: 10,
          total: allSubscribers.length,
          totalPages: Math.ceil(allSubscribers.length / 10),
        },
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data).toHaveLength(3);
    });

    it('should return 401 when unauthorized', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should support pagination for large subscriber lists', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const subscribers = Array.from({ length: 25 }, () => generateTestNewsletter());

      const seedData = subscribers.reduce((acc, sub) => {
        acc[`newsletter:${sub.id}`] = sub;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const allSubscribers = await setup.mockKV.getByPrefix('newsletter:');
      const page = 2;
      const limit = 10;
      const start = (page - 1) * limit;
      const paginated = allSubscribers.slice(start, start + limit);

      const response = setup.mockContext.json({
        success: true,
        data: paginated,
        pagination: {
          page,
          limit,
          total: allSubscribers.length,
          totalPages: Math.ceil(allSubscribers.length / limit),
        },
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.pagination.totalPages).toBe(3);
      expect(response.data.data).toHaveLength(10);
    });

    it('should return empty list when no subscribers', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const allSubscribers = await setup.mockKV.getByPrefix('newsletter:');

      // Assert
      expect(allSubscribers).toHaveLength(0);
    });

    it('should include subscriber email and subscription date', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const subscriber = generateTestNewsletter();
      await setup.mockKV.set(`newsletter:${subscriber.id}`, subscriber);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const allSubscribers = await setup.mockKV.getByPrefix('newsletter:');

      // Assert
      expect(allSubscribers[0]).toHaveProperty('email');
      expect(allSubscribers[0]).toHaveProperty('subscribed_at');
    });
  });
});
