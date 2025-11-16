// API Service for Haven Communities
// All API calls go through the Supabase Edge Function server

import { projectId, publicAnonKey, functionName } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/${functionName}`;

// Helper to get auth token from session
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getAuthToken(): string | null {
  return authToken;
}

// Helper to make authenticated requests
async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
  requireAuth: boolean = false
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available or required
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  } else if (requireAuth) {
    throw new Error('Authentication required');
  } else {
    // Use anon key for public requests
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

// ============================================
// Authentication API
// ============================================

export async function signUp(email: string, password: string, name: string) {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
}

export async function signIn(email: string, password: string) {
  const response = await apiRequest('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  // Store the access token for future requests
  if (response.success && response.data.session) {
    setAuthToken(response.data.session.access_token);
  }
  
  return response;
}

export async function signOut() {
  const response = await apiRequest('/auth/signout', {
    method: 'POST',
  }, true);
  
  // Clear the auth token
  setAuthToken(null);
  
  return response;
}

export async function verifySession() {
  return apiRequest('/auth/session', {}, true);
}

// ============================================
// Properties API
// ============================================

export async function getProperties(page: number = 1, limit: number = 10) {
  return apiRequest(`/properties?page=${page}&limit=${limit}`);
}

export async function getProperty(id: string) {
  return apiRequest(`/properties/${id}`);
}

export async function getAdminProperties(page: number = 1, limit: number = 10) {
  return apiRequest(`/admin/properties?page=${page}&limit=${limit}`, {}, true);
}

export async function createProperty(property: any) {
  return apiRequest('/admin/properties', {
    method: 'POST',
    body: JSON.stringify(property),
  }, true);
}

export async function updateProperty(id: string, updates: any) {
  return apiRequest(`/admin/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }, true);
}

export async function deleteProperty(id: string) {
  return apiRequest(`/admin/properties/${id}`, {
    method: 'DELETE',
  }, true);
}

// ============================================
// Blog Posts API
// ============================================

export async function getBlogPosts(page: number = 1, limit: number = 10) {
  return apiRequest(`/blog?page=${page}&limit=${limit}`);
}

export async function getBlogPost(id: string) {
  return apiRequest(`/blog/${id}`);
}

export async function getBlogPostBySlug(slug: string) {
  return apiRequest(`/blog/slug/${slug}`);
}

export async function getAdminBlogPosts(page: number = 1, limit: number = 10) {
  return apiRequest(`/admin/blog?page=${page}&limit=${limit}`, {}, true);
}

export async function createBlogPost(post: any) {
  return apiRequest('/admin/blog', {
    method: 'POST',
    body: JSON.stringify(post),
  }, true);
}

export async function updateBlogPost(id: string, updates: any) {
  return apiRequest(`/admin/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }, true);
}

export async function deleteBlogPost(id: string) {
  return apiRequest(`/admin/blog/${id}`, {
    method: 'DELETE',
  }, true);
}

// ============================================
// Newsletter API
// ============================================

export async function subscribeToNewsletter(email: string) {
  return apiRequest('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function unsubscribeFromNewsletter(email: string) {
  return apiRequest('/newsletter/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function getNewsletterSubscribers(page: number = 1, limit: number = 10) {
  return apiRequest(`/admin/newsletter?page=${page}&limit=${limit}`, {}, true);
}

// ============================================
// Contact Form API
// ============================================

export async function submitContactForm(data: {
  name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
}) {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getContactSubmissions(page: number = 1, limit: number = 10) {
  return apiRequest(`/admin/contact?page=${page}&limit=${limit}`, {}, true);
}

export async function updateContactStatus(id: string, status: 'new' | 'read' | 'responded') {
  return apiRequest(`/admin/contact/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }, true);
}

export async function deleteContactSubmission(id: string) {
  return apiRequest(`/admin/contact/${id}`, {
    method: 'DELETE',
  }, true);
}

// ============================================
// Dashboard Stats API
// ============================================

export async function getDashboardStats() {
  return apiRequest('/admin/stats', {}, true);
}

// ============================================
// Health Check
// ============================================

export async function healthCheck() {
  return apiRequest('/health');
}