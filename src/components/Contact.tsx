import { useState } from 'react';
import DesktopContact from '../imports/Desktop-34-20344';
import { ContactModal } from './ContactModal';

interface ContactProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
}

export function Contact({ onNavigate }: ContactProps) {
  const [showContactModal, setShowContactModal] = useState(false);

  const handleBookNow = () => {
    setShowContactModal(true);
  };

  return (
    <>
      <div className="w-full">
        <DesktopContact onNavigate={onNavigate} onBookNow={handleBookNow} />
      </div>

      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </>
  );
}
