import { TVScreen } from './TVScreen'
import { TVControls } from './TVControls'
import { ChannelIndicator } from './ChannelIndicator'
import { ChannelNavBar } from './ChannelNavBar'

export function TVFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl border-4 border-neutral-600 rounded-2xl bg-neutral-700 p-5 shadow-2xl">

        {/* Top header */}
        <div className="flex items-center justify-between px-2 mb-4">
          <span className="text-xs font-mono text-neutral-300 tracking-[0.3em]">◆ ASCENT 2026 ◆</span>
          <ChannelIndicator />
        </div>

        {/* Screen + side controls */}
        <div className="flex gap-4">
          <TVScreen>{children}</TVScreen>
          <TVControls />
        </div>

        {/* Channel nav bar */}
        <ChannelNavBar />
      </div>
    </div>
  )
}
