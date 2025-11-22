import DesktopBlogDetail from '../imports/Desktop-47-17873';

interface BlogDetailProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function BlogDetail({ onNavigate }: BlogDetailProps) {
  return (
    <div className="w-full">
      <DesktopBlogDetail onNavigate={onNavigate} />
    </div>
  );
}