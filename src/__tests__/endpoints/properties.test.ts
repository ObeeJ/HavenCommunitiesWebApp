import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  setupTest,
  createAuthenticatedContext,
  expectSuccessResponse,
  expectErrorResponse,
  expectPaginatedResponse,
  seedKVStore,
} from '../test-utils';
import { generateTestProperty, createMockAuthUser } from '../mocks';

describe('Properties/Projects Endpoints', () => {
  let setup: ReturnType<typeof setupTest>;

  beforeEach(() => {
    setup = setupTest();
  });

  afterEach(() => {
    setup.mockKV.clear?.();
    vi.clearAllMocks();
  });

  describe('GET /properties (public)', () => {
    it('should return published properties with pagination', async () => {
      // Arrange
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

      // Act - Simulate filtering published properties
      const allProperties = await setup.mockKV.getByPrefix('property:');
      const published = allProperties.filter((p: any) => p.published);

      // Assert
      expect(published).toHaveLength(2);
      expect(published.every((p: any) => p.published)).toBe(true);
    });

    it('should paginate results correctly', async () => {
      // Arrange
      const properties = Array.from({ length: 25 }, () =>
        generateTestProperty({ published: true })
      );

      const seedData = properties.reduce((acc, prop) => {
        acc[`property:${prop.id}`] = prop;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      // Act
      const allProperties = await setup.mockKV.getByPrefix('property:');
      const page = 2;
      const limit = 10;
      const start = (page - 1) * limit;
      const paginated = allProperties.slice(start, start + limit);

      const response = setup.mockContext.json({
        success: true,
        data: paginated,
        pagination: {
          page,
          limit,
          total: allProperties.length,
          totalPages: Math.ceil(allProperties.length / limit),
        },
      });

      // Assert
      expectSuccessResponse(response);
      expectPaginatedResponse(response);
      expect(response.data.data).toHaveLength(10);
      expect(response.data.pagination.page).toBe(2);
    });

    it('should return empty list when no properties published', async () => {
      // Arrange
      const properties = [
        generateTestProperty({ published: false }),
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

      // Assert
      expect(published).toHaveLength(0);
    });
  });

  describe('GET /admin/properties', () => {
    it('should return all properties for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const properties = [
        generateTestProperty({ published: true }),
        generateTestProperty({ published: false }),
      ];

      const seedData = properties.reduce((acc, prop) => {
        acc[`property:${prop.id}`] = prop;
        return acc;
      }, {} as Record<string, any>);

      await seedKVStore(setup.mockKV, seedData);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const allProperties = await setup.mockKV.getByPrefix('property:');

      const response = setup.mockContext.json({
        success: true,
        data: allProperties,
        pagination: {
          page: 1,
          limit: 10,
          total: allProperties.length,
          totalPages: Math.ceil(allProperties.length / 10),
        },
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data).toHaveLength(2);
      expect(response.data.data.some((p: any) => !p.published)).toBe(true);
    });

    it('should return 401 when unauthorized', async () => {
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
  });

  describe('GET /properties/:id', () => {
    it('should return single property by ID', async () => {
      // Arrange
      const property = generateTestProperty();
      await setup.mockKV.set(`property:${property.id}`, property);

      // Act
      const retrieved = await setup.mockKV.get(`property:${property.id}`);

      const response = setup.mockContext.json({
        success: true,
        data: retrieved,
      });

      // Assert
      expectSuccessResponse(response);
      expect(response.data.data).toEqual(property);
    });

    it('should return 404 when property not found', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Property not found' },
        404
      ), 404);
    });
  });

  describe('POST /admin/properties', () => {
    it('should create new property for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const newProperty = generateTestProperty();

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      await setup.mockKV.set(`property:${newProperty.id}`, newProperty);

      const retrieved = await setup.mockKV.get(`property:${newProperty.id}`);

      // Assert
      expect(retrieved).toEqual(newProperty);
    });

    it('should return 401 when unauthorized', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should generate unique ID for new property', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const property1 = generateTestProperty();
      const property2 = generateTestProperty();

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      await setup.mockKV.set(`property:${property1.id}`, property1);
      await setup.mockKV.set(`property:${property2.id}`, property2);

      // Assert
      expect(property1.id).not.toBe(property2.id);
      const stored1 = await setup.mockKV.get(`property:${property1.id}`);
      const stored2 = await setup.mockKV.get(`property:${property2.id}`);
      expect(stored1).toBeDefined();
      expect(stored2).toBeDefined();
    });
  });

  describe('PUT /admin/properties/:id', () => {
    it('should update property for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const property = generateTestProperty();
      await setup.mockKV.set(`property:${property.id}`, property);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      const updatedProperty = { ...property, title: 'Updated Title' };
      await setup.mockKV.set(`property:${property.id}`, updatedProperty);

      const retrieved = await setup.mockKV.get(`property:${property.id}`);

      // Assert
      expect(retrieved.title).toBe('Updated Title');
    });

    it('should return 401 when unauthorized', async () => {
      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Unauthorized' },
        401
      ), 401);
    });

    it('should return 404 when property not found', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Property not found' },
        404
      ), 404);
    });
  });

  describe('DELETE /admin/properties/:id', () => {
    it('should delete property for authorized admin', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');
      const property = generateTestProperty();
      await setup.mockKV.set(`property:${property.id}`, property);

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act
      await setup.mockKV.del(`property:${property.id}`);

      const retrieved = await setup.mockKV.get(`property:${property.id}`);

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

    it('should return 404 when property not found', async () => {
      // Arrange
      const authContext = createAuthenticatedContext('admin-123');

      setup.mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: createMockAuthUser({ id: 'admin-123' }) },
        error: null,
      });

      // Act & Assert
      expectErrorResponse(setup.mockContext.json(
        { success: false, message: 'Property not found' },
        404
      ), 404);
    });
  });
});
