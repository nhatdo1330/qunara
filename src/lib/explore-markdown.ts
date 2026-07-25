import "server-only";

import {readFileSync} from "node:fs";
import {join} from "node:path";

export type MarkdownBlock =
  | {type: "paragraph"; text: string}
  | {type: "list"; items: string[]}
  | {type: "quote"; text: string}
  | {type: "heading"; level: number; text: string};

export type MarkdownSection = {title: string; blocks: MarkdownBlock[]};

export type ExploreMarkdown = {
  metadata: Record<string, string>;
  title: string;
  sections: MarkdownSection[];
};

export type ExploreSource = {
  type: string;
  title: string;
  organization?: string;
  status: string;
  href?: string;
};

const contentRoot = join(process.cwd(), "content", "explore");

export function loadExploreMarkdown(investigation: string, locale: "en" | "vi"): ExploreMarkdown {
  const source = readFileSync(join(contentRoot, investigation, `${locale}.md`), "utf8");
  const cleanSource = source.replace(/^\s*<!--[^]*?-->\s*/, "");
  const hasFrontmatter = cleanSource.startsWith("---\n") || cleanSource.startsWith("---\r\n");
  const frontmatterEnd = hasFrontmatter ? cleanSource.indexOf("---", 3) : -1;
  const metadata = loadExploreMetadata(investigation);

  if (hasFrontmatter && frontmatterEnd > 0) {
    cleanSource.slice(3, frontmatterEnd).split("\n").forEach((line) => {
      const separator = line.indexOf(":");
      if (separator < 0) return;
      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
      if (key) metadata[key] = value;
    });
  }

  const body = (hasFrontmatter ? cleanSource.slice(frontmatterEnd + 3) : cleanSource).trim();
  const rawSections = body.split(/^# /gm).filter(Boolean);
  const parsed = rawSections.map((raw) => {
    const [heading, ...lines] = raw.trim().split("\n");
    return {title: heading.trim(), blocks: parseBlocks(lines)};
  });
  const [opening, ...sections] = parsed;

  return {
    metadata,
    title: opening?.title ?? metadata.title ?? "",
    sections: [opening, ...sections].filter(Boolean) as MarkdownSection[],
  };
}

export function loadExploreMetadata(investigation: string): Record<string, string> {
  return JSON.parse(readFileSync(join(contentRoot, investigation, "metadata.json"), "utf8")) as Record<string, string>;
}

export function loadExploreSources(investigation: string): ExploreSource[] {
  const source = readFileSync(join(contentRoot, investigation, "sources.json"), "utf8").trim();
  return source ? JSON.parse(source) as ExploreSource[] : [];
}

function parseBlocks(lines: string[]): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let quote: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({type: "paragraph", text: paragraph.join(" ")});
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({type: "list", items: list});
    list = [];
  };
  const flushQuote = () => {
    if (quote.length) blocks.push({type: "quote", text: quote.join(" ")});
    quote = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "---") {
      flushAll();
    } else if (/^[*-] /.test(trimmed)) {
      flushParagraph();
      flushQuote();
      list.push(trimmed.slice(2));
    } else if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      quote.push(trimmed.slice(2));
    } else if (/^#{2,6} /.test(trimmed)) {
      flushAll();
      const marker = trimmed.match(/^#+/)?.[0] ?? "##";
      blocks.push({type: "heading", level: marker.length, text: trimmed.slice(marker.length + 1)});
    } else {
      flushList();
      flushQuote();
      paragraph.push(trimmed);
    }
  });
  flushAll();
  return blocks;
}
