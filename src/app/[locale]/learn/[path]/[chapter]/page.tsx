import type {Metadata} from "next";
import {notFound} from "next/navigation";

import {VietnameseChapterPage} from "@/components/learn/vietnamese-chapter-page";
import {allChapters, getChapter} from "@/lib/learn-content";
import {
  getVietnameseChapter,
  vietnameseBuddhismChapters,
  vietnameseQuantumChapters,
} from "@/lib/learn-localized-content";

import EnglishChapterPage from "../../../../learn/[path]/[chapter]/page";

type Params = {locale: string; path: string; chapter: string};

export function generateStaticParams() {
  const english = allChapters.map((chapter) => ({
    locale: "en",
    path: chapter.path,
    chapter: chapter.slug,
  }));
  const vietnamese = [...vietnameseQuantumChapters, ...vietnameseBuddhismChapters].map(
    (chapter) => ({
      locale: "vi",
      path: chapter.path === "quantum" ? "vat-ly-luong-tu" : "phat-hoc",
      chapter: chapter.slug,
    }),
  );
  return [...english, ...vietnamese];
}

export function generateMetadata({params}: {params: Params}): Metadata {
  if (params.locale === "vi") {
    const chapter = getVietnameseChapter(params.path, params.chapter);
    if (!chapter) return {title: "Bài học"};
    const vietnamesePath = chapter.path === "quantum" ? "vat-ly-luong-tu" : "phat-hoc";
    return {
      title: chapter.title,
      description: chapter.subtitle,
      keywords: chapter.topics,
      alternates: {
        canonical: `/vi/hoc/${vietnamesePath}/${chapter.slug}`,
        languages: {
          en: `/en/learn/${chapter.path}/${chapter.englishSlug}`,
          vi: `/vi/hoc/${vietnamesePath}/${chapter.slug}`,
        },
      },
      openGraph: {title: chapter.title, description: chapter.subtitle, locale: "vi_VN"},
      twitter: {card: "summary_large_image", title: chapter.title, description: chapter.subtitle},
    };
  }
  const chapter = getChapter(params.path, params.chapter);
  return chapter ? {title: chapter.title, description: chapter.subtitle} : {title: "Chapter"};
}

export default function LocalizedChapter({params}: {params: Params}) {
  if (params.locale === "en") {
    return <EnglishChapterPage params={{path: params.path, chapter: params.chapter}} />;
  }
  const chapter = getVietnameseChapter(params.path, params.chapter);
  if (!chapter) notFound();
  const chapters = chapter.path === "quantum" ? vietnameseQuantumChapters : vietnameseBuddhismChapters;
  return <VietnameseChapterPage chapter={chapter} chapters={chapters} />;
}
