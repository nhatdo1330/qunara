import "server-only";

import { readdirSync, readFileSync, statSync } from "node:fs";
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

const storiesRoot = join(process.cwd(), "content", "stories");

type StoryMatch = { id: string; locale: StoryLocale };

export function loadEditorialStory(id: string, locale: StoryLocale): StoryDocument {
  const storyRoot = join(storiesRoot, id);
  const metadata = JSON.parse(readFileSync(join(storyRoot, "metadata.json"), "utf8")) as StoryMetadata;
  const sources = JSON.parse(readFileSync(join(storyRoot, "sources.json"), "utf8")) as StorySources;
  const raw = readFileSync(join(storyRoot, `${locale}.md`), "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);
  const parsed = parseStoryBody(body, metadata.title[locale]);

  return { metadata, sources, locale, frontmatter, title: parsed.title, blocks: parsed.blocks };
}

export function resolveEditorialStory(slug: string): StoryMatch | null {
  for (const id of editorialStoryIds()) {
    const metadata = JSON.parse(readFileSync(join(storiesRoot, id, "metadata.json"), "utf8")) as StoryMetadata;
    if (slug === metadata.slug.en) return { id, locale: "en" };
    if (slug === metadata.slug.vi) return { id, locale: "vi" };
  }
  return null;
}

function editorialStoryIds(): string[] {
  return readdirSync(storiesRoot).filter((entry) => {
    const directory = join(storiesRoot, entry);
    return statSync(directory).isDirectory()
      && ["metadata.json", "sources.json", "en.md", "vi.md"].every((file) => {
        try { return statSync(join(directory, file)).isFile(); } catch { return false; }
      });
  });
}

export function loadBuddhaGiftStory(locale: StoryLocale): StoryDocument {
  return loadEditorialStory("buddha-gift", locale);
}

export function resolveBuddhaGiftLocale(slug: string): StoryLocale | null {
  const match = resolveEditorialStory(slug);
  return match?.id === "buddha-gift" ? match.locale : null;
}

function parseStoryBody(body: string, fallbackTitle: string): { title: string; blocks: StoryBlock[] } {
  const lines = body.split(/\r?\n/).map((line) => line.trim());
  const headings = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => line.startsWith("# ") && line !== "# Title");
  const heading = headings.at(-1);
  const start = heading ? heading.index + 1 : 0;
  const endMarker = lines.findIndex((line, index) => index >= start && line === "---");
  const contentLines = lines.slice(start, endMarker >= 0 ? endMarker : undefined).filter(Boolean);
  const blocks = contentLines
    .filter((line) => !line.startsWith("## "))
    .map<StoryBlock>((line) => {
      if (line.startsWith("> *") && line.endsWith("*")) {
        return { type: "opening", text: line.slice(3, -1) };
      }
      if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
        return { type: "opening", text: line.slice(1, -1) };
      }
      return { type: "paragraph", text: line.replace(/^\*\*(.*)\*\*$/, "$1") };
    });
  return { title: heading?.line.slice(2).trim() ?? fallbackTitle, blocks };
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
