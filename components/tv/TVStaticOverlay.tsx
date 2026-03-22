"use client";

import { useEffect, useRef } from "react";
import styles from "@/styles/tv.module.css";

interface TVStaticOverlayProps {
  switchKey?: number;
  duration?: number;
}

let sharedAudioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (sharedAudioCtx && sharedAudioCtx.state !== "closed") {
    return sharedAudioCtx;
  }
  try {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    sharedAudioCtx = new Ctor();
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

function playStaticSound(duration: number): () => void {
  const ctx = getAudioCtx();
  if (!ctx) return () => {};
  if (ctx.state === "suspended") ctx.resume();

  const durationSec = duration / 1000;
  const sampleRate = ctx.sampleRate;
  const bufferSize = Math.ceil(sampleRate * durationSec);

  const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer;

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2800;
  bp.Q.value = 0.6;

  const gain = ctx.createGain();
  const t = ctx.currentTime;
  const rampUp = durationSec * 0.08;
  const holdEnd = durationSec * 0.28;

  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.28, t + rampUp);
  gain.gain.setValueAtTime(0.28, t + holdEnd);
  gain.gain.linearRampToValueAtTime(0, t + durationSec);

  source.connect(bp);
  bp.connect(gain);
  gain.connect(ctx.destination);
  source.start(t);
  source.stop(t + durationSec);

  return () => {
    try {
      source.stop();
    } catch {}
  };
}

export function TVStaticOverlay({
  switchKey = 0,
  duration = 1200,
}: TVStaticOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const stopSound = useRef<() => void>(() => {});

  useEffect(() => {
    if (switchKey === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startRef.current = null;

    stopSound.current();
    stopSound.current = playStaticSound(duration);

    const rect = canvas.getBoundingClientRect();
    const scale = Math.min(window.devicePixelRatio || 1, 1.5);
    const W = Math.round(rect.width * scale);
    const H = Math.round(rect.height * scale);
    canvas.width = W;
    canvas.height = H;

    const pixelCount = W * H;
    const buf = new ArrayBuffer(pixelCount * 4);
    const pixels = new Uint8ClampedArray(buf);
    const buf32 = new Uint32Array(buf);

    const draw = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);

      const intensity =
        progress < 0.08
          ? progress / 0.08
          : progress < 0.28
            ? 1
            : 1 - (progress - 0.28) / 0.72;

      const alpha = Math.round(intensity * 255);
      for (let i = 0; i < pixelCount; i++) {
        const luma = (Math.random() * 255) | 0;
        buf32[i] = (alpha << 24) | (luma << 16) | (luma << 8) | luma;
      }
      ctx.putImageData(new ImageData(pixels, W, H), 0, 0);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        rafRef.current = null;
        startRef.current = null;
        ctx.clearRect(0, 0, W, H);
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [switchKey, duration]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.staticOverlay}
      aria-hidden="true"
    />
  );
}
