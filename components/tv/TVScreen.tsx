import styles from "@/styles/tv.module.css";

interface TVScreenProps {
  children: React.ReactNode;
  isOn?: boolean;
}

export function TVScreen({ children, isOn = true }: TVScreenProps) {
  return (
    <div className={styles.screenRoot}>
      <div className={styles.screenGrid} />
      <div className={styles.scanline} />
      <div className={styles.screenVignette} />
      {isOn ? (
        <div className={styles.screenContent}>{children}</div>
      ) : (
        <div className={styles.screenOff}>SIGNAL OFF</div>
      )}
    </div>
  );
}
