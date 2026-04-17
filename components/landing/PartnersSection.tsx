import styles from "@/styles/landing.module.css";

// TODO: replace with real partner logos/assets
const PARTNERS = [
  "Eyecandy Robotics",
  "MegaLLM",
  "Galla",
  "Technobotix",
  "Partner 5",
  "Partner 6",
];

export function PartnersSection() {
  return (
    <section className={styles.partnersSection}>
      <h2 className={styles.partnersHeading}>PARTNERS</h2>
      <div className={styles.partnersGrid}>
        {PARTNERS.map((p) => (
          <div key={p} className={styles.partnerCell}>
            {p}
          </div>
        ))}
      </div>
    </section>
  );
}
