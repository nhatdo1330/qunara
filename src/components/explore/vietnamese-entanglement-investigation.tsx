import {Atom, BookOpen, CheckCircle2, Compass, FlaskConical, HelpCircle, MessageCircle, Radio, Scale, Sparkles, Telescope, TriangleAlert} from "lucide-react";

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

export function VietnameseEntanglementInvestigation() {
  const article = loadExploreMarkdown("entanglement", "vi");
  const sections = new Map(article.sections.map((section) => [section.title, section]));
  const opening = article.sections[0];
  const storyBlocks = opening.blocks.filter((block) => block.type !== "heading");
  const sources = loadExploreSources("entanglement").map((source) => ({
    kind: source.type === "buddhist" ? "Nguồn Phật học chính" : "Tài liệu khoa học",
    title: source.title,
    publisher: source.organization ?? source.status,
    note: source.status,
    href: source.href,
  }));
  const scienceSections = [
    "Einstein và câu hỏi còn bỏ ngỏ",
    "Vướng víu lượng tử là gì?",
    "Vì sao ví dụ đời thường không đủ?",
    "Định lý Bell",
    "Các thí nghiệm đã cho thấy điều gì?",
    "Vì sao vướng víu lượng tử không cho phép truyền tin nhanh hơn ánh sáng?",
  ];
  const misconceptions = requiredSection(sections, "Những hiểu lầm thường gặp");

  return <div className="explore-museum vi-explore"><article className="entanglement-vi-documentary vi-markdown-investigation" id="quantum-dialogue">
    <header className="entanglement-vi-hero"><EntanglementArtwork/><div className="entanglement-vi-wash"/><div className="q-shell"><nav className="vi-breadcrumb" aria-label="Đường dẫn"><Link href="/explore">Khám phá</Link><span aria-hidden="true">/</span><span aria-current="page">{article.title}</span></nav><p className="q-kicker">Khám phá 05 · Đối thoại lượng tử</p><h1>{article.title}</h1><a href="#entanglement-vi-story">Bắt đầu đọc</a></div></header>

    <section className="entanglement-vi-story q-shell" id="entanglement-vi-story"><div><p className="q-kicker">Câu chuyện</p><h2>{opening.title}</h2></div><div><MarkdownBlocks blocks={storyBlocks}/></div></section>

    <section className="entanglement-vi-science"><div className="q-shell"><header><Atom/><p className="q-kicker">Vật lý lượng tử</p><h2>Từ câu hỏi của Einstein đến các thí nghiệm Bell.</h2></header><div className="entanglement-vi-science-grid">{scienceSections.map((title, index) => <ScienceEvidencePanel icon={index % 2 ? Radio : Telescope} label={`0${index + 1}`} title={title} key={title}><MarkdownBlocks blocks={requiredSection(sections, title).blocks}/></ScienceEvidencePanel>)}</div></div></section>

    <section className="entanglement-vi-buddhist"><div className="q-shell"><BuddhistSourcePanel icon={BookOpen} label="Bối cảnh Phật học" title={requiredSection(sections, "Duyên khởi và tính tương duyên").title}><MarkdownBlocks blocks={requiredSection(sections, "Duyên khởi và tính tương duyên").blocks}/></BuddhistSourcePanel></div></section>

    <section className="entanglement-vi-comparison q-shell"><header><p className="q-kicker">Đối thoại mà không đồng nhất</p><h2>Vì sao chúng gợi liên tưởng—và vì sao chúng khác nhau.</h2></header><div className="entanglement-vi-columns"><article><FlaskConical/><span>Góc nhìn lượng tử</span><MarkdownBlocks blocks={selectBlocks(requiredSection(sections, "Những khác biệt quan trọng"), ["Vướng víu lượng tử", "Nó được", "Nó chỉ"])}/></article><article><BookOpen/><span>Góc nhìn Phật học</span><MarkdownBlocks blocks={selectBlocks(requiredSection(sections, "Những khác biệt quan trọng"), ["Duyên khởi", "Nó bàn", "Mục tiêu"])}/></article></div><div className="comparison-balance"><SimilaritiesPanel as="section" icon={CheckCircle2} title={requiredSection(sections, "Điểm tương đồng").title}><MarkdownBlocks blocks={requiredSection(sections, "Điểm tương đồng").blocks}/></SimilaritiesPanel><DifferencesPanel as="section" icon={Scale} title={requiredSection(sections, "Điểm khác biệt").title}><MarkdownBlocks blocks={requiredSection(sections, "Điểm khác biệt").blocks}/></DifferencesPanel></div><aside className="entanglement-vi-resonance"><Sparkles/><MarkdownSectionView section={requiredSection(sections, "Vì sao hai khái niệm khiến người ta liên tưởng đến nhau?")}/></aside></section>

    <section className="entanglement-vi-misconceptions"><div className="q-shell"><header><TriangleAlert/><p className="q-kicker">Những hiểu lầm thường gặp</p><h2>Điều khoa học không cho phép kết luận.</h2></header><div>{pairBlocks(misconceptions.blocks).map((blocks, index) => <MisconceptionPanel label={String(index + 1).padStart(2, "0")} key={index}><MarkdownBlocks blocks={blocks}/></MisconceptionPanel>)}</div></div></section>

    <section className="entanglement-vi-importance q-shell"><div><Atom/><MarkdownSectionView section={requiredSection(sections, "Vì sao vướng víu lượng tử quan trọng?")}/></div><div><HelpCircle/><MarkdownSectionView section={requiredSection(sections, "Điều không nên kết luận")}/></div></section>

    <section className="entanglement-vi-ending q-shell"><ReflectionCard icon={Compass} kicker="Suy ngẫm"><MarkdownBlocks blocks={requiredSection(sections, "Suy ngẫm").blocks}/></ReflectionCard><PracticeCard icon={Sparkles} kicker="Thực hành" linkLabel="Đi đến không gian thực hành"><MarkdownBlocks blocks={requiredSection(sections, "Thực hành").blocks}/></PracticeCard><CommunityQuestion icon={MessageCircle} kicker="Câu hỏi cộng đồng" linkLabel="Thảo luận với cộng đồng"><MarkdownBlocks blocks={requiredSection(sections, "Câu hỏi cộng đồng").blocks}/></CommunityQuestion></section>

    <section className="q-shell vi-markdown-sources"><BookOpen/><MarkdownSectionView section={requiredSection(sections, "Tài liệu tham khảo")}/></section>
    <SourceDrawer className="entanglement-vi-sources" subtitle="Nguồn Phật học chính và tài liệu khoa học" sources={sources} noteTitle="Cần kiểm chứng nguồn" note="Danh mục tham khảo mở rộng trong vi.md được giữ nguyên và cần biên tập viên kiểm chứng trước khi bổ sung liên kết."/>
  </article></div>;
}

function requiredSection(sections: Map<string, MarkdownSection>, title: string) {
  const section = sections.get(title);
  if (!section) throw new Error(`Missing approved section: ${title}`);
  return section;
}

function selectBlocks(section: MarkdownSection, phrases: string[]): MarkdownBlock[] {
  return section.blocks.filter((block) => block.type !== "list" && phrases.some((phrase) => block.text.includes(phrase)));
}

function pairBlocks(blocks: MarkdownBlock[]) {
  const pairs: MarkdownBlock[][] = [];
  for (let index = 0; index < blocks.length; index += 2) pairs.push(blocks.slice(index, index + 2));
  return pairs;
}

function EntanglementArtwork() {
  return <svg className="entanglement-vi-art" viewBox="0 0 1600 900" role="img" aria-label="Hai hạt lượng tử trừu tượng với các mẫu tương quan"><defs><linearGradient id="ent-vi-bg" x2="1" y2="1"><stop stopColor="#050d18"/><stop offset=".5" stopColor="#171b31"/><stop offset="1" stopColor="#092128"/></linearGradient><radialGradient id="ent-vi-a"><stop stopColor="#fff0ad"/><stop offset=".17" stopColor="#d5ac4d"/><stop offset="1" stopColor="#d5ac4d" stopOpacity="0"/></radialGradient><radialGradient id="ent-vi-b"><stop stopColor="#e1eaff"/><stop offset=".17" stopColor="#809bc6"/><stop offset="1" stopColor="#809bc6" stopOpacity="0"/></radialGradient></defs><rect width="1600" height="900" fill="url(#ent-vi-bg)"/><g className="entanglement-vi-particles">{Array.from({length: 55}, (_, index) => <circle key={index} cx={560 + (index * 139) % 980} cy={70 + (index * 83) % 700} r={index % 13 === 0 ? 2.5 : 1} fill={index % 3 ? "#c7d3df" : "#d5ac4d"} opacity={.18 + (index % 5) * .11}/>)}</g><circle cx="990" cy="390" r="210" fill="url(#ent-vi-a)" opacity=".7"/><circle cx="1350" cy="390" r="210" fill="url(#ent-vi-b)" opacity=".7"/><circle cx="990" cy="390" r="15" fill="#f0ce69"/><circle cx="1350" cy="390" r="15" fill="#b5cae9"/><g className="entanglement-vi-waves" fill="none" strokeOpacity=".36"><path d="M990 390c100-205 260-205 360 0s-260 205-360 0" stroke="#d5ac4d"/><path d="M990 390c100 205 260 205 360 0s-260-205-360 0" stroke="#839fc7"/><path d="M990 390q180-95 360 0t-360 0" stroke="#b79bd2"/></g></svg>;
}
