"use client";

import Link from "next/link";
import { Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-8 w-full border-t border-white/10 bg-black/40 px-4 py-4 text-xs text-white/70 backdrop-blur-md sm:px-8 sm:text-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold tracking-wide text-white/80">Ascent 2026</p>
          <p className="text-[11px] sm:text-xs">
            Contact:{" "}
            <a
              href="mailto:festcouncil_ascent@scaler.com"
              className="font-medium transition hover:text-cyan-300"
            >
              festcouncil_ascent@scaler.com
            </a>
          </p>
          <p className="text-[11px] sm:text-xs">
            Venue:{" "}
            <a
              href="https://www.google.com/maps/dir//Scaler+School+of+Technology,+14,+3rd+cross,+Parappana+Agrahar,+Electronic+City+Rd,+Electronic+City+Phase+I,+Electronic+City,+Bengaluru,+Karnataka+560100/@12.8462945,77.6650655,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae6d6ab07d151b:0xc0af49ccfc84871a!2m2!1d77.6646949!2d12.8386185?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="font-medium transition hover:text-cyan-300"
            >
              Scaler School Of Technology, Bangalore
            </a>
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

            <Link
              href="https://www.linkedin.com/in/ascent-sst-1981473b8/"
              aria-label="Visit us on LinkedIn"
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 transition hover:border-blue-400/60 hover:text-blue-300"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </Link>
          </div>

          <p className="text-[10px] text-white/40 sm:text-[11px]">
            © {new Date().getFullYear()} Ascent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
