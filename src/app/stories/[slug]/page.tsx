import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { StoryDetail } from "@/components/explore/collection-detail";
import { BuddhaGiftStory } from "@/components/stories/buddha-gift-story";
import { findStory } from "@/lib/explore-collections";
import { loadBuddhaGiftStory, resolveBuddhaGiftLocale } from "@/lib/story-content";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const buddhaGiftLocale = resolveBuddhaGiftLocale(params.slug);
  if (buddhaGiftLocale) {
    const story = loadBuddhaGiftStory(buddhaGiftLocale);
    const isVietnamese = buddhaGiftLocale === "vi";
    const canonical = isVietnamese
      ? `/vi/cau-chuyen/${story.metadata.slug.vi}`
      : `/en/stories/${story.metadata.slug.en}`;
    const title = isVietnamese
      ? `${story.metadata.title.vi} | Câu chuyện Qunara`
      : `${story.metadata.title.en} | Qunara Stories`;
    return {
      title: { absolute: title },
      description: story.metadata.subtitle[buddhaGiftLocale],
      alternates: {
        canonical,
        languages: {
          en: `/en/stories/${story.metadata.slug.en}`,
          vi: `/vi/cau-chuyen/${story.metadata.slug.vi}`,
        },
      },
      openGraph: { title, description: story.metadata.subtitle[buddhaGiftLocale], type: "article", locale: isVietnamese ? "vi_VN" : "en_US", images: [story.metadata.image] },
      twitter: { card: "summary_large_image", title, description: story.metadata.subtitle[buddhaGiftLocale], images: [story.metadata.image] },
    };
  }
  const story = findStory(params.slug);
  return story ? { title: story.title, description: story.description } : {};
}

export default async function StoryPage({ params }: Props) {
  const requestedLocale = await getLocale();
  const buddhaGiftLocale = resolveBuddhaGiftLocale(params.slug);
  if (buddhaGiftLocale) {
    if (requestedLocale !== buddhaGiftLocale) notFound();
    return <BuddhaGiftStory story={loadBuddhaGiftStory(buddhaGiftLocale)}/>;
  }
  const story = findStory(params.slug);
  if (!story) notFound();
  return <StoryDetail story={story} locale={requestedLocale}/>;
}
