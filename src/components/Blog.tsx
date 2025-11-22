import DesktopBlog from '../imports/Desktop-34-49489';
import { Footer } from './Footer';

interface BlogProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function Blog({ onNavigate }: BlogProps) {
  const handleBlogClick = () => {
    onNavigate?.('blogDetail');
  };

  return (
    <div className="w-full">
      <DesktopBlog onNavigate={onNavigate} onBlogClick={handleBlogClick} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
