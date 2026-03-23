"use client";

import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-8 w-full border-t border-white/10 bg-black/40 px-4 py-4 text-xs text-white/70 backdrop-blur-md sm:px-8 sm:text-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold tracking-wide text-white/80">AScent 2026</p>
          <p className="text-[11px] sm:text-xs">
            Contact: <span className="font-medium">ascent@christuniversity.in</span>
          </p>
          <p className="text-[11px] sm:text-xs">
            Venue: Scaler School Of Technology, Bangalore
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex items-center gap-4">
            <Link
              href="https://instagram.com/ascent.sst/"
              aria-label="Visit us on Instagram"
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 transition hover:border-pink-400/60 hover:text-pink-300"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>Instagram</span>
            </Link>

            <Link
              href="https://x.com/ascent_sst/"
              aria-label="Visit us on X"
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 transition hover:border-cyan-400/60 hover:text-cyan-300"
              target="_blank"
              rel="noreferrer"
            >
              <Twitter className="h-3.5 w-3.5" />
              <span>X</span>
            </Link>
          </div>

          <p className="text-[10px] text-white/40 sm:text-[11px]">
            © {new Date().getFullYear()} AScent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
