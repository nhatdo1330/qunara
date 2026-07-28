import "server-only";

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const contentRoot = join(process.cwd(), "content");

export type StoryCard = {
  slug: string;
  category: string;
  title: string;
  description: string;
  readingTime: string;
  visual: string;
  image?: string;
};

export type InteractiveCard = {
  slug: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  explorationTime: string;
  visual: string;
};

function loadCollection<T>(directory: "stories" | "interactive"): T[] {
  const path = join(contentRoot, directory);
  return readdirSync(path)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => JSON.parse(readFileSync(join(path, file), "utf8")) as T);
}

export function loadStories(locale: "en" | "vi" = "en"): StoryCard[] {
  const stories = loadCollection<StoryCard>("stories");
  const storyRoot = join(contentRoot, "stories");
  type RankedStory = StoryCard & { featured: boolean };
  const nested = readdirSync(storyRoot)
    .filter((entry) => statSync(join(storyRoot, entry)).isDirectory())
    .map((entry) => {
      const metadataPath = join(storyRoot, entry, "metadata.json");
      try {
        const metadata = JSON.parse(readFileSync(metadataPath, "utf8")) as {
          title: Record<"en" | "vi", string>;
          subtitle: Record<"en" | "vi", string>;
          slug: Record<"en" | "vi", string>;
          readingTime: Record<"en" | "vi", string>;
          image: string;
          featured?: boolean;
          published?: boolean;
        };
        if (metadata.published === false) return null;
        const story: RankedStory = {
          slug: metadata.slug[locale],
          category: locale === "vi" ? "Câu chuyện cá nhân" : "Personal Story",
          title: metadata.title[locale],
          description: metadata.subtitle[locale],
          readingTime: metadata.readingTime[locale],
          visual: "journey",
          image: metadata.image,
          featured: metadata.featured ?? false,
        };
        return story;
      } catch {
        return null;
      }
    })
    .filter((story): story is RankedStory => story !== null)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .map((story): StoryCard => ({
      slug: story.slug,
      category: story.category,
      title: story.title,
      description: story.description,
      readingTime: story.readingTime,
      visual: story.visual,
      image: story.image,
    }));
  return [...nested, ...stories];
}

export function loadInteractiveExplorations(): InteractiveCard[] {
  return loadCollection<InteractiveCard>("interactive");
}

export function findStory(slug: string): StoryCard | undefined {
  return [...loadStories("en"), ...loadStories("vi")].find((story) => story.slug === slug);
}

export function findInteractiveExploration(slug: string): InteractiveCard | undefined {
  return loadInteractiveExplorations().find((experience) => experience.slug === slug);
}
