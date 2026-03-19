"use client";

import { useState } from "react";
import Image from "next/image";
import { TVScreen } from "./TVScreen";
import { TVControls } from "./TVControls";
import { ChannelNavBar } from "./ChannelNavBar";
import { ChannelIndicator } from "./ChannelIndicator";
import { useChannel } from "@/hooks/useChannel";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import styles from "@/styles/tv.module.css";

export function TVFrame({ children }: { children: React.ReactNode }) {
  const { nextChannel, prevChannel } = useChannel();
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
        <Image
          src="/tv-base.svg"
          alt=""
          aria-hidden="true"
          className={styles.tvBase}
          fill
          sizes="100vw"
          priority
        />

        <div className={styles.screenSlot}>
          <TVScreen isOn={isPoweredOn}>{children}</TVScreen>
        </div>

        <div className={styles.volumeSlot}>
          <TVControls />
        </div>

        <button
          type="button"
          className={styles.powerButton}
          onClick={() => setIsPoweredOn((prev) => !prev)}
          aria-pressed={isPoweredOn}
          aria-label={isPoweredOn ? "Turn TV off" : "Turn TV on"}
        >
          <span className={styles.srOnly}>Power</span>
        </button>

        <div className={styles.navSlot}>
          <ChannelNavBar compact />
        </div>
      </div>

      <div className={styles.mobileShell}>
        <div className={styles.mobileHeader}>
          <span className={styles.mobileBrand}>ASCENT 2026</span>
          <ChannelIndicator />
        </div>

        <TVScreen isOn={isPoweredOn}>{children}</TVScreen>

        <div className={styles.mobileControls}>
          <TVControls />
          <button
            type="button"
            className={styles.mobilePowerButton}
            onClick={() => setIsPoweredOn((prev) => !prev)}
            aria-pressed={isPoweredOn}
          >
            {isPoweredOn ? "Power ON" : "Power OFF"}
          </button>
        </div>

        <ChannelNavBar />
      </div>
    </div>
  );
}
