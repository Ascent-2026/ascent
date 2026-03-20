"use client";

import { useEffect } from "react";

export function useKeyboardNav(onNext: () => void, onPrev: () => void) {
  useEffect(() => {
    function isTypingTarget(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target.isContentEditable
      );
    }

    function handleKey(e: KeyboardEvent) {
      if (isTypingTarget(e.target)) return;

      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        onNext();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        onPrev();
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onNext, onPrev]);
}
