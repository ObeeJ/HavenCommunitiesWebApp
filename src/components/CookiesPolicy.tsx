import MobileCookiesPolicy from '../imports/Mobile-47-61236';
import DesktopCookiesPolicy from '../imports/Desktop-47-62829';
import type { NavigationProps } from '../types/navigation';
import { Footer } from './Footer';

interface CookiesPolicyProps extends NavigationProps {}

export function CookiesPolicy({ onNavigate }: CookiesPolicyProps) {
  return (
    <div className="w-full">
      {/* Mobile version - shown below 768px */}
      <div className="md:hidden w-full">
        <MobileCookiesPolicy onNavigate={onNavigate} />
      </div>
      
      {/* Desktop version - shown at 768px and above */}
      <div className="hidden md:block w-full">
        <DesktopCookiesPolicy onNavigate={onNavigate} />
      </div>
      
      {/* Standardized Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
