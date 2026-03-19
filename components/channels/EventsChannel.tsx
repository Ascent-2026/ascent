import { Card } from './Shared/Card'
import { Grid } from './Shared/Grid'

const days = [
  {
    label: 'Day 1',
    events: [
      { title: 'Opening Ceremony', time: '2:00 PM' },
      { title: 'Opening Ceremony', time: '2:30 PM' },
      { title: 'Opening Ceremony', time: '3:00 PM' },
    ],
  },
]

export function EventsChannel() {
  return (
    <div className="p-6 text-neutral-300 font-mono overflow-y-auto h-full">
      <h1 className="text-lg font-bold tracking-[0.3em] uppercase text-center mb-6">
        Events
      </h1>

      {days.map(day => (
        <div key={day.label} className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-neutral-400" />
            <h2 className="text-sm font-bold">{day.label}</h2>
          </div>
          <Grid cols={3}>
            {day.events.map((ev, i) => (
              <Card key={i} title={ev.title}>
                <p className="text-[10px] text-neutral-500">{ev.time}</p>
                <div className="mt-2 text-[9px] text-neutral-600 border border-neutral-700 rounded px-2 py-0.5 inline-block">
                  UPCOMING
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  )
}
