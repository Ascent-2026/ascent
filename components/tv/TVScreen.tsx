import styles from "@/styles/tv.module.css";

interface TVScreenProps {
  children: React.ReactNode;
  isOn?: boolean;
  powerFx?: "idle" | "turningOn" | "turningOff";
}

export function TVScreen({
  children,
  isOn = true,
  powerFx = "idle",
}: TVScreenProps) {
  return (
    <div
      className={`${styles.screenRoot} ${powerFx === "turningOn" ? styles.screenTurningOn : ""} ${powerFx === "turningOff" ? styles.screenTurningOff : ""}`}
    >
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
