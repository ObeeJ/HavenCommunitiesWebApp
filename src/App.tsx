import { useState, useEffect, lazy, Suspense } from 'react';
import Desktop from './imports/Desktop-34-7755';
import { MobileWithMenu } from './components/MobileWithMenu';
import { EmailModal } from './components/EmailModal';
import { ResponsiveWrapper } from './components/ResponsiveWrapper';
import { useResponsive } from './hooks/useMediaQuery';

// Lazy load heavy components
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const Projects = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import('./components/ProjectDetail').then(m => ({ default: m.ProjectDetail })));
const Blog = lazy(() => import('./components/Blog').then(m => ({ default: m.Blog })));
const BlogDetail = lazy(() => import('./components/BlogDetail').then(m => ({ default: m.BlogDetail })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./components/TermsOfService').then(m => ({ default: m.TermsOfService })));
const CookiesPolicy = lazy(() => import('./components/CookiesPolicy').then(m => ({ default: m.CookiesPolicy })));
const AdminApp = lazy(() => import('./admin/AdminApp'));
import type { NavigationPage } from './types/navigation';
import { Toaster } from './components/ui/sonner';
import { Home } from 'lucide-react';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [showAdmin, setShowAdmin] = useState(false);
  const { isDesktop } = useResponsive();

  useEffect(() => {
    // Check if admin panel should be shown via URL parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setShowAdmin(true);
    }
  }, []);

  useEffect(() => {
    // Keyboard shortcut for admin access: Ctrl+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Only show modal on home page
    if (currentPage !== 'home') return;
    
    // Check if user has already subscribed
    const hasSubscribed = localStorage.getItem('hasSubscribed');
    
    if (!hasSubscribed) {
      // Show modal after 10 seconds
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const navigateTo = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {!showAdmin ? (
        <>
          {currentPage === 'home' && (
            isDesktop ? <Desktop onNavigate={navigateTo} /> : <MobileWithMenu onNavigate={navigateTo} />
          )}
          <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#155eef] border-t-transparent rounded-full animate-spin" /></div>}>
            {currentPage === 'about' && <About onNavigate={navigateTo} />}
            {currentPage === 'contact' && <Contact onNavigate={navigateTo} />}
            {currentPage === 'projects' && <Projects onNavigate={navigateTo} />}
            {currentPage === 'projectDetail' && <ProjectDetail onNavigate={navigateTo} />}
            {currentPage === 'blog' && <Blog onNavigate={navigateTo} />}
            {currentPage === 'blogDetail' && <BlogDetail onNavigate={navigateTo} />}
            {currentPage === 'privacyPolicy' && <PrivacyPolicy onNavigate={navigateTo} />}
            {currentPage === 'termsOfService' && <TermsOfService onNavigate={navigateTo} />}
            {currentPage === 'cookiesPolicy' && <CookiesPolicy onNavigate={navigateTo} />}
          </Suspense>
          <EmailModal isOpen={showModal} onClose={handleCloseModal} onNavigate={navigateTo} />
        </>
      ) : (
        <>
          <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#155eef] border-t-transparent rounded-full animate-spin" /></div>}>
            <AdminApp />
          </Suspense>
          
          {/* Floating Home Button */}
          <button
            onClick={() => setShowAdmin(false)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
            title="Back to Website"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Home</span>
          </button>
        </>
      )}
      
      <Toaster />
    </>
  );
}