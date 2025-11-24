import React from 'react';
import Logo from './Logo';
import svgPaths from '../imports/svg-nfww7tfte7';
import styles from './Footer.module.css';

interface FooterProps {
  onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void;
  email?: string;
  onEmailChange?: (value: string) => void;
  onSubmit?: () => void;
}

// Footer Link Components
function ButtonsButton8({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.footerButton} data-name="Buttons/Button" onClick={onClick}>
      <p className={styles.footerButtonText}>About Us</p>
      <p className={styles.footerButtonText}>Contact</p>
    </div>
  );
}

function FooterLink({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.footerLink} data-name="_Footer link">
      <ButtonsButton8 onClick={onClick} />
    </div>
  );
}

function ButtonsButton9({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.footerButton} data-name="Buttons/Button" onClick={onClick}>
      <p className={styles.footerButtonText}>Projects</p>
      <p className={styles.footerButtonText}>Blog</p>
    </div>
  );
}

function FooterLink1({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.footerLink} data-name="_Footer link">
      <ButtonsButton9 onClick={onClick} />
    </div>
  );
}

function ButtonsButton10({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.footerButton} data-name="Buttons/Button" onClick={onClick}>
      {/* <p className={styles.footerButtonText}>Contact</p> */}
    </div>
  );
}

function FooterLink2({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.footerLink} data-name="_Footer link">
      <ButtonsButton10 onClick={onClick} />
    </div>
  );
}

function ButtonsButton11({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.footerButton} data-name="Buttons/Button" onClick={onClick}>
      {/* <p className={styles.footerButtonText}>Blog</p> */}
    </div>
  );
}

function FooterLink3({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.footerLink} data-name="_Footer link">
      <ButtonsButton11 onClick={onClick} />
    </div>
  );
}

function FooterLinks({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className={styles.footerLinks} data-name="Footer links">
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
    <div className={styles.logoAndLinks} data-name="Logo and links">
      <Frame1000003794 onClick={() => onNavigate?.('home')} />
      <p className={styles.logoAndLinksText}>Crafting spaces, cultivating communities.</p>
      <FooterLinks onNavigate={onNavigate} />
    </div>
  );
}

// Newsletter Components
function Content14({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className={styles.inputContentInner} data-name="Content">
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your email"
        className={styles.inputElement}
      />
    </div>
  );
}

function Input({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className={styles.input} data-name="Input">
      <div aria-hidden="true" className={styles.inputBorder} />
      <div className={styles.inputInner}>
        <div className={styles.inputContent}>
          <Content14 value={value} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className={styles.inputWithLabel} data-name="Input with label">
      <Input value={value} onChange={onChange} />
    </div>
  );
}

function InputField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className={styles.inputField} data-name="Input field">
      <InputWithLabel value={value} onChange={onChange} />
    </div>
  );
}

function TextPadding() {
  return (
    <div className={styles.textPadding} data-name="Text padding">
      <p className={styles.subscribeButtonText}>Subscribe</p>
    </div>
  );
}

function ButtonsButton12({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.subscribeButton} data-name="Buttons/Button" onClick={onClick}>
      <div className={styles.subscribeButtonInner}>
        <TextPadding />
      </div>
    </div>
  );
}

function EmailCapture({ value, onChange, onSubmit }: { value: string; onChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className={styles.emailCapture} data-name="Email capture">
      <InputField value={value} onChange={onChange} />
      <ButtonsButton12 onClick={onSubmit} />
    </div>
  );
}

function Newsletter({ value, onChange, onSubmit }: { value: string; onChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className={styles.newsletter} data-name="Newsletter">
      <p className={styles.newsletterTitle}>Stay up to date</p>
      <EmailCapture value={value} onChange={onChange} onSubmit={onSubmit} />
    </div>
  );
}

// Social Icon Components
function SocialIcon() {
  return (
    <div className={styles.socialIcon} data-name="Social icon">
      <svg className={styles.socialIconSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Social icon">
          <path clipRule="evenodd" d={svgPaths.p1f8d8b00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <svg className={styles.socialIconSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g id="Group">
        <path d={svgPaths.p2ccee40} fill="var(--fill-0, white)" id="Vector" />
      </g>
    </svg>
  );
}

function SocialIcon1() {
  return (
    <div className={styles.socialIconOverflow} data-name="Social icon">
      <Group />
    </div>
  );
}

function SocialIcon2() {
  return (
    <div className={styles.socialIcon} data-name="Social icon">
      <svg className={styles.socialIconSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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
    <div className={styles.socialIcon} data-name="Social icon">
      <svg className={styles.socialIconSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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
    <div className={styles.socialIcon} data-name="Social icon">
      <svg className={styles.socialIconSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Social icon">
          <path d={svgPaths.p396b2062} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SocialIcon5() {
  return (
    <div className={styles.socialIcon} data-name="Social icon">
      <svg className={styles.socialIconSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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
    <div className={styles.socialIcon} data-name="Social icon" onClick={handleClick}>
      <svg className={styles.socialIconSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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
    <div className={styles.socialIcons} data-name="Social icons">
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
    <div className={styles.newsletterFrame}>
      <Newsletter value={email} onChange={onEmailChange} onSubmit={onSubmit} />
      {/* <SocialIcons /> */}
    </div>
  );
}

function Content15({ onNavigate, email, onEmailChange, onSubmit }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void; email: string; onEmailChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className={styles.content} data-name="Content">
      <LogoAndLinks onNavigate={onNavigate} />
      <Frame1000003769 email={email} onEmailChange={onEmailChange} onSubmit={onSubmit} />
    </div>
  );
}

function Container9({ onNavigate, email, onEmailChange, onSubmit }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void; email: string; onEmailChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className={styles.container} data-name="Container">
      <div className={styles.containerInner}>
        <div className={styles.containerContent}>
          <Content15 onNavigate={onNavigate} email={email} onEmailChange={onEmailChange} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}

function FooterLinks1({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className={styles.footerLinksBottom} data-name="Footer links">
      <p className={styles.footerLinkBottom} onClick={() => onNavigate?.('termsOfService')}>Terms</p>
      <p className={styles.footerLinkBottom} onClick={() => onNavigate?.('privacyPolicy')}>Privacy</p>
      <p className={styles.footerLinkBottom} onClick={() => onNavigate?.('cookiesPolicy')}>Cookies</p>
    </div>
  );
}

function Content16({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className={styles.contentBottom} data-name="Content">
      <div aria-hidden="true" className={styles.contentDivider} />
      <SocialIcons />
      <p className={styles.copyrightText}>© 2025 Pishon Communities. All rights reserved.</p>
      <FooterLinks1 onNavigate={onNavigate} />
    </div>
  );
}

function Container10({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className={styles.container} data-name="Container">
      <div className={styles.containerInner}>
        <div className={styles.containerContentBottom}>
          <Content16 onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

export function Footer({ onNavigate, email = '', onEmailChange, onSubmit }: FooterProps) {
  return (
    <div className={styles.footer} data-name="Footer">
      <Container9 onNavigate={onNavigate} email={email} onEmailChange={onEmailChange || (() => {})} onSubmit={onSubmit || (() => {})} />
      <Container10 onNavigate={onNavigate} />
    </div>
  );
}
