import DesktopProjectDetail from '../imports/Desktop-34-45968';
import { Footer } from './Footer';

interface ProjectDetailProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function ProjectDetail({ onNavigate }: ProjectDetailProps) {
  return (
    <div className="w-full">
      <DesktopProjectDetail onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}