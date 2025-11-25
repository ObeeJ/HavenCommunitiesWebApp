import { MobileHeader } from "../components/MobileHeader";
import { DesktopHeader } from "../components/DesktopHeader";
import styles from "./CookiesPolicy.module.css";

export default function CookiesPolicy() {
  const handleNavigate = (page: string) => {
    console.log(`Navigating to: ${page}`);
    // Add your navigation logic here
  };

  return (
    <div className={styles.page}>
      <div className={styles.mobileHeader}>
        <MobileHeader onNavigate={handleNavigate} />
      </div>
      <DesktopHeader onNavigate={handleNavigate} />
      {/* ...existing content... */}
    </div>
  );
}
