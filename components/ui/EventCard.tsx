import styles from "@/styles/eventcard.module.css";

interface EventCardProps {
  title: string;
  day: number;
  time: string;
  status: "upcoming" | "live" | "past";
  dotColor: string;
}

export function EventCard({ title, day, time, status, dotColor }: EventCardProps) {
  return (
    <div className={styles.eventCard}>
      {/* Left Content */}
      <div className={styles.eventCardLeft}>
        {/* Colored Dot */}
        <div
          className={styles.eventDot}
          style={{ backgroundColor: dotColor }}
        />
        
        {/* Event Info */}
        <div className={styles.eventInfo}>
          <h3 className={styles.eventTitle}>
            {title}
          </h3>
          <p className={styles.eventMeta}>
            Day {day} | {time}
          </p>
        </div>
      </div>

      {/* Right Badge */}
      <div className={`${styles.eventBadge} ${styles[`badge${status.charAt(0).toUpperCase() + status.slice(1)}`]}`}>
        {status}
      </div>
    </div>
  );
}
