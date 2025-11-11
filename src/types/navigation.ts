/**
 * Global Navigation Types
 * 
 * This file contains all navigation-related types used across the application.
 * Using a single source of truth ensures consistency and prevents type mismatches.
 */

/**
 * All available pages in the application
 */
export type NavigationPage = 
  | 'home' 
  | 'about' 
  | 'contact' 
  | 'projects' 
  | 'projectDetail' 
  | 'blog' 
  | 'blogDetail' 
  | 'privacyPolicy' 
  | 'termsOfService' 
  | 'cookiesPolicy';

/**
 * Props interface for components that need navigation
 */
export interface NavigationProps {
  onNavigate?: (page: NavigationPage) => void;
}

/**
 * Extended props for components that need both navigation and selected project ID
 */
export interface NavigationWithProjectProps extends NavigationProps {
  selectedProjectId?: number;
  onSelectProject?: (id: number) => void;
}

/**
 * Extended props for components that need both navigation and selected blog ID
 */
export interface NavigationWithBlogProps extends NavigationProps {
  selectedBlogId?: number;
  onSelectBlog?: (id: number) => void;
}
