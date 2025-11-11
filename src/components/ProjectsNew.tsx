import { useState, useEffect } from 'react';
import { getPublishedProperties } from '../admin/supabaseApi';
import { isSupabaseConfigured } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import { MapPin, Bed, Bath, Maximize } from 'lucide-react';

type Property = Database['public']['Tables']['properties']['Row'];

interface ProjectsProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function ProjectsNew({ onNavigate }: ProjectsProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        setError('Supabase is not configured. Please check your .env file and restart the server.');
        setLoading(false);
        return;
      }
      
      const { data } = await getPublishedProperties(1, 100); // Get all published
      setProperties(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Homes', 'Investment', 'Construction', 'Land'];
  
  const filteredProperties = selectedCategory === 'All' 
    ? properties 
    : properties.filter(p => p.category === selectedCategory);

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

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 mb-4">{error}</p>
          <button
            onClick={loadProperties}
            className="bg-[#155eef] text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#155eef] mb-6">
              Our Projects
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exceptional properties designed for modern living
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 -mb-px">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-t-lg whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-[#155eef] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">Check back soon for new listings</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition cursor-pointer group"
                onClick={() => onNavigate?.('projectDetail')}
              >
                {/* Image */}
                <div className="relative h-56 bg-gray-200 overflow-hidden">
                  <img
                    src={property.cover_image_url}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      property.status === 'Available' ? 'bg-green-500 text-white' :
                      property.status === 'Sold' ? 'bg-red-500 text-white' :
                      'bg-yellow-500 text-white'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
                      {property.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin size={16} />
                    <span className="text-sm line-clamp-1">{property.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  {/* Property Details */}
                  {(property.bedrooms || property.bathrooms || property.size_sqft) && (
                    <div className="flex gap-4 mb-4 pb-4 border-b border-gray-100">
                      {property.bedrooms && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Bed size={16} />
                          <span>{property.bedrooms} beds</span>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Bath size={16} />
                          <span>{property.bathrooms} baths</span>
                        </div>
                      )}
                      {property.size_sqft && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Maximize size={16} />
                          <span>{property.size_sqft.toLocaleString()} sqft</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#155eef]">
                        ₦{(property.price / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <button className="text-[#155eef] font-medium hover:underline">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-blue-50 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Looking for something specific?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is here to help you find your perfect property
          </p>
          <button
            onClick={() => onNavigate?.('contact')}
            className="bg-[#155eef] text-white px-8 py-3 rounded-lg hover:opacity-90 transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}