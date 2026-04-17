import styles from "@/styles/landing.module.css";

// TODO: replace href with actual Unstop registration URL
const REGISTER_URL = "#";

export function RegisterSection() {
  return (
    <section className={styles.registerSection}>
      <a href={REGISTER_URL} className={styles.registerPill} target="_blank" rel="noreferrer">
        REGISTER NOW !
        <span className={styles.registerBadge}>un</span>
      </a>
    </section>
  );
}
