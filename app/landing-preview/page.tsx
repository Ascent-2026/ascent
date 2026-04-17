import { LandingIntro } from "@/components/landing/LandingIntro";
import { HeroCountdown } from "@/components/landing/HeroCountdown";
import { BiggestTechfest } from "@/components/landing/BiggestTechfest";
import { EventsSection } from "@/components/landing/EventsSection";

export default function LandingPreview() {
  return (
    <>
      <LandingIntro />
      <HeroCountdown />
      <BiggestTechfest />
      <EventsSection />
    </>
  );
}
