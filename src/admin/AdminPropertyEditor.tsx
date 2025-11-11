import { useState, useEffect, useRef } from 'react';
import { getProperty, createProperty, updateProperty, uploadPropertyImage } from './supabaseApi';
import type { Database } from '../lib/database.types';
import { ArrowLeft, Upload, X } from 'lucide-react';

type PropertyInsert = Database['public']['Tables']['properties']['Insert'];
type PropertyUpdate = Database['public']['Tables']['properties']['Update'];

interface AdminPropertyEditorProps {
  propertyId?: string | null;
  onCancel?: () => void;
  onSave?: () => void;
}

export default function AdminPropertyEditor({ propertyId, onCancel, onSave }: AdminPropertyEditorProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Homes' as 'Homes' | 'Investment' | 'Construction' | 'Land',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    size_sqft: '',
    status: 'Available' as 'Available' | 'Sold' | 'Pending',
    cover_image_url: '',
    features: [] as string[],
    published: true,
  });

  const [newFeature, setNewFeature] = useState('');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');

  useEffect(() => {
    if (propertyId) {
      loadProperty();
    }
  }, [propertyId]);

  const loadProperty = async () => {
    if (!propertyId) return;
    
    try {
      setLoading(true);
      const property = await getProperty(propertyId);
      
      setFormData({
        title: property.title,
        description: property.description,
        category: property.category,
        location: property.location,
        price: property.price.toString(),
        bedrooms: property.bedrooms?.toString() || '',
        bathrooms: property.bathrooms?.toString() || '',
        size_sqft: property.size_sqft?.toString() || '',
        status: property.status,
        cover_image_url: property.cover_image_url,
        features: property.features || [],
        published: property.published,
      });
      
      setCoverImagePreview(property.cover_image_url);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  const handleCoverImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Valid price is required');
      return;
    }
    if (!propertyId && !coverImageFile && !formData.cover_image_url) {
      setError('Cover image is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let coverImageUrl = formData.cover_image_url;

      // Upload cover image if new file selected
      if (coverImageFile) {
        setUploading(true);
        const { url } = await uploadPropertyImage(coverImageFile);
        coverImageUrl = url;
        setUploading(false);
      }

      const propertyData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        location: formData.location.trim(),
        price: parseFloat(formData.price),
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        size_sqft: formData.size_sqft ? parseFloat(formData.size_sqft) : null,
        status: formData.status,
        cover_image_url: coverImageUrl,
        features: formData.features,
        published: formData.published,
      };

      if (propertyId) {
        // Update existing property
        await updateProperty(propertyId, propertyData as PropertyUpdate);
      } else {
        // Create new property
        await createProperty(propertyData as PropertyInsert);
      }

      onSave?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save property');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  if (loading && propertyId) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#155eef] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1320px] mx-auto px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div>
              <h1 className="text-3xl text-[#155eef]">
                {propertyId ? 'Edit Property' : 'Create New Property'}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {propertyId ? 'Update property details' : 'Add a new property to your listings'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image *
            </label>
            <div className="space-y-4">
              {coverImagePreview && (
                <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                onClick={() => coverImageInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition"
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <input
                ref={coverImageInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverImageSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Modern Family Home in Lekki"
            />
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Homes">Homes</option>
                <option value="Investment">Investment</option>
                <option value="Construction">Construction</option>
                <option value="Land">Land</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          {/* Location and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Lekki Phase 1, Lagos"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₦) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="45000000"
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size (sq ft)
              </label>
              <input
                type="number"
                value={formData.size_sqft}
                onChange={(e) => setFormData(prev => ({ ...prev, size_sqft: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed property description..."
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Swimming Pool"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-6 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                >
                  Add
                </button>
              </div>
              {formData.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="hover:text-blue-900"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Published */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Publish immediately (visible to public)
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 px-6 py-3 bg-[#155eef] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : uploading ? 'Uploading...' : propertyId ? 'Update Property' : 'Create Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}