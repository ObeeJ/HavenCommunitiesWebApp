import React from 'react';

interface ConsistentIconProps {
  type: 'arrow-left' | 'arrow-right' | 'marker-pin' | 'menu' | 'featured';
  size: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const ConsistentIcon: React.FC<ConsistentIconProps> = ({
  type,
  size,
  color = 'currentColor',
  className = ''
}) => {
  const sizeMap = {
    sm: 16,
    md: 20, 
    lg: 24
  };
  
  const iconSize = sizeMap[size];
  const strokeWidth = size === 'sm' ? 1.5 : size === 'md' ? 1.67 : 2;
  
  const renderIcon = () => {
    switch (type) {
      case 'arrow-left':
        return (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path 
              d="M19 12H5M12 19L5 12L12 5" 
              stroke={color} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={strokeWidth} 
            />
          </svg>
        );
      case 'arrow-right':
        return (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path 
              d="M5 12H19M12 5L19 12L12 19" 
              stroke={color} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={strokeWidth} 
            />
          </svg>
        );
      case 'marker-pin':
        return (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path 
              d="M17.5 8.33333C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33333C2.5 6.34420 3.29018 4.43655 4.6967 3.03007C6.10322 1.62360 8.01088 0.833336 10 0.833336C11.9891 0.833336 13.8968 1.62360 15.3033 3.03007C16.7098 4.43655 17.5 6.34420 17.5 8.33333Z" 
              stroke={color} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={strokeWidth} 
            />
            <path 
              d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z" 
              stroke={color} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={strokeWidth} 
            />
          </svg>
        );
      case 'menu':
        return (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path 
              d="M3 12H21M3 6H21M3 18H21" 
              stroke={color} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={strokeWidth} 
            />
          </svg>
        );
      case 'featured':
        return (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path 
              d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" 
              stroke={color} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={strokeWidth} 
            />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: iconSize, height: iconSize }}>
      {renderIcon()}
    </div>
  );
};