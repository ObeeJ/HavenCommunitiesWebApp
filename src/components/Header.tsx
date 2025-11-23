import React from 'react';
import Logo from './Logo';
import type { NavigationPage } from '../types/navigation';

interface HeaderProps {
  onNavigate?: (page: NavigationPage) => void;
}

// Navigation Button Components
function ButtonsButton({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="content-stretch flex gap-[4px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" 
      data-name="Buttons/Button"
      onClick={onClick}
    >
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">About Us</p>
    </div>
  );
}

function DropdownHeaderNavigationTrigger({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="_Dropdown header navigation trigger">
      <ButtonsButton onClick={onClick} />
    </div>
  );
}

function ButtonsButton1({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" data-name="Buttons/Button" onClick={onClick}>
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Projects</p>
    </div>
  );
}

function DropdownHeaderNavigationTrigger1({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="_Dropdown header navigation trigger">
      <ButtonsButton1 onClick={onClick} />
    </div>
  );
}

function ButtonsButton2({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="content-stretch flex gap-[4px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" 
      data-name="Buttons/Button"
      onClick={onClick}
    >
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Contact</p>
    </div>
  );
}

function DropdownHeaderNavigationTrigger2({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="_Dropdown header navigation trigger">
      <ButtonsButton2 onClick={onClick} />
    </div>
  );
}

function ButtonsButton3({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" data-name="Buttons/Button" onClick={onClick}>
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Blog</p>
    </div>
  );
}

function Navigation({ onNavigate }: HeaderProps) {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Navigation">
      <DropdownHeaderNavigationTrigger onClick={() => onNavigate?.('about')} />
      <DropdownHeaderNavigationTrigger1 onClick={() => onNavigate?.('projects')} />
      <DropdownHeaderNavigationTrigger2 onClick={() => onNavigate?.('contact')} />
      <ButtonsButton3 onClick={() => onNavigate?.('blog')} />
    </div>
  );
}

function Content({ onNavigate }: HeaderProps) {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="Content">
      <Logo onClick={() => onNavigate?.('home')} />
      <Navigation onNavigate={onNavigate} />
    </div>
  );
}

function Container({ onNavigate }: HeaderProps) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full max-w-[1320px] px-[32px]" data-name="Container">
      <Content onNavigate={onNavigate} />
    </div>
  );
}

function Header({ onNavigate }: HeaderProps) {
  return (
    <div className="absolute content-stretch flex flex-col h-[112px] items-center justify-center left-0 right-0 top-0" data-name="Header">
      <Container onNavigate={onNavigate} />
    </div>
  );
}

function DropdownHeaderNavigation({ onNavigate }: HeaderProps) {
  return (
    <div className="h-[112px] relative shrink-0 w-full" data-name="Dropdown header navigation">
      <Header onNavigate={onNavigate} />
    </div>
  );
}

export function PageHeader({ onNavigate }: HeaderProps) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[112px] items-start relative shrink-0 w-full">
      <DropdownHeaderNavigation onNavigate={onNavigate} />
    </div>
  );
}

export function PageHeaderWithOverlay({ onNavigate }: HeaderProps) {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col gap-[10px] h-[80px] items-start relative shrink-0 w-full z-[2]">
      <PageHeader onNavigate={onNavigate} />
    </div>
  );
}

