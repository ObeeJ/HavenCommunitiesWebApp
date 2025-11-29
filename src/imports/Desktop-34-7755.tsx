import { useState, useEffect, useCallback } from "react";
import { getWhatsAppLink } from '../constants/contact';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setIsVisible(scrolled > 300);
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-16 h-16 backdrop-blur-md bg-white/20 rounded-full shadow-2xl hover:bg-white/30 hover:scale-110 transition-all duration-300 z-50 group overflow-hidden"
      aria-label="Scroll to top"
    >
      {/* Animated fluid */}
      <div 
        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#155EEF]/60 to-[#155EEF]/30 rounded-full transition-all duration-300 ease-out"
        style={{ height: `${scrollProgress}%` }}
      />
      
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ left: '20%', bottom: '10%', animationDelay: '0s', animationDuration: '2s' }} />
        <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ left: '70%', bottom: '30%', animationDelay: '0.5s', animationDuration: '2.5s' }} />
        <div className="absolute w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ left: '50%', bottom: '60%', animationDelay: '1s', animationDuration: '3s' }} />
      </div>
      
      {/* Arrow icon */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <svg className="w-6 h-6 text-white group-hover:text-white/90 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>
    </button>
  );
}
import svgPaths from "./svg-nfww7tfte7";
import imgHeroHeaderSection from "../assets/5ff434dbd2b3c4e81ad3e56d77f72e84d934d3b9.png";
import imgCard from "../assets/273e54c9def086e2a9e14d6a9216fe2ba58fcf02.png";
import imgCard1 from "../assets/05693c11afbf0b379d5b90d3bfa4c05a01ac5baf.png";
import imgCard2 from "../assets/d3527a8bfa4f11abe21e46cce52b7399cd665b38.png";
import imgCard3 from "../assets/c8c3910b0bde189c685f51c99681f3fd68c8b6ba.png";
import imgContent from "../assets/f6b4715d70b2289442ef3b2028fb01f038be2a92.png";
import imgAvatar from "../assets/98445bc012cdfdd831846828cb4c4f887f38925d.png";
import imgAvatar1 from "../assets/208f27328cc76b16a5f2b9566cc87af5adcf3983.png";
import imgAvatar2 from "../assets/f616bdf74826655ce23dd443ed3b5dc09aec80d7.png";
import imgContent1 from "../assets/26d2fceb73e66695fbe106bfc5490e82c6f2f378.png";
import logoImage from "../assets/3eada838a8a55b948f7379c648ac717c0e7f47c9.png";
import Logo from "../components/Logo";

function CoinsHand() {
  return (
    <div className="absolute left-[12px] size-[24px] top-[12px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d="M13.5295 8.35186C12.9571 8.75995 12.2566 9 11.5 9C9.567 9 8 7.433 8 5.5C8 3.567 9.567 2 11.5 2C12.753 2 13.8522 2.65842 14.4705 3.64814M6 20.0872H8.61029C8.95063 20.0872 9.28888 20.1277 9.61881 20.2086L12.3769 20.8789C12.9753 21.0247 13.5988 21.0388 14.2035 20.9214L17.253 20.3281C18.0585 20.1712 18.7996 19.7854 19.3803 19.2205L21.5379 17.1217C22.154 16.5234 22.154 15.5524 21.5379 14.9531C20.9832 14.4134 20.1047 14.3527 19.4771 14.8103L16.9626 16.6449C16.6025 16.9081 16.1643 17.0498 15.7137 17.0498H13.2855L14.8311 17.0498C15.7022 17.0498 16.4079 16.3633 16.4079 15.5159V15.2091C16.4079 14.5055 15.9156 13.892 15.2141 13.7219L12.8286 13.1417C12.4404 13.0476 12.0428 13 11.6431 13C10.6783 13 8.93189 13.7988 8.93189 13.7988L6 15.0249M20 6.5C20 8.433 18.433 10 16.5 10C14.567 10 13 8.433 13 6.5C13 4.567 14.567 3 16.5 3C18.433 3 20 4.567 20 6.5ZM2 14.6L2 20.4C2 20.9601 2 21.2401 2.10899 21.454C2.20487 21.6422 2.35785 21.7951 2.54601 21.891C2.75992 22 3.03995 22 3.6 22H4.4C4.96005 22 5.24008 22 5.45399 21.891C5.64215 21.7951 5.79513 21.6422 5.89101 21.454C6 21.2401 6 20.9601 6 20.4V14.6C6 14.0399 6 13.7599 5.89101 13.546C5.79513 13.3578 5.64215 13.2049 5.45399 13.109C5.24008 13 4.96005 13 4.4 13L3.6 13C3.03995 13 2.75992 13 2.54601 13.109C2.35785 13.2049 2.20487 13.3578 2.10899 13.546C2 13.7599 2 14.0399 2 14.6Z" stroke="var(--stroke-0, #155EEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Award03() {
  return (
    <div className="absolute left-[12px] size-[24px] top-[12px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d="M7.86866 15.4599L7 22L11.5884 19.247C11.7381 19.1572 11.8129 19.1123 11.8928 19.0947C11.9634 19.0792 12.0366 19.0792 12.1072 19.0947C12.1871 19.1123 12.2619 19.1572 12.4116 19.247L17 22L16.1319 15.4571M16.4259 4.24888C16.5803 4.6224 16.8768 4.9193 17.25 5.0743L18.5589 5.61648C18.9325 5.77121 19.2292 6.06799 19.384 6.44154C19.5387 6.81509 19.5387 7.23481 19.384 7.60836L18.8422 8.91635C18.6874 9.29007 18.6872 9.71021 18.8427 10.0837L19.3835 11.3913C19.4602 11.5764 19.4997 11.7747 19.4997 11.975C19.4998 12.1752 19.4603 12.3736 19.3837 12.5586C19.3071 12.7436 19.1947 12.9118 19.0531 13.0534C18.9114 13.195 18.7433 13.3073 18.5582 13.3839L17.2503 13.9256C16.8768 14.0801 16.5799 14.3765 16.4249 14.7498L15.8827 16.0588C15.728 16.4323 15.4312 16.7291 15.0577 16.8838C14.6841 17.0386 14.2644 17.0386 13.8909 16.8838L12.583 16.342C12.2094 16.1877 11.7899 16.188 11.4166 16.3429L10.1077 16.8843C9.73434 17.0387 9.31501 17.0386 8.94178 16.884C8.56854 16.7293 8.27194 16.4329 8.11711 16.0598L7.57479 14.7504C7.42035 14.3769 7.12391 14.08 6.75064 13.925L5.44175 13.3828C5.06838 13.2282 4.77169 12.9316 4.61691 12.5582C4.46213 12.1849 4.46192 11.7654 4.61633 11.3919L5.1581 10.0839C5.31244 9.71035 5.31213 9.29079 5.15722 8.91746L4.61623 7.60759C4.53953 7.42257 4.50003 7.22426 4.5 7.02397C4.49997 6.82369 4.5394 6.62536 4.61604 6.44032C4.69268 6.25529 4.80504 6.08716 4.94668 5.94556C5.08832 5.80396 5.25647 5.69166 5.44152 5.61508L6.74947 5.07329C7.12265 4.91898 7.41936 4.6229 7.57448 4.25004L8.11664 2.94111C8.27136 2.56756 8.56813 2.27078 8.94167 2.11605C9.3152 1.96132 9.7349 1.96132 10.1084 2.11605L11.4164 2.65784C11.7899 2.81218 12.2095 2.81187 12.5828 2.65696L13.8922 2.11689C14.2657 1.96224 14.6853 1.96228 15.0588 2.11697C15.4322 2.27167 15.729 2.56837 15.8837 2.94182L16.426 4.25115L16.4259 4.24888Z" stroke="var(--stroke-0, #155EEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Scales02() {
  return (
    <div className="absolute left-[12px] size-[24px] top-[12px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d="M2.50047 13H8.50047M15.5005 13H21.5005M12.0005 7V21M12.0005 7C13.3812 7 14.5005 5.88071 14.5005 4.5M12.0005 7C10.6198 7 9.50047 5.88071 9.50047 4.5M4.00047 21L20.0005 21M4.00047 4.50001L9.50047 4.5M9.50047 4.5C9.50047 3.11929 10.6198 2 12.0005 2C13.3812 2 14.5005 3.11929 14.5005 4.5M14.5005 4.5L20.0005 4.5M8.88091 14.3364C8.48022 15.8706 7.11858 17 5.50047 17C3.88237 17 2.52073 15.8706 2.12004 14.3364C2.0873 14.211 2.07093 14.1483 2.06935 13.8979C2.06838 13.7443 2.12544 13.3904 2.17459 13.2449C2.25478 13.0076 2.34158 12.8737 2.51519 12.6059L5.50047 8L8.48576 12.6059C8.65937 12.8737 8.74617 13.0076 8.82636 13.2449C8.87551 13.3904 8.93257 13.7443 8.9316 13.8979C8.93002 14.1483 8.91365 14.211 8.88091 14.3364ZM21.8809 14.3364C21.4802 15.8706 20.1186 17 18.5005 17C16.8824 17 15.5207 15.8706 15.12 14.3364C15.0873 14.211 15.0709 14.1483 15.0693 13.8979C15.0684 13.7443 15.1254 13.3904 15.1746 13.2449C15.2548 13.0076 15.3416 12.8737 15.5152 12.6059L18.5005 8L21.4858 12.6059C21.6594 12.8737 21.7462 13.0076 21.8264 13.2449C21.8755 13.3904 21.9326 13.7443 21.9316 13.8979C21.93 14.1483 21.9137 14.211 21.8809 14.3364Z" stroke="var(--stroke-0, #155EEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Frame1000003793({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex items-center relative shrink-0 cursor-pointer" onClick={onClick}>
      <img src={logoImage} alt="Haven Communities" className="h-auto w-[105px]" />
    </div>
  );
}

function ButtonsButton({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="content-stretch flex gap-[4px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" 
      data-name="Buttons/Button"
      onClick={onClick}
    >
      <p className="font-['Avenir:Normal',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">About Us</p>
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
      <p className="font-['Avenir:Normal',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Contact</p>
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

function Navigation({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'blog' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Navigation">
      <DropdownHeaderNavigationTrigger onClick={() => onNavigate?.('about')} />
      <DropdownHeaderNavigationTrigger1 onClick={() => onNavigate?.('projects')} />
      <DropdownHeaderNavigationTrigger2 onClick={() => onNavigate?.('contact')} />
      <ButtonsButton3 onClick={() => onNavigate?.('blog')} />
    </div>
  );
}

function Content({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'blog' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="Content">
      <Logo onClick={() => onNavigate?.('home')} />
      <Navigation onNavigate={onNavigate} />
    </div>
  );
}

function Container({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact') => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full max-w-[1320px] px-[32px]" data-name="Container">
      <Content onNavigate={onNavigate} />
    </div>
  );
}

function Header({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact') => void }) {
  return (
    <div className="absolute content-stretch flex flex-col h-[112px] items-center justify-center left-0 right-0 top-0" data-name="Header">
      <Container onNavigate={onNavigate} />
    </div>
  );
}

function DropdownHeaderNavigation({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact') => void }) {
  return (
    <div className="h-[112px] relative shrink-0 w-full" data-name="Dropdown header navigation">
      <Header onNavigate={onNavigate} />
    </div>
  );
}

function Frame2({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact') => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[112px] items-start relative shrink-0 w-full">
      <DropdownHeaderNavigation onNavigate={onNavigate} />
    </div>
  );
}

function Frame4({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact') => void }) {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col gap-[10px] h-[80px] items-start relative shrink-0 w-full z-[2]">
      <Frame2 onNavigate={onNavigate} />
    </div>
  );
}

function Frame1000003788() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[72px] not-italic relative shrink-0 text-[64px] text-white tracking-[-1.28px] w-full max-w-[850px]">Crafting spaces, cultivating communities</p>
      <div className="h-0 relative shrink-0 w-full max-w-[1216px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1216 1">
            <line id="Line 1" stroke="var(--stroke-0, white)" strokeOpacity="0.5" x2="1216" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="font-['Avenir:Regular',_sans-serif] leading-[30px] not-italic relative shrink-0 text-[20px] text-white w-full max-w-[850px]">We are in the service of creating communities where people feel safe, loved and protected.</p>
    </div>
  );
}

function CompanyAndQuote() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-name="Company and quote">
      <p className="font-['Avenir:Medium',_sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-center text-white w-full">Scroll Down</p>
    </div>
  );
}

function TextAndAction() {
  const handleScrollDown = () => {
    try {
      const carouselSection = document.getElementById('carousel-section');
      if (carouselSection) {
        carouselSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    } catch (error) {
      console.warn('Scroll navigation failed:', error);
      // Fallback to basic scroll
      window.scrollTo({ top: window.innerHeight });
    }
  };

  return (
    <div 
      className="backdrop-blur-[1px] backdrop-filter bg-[rgba(255,255,255,0.3)] box-border content-stretch flex flex-col gap-[12px] h-[64px] items-center justify-center px-[20px] py-[24px] relative rounded-[234px] shrink-0 w-[264px] cursor-pointer hover:bg-[rgba(255,255,255,0.4)] transition-all" 
      data-name="Text and action"
      onClick={handleScrollDown}
    >
      <CompanyAndQuote />
    </div>
  );
}

function HeadingAndAction() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-end min-h-px min-w-px relative shrink-0" data-name="Heading and action">
      <Frame1000003788 />
      <TextAndAction />
    </div>
  );
}

function HeadingAndSupportingText() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Heading and supporting text">
      <HeadingAndAction />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[12px] items-start left-0 right-0 mx-auto max-w-[1280px] px-[32px] md:px-[64px] lg:px-[112px] py-0 top-[120px] w-full" data-name="Container">
      <HeadingAndSupportingText />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[603px] relative shrink-0 w-full z-[1]">
      <div className="absolute bg-[rgba(0,0,0,0.4)] h-[683px] left-0 top-0 w-full" />
      <Container1 />
    </div>
  );
}

function HeroHeaderSection({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact') => void }) {
  return (
    <div className="content-stretch flex flex-col h-[476px] md:h-[683px] isolate items-center overflow-clip relative shrink-0 w-full z-[11]" data-name="Hero header section">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-white inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgHeroHeaderSection} />
      </div>
      <Frame4 onNavigate={onNavigate} />
      <Frame3 />
    </div>
  );
}

function HeadingAndSupportingText1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-start max-w-[768px] min-h-px min-w-[480px] not-italic relative shrink-0" data-name="Heading and supporting text">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[44px] relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">Our Communities</p>
      <p className="font-['Avenir:Regular',_sans-serif] leading-[30px] relative shrink-0 text-[#535862] text-[20px] w-full">
        <span>{`This is not a home away from home, this is `}</span>
        <span className="font-['Avenir:Heavy',_sans-serif] not-italic">HOME</span>.
      </p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start justify-between relative shrink-0 w-full" data-name="Content">
      <HeadingAndSupportingText1 />
    </div>
  );
}

function CompanyAndQuote1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Company and quote">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-full">Eden Court</p>
    </div>
  );
}

function MarkerPin01() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="marker-pin-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="marker-pin-01">
          <g id="Icon">
            <path d={svgPaths.p1b144480} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p1fac11a0} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ButtonsButton4({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" data-name="Buttons/Button" onClick={onClick}>
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Ogun State</p>
      <MarkerPin01 />
    </div>
  );
}

function TextAndAction1() {
  return (
    <div className="backdrop-blur-md backdrop-filter bg-[rgba(255,255,255,0.3)] relative rounded-[8px] shrink-0 w-full" data-name="Text and action">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start px-[20px] py-[24px] relative w-full">
          <CompanyAndQuote1 />
          <ButtonsButton4 />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] h-[504px] items-start justify-end p-[24px] relative rounded-[8px] shrink-0 w-[384px]" data-name="Card">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgCard} />
      <TextAndAction1 />
    </div>
  );
}

function CompanyAndQuote2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Company and quote">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-full">Eden Court</p>
    </div>
  );
}

function MarkerPin2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="marker-pin-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="marker-pin-01">
          <g id="Icon">
            <path d={svgPaths.p1b144480} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p1fac11a0} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ButtonsButton5({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" data-name="Buttons/Button" onClick={onClick}>
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Ogun State</p>
      <MarkerPin2 />
    </div>
  );
}

function TextAndAction2() {
  return (
    <div className="backdrop-blur-md backdrop-filter bg-[rgba(255,255,255,0.3)] relative rounded-[8px] shrink-0 w-full" data-name="Text and action">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start px-[20px] py-[24px] relative w-full">
          <CompanyAndQuote2 />
          <ButtonsButton5 />
        </div>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] h-[504px] items-start justify-end p-[24px] relative rounded-[8px] shrink-0 w-[384px]" data-name="Card">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgCard1} />
      <TextAndAction2 />
    </div>
  );
}

function CompanyAndQuote3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Company and quote">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-full">Eden Court</p>
    </div>
  );
}

function MarkerPin3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="marker-pin-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="marker-pin-01">
          <g id="Icon">
            <path d={svgPaths.p1b144480} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p1fac11a0} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ButtonsButton6({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" data-name="Buttons/Button" onClick={onClick}>
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Ogun State</p>
      <MarkerPin3 />
    </div>
  );
}

function TextAndAction3() {
  return (
    <div className="backdrop-blur-md backdrop-filter bg-[rgba(255,255,255,0.3)] relative rounded-[8px] shrink-0 w-full" data-name="Text and action">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start px-[20px] py-[24px] relative w-full">
          <CompanyAndQuote3 />
          <ButtonsButton6 />
        </div>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] h-[504px] items-start justify-end p-[24px] relative rounded-[8px] shrink-0 w-[384px]" data-name="Card">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgCard2} />
      <TextAndAction3 />
    </div>
  );
}

function CompanyAndQuote4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Company and quote">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-full">Eden Court</p>
    </div>
  );
}

function MarkerPin4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="marker-pin-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="marker-pin-01">
          <g id="Icon">
            <path d={svgPaths.p1b144480} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p1fac11a0} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ButtonsButton7({ onClick }: { onClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0 cursor-pointer" data-name="Buttons/Button" onClick={onClick}>
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Ogun State</p>
      <MarkerPin4 />
    </div>
  );
}

function TextAndAction4() {
  return (
    <div className="backdrop-blur-md backdrop-filter bg-[rgba(255,255,255,0.3)] relative rounded-[8px] shrink-0 w-full" data-name="Text and action">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start px-[20px] py-[24px] relative w-full">
          <CompanyAndQuote4 />
          <ButtonsButton7 />
        </div>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] h-[504px] items-start justify-end p-[24px] relative rounded-[8px] shrink-0 w-[384px]" data-name="Card">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgCard3} />
      <TextAndAction4 />
    </div>
  );
}

function CaseStudies({ currentIndex }: { currentIndex: number }) {
  const cards = [<Card key="0" />, <Card1 key="1" />, <Card2 key="2" />, <Card3 key="3" />];
  
  // Show 3 cards at a time
  const visibleCards = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % cards.length;
    visibleCards.push(cards[index]);
  }

  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 overflow-hidden transition-all duration-500" data-name="Case studies">
      {visibleCards}
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow-left">
          <path d={svgPaths.pbf7d180} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TestiomonialCarouselArrow({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="content-stretch flex gap-[12px] items-center justify-center relative rounded-[28px] shrink-0 size-[56px] cursor-pointer hover:bg-gray-50 transition-colors border border-[#D5D7DA]" 
      data-name="_Testiomonial carousel arrow"
      onClick={onClick}
    >
      <ArrowLeft />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow-right">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TestiomonialCarouselArrow1({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="content-stretch flex gap-[12px] items-center justify-center relative rounded-[28px] shrink-0 size-[56px] cursor-pointer hover:bg-gray-50 transition-colors border border-[#D5D7DA]" 
      data-name="_Testiomonial carousel arrow"
      onClick={onClick}
    >
      <ArrowRight />
    </div>
  );
}

function Arrows({ onPrev, onNext, currentIndex, totalItems }: { onPrev: () => void; onNext: () => void; currentIndex: number; totalItems: number }) {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Arrows">
      <TestiomonialCarouselArrow onClick={onPrev} />
      <TestiomonialCarouselArrow1 onClick={onNext} />
    </div>
  );
}

function Content2({ onPrev, onNext, currentIndex, totalItems }: { onPrev: () => void; onNext: () => void; currentIndex: number; totalItems: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0" data-name="Content">
      <CaseStudies currentIndex={currentIndex} />
      <Arrows onPrev={onPrev} onNext={onNext} currentIndex={currentIndex} totalItems={totalItems} />
    </div>
  );
}

function Container2({ onPrev, onNext, currentIndex, totalItems }: { onPrev: () => void; onNext: () => void; currentIndex: number; totalItems: number }) {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] items-start max-w-inherit px-[32px] py-0 relative w-full">
          <Content1 />
          <Content2 onPrev={onPrev} onNext={onNext} currentIndex={currentIndex} totalItems={totalItems} />
        </div>
      </div>
    </div>
  );
}

function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = 4;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
  }, [totalItems]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    try {
      const interval = setInterval(() => {
        try {
          handleNext();
        } catch (error) {
          console.warn('Carousel auto-rotation failed:', error);
        }
      }, 5000);

      return () => {
        try {
          clearInterval(interval);
        } catch (error) {
          console.warn('Failed to clear carousel interval:', error);
        }
      };
    } catch (error) {
      console.error('Failed to setup carousel auto-rotation:', error);
    }
  }, [handleNext]);

  return (
    <div id="carousel-section" className="bg-white box-border content-stretch flex flex-col gap-[64px] items-center overflow-clip px-0 py-[96px] relative shrink-0 w-full z-10" data-name="Testimonial section">
      <Container2 onPrev={handlePrev} onNext={handleNext} currentIndex={currentIndex} totalItems={totalItems} />
    </div>
  );
}

function HeadingAndSubheading() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Heading and subheading">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[44px] not-italic relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">What we offer our Clients</p>
    </div>
  );
}

function HeadingAndSupportingText2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start max-w-[768px] relative shrink-0 w-full" data-name="Heading and supporting text">
      <HeadingAndSubheading />
      <p className="font-['Avenir:Regular',_sans-serif] leading-[30px] not-italic relative shrink-0 text-[#535862] text-[20px] w-full">We offer a wide range of product and services, each tailored to the specific needs of our customers.</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Content">
      <HeadingAndSupportingText2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start max-w-inherit px-[32px] py-0 relative w-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function MarkerPin04() {
  return (
    <div className="absolute left-[12px] size-[24px] top-[12px]" data-name="marker-pin-04">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="marker-pin-04">
          <path d={svgPaths.p2e30000} id="Icon" stroke="var(--stroke-0, #155EEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function FeaturedIcon() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 size-[48px]" data-name="Featured icon">
      <div className="overflow-clip relative rounded-[inherit] size-[48px]">
        <MarkerPin04 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#D5D7DA] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[4px] items-start not-italic pb-0 pt-[10px] px-0 relative shrink-0 w-full" data-name="Text and supporting text">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[28px] relative shrink-0 text-[#181d27] text-[18px] w-full">Land Banking</p>
      <p className="font-['Avenir:Regular',_sans-serif] leading-[24px] relative shrink-0 text-[#535862] text-[16px] w-full">We provide lands for investment opportunities where customers can earn an appreciable ROI.</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Content">
      <TextAndSupportingText />
    </div>
  );
}

function FeatureText() {
  return (
    <div className="content-stretch flex gap-[16px] items-start max-w-[560px] min-w-[320px] relative shrink-0 w-full" data-name="_Feature text">
      <FeaturedIcon />
      <Content4 />
    </div>
  );
}

function Globe05() {
  return (
    <div className="absolute left-[12px] size-[24px] top-[12px]" data-name="globe-05">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path d="M15 2.4578C14.053 2.16035 13.0452 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.2847 21.5681 8.67022 20.8071 7.25945M17 5.75H17.005M10.5001 21.8883L10.5002 19.6849C10.5002 19.5656 10.5429 19.4502 10.6205 19.3596L13.1063 16.4594C13.3106 16.2211 13.2473 15.8556 12.9748 15.6999L10.1185 14.0677C10.0409 14.0234 9.97663 13.9591 9.93234 13.8814L8.07046 10.6186C7.97356 10.4488 7.78657 10.3511 7.59183 10.3684L2.06418 10.8607M21 6C21 8.20914 19 10 17 12C15 10 13 8.20914 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6ZM17.25 5.75C17.25 5.88807 17.1381 6 17 6C16.8619 6 16.75 5.88807 16.75 5.75C16.75 5.61193 16.8619 5.5 17 5.5C17.1381 5.5 17.25 5.61193 17.25 5.75Z" stroke="#155EEF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function FeaturedIcon1() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 size-[48px]" data-name="Featured icon">
      <div className="overflow-clip relative rounded-[inherit] size-[48px]">
        <Globe05 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#D5D7DA] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function TextAndSupportingText1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[4px] items-start not-italic pb-0 pt-[10px] px-0 relative shrink-0 w-full" data-name="Text and supporting text">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[28px] relative shrink-0 text-[#181d27] text-[18px] w-full">Buy and Build Lands</p>
      <p className="font-['Avenir:Regular',_sans-serif] leading-[24px] relative shrink-0 text-[#535862] text-[16px] w-full">We provide lands that customers can buy and build their dream homes on. Infrastructures are already in place.</p>
    </div>
  );
}

function Content5() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Content">
      <TextAndSupportingText1 />
    </div>
  );
}

function FeatureText1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start max-w-[560px] min-w-[320px] relative shrink-0 w-full" data-name="_Feature text">
      <FeaturedIcon1 />
      <Content5 />
    </div>
  );
}

function Building07() {
  return (
    <div className="absolute left-[12px] size-[24px] top-[12px]" data-name="building-07">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="building-07">
          <path d={svgPaths.p12238580} id="Icon" stroke="var(--stroke-0, #155EEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function FeaturedIcon2() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 size-[48px]" data-name="Featured icon">
      <div className="overflow-clip relative rounded-[inherit] size-[48px]">
        <Building07 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#D5D7DA] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function TextAndSupportingText2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[4px] items-start not-italic pb-0 pt-[10px] px-0 relative shrink-0 w-full" data-name="Text and supporting text">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[28px] relative shrink-0 text-[#181d27] text-[18px] w-full">Construction</p>
      <p className="font-['Avenir:Regular',_sans-serif] leading-[24px] relative shrink-0 text-[#535862] text-[16px] w-full">We engage in construction of homes for our clients. We develop properties that our clients can truly call home.</p>
    </div>
  );
}

function Content6() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Content">
      <TextAndSupportingText2 />
    </div>
  );
}

function FeatureText2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start max-w-[560px] min-w-[320px] relative shrink-0 w-full" data-name="_Feature text">
      <FeaturedIcon2 />
      <Content6 />
    </div>
  );
}

function Content7() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[48px] grow items-start max-w-[560px] min-h-px min-w-px relative shrink-0" data-name="Content">
      <FeatureText />
      <FeatureText1 />
      <FeatureText2 />
    </div>
  );
}

function Content8() {
  return (
    <div className="basis-0 grow h-[366px] min-h-px min-w-px relative rounded-[16px] shrink-0" data-name="Content">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-neutral-100 inset-0 rounded-[16px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[16px] size-full" src={imgContent} />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[64px] items-center max-w-inherit px-[32px] py-0 relative w-full">
          <Content7 />
          <Content8 />
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[64px] items-center overflow-clip pb-[96px] pt-[24px] px-0 relative shrink-0 w-full z-[9]" data-name="Features section">
      <Container3 />
      <Container4 />
    </div>
  );
}



function HeadingAndSupportingText3() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center max-w-[768px] not-italic relative shrink-0 text-center w-full" data-name="Heading and supporting text">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[44px] relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">Wall of love</p>
      <p className="font-['Avenir:Regular',_sans-serif] leading-[30px] relative shrink-0 text-[#535862] text-[20px] w-full">Hear first-hand from our incredible community of customers.</p>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full" data-name="Content">
      <HeadingAndSupportingText3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start max-w-inherit px-[32px] py-0 relative w-full">
          <Content9 />
        </div>
      </div>
    </div>
  );
}

function StarIcon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_17_25825)" id="Star icon">
          <path d={svgPaths.p2f878000} fill="var(--fill-0, #F5F5F5)" id="Star background" />
          <g clipPath="url(#clip1_17_25825)" id="Star">
            <path d={svgPaths.p2f878000} fill="var(--fill-0, #FDB022)" id="Star_2" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_17_25825">
            <rect fill="white" height="20" width="20" />
          </clipPath>
          <clipPath id="clip1_17_25825">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Stars1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Stars">
      {[...Array(5).keys()].map((_, i) => (
        <StarIcon5 key={i} />
      ))}
    </div>
  );
}

function StarsAndQuote1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Stars and quote">
      <Stars1 />
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#181d27] text-[16px] w-[min-content]">
        <span>{`As an entrepreneur I’ve always looked for safe and reliable ways of diversifying my portfolio. `}</span>
        <span className="font-['Avenir:Heavy',_sans-serif] text-[#155eef]">Haven</span>
        <span>{` has provided a balanced and healthy mix to my portfolio. Now i engage in Land Banking and I also plan on building on one in the future.`}</span>
      </p>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="pointer-events-none relative rounded-[200px] shrink-0 size-[48px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[200px]">
        <div className="absolute bg-[#e9dcbb] inset-0 rounded-[200px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[200px] size-full" src={imgAvatar} />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 rounded-[200px]" />
    </div>
  );
}

function VerifiedTick1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Verified tick">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_17_25812)" id="Verified tick">
          <path d={svgPaths.p235ed320} fill="var(--fill-0, #2E90FA)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p18655980} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_25812">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TextAndVerifiedTick1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Text and verified tick">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#181d27] text-[16px] text-nowrap whitespace-pre">Kehinde</p>
      <VerifiedTick1 />
    </div>
  );
}

function TextAndSupportingText4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Text and supporting text">
      <TextAndVerifiedTick1 />
    </div>
  );
}

function AvatarAndText1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Avatar and text">
      <Avatar1 />
      <TextAndSupportingText4 />
    </div>
  );
}

function Card5() {
  return (
    <div className="basis-0 bg-neutral-50 grow min-h-px min-w-[360px] relative rounded-[12px] shrink-0" data-name="Card">
      <div className="min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start min-w-inherit p-[32px] relative w-full">
          <StarsAndQuote1 />
          <AvatarAndText1 />
        </div>
      </div>
    </div>
  );
}

function StarIcon10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_17_25825)" id="Star icon">
          <path d={svgPaths.p2f878000} fill="var(--fill-0, #F5F5F5)" id="Star background" />
          <g clipPath="url(#clip1_17_25825)" id="Star">
            <path d={svgPaths.p2f878000} fill="var(--fill-0, #FDB022)" id="Star_2" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_17_25825">
            <rect fill="white" height="20" width="20" />
          </clipPath>
          <clipPath id="clip1_17_25825">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Stars2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Stars">
      {[...Array(5).keys()].map((_, i) => (
        <StarIcon10 key={i} />
      ))}
    </div>
  );
}

function StarsAndQuote2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Stars and quote">
      <Stars2 />
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#181d27] text-[16px] w-[334px]">
        <span>{`I have always longed for a community of like minded individuals. A place where I can call home, where I can always go back to after the days hustle and bustle. And most importantly a place where I can feel safe and raise a family. `}</span>
        <span className="font-['Avenir:Heavy',_sans-serif] text-[#155eef]">Haven</span>
        <span>{` has provided that for me.`}</span>
      </p>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="pointer-events-none relative rounded-[200px] shrink-0 size-[48px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[200px]">
        <div className="absolute bg-[#c7d1b0] inset-0 rounded-[200px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[200px] size-full" src={imgAvatar1} />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 rounded-[200px]" />
    </div>
  );
}

function VerifiedTick2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Verified tick">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_17_25812)" id="Verified tick">
          <path d={svgPaths.p235ed320} fill="var(--fill-0, #2E90FA)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p18655980} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_25812">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TextAndVerifiedTick2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Text and verified tick">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#181d27] text-[16px] text-nowrap whitespace-pre">Dare</p>
      <VerifiedTick2 />
    </div>
  );
}

function TextAndSupportingText5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Text and supporting text">
      <TextAndVerifiedTick2 />
    </div>
  );
}

function AvatarAndText2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Avatar and text">
      <Avatar2 />
      <TextAndSupportingText5 />
    </div>
  );
}

function Card6() {
  return (
    <div className="basis-0 bg-neutral-50 grow min-h-px min-w-[360px] relative rounded-[12px] shrink-0" data-name="Card">
      <div className="min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start min-w-inherit p-[32px] relative w-full">
          <StarsAndQuote2 />
          <AvatarAndText2 />
        </div>
      </div>
    </div>
  );
}

function StarIcon15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Star icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_17_25825)" id="Star icon">
          <path d={svgPaths.p2f878000} fill="var(--fill-0, #F5F5F5)" id="Star background" />
          <g clipPath="url(#clip1_17_25825)" id="Star">
            <path d={svgPaths.p2f878000} fill="var(--fill-0, #FDB022)" id="Star_2" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_17_25825">
            <rect fill="white" height="20" width="20" />
          </clipPath>
          <clipPath id="clip1_17_25825">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Stars3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Stars">
      {[...Array(5).keys()].map((_, i) => (
        <StarIcon15 key={i} />
      ))}
    </div>
  );
}

function StarsAndQuote3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Stars and quote">
      <Stars3 />
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#181d27] text-[16px] w-[min-content]">
        <span>{`I love my job but I desire a life without constant work and financial worries. I believe real estate is the most reliable asset class to Invest in and `}</span>
        <span className="font-['Avenir:Heavy',_sans-serif] text-[#155eef]">Haven</span>
        <span>{` has made the process easy and seamless. I have hope for my future and I’m excited for what is to come.`}</span>
      </p>
    </div>
  );
}

function Avatar3() {
  return (
    <div className="pointer-events-none relative rounded-[200px] shrink-0 size-[48px]" data-name="Avatar">
      <div aria-hidden="true" className="absolute inset-0 rounded-[200px]">
        <div className="absolute bg-[#e5ddce] inset-0 rounded-[200px]" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[200px] size-full" src={imgAvatar2} />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 rounded-[200px]" />
    </div>
  );
}

function VerifiedTick3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Verified tick">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_17_25812)" id="Verified tick">
          <path d={svgPaths.p235ed320} fill="var(--fill-0, #2E90FA)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p18655980} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_17_25812">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TextAndVerifiedTick3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Text and verified tick">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#181d27] text-[16px] text-nowrap whitespace-pre">Kayode</p>
      <VerifiedTick3 />
    </div>
  );
}

function TextAndSupportingText6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Text and supporting text">
      <TextAndVerifiedTick3 />
    </div>
  );
}

function AvatarAndText3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Avatar and text">
      <Avatar3 />
      <TextAndSupportingText6 />
    </div>
  );
}

function Card7() {
  return (
    <div className="basis-0 bg-neutral-50 grow min-h-px min-w-[360px] relative rounded-[12px] shrink-0" data-name="Card">
      <div className="min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start min-w-inherit p-[32px] relative w-full">
          <StarsAndQuote3 />
          <AvatarAndText3 />
        </div>
      </div>
    </div>
  );
}

function Frame1000003789() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full max-w-[1216px]">
      <Card5 />
      <Card6 />
      <Card7 />
    </div>
  );
}

function Cards() {
  return (
    <div className="basis-0 content-start flex flex-wrap gap-[24px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Cards">
      <Frame1000003789 />
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex gap-[32px] items-start justify-center relative shrink-0 w-full" data-name="Content">
      <Cards />
    </div>
  );
}

function Container6() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] items-center max-w-inherit px-[32px] py-0 relative w-full">
          <Container5 />
          <Content10 />
        </div>
      </div>
    </div>
  );
}

function TestimonialSection1() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[64px] items-center overflow-clip pb-[96px] pt-[24px] px-0 relative shrink-0 w-full z-[8]" data-name="Testimonial section">
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-px relative shrink-0 w-full max-w-[1280px]" data-name="Container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1280 1">
        <g id="Container"></g>
      </svg>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full z-[5]" data-name="–––– Section divider ––––">
      <Container7 />
    </div>
  );
}

function HeadingAndSupportingText4() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0 text-white w-full" data-name="Heading and supporting text">
      <p className="font-['Avenir:Heavy',_sans-serif] leading-[44px] min-w-full relative shrink-0 text-[36px] tracking-[-0.72px] w-[min-content]">{`Be a part of our community `}</p>
      <p className="font-['Avenir:Regular',_sans-serif] leading-[30px] relative shrink-0 text-[20px] w-full max-w-[558px]">Are you looking to buy land, build a home or invest with us?</p>
    </div>
  );
}

function CompanyAndQuote5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-name="Company and quote">
      <p className="font-['Avenir:Medium',_sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-center text-white w-full">Talk to Sales</p>
    </div>
  );
}

function TextAndAction5() {
  const handleContactClick = () => {
    const whatsappNumber = '+2348033892345';
    const message = encodeURIComponent('Hello, I would like to talk to sales about your properties and investment opportunities.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div 
      className="backdrop-blur-[1px] backdrop-filter bg-[rgba(255,255,255,0.3)] box-border content-stretch flex flex-col gap-[12px] h-[64px] items-center justify-center px-[20px] py-[24px] relative rounded-[234px] shrink-0 w-[264px] cursor-pointer hover:bg-[rgba(255,255,255,0.4)] transition-all" 
      data-name="Text and action"
      onClick={handleContactClick}
    >
      <CompanyAndQuote5 />
    </div>
  );
}

function Content11() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[48px] items-start justify-center left-0 p-[64px] top-[83px] w-[608px]" data-name="Content">
      <HeadingAndSupportingText4 />
      <TextAndAction5 />
    </div>
  );
}

function Content12() {
  return (
    <div className="basis-0 grow h-[480px] min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="absolute bg-[rgba(0,0,0,0.4)] h-[480px] left-0 rounded-[24px] top-0 w-full" />
      <Content11 />
    </div>
  );
}

function Content13() {
  return (
    <div className="box-border content-stretch flex items-center overflow-clip relative rounded-[24px] shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.08),0px_8px_8px_-4px_rgba(10,13,18,0.03),0px_3px_3px_-1.5px_rgba(10,13,18,0.04)] shrink-0 w-full max-w-[1216px]" data-name="Content">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[24px] size-full" src={imgContent1} />
      <Content12 />
    </div>
  );
}

function Container8() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center max-w-inherit size-full">
        <div className="box-border content-stretch flex items-center justify-center max-w-inherit px-[32px] py-0 relative w-full">
          <Content13 />
        </div>
      </div>
    </div>
  );
}

function CtaSection() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[64px] items-center justify-center overflow-clip px-0 py-[96px] relative shrink-0 w-full z-[3]" data-name="CTA section">
      <Container8 />
    </div>
  );
}

function Frame1000003794({ onClick }: { onClick?: () => void }) {
  return (
    <Logo onClick={onClick} variant="white" />
  );
}

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
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Project</p>
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

function FooterLinks({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'blog' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="Footer links">
      <FooterLink onClick={() => onNavigate?.('about')} />
      <FooterLink1 onClick={() => onNavigate?.('projects')} />
      <FooterLink2 onClick={() => onNavigate?.('contact')} />
      <FooterLink3 onClick={() => onNavigate?.('blog')} />
    </div>
  );
}

function LogoAndLinks({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'blog' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start min-w-[280px] relative shrink-0" data-name="Logo and links">
      <Frame1000003794 onClick={() => onNavigate?.('home')} />
      <p className="font-['Avenir:Regular',_sans-serif] h-[48px] leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full max-w-[545px]">Crafting spaces, cultivating communities.</p>
      <FooterLinks onNavigate={onNavigate} />
    </div>
  );
}

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

function Content15({ onNavigate, email, onEmailChange, onSubmit }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'blog' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void; email: string; onEmailChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className="content-start flex flex-wrap gap-[48px] h-[178px] items-start justify-between relative shrink-0 w-full" data-name="Content">
      <LogoAndLinks onNavigate={onNavigate} />
      <Frame1000003769 email={email} onEmailChange={onEmailChange} onSubmit={onSubmit} />
    </div>
  );
}

function Container9({ onNavigate, email, onEmailChange, onSubmit }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'blog' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void; email: string; onEmailChange: (value: string) => void; onSubmit: () => void }) {
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

function FooterLinks1({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'blog' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className="content-stretch flex font-['Avenir:Medium',_sans-serif] gap-[16px] items-start leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" data-name="Footer links">
      <p className="relative shrink-0 cursor-pointer hover:underline" onClick={() => onNavigate?.('termsOfService')}>Terms</p>
      <p className="relative shrink-0 cursor-pointer hover:underline" onClick={() => onNavigate?.('privacyPolicy')}>Privacy</p>
      <p className="relative shrink-0 cursor-pointer hover:underline" onClick={() => onNavigate?.('cookiesPolicy')}>Cookies</p>
    </div>
  );
}

function Content16({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'blog' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  return (
    <div className="box-border content-center flex flex-wrap gap-[24px] items-center justify-between pb-0 pt-[32px] px-0 relative shrink-0 w-full" data-name="Content">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(127,86,217,0)] border-solid inset-0 pointer-events-none" />
      <p className="font-['Avenir:Medium',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">© 2025 Pishon Communities. All rights reserved.</p>
      <FooterLinks1 onNavigate={onNavigate} />
    </div>
  );
}

function Container10({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'blog' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
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

function Footer({ onNavigate, email, onEmailChange, onSubmit }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'blog' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void; email: string; onEmailChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className="bg-[#155eef] box-border content-stretch flex flex-col gap-[64px] items-center overflow-clip pb-[48px] pt-[64px] px-0 relative shrink-0 w-full z-[1]" data-name="Footer">
      <Container9 onNavigate={onNavigate} email={email} onEmailChange={onEmailChange} onSubmit={onSubmit} />
      <Container10 onNavigate={onNavigate} />
    </div>
  );
}

export default function Desktop({ onNavigate }: { onNavigate?: (page: 'home' | 'about' | 'contact' | 'projects' | 'blog' | 'privacyPolicy' | 'termsOfService' | 'cookiesPolicy') => void }) {
  const [footerEmail, setFooterEmail] = useState('');

  const handleSubmit = () => {
    try {
      if (!footerEmail?.trim()) {
        alert('Please enter a valid email address.');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(footerEmail)) {
        alert('Please enter a valid email format.');
        return;
      }
      
      console.log('Subscribing email:', footerEmail);
      // TODO: Implement actual subscription logic
      alert('Thank you for subscribing!');
      setFooterEmail('');
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Please try again.');
    }
  };

  return (
    <div className="bg-white content-stretch flex flex-col isolate items-center relative size-full overflow-x-hidden max-w-full" data-name="Desktop">
      <HeroHeaderSection onNavigate={onNavigate} />
      <TestimonialSection />

      <FeaturesSection />
      <TestimonialSection1 />
      <SectionDivider />
      <CtaSection />
      <Footer onNavigate={onNavigate} email={footerEmail} onEmailChange={setFooterEmail} onSubmit={handleSubmit} />
      <ScrollToTopButton />
    </div>
  );
}