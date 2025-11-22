import DesktopProjectDetail from '../imports/Desktop-34-45968';
import styles from './ProjectDetail.module.css';

interface ProjectDetailProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function ProjectDetail({ onNavigate }: ProjectDetailProps) {
  return (
    <div className={styles.pageWrapper}>
      <DesktopProjectDetail onNavigate={onNavigate} />
    </div>
  );
}