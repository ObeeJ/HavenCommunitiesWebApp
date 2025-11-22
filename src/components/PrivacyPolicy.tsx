import MobilePrivacyPolicy from '../imports/Mobile-47-39877';
import DesktopPrivacyPolicy from '../imports/Desktop-47-41877';
import type { NavigationProps } from '../types/navigation';
import { Footer } from './Footer';

interface PrivacyPolicyProps extends NavigationProps {}

export function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  return (
    <div className="w-full">
      {/* Mobile version - shown below 768px */}
      <div className="md:hidden w-full">
        <MobilePrivacyPolicy onNavigate={onNavigate} />
      </div>
      
      {/* Desktop version - shown at 768px and above */}
      <div className="hidden md:block w-full">
        <DesktopPrivacyPolicy onNavigate={onNavigate} />
      </div>
      
      {/* Standardized Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
