import logoImage from "figma:asset/3eada838a8a55b948f7379c648ac717c0e7f47c9.png";
import blueLogoImage from "figma:asset/6471c1f8549722e1f3ee00892541594dfcccc113.png";

interface LogoProps {
  onClick?: () => void;
  className?: string;
  variant?: 'blue' | 'white';
  useBlueLogo?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ onClick, className = "", variant = 'blue', useBlueLogo = false, size = 'medium' }: LogoProps) {
  const logoSrc = useBlueLogo ? blueLogoImage : logoImage;
  
  const sizeClasses = {
    small: 'w-[78px]',
    medium: 'w-[105px]',
    large: 'w-[140px]'
  };
  
  return (
    <div 
      className={`relative shrink-0 ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      <img 
        src={logoSrc} 
        alt="Haven Communities Logo" 
        className={`h-auto ${sizeClasses[size]} ${variant === 'white' && !useBlueLogo ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
}
