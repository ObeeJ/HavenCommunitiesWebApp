import DesktopBlog from '../imports/Desktop-34-49489';
import styles from './Blog.module.css';

interface BlogProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function Blog({ onNavigate }: BlogProps) {
  const handleBlogClick = () => {
    onNavigate?.('blogDetail');
  };

  return (
    <div className={styles.pageWrapper}>
      <DesktopBlog onNavigate={onNavigate} onBlogClick={handleBlogClick} />
    </div>
  );
}
