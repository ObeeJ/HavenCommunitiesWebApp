import React from 'react';
import { useResponsive } from '../hooks/useMediaQuery';

interface ResponsiveWrapperProps {
  mobile: React.ComponentType;
  desktop: React.ComponentType;
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ 
  mobile: MobileComponent, 
  desktop: DesktopComponent 
}) => {
  const { isDesktop } = useResponsive();
  
  return isDesktop ? <DesktopComponent /> : <MobileComponent />;
};
