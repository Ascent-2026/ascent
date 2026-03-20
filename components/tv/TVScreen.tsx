"use client";

import { TVStaticOverlay } from "./TVStaticOverlay";
import styles from "@/styles/tv.module.css";

interface TVScreenProps {
  children: React.ReactNode;
  isOn?: boolean;
  powerFx?: "idle" | "turningOn" | "turningOff";
  /** Increments on every channel switch — restarts the animation even mid-play */
  switchKey?: number;
  switchDuration?: number;
}

export function TVScreen({
  children,
  isOn = true,
  powerFx = "idle",
  switchKey = 0,
  switchDuration = 1200,
}: TVScreenProps) {
  const isSwitching = switchKey > 0;

  return (
    <div
      className={`${styles.screenRoot} ${powerFx === "turningOn" ? styles.screenTurningOn : ""} ${powerFx === "turningOff" ? styles.screenTurningOff : ""}`}
    >
      <div className={styles.screenGrid} />
      <div className={styles.scanline} />
      <div className={styles.screenVignette} />

      {/* key= forces a fresh DOM element on every switch → CSS animation restarts */}
      {isSwitching && (
        <div
          key={switchKey}
          className={styles.screenSignalLoss}
          style={{ animationDuration: `${switchDuration}ms` }}
        />
      )}

      <TVStaticOverlay switchKey={switchKey} duration={switchDuration} />

      {isOn ? (
        <div className={styles.screenContent}>{children}</div>
      ) : (
        <div className={styles.screenOff}>SIGNAL OFF</div>
      )}
    </div>
  );
}
