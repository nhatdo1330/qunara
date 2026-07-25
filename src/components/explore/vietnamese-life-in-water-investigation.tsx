import {BookOpen, CheckCircle2, Compass, Droplets, FlaskConical, HelpCircle, Scale, Sparkles} from "lucide-react";

import {Link} from "@/i18n/navigation";
import {loadExploreMarkdown, loadExploreSources, type MarkdownSection} from "@/lib/explore-markdown";
import {ExploreArtwork} from "./explore-artwork";
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
import {MarkdownBlocks, MarkdownSectionView} from "./vietnamese-many-worlds-investigation";

export function VietnameseLifeInWaterInvestigation() {
  const article = loadExploreMarkdown("life-in-water", "vi");
  const sections = new Map(article.sections.map((section) => [section.title, section]));
  const opening = article.sections[0];
  const sources = loadExploreSources("life-in-water").map((source) => ({
    kind: source.type === "buddhist" ? "Nguồn Phật học" : "Nguồn khoa học",
    title: source.title,
    publisher: source.organization ?? source.status,
    note: source.status,
    href: source.href,
  }));

  return <div className="explore-museum vi-explore"><article className="water-investigation vi-markdown-investigation" id="life-in-water">
    <header className="water-opening"><ExploreArtwork/><div className="water-opening-wash"/><div className="q-shell"><nav className="vi-breadcrumb" aria-label="Đường dẫn"><Link href="/explore">Khám phá</Link><span aria-hidden="true">/</span><span aria-current="page">{article.metadata.title}</span></nav><p className="q-kicker">Khám phá 02 · {article.metadata.readingTime} · {article.metadata.difficulty}</p><h1>{article.metadata.title}</h1><a href="#life-in-water-story">Bắt đầu đọc</a></div></header>

    <OpeningStory className="water-story q-shell" id="life-in-water-story" kicker="Câu chuyện" title={opening.title}><MarkdownBlocks blocks={opening.blocks}/></OpeningStory>

    <section className="ancient-modern q-shell"><div className="ancient-modern-grid"><BuddhistSourcePanel icon={Droplets} label="Bối cảnh lịch sử" title={requiredSection(sections, "Historical context").title}><MarkdownBlocks blocks={requiredSection(sections, "Historical context").blocks}/></BuddhistSourcePanel><BuddhistSourcePanel icon={BookOpen} label="Luật tạng" title={requiredSection(sections, "Vinaya").title}><MarkdownBlocks blocks={requiredSection(sections, "Vinaya").blocks}/></BuddhistSourcePanel><ScienceEvidencePanel icon={FlaskConical} label="Giải thích khoa học" title={requiredSection(sections, "Scientific explanation").title}><MarkdownBlocks blocks={requiredSection(sections, "Scientific explanation").blocks}/></ScienceEvidencePanel></div><div className="comparison-balance"><SimilaritiesPanel as="section" icon={CheckCircle2} title={requiredSection(sections, "Similarity").title}><MarkdownBlocks blocks={requiredSection(sections, "Similarity").blocks}/></SimilaritiesPanel><DifferencesPanel as="section" icon={Scale} title={requiredSection(sections, "Difference").title}><MarkdownBlocks blocks={requiredSection(sections, "Difference").blocks}/></DifferencesPanel></div></section>

    <section className="text-does-not-claim"><div className="q-shell"><HelpCircle/><MisconceptionPanel as="section" label="Cảnh báo về ngộ nhận" title={requiredSection(sections, "Misconceptions").title}><MarkdownBlocks blocks={requiredSection(sections, "Misconceptions").blocks}/></MisconceptionPanel></div></section>

    <section className="cosmology-end q-shell"><ReflectionCard icon={Compass} kicker="Suy ngẫm"><MarkdownBlocks blocks={requiredSection(sections, "Reflection").blocks}/></ReflectionCard><PracticeCard icon={Sparkles} kicker="Thực hành" linkLabel="Đi đến không gian thực hành"><MarkdownBlocks blocks={requiredSection(sections, "Practice").blocks}/></PracticeCard></section>

    <section className="q-shell vi-markdown-sources"><BookOpen/><MarkdownSectionView section={requiredSection(sections, "References")}/></section>
    <SourceDrawer subtitle="Nguồn Phật học và khoa học" sources={sources} noteTitle="Ghi chú nguồn" note="Danh mục nguồn được hiển thị đúng theo sources.json."/>
  </article></div>;
}

function requiredSection(sections: Map<string, MarkdownSection>, title: string) {
  const section = sections.get(title);
  if (!section) throw new Error(`Missing approved section: ${title}`);
  return section;
}
