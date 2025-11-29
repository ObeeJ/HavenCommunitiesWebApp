import type { KeyboardEvent } from "react";
import imgHeroHeaderSection from "../assets/d3527a8bfa4f11abe21e46cce52b7399cd665b38.png";
import imgPegmanOffscreen2X from "../assets/747a27fe416ebfaf57b25beae190a98036e77d0e.png";
import imgMap from "../assets/c2430bbeaa73c25f6f67e194305a665dd478e3a7.png";
import Logo from "../components/Logo";
import locationIcon from "../assets/Featured icon.png"
import { MobileHeader } from "../components/MobileHeader";
import styles from "./Desktop-34-20344.module.css";

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

type ContactOption = {
  title: string;
  description: string;
  actionLabel: string;
  action?: () => void;
};

const NAV_ITEMS: { label: string; route: NavigateTarget }[] = [
  { label: "About Us", route: "about" },
  { label: "Projects", route: "projects" },
  { label: "Contact", route: "contact" },
  { label: "Blog", route: "blog" },
];

const LOCATION_CONTENT = {
  heading: "Our locations",
  description: "Come visit our friendly team at one of our offices.",
  city: "Ogun State",
  address: "No 4, Ewang extension, Road 1, Idi-Aba, Abeokuta, Ogun State.",
};

const CONTACT_OPTIONS: ContactOption[] = [
  {
    title: "Chat with sales",
    description: "Connect with us via WhatsApp—it’s fast, convenient, and efficient.",
    actionLabel: "Chat Now",
    action: () => {
      if (typeof window !== "undefined") {
        window.open("https://wa.me/2349064937783", "_blank", "noopener,noreferrer");
      }
    },
  },
  {
    title: "Call",
    description: "Reach our customer support team 24/7 for immediate assistance.",
    actionLabel: "Call",
    action: () => {
      if (typeof window !== "undefined") {
        window.location.href = "tel:+2349064937783";
      }
    },
  },
  {
    title: "Email",
    description: "Send us an email at contact@pishon.com and we’ll reply promptly.",
    actionLabel: "Send Email",
    action: () => {
      if (typeof window !== "undefined") {
        window.location.href = "mailto:Havencommunitiesproperties@gmail.com";
      }
    },
  },
];

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
        <p className={styles.heroEyebrow}>Talk to our team</p>
        <h1 className={styles.heroHeading}>Contact Us</h1>
        <p className={styles.heroDescription}>
          We&apos;re a customer-focused real estate company dedicated to streamlining every step of your property pursuit.
          Reach out through any channel and we&apos;ll guide you through the process.
        </p>
      </div>
    </section>
  );
}

type ContactOptionCardProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
};

function ContactOptionCard({ title, description, actionLabel, onAction }: ContactOptionCardProps) {
  const handleAction = () => onAction?.();

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleAction();
    }
  };

  return (
    <article
      className={styles.contactCard}
      onClick={handleAction}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${title} - ${description}`}
    >
      <h3 className={styles.contactCardTitle}>{title}</h3>
      <p className={styles.contactCardDescription}>{description}</p>
      <button
        type="button"
        className={styles.contactCardCta}
        onClick={(event) => {
          event.stopPropagation();
          handleAction();
        }}
      >
        {actionLabel}
      </button>
    </article>
  );
}

function ContactOptionsSection({ onBookNow }: { onBookNow?: () => void }) {
  const options = [
    ...CONTACT_OPTIONS,
    {
      title: "Schedule an inspection",
      description: "Prefer seeing a property in person? Book an appointment that fits your schedule.",
      actionLabel: "Book Now",
      action: onBookNow,
    },
  ];

  return (
    <section className={styles.contactSection}>
      <div className={styles.sectionIntro}>
        <h2 className={styles.sectionTitle}>How can we assist you?</h2>
        <p className={styles.sectionSubtitle}>Choose your preferred method to connect with our customer service team.</p>
      </div>
      <div className={styles.contactGrid}>
        {options.map((option) => (
          <ContactOptionCard
            key={option.title}
            title={option.title}
            description={option.description}
            actionLabel={option.actionLabel}
            onAction={option.action}
          />
        ))}
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className={styles.locationSection}>
      <div className={styles.sectionIntro}>
        <h2 className={styles.sectionTitle}>{LOCATION_CONTENT.heading}</h2>
        <p className={styles.sectionSubtitle}>{LOCATION_CONTENT.description}</p>
      </div>
      <div className={styles.locationCard}>
        <div className={styles.locationIcon} aria-hidden="true"> <img src={locationIcon} /> </div>
        <div className="">
          <p className={styles.locationCity}>{LOCATION_CONTENT.city}</p>
          <p className={styles.locationAddress}>{LOCATION_CONTENT.address}</p>
        </div>
      </div>
    </section>
  );
}

function MapMockup() {
  return (
    <section className={styles.mapSection} aria-label="Map preview of Haven Communities office">
      <div className={styles.mapMockup}>
        <img alt="Map view" src={imgMap} className={styles.mapImage} />
        <div className={styles.mapOverlayTop}>
          <span className={styles.mapToggleActive}>Map</span>
          <span className={styles.mapToggle}>Satellite</span>
        </div>
        <div className={styles.mapZoomControls} aria-hidden="true">
          <button type="button" className={styles.mapZoomButton}>+</button>
          <button type="button" className={styles.mapZoomButton}>−</button>
        </div>
        <div className={styles.mapStreetView} aria-hidden="true">
          <img alt="" src={imgPegmanOffscreen2X} className={styles.pegman} />
        </div>
        <div className={styles.mapMarker} aria-hidden="true" />
        <span className={styles.mapBranding}>Google</span>
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className={styles.sectionDividerWrapper}>
      <div className={styles.sectionDividerLine} />
    </div>
  );
}

export default function Desktop({
  onNavigate,
  onBookNow,
}: {
  onNavigate?: NavigateHandler;
  onBookNow?: () => void;
}) {
  return (
    <div className={styles.desktopPage}>
      <div className={styles.mobileHeader}>
        <MobileHeader onNavigate={onNavigate} />
      </div>
      <HeroHeaderSection onNavigate={onNavigate} />
      <div className={styles.sectionsWrapper}>
        <ContactOptionsSection onBookNow={onBookNow} />
        <LocationSection />
        <MapMockup />
      </div>
      <SectionDivider />
    </div>
  );
}

