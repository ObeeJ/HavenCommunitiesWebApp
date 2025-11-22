import DesktopProjects from '../imports/Desktop-34-38105';

interface ProjectsProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function Projects({ onNavigate }: ProjectsProps) {
  return (
    <div className="w-full">
      <DesktopProjects onNavigate={onNavigate} />
    </div>
  );
}
