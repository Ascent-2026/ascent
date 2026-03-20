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
const KNOB_BASE_OFFSET = 15;

export function TVFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentIndex, nextChannel, prevChannel } = useChannel();
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [powerFx, setPowerFx] = useState<PowerFx>("idle");
  const [isPowerPressed, setIsPowerPressed] = useState(false);
  const [volume, setVolume] = useState(56);
  const [isVolumeAdjusting, setIsVolumeAdjusting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [switchKey, setSwitchKey] = useState(0);
  const activePointerIdRef = useRef<number | null>(null);
  const knobLastPointerAngleRef = useRef<number | null>(null);
  const knobCurrentAngleRef = useRef<number>(16.2);
  const powerFxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const volumeAngle = useMemo(() => -135 + (volume / 100) * 270, [volume]);

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

  // Increment switchKey on every pathname change — always fires even if
  // the previous animation hasn't finished yet (no boolean stuck-at-true problem)
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (!isPoweredOn) return;
    setSwitchKey(k => k + 1);
  }, [pathname]);

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
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
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
          <TVScreen isOn={isPoweredOn} powerFx={powerFx} switchKey={switchKey} switchDuration={1200}>
            {children}
          </TVScreen>
        </div>

        {/* Volume knob SVG overlay */}
        <div className={styles.volumeSlot}>
          <div className={styles.volumeLabel}>VOLUME</div>
          <button
            type="button"
            className={`${styles.volumeKnobButton} ${isVolumeAdjusting ? styles.volumeKnobButtonActive : ""}`}
            style={{
              transform: `rotate(${volumeAngle + KNOB_BASE_OFFSET}deg)`,
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
            <svg className={styles.volumeKnob} viewBox="0 0 82 83" fill="none">
              <image
                href="/tv-parts/volume-knob.svg"
                width="100%"
                height="100%"
              />
            </svg>
          </button>
          <div className={styles.volumeStatusLabel}>{volume}%</div>
        </div>

        {/* Power knob SVG overlay - positioned below power button */}
        <div
          className={`${styles.powerIndicatorSlot} ${isPowerPressed ? styles.powerIndicatorSlotPressed : ""}`}
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
          className={`${styles.powerButton} ${isPowerPressed ? styles.powerButtonPressed : ""}`}
          onPointerDown={() => setIsPowerPressed(true)}
          onPointerUp={() => setIsPowerPressed(false)}
          onPointerCancel={() => setIsPowerPressed(false)}
          onPointerLeave={() => setIsPowerPressed(false)}
          onClick={togglePower}
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
