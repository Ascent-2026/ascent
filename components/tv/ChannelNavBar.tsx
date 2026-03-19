"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CHANNELS } from "@/lib/constants";
import { useChannel } from "@/hooks/useChannel";
import styles from "@/styles/tv.module.css";

interface ChannelNavBarProps {
  compact?: boolean;
}

export function ChannelNavBar({ compact = false }: ChannelNavBarProps) {
  const pathname = usePathname();
  const { nextChannel, prevChannel } = useChannel();

  return (
    <div
      className={`${styles.channelBar} ${compact ? styles.channelBarCompact : ""}`}
    >
      <button
        type="button"
        onClick={prevChannel}
        className={styles.channelStepButton}
        aria-label="Previous channel"
      >
        ◀
      </button>
      {CHANNELS.map((ch) => (
        <Link
          key={ch.id}
          href={ch.href}
          className={`${styles.channelLink} ${
            pathname.startsWith(ch.href) ? styles.channelLinkActive : ""
          }`}
        >
          {ch.label}
        </Link>
      ))}
      <button
        type="button"
        onClick={nextChannel}
        className={styles.channelStepButton}
        aria-label="Next channel"
      >
        ▶
      </button>
    </div>
  );
}
