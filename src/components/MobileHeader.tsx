import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import SlideOutMenu from '../imports/SlideOutMenu-34-4923';
import type { NavigationPage } from '../types/navigation';
import styles from './MobileHeader.module.css';

interface MobileHeaderProps {
  onNavigate?: (page: NavigationPage) => void;
}

function Menu2() {
  return (
    <div className={styles.menuIcon} data-name="menu-01">
      <svg fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="menu-01">
          <path d="M3 12H21M3 6H21M3 18H21" id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NavMenuButton1() {
  return (
    <div className={styles.menuButton} data-name="_Nav menu button">
      <Menu2 />
    </div>
  );
}

export function MobileHeader({ onNavigate }: MobileHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMenu]);

  const handleToggleMenu = (e: React.MouseEvent) => {
    // Check if the click is on the hamburger menu button
    const target = e.target as HTMLElement;
    const isMenuButton = target.closest('[data-name="_Nav menu button"]');
    
    if (isMenuButton) {
      e.stopPropagation();
      setShowMenu(true);
    }
  };

  const handleCloseMenu = (e: React.MouseEvent) => {
    // Close if clicking on backdrop or close button
    const target = e.target as HTMLElement;
    const isBackdrop = target.getAttribute('data-name') === 'Slide out menu';
    const isCloseButton = target.closest('[data-name="Button close X"]');
    
    if (isBackdrop || isCloseButton) {
      setShowMenu(false);
    }
  };

  const handleNavigate = (page: NavigationPage) => {
    setShowMenu(false);
    onNavigate?.(page);
  };

  return (
    <>
      <div className={styles.mobileHeaderContainer}>
        <div className={styles.headerContent}>
          <Logo onClick={() => onNavigate?.('home')} className="w-[78.75px]" />
          <div className={styles.menuButtonWrapper} onClick={handleToggleMenu}>
            <NavMenuButton1 />
          </div>
        </div>
      </div>
      {showMenu && (
        <div 
          className={styles.menuOverlay} 
          onClick={handleCloseMenu}
        >
          <div className={styles.menuSlideIn}>
            <SlideOutMenu onNavigate={handleNavigate} />
          </div>
        </div>
      )}
    </>
  );
}

