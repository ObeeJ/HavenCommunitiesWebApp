import DesktopBlogDetail from '../imports/Desktop-47-17873';
import styles from './BlogDetail.module.css';

interface BlogDetailProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function BlogDetail({ onNavigate }: BlogDetailProps) {
  return (
    <div className={styles.pageWrapper}>
      <DesktopBlogDetail onNavigate={onNavigate} />
    </div>
  );
}