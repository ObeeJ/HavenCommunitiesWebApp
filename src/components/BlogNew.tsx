import { useState, useEffect } from 'react';
import { getPublishedBlogPosts } from '../admin/supabaseApi';
import { isSupabaseConfigured } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import { Calendar, User, Tag } from 'lucide-react';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function BlogNew({ onNavigate }: BlogProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        setError('Supabase is not configured. Please check your .env file and restart the server.');
        setLoading(false);
        return;
      }
      
      const { data } = await getPublishedBlogPosts(1, 100); // Get all published
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Homes', 'Investment', 'Construction', 'Land'];
  
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#155eef] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading blog posts...</p>
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
            onClick={loadPosts}
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
              Our Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, news, and updates from Haven Communities
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

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">Check back soon for new content</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition cursor-pointer group"
                onClick={() => onNavigate?.('blogDetail')}
              >
                {/* Cover Image */}
                <div className="relative h-56 bg-gray-200 overflow-hidden">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-gray-100">
                    {post.author && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                    )}
                    {post.published_at && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                    )}
                  </div>

                  {/* Read More */}
                  <button className="text-[#155eef] font-medium hover:underline">
                    Read More →
                  </button>
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
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights and updates
          </p>
          <button
            onClick={() => onNavigate?.('home')}
            className="bg-[#155eef] text-white px-8 py-3 rounded-lg hover:opacity-90 transition"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}