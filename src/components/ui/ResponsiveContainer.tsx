import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'sm' | 'md' | 'lg';
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'md'
}) => {
  const maxWidthClasses = {
    sm: 'max-w-[640px]',
    md: 'max-w-[768px]', 
    lg: 'max-w-[1024px]',
    xl: 'max-w-[1280px]',
    full: 'max-w-full'
  };
  
  const paddingClasses = {
    sm: 'px-[16px] md:px-[24px]',
    md: 'px-[16px] md:px-[32px]',
    lg: 'px-[24px] md:px-[48px]'
  };
  
  return (
    <div className={`relative shrink-0 w-full mx-auto ${maxWidthClasses[maxWidth]} ${className}`}>
      <div className="max-w-inherit size-full">
        <div className={`box-border content-stretch flex flex-col items-start max-w-inherit py-0 relative w-full ${paddingClasses[padding]} ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};