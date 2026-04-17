import Image from "next/image";
import styles from "@/styles/landing.module.css";

export function Footer() {
  return (
    <footer className={styles.landingFooter}>
      <Image
        src="/assets/landing/Vector 24-1.png"
        alt="Ascent"
        width={600}
        height={200}
        className={styles.footerMark}
      />
      <div className={styles.footerMeta}>
        © {new Date().getFullYear()} Scaler School of Technology · Ascent 2026
      </div>
    </footer>
  );
}
