import styles from "@/styles/contactcard.module.css";

interface ContactCardProps {
  name: string;
  role: string;
  email: string;
  phone?: string;
  accent?: "orange" | "cyan" | "pink" | "purple";
}

export function ContactCard({
  name,
  role,
  email,
  phone,
  accent = "orange",
}: ContactCardProps) {
  return (
    <article
      className={`${styles.contactCard} ${styles[`accent${accent.charAt(0).toUpperCase() + accent.slice(1)}`]}`}
    >
      <div className={styles.cardGlow} aria-hidden="true" />

      <div className={styles.cardHeader}>
        <div className={styles.avatar} aria-hidden="true">
          {name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.role}>{role}</p>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.label}>Contact</span>
        <a href={`mailto:${email}`} className={styles.emailLink}>
          {email}
        </a>
        {phone && (
          <a href={`tel:${phone}`} className={styles.phoneLink}>
            {phone}
          </a>
        )}
      </div>
    </article>
  );
}
