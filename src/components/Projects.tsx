import DesktopProjects from '../imports/Desktop-34-38105';
import { Footer } from './Footer';

interface ProjectsProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function Projects({ onNavigate }: ProjectsProps) {
  return (
    <div className="w-full">
      <DesktopProjects onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
