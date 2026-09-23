<div align="center">

# Ascent 2026

**The public site for Ascent, a college techfest, built as a retro television you channel-surf.**

Five pages, but you do not navigate them like pages. You turn the dial, the screen cuts to static, and the next channel comes up.

[**ascent-blue-nine.vercel.app**](https://ascent-blue-nine.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black)
![Zustand](https://img.shields.io/badge/Zustand-433E38?style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## The channels

| Channel | |
|---|---|
| **Home** | The fest front page |
| **Events** | What is running, and when |
| **About Us** | Who puts it on |
| **Sponsors** | Who backs it |
| **Leaderboard** | Live standings |

Each one is a real route under `app/(channels)`, so every channel is linkable, shareable and server rendered. The television is the presentation layer, not a router replacement. Deep-link someone to the leaderboard and they land on it with the set already on.

---

## How the TV is put together

```
TVFrame            the cabinet, bezel and knobs
 └─ TVScreen       the viewport the channel renders into
     ├─ TVStaticOverlay    the noise burst during a channel change
     ├─ ChannelIndicator   the corner readout, like an old OSD
     └─ <Channel />        Home, Events, About, Sponsors or Leaderboard
TVControls         the knobs and buttons
ChannelNavBar      the flat nav that takes over on small screens
```

State lives in two Zustand stores, `channelStore` and `gameStore`, so the shell and the content do not have to know about each other.

---

## Details worth keeping

**It waits before it plays.** `LoadingGate` holds the first paint behind `preloadAssets` while `LoadingScreen` runs. A retro TV effect with half its textures missing looks broken rather than deliberate.

**Keyboard first.** `useKeyboardNav` maps arrows to channel changes, so the whole site is operable without touching the dial.

**It can be turned off.** `useReducedMotion` is respected throughout. Static bursts and GSAP transitions are the entire identity of the site, which is exactly why they need an off switch for anyone who asked their OS for one.

**Phones get a nav bar.** A television cabinet does not fit a phone screen, so below the breakpoint the frame gives way to `ChannelNavBar`.

---

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```
app/(channels)/   one route per channel
components/tv/    the television shell
components/channels/  the content of each channel
store/            channelStore, gameStore
hooks/            useChannel, useKeyboardNav
lib/              constants, asset preloading, reduced-motion, utils
```

---

<sub>Ascent 2026 is over, so the site is archived as it was on the day. The platform that ran the event itself, with QR check-in, admin tooling and the coins economy, is a separate codebase.</sub>
