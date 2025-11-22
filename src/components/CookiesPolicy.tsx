import MobileCookiesPolicy from '../imports/Mobile-47-61236';
import DesktopCookiesPolicy from '../imports/Desktop-47-62829';
import type { NavigationProps } from '../types/navigation';
import styles from './CookiesPolicy.module.css';

interface CookiesPolicyProps extends NavigationProps {}

export function CookiesPolicy({ onNavigate }: CookiesPolicyProps) {
  return (
    <div className={styles.pageWrapper}>
      {/* Mobile version - shown below 768px */}
      <div className={styles.mobileWrapper}>
        <MobileCookiesPolicy onNavigate={onNavigate} />
      </div>
      
      {/* Desktop version - shown at 768px and above */}
      <div className={styles.desktopWrapper}>
        <DesktopCookiesPolicy onNavigate={onNavigate} />
      </div>
    </div>
  );
}
