"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useChannel } from "@/hooks/useChannel";
import styles from "@/styles/tv.module.css";

interface ChannelNavBarProps {
  compact?: boolean;
}

export function ChannelNavBar({ compact = false }: ChannelNavBarProps) {
  const { channels, currentIndex, nextChannel, prevChannel } = useChannel();

  const dynamicVars = {
    "--channel-count": channels.length,
    "--active-index": currentIndex,
  } as CSSProperties;

  return (
    <div
      className={`${styles.channelBar} ${compact ? styles.channelBarCompact : ""}`}
      style={dynamicVars}
    >
      <button
        type="button"
        onClick={prevChannel}
        className={styles.channelStepButton}
        aria-label="Previous channel"
      >
        ◀
      </button>
      <div className={styles.channelLinksTrack}>
        {channels.map((ch, index) => (
          <Link
            key={ch.id}
            href={ch.href}
            className={`${styles.channelLink} ${
              index === currentIndex ? styles.channelLinkActive : ""
            }`}
          >
            {ch.label}
          </Link>
        ))}
        <span className={styles.channelActiveMarker} aria-hidden="true" />
      </div>
      <button
        type="button"
        onClick={nextChannel}
        className={styles.channelStepButton}
        aria-label="Next channel"
      >
      </button>
    </div>
  );
}
