import { useState, type KeyboardEvent, type MouseEvent } from "react";
import svgPaths from "./svg-r49qxjoou4";
import imgHeroHeaderSection from "../assets/d3527a8bfa4f11abe21e46cce52b7399cd665b38.png";
import imgImage from "../assets/69c2d48ba81567d28893e15cd0baf517c39f52ee.png";
import imgImage1 from "../assets/12e57dc8c26ffbd65d754a3814aa245e717c32a7.png";
import imgImage2 from "../assets/e2d07def1dbd591c5182a37dfedc9ff110ae94d9.png";
import imgImage3 from "../assets/0f4f2fcb6049962790ac0a2810925489622b792c.png";
import imgImage4 from "../assets/9f4ea61beb99ae8c2da093d59eccf06f640e117f.png";
import imgImage5 from "../assets/ec3b79fff1564d645f4f2bda89407b5d61d9afd9.png";
import imgImage6 from "../assets/54e0943ca661c94f801320e0a56b7ad7c9f5f2c3.png";
import imgImage7 from "../assets/ba1ddf4cdff400161fdff3d4a651265bb53152a4.png";
import Logo from "../components/Logo";
import { MobileHeader } from "../components/MobileHeader";
import styles from "./Desktop-34-49489.module.css";

type NavigateTarget =
  | "home"
  | "about"
  | "contact"
  | "projects"
  | "projectDetail"
  | "blog"
  | "blogDetail"
  | "privacyPolicy"
  | "termsOfService"
  | "cookiesPolicy";

type NavigateHandler = (page: NavigateTarget) => void;

type BlogCategory = "all" | "land" | "homes" | "construction" | "investment";

const NAV_ITEMS: { label: string; route: NavigateTarget }[] = [
  { label: "About Us", route: "about" },
  { label: "Projects", route: "projects" },
  { label: "Contact", route: "contact" },
  { label: "Blog", route: "blog" },
];

const BLOG_POSTS = [
  { id: 1, image: imgImage, author: "Olivia Rhye", date: "20 Jan 2025", category: "Homes", title: "Master Location Analysis and Market Trends", description: "Learn how to evaluate neighborhoods, predict growth patterns, and identify emerging markets for profitable real estate investments." },
  { id: 2, image: imgImage1, author: "Phoenix Baker", date: "19 Jan 2025", category: "Homes", title: "Financing Strategies That Maximize Returns", description: "Explore mortgage options, leverage techniques, and tax advantages for intelligent property investors seeking optimal profitability." },
  { id: 3, image: imgImage2, author: "Lana Steiner", date: "18 Jan 2025", category: "Investment", title: "Property Valuation Essentials for Savvy Investors", description: "Master the key methods and metrics for accurately evaluating property value and identifying undervalued investment opportunities." },
  { id: 4, image: imgImage3, author: "Alec Whitten", date: "17 Jan 2025", category: "Construction", title: "Understanding Market Cycles and Investment Timing", description: "Learn how economic indicators and market cycles influence real estate performance and position your investments strategically." },
  { id: 5, image: imgImage4, author: "Demi Wilkinson", date: "16 Jan 2025", category: "Land", title: "Rental Income Optimization for Property Owners", description: "Strategic approaches to maximize rental returns, tenant quality, and long-term property appreciation for residential investors." },
  { id: 6, image: imgImage5, author: "Candice Wu", date: "15 Jan 2025", category: "Land", title: "Building a Diversified Real Estate Portfolio", description: "Strategies for balancing residential, commercial, and alternative investments to create resilient wealth-building portfolios." },
  { id: 7, image: imgImage6, author: "Natali Craig", date: "14 Jan 2025", category: "Investment", title: "First-Time Home Buyers: Smart Investment Moves", description: "Essential guidance for navigating mortgages, inspections, and negotiations to secure your first property investment confidently." },
  { id: 8, image: imgImage7, author: "Drew Cano", date: "13 Jan 2025", category: "Construction", title: "Commercial Real Estate: Unlocking Enterprise Opportunities", description: "Advanced strategies for office, retail, and industrial properties offering superior returns and portfolio expansion potential." },
];

const PAGINATION_STEPS = ["1", "2", "3", "…", "8", "9", "10"] as const;

function ArrowUpRight() {
  return (
    <svg className={styles.icon} fill="none" viewBox="0 0 20 20">
      <g id="arrow-up-right">
        <path d={svgPaths.p32dd8280} id="Icon" stroke="var(--stroke-0, #00359E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg className={styles.icon} fill="none" viewBox="0 0 20 20">
      <g id="arrow-left">
        <path d={svgPaths.p11678e00} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg className={styles.icon} fill="none" viewBox="0 0 20 20">
      <g id="arrow-right">
        <path d="M7.5 15L12.5 10L7.5 5" id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
    </svg>
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
        <Logo onClick={() => onNavigate?.("home")} />
        <Navigation onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function HeroHeaderSection({
  onNavigate,
  email,
  onEmailChange,
  onSubmit,
}: {
  onNavigate?: NavigateHandler;
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroMedia} aria-hidden="true">
        <img alt="" className={styles.heroImage} src={imgHeroHeaderSection} />
        <div className={styles.heroOverlay} />
      </div>
      <DesktopHeader onNavigate={onNavigate} />
      <div className={styles.heroContent}>
        <div>
          <h1 className={styles.heroHeading}>Resource library</h1>
          <div className={styles.heroNewsletter}>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Enter your email"
              className={styles.heroNewsletterInput}
            />
            <button type="button" className={styles.heroNewsletterButton} onClick={onSubmit}>
              Get started
            </button>
          </div>
          <p className={styles.heroPrivacy}>
            We care about your data in our{" "}
            <button type="button" className={styles.heroPrivacyLink} onClick={() => onNavigate?.("privacyPolicy")}>
              privacy policy
            </button>
            .
          </p>
        </div>

        <div className={styles.heroDescriptionWrapper}>
          <p className={styles.heroDescription}>
            Subscribe to learn about new product features, the latest in technology, solutions, and updates.
          </p>
        </div>

      </div>
    </section>
  );
}

function CategoryTabs({ activeCategory, onCategoryChange }: { activeCategory: BlogCategory; onCategoryChange: (category: BlogCategory) => void }) {
  const categories: { label: string; value: BlogCategory }[] = [
    { label: "View all", value: "all" },
    { label: "Land", value: "land" },
    { label: "Homes", value: "homes" },
    { label: "Construction", value: "construction" },
    { label: "Investment", value: "investment" },
  ];

  return (
    <div className={styles.categoryTabs}>
      {categories.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          className={`${styles.categoryTab} ${activeCategory === value ? styles.categoryTabActive : ""}`}
          onClick={() => onCategoryChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function BlogPostCard({
  post,
  onNavigate,
}: {
  post: (typeof BLOG_POSTS)[0];
  onNavigate?: NavigateHandler;
}) {
  const handleClick = () => onNavigate?.("blogDetail");
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className={styles.blogCard}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.blogCardImageWrapper}>
        <img alt="" className={styles.blogCardImage} src={post.image} />
        <div className={styles.blogCardOverlay}>
          <div className={styles.blogCardAttribution}>
            <div>
              <p className={styles.blogCardAuthor}>{post.author}</p>
              <p className={styles.blogCardDate}>{post.date}</p>
            </div>
            <p className={styles.blogCardCategory}>{post.category}</p>
          </div>
        </div>
      </div>
      <div className={styles.blogCardContent}>
        <h3 className={styles.blogCardTitle}>{post.title}</h3>
        <p className={styles.blogCardDescription}>{post.description}</p>
        <button type="button" className={styles.blogCardAction} onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          handleClick();
        }}>
          Read post
          <ArrowUpRight />
        </button>
      </div>
    </article>
  );
}

function BlogGrid({ onNavigate }: { onNavigate?: NavigateHandler }) {
  return (
    <div className={styles.blogGrid}>
      {BLOG_POSTS.map((post) => (
        <BlogPostCard key={post.id} post={post} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function Pagination() {
  return (
    <div className={styles.pagination}>
      <button type="button" className={styles.paginationButton} onClick={() => console.log("Previous page clicked")}>
        <ArrowLeft />
        Previous
      </button>
      <ol className={styles.paginationNumbers}>
        {PAGINATION_STEPS.map((value, index) => (
          <li
            key={`${value}-${index}`}
            className={`${styles.paginationNumber} ${index === 0 ? styles.paginationNumberActive : ""}`}
          >
            {value}
          </li>
        ))}
      </ol>
      <button type="button" className={styles.paginationButton} onClick={() => console.log("Next page clicked")}>
        Next
        <ArrowRight />
      </button>
    </div>
  );
}

function BlogSection({ onNavigate, activeCategory, onCategoryChange }: { onNavigate?: NavigateHandler; activeCategory: BlogCategory; onCategoryChange: (category: BlogCategory) => void }) {
  return (
    <section className={styles.blogSection}>
      <div className={styles.blogContainer}>
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={onCategoryChange} />
        <BlogGrid onNavigate={onNavigate} />
        <Pagination />
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className={styles.sectionDividerWrapper} aria-hidden="true">
      <div className={styles.sectionDividerLine} />
    </div>
  );
}

function SectionDivider1() {
  return (
    <div className={styles.sectionDividerWrapper} aria-hidden="true">
      <div className={styles.sectionDividerSecondary} />
    </div>
  );
}

export default function Desktop({
  onNavigate,
  onBlogClick,
}: {
  onNavigate?: NavigateHandler;
  onBlogClick?: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("all");
  const [heroEmail, setHeroEmail] = useState("");

  const handleHeroSubmit = () => {
    if (heroEmail.trim()) {
      console.log("Hero newsletter subscription:", heroEmail);
      setHeroEmail("");
    }
  };

  return (
    <div className={styles.desktopPage}>
      <div className={styles.mobileHeader}>
        <MobileHeader onNavigate={onNavigate} />
      </div>
      <HeroHeaderSection onNavigate={onNavigate} email={heroEmail} onEmailChange={setHeroEmail} onSubmit={handleHeroSubmit} />
      <BlogSection onNavigate={onNavigate} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <SectionDivider />
      <SectionDivider1 />
    </div>
  );
}


