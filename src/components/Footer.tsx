import React from 'react';
import Logo from './Logo';
import svgPaths from '../imports/svg-nfww7tfte7';

interface FooterProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
  email?: string;
  onEmailChange?: (value: string) => void;
  onSubmit?: () => void;
}

// Footer Link Components
function ButtonsButton8({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" data-name="Buttons/Button" onClick={onClick}>
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">About Us</p>
    </div>
  );
}

function FooterLink({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButton8 onClick={onClick} />
    </div>
  );
}

function ButtonsButton9({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" data-name="Buttons/Button" onClick={onClick}>
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Projects</p>
    </div>
  );
}

function FooterLink1({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButton9 onClick={onClick} />
    </div>
  );
}

function ButtonsButton10({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" data-name="Buttons/Button" onClick={onClick}>
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Contact</p>
    </div>
  );
}

function FooterLink2({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButton10 onClick={onClick} />
    </div>
  );
}

function ButtonsButton11({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" data-name="Buttons/Button" onClick={onClick}>
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Blog</p>
    </div>
  );
}

function FooterLink3({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="_Footer link">
      <ButtonsButton11 onClick={onClick} />
    </div>
  );
}

function FooterLinks({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="Footer links">
      <FooterLink onClick={() => onNavigate?.('about')} />
      <FooterLink1 onClick={() => onNavigate?.('projects')} />
      <FooterLink2 onClick={() => onNavigate?.('contact')} />
      <FooterLink3 onClick={() => onNavigate?.('blog')} />
    </div>
  );
}

function Frame1000003794({ onClick }: { onClick?: () => void }) {
  return (
    <Logo onClick={onClick} variant="white" />
  );
}

function LogoAndLinks({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start min-w-[280px] relative shrink-0" data-name="Logo and links">
      <Frame1000003794 onClick={() => onNavigate?.('home')} />
      <p className="font-['Avenir:Regular',_sans-serif] h-[48px] leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full max-w-[545px]">Crafting spaces, cultivating communities.</p>
      <FooterLinks onNavigate={onNavigate} />
    </div>
  );
}

// Newsletter Components
function Content14({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your email"
        className="basis-0 font-['Avenir:Regular',_sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden text-[#717680] text-[16px] bg-transparent border-none outline-none placeholder:text-[#717680] w-full"
      />
    </div>
  );
}

function Input({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="bg-white relative rounded-[234px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[234px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">
          <Content14 value={value} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input value={value} onChange={onChange} />
    </div>
  );
}

function InputField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Input field">
      <InputWithLabel value={value} onChange={onChange} />
    </div>
  );
}

function TextPadding() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Text padding">
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Subscribe</p>
    </div>
  );
}

function ButtonsButton12({ onClick }: { onClick?: () => void }) {
  return (
    <div className="bg-[#00359e] relative rounded-[234px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity" data-name="Buttons/Button" onClick={onClick}>
      <div className="box-border content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[inherit]">
        <TextPadding />
      </div>
    </div>
  );
}

function EmailCapture({ value, onChange, onSubmit }: { value: string; onChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Email capture">
      <InputField value={value} onChange={onChange} />
      <ButtonsButton12 onClick={onSubmit} />
    </div>
  );
}

function Newsletter({ value, onChange, onSubmit }: { value: string; onChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[360px]" data-name="Newsletter">
      <p className="font-['Avenir:Medium',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white w-full">Stay up to date</p>
      <EmailCapture value={value} onChange={onChange} onSubmit={onSubmit} />
    </div>
  );
}

// Social Icon Components
function SocialIcon() {
  return (
    <div className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-80 transition-opacity" data-name="Social icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Social icon">
          <path clipRule="evenodd" d={svgPaths.p1f8d8b00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g id="Group">
        <path d={svgPaths.p2ccee40} fill="var(--fill-0, white)" id="Vector" />
      </g>
    </svg>
  );
}

function SocialIcon1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px] cursor-pointer hover:opacity-80 transition-opacity" data-name="Social icon">
      <Group />
    </div>
  );
}

function SocialIcon2() {
  return (
    <div className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-80 transition-opacity" data-name="Social icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_4_21514)" id="Social icon">
          <path d={svgPaths.p2334f790} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_4_21514">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SocialIcon3() {
  return (
    <div className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-80 transition-opacity" data-name="Social icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_4_21511)" id="Social icon">
          <g id="Vector">
            <path d={svgPaths.p3bfce500} fill="var(--fill-0, white)" />
            <path d={svgPaths.p90dcd40} fill="var(--fill-0, white)" />
            <path d={svgPaths.p36893400} fill="var(--fill-0, white)" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_21511">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SocialIcon4() {
  return (
    <div className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-80 transition-opacity" data-name="Social icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Social icon">
          <path d={svgPaths.p396b2062} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SocialIcon5() {
  return (
    <div className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-80 transition-opacity" data-name="Social icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_4_21523)" id="Social icon">
          <path clipRule="evenodd" d={svgPaths.p2e42b500} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_4_21523">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SocialIcon6() {
  const handleClick = () => {
    const whatsappNumber = '+2348033892345';
    const message = encodeURIComponent('Hello, I would like to connect with Haven Communities.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-80 transition-opacity" data-name="Social icon" onClick={handleClick}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_4_21505)" id="Social icon">
          <path clipRule="evenodd" d={svgPaths.p3a36a3c0} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_4_21505">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Social icons">
      <SocialIcon />
      <SocialIcon1 />
      <SocialIcon2 />
      <SocialIcon3 />
      <SocialIcon4 />
      <SocialIcon5 />
      <SocialIcon6 />
    </div>
  );
}

function Frame1000003769({ email, onEmailChange, onSubmit }: { email: string; onEmailChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className="content-stretch flex flex-col h-[202.72px] items-end justify-between relative shrink-0 w-full max-w-[359px]">
      <Newsletter value={email} onChange={onEmailChange} onSubmit={onSubmit} />
      <SocialIcons />
    </div>
  );
}

function Content15({ onNavigate, email, onEmailChange, onSubmit }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void; email: string; onEmailChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className="content-start flex flex-wrap gap-[48px] h-[178px] items-start justify-between relative shrink-0 w-full" data-name="Content">
      <LogoAndLinks onNavigate={onNavigate} />
      <Frame1000003769 email={email} onEmailChange={onEmailChange} onSubmit={onSubmit} />
    </div>
  );
}

function Container9({ onNavigate, email, onEmailChange, onSubmit }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void; email: string; onEmailChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[48px] items-start max-w-inherit px-[32px] py-0 relative w-full">
          <Content15 onNavigate={onNavigate} email={email} onEmailChange={onEmailChange} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}

function FooterLinks1({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className="content-stretch flex font-['Avenir:Medium',_sans-serif] gap-[16px] items-start leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" data-name="Footer links">
      <p className="relative shrink-0 cursor-pointer hover:underline" onClick={() => onNavigate?.('termsOfService')}>Terms</p>
      <p className="relative shrink-0 cursor-pointer hover:underline" onClick={() => onNavigate?.('privacyPolicy')}>Privacy</p>
      <p className="relative shrink-0 cursor-pointer hover:underline" onClick={() => onNavigate?.('cookiesPolicy')}>Cookies</p>
    </div>
  );
}

function Content16({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className="box-border content-center flex flex-wrap gap-[24px] items-center justify-between pb-0 pt-[32px] px-0 relative shrink-0 w-full" data-name="Content">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(127,86,217,0)] border-solid inset-0 pointer-events-none" />
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">© 2025 Pishon Communities. All rights reserved.</p>
      <FooterLinks1 onNavigate={onNavigate} />
    </div>
  );
}

function Container10({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start max-w-inherit px-[32px] py-0 relative w-full">
          <Content16 onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

export function Footer({ onNavigate, email = '', onEmailChange, onSubmit }: FooterProps) {
  return (
    <div className="bg-[#155eef] box-border content-stretch flex flex-col gap-[64px] items-center overflow-clip overflow-x-hidden pb-[48px] pt-[64px] px-0 relative shrink-0 w-full max-w-full z-[1]" data-name="Footer">
      <Container9 onNavigate={onNavigate} email={email} onEmailChange={onEmailChange || (() => {})} onSubmit={onSubmit || (() => {})} />
      <Container10 onNavigate={onNavigate} />
    </div>
  );
}
