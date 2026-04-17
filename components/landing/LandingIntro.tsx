"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "@/styles/landing.module.css";
import { SkipIntroButton } from "./SkipIntroButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SCENES = [
  { src: "/assets/landing/scene-1.png", alt: "Flooded atrium with a closed door" },
  { src: "/assets/landing/scene-2.png", alt: "Figure approaching the door" },
  { src: "/assets/landing/scene-3.png", alt: "Galaxy visible through the open door" },
  { src: "/assets/landing/scene-4.png", alt: "Emerging onto a bridge toward the future city" },
  { src: "/assets/landing/scene-5.png", alt: "Full futuristic city panorama" },
];

export function LandingIntro() {
  const railRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !railRef.current || !stageRef.current) return;

      const scenes = gsap.utils.toArray<HTMLElement>(`.${styles.scene}`);

      // Start state: only scene 0 visible, scale 1.
      gsap.set(scenes, { opacity: 0, scale: 1 });
      gsap.set(scenes[0], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: railRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stageRef.current,
          pinSpacing: false,
        },
      });

      // 4 crossfade segments. Scene 3 (index 2) gets a slight dwell bonus.
      // Segment durations sum to 1. Base = 0.24, scene-3 extra = 0.04.
      const segmentDurations = [0.24, 0.24, 0.28, 0.24];

      segmentDurations.forEach((dur, i) => {
        const from = scenes[i];
        const to = scenes[i + 1];
        tl.to(from, { opacity: 0, scale: 1.06, duration: dur, ease: "none" }, ">")
          .to(to, { opacity: 1, duration: dur, ease: "none" }, "<");
      });

      // Fade overlay out between 55% and 70% scroll progress.
      tl.to(
        overlayRef.current,
        { opacity: 0, duration: 0.15, ease: "none" },
        0.55,
      );
    },
    { scope: railRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={railRef} className={styles.introRail} aria-label="Intro cinematic">
      <div ref={stageRef} className={styles.stickyStage}>
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

        <div ref={overlayRef} className={styles.introOverlay}>
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
