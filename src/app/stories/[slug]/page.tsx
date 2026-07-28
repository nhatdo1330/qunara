import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { StoryDetail } from "@/components/explore/collection-detail";
import { findStory } from "@/lib/explore-collections";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const story = findStory(params.slug);
  return story ? { title: story.title, description: story.description } : {};
}

export default async function StoryPage({ params }: Props) {
  const story = findStory(params.slug);
  if (!story) notFound();
  return <StoryDetail story={story} locale={await getLocale()}/>;
}
