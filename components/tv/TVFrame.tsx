"use client";

import { useState } from "react";
import { TVScreen } from "./TVScreen";
import { ChannelNavBar } from "./ChannelNavBar";
import { useChannel } from "@/hooks/useChannel";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import styles from "@/styles/tv.module.css";

export function TVFrame({ children }: { children: React.ReactNode }) {
  const { currentIndex, nextChannel, prevChannel } = useChannel();
  const [isPoweredOn, setIsPoweredOn] = useState(true);

  useKeyboardNav(
    () => {
      if (isPoweredOn) nextChannel();
    },
    () => {
      if (isPoweredOn) prevChannel();
    },
  );

  return (
    <div className={styles.stage}>
      <div className={styles.desktopTv}>
        {/* Base background image - fills entire viewport */}
        <div className={styles.tvBase} aria-hidden="true" />

        {/* Screen content area */}
        <div className={styles.screenSlot}>
          <TVScreen isOn={isPoweredOn}>{children}</TVScreen>
        </div>

        {/* Volume knob SVG overlay */}
        <div className={styles.volumeSlot}>
          <svg className={styles.volumeKnob} viewBox="0 0 82 83" fill="none">
            <image
              href="/tv-parts/volume-knob.svg"
              width="100%"
              height="100%"
            />
          </svg>
        </div>

        {/* Power indicator SVG overlay - positioned below power button */}
        <div
          className={styles.powerIndicatorSlot}
          data-powered={isPoweredOn}
          data-channel={currentIndex}
        >
          <svg
            className={styles.powerIndicator}
            viewBox="0 0 40 37"
            fill="none"
          >
            <image
              href="/tv-parts/power-indicator.svg"
              width="100%"
              height="100%"
            />
          </svg>
        </div>

        {/* Power button (clickable area) */}
        <button
          type="button"
          className={styles.powerButton}
          onClick={() => setIsPoweredOn((prev) => !prev)}
          aria-pressed={isPoweredOn}
          aria-label={isPoweredOn ? "Turn TV off" : "Turn TV on"}
        >
          <span className={styles.srOnly}>Power</span>
        </button>

        {/* Channels bar SVG + navigation */}
        <div className={styles.navSlot}>
          <svg className={styles.channelsBar} viewBox="0 0 529 36" fill="none">
            <image
              href="/tv-parts/channels-bar.svg"
              width="100%"
              height="100%"
            />
          </svg>
          <ChannelNavBar compact />
        </div>
      </div>
    </div>
  );
}
