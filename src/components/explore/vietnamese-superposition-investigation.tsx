import {Atom, BookOpen, CheckCircle2, Compass, FlaskConical, GitBranch, HelpCircle, MessageCircle, Scale, Sparkles, Target, TriangleAlert, Waves} from "lucide-react";

import {Link} from "@/i18n/navigation";
import {loadExploreMarkdown, loadExploreSources, type MarkdownBlock, type MarkdownSection} from "@/lib/explore-markdown";
import {
  BuddhistSourcePanel,
  CommunityQuestion,
  DifferencesPanel,
  MisconceptionPanel,
  PracticeCard,
  ReflectionCard,
  ScienceEvidencePanel,
  SimilaritiesPanel,
  SourceDrawer,
} from "./investigation-system";
import {MarkdownBlocks, MarkdownSectionView} from "./vietnamese-many-worlds-investigation";

export function VietnameseSuperpositionInvestigation() {
  const article = loadExploreMarkdown("superposition", "vi");
  const sections = new Map(article.sections.map((section) => [section.title, section]));
  const opening = article.sections[0];
  const storyBlocks = opening.blocks.filter((block) => block.type !== "heading");
  const sources = loadExploreSources("superposition").map((source) => ({
    kind: source.type === "buddhist" ? "Nguồn Phật học chính" : "Tài liệu khoa học",
    title: source.title,
    publisher: source.organization ?? source.status,
    note: source.status,
    href: source.href,
  }));
  const misconceptions = requiredSection(sections, "Những hiểu lầm thường gặp");

  return <div className="explore-museum vi-explore"><article className="superposition-vi-documentary vi-markdown-investigation" id="superposition-dialogue">
    <header className="superposition-vi-hero"><SuperpositionArtwork/><div className="superposition-vi-wash"/><div className="q-shell"><nav className="vi-breadcrumb" aria-label="Đường dẫn"><Link href="/explore">Khám phá</Link><span aria-hidden="true">/</span><span aria-current="page">{article.title}</span></nav><p className="q-kicker">Khám phá 06 · Đối thoại lượng tử</p><h1>{article.title}</h1><a href="#superposition-vi-story">Bắt đầu đọc</a></div></header>

    <section className="superposition-vi-story q-shell" id="superposition-vi-story"><div><p className="q-kicker">Câu chuyện</p><h2>{opening.title}</h2></div><div><MarkdownBlocks blocks={storyBlocks}/></div></section>

    <section className="superposition-vi-flow"><div className="q-shell"><header><Waves/><p className="q-kicker">Một sơ đồ khái niệm</p><h2>Từ nhiều khả năng đến một kết quả đo.</h2></header><ol aria-label="Dòng khái niệm của chồng chập lượng tử"><li><Waves/><span>Sóng</span></li><li><GitBranch/><span>Các khả năng</span></li><li><FlaskConical/><span>Phép đo</span></li><li><Target/><span>Kết quả</span></li></ol></div></section>

    <section className="superposition-vi-perspectives q-shell"><ScienceEvidencePanel icon={Atom} label="Cơ học lượng tử" title={requiredSection(sections, "Science").title}><MarkdownBlocks blocks={requiredSection(sections, "Science").blocks}/></ScienceEvidencePanel><BuddhistSourcePanel icon={BookOpen} label="Triết học Phật giáo" title={requiredSection(sections, "Buddhism").title}><MarkdownBlocks blocks={requiredSection(sections, "Buddhism").blocks}/></BuddhistSourcePanel></section>

    <section className="superposition-vi-comparison q-shell"><header><p className="q-kicker">So sánh cẩn trọng</p><h2>Một lời mời mở rộng trực giác—không phải một sự đồng nhất.</h2></header><div className="comparison-balance"><SimilaritiesPanel as="section" icon={CheckCircle2} title={requiredSection(sections, "Similarity").title}><MarkdownBlocks blocks={requiredSection(sections, "Similarity").blocks}/></SimilaritiesPanel><DifferencesPanel as="section" icon={Scale} title={requiredSection(sections, "Difference").title}><MarkdownBlocks blocks={requiredSection(sections, "Difference").blocks}/></DifferencesPanel></div><div className="superposition-vi-final-comparison"><SimilaritiesPanel as="section" icon={Sparkles} title={requiredSection(sections, "Điểm tương đồng").title}><MarkdownBlocks blocks={requiredSection(sections, "Điểm tương đồng").blocks}/></SimilaritiesPanel><DifferencesPanel as="section" icon={Scale} title={requiredSection(sections, "Điểm khác biệt").title}><MarkdownBlocks blocks={requiredSection(sections, "Điểm khác biệt").blocks}/></DifferencesPanel></div></section>

    <section className="superposition-vi-misconceptions"><div className="q-shell"><header><TriangleAlert/><p className="q-kicker">Những hiểu lầm thường gặp</p><h2>Chồng chập không phải một phép ẩn dụ tùy ý.</h2></header><div>{pairBlocks(misconceptions.blocks).map((blocks, index) => <MisconceptionPanel label={String(index + 1).padStart(2, "0")} key={index}><MarkdownBlocks blocks={blocks}/></MisconceptionPanel>)}</div></div></section>

    <section className="superposition-vi-importance q-shell"><div><Atom/><MarkdownSectionView section={requiredSection(sections, "Vì sao chồng chập quan trọng?")}/></div><div><HelpCircle/><MarkdownSectionView section={requiredSection(sections, "Điều không nên kết luận")}/></div></section>

    <section className="superposition-vi-ending q-shell"><ReflectionCard icon={Compass} kicker="Suy ngẫm"><MarkdownBlocks blocks={requiredSection(sections, "Reflection").blocks}/></ReflectionCard><PracticeCard icon={Sparkles} kicker="Thực hành" linkLabel="Đi đến không gian thực hành"><MarkdownBlocks blocks={requiredSection(sections, "Practice").blocks}/></PracticeCard><CommunityQuestion icon={MessageCircle} kicker="Câu hỏi cộng đồng" linkLabel="Thảo luận với cộng đồng"><MarkdownBlocks blocks={requiredSection(sections, "Câu hỏi cộng đồng").blocks}/></CommunityQuestion></section>

    <section className="q-shell vi-markdown-sources"><BookOpen/><MarkdownSectionView section={requiredSection(sections, "Tài liệu tham khảo")}/></section>
    <SourceDrawer className="superposition-vi-sources" subtitle="Nguồn Phật học chính và tài liệu khoa học" sources={sources} noteTitle="Cần kiểm chứng nguồn" note="Danh mục tham khảo mở rộng trong vi.md được giữ nguyên và cần biên tập viên kiểm chứng trước khi bổ sung liên kết."/>
  </article></div>;
}

function requiredSection(sections: Map<string, MarkdownSection>, title: string) {
  const section = sections.get(title);
  if (!section) throw new Error(`Missing approved section: ${title}`);
  return section;
}

function pairBlocks(blocks: MarkdownBlock[]) {
  const pairs: MarkdownBlock[][] = [];
  for (let index = 0; index < blocks.length; index += 2) pairs.push(blocks.slice(index, index + 2));
  return pairs;
}

function SuperpositionArtwork() {
  return <svg className="superposition-vi-art" viewBox="0 0 1600 900" role="img" aria-label="Những làn sóng tách thành các khả năng rồi hội tụ thành một kết quả đo"><defs><linearGradient id="super-vi-bg" x2="1" y2="1"><stop stopColor="#050d18"/><stop offset=".52" stopColor="#20203b"/><stop offset="1" stopColor="#09212a"/></linearGradient><radialGradient id="super-vi-glow"><stop stopColor="#b8a0dc" stopOpacity=".55"/><stop offset="1" stopColor="#7864a6" stopOpacity="0"/></radialGradient></defs><rect width="1600" height="900" fill="url(#super-vi-bg)"/><ellipse cx="1190" cy="420" rx="450" ry="370" fill="url(#super-vi-glow)"/><g className="superposition-vi-particles">{Array.from({length: 52}, (_, index) => <circle key={index} cx={590 + (index * 137) % 930} cy={70 + (index * 89) % 700} r={index % 12 === 0 ? 2.5 : 1} fill={index % 3 ? "#d6deea" : "#d5ac4d"} opacity={.18 + (index % 5) * .11}/>)}</g><g className="superposition-vi-waves" fill="none"><path d="M760 440q100-230 200 0t200 0t200 0" stroke="#d5ac4d" strokeOpacity=".52"/><path d="M760 440q100 230 200 0t200 0t200 0" stroke="#88a4ce" strokeOpacity=".52"/><path d="M760 440q80-110 160 0t160 0t160 0t160 0" stroke="#b89cd6" strokeOpacity=".4"/></g><path d="M1270 160v580" stroke="#e7e5df" strokeOpacity=".25" strokeDasharray="6 10"/><circle cx="1410" cy="440" r="16" fill="#e5c465"/><circle cx="1410" cy="440" r="90" fill="none" stroke="#e5c465" strokeOpacity=".25"/></svg>;
}
