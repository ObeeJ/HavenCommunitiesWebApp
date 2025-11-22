import MobileTermsOfService from '../imports/Mobile-47-56469';
import DesktopTermsOfService from '../imports/Desktop-47-59002';
import type { NavigationProps } from '../types/navigation';
import styles from './TermsOfService.module.css';

interface TermsOfServiceProps extends NavigationProps {}

export function TermsOfService({ onNavigate }: TermsOfServiceProps) {
  return (
    <div className={styles.pageWrapper}>
      {/* Mobile version - shown below 768px */}
      <div className={styles.mobileWrapper}>
        <MobileTermsOfService onNavigate={onNavigate} />
      </div>
      
      {/* Desktop version - shown at 768px and above */}
      <div className={styles.desktopWrapper}>
        <DesktopTermsOfService onNavigate={onNavigate} />
      </div>
    </div>
  );
}
