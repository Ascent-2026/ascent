import Image from "next/image";
import styles from "@/styles/landing.module.css";

export function BiggestTechfest() {
  return (
    <section className={styles.bigFestSection}>
      <div className={styles.bigFestCard}>
        {/* TODO: replace with actual techfest hero image when provided */}
        <Image
          src="/assets/landing/scene-5.png"
          alt="Techfest crowd and main stage"
          fill
          className={styles.bigFestImage}
          sizes="(max-width: 72rem) 100vw, 72rem"
        />
        <span className={styles.bigFestRibbon}>Experience India&apos;s</span>
        <h2 className={styles.bigFestHeadline}>BIGGEST AI TECHFEST</h2>
      </div>
    </section>
  );
}
