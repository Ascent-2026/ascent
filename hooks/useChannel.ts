'use client'

import { usePathname, useRouter } from 'next/navigation'
import { CHANNELS, type ChannelId } from '@/lib/constants'

export function useChannel() {
  const pathname = usePathname()
  const router = useRouter()

  const currentIndex = CHANNELS.findIndex(ch => pathname.startsWith(ch.href))
  const safeIndex = currentIndex === -1 ? 0 : currentIndex
  const currentChannel = CHANNELS[safeIndex]

  function switchChannel(id: ChannelId) {
    const channel = CHANNELS.find(ch => ch.id === id)
    if (channel) router.push(channel.href)
  }

  function nextChannel() {
    const next = CHANNELS[(safeIndex + 1) % CHANNELS.length]
    router.push(next.href)
  }

  function prevChannel() {
    const idx = (safeIndex - 1 + CHANNELS.length) % CHANNELS.length
    router.push(CHANNELS[idx].href)
  }

  return {
    currentChannel,
    currentIndex: safeIndex,
    switchChannel,
    nextChannel,
    prevChannel,
    channels: CHANNELS,
  }
}
