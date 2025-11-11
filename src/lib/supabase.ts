// Supabase client configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Construct Supabase URL from project ID
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

// Check if we have valid credentials
const isConfigured = !!(supabaseUrl && supabaseAnonKey && projectId && publicAnonKey);

if (!isConfigured) {
  console.warn('⚠️ Supabase credentials not found. Some features may not work properly.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return isConfigured;
};