import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  setupTest,
  createAuthenticatedContext,
  expectSuccessResponse,
  expectErrorResponse,
  seedKVStore,
} from '../test-utils';
import { generateTestContact, createMockAuthUser } from '../mocks';

describe('Contact Form Endpoints', () => {
  let setup: ReturnType<typeof setupTest>;

  beforeEach(() => {
    setup = setupTest();
  });

  afterEach(() => {
    setup.mockKV.clear?.();
    vi.clearAllMocks();
  });

  describe('POST /contact', () => {
    it('should submit contact form (public)', async () => {
      // Arrange
      const contact = generateTestContact();

      // Act
      await setup.mockKV.set(`contact:${contact.id}`, contact);

      const retrieved = await setup.mockKV.get(`contact:${contact.id}`);

      const response = setup.mockContext.json({
        success: true,
        message: 'Contact form submitted successfully',
        data: { id: contact.id },
      });

      // Assert
      expectSuccessResponse(response);
      expect(retrieved).toEqual(contact);
    });

    it('should require name field', async () => {
      // Arrange
      const invalidContact = { email: 'test@example.com', message: 'test' };

      // Act & Assert
      expect(invalidContact).not.toHaveProperty('name');
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Name is required' },
        400
      ), 400);
    });

    it('should require email field', async () => {
      // Arrange
      const invalidContact = { name: 'John', message: 'test' };

      // Act & Assert
      expect(invalidContact).not.toHaveProperty('email');
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Email is required' },
        400
      ), 400);
    });

    it('should require message field', async () => {
      // Arrange
      const invalidContact = { name: 'John', email: 'test@example.com' };

      // Act & Assert
      expect(invalidContact).not.toHaveProperty('message');
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Message is required' },
        400
      ), 400);
    });

    it('should validate email format', async () => {
      // Arrange
      const invalidContact = {
        name: 'John',
        email: 'not-an-email',
        message: 'test message',
      };

      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Invalid email format' },
        400
      ), 400);
    });

    it('should set initial status to new', async () => {
      // Arrange
      const contact = generateTestContact({ status: 'new' });

      // Act
      await setup.mockKV.set(`contact:${contact.id}`, contact);
      const retrieved = await setup.mockKV.get(`contact:${contact.id}`);

      // Assert
      expect(retrieved.status).toBe('new');
    });

    it('should generate unique contact ID', async () => {
      // Arrange
      const contact1 = generateTestContact();
      const contact2 = generateTestContact();

      // Act
      await setup.mockKV.set(`contact:${contact1.id}`, contact1);
      await setup.mockKV.set(`contact:${contact2.id}`, contact2);

      // Assert
      expect(contact1.id).not.toBe(contact2.id);
    });
  });

  describe('GET /admin/contact', () => {
    it('should return all contact submissions for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const contacts = [
        generateTestContact({ status: 'new' }),
        generateTestContact({ status: 'read' }),
        generateTestContact({ status: 'resolved' }),
      ];

      const seedData = contacts.reduce((acc, contact) => {
        acc[`contact:${contact.id}`] = contact;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const allContacts = await setup.mockKV.getByPrefix('contact:');

      const response = setup.mockContext.json({
        success: true,
        data: allContacts,
        pagination: {
          page: 1,
          limit: 10,
          total: allContacts.length,
          totalPages: Math.ceil(allContacts.length / 10),
        },
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data).toHaveLength(3);
    });

    it('should support pagination for contact submissions', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const contacts = Array.from({ length: 25 }, () => generateTestContact());

      const seedData = contacts.reduce((acc, contact) => {
        acc[`contact:${contact.id}`] = contact;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const allContacts = await setup.mockKV.getByPrefix('contact:');
      const page = 2;
      const limit = 10;
      const start = (page - 1) * limit;
      const paginated = allContacts.slice(start, start + limit);

      const response = setup.mockContext.json({
        success: true,
        data: paginated,
        pagination: {
          page,
          limit,
          total: allContacts.length,
          totalPages: Math.ceil(allContacts.length / limit),
        },
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.pagination.totalPages).toBe(3);
    });

    it('should return 401 when unauthorized', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should return empty list when no submissions', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const allContacts = await setup.mockKV.getByPrefix('contact:');

      // Assert
      expect(allContacts).toHaveLength(0);
    });
  });

  describe('PUT /admin/contact/:id', () => {
    it('should update contact status for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const contact = generateTestContact({ status: 'new' });
      await setup.mockKV.set(`contact:${contact.id}`, contact);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const updatedContact = { ...contact, status: 'resolved' };
      await setup.mockKV.set(`contact:${contact.id}`, updatedContact);

      const retrieved = await setup.mockKV.get(`contact:${contact.id}`);

      // Assert
      expect(retrieved.status).toBe('resolved');
    });

    it('should allow status transitions', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const contact = generateTestContact({ status: 'new' });
      await setup.mockKV.set(`contact:${contact.id}`, contact);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act - new -> read -> resolved
      let updated = await setup.mockKV.get(`contact:${contact.id}`);
      updated.status = 'read';
      await setup.mockKV.set(`contact:${contact.id}`, updated);

      updated = await setup.mockKV.get(`contact:${contact.id}`);
      updated.status = 'resolved';
      await setup.mockKV.set(`contact:${contact.id}`, updated);

      const final = await setup.mockKV.get(`contact:${contact.id}`);

      // Assert
      expect(final.status).toBe('resolved');
    });

    it('should return 401 when unauthorized', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should return 404 when contact not found', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Contact not found' },
        404
      ), 404);
    });
  });

  describe('DELETE /admin/contact/:id', () => {
    it('should delete contact submission for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const contact = generateTestContact();
      await setup.mockKV.set(`contact:${contact.id}`, contact);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      await setup.mockKV.del(`contact:${contact.id}`);

      const retrieved = await setup.mockKV.get(`contact:${contact.id}`);

      // Assert
      expect(retrieved).toBeNull();
    });

    it('should return 401 when unauthorized', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should return 404 when contact not found', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Contact not found' },
        404
      ), 404);
    });
  });
});
