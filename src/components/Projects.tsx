import DesktopProjects from '../imports/Desktop-34-38105';
import styles from './Projects.module.css';

interface ProjectsProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function Projects({ onNavigate }: ProjectsProps) {
  return (
    <div className={styles.pageWrapper}>
      <DesktopProjects onNavigate={onNavigate} />
    </div>
  );
}
