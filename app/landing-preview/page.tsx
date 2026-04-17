import { LandingIntro } from "@/components/landing/LandingIntro";
import { HeroCountdown } from "@/components/landing/HeroCountdown";
import { BiggestTechfest } from "@/components/landing/BiggestTechfest";
import { EventsSection } from "@/components/landing/EventsSection";
import { RegisterSection } from "@/components/landing/RegisterSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { PartnersSection } from "@/components/landing/PartnersSection";

export default function LandingPreview() {
  return (
    <>
      <LandingIntro />
      <HeroCountdown />
      <BiggestTechfest />
      <EventsSection />
      <RegisterSection />
      <AboutSection />
      <PartnersSection />
    </>
  );
}
