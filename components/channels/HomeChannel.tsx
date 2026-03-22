"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/homepage.module.css";
import { EventCard } from "@/components/ui/EventCard";
import { PoweredBox } from "@/components/ui/PoweredBox";
import { ContactCard } from "@/components/ui/ContactCard";

const CONTACT_MEMBERS = [
  {
    name: "Aarav Sharma",
    role: "Sponsorship & Partnerships",
    email: "aarav.sharma@ascent2026.in",
    accent: "orange" as const,
  },
  {
    name: "Ira Mehta",
    role: "Events & Operations",
    email: "ira.mehta@ascent2026.in",
    accent: "cyan" as const,
  },
  {
    name: "Dev Patel",
    role: "Media & Outreach",
    email: "dev.patel@ascent2026.in",
    accent: "pink" as const,
  },
];

export function HomeChannel() {
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 18,
    mins: 18,
    secs: 18,
  });

  useEffect(() => {
    const targetDate = new Date("2026-05-15T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topSection}>
        <div className={styles.leftStarsColumn}>
          <div className={styles.starGlow}>
            <Image
              src="/assets/star-small.png"
              alt="star"
              width={38}
              height={38}
            />
          </div>
          <div className={`${styles.starGlow} ${styles.star2}`}>
            <Image
              src="/assets/star-small.png"
              alt="star"
              width={34}
              height={34}
            />
          </div>
          <div className={`${styles.starGlow} ${styles.star3}`}>
            <Image
              src="/assets/star-small.png"
              alt="star"
              width={30}
              height={30}
            />
          </div>
          <div className={`${styles.starGlow} ${styles.star4}`}>
            <Image
              src="/assets/star-small.png"
              alt="star"
              width={26}
              height={26}
            />
          </div>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.dateSchedule}>MAY 15 - MAY 17</div>

          <div className={styles.heroSection}>
            <div className={styles.mainContent}>
              <div className={styles.headingSection}>
                <div className={styles.cloudLeft}>
                  <Image
                    src="/assets/cloud-singleNew.png"
                    alt="cloud"
                    width={300}
                    height={150}
                  />
                </div>

                <div className={styles.titleContainer}>
                  <div className={styles.mainTitle}>
                    <Image
                      src="/assets/MainLogo.png"
                      alt="ASCENT"
                      width={800}
                      height={200}
                      className={styles.logoImage}
                      priority
                    />
                  </div>
                  <h3 className={styles.subtitle}>CHANGE THE ORDINARY</h3>
                </div>

                <div className={styles.cloudRight}>
                  <div className={styles.decorativeStar}>
                    <Image
                      src="/assets/star-middle.png"
                      alt="star"
                      width={100}
                      height={100}
                    />
                  </div>

                  <Image
                    src="/assets/cloud-multiple.png"
                    alt="cloud"
                    width={300}
                    height={150}
                  />
                </div>
              </div>

              <div className={styles.countdownSection}>
                <div className={styles.countdownCloudLeft}>
                  <Image
                    src="/assets/cloud-singleNew.png"
                    alt="cloud"
                    width={150}
                    height={75}
                  />
                </div>

                <div className={styles.countdownContent}>
                  <h2 className={styles.countdownTitle}>
                    COUNTDOWN TO THE MAIN DAY
                  </h2>

                  <div className={styles.timerContainer}>
                    <div className={styles.timerWrapper}>
                      <div
                        className={`${styles.countdownBox} ${styles.countdownBoxType1}`}
                      >
                        <div className={styles.timerValue}>
                          {String(timeLeft.days).padStart(2, "0")}
                        </div>
                      </div>
                      <div className={styles.timerLabel}>DAYS</div>
                    </div>

                    <div className={styles.timerWrapper}>
                      <div
                        className={`${styles.countdownBox} ${styles.countdownBoxType2}`}
                      >
                        <div className={styles.timerValue}>
                          {String(timeLeft.hours).padStart(2, "0")}
                        </div>
                      </div>
                      <div className={styles.timerLabel}>HOURS</div>
                    </div>

                    <div className={styles.timerWrapper}>
                      <div
                        className={`${styles.countdownBox} ${styles.countdownBoxType1}`}
                      >
                        <div className={styles.timerValue}>
                          {String(timeLeft.mins).padStart(2, "0")}
                        </div>
                      </div>
                      <div className={styles.timerLabel}>MINS</div>
                    </div>

                    <div className={styles.timerWrapper}>
                      <div
                        className={`${styles.countdownBox} ${styles.countdownBoxType2}`}
                      >
                        <div className={styles.timerValue}>
                          {String(timeLeft.secs).padStart(2, "0")}
                        </div>
                      </div>
                      <div className={styles.timerLabel}>SECS</div>
                    </div>
                  </div>
                </div>

                <div className={styles.countdownCloudRight}>
                  <Image
                    src="/assets/cloud-singleNew.png"
                    alt="cloud"
                    width={150}
                    height={75}
                  />
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <button className={styles.registerButton}>Register Now</button>
              </div>
            </div>

            <div className={styles.rightStarsColumn}>
              <div className={styles.starGlow}>
                <Image
                  src="/assets/star-small.png"
                  alt="star"
                  width={38}
                  height={38}
                />
              </div>
              <div className={`${styles.starGlow} ${styles.star2}`}>
                <Image
                  src="/assets/star-small.png"
                  alt="star"
                  width={34}
                  height={34}
                />
              </div>
              <div className={`${styles.starGlow} ${styles.star3}`}>
                <Image
                  src="/assets/star-small.png"
                  alt="star"
                  width={30}
                  height={30}
                />
              </div>
              <div className={`${styles.starGlow} ${styles.star4}`}>
                <Image
                  src="/assets/star-small.png"
                  alt="star"
                  width={26}
                  height={26}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.transitionDivider} />

      <div className={styles.poweredBySection}>
        <h2 className={styles.poweredByHeading}>POWERED BY</h2>

        <div className={styles.logoBoxesContainer}>
          <PoweredBox />
          <PoweredBox />
          <PoweredBox />
          <PoweredBox />
          <PoweredBox />
        </div>
      </div>

      <div className={styles.eventsSection}>
        <h2 className={styles.eventsHeading}>EVENTS</h2>

        <div className={styles.eventListContainer}>
          <EventCard
            title="Opening Ceremony"
            day={1}
            time="10:00 AM"
            status="upcoming"
            dotColor="#FF6B6B"
          />
          <EventCard
            title="AI Showdown"
            day={1}
            time="2:00 PM"
            status="live"
            dotColor="#4ECDC4"
          />
          <EventCard
            title="Retro Game Jam"
            day={1}
            time="5:00 PM"
            status="past"
            dotColor="#FFE66D"
          />
          <EventCard
            title="Cyberpunk Fashion Show"
            day={2}
            time="1:00 PM"
            status="live"
            dotColor="#FF6B9D"
          />
          <EventCard
            title="Robot Dance-Off"
            day={2}
            time="4:00 PM"
            status="past"
            dotColor="#FF8C42"
          />
          <EventCard
            title="Closing Gala"
            day={3}
            time="7:00 PM"
            status="live"
            dotColor="#4ECDC4"
          />
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h2 className={styles.aboutHeading}>ABOUT US</h2>
        <p className={styles.aboutText}>
          AScent 2026 brings creators, coders, and innovators together for a
          high-energy three-day experience. From hands-on challenges to live
          showcases, the event is designed to help ideas move from concept to
          impact in a bold retro-futuristic setting.
        </p>
      </div>

      <div className={styles.contactSection}>
        <h2 className={styles.contactHeading}>CONTACT US</h2>
        <div className={styles.contactGrid}>
          {CONTACT_MEMBERS.map((member) => (
            <ContactCard
              key={member.email}
              name={member.name}
              role={member.role}
              email={member.email}
              accent={member.accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
