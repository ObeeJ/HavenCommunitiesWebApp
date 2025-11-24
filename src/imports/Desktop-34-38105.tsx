import type { KeyboardEvent, MouseEvent } from "react";
import svgPaths from "./svg-dbvk7wn66u";
import imgHeroHeaderSection from "../assets/c9b700eb89f009ae9d6e97eb3600221d82209851.png";
import imgImage from "../assets/1df45d321d94faf7238fbcae0c4f616df9019203.png";
import Logo from "../components/Logo";
import { MobileHeader } from "../components/MobileHeader";
import styles from "./Desktop-34-38105.module.css";

type NavigateTarget =
  | "home"
  | "about"
  | "contact"
  | "projects"
  | "projectDetail"
  | "blog"
  | "privacyPolicy"
  | "termsOfService"
  | "cookiesPolicy";

type NavigateHandler = (page: NavigateTarget) => void;

const NAV_ITEMS: { label: string; route: NavigateTarget }[] = [
  { label: "About Us", route: "about" },
  { label: "Projects", route: "projects" },
  { label: "Contact", route: "contact" },
  { label: "Blog", route: "blog" },
];

const LISTING_PLACEHOLDERS = Array.from({ length: 9 });
const PAGINATION_STEPS = ["1", "2", "3", "…", "8", "9", "10"] as const;

function MarkerPin02() {
  return (
    <svg className={styles.icon} fill="none" viewBox="0 0 20 20">
      <g id="marker-pin-02">
        <g id="Icon">
          <path d={svgPaths.p27e0c880} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p38d04800} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </g>
    </svg>
  );
}

function ChevronRightDouble() {
  return (
    <svg className={styles.icon} fill="none" viewBox="0 0 24 24">
      <g id="chevron-right-double">
        <path d={svgPaths.p3b57f380} id="Icon" stroke="var(--stroke-0, #00359E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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

function HeroHeaderSection({ onNavigate }: { onNavigate?: NavigateHandler }) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroMedia} aria-hidden="true">
        <img alt="" className={styles.heroImage} src={imgHeroHeaderSection} />
        <div className={styles.heroOverlay} />
      </div>
      <DesktopHeader onNavigate={onNavigate} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeading}>Lands</h1>
        <p className={styles.heroDescription}>
          We understand the intricacies and challenges that come with buying lands, and we know how to deal with each one.
        </p>
      </div>
    </section>
  );
}

function ListingSearchResultDesktop({ onNavigate }: { onNavigate?: NavigateHandler }) {
  const handleNavigation = () => onNavigate?.("projectDetail");

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigation();
    }
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleNavigation();
  };

  return (
    <article
      className={styles.listingCard}
      onClick={handleNavigation}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.cardImageWrapper}>
        <img alt="" className={styles.cardImage} src={imgImage} />
        <span className={styles.cardBadge}>Available</span>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>Eden Court</h3>
        <div className={styles.cardMeta}>
          <MarkerPin02 />
          <span>Ajebo, Ogun State</span>
        </div>
        <button type="button" className={styles.cardAction} onClick={handleButtonClick}>
          More Details
          <ChevronRightDouble />
        </button>
      </div>
    </article>
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

function ListingsSection({ onNavigate }: { onNavigate?: NavigateHandler }) {
  return (
    <section className={styles.listingsSection}>
      <div className={styles.listingsContainer}>
        <div className={styles.cardGrid}>
          {LISTING_PLACEHOLDERS.map((_, index) => (
            <ListingSearchResultDesktop key={`listing-${index}`} onNavigate={onNavigate} />
          ))}
        </div>
        <Pagination />
      </div>
    </section>
  );
}

function BlogPageHeader({ onNavigate }: { onNavigate?: NavigateHandler }) {
  return (
    <div className={styles.pageBody}>
      <HeroHeaderSection onNavigate={onNavigate} />
      <ListingsSection onNavigate={onNavigate} />
    </div>
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

export default function Desktop({ onNavigate }: { onNavigate?: NavigateHandler }) {
  return (
    <div className={styles.desktopPage} data-name="Desktop">
      <div className={styles.mobileHeader}>
        <MobileHeader onNavigate={onNavigate} />
      </div>
      <BlogPageHeader onNavigate={onNavigate} />
      <SectionDivider />
      <SectionDivider1 />
    </div>
  );
}

