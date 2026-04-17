import styles from "@/styles/landing.module.css";

export function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <h2 className={styles.aboutHeading}>ABOUT US</h2>
      <div className={styles.aboutGrid}>
        <div className={styles.aboutPanel}>
          <h3 className={styles.aboutPanelTitle}>ASCENT</h3>
          <p className={styles.aboutPanelBody}>
            Ascent 2026 brings creators, coders, and innovators together for a
            high-energy three-day experience. From hands-on challenges to live
            showcases, the event is designed to help ideas move from concept to
            impact in a bold retro-futuristic setting.
          </p>
        </div>
        <div className={styles.aboutPanel}>
          <h3 className={styles.aboutPanelTitle}>SCALER</h3>
          <p className={styles.aboutPanelBody}>
            {/* TODO: real Scaler School of Technology copy */}
            Scaler School of Technology nurtures the next generation of builders.
          </p>
        </div>
      </div>
    </section>
  );
}
