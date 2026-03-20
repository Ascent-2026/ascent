import { Card } from './Shared/Card'
import { Grid } from './Shared/Grid'

const ALL_EVENTS = [
  // DAY 0
  { day: "Day 0", time: "9:00 AM onwards", title: "Hackathon Kickoff & Start", location: "2nd Floor Classrooms" },
  
  // DAY 1
  { day: "Day 1", time: "10:00 AM - 11:30 AM", title: "Inaugural Ceremony", location: "Classroom C (GF)" },
  { day: "Day 1", time: "11:00 AM - 2:00 PM", title: "Judging & Wrap-Up (Hackathon)", location: "Complete 2nd Floor + 2nd Classroom" },
  { day: "Day 1", time: "11:30 AM - 12:30 PM", title: "Tech Talk (1)", location: "Classroom C (GF)" },
  { day: "Day 1", time: "12:00 PM - 6:00 PM", title: "Robotics Event(Break it 4 events)", location: "Turf + Volleyball Court" },
  { day: "Day 1", time: "1:00 PM - 5:00 PM", title: "LaunchPad", location: "SSB Classroom" },
  { day: "Day 1", time: "2:00 PM - 4:00 PM", title: "Re-Thesis", location: "Classroom 1B" },
  { day: "Day 1", time: "2:00 PM - 5:00 PM", title: "Solo Sprint", location: "Classroom 1A" },
  { day: "Day 1", time: "6:00 PM - 7:00 PM", title: "Tech Quiz", location: "Open Area near Stairs" },
  { day: "Day 1", time: "TBD", title: "Tech Hunt", location: "Entire Campus" },

  // DAY 2
  { day: "Day 2", time: "9:00 AM - 7:00 PM", title: "Ship-It Sprint", location: "Pitch: SSB / Build: GF-C" },
  { day: "Day 2", time: "10:00 AM - 4:00 PM", title: "AI Buildathon", location: "Classroom 2C" },
  { day: "Day 2", time: "10:00 AM - 8:00 PM", title: "Kaggle Competition", location: "Classroom B, 1st Floor" },
  { day: "Day 2", time: "10:00 AM - 3:00 PM", title: "Algo Sprint", location: "Classroom 1A" },
  { day: "Day 2", time: "1:00 PM - 4:00 PM", title: "CTF (Capture the Flag)", location: "2nd Floor B1" },
  { day: "Day 2", time: "4:00 PM - 5:00 PM", title: "Talk Show (2)", location: "SSB Classroom / 2A" },
  { day: "Day 2", time: "5:00 PM - 6:30 PM", title: "Closing Ceremony", location: "2A" },
  { day: "Day 2", time: "TBD", title: "Event X", location: "TBD" },
]

export function EventsChannel() {
  return (
    <div className="p-6 text-neutral-300 font-mono overflow-y-auto h-full scrollbar-hide">
      <h1 className="text-lg font-bold tracking-[0.3em] uppercase text-center mb-8 text-cyan-400">
        Events Schedule
      </h1>

      {/* SECTION: DAY 0 */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-neutral-600 shadow-[0_0_8px_#525252]" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Day 0 — 15 May</h2>
        </div>
        <Grid cols={3}>
          {ALL_EVENTS.filter(e => e.day === "Day 0").map((ev, i) => (
            <Card key={i} title={ev.title} className="hover:border-neutral-500 transition-colors">
              <p className="text-[10px] text-neutral-400 font-bold">{ev.time}</p>
              <p className="text-[9px] text-neutral-600 italic">@{ev.location}</p>
              <div className="mt-2 text-[9px] text-neutral-500 border border-neutral-800 rounded px-2 py-0.5 inline-block bg-neutral-950">
                UPCOMING
              </div>
            </Card>
          ))}
        </Grid>
      </div>
    
      {/* SECTION: DAY 1 */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-neutral-600 shadow-[0_0_8px_#06b6d4]" />
          <h2 className="text-sm font-bold uppercase tracking-widest">Day 1 — 16 May</h2>
        </div>
        <Grid cols={3}>
          {ALL_EVENTS.filter(e => e.day === "Day 1").map((ev, i) => (
            <Card key={i} title={ev.title} className="hover:border-neutral-500 transition-colors">
              <p className="text-[10px] text-neutral-500">{ev.time}</p>
              <p className="text-[9px] text-neutral-600 italic">@{ev.location}</p>
              <div className="mt-2 text-[9px] text-neutral-500 border border-neutral-800 rounded px-2 py-0.5 inline-block bg-neutral-950">
                UPCOMING
              </div>
            </Card>
          ))}
        </Grid>
      </div>

      {/* SECTION: DAY 2 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-neutral-600 shadow-[0_0_8px_#525252]" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Day 2 — 17 May</h2>
        </div>
        <Grid cols={3}>
          {ALL_EVENTS.filter(e => e.day === "Day 2").map((ev, i) => (
            <Card key={i} title={ev.title} className="hover:border-neutral-500 transition-colors">
              <p className="text-[10px] text-neutral-500">{ev.time}</p>
              <p className="text-[9px] text-neutral-600 italic">@{ev.location}</p>
              <div className="mt-2 text-[9px] text-neutral-500 border border-neutral-800 rounded px-2 py-0.5 inline-block bg-neutral-950">
                UPCOMING
              </div>
            </Card>
          ))}
        </Grid>
      </div>
    </div>
  )
}