import "server-only";

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const contentRoot = join(process.cwd(), "content");

export type StoryCard = {
  slug: string;
  category: "Personal Story" | "Historical Story" | "Community Story";
  title: string;
  description: string;
  readingTime: string;
  visual: string;
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

export function loadStories(): StoryCard[] {
  return loadCollection<StoryCard>("stories");
}

export function loadInteractiveExplorations(): InteractiveCard[] {
  return loadCollection<InteractiveCard>("interactive");
}

export function findStory(slug: string): StoryCard | undefined {
  return loadStories().find((story) => story.slug === slug);
}

export function findInteractiveExploration(slug: string): InteractiveCard | undefined {
  return loadInteractiveExplorations().find((experience) => experience.slug === slug);
}
