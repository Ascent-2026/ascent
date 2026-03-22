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
import { useGameStore } from "@/store/gameStore";
import styles from "@/styles/tv.module.css";

/** Survives React Strict Mode remounts so CRT boot runs once */
let tvBootFromLoaderOnce = false;

type PowerFx = "idle" | "turningOn" | "turningOff";

/** Matches CSS `crtPowerOn` / entrance fade so power-on ends when the 1s CRT sequence finishes */
const POWER_ON_MS = 2000;

/** Dial art: indicator at 6 o'clock at 0°. Min volume → first dot (-90°). Sweep covers all 7 dots (6 intervals). */
const DIAL_MIN_DEG = -90;
const DIAL_SWEEP_DEG = 280;

/** volume-dial.svg viewBox 0 0 91 91 — circle center is (46, 42.73), not the viewBox center */
const DIAL_VIEWBOX = 91;
const DIAL_CENTER_X = 46;
const DIAL_CENTER_Y = 42.73;

export function TVFrame({ children }: { children: React.ReactNode }) {
  const isGameStarted = useGameStore((s) => s.isGameStarted);
  const pathname = usePathname();
  const { currentIndex, nextChannel, prevChannel } = useChannel();
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [powerFx, setPowerFx] = useState<PowerFx>("idle");
  const [isPowerPressed, setIsPowerPressed] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isVolumeAdjusting, setIsVolumeAdjusting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [switchKey, setSwitchKey] = useState(0);
  const activePointerIdRef = useRef<number | null>(null);
  const knobLastPointerAngleRef = useRef<number | null>(null);
  const knobCurrentAngleRef = useRef<number>(-135);
  const powerFxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

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

  /** Tracks whether music *should* be playing (used by the autoplay-unlock listener) */
  const wantsToPlayRef = useRef(false);

  // Create background audio once on mount + install a one-time click listener
  // that retries play() if the browser blocked autoplay
  useEffect(() => {
    const audio = new Audio("/assets/Music.mp3");
    audio.loop = true;
    audio.volume = volume / 100;
    bgAudioRef.current = audio;

    const unlockAutoplay = () => {
      if (wantsToPlayRef.current && audio.paused) {
        audio.play().catch(() => {});
      }
      document.removeEventListener("click", unlockAutoplay);
    };
    document.addEventListener("click", unlockAutoplay);

    return () => {
      clearPowerFxTimer();
      document.removeEventListener("click", unlockAutoplay);
      audio.pause();
      bgAudioRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync background music volume whenever the knob changes.
  // Also retries play() here because a volume-knob interaction IS a direct
  // user gesture — so the browser will allow it even if initial autoplay was blocked.
  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
    if (wantsToPlayRef.current && audio.paused) {
      audio.play().catch(() => {});
    }
  }, [volume]);

  // Play / pause background music based on power state
  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    if (isPoweredOn) {
      wantsToPlayRef.current = true;
      audio.play().catch(() => {
        // Autoplay blocked — unlockAutoplay listener will retry on next click
      });
    } else {
      wantsToPlayRef.current = false;
      audio.pause();
    }
  }, [isPoweredOn]);

  /** After loading: zoom starts + CRT power-on + static overlay (same as channel switch) */
  useEffect(() => {
    if (!isGameStarted || tvBootFromLoaderOnce) return;
    tvBootFromLoaderOnce = true;
    clearPowerFxTimer();
    setIsPoweredOn(true);
    setPowerFx("turningOn");
    // Increment switchKey so TVStaticOverlay fires its noise/static effect on boot
    setSwitchKey(1);
    powerFxTimerRef.current = setTimeout(() => {
      setPowerFx("idle");
    }, POWER_ON_MS);
  }, [isGameStarted]);

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
    }, POWER_ON_MS);
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
      <div
        className={`${styles.desktopTv} ${isGameStarted ? styles.desktopTvReveal : ""}`}
      >
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

      {/* Mobile View - Direct Content (No Wrapper) */}
      <div
        className={`${styles.mobileDirectContent} ${isGameStarted ? styles.mobileReveal : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
