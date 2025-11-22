import MobileTermsOfService from '../imports/Mobile-47-56469';
import DesktopTermsOfService from '../imports/Desktop-47-59002';
import type { NavigationProps } from '../types/navigation';
import { Footer } from './Footer';

interface TermsOfServiceProps extends NavigationProps {}

export function TermsOfService({ onNavigate }: TermsOfServiceProps) {
  return (
    <div className="w-full">
      {/* Mobile version - shown below 768px */}
      <div className="md:hidden w-full">
        <MobileTermsOfService onNavigate={onNavigate} />
      </div>
      
      {/* Desktop version - shown at 768px and above */}
      <div className="hidden md:block w-full">
        <DesktopTermsOfService onNavigate={onNavigate} />
      </div>
      
      {/* Standardized Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
