import { useState, useEffect } from 'react';
import Desktop from './imports/Desktop-34-7755';
import { MobileWithMenu } from './components/MobileWithMenu';
import { EmailModal } from './components/EmailModal';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Projects } from './components/Projects';
import { ProjectDetail } from './components/ProjectDetail';
import { Blog } from './components/Blog';
import { BlogDetail } from './components/BlogDetail';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { CookiesPolicy } from './components/CookiesPolicy';
import AdminApp from './admin/AdminApp';
import type { NavigationPage } from './types/navigation';
import { Toaster } from './components/ui/sonner';
import { Shield, Home } from 'lucide-react';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
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
            isMobile ? <MobileWithMenu onNavigate={navigateTo} /> : <Desktop onNavigate={navigateTo} />
          )}
          {currentPage === 'about' && <About onNavigate={navigateTo} />}
          {currentPage === 'contact' && <Contact onNavigate={navigateTo} />}
          {currentPage === 'projects' && <Projects onNavigate={navigateTo} />}
          {currentPage === 'projectDetail' && <ProjectDetail onNavigate={navigateTo} />}
          {currentPage === 'blog' && <Blog onNavigate={navigateTo} />}
          {currentPage === 'blogDetail' && <BlogDetail onNavigate={navigateTo} />}
          {currentPage === 'privacyPolicy' && <PrivacyPolicy onNavigate={navigateTo} />}
          {currentPage === 'termsOfService' && <TermsOfService onNavigate={navigateTo} />}
          {currentPage === 'cookiesPolicy' && <CookiesPolicy onNavigate={navigateTo} />}
          <EmailModal isOpen={showModal} onClose={handleCloseModal} onNavigate={navigateTo} />
          
          {/* Floating Admin Button */}
          <button
            onClick={() => setShowAdmin(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
            title="Go to Admin Panel"
          >
            <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </>
      ) : (
        <>
          <AdminApp />
          
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