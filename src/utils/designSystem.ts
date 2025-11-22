// Design System Configuration
export const designSystem = {
  // Consistent spacing scale
  spacing: {
    xs: '4px',
    sm: '8px', 
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px'
  },
  
  // Consistent sizing for interactive elements
  sizes: {
    button: {
      sm: { height: '40px', padding: '12px', fontSize: '14px' },
      md: { height: '48px', padding: '16px', fontSize: '16px' },
      lg: { height: '56px', padding: '20px', fontSize: '18px' }
    },
    icon: {
      sm: '16px',
      md: '20px', 
      lg: '24px',
      xl: '32px'
    },
    carousel: {
      arrow: {
        mobile: '48px',
        desktop: '56px'
      }
    }
  },
  
  // Consistent border radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px'
  },
  
  // Responsive breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  
  // Typography scale
  typography: {
    sizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px'
    },
    weights: {
      regular: 400,
      medium: 500,
      heavy: 700
    }
  },
  
  // Color palette
  colors: {
    primary: '#155eef',
    primaryHover: '#1347d4',
    white: '#ffffff',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  }
};

// Utility functions for responsive design
export const getResponsiveSize = (mobile: string, desktop: string) => {
  return `${mobile} md:${desktop}`;
};

export const getResponsiveSpacing = (mobile: keyof typeof designSystem.spacing, desktop: keyof typeof designSystem.spacing) => {
  return `${designSystem.spacing[mobile]} md:${designSystem.spacing[desktop]}`;
};