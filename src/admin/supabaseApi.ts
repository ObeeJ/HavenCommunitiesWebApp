// Supabase API Service Layer
// All database operations go through this file

import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'];
type PropertyInsert = Database['public']['Tables']['properties']['Insert'];
type PropertyUpdate = Database['public']['Tables']['properties']['Update'];

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];
type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update'];

type NewsletterSubscriber = Database['public']['Tables']['newsletter_subscribers']['Row'];
type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert'];

// ============================================
// Authentication
// ============================================

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  
  // Update last login
  if (data.user) {
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.user.id);
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function checkSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

// ============================================
// Properties / Projects
// ============================================

export async function getProperties(page: number = 1, limit: number = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: data || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  };
}

export async function getPublishedProperties(page: number = 1, limit: number = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: data || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  };
}

export async function getProperty(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createProperty(property: PropertyInsert) {
  const { data, error } = await supabase
    .from('properties')
    .insert(property)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProperty(id: string, property: PropertyUpdate) {
  const { data, error } = await supabase
    .from('properties')
    .update({ ...property, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProperty(id: string) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}

// ============================================
// Blog Posts
// ============================================

export async function getBlogPosts(page: number = 1, limit: number = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: data || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  };
}

export async function getPublishedBlogPosts(page: number = 1, limit: number = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .order('published_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: data || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  };
}

export async function getBlogPost(id: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) throw error;
  return data;
}

export async function createBlogPost(post: BlogPostInsert) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateBlogPost(id: string, post: BlogPostUpdate) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ ...post, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}

// ============================================
// Newsletter Subscribers
// ============================================

export async function getNewsletterSubscribers(page: number = 1, limit: number = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('newsletter_subscribers')
    .select('*', { count: 'exact' })
    .eq('active', true)
    .order('subscribed_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: data || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  };
}

export async function subscribeToNewsletter(email: string) {
  // Check if already subscribed
  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .eq('email', email)
    .single();

  if (existing) {
    // Reactivate if inactive
    if (!existing.active) {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .update({ active: true })
        .eq('email', email)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
    throw new Error('Email already subscribed');
  }

  // Create new subscription
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function unsubscribeFromNewsletter(email: string) {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .update({ active: false })
    .eq('email', email)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// Contact Submissions
// ============================================

export async function getContactSubmissions(page: number = 1, limit: number = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: data || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  };
}

export async function createContactSubmission(submission: ContactSubmissionInsert) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert(submission)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateContactStatus(id: string, status: 'new' | 'read' | 'responded') {
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteContactSubmission(id: string) {
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}

// ============================================
// Storage / File Upload
// ============================================

export async function uploadPropertyImage(file: File, path?: string) {
  const fileName = path || `${Date.now()}-${file.name}`;
  const filePath = `properties/${fileName}`;

  const { data, error } = await supabase.storage
    .from('HC storage')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('HC storage')
    .getPublicUrl(filePath);

  return { path: data.path, url: publicUrl };
}

export async function uploadBlogImage(file: File, path?: string) {
  const fileName = path || `${Date.now()}-${file.name}`;
  const filePath = `blog/${fileName}`;

  const { data, error } = await supabase.storage
    .from('HC storage')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('HC storage')
    .getPublicUrl(filePath);

  return { path: data.path, url: publicUrl };
}

export async function deleteImage(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) throw error;
  return { success: true };
}

// ============================================
// Dashboard Stats
// ============================================

export async function getDashboardStats() {
  const [
    { count: propertiesCount },
    { count: blogPostsCount },
    { count: subscribersCount },
    { count: contactsCount },
  ] = await Promise.all([
    supabase.from('properties').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
  ]);

  return {
    totalProperties: propertiesCount || 0,
    totalBlogPosts: blogPostsCount || 0,
    totalSubscribers: subscribersCount || 0,
    totalContacts: contactsCount || 0,
  };
}
