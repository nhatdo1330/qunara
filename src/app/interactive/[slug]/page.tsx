import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { InteractiveDetail } from "@/components/explore/collection-detail";
import { MobiusExperience } from "@/components/interactive/mobius-experience";
import { findInteractiveExploration } from "@/lib/explore-collections";
import { loadInteractiveDocument, loadInteractiveSources } from "@/lib/interactive-markdown";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const experience = findInteractiveExploration(params.slug);
  return experience ? { title: experience.title, description: experience.description } : {};
}

export default async function InteractivePage({ params }: Props) {
  const experience = findInteractiveExploration(params.slug);
  if (!experience) notFound();
  const locale = await getLocale();
  if (params.slug === "mobius") return <MobiusExperience en={loadInteractiveDocument("mobius","en")} vi={loadInteractiveDocument("mobius","vi")} sources={loadInteractiveSources("mobius")} initialLocale={locale === "vi" ? "vi" : "en"}/>;
  return <InteractiveDetail experience={experience} locale={locale}/>;
}
