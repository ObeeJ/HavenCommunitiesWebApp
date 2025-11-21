import { useState } from 'react';
import svgPathsMobile from "../imports/svg-372wlbscow";
import imgHeroHeaderSection from "../assets/d3527a8bfa4f11abe21e46cce52b7399cd665b38.png";
import imgImageMobile from "../assets/20669da9ba435e07fba3a4bc32247280cb0b5900.png";
import imgImageMobile1 from "../assets/3a95aabc944d1d0860bcf4007d6cb3c4292653b5.png";
import imgContent from "../assets/26d2fceb73e66695fbe106bfc5490e82c6f2f378.png";
import Logo from "./Logo";
import { CoreValuesMobile } from "./CoreValues";

function Group1000003696Mobile() {
  return (
    <div className="h-[16.29px] relative shrink-0 w-[36.367px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 17">
        <g id="Group 1000003696">
          <path d={svgPathsMobile.p36958300} fill="white" />
          <path d={svgPathsMobile.pdb80000} fill="white" />
        </g>
      </svg>
    </div>
  );
}

function Frame1000003793Mobile({ onClick }: { onClick?: () => void }) {
  return <Logo onClick={onClick} className="w-[78.75px]" />;
}

function Menu2() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <path d="M3 12H21M3 6H21M3 18H21" stroke="white" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function NavMenuButton1() {
  return (
    <div className="flex items-center justify-center p-2 rounded-lg">
      <Menu2 />
    </div>
  );
}

function SocialIcon({ pathData, clipPath }: { pathData: string; clipPath?: string }) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
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
    <div className="bg-white flex flex-col min-h-screen w-full">

      {/* Hero Header */}
      <div className="relative h-[476px] w-full">
        <img src={imgHeroHeaderSection} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Mobile Header */}
        <div className="absolute top-0 left-0 right-0 h-[72px] z-10 flex items-center justify-between px-4">
          <Frame1000003793Mobile onClick={() => onNavigate?.('home')} />
          <NavMenuButton1 />
        </div>

        {/* Mobile Hero Content */}
        <div className="absolute inset-x-0 top-[72px] h-[404px] flex items-start justify-center">
          <div className="w-[343px] mt-[46px] flex flex-col gap-8">
            <h1 className="text-white text-[36px] leading-[44px] font-bold tracking-[-0.72px]">
              Contact Us
            </h1>
            <p className="text-white text-[16px] leading-7">
              We're a customer-focused real estate company dedicated to streamlining every step of your property pursuit...
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <section className="px-4 py-16">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-col gap-8 w-full max-w-xl">
              <h2 className="text-[30px] leading-[38px] font-bold text-[#181d27] tracking-[-0.72px]">Our Mission</h2>
              <p className="text-[16px] leading-6 text-[#535862]">
                We are on a mission of creating beautiful and lush communities where our residents can feel safe...
              </p>
            </div>
            <img src={imgImageMobile} alt="Our Mission" className="w-full h-[240px] object-cover rounded-lg" />
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-8">
          <img src={imgImageMobile1} alt="Our Vision" className="w-full h-[240px] object-cover rounded-lg order-1" />
          <div className="flex flex-col gap-8 w-full max-w-xl">
            <h2 className="text-[30px] leading-[38px] font-bold text-[#181d27] tracking-[-0.72px]">Our Vision</h2>
            <p className="text-[16px] leading-6 text-[#535862]">
              Our vision is to be the largest home builder in the country...
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <CoreValuesMobile />

      {/* Mobile CTA */}
      <section className="px-4 py-16">
        <div className="relative h-[274px] rounded-2xl overflow-hidden">
          <img src={imgContent} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute left-6 top-10 right-6 flex flex-col gap-8 text-white">
            <div>
              <h3 className="text-[23px] font-bold leading-9">Be a part of our community</h3>
              <p className="text-[18px] mt-5">Are you looking to buy land, build a home or invest with us?</p>
            </div>
            <button
              onClick={() => onNavigate?.('contact')}
              className="bg-white/30 backdrop-blur-sm border border-white/50 text-white py-4 px-8 rounded-full w-fit text-[18px] hover:bg-white/40 transition"
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Footer */}
      <footer className="bg-[#155eef] px-4 pt-12 pb-8 text-white">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
          <Frame1000003793Mobile onClick={() => onNavigate?.('home')} />
          <p className="text-[16px] max-w-[320px]">Crafting spaces, cultivating communities.</p>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 text-[16px]">
            <div className="flex flex-col gap-3">
              <p className="cursor-pointer hover:opacity-80" onClick={() => onNavigate?.('about')}>About Us</p>
              <p className="cursor-pointer hover:opacity-80" onClick={() => onNavigate?.('contact')}>Contact</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="cursor-pointer hover:opacity-80" onClick={() => onNavigate?.('projects')}>Project</p>
              <p className="cursor-pointer hover:opacity-80" onClick={() => onNavigate?.('blog')}>Blog</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <p className="text-[14px]">Stay up to date</p>
            <input
              type="email"
              value={mobileFooterEmail}
              onChange={(e) => setMobileFooterEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white text-gray-600 px-4 py-3 rounded-full outline-none"
            />
            <button
              onClick={handleMobileFooterSubmit}
              className="bg-[#00359e] py-3 rounded-full text-[16px] hover:opacity-90"
            >
              Subscribe
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6">
            <SocialIcon pathData={svgPathsMobile.p1f8d8b00} />
            <SocialIcon pathData={svgPathsMobile.p2ccee40} />
            <SocialIcon pathData={svgPathsMobile.p2334f790} clipPath="clip0_4_21514" />
            <SocialIcon pathData={svgPathsMobile.p3bfce500} />
            <SocialIcon pathData={svgPathsMobile.p396b2062} />
            <SocialIcon pathData={svgPathsMobile.p2e42b500} clipPath="clip0_4_21523" />
            <SocialIcon pathData={svgPathsMobile.p3a36a3c0} clipPath="clip0_4_21505" />
          </div>

          {/* Bottom Links */}
          <div className="flex flex-col gap-4 text-[15px]">
            <div className="flex gap-4">
              <span className="cursor-pointer hover:opacity-80" onClick={() => onNavigate?.('termsOfService')}>Terms</span>
              <span className="cursor-pointer hover:opacity-80" onClick={() => onNavigate?.('privacyPolicy')}>Privacy</span>
              <span className="cursor-pointer hover:opacity-80" onClick={() => onNavigate?.('cookiesPolicy')}>Cookies</span>
            </div>
            <p>© 2025 Pishon Communities. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
