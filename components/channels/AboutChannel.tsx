import styles from "@/styles/about.module.css";
import { Footer } from "@/components/Footer";
import Image from "next/image";

const TEAM_MEMBERS = [
  { name: "Divijaa Arjun", role: "Creatives", photo: "/assets/team/Divija.jpg", objectPosition: "top" },
  { name: "Eshita Yalawatti", role: "Ops and Logs", photo: "/assets/team/Eshita.JPG", objectPosition: "center" },
  { name: "Hardik Jumnani", role: "Sponsorships", photo: "/assets/team/Hardik.jpg", objectPosition: "top" },
  { name: "Priyam Ghosh", role: "PR and Marketing", photo: "/assets/team/Priyam.jpg", objectPosition: "center" },
  { name: "Srinidhi Narendran", role: "Hospitality", photo: "/assets/team/Srinidhi.png", objectPosition: "center" },
  { name: "Krish Jaiswal", role: "Security and Strategy", photo: "/assets/team/Venky.png", objectPosition: "center" },
  { name: "Vibhu Khullar", role: "Finance", photo: "/assets/team/Vibhu.png", objectPosition: "top" },
  { name: "Sauhard Gupta", role: "Technicals", photo: "/assets/team/Sauhard.jpg", objectPosition: "center" },
];

export function AboutChannel() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>About Us</h1>
        <div className={styles.body}>
          <p className={styles.paragraph}>
            <span className={styles.firstWord}>Ascent</span> 2026 is where
            builders, dreamers, and problem-solvers gather to experiment with
            real ideas. Over three high-energy days, participants will step into
            a retro-futuristic arena designed for coding, design, robotics, and
            innovation-led collaboration.
          </p>
          <p className={styles.paragraph}>
            From hackathons and speaker sessions to challenge tracks and
            showcase rounds, the goal is simple: turn curiosity into prototypes
            and prototypes into momentum. Whether you are joining as a
            first-year learner or an experienced maker, Ascent is built to push
            your skills forward while keeping the vibe fun, bold, and
            community-first.
          </p>
        </div>

        <h2 className={styles.teamHeading}>Meet Our Team</h2>
        <div className={styles.teamSection}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionDot} />
            <p className={styles.sectionName}>Festival Council</p>
          </div>

          <div className={styles.memberGrid}>
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className={styles.memberCard}>
                <div className={styles.memberPhoto}>
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 200px"
                      style={{ objectFit: "cover", objectPosition: member.objectPosition, borderRadius: "inherit" }}
                    />
                  ) : null}
                </div>
                <div className={styles.memberName}>{member.name}</div>
                <div className={styles.memberRole}>{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
