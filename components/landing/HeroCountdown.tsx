"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/landing.module.css";

const TARGET = new Date("2026-05-15T00:00:00").getTime();

function diff(now: number) {
  const d = TARGET - now;
  if (d <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days: Math.floor(d / 86_400_000),
    hours: Math.floor((d % 86_400_000) / 3_600_000),
    mins: Math.floor((d % 3_600_000) / 60_000),
    secs: Math.floor((d % 60_000) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function HeroCountdown() {
  const [t, setT] = useState(() => diff(Date.now()));

  useEffect(() => {
    const id = setInterval(() => setT(diff(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="phase-two-start" className={styles.phaseTwoStart}>
      <p className={styles.countdownLabel}>Loading the Future In…</p>
      <div className={styles.countdownGrid}>
        {[
          { v: t.days, u: "Days" },
          { v: t.hours, u: "Hours" },
          { v: t.mins, u: "Minutes" },
          { v: t.secs, u: "Seconds" },
        ].map((tile) => (
          <div key={tile.u} className={styles.countdownTile}>
            <div className={styles.countdownValue}>{pad(tile.v)}</div>
            <div className={styles.countdownUnit}>{tile.u}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
