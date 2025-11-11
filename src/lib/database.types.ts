// Supabase Database TypeScript Types
// This file defines the structure of your Supabase database

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          title: string
          description: string
          category: 'Homes' | 'Investment' | 'Construction' | 'Land'
          location: string
          price: number
          bedrooms: number | null
          bathrooms: number | null
          size_sqft: number | null
          status: 'Available' | 'Sold' | 'Pending'
          cover_image_url: string
          gallery_images: string[]
          features: string[]
          created_at: string
          updated_at: string
          published: boolean
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: 'Homes' | 'Investment' | 'Construction' | 'Land'
          location: string
          price: number
          bedrooms?: number | null
          bathrooms?: number | null
          size_sqft?: number | null
          status?: 'Available' | 'Sold' | 'Pending'
          cover_image_url: string
          gallery_images?: string[]
          features?: string[]
          created_at?: string
          updated_at?: string
          published?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: 'Homes' | 'Investment' | 'Construction' | 'Land'
          location?: string
          price?: number
          bedrooms?: number | null
          bathrooms?: number | null
          size_sqft?: number | null
          status?: 'Available' | 'Sold' | 'Pending'
          cover_image_url?: string
          gallery_images?: string[]
          features?: string[]
          created_at?: string
          updated_at?: string
          published?: boolean
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          category: 'Homes' | 'Investment' | 'Construction' | 'Land'
          author: string
          author_avatar_url: string | null
          cover_image_url: string
          content_images: string[]
          published_at: string
          created_at: string
          updated_at: string
          published: boolean
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          category: 'Homes' | 'Investment' | 'Construction' | 'Land'
          author: string
          author_avatar_url?: string | null
          cover_image_url: string
          content_images?: string[]
          published_at?: string
          created_at?: string
          updated_at?: string
          published?: boolean
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          category?: 'Homes' | 'Investment' | 'Construction' | 'Land'
          author?: string
          author_avatar_url?: string | null
          cover_image_url?: string
          content_images?: string[]
          published_at?: string
          created_at?: string
          updated_at?: string
          published?: boolean
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          subscribed_at: string
          active: boolean
        }
        Insert: {
          id?: string
          email: string
          subscribed_at?: string
          active?: boolean
        }
        Update: {
          id?: string
          email?: string
          subscribed_at?: string
          active?: boolean
        }
      }
      contact_submissions: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          message: string
          created_at: string
          status: 'new' | 'read' | 'responded'
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          message: string
          created_at?: string
          status?: 'new' | 'read' | 'responded'
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          message?: string
          created_at?: string
          status?: 'new' | 'read' | 'responded'
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          created_at: string
          last_login: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          last_login?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
