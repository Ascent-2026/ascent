"use client";

import { useState } from "react";
import styles from "@/styles/tv.module.css";

export function TVControls() {
  const [volume, setVolume] = useState(60);

  function increaseVolume() {
    setVolume((prev) => (prev >= 100 ? 0 : prev + 10));
  }

  return (
    <div className={styles.volumePanel}>
      <button
        type="button"
        onClick={increaseVolume}
        className={styles.volumeKnob}
        aria-label={`Increase volume, current ${volume} percent`}
      >
        <span className={styles.volumeKnobCenter} />
        <span
          className={styles.volumeKnobMarker}
          style={{ transform: `rotate(${volume * 2.7}deg)` }}
        />
      </button>
      <div className={styles.volumeValue}>{volume}</div>
    </div>
  );
}
