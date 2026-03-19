'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CHANNELS } from '@/lib/constants'

export function ChannelNavBar() {
  const pathname = usePathname()
  return (
    <div className="flex items-center gap-1 mt-4 border-t border-neutral-600 pt-3 flex-wrap">
      <span className="text-[10px] font-mono text-neutral-600 mr-1">⟩</span>
      {CHANNELS.map(ch => (
        <Link
          key={ch.id}
          href={ch.href}
          className={`text-[11px] font-mono px-3 py-1 rounded transition-colors ${
            pathname.startsWith(ch.href)
              ? 'bg-neutral-500 text-white'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-600'
          }`}
        >
          {ch.label}
        </Link>
      ))}
    </div>
  )
}
