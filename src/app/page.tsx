import type { Metadata } from "next";
import { ArrowRight, Atom, BookOpen, Brain, Clock3, Headphones, MessageCircle, Sparkles } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { Artwork } from "@/components/art/artwork";
import { EvidenceBadge } from "@/components/evidence-badge";
import { defaultLocale, isLocale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";

const pillars = [
  { key: "science", icon: Atom, pathname: "/learn", hash: "quantum" },
  { key: "wisdom", icon: BookOpen, pathname: "/learn", hash: "buddhism" },
  { key: "practice", icon: Brain, pathname: "/practice" },
] as const;

async function resolveLocale() {
  const requestedLocale = await getLocale();
  return isLocale(requestedLocale) ? requestedLocale : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const t = await getTranslations({locale,namespace:"home.metadata"});

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", vi: "/vi" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
    },
  };
}

export default async function Home() {
  const locale = await resolveLocale();
  const t = await getTranslations({locale,namespace:"home"});

  return <div className="q-home"><section className="q-hero"><div className="q-hero-buddha"/><Artwork type="orbit" className="q-hero-art"/><div className="q-hero-wash"/><div className="q-shell q-hero-content"><p className="q-kicker">{t("hero.kicker")}</p><h1>{t("hero.titleLineOne")}<br/><em>{t("hero.titleLineTwo")}</em></h1><p className="q-hero-lead">{t("hero.lead")}</p><div className="q-hero-actions"><Link href="/learn" className="q-btn-primary">{t("hero.startLearning")} <ArrowRight/></Link><Link href="/explore" className="q-btn-secondary">{t("hero.exploreConnections")}</Link><Link href="/practice" className="q-text-link">{t("hero.practiceToday")} <Clock3/></Link></div></div><div className="q-hero-note"><span>Q</span><p>{t("hero.noteLineOne")}<br/>{t("hero.noteLineTwo")}</p></div></section>
  <section className="q-shell q-pillars"><div className="q-section-intro"><p className="q-kicker">{t("pillars.kicker")}</p><h2>{t("pillars.heading")}</h2></div><div className="q-pillar-grid">{pillars.map(({key,icon:Icon,...path},i)=><Link href={{pathname:path.pathname,hash:"hash" in path?path.hash:undefined}} className="q-pillar" key={key}><span>0{i+1}</span><Icon/><p>{t(`pillars.${key}.eyebrow`)}</p><h3>{t(`pillars.${key}.title`)}</h3><small>{t(`pillars.${key}.text`)}</small><b>{t("pillars.enterPath")} <ArrowRight/></b></Link>)}</div></section>
  <section className="q-feature"><div className="q-shell q-feature-grid"><div className="q-feature-art"><Artwork type="wave"/><span>{t("feature.artLabel")}</span></div><article><EvidenceBadge kind="Scientific evidence" label={t("evidence.scientific")}/><p className="q-kicker">{t("feature.kicker")}</p><h2>{t("feature.title")}</h2><p>{t("feature.description")}</p><Link href="/research">{t("feature.readGuide")} <ArrowRight/></Link></article></div></section>
  <section className="q-shell q-today"><div className="q-section-intro"><p className="q-kicker">{t("today.kicker")}</p><h2>{t("today.heading")}</h2></div><div className="q-today-grid"><article className="q-reflection"><Sparkles/><EvidenceBadge kind="Personal reflection" label={t("evidence.reflection")}/><blockquote>“{t("today.reflection.question")}”</blockquote><Link href={{pathname:"/practice",hash:"reflection"}}>{t("today.reflection.action")} <ArrowRight/></Link></article><article><MessageCircle/><p className="q-kicker">{t("today.discussion.kicker")}</p><h3>{t("today.discussion.title")}</h3><p>{t("today.discussion.description")}</p><Link href="/community">{t("today.discussion.action")} <ArrowRight/></Link></article><article><Headphones/><p className="q-kicker">{t("today.meditation.kicker")}</p><h3>{t("today.meditation.title")}</h3><p>{t("today.meditation.description")}</p><Link href="/practice">{t("today.meditation.action")} <ArrowRight/></Link></article></div></section></div>;
}
