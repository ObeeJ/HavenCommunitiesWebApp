import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import SlideOutMenu from '../imports/SlideOutMenu-34-4923';
import type { NavigationPage } from '../types/navigation';

interface MobileHeaderProps {
  onNavigate?: (page: NavigationPage) => void;
}

function Menu2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="menu-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="menu-01">
          <path d="M3 12H21M3 6H21M3 18H21" id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NavMenuButton1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0" data-name="_Nav menu button">
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
      <div className="h-[80px] relative shrink-0 w-full">
        <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col gap-[10px] h-[80px] items-start relative shrink-0 w-full z-[2]">
          <div className="content-stretch flex flex-col gap-[10px] h-[112px] items-start relative shrink-0 w-full">
            <div className="h-[112px] relative shrink-0 w-full">
              <div className="absolute content-stretch flex flex-col h-[112px] items-center justify-center left-0 right-0 top-0">
                <div className="content-stretch flex items-center justify-between relative shrink-0 max-w-[1320px] w-full mx-auto px-[16px]">
                  <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
                    <Logo onClick={() => onNavigate?.('home')} className="w-[78.75px]" />
                    <div onClick={handleToggleMenu}>
                      <NavMenuButton1 />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showMenu && (
        <div 
          className="fixed inset-0 z-50 animate-in fade-in duration-200" 
          onClick={handleCloseMenu}
        >
          <div className="animate-in slide-in-from-left duration-300">
            <SlideOutMenu onNavigate={handleNavigate} />
          </div>
        </div>
      )}
    </>
  );
}

