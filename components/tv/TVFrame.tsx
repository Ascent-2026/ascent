"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { usePathname } from "next/navigation";
import { TVScreen } from "./TVScreen";
import { ChannelNavBar } from "./ChannelNavBar";
import { useChannel } from "@/hooks/useChannel";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { useGameStore, type GameStore } from "@/store/gameStore";
import styles from "@/styles/tv.module.css";

let tvBootFromLoaderOnce = false;

type PowerFx = "idle" | "turningOn" | "turningOff";

const POWER_ON_MS = 2000;

const DIAL_MIN_DEG = -90;
const DIAL_SWEEP_DEG = 280;

const DIAL_VIEWBOX = 91;
const DIAL_CENTER_X = 46;
const DIAL_CENTER_Y = 42.73;

export function TVFrame({ children }: { children: React.ReactNode }) {
  const isGameStarted = useGameStore((s: GameStore) => s.isGameStarted);
  const pathname = usePathname();
  const { currentIndex, nextChannel, prevChannel } = useChannel();
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [powerFx, setPowerFx] = useState<PowerFx>("idle");
  const [isPowerPressed, setIsPowerPressed] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isVolumeAdjusting, setIsVolumeAdjusting] = useState(false);
  const [switchKey, setSwitchKey] = useState(0);
  const activePointerIdRef = useRef<number | null>(null);
  const knobLastPointerAngleRef = useRef<number | null>(null);
  const knobCurrentAngleRef = useRef<number>(-135);
  const powerFxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

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

  const wantsToPlayRef = useRef(false);

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

  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
    if (wantsToPlayRef.current && audio.paused) {
      audio.play().catch(() => {});
    }
  }, [volume]);

  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    if (isPoweredOn) {
      wantsToPlayRef.current = true;
      audio.play().catch(() => {});
    } else {
      wantsToPlayRef.current = false;
      audio.pause();
    }
  }, [isPoweredOn]);

  useEffect(() => {
    if (!isGameStarted || tvBootFromLoaderOnce) return;
    tvBootFromLoaderOnce = true;
    clearPowerFxTimer();
    setIsPoweredOn(true);
    setPowerFx("turningOn");
    setSwitchKey(1);
    powerFxTimerRef.current = setTimeout(() => {
      setPowerFx("idle");
    }, POWER_ON_MS);
  }, [isGameStarted]);

  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (!isPoweredOn) return;
    // Force static/signal effect on every route-based channel switch.
    setSwitchKey((k) => k + 1);
    // Intentional: only route changes should trigger the switch effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className={styles.tvBase} aria-hidden="true" />

        <div className={styles.retroVisionLabel}>
          RETRO
          <br />
          VISION
        </div>

        <div
          className={`${styles.screenSlot} ${powerFx === "turningOn" ? styles.screenSlotPowerOn : ""} ${powerFx === "turningOff" ? styles.screenSlotPowerOff : ""}`}
        >
          <TVScreen
            isOn={isPoweredOn}
            powerFx={powerFx}
            switchKey={switchKey}
            switchDuration={1200}
          >
            {children}
          </TVScreen>
        </div>

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
                const nextVolume = Math.max(
                  0,
                  Math.min(100, volume + direction),
                );
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
              <image
                href="/tv-parts/power-knob.svg"
                width="100%"
                height="100%"
              />
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

      <div
        className={`${styles.mobileDirectContent} ${isGameStarted ? styles.mobileReveal : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
