import { useState } from 'react';
import svgPathsMobile from "../imports/svg-372wlbscow";
import imgHeroHeaderSection from "../assets/d3527a8bfa4f11abe21e46cce52b7399cd665b38.png";
import imgImageMobile from "../assets/20669da9ba435e07fba3a4bc32247280cb0b5900.png";
import imgImageMobile1 from "../assets/3a95aabc944d1d0860bcf4007d6cb3c4292653b5.png";
import imgContent from "../assets/26d2fceb73e66695fbe106bfc5490e82c6f2f378.png";
import Logo from "./Logo";
import { CoreValuesMobile } from "./CoreValues";
import styles from "./AboutMobile.module.css";

function Group1000003696Mobile() {
  return (
    <div className={styles.groupIcon}>
      <svg fill="none" preserveAspectRatio="none" viewBox="0 0 37 17">
        <g id="Group 1000003696">
          <path d={svgPathsMobile.p36958300} fill="white" />
          <path d={svgPathsMobile.pdb80000} fill="white" />
        </g>
      </svg>
    </div>
  );
}

function Frame1000003793Mobile({ onClick }: { onClick?: () => void }) {
  return <Logo onClick={onClick} className={styles.logoWrapper} />;
}

function Menu2() {
  return (
    <div className={styles.menuIcon}>
      <svg fill="none" viewBox="0 0 24 24">
        <path d="M3 12H21M3 6H21M3 18H21" stroke="white" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function NavMenuButton1() {
  return (
    <div className={styles.navMenuButton}>
      <Menu2 />
    </div>
  );
}

function SocialIcon({ pathData, clipPath }: { pathData: string; clipPath?: string }) {
  return (
    <div className={styles.socialIcon}>
      <svg fill="none" viewBox="0 0 24 24">
        {clipPath ? (
          <>
            <g clipPath={`url(#${clipPath})`}>
              <path d={pathData} fill="white" />
            </g>
            <defs><clipPath id={clipPath}><rect width="24" height="24" fill="white"/></clipPath></defs>
          </>
        ) : (
          <path d={pathData} fill="white" />
        )}
      </svg>
    </div>
  );
}

interface AboutProps { onNavigate?: (page: string) => void; }

export function AboutMobile({ onNavigate }: AboutProps) {
  const [mobileFooterEmail, setMobileFooterEmail] = useState('');

  const handleMobileFooterSubmit = () => {
    if (mobileFooterEmail && mobileFooterEmail.includes('@')) {
      alert('Thank you for subscribing!');
      setMobileFooterEmail('');
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <div className={styles.pageContainer}>

      {/* Hero Header */}
      <div className={styles.heroHeaderSection}>
        <img src={imgHeroHeaderSection} alt="" className={styles.heroImage} />
        <div className={styles.heroOverlay} />

        {/* Mobile Header */}
        <div className={styles.mobileHeader}>
          <Frame1000003793Mobile onClick={() => onNavigate?.('home')} />
          <NavMenuButton1 />
        </div>

        {/* Mobile Hero Content */}
        <div className={styles.mobileHeroContent}>
          <div className={styles.heroContentWrapper}>
            <h1 className={styles.heroTitle}>
              Contact Us
            </h1>
            <p className={styles.heroDescription}>
              We're a customer-focused real estate company dedicated to streamlining every step of your property pursuit...
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <section className={styles.missionSection}>
        <div className={styles.missionContainer}>
          <div className={styles.missionContent}>
            <div className={styles.missionTextWrapper}>
              <h2 className={styles.missionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                We are on a mission of creating beautiful and lush communities where our residents can feel safe...
              </p>
            </div>
            <img src={imgImageMobile} alt="Our Mission" className={styles.missionImage} />
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className={styles.visionSection}>
        <div className={styles.visionContainer}>
          <img src={imgImageMobile1} alt="Our Vision" className={styles.visionImage} />
          <div className={styles.visionTextWrapper}>
            <h2 className={styles.visionTitle}>Our Vision</h2>
            <p className={styles.visionText}>
              Our vision is to be the largest home builder in the country...
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <CoreValuesMobile />

      {/* Mobile CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <img src={imgContent} alt="" className={styles.ctaImage} />
          <div className={styles.ctaOverlay} />
          <div className={styles.ctaContent}>
            <div>
              <h3 className={styles.ctaTitle}>Be a part of our community</h3>
              <p className={styles.ctaDescription}>Are you looking to buy land, build a home or invest with us?</p>
            </div>
            <button
              onClick={() => onNavigate?.('contact')}
              className={styles.ctaButton}
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <Frame1000003793Mobile onClick={() => onNavigate?.('home')} />
          <p className={styles.footerDescription}>Crafting spaces, cultivating communities.</p>

          {/* Links */}
          <div className={styles.footerLinks}>
            <div className={styles.footerLinkColumn}>
              <p className={styles.footerLink} onClick={() => onNavigate?.('about')}>About Us</p>
              <p className={styles.footerLink} onClick={() => onNavigate?.('contact')}>Contact</p>
            </div>
            <div className={styles.footerLinkColumn}>
              <p className={styles.footerLink} onClick={() => onNavigate?.('projects')}>Project</p>
              <p className={styles.footerLink} onClick={() => onNavigate?.('blog')}>Blog</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletter}>
            <p className={styles.newsletterLabel}>Stay up to date</p>
            <input
              type="email"
              value={mobileFooterEmail}
              onChange={(e) => setMobileFooterEmail(e.target.value)}
              placeholder="Enter your email"
              className={styles.newsletterInput}
            />
            <button
              onClick={handleMobileFooterSubmit}
              className={styles.newsletterButton}
            >
              Subscribe
            </button>
          </div>

          {/* Social Icons */}
          <div className={styles.socialIcons}>
            <SocialIcon pathData={svgPathsMobile.p1f8d8b00} />
            <SocialIcon pathData={svgPathsMobile.p2ccee40} />
            <SocialIcon pathData={svgPathsMobile.p2334f790} clipPath="clip0_4_21514" />
            <SocialIcon pathData={svgPathsMobile.p3bfce500} />
            <SocialIcon pathData={svgPathsMobile.p396b2062} />
            <SocialIcon pathData={svgPathsMobile.p2e42b500} clipPath="clip0_4_21523" />
            <SocialIcon pathData={svgPathsMobile.p3a36a3c0} clipPath="clip0_4_21505" />
          </div>

          {/* Bottom Links */}
          <div className={styles.bottomLinks}>
            <div className={styles.bottomLinksRow}>
              <span className={styles.bottomLink} onClick={() => onNavigate?.('termsOfService')}>Terms</span>
              <span className={styles.bottomLink} onClick={() => onNavigate?.('privacyPolicy')}>Privacy</span>
              <span className={styles.bottomLink} onClick={() => onNavigate?.('cookiesPolicy')}>Cookies</span>
            </div>
            <p>© 2025 Pishon Communities. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
