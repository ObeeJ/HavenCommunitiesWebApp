import MobilePrivacyPolicy from '../imports/Mobile-47-39877';
import DesktopPrivacyPolicy from '../imports/Desktop-47-41877';
import type { NavigationProps } from '../types/navigation';
import styles from './PrivacyPolicy.module.css';

interface PrivacyPolicyProps extends NavigationProps {}

export function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  return (
    <div className={styles.pageWrapper}>
      {/* Mobile version - shown below 768px */}
      <div className={styles.mobileWrapper}>
        <MobilePrivacyPolicy onNavigate={onNavigate} />
      </div>
      
      {/* Desktop version - shown at 768px and above */}
      <div className={styles.desktopWrapper}>
        <DesktopPrivacyPolicy onNavigate={onNavigate} />
      </div>
    </div>
  );
}
