'use client'

import { useChannel } from '@/hooks/useChannel'

export function ChannelIndicator() {
  const { currentChannel, currentIndex } = useChannel()
  return (
    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
      CH {String(currentIndex + 1).padStart(2, '0')} — {currentChannel.label}
    </span>
  )
}
