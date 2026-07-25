import {BookOpen, CheckCircle2, Dna, FlaskConical, HelpCircle, Leaf, Mountain, NotebookPen as JournalText, Orbit, Scale, Sparkles} from "lucide-react";

import {Link} from "@/i18n/navigation";
import {loadExploreMarkdown, loadExploreSources, type MarkdownBlock, type MarkdownSection} from "@/lib/explore-markdown";
import {ImpermanenceScrollTimeline} from "./impermanence-scroll-timeline";
import {
  BuddhistSourcePanel,
  DifferencesPanel,
  MisconceptionPanel,
  PracticeCard,
  ReflectionCard,
  SimilaritiesPanel,
  SourceDrawer,
} from "./investigation-system";
import {MarkdownBlocks} from "./vietnamese-many-worlds-investigation";

export function VietnameseImpermanenceInvestigation() {
  const article = loadExploreMarkdown("impermanence", "vi");
  const sections = new Map(article.sections.map((section) => [section.title, section]));
  const opening = article.sections[0];
  const storyBlocks = opening.blocks.filter((block) => block.type !== "heading");
  const pullQuote = storyBlocks.at(-1);
  const sources = loadExploreSources("impermanence").map((source) => ({
    kind: source.type,
    title: source.title,
    publisher: source.organization ?? source.status,
    note: source.status,
    href: source.href,
  }));
  const science = requiredSection(sections, "Science");
  const buddhism = requiredSection(sections, "Buddhism");
  const difference = requiredSection(sections, "Difference");
  const warnings = [
    selectBlocks(buddhism, ["Đức Phật không dạy", "Ngược lại"]),
    selectBlocks(difference, ["Không phải vì cuộc sống", "Mà vì chính sự mong manh"]),
    selectBlocks(difference, ["Khoa học", "Phật giáo"]),
  ];

  return <div className="explore-museum vi-explore"><article className="anicca-documentary vi-markdown-investigation" id="impermanence">
    <header className="anicca-cinematic-hero"><ImpermanenceCycleArtwork/><div className="anicca-hero-wash"/><div className="q-shell"><nav className="vi-breadcrumb" aria-label="Đường dẫn"><Link href="/explore">Khám phá</Link><span aria-hidden="true">/</span><span aria-current="page">{article.title}</span></nav><p className="q-kicker">Khám phá 03 · Phật học và khoa học</p><h1>{article.title}</h1><a href="#anicca-story">Bắt đầu đọc</a></div></header>

    <section className="anicca-editorial-story q-shell" id="anicca-story"><div><p className="q-kicker">Câu chuyện</p><h2>{opening.title}</h2></div><div className="anicca-story-copy"><MarkdownBlocks blocks={storyBlocks.slice(0, -1)}/>{pullQuote&&<blockquote><MarkdownBlocks blocks={[pullQuote]}/></blockquote>}</div></section>

    <section className="anicca-timeline-section q-shell"><header><p className="q-kicker">Dòng chảy của thay đổi</p><h2>Một hình thái đi qua nhiều trạng thái.</h2></header><ImpermanenceScrollTimeline locale="vi"/></section>

    <section className="anicca-science"><div className="q-shell"><header><FlaskConical/><p className="q-kicker">Khoa học hiện đại</p><h2>{science.title}</h2></header><div className="anicca-science-grid">{science.blocks.map((block, index) => <article key={index}>{scienceIcons[index % scienceIcons.length]}<MarkdownBlocks blocks={[block]}/></article>)}</div></div></section>

    <section className="anicca-buddhist"><div className="anicca-lotus" aria-hidden="true"/><div className="q-shell"><BuddhistSourcePanel icon={BookOpen} label="Triết học Phật giáo" title={buddhism.title}><MarkdownBlocks blocks={buddhism.blocks}/></BuddhistSourcePanel></div></section>

    <section className="anicca-comparison q-shell"><header><p className="q-kicker">Hai cách nhìn về thay đổi</p><h2>Khoa học hiện đại và triết học Phật giáo</h2></header><div className="anicca-perspectives"><article><FlaskConical/><span>Khoa học hiện đại</span><MarkdownBlocks blocks={selectBlocks(difference, ["Khoa học", "Các nhà khoa học"])}/></article><article><BookOpen/><span>Triết học Phật giáo</span><MarkdownBlocks blocks={selectBlocks(difference, ["Phật giáo", "Nếu mọi thứ", "Đối với Phật giáo"])}/></article></div><div className="comparison-balance"><SimilaritiesPanel as="section" icon={CheckCircle2} title={requiredSection(sections, "Similarity").title}><MarkdownBlocks blocks={requiredSection(sections, "Similarity").blocks}/></SimilaritiesPanel><DifferencesPanel as="section" icon={Scale} title={difference.title}><MarkdownBlocks blocks={difference.blocks}/></DifferencesPanel></div></section>

    <section className="anicca-warnings"><div className="q-shell"><header><HelpCircle/><p className="q-kicker">Những điều cần hiểu đúng</p></header><div>{warnings.map((blocks, index) => <MisconceptionPanel key={index} label={`0${index + 1}`}><MarkdownBlocks blocks={blocks}/></MisconceptionPanel>)}</div></div></section>

    <section className="anicca-ending q-shell"><ReflectionCard icon={JournalText} kicker="Suy ngẫm"><MarkdownBlocks blocks={requiredSection(sections, "Reflection").blocks}/></ReflectionCard><PracticeCard icon={Leaf} kicker="Thực hành" linkLabel="Đi đến không gian thực hành"><MarkdownBlocks blocks={requiredSection(sections, "Practice").blocks}/><LeafOnWater/></PracticeCard></section>

    <SourceDrawer className="anicca-sources" subtitle="Nguồn Phật học chính, tài liệu khoa học và đọc thêm" sources={sources} noteTitle="Tình trạng biên tập" note="sources.json hiện chưa có nguồn tham khảo được duyệt; không có nguồn mới nào được thêm vào trang."/>
  </article></div>;
}

const scienceIcons = [<Orbit key="orbit"/>, <Mountain key="mountain"/>, <Dna key="dna"/>, <Sparkles key="sparkles"/>];

function requiredSection(sections: Map<string, MarkdownSection>, title: string) {
  const section = sections.get(title);
  if (!section) throw new Error(`Missing approved section: ${title}`);
  return section;
}

function selectBlocks(section: MarkdownSection, phrases: string[]): MarkdownBlock[] {
  return section.blocks.filter((block) => block.type !== "list" && phrases.some((phrase) => block.text.includes(phrase)));
}

function LeafOnWater() {
  return <svg className="leaf-on-water" viewBox="0 0 500 180" role="img" aria-label="Một chiếc lá trôi nhẹ trên mặt nước"><path d="M20 125q70-25 140 0t140 0t180 0" fill="none" stroke="currentColor" strokeOpacity=".24"/><path d="M210 83q46-43 99-3q-30 56-99 3Z" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeOpacity=".55"/><path d="m213 84 89-3" stroke="currentColor" strokeOpacity=".5"/></svg>;
}

function ImpermanenceCycleArtwork() {
  return <svg className="anicca-cycle-art" viewBox="0 0 1600 900" role="img" aria-label="Các vì sao, Trái Đất, cây, con người và lá rụng trở về bụi sao"><defs><linearGradient id="anicca-bg" x2="1" y2="1"><stop stopColor="#050d18"/><stop offset=".55" stopColor="#15243a"/><stop offset="1" stopColor="#10251f"/></linearGradient><radialGradient id="anicca-star"><stop stopColor="#fff1ad"/><stop offset=".16" stopColor="#d5ac4d"/><stop offset="1" stopColor="#d5ac4d" stopOpacity="0"/></radialGradient></defs><rect width="1600" height="900" fill="url(#anicca-bg)"/><g className="anicca-particles">{Array.from({length: 70}, (_, index) => <circle key={index} cx={520 + (index * 137) % 1040} cy={50 + (index * 83) % 720} r={index % 13 === 0 ? 2.8 : 1} fill={index % 4 ? "#cbd7df" : "#d5ac4d"} opacity={.18 + (index % 5) * .12}/>)}</g><circle cx="1010" cy="245" r="230" fill="url(#anicca-star)" opacity=".72"/><g className="anicca-orbits" fill="none" stroke="#b1c4ce" strokeOpacity=".22"><ellipse cx="1040" cy="330" rx="340" ry="115" transform="rotate(-15 1040 330)"/><ellipse cx="1040" cy="330" rx="430" ry="160" transform="rotate(12 1040 330)"/></g><circle cx="1160" cy="510" r="92" fill="#527d75" fillOpacity=".45" stroke="#9bb7aa" strokeOpacity=".55"/><path d="M1260 755q-12-155 0-260m0 95q-92-83-162-42m163-20q86-89 165-48m-167 155q-72-58-132-23m134-7q63-66 125-31" fill="none" stroke="#93ae80" strokeWidth="8" strokeLinecap="round" opacity=".65"/><path d="M1430 535q-19 38 0 77v90m0-90q-40 36-50 75m50-75q40 36 50 75m-50 15-38 95m38-95 38 95" fill="none" stroke="#c4d1ce" strokeWidth="6" strokeLinecap="round" opacity=".65"/><g className="anicca-leaves" fill="#c39b4b">{Array.from({length: 12}, (_, index) => <ellipse key={index} cx={1310 + (index * 61) % 260} cy={560 + (index * 47) % 250} rx="9" ry="4" transform={`rotate(${index * 29} ${1310 + (index * 61) % 260} ${560 + (index * 47) % 250})`} opacity={.3 + (index % 4) * .12}/>)}</g></svg>;
}
