import React from 'react';

interface ConsistentButtonProps {
  variant: 'primary' | 'secondary' | 'carousel' | 'cta';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ConsistentButton: React.FC<ConsistentButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  className = ''
}) => {
  const baseClasses = "content-stretch flex items-center justify-center relative shrink-0 transition-all cursor-pointer";
  
  const sizeClasses = {
    sm: "h-[40px] px-[12px] text-[14px]",
    md: "h-[48px] px-[16px] text-[16px]", 
    lg: "h-[56px] px-[20px] text-[18px]"
  };
  
  const variantClasses = {
    primary: "bg-[#155eef] text-white rounded-[8px] hover:bg-[#1347d4]",
    secondary: "bg-white text-[#155eef] border border-[#155eef] rounded-[8px] hover:bg-[#f8faff]",
    carousel: "border border-[#e9eaeb] rounded-[28px] hover:border-[#d0d5dd]",
    cta: "backdrop-blur-[1px] backdrop-filter bg-[rgba(255,255,255,0.3)] border border-[rgba(255,255,255,0.5)] rounded-[234px] text-white hover:bg-[rgba(255,255,255,0.4)]"
  };
  
  return (
    <div 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};