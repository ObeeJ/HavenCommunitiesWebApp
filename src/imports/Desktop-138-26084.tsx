import svgPaths from "./svg-osgqemuqyh";
import imgImage from "../assets/b2a4d4d2696958d3a420b3897c4c42bf3d9c784f.png";
import img from "../assets/7cea1cc7a63d49724f662dc4ca77ec22ed421454.png";

function Group1() {
  return (
    <div className="h-[21.72px] relative shrink-0 w-[48.49px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 22">
        <g id="Group 1000003696">
          <path d={svgPaths.p27cf2e80} fill="var(--fill-0, #155EEF)" id="Vector 2" />
          <path d={svgPaths.p14e48780} fill="var(--fill-0, #155EEF)" id="Vector 1" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[4.5px] items-center relative shrink-0 w-[105px]">
      <Group1 />
      <p className="font-['Times_New_Roman:Regular',sans-serif] leading-[18px] min-w-full not-italic relative shrink-0 text-[#155eef] text-[24px] w-[min-content]">H A V E N</p>
      <p className="font-['Microsoft_Sans_Serif:Regular',sans-serif] leading-[18px] min-w-full not-italic relative shrink-0 text-[#155eef] text-[8.25px] text-center w-[min-content]">C O M M U N I T I E S</p>
    </div>
  );
}

function ContrastBorder() {
  return (
    <div className="absolute inset-0 opacity-[0.08] rounded-[200px]" data-name="Contrast border">
      <div aria-hidden="true" className="absolute border-[0.75px] border-black border-solid inset-0 pointer-events-none rounded-[200px]" />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Content">
      <button className="box-border content-stretch cursor-pointer flex flex-col items-start overflow-visible p-0 relative shrink-0" data-name="Dropdown">
        <div className="bg-[#f2f4f7] relative rounded-[200px] shrink-0 size-[40px]" data-name="Avatar">
          <ContrastBorder />
          <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-1/2 not-italic text-[#475467] text-[16px] text-center top-[calc(50%-12px)] translate-x-[-50%] w-[40px]">JS</p>
        </div>
      </button>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[76px]">
      <Content />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="log-out-03">
        <div className="absolute inset-[14.09%_12.5%]" data-name="Icon">
          <div className="absolute inset-[-5.8%_-5.56%]" style={{ "--stroke-0": "rgba(232, 61, 61, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p4b81600} id="Icon" stroke="var(--stroke-0, #E83D3D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Navigation">
      <button className="box-border content-stretch cursor-pointer flex flex-col items-center overflow-visible p-0 relative shrink-0" data-name="_Dropdown header navigation trigger">
        <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Avenir:Heavy',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#475467] text-[16px] text-nowrap whitespace-pre">Admin</p>
        </div>
      </button>
      <button className="box-border content-stretch cursor-pointer flex flex-col items-center overflow-visible p-0 relative shrink-0" data-name="_Dropdown header navigation trigger">
        <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip relative shrink-0" data-name="Buttons/Button">
          <p className="font-['Avenir:Heavy',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#475467] text-[16px] text-nowrap whitespace-pre">Blog</p>
        </div>
      </button>
      <Frame1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="Content">
      <Frame2 />
      <Navigation />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1320px]" data-name="Container">
      <Content1 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex flex-col h-[112px] items-center justify-center left-0 right-0 top-0" data-name="Header">
      <Container />
    </div>
  );
}

function DropdownHeaderNavigation() {
  return (
    <div className="h-[112px] relative shrink-0 w-full" data-name="Dropdown header navigation">
      <Header />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[112px] items-start relative shrink-0 w-[1440px] z-[3]">
      <DropdownHeaderNavigation />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Content">
      <p className="font-['Avenir:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#155eef] text-[12px] text-nowrap whitespace-pre">8 min read</p>
    </div>
  );
}

function HeadingAndBadge() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Heading and badge">
      <div className="bg-[#eff4ff] box-border content-stretch flex gap-[8px] items-center pl-[4px] pr-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Badge group">
        <div aria-hidden="true" className="absolute border border-[#84adff] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <div className="bg-white box-border content-stretch flex items-center px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Badge">
          <div aria-hidden="true" className="absolute border border-[#84adff] border-solid inset-0 pointer-events-none rounded-[9999px]" />
          <p className="font-['Avenir:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#155eef] text-[12px] text-center text-nowrap whitespace-pre">Land</p>
        </div>
        <Content2 />
      </div>
      <p className="font-['Avenir:Heavy',sans-serif] leading-[60px] min-w-full not-italic relative shrink-0 text-[#181d27] text-[48px] tracking-[-0.96px] w-[min-content]">Build Wealth Through Strategic Real Estate Investing</p>
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[768px] relative shrink-0 w-full" data-name="Text and supporting text">
      <HeadingAndBadge />
      <p className="font-['Avenir:Regular',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#535862] text-[20px] w-full">Discover how to identify high-potential properties, navigate financing strategies, and build a diversified real estate portfolio that generates sustainable income and long-term wealth creation for your family.</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Content">
      <TextAndSupportingText />
    </div>
  );
}

function Container1() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[32px] items-start max-w-inherit px-[32px] py-0 relative w-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="aspect-[1216/640] relative rounded-[20px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgImage} />
    </div>
  );
}

function Author() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 text-nowrap whitespace-pre" data-name="Author">
      <p className="font-['Avenir:Medium',sans-serif] leading-[20px] relative shrink-0 text-[#155eef] text-[14px]">Written by</p>
      <p className="font-['Avenir:Heavy',sans-serif] leading-[28px] relative shrink-0 text-[#181d27] text-[18px]">Alec Whitten</p>
    </div>
  );
}

function PublishDate() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 text-nowrap whitespace-pre" data-name="Publish date">
      <p className="font-['Avenir:Medium',sans-serif] leading-[20px] relative shrink-0 text-[#155eef] text-[14px]">Published on</p>
      <p className="font-['Avenir:Heavy',sans-serif] leading-[28px] relative shrink-0 text-[#181d27] text-[18px]">17 Jan 2025</p>
    </div>
  );
}

function AuthorAndPublishDate() {
  return (
    <div className="content-stretch flex gap-[48px] items-start relative shrink-0" data-name="Author and publish date">
      <Author />
      <PublishDate />
    </div>
  );
}

function TextPadding() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Text padding">
      <p className="font-['Avenir:Heavy',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] text-nowrap whitespace-pre">Copy link</p>
    </div>
  );
}

function Group() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g id="Group">
        <path d={svgPaths.p3fb91680} fill="var(--fill-0, #A4A7AE)" id="Vector" />
      </g>
    </svg>
  );
}

function SocialLinks() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Social links">
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Buttons/Button">
        <div className="box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="copy-01">
            <div className="absolute inset-[8.333%]" data-name="Icon">
              <div className="absolute inset-[-5%]" style={{ "--stroke-0": "rgba(164, 167, 174, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
                  <path d={svgPaths.p32ae400} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
          </div>
          <TextPadding />
        </div>
        <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(10,13,18,0.18),0px_-2px_0px_0px_inset_rgba(10,13,18,0.05)]" />
        <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      </div>
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Buttons/Button">
        <div className="box-border content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Platform=X (Twitter), Style=Gray, State=Default">
            <div className="absolute aspect-[22.9816/22] bottom-[6.25%] left-[calc(50%+0.001px)] top-[6.25%] translate-x-[-50%]" data-name="Vector">
              <div className="absolute inset-0" style={{ "--fill-0": "rgba(164, 167, 174, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 18">
                  <path clipRule="evenodd" d={svgPaths.p3b289f80} fill="var(--fill-0, #A4A7AE)" fillRule="evenodd" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(10,13,18,0.18),0px_-2px_0px_0px_inset_rgba(10,13,18,0.05)]" />
        <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      </div>
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Buttons/Button">
        <div className="box-border content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Platform=Facebook, Style=Gray, State=Default">
            <div className="absolute bottom-[0.61%] left-0 right-0 top-0" data-name="Vector">
              <div className="absolute inset-0" style={{ "--fill-0": "rgba(164, 167, 174, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p24dd3180} fill="var(--fill-0, #A4A7AE)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(10,13,18,0.18),0px_-2px_0px_0px_inset_rgba(10,13,18,0.05)]" />
        <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      </div>
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Buttons/Button">
        <div className="box-border content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Platform=LinkedIn, Style=Gray, State=Default">
            <Group />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(10,13,18,0.18),0px_-2px_0px_0px_inset_rgba(10,13,18,0.05)]" />
        <div aria-hidden="true" className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-start flex flex-wrap gap-[24px] items-start justify-between relative shrink-0 w-full" data-name="Content">
      <AuthorAndPublishDate />
      <SocialLinks />
    </div>
  );
}

function Container2() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-center max-w-inherit px-[32px] py-0 relative w-full">
          <Image />
          <Content4 />
        </div>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[64px] items-center px-0 py-[96px] relative shrink-0 w-full" data-name="Section">
      <Container1 />
      <Container2 />
    </div>
  );
}

function PaddingBottom() {
  return <div className="content-stretch flex flex-col h-[20px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function PaddingTop() {
  return <div className="content-stretch flex flex-col h-[48px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function Image1() {
  return (
    <div className="aspect-[720/480] relative rounded-[12px] shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" src={img} />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <Image1 />
    </div>
  );
}

function PaddingBottom1() {
  return <div className="content-stretch flex flex-col h-[48px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function PaddingTop1() {
  return <div className="content-stretch flex flex-col h-[32px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function PaddingBottom2() {
  return <div className="content-stretch flex flex-col h-[16px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function PaddingTop2() {
  return <div className="content-stretch flex flex-col h-[32px] items-start shrink-0 w-full" data-name="Padding top" />;
}

function PaddingBottom3() {
  return <div className="content-stretch flex flex-col h-[16px] items-start shrink-0 w-full" data-name="Padding bottom" />;
}

function TextPadding1() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Text padding">
      <p className="font-['Avenir:Heavy',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap whitespace-pre">Cancel</p>
    </div>
  );
}

function TextPadding2() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[2px] py-0 relative shrink-0" data-name="Text padding">
      <p className="font-['Avenir:Heavy',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Publish</p>
    </div>
  );
}

function Actions() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="Actions">
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button">
        <div className="box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[inherit]">
          <TextPadding1 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
      <div className="bg-[#155eef] relative rounded-[8px] shrink-0" data-name="Button">
        <div className="box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[inherit]">
          <TextPadding2 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#155eef] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex gap-[20px] items-center justify-end relative shrink-0 w-full" data-name="Content">
      <Actions />
    </div>
  );
}

function RichText() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start max-w-[720px] min-h-px min-w-[560px] relative shrink-0" data-name="Rich text">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <p className="font-['Avenir:Heavy',sans-serif] leading-[38px] not-italic relative shrink-0 text-[#181d27] text-[30px] w-full">Introduction</p>
        <PaddingBottom />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <div className="font-['Avenir:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#535862] text-[18px] w-full">
          <p className="mb-[18px]">At Haven Communities, we believe real estate is more than just property—it's the foundation of lasting wealth and stable communities. Our mission is to empower investors with the knowledge, resources, and market insights needed to make confident decisions in today's dynamic real estate landscape. Whether you're seeking steady rental income, long-term appreciation, or portfolio diversification, we're here to guide you through every step of your real estate journey.</p>
          <p>{`With decades of combined industry expertise, our team understands the nuances of market cycles, neighborhood dynamics, and value creation strategies. We're committed to transparent communication, thorough market analysis, and personalized investment strategies tailored to your unique financial goals. Real estate success isn't about luck—it's about informed decision-making, strategic timing, and access to quality opportunities. That's exactly what we deliver. `}</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <PaddingTop />
        <Content5 />
        <PaddingBottom1 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <p className="font-['Avenir:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#535862] text-[18px] w-full">Our platform connects investors with exceptional properties, market insights, and expert guidance. From market analysis tools to property listings and financing resources, we provide the comprehensive support necessary for informed real estate investment decisions that align with your financial objectives and risk tolerance.</p>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <div className="font-['Avenir:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#535862] text-[18px] w-full">
          <p className="mb-[18px]">Every successful real estate investment begins with thorough market research and careful property analysis. Our experts evaluate key metrics including comparable sales, market trends, rental potential, and community growth indicators. We identify properties positioned for appreciation and strong returns, ensuring you invest with confidence and clarity about your financial projections.</p>
          <p className="mb-[18px]">Smart financing is essential to maximizing real estate returns. We guide you through mortgage options, down payment strategies, and leverage techniques that optimize your investment returns while maintaining prudent risk management. Understanding the financing landscape helps you acquire more properties, accelerate wealth accumulation, and achieve your long-term financial goals through strategic real estate investing.</p>
          <p>Our commitment extends beyond individual transactions. We build lasting relationships with our clients, providing ongoing market intelligence, portfolio optimization advice, and access to exclusive investment opportunities. Whether you're managing a single property or a diversified real estate portfolio, we're your trusted partner in creating sustainable wealth through real estate excellence.</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <PaddingTop1 />
        <p className="font-['Avenir:Heavy',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#181d27] text-[24px] w-full">Software and tools</p>
        <PaddingBottom2 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <div className="font-['Avenir:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#535862] text-[18px] w-full">
          <p className="mb-[18px]">At Haven Communities, we believe real estate is more than just property—it's the foundation of lasting wealth and stable communities. Our mission is to empower investors with the knowledge, resources, and market insights needed to make confident decisions in today's dynamic real estate landscape. Whether you're seeking steady rental income, long-term appreciation, or portfolio diversification, we're here to guide you through every step of your real estate journey.</p>
          <p>{`With decades of combined industry expertise, our team understands the nuances of market cycles, neighborhood dynamics, and value creation strategies. We're committed to transparent communication, thorough market analysis, and personalized investment strategies tailored to your unique financial goals. Real estate success isn't about luck—it's about informed decision-making, strategic timing, and access to quality opportunities. That's exactly what we deliver. `}</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content item">
        <PaddingTop2 />
        <p className="font-['Avenir:Heavy',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#181d27] text-[24px] w-full">Other resources</p>
        <PaddingBottom3 />
      </div>
      <div className="content-stretch flex flex-col h-[380px] items-start relative shrink-0 w-full" data-name="Content item">
        <div className="font-['Avenir:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#535862] text-[18px] w-full">
          <p className="leading-[28px] mb-[18px]">Our platform provides comprehensive tools and resources to guide your real estate investment journey. From market analysis to financing guidance, we empower you with actionable insights and access to exceptional investment opportunities. Join thousands of successful investors who trust Haven Communities to help them build and manage profitable real estate portfolios.</p>
          <ol className="list-decimal">
            <li className="mb-0 ms-[27px]">
              <span className="leading-[28px]">Access exclusive property listings and comprehensive market analysis tools.</span>
            </li>
            <li className="mb-0 ms-[27px]">
              <span className="leading-[28px]">Learn from industry experts through our curated educational resources and insights.</span>
            </li>
            <li className="ms-[27px]">
              <span className="leading-[28px]">Connect with a community of successful real estate investors and mentors.</span>
            </li>
          </ol>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-[720px]" data-name="Section footer">
        <Content6 />
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-start flex flex-wrap gap-[96px] items-start justify-center relative shrink-0 w-full" data-name="Content">
      <RichText />
    </div>
  );
}

function Container3() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] items-center max-w-inherit px-[32px] py-0 relative w-full">
          <Content7 />
        </div>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[64px] items-center pb-[96px] pt-0 px-0 relative shrink-0 w-full" data-name="Section">
      <Container3 />
    </div>
  );
}

function BlogPostPageHeader() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-full z-[2]" data-name="Blog post page header">
      <Section />
      <Section1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-px relative shrink-0 w-[1280px]" data-name="Container">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1280 1">
        <g id="Container"></g>
      </svg>
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-center relative size-full" data-name="Desktop">
      <Frame />
      <BlogPostPageHeader />
      <div className="content-stretch flex items-start justify-center relative shrink-0 w-full z-[1]" data-name="–––– Section divider ––––">
        <Container4 />
      </div>
    </div>
  );
}