import svgPaths from "./svg-hvyj95rdda";
import logoImage from "../assets/3eada838a8a55b948f7379c648ac717c0e7f47c9.png";
import styles from "./SlideOutMenu-34-4923.module.css";

function Frame1000003793() {
  return (
    <div className={styles.logoContainer}>
      <img 
        src={logoImage} 
        alt="Haven Communities" 
        className={styles.logoImage}
      />
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className={styles.logoTextContainer} data-name="Text and supporting text">
      <Frame1000003793 />
    </div>
  );
}

function Content() {
  return (
    <div className={styles.headerMainContent} data-name="Content">
      <TextAndSupportingText />
    </div>
  );
}

function XClose() {
  return (
    <div className={styles.closeIcon} data-name="x-close">
      <svg className={styles.closeIconSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="x-close">
          <path d="M15 5L5 15M5 5L15 15" id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function ButtonCloseX() {
  return (
    <div className={styles.closeButton} data-name="Button close X">
      <XClose />
    </div>
  );
}

function SlideOutMenuHeader() {
  return (
    <div className={styles.header} data-name="_Slide out menu header">
      <div className={styles.headerInner}>
        <div className={styles.headerContent}>
          <Content />
          <ButtonCloseX />
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className={styles.navItemTextContainer} data-name="Content">
      <p className={styles.navItemText}>About Us</p>
    </div>
  );
}

function NavItemBase({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className={styles.navItem}
      data-name="_Nav item base"
      onClick={onClick}
    >
      <div className={styles.navItemInner}>
        <div className={styles.navItemContent}>
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className={styles.navItemTextContainer} data-name="Content">
      <p className={styles.navItemText}>Projects</p>
    </div>
  );
}

function NavItemBase1({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className={styles.navItem}
      data-name="_Nav item base"
      onClick={onClick}
    >
      <div className={styles.navItemInner}>
        <div className={styles.navItemContent}>
          <Content2 />
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className={styles.navItemTextContainer} data-name="Content">
      <p className={styles.navItemText}>Contact</p>
    </div>
  );
}

function NavItemBase2({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className={styles.navItem}
      data-name="_Nav item base"
      onClick={onClick}
    >
      <div className={styles.navItemInner}>
        <div className={styles.navItemContent}>
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className={styles.navItemTextContainer} data-name="Content">
      <p className={styles.navItemText}>Blog</p>
    </div>
  );
}

function NavItemBase3({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className={styles.navItem}
      data-name="_Nav item base"
      onClick={onClick}
    >
      <div className={styles.navItemInner}>
        <div className={styles.navItemContent}>
          <Content4 />
        </div>
      </div>
    </div>
  );
}

import type { NavigationPage } from '../types/navigation';

function Navigation({ onNavigate }: { onNavigate?: (page: NavigationPage) => void }) {
  return (
    <div className={styles.navigation} data-name="Navigation">
      <div className={styles.navigationInner}>
        <div className={styles.navigationContent}>
          <NavItemBase onClick={() => onNavigate?.('about')} />
          <NavItemBase1 onClick={() => onNavigate?.('projects')} />
          <NavItemBase2 onClick={() => onNavigate?.('contact')} />
          <NavItemBase3 onClick={() => onNavigate?.('blog')} />
        </div>
      </div>
    </div>
  );
}

function Panel({ onNavigate }: { onNavigate?: (page: NavigationPage) => void }) {
  return (
    <div className={styles.panel} data-name="Panel">
      <SlideOutMenuHeader />
      <Navigation onNavigate={onNavigate} />
    </div>
  );
}

export default function SlideOutMenu({ onNavigate }: { onNavigate?: (page: NavigationPage) => void }) {
  return (
    <div className={styles.slideOutMenu} data-name="Slide out menu">
      <div className={styles.slideOutMenuInner}>
        <div className={styles.slideOutMenuContent}>
          <Panel onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
