"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/homepage.module.css";

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
        {/* Left Side: Vertical Stars Column */}
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

        {/* Right Side: Main Content */}
        <div className={styles.rightContent}>
          {/* Top: Date Schedule */}
          <div className={styles.dateSchedule}>MAY 15 - MAY 17</div>

          {/* Bottom: Main Hero Section */}
          <div className={styles.heroSection}>
            {/* Left: Main Center Content */}
            <div className={styles.mainContent}>
              {/* 1. Top Heading Section */}
              <div className={styles.headingSection}>
                {/* Left: Single Cloud */}
                <div className={styles.cloudLeft}>
                  <Image
                    src="/assets/cloud-singleNew.png"
                    alt="cloud"
                    width={300}
                    height={150}
                  />
                </div>

                {/* Center: Title & Subtitle */}
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

                {/* Right: Multiple Cloud */}
                <div className={styles.cloudRight}>
                  {/* Decorative Star */}
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

              {/* 2. Countdown Section */}
              <div className={styles.countdownSection}>
                {/* Left: Single Cloud */}
                <div className={styles.countdownCloudLeft}>
                  <Image
                    src="/assets/cloud-singleNew.png"
                    alt="cloud"
                    width={150}
                    height={75}
                  />
                </div>

                {/* Center: Countdown Content */}
                <div className={styles.countdownContent}>
                  <h2 className={styles.countdownTitle}>
                    COUNTDOWN TO THE MAIN DAY
                  </h2>

                  {/* Timer Boxes */}
                  <div className={styles.timerContainer}>
                    {/* Days */}
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

                    {/* Hours */}
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

                    {/* Mins */}
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

                    {/* Secs */}
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

                {/* Right: Single Cloud */}
                <div className={styles.countdownCloudRight}>
                  <Image
                    src="/assets/cloud-singleNew.png"
                    alt="cloud"
                    width={150}
                    height={75}
                  />
                </div>
              </div>

              {/* 3. Register Button */}
              <div className={styles.buttonContainer}>
                <button className={styles.registerButton}>Register Now</button>
              </div>
            </div>

            {/* Right: Vertical Stars Column (50% visible) */}
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
    </div>
  );
}
