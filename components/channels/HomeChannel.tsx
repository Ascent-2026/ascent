export function HomeChannel() {
  return (
    <div className="p-8 flex flex-col items-center justify-center h-full text-neutral-300 font-mono min-h-80">
      <h1 className="text-5xl font-bold tracking-widest mb-1">ASCENT</h1>
      <p className="text-xs text-neutral-500 tracking-[0.4em] uppercase mb-10">
        Change the Ordinary
      </p>

      {/* Countdown */}
      <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-3">
        Countdown to the Main Day
      </p>
      <div className="flex gap-3 mb-10">
        {[['18', 'DAYS'], ['18', 'HRS'], ['18', 'MIN'], ['18', 'SEC']].map(([val, unit]) => (
          <div key={unit} className="border border-neutral-700 rounded px-4 py-3 text-center">
            <div className="text-2xl font-bold">{val}</div>
            <div className="text-[9px] text-neutral-500 mt-1">{unit}</div>
          </div>
        ))}
      </div>

      <button className="border border-neutral-500 rounded px-8 py-2 text-sm font-mono hover:bg-neutral-800 transition-colors">
        Register Now
      </button>
    </div>
  )
}
