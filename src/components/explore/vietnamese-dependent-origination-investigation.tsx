import {BookOpen, CheckCircle2, CloudRain, Coffee, Compass, FlaskConical, Network, Scale, Sprout as Seedling, Sun, Trees, Waves, Wind} from "lucide-react";

import {Link} from "@/i18n/navigation";
import {loadExploreMarkdown, loadExploreSources, type MarkdownSection} from "@/lib/explore-markdown";
import {
  BuddhistSourcePanel,
  DifferencesPanel,
  PracticeCard,
  ReflectionCard,
  ScienceEvidencePanel,
  SimilaritiesPanel,
  SourceDrawer,
} from "./investigation-system";
import {MarkdownBlocks} from "./vietnamese-many-worlds-investigation";

export function VietnameseDependentOriginationInvestigation() {
  const article = loadExploreMarkdown("dependent-origination", "vi");
  const sections = new Map(article.sections.map((section) => [section.title, section]));
  const opening = article.sections[0];
  const storyBlocks = opening.blocks.filter((block) => block.type !== "heading");
  const sources = loadExploreSources("dependent-origination").map((source) => ({
    kind: source.type === "buddhist" ? "Nguồn Phật học chính" : "Tài liệu khoa học",
    title: source.title,
    publisher: source.organization ?? source.status,
    note: source.status,
    href: source.href,
  }));
  const science = requiredSection(sections, "Science");
  const buddhism = requiredSection(sections, "Buddhism");

  return <div className="explore-museum vi-explore"><article className="dependent-vi-documentary vi-markdown-investigation" id="dependent-origination">
    <header className="dependent-vi-hero"><DependentNetworkArtwork/><div className="dependent-vi-wash"/><div className="q-shell"><nav className="vi-breadcrumb" aria-label="Đường dẫn"><Link href="/explore">Khám phá</Link><span aria-hidden="true">/</span><span aria-current="page">{article.title}</span></nav><p className="q-kicker">Khám phá 04 · Trí tuệ cổ xưa và khoa học hiện đại</p><h1>{article.title}</h1><a href="#dependent-vi-story">Bắt đầu đọc</a></div></header>

    <section className="dependent-vi-story q-shell" id="dependent-vi-story"><div><p className="q-kicker">Câu chuyện</p><h2>{opening.title}</h2></div><div><MarkdownBlocks blocks={storyBlocks}/></div></section>

    <section className="dependent-vi-conditions"><div className="q-shell"><header><Network/><p className="q-kicker">Không có gì sinh ra một mình</p><h2>Một hạt giống.<br/>Nhiều điều kiện.</h2></header><div className="dependent-vi-network" aria-label="Các điều kiện giúp hạt xoài nảy mầm"><i/><Condition icon={Seedling} label="Hạt" index={0}/><Condition icon={Trees} label="Đất" index={1}/><Condition icon={CloudRain} label="Nước" index={2}/><Condition icon={Sun} label="Ánh sáng" index={3}/><Condition icon={Wind} label="Không khí" index={4}/><Condition icon={Waves} label="Thời gian" index={5}/><span><Seedling/>Mầm cây</span></div></div></section>

    <section className="dependent-vi-perspectives q-shell"><ScienceEvidencePanel icon={FlaskConical} label="Khoa học" title={science.title}><MarkdownBlocks blocks={science.blocks}/></ScienceEvidencePanel><BuddhistSourcePanel icon={BookOpen} label="Phật học" title={buddhism.title}><MarkdownBlocks blocks={buddhism.blocks}/></BuddhistSourcePanel></section>

    <section className="dependent-vi-comparison q-shell"><header><p className="q-kicker">So sánh cẩn trọng</p><h2>Điểm gặp nhau không xóa đi khác biệt.</h2></header><div className="comparison-balance"><SimilaritiesPanel as="section" icon={CheckCircle2} title={requiredSection(sections, "Similarity").title}><MarkdownBlocks blocks={requiredSection(sections, "Similarity").blocks}/></SimilaritiesPanel><DifferencesPanel as="section" icon={Scale} title={requiredSection(sections, "Difference").title}><MarkdownBlocks blocks={requiredSection(sections, "Difference").blocks}/></DifferencesPanel></div></section>

    <section className="dependent-vi-ending q-shell"><ReflectionCard icon={Compass} kicker="Suy ngẫm"><MarkdownBlocks blocks={requiredSection(sections, "Reflection").blocks}/></ReflectionCard><PracticeCard icon={Coffee} kicker="Thực hành" linkLabel="Đi đến không gian thực hành"><MarkdownBlocks blocks={requiredSection(sections, "Practice").blocks}/></PracticeCard></section>

    <SourceDrawer className="dependent-vi-sources" subtitle="Nguồn Phật học chính và tài liệu khoa học" sources={sources} noteTitle="Ranh giới biên tập" note="Các nguồn được hiển thị đúng theo sources.json; không có nguồn hoặc khẳng định mới được thêm vào nội dung bài."/>
  </article></div>;
}

function requiredSection(sections: Map<string, MarkdownSection>, title: string) {
  const section = sections.get(title);
  if (!section) throw new Error(`Missing approved section: ${title}`);
  return section;
}

function Condition({icon: Icon, label, index}: {icon: typeof Seedling; label: string; index: number}) {
  return <b style={{"--condition-index": index} as React.CSSProperties}><Icon/><small>{label}</small></b>;
}

function DependentNetworkArtwork() {
  return <svg className="dependent-vi-art" viewBox="0 0 1600 900" role="img" aria-label="Một mạng lưới điều kiện phát triển thành cây"><defs><linearGradient id="dependent-vi-bg" x2="1" y2="1"><stop stopColor="#06101d"/><stop offset=".55" stopColor="#132c2c"/><stop offset="1" stopColor="#1d2135"/></linearGradient><radialGradient id="dependent-vi-glow"><stop stopColor="#d5ac4d" stopOpacity=".7"/><stop offset="1" stopColor="#d5ac4d" stopOpacity="0"/></radialGradient></defs><rect width="1600" height="900" fill="url(#dependent-vi-bg)"/><g className="dependent-vi-stars">{Array.from({length: 50}, (_, index) => <circle key={index} cx={590 + (index * 137) % 940} cy={70 + (index * 79) % 690} r={index % 11 === 0 ? 2.5 : 1} fill={index % 3 ? "#b8ccc2" : "#d5ac4d"} opacity={.18 + (index % 5) * .1}/>)}</g><g stroke="#b5c9bd" strokeOpacity=".17">{Array.from({length: 28}, (_, index) => <line key={index} x1={650 + (index * 113) % 820} y1={100 + (index * 71) % 650} x2={650 + ((index + 9) * 113) % 820} y2={100 + ((index + 13) * 71) % 650}/>)}</g><circle cx="1070" cy="390" r="260" fill="url(#dependent-vi-glow)" opacity=".25"/><path d="M1080 760q-18-200 0-405m0 118q-115-106-210-63m212-10q105-113 210-61m-210 190q-91-82-170-38m172-15q86-90 167-48" fill="none" stroke="#8dac82" strokeWidth="9" strokeLinecap="round" opacity=".65"/><path d="M1080 760q-130 20-230 100m230-100q130 24 236 98m-236-98q-20 60-4 112" fill="none" stroke="#9f784d" strokeWidth="6" opacity=".58"/></svg>;
}
