import styles from '@/styles/channelTheme.module.css'

export function AboutChannel() {
  return (
    <div className={styles.channelRoot}>
      <div className={styles.channelInner}>
        <h1 className={`${styles.channelHeading} ${styles.aboutHeading}`}>
        About Us
        </h1>

        <div className={styles.aboutBody}>
          <div className={styles.aboutCard}>
            <p className={styles.aboutParagraph}>
              AScent 2026 is where builders, dreamers, and problem-solvers gather to experiment with
              real ideas. Over three high-energy days, participants will step into a retro-futuristic
              arena designed for coding, design, robotics, and innovation-led collaboration.
            </p>
          </div>

          <div className={styles.aboutCard}>
            <p className={styles.aboutParagraph}>
              From hackathons and speaker sessions to challenge tracks and showcase rounds, the goal
              is simple: turn curiosity into prototypes and prototypes into momentum. Whether you are
              joining as a first-year learner or an experienced maker, AScent is built to push your
              skills forward while keeping the vibe fun, bold, and community-first.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
