"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TVScreen } from "./TVScreen";
import { ChannelNavBar } from "./ChannelNavBar";
import { useChannel } from "@/hooks/useChannel";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { CHANNELS } from "@/lib/constants";
import styles from "@/styles/tv.module.css";

type PowerFx = "idle" | "turningOn" | "turningOff";

/** Dial art: indicator at 6 o'clock at 0°. Min volume → first dot (-90°). Sweep covers all 7 dots (6 intervals). */
const DIAL_MIN_DEG = -90;
const DIAL_SWEEP_DEG = 280;

/** volume-dial.svg viewBox 0 0 91 91 — circle center is (46, 42.73), not the viewBox center */
const DIAL_VIEWBOX = 91;
const DIAL_CENTER_X = 46;
const DIAL_CENTER_Y = 42.73;

export function TVFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentIndex, nextChannel, prevChannel } = useChannel();
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [powerFx, setPowerFx] = useState<PowerFx>("idle");
  const [isPowerPressed, setIsPowerPressed] = useState(false);
  const [volume, setVolume] = useState(56);
  const [isVolumeAdjusting, setIsVolumeAdjusting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activePointerIdRef = useRef<number | null>(null);
  const knobLastPointerAngleRef = useRef<number | null>(null);
  const knobCurrentAngleRef = useRef<number>(16.2);
  const powerFxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Visual rotation only; interaction still uses -135…+135 via volumeToAngle. */
  const dialDisplayRotation = useMemo(
    () => DIAL_MIN_DEG + (volume / 100) * DIAL_SWEEP_DEG,
    [volume],
  );

  const clearPowerFxTimer = () => {
    if (powerFxTimerRef.current) {
      clearTimeout(powerFxTimerRef.current);
      powerFxTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearPowerFxTimer();
    };
  }, []);

  const syncPageMediaVolume = (nextVolume: number) => {
    const media = document.querySelectorAll("audio, video");
    media.forEach((element) => {
      const mediaElement = element as HTMLMediaElement;
      mediaElement.volume = nextVolume / 100;
    });
  };

  const angleToVolume = (rawAngle: number) => {
    const normalized = Math.max(-135, Math.min(135, rawAngle));
    return Math.round(((normalized + 135) / 270) * 100);
  };

  const volumeToAngle = (nextVolume: number) => -135 + (nextVolume / 100) * 270;

  const normalizeAngleDelta = (delta: number) => {
    let nextDelta = delta;
    while (nextDelta > 180) nextDelta -= 360;
    while (nextDelta < -180) nextDelta += 360;
    return nextDelta;
  };

  const pointerAngle = (
    event: ReactPointerEvent<HTMLButtonElement>,
    button: HTMLButtonElement,
  ) => {
    const rect = button.getBoundingClientRect();
    const cx = rect.left + rect.width * (DIAL_CENTER_X / DIAL_VIEWBOX);
    const cy = rect.top + rect.height * (DIAL_CENTER_Y / DIAL_VIEWBOX);
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  const updateVolumeFromPointer = (
    event: ReactPointerEvent<HTMLButtonElement>,
    button: HTMLButtonElement,
  ) => {
    const nextPointerAngle = pointerAngle(event, button);
    if (knobLastPointerAngleRef.current === null) {
      knobLastPointerAngleRef.current = nextPointerAngle;
      return;
    }

    const delta = normalizeAngleDelta(
      nextPointerAngle - knobLastPointerAngleRef.current,
    );
    const nextAngle = Math.max(
      -135,
      Math.min(135, knobCurrentAngleRef.current + delta),
    );
    knobCurrentAngleRef.current = nextAngle;
    knobLastPointerAngleRef.current = nextPointerAngle;

    const nextVolume = angleToVolume(nextAngle);
    setVolume(nextVolume);
    syncPageMediaVolume(nextVolume);
  };

  const togglePower = () => {
    if (powerFx !== "idle") return;

    clearPowerFxTimer();
    if (isPoweredOn) {
      setPowerFx("turningOff");
      powerFxTimerRef.current = setTimeout(() => {
        setIsPoweredOn(false);
        setPowerFx("idle");
      }, 220);
      return;
    }

    setIsPoweredOn(true);
    setPowerFx("turningOn");
    powerFxTimerRef.current = setTimeout(() => {
      setPowerFx("idle");
    }, 420);
  };

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
        <div
          className={`${styles.screenSlot} ${powerFx === "turningOn" ? styles.screenSlotPowerOn : ""} ${powerFx === "turningOff" ? styles.screenSlotPowerOff : ""}`}
        >
          <TVScreen isOn={isPoweredOn} powerFx={powerFx}>
            {children}
          </TVScreen>
        </div>

        {/* Volume: static tick marks + rotating dial */}
        <div className={styles.volumeSlot}>
          <div className={styles.volumeLabel}>VOLUME</div>
          <div className={styles.volumeKnobStack}>
            <div className={styles.volumeDots} aria-hidden="true">
              <svg
                className={styles.volumeDotsSvg}
                viewBox="0 0 80 80"
                fill="none"
              >
                <image
                  href="/tv-parts/volume-dots.svg"
                  width="100%"
                  height="100%"
                />
              </svg>
            </div>
            <button
              type="button"
              className={`${styles.volumeKnobButton} ${isVolumeAdjusting ? styles.volumeKnobButtonActive : ""}`}
              style={{
                transform: `rotate(${dialDisplayRotation}deg)`,
              }}
              onPointerDown={(event) => {
                const button = event.currentTarget;
                activePointerIdRef.current = event.pointerId;
                setIsVolumeAdjusting(true);
                knobCurrentAngleRef.current = volumeToAngle(volume);
                knobLastPointerAngleRef.current = pointerAngle(event, button);
                button.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                if (activePointerIdRef.current !== event.pointerId) return;
                updateVolumeFromPointer(event, event.currentTarget);
              }}
              onPointerUp={(event) => {
                if (activePointerIdRef.current !== event.pointerId) return;
                activePointerIdRef.current = null;
                knobLastPointerAngleRef.current = null;
                setIsVolumeAdjusting(false);
                event.currentTarget.releasePointerCapture(event.pointerId);
              }}
              onPointerCancel={() => {
                activePointerIdRef.current = null;
                knobLastPointerAngleRef.current = null;
                setIsVolumeAdjusting(false);
              }}
              onWheel={(event) => {
                event.preventDefault();
                const direction = event.deltaY < 0 ? 2 : -2;
                const nextVolume = Math.max(0, Math.min(100, volume + direction));
                setVolume(nextVolume);
                knobCurrentAngleRef.current = volumeToAngle(nextVolume);
                syncPageMediaVolume(nextVolume);
              }}
              aria-label={`Volume ${volume}%`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={volume}
              role="slider"
            >
              <svg
                className={styles.volumeDialSvg}
                viewBox="0 0 91 91"
                fill="none"
              >
                <image
                  href="/tv-parts/volume-dial.svg"
                  width="100%"
                  height="100%"
                />
              </svg>
            </button>
          </div>
          <div className={styles.volumeStatusLabel}>{volume}%</div>
        </div>

        {/* Power knob: SVG is the clickable surface */}
        <div
          className={styles.powerIndicatorSlot}
          data-powered={isPoweredOn}
          data-channel={currentIndex}
        >
          <div className={styles.powerLabel}>POWER</div>
          <button
            type="button"
            className={`${styles.powerKnobButton} ${isPowerPressed ? styles.powerKnobButtonPressed : ""}`}
            onPointerDown={() => setIsPowerPressed(true)}
            onPointerUp={() => setIsPowerPressed(false)}
            onPointerCancel={() => setIsPowerPressed(false)}
            onPointerLeave={() => setIsPowerPressed(false)}
            onClick={togglePower}
            aria-pressed={isPoweredOn}
            aria-label={isPoweredOn ? "Turn TV off" : "Turn TV on"}
          >
            <svg
              className={styles.powerIndicator}
              viewBox="0 0 73 73"
              fill="none"
              aria-hidden="true"
            >
              <image href="/tv-parts/power-knob.svg" width="100%" height="100%" />
            </svg>
          </button>

          <div className={styles.powerStatusRow}>
            <div
              className={`${styles.powerLight} ${isPoweredOn ? styles.powerLightOn : styles.powerLightOff}`}
              aria-hidden="true"
            />
            <div className={styles.powerStatusLabel}>
              {isPoweredOn ? "ON" : "OFF"}
            </div>
          </div>
        </div>

        {/* Channels bar SVG + navigation */}
        <div className={styles.navSlot}>
          <svg
            className={styles.channelsBar}
            viewBox="0 0 529 36"
            fill="none"
            preserveAspectRatio="none"
          >
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
