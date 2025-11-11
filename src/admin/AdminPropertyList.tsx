import { useState, useEffect } from 'react';
import { getProperties, deleteProperty, getDashboardStats } from './supabaseApi';
import type { Database } from '../lib/database.types';
import { Trash2, Edit, Plus } from 'lucide-react';

type Property = Database['public']['Tables']['properties']['Row'];

interface AdminPropertyListProps {
  onCreateNew?: () => void;
  onEditProperty?: (id: string) => void;
}

export default function AdminPropertyList({ onCreateNew, onEditProperty }: AdminPropertyListProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ totalProperties: 0 });

  useEffect(() => {
    loadProperties();
    loadStats();
  }, [currentPage]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const { data, pagination } = await getProperties(currentPage, 12);
      setProperties(data);
      setTotalPages(pagination.totalPages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats({ totalProperties: data.totalProperties });
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deleteProperty(id);
      await loadProperties();
      await loadStats();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete property');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#155eef] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-[#155eef]">Property Management</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your property listings
              </p>
            </div>
            <button
              onClick={onCreateNew}
              className="flex items-center gap-2 bg-[#155eef] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              <Plus size={20} />
              Add New Property
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Properties</p>
              <p className="text-3xl font-bold text-[#155eef]">{stats.totalProperties}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first property listing</p>
            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-2 bg-[#155eef] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              <Plus size={20} />
              Create First Property
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={property.cover_image_url}
                      alt={property.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        property.status === 'Available' ? 'bg-green-100 text-green-800' :
                        property.status === 'Sold' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {property.status}
                      </span>
                    </div>
                    {!property.published && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-white">
                          Draft
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                        {property.title}
                      </h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {property.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {property.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="line-clamp-1">{property.location}</span>
                    </div>

                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-2xl font-bold text-[#155eef]">
                        ₦{(property.price / 1000000).toFixed(1)}M
                      </span>
                    </div>

                    {property.bedrooms && property.bathrooms && (
                      <div className="flex gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span>{property.bedrooms} beds</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{property.bathrooms} baths</span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditProperty?.(property.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(property.id, property.title)}
                        className="flex items-center justify-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-[#155eef] text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
