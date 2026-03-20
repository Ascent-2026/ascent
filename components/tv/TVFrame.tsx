"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TVScreen } from "./TVScreen";
import { ChannelNavBar } from "./ChannelNavBar";
import { useChannel } from "@/hooks/useChannel";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { CHANNELS } from "@/lib/constants";
import styles from "@/styles/tv.module.css";

export function TVFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentIndex, nextChannel, prevChannel } = useChannel();
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        {/* Retro Vision Label */}
        <div className={styles.retroVisionLabel}>
          RETRO
          <br />
          VISION
        </div>

        {/* Screen content area */}
        <div className={styles.screenSlot}>
          <TVScreen isOn={isPoweredOn}>{children}</TVScreen>
        </div>

        {/* Volume knob SVG overlay */}
        <div className={styles.volumeSlot}>
          <div className={styles.channelLabel}>CHANNEL</div>
          <svg className={styles.volumeKnob} viewBox="0 0 82 83" fill="none">
            <image
              href="/tv-parts/volume-knob.svg"
              width="100%"
              height="100%"
            />
          </svg>
        </div>

        {/* Power knob SVG overlay - positioned below power button */}
        <div
          className={styles.powerIndicatorSlot}
          data-powered={isPoweredOn}
          data-channel={currentIndex}
        >
          <div className={styles.powerLabel}>POWER</div>
          <svg
            className={styles.powerIndicator}
            viewBox="0 0 73 73"
            fill="none"
          >
            <image href="/tv-parts/power-knob.svg" width="100%" height="100%" />
          </svg>

          <div className={styles.powerStatusRow}>
            {/* Power on/off indicator light */}
            <div
              className={`${styles.powerLight} ${isPoweredOn ? styles.powerLightOn : styles.powerLightOff}`}
              aria-hidden="true"
            />

            {/* Power status text */}
            <div className={styles.powerStatusLabel}>
              {isPoweredOn ? "ON" : "OFF"}
            </div>
          </div>
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

      <div className={styles.mobileShell}>
        <header className={styles.mobileHeader}>
          <div className={styles.mobileBrand}>ASCENT 2026</div>
          <button
            type="button"
            className={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-channel-menu"
            aria-label="Toggle navigation menu"
          >
            <span className={styles.mobileMenuIcon} aria-hidden="true" />
          </button>
        </header>

        <nav
          id="mobile-channel-menu"
          className={`${styles.mobileMenuPanel} ${isMenuOpen ? styles.mobileMenuPanelOpen : ""}`}
          aria-label="Mobile channel navigation"
        >
          {CHANNELS.map((channel) => {
            const isActive = pathname === channel.href;
            return (
              <Link
                key={channel.id}
                href={channel.href}
                className={`${styles.mobileMenuLink} ${isActive ? styles.mobileMenuLinkActive : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {channel.label}
              </Link>
            );
          })}
        </nav>

        <main className={styles.mobilePageContent}>{children}</main>
      </div>
    </div>
  );
}
