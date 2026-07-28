import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { MarkdownBlock, MarkdownSection } from "./explore-markdown";

export type InteractiveDocument = {
  title: string;
  sections: MarkdownSection[];
  available: boolean;
};

export type InteractiveSource = {
  type: string;
  title: string;
  status: string;
};

const contentRoot = join(process.cwd(), "content", "interactive");

export function loadInteractiveDocument(slug: string, locale: "en" | "vi"): InteractiveDocument {
  const raw = readFileSync(join(contentRoot, slug, `${locale}.md`), "utf8");
  const source = raw.replace(/<!--[^]*?-->/g, "").trim();
  if (!source) return { title: "", sections: [], available: false };

  const rawSections = source.split(/^# /gm).map((section) => section.trim()).filter(Boolean);
  const parsed = rawSections.map((section) => {
    const [heading, ...lines] = section.split("\n");
    return { title: heading.trim(), blocks: parseBlocks(lines) };
  });
  const documentMarker = parsed[0]?.title.toLowerCase().endsWith(".md") ? parsed.shift() : undefined;
  void documentMarker;

  return {
    title: parsed[0]?.title ?? "",
    sections: parsed.slice(1),
    available: parsed.length > 0,
  };
}

export function loadInteractiveSources(slug: string): InteractiveSource[] {
  const raw = readFileSync(join(contentRoot, slug, "sources.json"), "utf8").trim();
  return raw ? JSON.parse(raw) as InteractiveSource[] : [];
}

function parseBlocks(lines: string[]): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    if (list.length) blocks.push({ type: "list", items: list });
    paragraph = [];
    list = [];
  };

  lines.forEach((line) => {
    const text = line.trim();
    if (!text || text === "---") return flush();
    if (/^[*-] /.test(text)) {
      if (paragraph.length) flush();
      list.push(text.slice(2));
      return;
    }
    if (/^#{2,6} /.test(text)) {
      flush();
      const marker = text.match(/^#+/)?.[0] ?? "##";
      blocks.push({ type: "heading", level: marker.length, text: text.slice(marker.length + 1) });
      return;
    }
    if (list.length) flush();
    paragraph.push(text);
  });
  flush();
  return blocks;
}
