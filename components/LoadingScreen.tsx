"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { PRELOAD_ASSET_URLS, preloadAssets } from "@/lib/preloadAssets";

export default function LoadingScreen() {
  const { isLoaded, loadProgress, isGameStarted, startGame } = useGameStore();
  const [visible, setVisible] = useState(true);
  const [glitchText, setGlitchText] = useState("ASCENT");
  const [glitchComplete, setGlitchComplete] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
    const original = "ASCENT";
    let frame = 0;
    const interval = setInterval(() => {
      if (frame > 20) {
        setGlitchText("ASCENT");
        setGlitchComplete(true);
        clearInterval(interval);
        return;
      }
      setGlitchText(
        original
          .split("")
          .map((c) =>
            Math.random() < 0.3
              ? chars[Math.floor(Math.random() * chars.length)]
              : c,
          )
          .join(""),
      );
      frame += 1;
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await preloadAssets(PRELOAD_ASSET_URLS, (p) => {
        if (!cancelled) useGameStore.getState().setLoadProgress(p);
      });
      if (!cancelled) useGameStore.getState().setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !glitchComplete || isGameStarted || startedRef.current)
      return;
    startedRef.current = true;
    startGame();
  }, [isLoaded, glitchComplete, isGameStarted, startGame]);

  useEffect(() => {
    if (!isGameStarted) return;
    const t = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(t);
  }, [isGameStarted]);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen ${isGameStarted ? "fade-out" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#000008",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', monospace",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(0,212,255,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.07) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
          animation: "gridMove 4s linear infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, #000008 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          width: "100%",
          maxWidth: 600,
          padding: "0 32px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.4em",
            color: "#00D4FF",
            marginBottom: 24,
            opacity: 0.7,
            textTransform: "uppercase",
          }}
        >
          ◆ SCALER PRESENTS ◆
        </div>

        <div
          style={{
            fontSize: "clamp(72px, 14vw, 120px)",
            fontWeight: 900,
            letterSpacing: "0.1em",
            lineHeight: 1,
            marginBottom: 8,
            background: "linear-gradient(135deg, #fff 30%, #00D4FF 70%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
            filter: "drop-shadow(0 0 30px rgba(0,212,255,0.6))",
            fontFamily: "'Courier New', monospace",
            position: "relative",
          }}
        >
          {glitchText}
          <span
            style={{
              position: "absolute",
              inset: 0,
              color: "#7B2FFF",
              opacity: 0.4,
              transform: "translate(-3px, 1px)",
              WebkitTextFillColor: "#7B2FFF",
              animation: "glitch1 3s infinite",
            }}
          >
            {glitchText}
          </span>
          <span
            style={{
              position: "absolute",
              inset: 0,
              color: "#00D4FF",
              opacity: 0.3,
              transform: "translate(3px, -1px)",
              WebkitTextFillColor: "#00D4FF",
              animation: "glitch2 3s infinite",
            }}
          >
            {glitchText}
          </span>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              width: "100%",
              height: 2,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 1,
              marginBottom: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${loadProgress}%`,
                background: "linear-gradient(90deg, #7B2FFF, #00D4FF)",
                transition: "width 0.3s ease",
                boxShadow: "0 0 10px rgba(0,212,255,0.8)",
                borderRadius: 1,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            <span>
              {!isLoaded
                ? "LOADING WORLD"
                : !glitchComplete
                  ? "CALIBRATING"
                  : "READY"}
            </span>
            <span>{Math.round(loadProgress)}%</span>
          </div>
        </div>

        {!isLoaded && (
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            INITIALIZING...
          </div>
        )}
        {isLoaded && !glitchComplete && (
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            SYNCING INTERFACE...
          </div>
        )}
      </div>

      <style>{`
        @keyframes gridMove {
          from { background-position: 0 0, 0 0; }
          to { background-position: 0 60px, 60px 0; }
        }
        @keyframes glitch1 {
          0%,95%,100% { clip-path: none; transform: translate(-3px,1px); }
          96% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translate(-6px,1px); }
          97% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translate(3px,-1px); }
        }
        @keyframes glitch2 {
          0%,92%,100% { clip-path: none; transform: translate(3px,-1px); }
          93% { clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%); transform: translate(6px,2px); }
          94% { clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); transform: translate(-3px,-2px); }
        }
        .fade-out {
          animation: fadeOut 0.8s forwards;
        }
        @keyframes fadeOut {
          to { opacity: 0; pointer-events: none; }
        }
      `}</style>
    </div>
  );
}
