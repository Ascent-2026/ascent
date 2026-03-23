import styles from "@/styles/about.module.css";
import { Footer } from "@/components/Footer";

const TEAM_MEMBERS = [
  { name: "Name of the Member" },
  { name: "Name of the Member" },
  { name: "Name of the Member" },
  { name: "Name of the Member" },
  { name: "Name of the Member" },
  { name: "Name of the Member" },
  { name: "Name of the Member" },
  { name: "Name of the Member" },
  { name: "Name of the Member" },
];

export function AboutChannel() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>About Us</h1>
        <div className={styles.body}>
          <p className={styles.paragraph}>
            <span className={styles.firstWord}>AScent</span> 2026 is where
            builders, dreamers, and problem-solvers gather to experiment with
            real ideas. Over three high-energy days, participants will step into
            a retro-futuristic arena designed for coding, design, robotics, and
            innovation-led collaboration.
          </p>
          <p className={styles.paragraph}>
            From hackathons and speaker sessions to challenge tracks and
            showcase rounds, the goal is simple: turn curiosity into prototypes
            and prototypes into momentum. Whether you are joining as a
            first-year learner or an experienced maker, AScent is built to push
            your skills forward while keeping the vibe fun, bold, and
            community-first.
          </p>
        </div>

        {/*<h2 className={styles.teamHeading}>Meet Our Team</h2>
        <div className={styles.teamSection}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionDot} />
            <p className={styles.sectionName}>Festival Council</p>
          </div>

          <div className={styles.memberGrid}>
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className={styles.memberCard}>
                <div className={styles.memberPhoto} />
                <div className={styles.memberName}>{member.name}</div>
              </div>
            ))}
          </div>
        </div>*/}
      </div>
      <Footer />
    </div>
  );
}
