import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutReadingProgress } from "@/components/about/about-reading-progress";
import { CommunityInvitation } from "@/components/about/community-invitation";
import { FounderJourney } from "@/components/about/founder-journey";

export const metadata: Metadata = {
  title: "About",
  description: "The personal journey from a Vietnamese Buddhist childhood through technology, AI, and quantum curiosity that led to Qunara.",
};

export default function About() {
  return <div className="about-documentary" id="about-documentary">
    <AboutReadingProgress/>
    <AboutHero/>
    <FounderJourney/>
    <CommunityInvitation/>
  </div>;
}
