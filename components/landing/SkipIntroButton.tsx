"use client";

import styles from "@/styles/landing.module.css";

type Props = {
  targetId: string;
};

export function SkipIntroButton({ targetId }: Props) {
  const onClick = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button type="button" className={styles.skipButton} onClick={onClick}>
      Skip Intro ↓
    </button>
  );
}
