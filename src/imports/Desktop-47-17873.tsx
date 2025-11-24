import React, { useState, useEffect } from "react";
import svgPaths from "./svg-1y04fh47kq";
import imgImage from "../assets/b2a4d4d2696958d3a420b3897c4c42bf3d9c784f.png";
import imgImage1 from "../assets/7cea1cc7a63d49724f662dc4ca77ec22ed421454.png";
import imgImage2 from "../assets/9f4ea61beb99ae8c2da093d59eccf06f640e117f.png";
import imgImage3 from "../assets/0f4f2fcb6049962790ac0a2810925489622b792c.png";
import Logo from "../components/Logo";
import SlideOutMenu from "./SlideOutMenu-34-4923";
import type { NavigationPage } from "../types/navigation";
import styles from "./Desktop-47-17873.module.css";

type NavigateHandler = (page: NavigationPage) => void;

const NAV_ITEMS: { label: string; route: NavigationPage }[] = [
  { label: "About Us", route: "about" },
  { label: "Projects", route: "projects" },
  { label: "Contact", route: "contact" },
  { label: "Blog", route: "blog" },
];

const RELATED_POSTS = [
  { id: 1, image: imgImage1, author: "Demi Wilkinson", date: "16 Jan 2025", category: "Land", title: "Rental Income Optimization for Property Owners", description: "Strategic approaches to maximize rental returns, tenant quality, and long-term property appreciation for residential investors." },
  { id: 2, image: imgImage2, author: "Candice Wu", date: "15 Jan 2025", category: "Land", title: "Building a Diversified Real Estate Portfolio", description: "Strategies for balancing residential, commercial, and alternative investments to create resilient wealth-building portfolios." },
  { id: 3, image: imgImage3, author: "Natali Craig", date: "14 Jan 2025", category: "Investment", title: "First-Time Home Buyers: Smart Investment Moves", description: "Essential guidance for navigating mortgages, inspections, and negotiations to secure your first property investment confidently." },
];

function CopyIcon() {
  return (
    <svg className={styles.icon} fill="none" viewBox="0 0 20 20">
      <g clipPath="url(#clip0_47_18113)">
        <path d={svgPaths.p22dacb00} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_47_18113">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SocialIcon({ path, clipPathId }: { path: string; clipPathId?: string }) {
  return (
    <svg className={styles.icon} fill="none" viewBox="0 0 20 20">
      {clipPathId ? (
        <g clipPath={`url(#${clipPathId})`}>
          <path d={path} fill="var(--fill-0, #A4A7AE)" />
        </g>
      ) : (
        <g>
          <path d={path} fill="var(--fill-0, #A4A7AE)" />
        </g>
      )}
      {clipPathId && (
        <defs>
          <clipPath id={clipPathId}>
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      )}
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg className={styles.icon} fill="none" viewBox="0 0 20 20">
      <g>
        <path d={svgPaths.p32dd8280} stroke="var(--stroke-0, #00359E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
    </svg>
  );
}

function HamburgerMenuIcon() {
  return (
    <svg className={styles.hamburgerIcon} fill="none" viewBox="0 0 24 24">
      <g id="menu-01">
        <path d="M3 12H21M3 6H21M3 18H21" id="Icon" stroke="#717680" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </svg>
  );
}

function MobileHeader({ onNavigate }: { onNavigate?: NavigateHandler }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMenu]);

  const handleToggleMenu = () => {
    setShowMenu(true);
  };

  const handleCloseMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isBackdrop = target.getAttribute("data-name") === "Slide out menu";
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
        <div className={styles.mobileHeaderContent}>
          <Logo onClick={() => onNavigate?.("home")} variant="blue" useBlueLogo={true} />
          <button
            type="button"
            className={styles.hamburgerButton}
            onClick={handleToggleMenu}
            aria-label="Open navigation menu"
          >
            <HamburgerMenuIcon />
          </button>
        </div>
      </div>
      {showMenu && (
        <div className={styles.menuOverlay} onClick={handleCloseMenu} data-name="Slide out menu">
          <div className={styles.menuSlideIn}>
            <SlideOutMenu onNavigate={handleNavigate} />
          </div>
        </div>
      )}
    </>
  );
}

function Navigation({ onNavigate }: { onNavigate?: NavigateHandler }) {
  return (
    <nav className={styles.navigation} aria-label="Primary navigation">
      {NAV_ITEMS.map(({ label, route }) => (
        <button key={route} type="button" className={styles.navigationButton} onClick={() => onNavigate?.(route)}>
          {label}
        </button>
      ))}
    </nav>
  );
}

function DesktopHeader({ onNavigate }: { onNavigate?: NavigateHandler }) {
  return (
    <div className={styles.desktopHeader}>
      <div className={styles.desktopHeaderInner}>
        <Logo onClick={() => onNavigate?.("home")} variant="blue" useBlueLogo={true} />
        <Navigation onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function HeroSection({ onNavigate }: { onNavigate?: NavigateHandler }) {
  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy link");
    });
  };

  return (
    <section className={styles.heroSection}>
      <DesktopHeader onNavigate={onNavigate} />
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadgeGroup}>
            <span className={styles.heroBadge}>Land</span>
            <span className={styles.heroReadTime}>8 min read</span>
          </div>
          <h1 className={styles.heroTitle}>Transform Your Real Estate Investment Strategy Today</h1>
          <p className={styles.heroDescription}>
            Discover how modern real estate investment strategies can help you build wealth and secure your financial future. Learn proven techniques from industry experts and start your journey to property success today.
          </p>
        </div>
        <div className={styles.heroImage}>
          <img alt="Real estate investment strategy" src={imgImage} />
        </div>
        <div className={styles.heroMeta}>
          <div className={styles.heroMetaItem}>
            <p className={styles.heroMetaLabel}>Written by</p>
            <p className={styles.heroMetaValue}>Alec Whitten</p>
          </div>
          <div className={styles.heroMetaItem}>
            <p className={styles.heroMetaLabel}>Published on</p>
            <p className={styles.heroMetaValue}>17 Jan 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentSection({ sidebarEmail, onSidebarEmailChange, onSidebarSubmit, onNavigate }: {
  sidebarEmail: string;
  onSidebarEmailChange: (value: string) => void;
  onSidebarSubmit: () => void;
  onNavigate?: NavigateHandler;
}) {
  return (
    <section className={styles.contentSection}>
      <div className={styles.contentContainer}>
        <div className={styles.contentMain}>
          <h2 className={styles.contentHeading}>Introduction</h2>
          <div>
            <p className={styles.contentParagraph}>
              The real estate investment landscape continues to evolve, offering unprecedented opportunities for those who understand market dynamics and timing. Whether you&apos;re a seasoned investor or exploring your first property purchase, the key to success lies in comprehensive market analysis, strategic property selection, and long-term wealth building perspective. This comprehensive guide explores proven strategies that industry leaders use to maximize returns and minimize risk in today&apos;s competitive market.
            </p>
            <p className={styles.contentParagraph}>
              Real estate remains one of the most tangible and historically proven wealth-building vehicles available. The combination of property appreciation, rental income generation, and leverage through mortgage financing creates multiple pathways to financial independence. Successful investors distinguish themselves through diligent market research, understanding local economic drivers, and positioning their portfolios to capture emerging opportunities before the broader market recognizes their value.
            </p>
          </div>
          <div className={styles.contentImage}>
            <img alt="Real estate investment" src={imgImage1} />
          </div>
          <p className={styles.contentParagraph}>
            Real estate has long been considered one of the most reliable and profitable investments. Whether you&apos;re looking for steady rental income, long-term appreciation, or a quick flip, understanding the fundamentals is essential for success in today&apos;s dynamic market.
          </p>
          <div>
            <p className={styles.contentParagraph}>
              Understanding market dynamics is crucial to identifying high-potential investment opportunities. Real estate professionals evaluate factors including property appreciation trends, rental demand forecasts, neighborhood development plans, and economic indicators. These insights help investors make data-driven decisions that position their portfolios for long-term growth and sustainable returns.
            </p>
            <p className={styles.contentParagraph}>
              The real estate market offers multiple pathways to financial success. From residential properties that provide stable rental income to commercial spaces that generate significant returns, each investment type has unique advantages. Smart investors analyze market trends, location fundamentals, and property potential before committing their capital. With proper research and due diligence, you can identify opportunities that align with your financial goals.
            </p>
            <p className={styles.contentParagraph}>
              Market conditions and timing play crucial roles in real estate success. Understanding supply and demand dynamics in your target area, recognizing growth trends, and positioning yourself ahead of the curve can significantly boost your returns. Whether interest rates are rising or falling, multiple investment opportunities exist for informed investors who know where to look.
            </p>
          </div>
          <h3 className={styles.contentSubheading}>Software and tools</h3>
          <p className={styles.contentParagraph}>
            The real estate market offers multiple pathways to financial success. From residential properties that provide stable rental income to commercial spaces that generate significant returns, each investment type has unique advantages.
          </p>
          <h3 className={styles.contentSubheading}>Other resources</h3>
          <div>
            <p className={styles.contentParagraph}>
              Building a diversified real estate portfolio requires strategic planning and patience. Start with properties that match your risk tolerance and investment timeline. Consider factors like location appreciation potential, tenant demand, maintenance costs, and tax implications. Many successful investors begin with single-family homes before expanding to multi-unit buildings or commercial properties. Your real estate journey is unique—tailor your strategy to your personal financial situation and long-term objectives.
            </p>
            <ol className={styles.contentList}>
              <li>Conduct thorough market research and property analysis before making any investment decisions.</li>
              <li>Develop a comprehensive financing strategy that optimizes returns while managing risk responsibly.</li>
              <li>Build a diversified portfolio across multiple property types and geographic markets to maximize stability.</li>
            </ol>
          </div>
        </div>
        <aside className={styles.contentSidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarCardTitle}>Newsletter</h3>
            <p className={styles.sidebarCardDescription}>
              Subscribe to our newsletter to get the latest updates and insights.
            </p>
            <div className={styles.sidebarNewsletter}>
              <input
                type="email"
                value={sidebarEmail}
                onChange={(e) => onSidebarEmailChange(e.target.value)}
                placeholder="Enter your email"
                className={styles.sidebarNewsletterInput}
              />
              <button type="button" className={styles.sidebarNewsletterButton} onClick={onSidebarSubmit}>
                Subscribe
              </button>
            </div>
            <p className={styles.sidebarPrivacy}>
              We care about your data in our{" "}
              <button type="button" className={styles.sidebarPrivacyLink} onClick={() => onNavigate?.("privacyPolicy")}>
                privacy policy
              </button>
              .
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function RelatedPostsSection({ onNavigate }: { onNavigate?: NavigateHandler }) {
  return (
    <section className={styles.relatedPostsSection}>
      <div className={styles.relatedPostsContainer}>
        <div className={styles.relatedPostsHeader}>
          <div>
            <p className={styles.relatedPostsTitle}>Latest</p>
            <h2 className={styles.relatedPostsHeading}>From the blog</h2>
            <p className={styles.relatedPostsDescription}>
              The latest industry news, interviews, technologies, and resources.
            </p>
          </div>
          <button type="button" className={styles.relatedPostsButton} onClick={() => onNavigate?.("blog")}>
            View all posts
          </button>
        </div>
        <div className={styles.relatedPostsGrid}>
          {RELATED_POSTS.map((post) => (
            <article
              key={post.id}
              className={styles.relatedPostCard}
              onClick={() => onNavigate?.("blogDetail")}
            >
              <div className={styles.relatedPostImage}>
                <img alt={post.title} src={post.image} />
                <div className={styles.relatedPostOverlay}>
                  <div className={styles.relatedPostAttribution}>
                    <div>
                      <p className={styles.relatedPostAuthor}>{post.author}</p>
                      <p className={styles.relatedPostDate}>{post.date}</p>
                    </div>
                    <p className={styles.relatedPostCategory}>{post.category}</p>
                  </div>
                </div>
              </div>
              <div className={styles.relatedPostContent}>
                <h3 className={styles.relatedPostTitle}>{post.title}</h3>
                <p className={styles.relatedPostDescription}>{post.description}</p>
                <button
                  type="button"
                  className={styles.relatedPostAction}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate?.("blogDetail");
                  }}
                >
                  Read post
                  <ArrowUpRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionDivider() {
  return <div className={styles.sectionDivider} aria-hidden="true" />;
}

export default function Desktop({ onNavigate }: { onNavigate?: NavigateHandler }) {
  const [sidebarEmail, setSidebarEmail] = useState("");

  const handleSidebarSubmit = () => {
    if (sidebarEmail && sidebarEmail.includes("@")) {
      alert("Thank you for subscribing!");
      setSidebarEmail("");
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <div className={styles.desktopPage}>
      <div className={styles.mobileHeader}>
        <MobileHeader onNavigate={onNavigate} />
      </div>
      <HeroSection onNavigate={onNavigate} />
      <SectionDivider />
      <ContentSection
        sidebarEmail={sidebarEmail}
        onSidebarEmailChange={setSidebarEmail}
        onSidebarSubmit={handleSidebarSubmit}
        onNavigate={onNavigate}
      />
      <RelatedPostsSection onNavigate={onNavigate} />
    </div>
  );
}

