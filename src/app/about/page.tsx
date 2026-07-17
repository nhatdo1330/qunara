import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { AboutHero } from "@/components/about/about-hero";
import { AboutReadingProgress } from "@/components/about/about-reading-progress";
import { CommunityInvitation } from "@/components/about/community-invitation";
import { FounderJourney } from "@/components/about/founder-journey";

import { defaultLocale, isLocale } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const requestedLocale = await getLocale();
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = await getTranslations({ locale, namespace: "about.metadata" });
  return {
    title: t("title"), description: t("description"),
    alternates: { canonical: locale === "vi" ? "/vi/gioi-thieu" : "/en/about", languages: { en: "/en/about", vi: "/vi/gioi-thieu" } },
    openGraph: { title: t("title"), description: t("description"), locale: locale === "vi" ? "vi_VN" : "en_US", type: "website" }
  };
}

export default function About() {
  return <div className="about-documentary" id="about-documentary">
    <AboutReadingProgress/>
    <AboutHero/>
    <FounderJourney/>
    <CommunityInvitation/>
  </div>;
}
