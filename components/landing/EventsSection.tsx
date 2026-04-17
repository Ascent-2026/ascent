import Link from "next/link";
import styles from "@/styles/landing.module.css";

type Event = { name: string; image?: string };

// TODO: replace with real event data (4 events)
const EVENTS: Event[] = [
  { name: "AI Hackathon" },
  { name: "Anvil Hackathon" },
  { name: "Event 3" },
  { name: "Event 4" },
];

export function EventsSection() {
  return (
    <section className={styles.eventsSection}>
      <div className={styles.eventsHeaderRow}>
        <h2 className={styles.eventsHeading}>EVENTS</h2>
        <Link href="/events" className={styles.eventsSeeAll}>
          see them all →
        </Link>
      </div>
      <div className={styles.eventsGrid}>
        {EVENTS.map((e) => (
          <div key={e.name} className={styles.eventCard}>
            <div className={styles.eventCardName}>{e.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
