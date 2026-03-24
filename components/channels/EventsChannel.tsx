import { Card } from './Shared/Card'
import { Grid } from './Shared/Grid'
import styles from '@/styles/channelTheme.module.css'

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
    <div className={`${styles.channelRoot} ${styles.eventsRoot}`}>
      <div className={styles.channelInner}>
        <h1 className={`${styles.channelHeading} ${styles.eventsHeading}`}>Events Schedule</h1>

        {/* SECTION: DAY 0 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionDot} />
            <h2 className={styles.sectionTitle}>Day 0 — 15 May</h2>
          </div>
          <Grid cols={3}>
            {ALL_EVENTS.filter((e) => e.day === "Day 0").map((ev, i) => (
              <Card key={i} title={ev.title} className={styles.eventCard}>
                <p className={styles.eventTime}>{ev.time}</p>
                {/* <p className={styles.eventLocation}>@{ev.location}</p> */}
                <div className={styles.eventBadge}>Upcoming</div>
              </Card>
            ))}
          </Grid>
        </div>

        {/* SECTION: DAY 1 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionDot} />
            <h2 className={styles.sectionTitle}>Day 1 — 16 May</h2>
          </div>
          <Grid cols={3}>
            {ALL_EVENTS.filter((e) => e.day === "Day 1").map((ev, i) => (
              <Card key={i} title={ev.title} className={styles.eventCard}>
                <p className={styles.eventTime}>{ev.time}</p>
                {/* <p className={styles.eventLocation}>@{ev.location}</p> */}
                <div className={styles.eventBadge}>Upcoming</div>
              </Card>
            ))}
          </Grid>
        </div>

        {/* SECTION: DAY 2 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionDot} />
            <h2 className={styles.sectionTitle}>Day 2 — 17 May</h2>
          </div>
          <Grid cols={3}>
            {ALL_EVENTS.filter((e) => e.day === "Day 2").map((ev, i) => (
              <Card key={i} title={ev.title} className={styles.eventCard}>
                <p className={styles.eventTime}>{ev.time}</p>
                {/* <p className={styles.eventLocation}>@{ev.location}</p> */}
                <div className={styles.eventBadge}>Upcoming</div>
              </Card>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  )
}
