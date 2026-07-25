import type {ReactNode} from "react";
import {BookOpen, CheckCircle2, Compass, HelpCircle, Mountain, Orbit, Scale, Sparkles} from "lucide-react";

import {Link} from "@/i18n/navigation";
import {loadExploreMarkdown, loadExploreSources, type MarkdownBlock, type MarkdownSection} from "@/lib/explore-markdown";
import {CosmologyArtwork} from "./cosmology-artwork";
import {
  BuddhistSourcePanel,
  DifferencesPanel,
  MisconceptionPanel,
  OpeningStory,
  PracticeCard,
  ReflectionCard,
  ScienceEvidencePanel,
  SimilaritiesPanel,
  SourceDrawer,
} from "./investigation-system";

export function VietnameseManyWorldsInvestigation() {
  const article = loadExploreMarkdown("many-worlds", "vi");
  const sections = new Map(article.sections.map((section) => [section.title, section]));
  const opening = article.sections[0];
  const sources = loadExploreSources("many-worlds").map((source) => ({
    kind: source.type === "buddhist" ? "Nguồn Phật học" : "Nguồn khoa học",
    title: source.title,
    publisher: source.organization ?? source.status,
    note: source.status,
    href: source.href,
  }));
  const worldSections = [
    "Tiểu thiên thế giới là gì?",
    "Trung thiên thế giới là gì?",
    "Đại thiên thế giới là gì?",
  ];

  return <div className="explore-museum vi-explore"><article className="cosmology-investigation vi-markdown-investigation" id="ancient-echoes">
    <header className="cosmology-opening"><CosmologyArtwork/><div className="cosmology-opening-wash"/><div className="q-shell"><nav className="vi-breadcrumb" aria-label="Đường dẫn"><Link href="/explore">Khám phá</Link><span aria-hidden="true">/</span><span aria-current="page">{article.metadata.title}</span></nav><p className="q-kicker">Khám phá 01 · {article.metadata.readingTime} · {article.metadata.difficulty}</p><h1><span>{article.metadata.title}</span>{article.title}</h1><p>{article.metadata.summary}</p><a href="#many-worlds-story">Bắt đầu đọc</a></div></header>

    <OpeningStory className="cosmology-story q-shell" id="many-worlds-story" kicker="Câu chuyện mở đầu" title={opening.title}><MarkdownBlocks blocks={opening.blocks}/></OpeningStory>

    <section className="world-system-explainer q-shell"><header><p className="q-kicker">Giải thích đơn giản</p><h2>Từ một hệ thế giới đến ba tầng nghìn lần.</h2></header><div className="vi-markdown-worlds">{worldSections.map((title) => <MarkdownSectionView section={requiredSection(sections, title)} key={title}/>)}</div></section>

    <section className="q-shell vi-markdown-callout"><Sparkles/><MarkdownSectionView section={requiredSection(sections, "Vì sao \"tam thiên\" không có nghĩa là 3.000?")}/></section>

    <section className="ancient-modern q-shell"><div className="ancient-modern-grid"><BuddhistSourcePanel icon={Mountain} label="Bối cảnh kinh điển" title={requiredSection(sections, "Kinh điển thực sự mô tả điều gì?").title}><MarkdownBlocks blocks={requiredSection(sections, "Kinh điển thực sự mô tả điều gì?").blocks}/></BuddhistSourcePanel><ScienceEvidencePanel icon={Orbit} label="Khoa học hiện đại" title={requiredSection(sections, "Khoa học hiện đại biết gì về các hệ hành tinh và thiên hà?").title}><MarkdownBlocks blocks={requiredSection(sections, "Khoa học hiện đại biết gì về các hệ hành tinh và thiên hà?").blocks}/></ScienceEvidencePanel></div><div className="comparison-balance"><SimilaritiesPanel as="section" icon={CheckCircle2} title={requiredSection(sections, "Điểm tương đồng").title}><MarkdownBlocks blocks={requiredSection(sections, "Điểm tương đồng").blocks}/></SimilaritiesPanel><DifferencesPanel as="section" icon={Scale} title={requiredSection(sections, "Điểm khác biệt").title}><MarkdownBlocks blocks={requiredSection(sections, "Điểm khác biệt").blocks}/></DifferencesPanel></div></section>

    <section className="text-does-not-claim"><div className="q-shell"><HelpCircle/><MisconceptionPanel as="section" label="Cảnh báo về ngộ nhận" title={requiredSection(sections, "Điều không nên kết luận").title}><MarkdownBlocks blocks={requiredSection(sections, "Điều không nên kết luận").blocks}/></MisconceptionPanel></div></section>

    <section className="cosmology-end q-shell"><ReflectionCard icon={Compass} kicker="Suy ngẫm"><MarkdownBlocks blocks={requiredSection(sections, "Suy ngẫm").blocks}/></ReflectionCard><PracticeCard icon={Sparkles} kicker="Thực hành" linkLabel="Đi đến không gian thực hành"><MarkdownBlocks blocks={requiredSection(sections, "Thực hành").blocks}/></PracticeCard></section>

    <section className="q-shell vi-markdown-sources"><BookOpen/><MarkdownSectionView section={requiredSection(sections, "Nguồn tham khảo")}/></section>
    <SourceDrawer subtitle="Nguồn Phật học và khoa học đã được xác nhận" sources={sources} noteTitle="Ranh giới biên tập" note="Bài viết giữ nguyên nội dung đã được duyệt trong vi.md. Danh mục mở rộng trong bài cần được đối chiếu với nguồn cụ thể trước khi bổ sung liên kết."/>
  </article></div>;
}

function requiredSection(sections: Map<string, MarkdownSection>, title: string) {
  const section = sections.get(title);
  if (!section) throw new Error(`Missing approved section: ${title}`);
  return section;
}

export function MarkdownSectionView({section}: {section: MarkdownSection}) {
  return <article><h2>{section.title}</h2><MarkdownBlocks blocks={section.blocks}/></article>;
}

export function MarkdownBlocks({blocks}: {blocks: MarkdownBlock[]}) {
  return <>{blocks.map((block, index) => {
    if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}</ul>;
    if (block.type === "quote") return <blockquote key={index}>{renderInline(block.text)}</blockquote>;
    if (block.type === "heading") return block.level <= 2 ? <h2 key={index}>{renderInline(block.text)}</h2> : <h3 key={index}>{renderInline(block.text)}</h3>;
    return <p key={index}>{renderInline(block.text)}</p>;
  })}</>;
}

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part,
  );
}
