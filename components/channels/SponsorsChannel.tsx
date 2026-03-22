import styles from "@/styles/noSignal.module.css";

export function SponsorsChannel() {
  return (
    <div className={styles.noSignal}>
      <div className={styles.staticBars} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.icon}>📡</div>
        <h1 className={styles.title}>NO SIGNAL</h1>
        <p className={styles.channel}>CH · 04 · SPONSORS</p>
        <p className={styles.message}>BROADCAST COMING SOON</p>
        <div className={styles.blink}>▌</div>
      </div>
    </div>
  );
}
