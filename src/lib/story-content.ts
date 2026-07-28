import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

export type StoryLocale = "en" | "vi";

export type StoryMetadata = {
  id: string;
  type: string;
  author: string;
  title: Record<StoryLocale, string>;
  subtitle: Record<StoryLocale, string>;
  slug: Record<StoryLocale, string>;
  image: string;
  readingTime: Record<StoryLocale, string>;
  featured: boolean;
  published: boolean;
  editorialStatus: string;
};

export type StorySources = {
  sourceType: string;
  author: string;
  imageOwnership: string;
  editorialNotes: string[];
};

export type StoryBlock =
  | { type: "opening"; text: string }
  | { type: "paragraph"; text: string };

export type StoryDocument = {
  metadata: StoryMetadata;
  sources: StorySources;
  locale: StoryLocale;
  frontmatter: Record<string, string>;
  title: string;
  blocks: StoryBlock[];
};

const storyRoot = join(process.cwd(), "content", "stories", "buddha-gift");

export function loadBuddhaGiftStory(locale: StoryLocale): StoryDocument {
  const metadata = JSON.parse(readFileSync(join(storyRoot, "metadata.json"), "utf8")) as StoryMetadata;
  const sources = JSON.parse(readFileSync(join(storyRoot, "sources.json"), "utf8")) as StorySources;
  const raw = readFileSync(join(storyRoot, `${locale}.md`), "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);
  const lines = body.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const headingIndex = lines.findIndex((line) => line.startsWith("# "));
  const title = headingIndex >= 0 ? lines[headingIndex].slice(2).trim() : metadata.title[locale];
  const contentLines = headingIndex >= 0 ? lines.slice(headingIndex + 1) : lines;
  const blocks = contentLines.map<StoryBlock>((line) => {
    if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      return { type: "opening", text: line.slice(1, -1) };
    }
    return { type: "paragraph", text: line };
  });

  return { metadata, sources, locale, frontmatter, title, blocks };
}

export function resolveBuddhaGiftLocale(slug: string): StoryLocale | null {
  const metadata = JSON.parse(readFileSync(join(storyRoot, "metadata.json"), "utf8")) as StoryMetadata;
  if (slug === metadata.slug.en) return "en";
  if (slug === metadata.slug.vi) return "vi";
  return null;
}

function splitFrontmatter(source: string) {
  if (!source.startsWith("---")) return { frontmatter: {}, body: source };
  const closing = source.indexOf("---", 3);
  if (closing < 0) return { frontmatter: {}, body: source };
  const frontmatter: Record<string, string> = {};
  source.slice(3, closing).split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(":");
    if (separator < 0) return;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key) frontmatter[key] = value;
  });
  return { frontmatter, body: source.slice(closing + 3).trim() };
}
