'use client'

import { useChannel } from '@/hooks/useChannel'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'

export function TVControls() {
  const { nextChannel, prevChannel } = useChannel()
  useKeyboardNav(nextChannel, prevChannel)

  return (
    <div className="flex flex-col items-center gap-4 w-20 shrink-0 border border-neutral-600 rounded-lg p-3 bg-neutral-800">
      {/* Branding */}
      <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest text-center leading-tight">
        Retro<br />Vision
      </div>

      {/* Speaker grille */}
      <div className="flex flex-col gap-1 w-full px-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-px bg-neutral-600 w-full" />
        ))}
      </div>

      {/* Channel buttons */}
      <button
        onClick={nextChannel}
        className="w-10 h-10 rounded-full border-2 border-neutral-500 bg-neutral-700 text-neutral-300 text-[10px] font-mono hover:bg-neutral-600 active:scale-95 transition-all"
        title="Next channel (→)"
      >
        CH+
      </button>
      <button
        onClick={prevChannel}
        className="w-10 h-10 rounded-full border-2 border-neutral-500 bg-neutral-700 text-neutral-300 text-[10px] font-mono hover:bg-neutral-600 active:scale-95 transition-all"
        title="Prev channel (←)"
      >
        CH−
      </button>

      {/* Power indicator */}
      <div className="mt-auto flex flex-col items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-green-600" />
        <span className="text-[8px] font-mono text-neutral-600">PWR</span>
      </div>
    </div>
  )
}
