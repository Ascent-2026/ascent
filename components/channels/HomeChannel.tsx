"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/homepage.module.css";
import { EventCard } from "@/components/ui/EventCard";
import { PoweredBox } from "@/components/ui/PoweredBox";
import { ContactCard } from "@/components/ui/ContactCard";
import { Footer } from "@/components/Footer";

const CONTACT_MEMBERS = [
  {
    name: "Sayed Zahur Zaidi",
    role: "Events",
    email: "events_ascent@scaler.com",
    phone: "+91 88107 49211",
    accent: "orange" as const,
  },
  {
    name: "Srinidhi Naren",
    role: "Hospitality",
    email: "hospitality_ascent@scaler.com",
    phone: "+91 89047 02009",
    accent: "cyan" as const,
  },
  {
    name: "Hardik Jumnani",
    role: "Sponsorships",
    email: "partnerships_ascent@scaler.com",
    phone: "+91 99071 22212",
    accent: "pink" as const,
  },
  {
    name: "Priyam Ghosh",
    role: "PR & Marketing",
    email: "prm_ascent@scaler.com",
    phone: "+91 82605 17343",
    accent: "purple" as const,

  }
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
                  <p className={styles.presenterText}>
                    SCALER SCHOOL OF TECHNOLOGY PRESENTS
                  </p>
                  <div className={styles.mainTitle}>
                    <Image
                      src="/assets/MainLogo2.svg"
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

      <div className={styles.aboutSection}>
        <h2 className={styles.aboutHeading}>ABOUT US</h2>
        <p className={styles.aboutText}>
          Ascent 2026 brings creators, coders, and innovators together for a
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
              phone={member.phone}
              accent={member.accent}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
