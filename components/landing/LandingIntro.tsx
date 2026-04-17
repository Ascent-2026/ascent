"use client";

import Image from "next/image";
import styles from "@/styles/landing.module.css";
import { SkipIntroButton } from "./SkipIntroButton";

const SCENES = [
  { src: "/assets/landing/scene-1.png", alt: "Flooded atrium with a closed door" },
  { src: "/assets/landing/scene-2.png", alt: "Figure approaching the door" },
  { src: "/assets/landing/scene-3.png", alt: "Galaxy visible through the open door" },
  { src: "/assets/landing/scene-4.png", alt: "Emerging onto a bridge toward the future city" },
  { src: "/assets/landing/scene-5.png", alt: "Full futuristic city panorama" },
];

export function LandingIntro() {
  return (
    <section className={styles.introRail} aria-label="Intro cinematic">
      <div className={styles.stickyStage}>
        {SCENES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            priority={i < 2}
            className={`${styles.scene} ${i === 0 ? styles.sceneFirst : ""}`}
            data-scene-index={i}
            sizes="100vw"
          />
        ))}

        <div className={styles.introOverlay}>
          <Image
            src="/assets/landing/inno 3.png"
            alt="Escape the Ordinary — Ascent 16-17 May"
            width={360}
            height={110}
            className={styles.introBadge}
            priority
          />
          <SkipIntroButton targetId="phase-two-start" />
        </div>
      </div>
    </section>
  );
}
