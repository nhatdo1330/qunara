"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Eye, EyeOff, Languages, Pause, Play, Redo2, RotateCw, Tag, UnfoldHorizontal } from "lucide-react";

import type { InteractiveDocument, InteractiveSource } from "@/lib/interactive-markdown";
import type { MarkdownBlock, MarkdownSection } from "@/lib/explore-markdown";

type Locale = "en" | "vi";
type Props = { en: InteractiveDocument; vi: InteractiveDocument; sources: InteractiveSource[]; initialLocale: Locale };

const ui = {
  en: { back: "Explore", kicker: "Interactive geometry", fallbackTitle: "The Möbius Strip and Non-Dual Seeing", lead: "Build, rotate, and trace a surface that challenges everyday intuition.", build: "Build strip", rotate: "Rotate", pause: "Pause", resume: "Resume", reset: "Reset", trace: "Trace line", labels: "Show labels", hideLabels: "Hide labels", explain: "Show explanation", hideExplain: "Hide explanation", flat: "Flat paper", twist: "Half twist", join: "Joined edge", start: "Start", path: "Continuous path", discovery: "One continuous surface", explanation: "A half twist joins what looked like two sides into one continuous, non-orientable surface. The animated line returns to its starting point only after traveling across the whole strip.", locked: "Complete the trace to open the philosophical reflection.", editorialMissing: "The approved English manuscript has not yet been added to en.md.", reflection: "Philosophical reflection", sources: "Sources", sourceNote: "Sources are reproduced from the editorial source file and remain subject to its stated review status." },
  vi: { back: "Khám phá", kicker: "Hình học tương tác", fallbackTitle: "Dải Möbius và Cái nhìn Bất nhị", lead: "Tạo, xoay và lần theo một bề mặt thách thức trực giác hằng ngày.", build: "Tạo dải", rotate: "Xoay", pause: "Tạm dừng", resume: "Tiếp tục", reset: "Đặt lại", trace: "Vẽ đường liên tục", labels: "Hiện nhãn", hideLabels: "Ẩn nhãn", explain: "Mở giải thích", hideExplain: "Ẩn giải thích", flat: "Dải giấy phẳng", twist: "Nửa vòng xoắn", join: "Mép đã nối", start: "Điểm bắt đầu", path: "Đường liên tục", discovery: "Một bề mặt liên tục", explanation: "Nửa vòng xoắn nối hai phía tưởng như tách biệt thành một bề mặt liên tục, không định hướng. Đường vẽ chỉ trở về điểm đầu sau khi đi qua toàn bộ dải.", locked: "Hãy hoàn thành đường vẽ để mở phần suy ngẫm triết học.", editorialMissing: "Bản thảo tiếng Việt chưa được cung cấp.", reflection: "Suy ngẫm triết học", sources: "Tài liệu tham khảo", sourceNote: "Các nguồn được hiển thị nguyên trạng từ tệp biên tập và vẫn tuân theo trạng thái kiểm chứng ghi trong bản thảo." },
};

const philosophyStart = "Một nhịp cầu đến triết học Phật giáo";

export function MobiusExperience({ en, vi, sources, initialLocale }: Props) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [built, setBuilt] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [rotating, setRotating] = useState(false);
  const [tracing, setTracing] = useState(false);
  const [discovered, setDiscovered] = useState(false);
  const [labels, setLabels] = useState(false);
  const [explanation, setExplanation] = useState(false);
  const document = locale === "vi" ? vi : en;
  const labelsUi = ui[locale];
  const split = useMemo(() => splitSections(document.sections), [document.sections]);

  const reset = () => {
    setBuilt(false); setRotation(0); setRotating(false); setTracing(false); setDiscovered(false); setLabels(false); setExplanation(false);
  };

  return <article className="mobius-experience">
    <header className="mobius-hero">
      <MobiusBackdrop/>
      <div className="q-shell mobius-hero-copy">
        <Link href={`/${initialLocale}/explore`}><ArrowLeft/>{labelsUi.back}</Link>
        <div className="mobius-language" role="group" aria-label="Language"><Languages/>{(["en","vi"] as const).map((language)=><button aria-pressed={locale===language} onClick={()=>setLocale(language)} key={language}>{language.toUpperCase()}</button>)}</div>
        <p className="q-kicker">{labelsUi.kicker}</p>
        <h1>{document.title || labelsUi.fallbackTitle}</h1>
        <p>{labelsUi.lead}</p>
      </div>
    </header>

    {document.available && split.opening.length > 0 && <EditorialSections className="mobius-opening q-shell" sections={split.opening}/>}

    <section className="mobius-lab" aria-labelledby="mobius-lab-title">
      <div className="q-shell">
        <header><p className="q-kicker">01 · {labelsUi.kicker}</p><h2 id="mobius-lab-title">{labelsUi.build}.</h2></header>
        <div className="mobius-stage">
          <svg viewBox="0 0 900 620" role="img" aria-labelledby="mobius-svg-title mobius-svg-description">
            <title id="mobius-svg-title">Möbius strip</title><desc id="mobius-svg-description">An educational illustration of a paper strip joined after one half twist.</desc>
            <defs><linearGradient id="mobius-paper" x2="1" y2="1"><stop stopColor="#f0dba9"/><stop offset=".5" stopColor="#9f7d48"/><stop offset="1" stopColor="#e8c982"/></linearGradient><filter id="mobius-shadow"><feDropShadow dx="0" dy="18" stdDeviation="20" floodOpacity=".4"/></filter></defs>
            <g className={`${built ? "is-built" : "is-flat"} ${rotating ? "is-rotating" : ""}`} style={{ "--mobius-angle": `${rotation}deg` } as React.CSSProperties}>
              {!built ? <g><rect x="145" y="245" width="610" height="130" rx="8" fill="url(#mobius-paper)" filter="url(#mobius-shadow)"/><path d="M145 310H755" stroke="#604a2f" strokeDasharray="8 10" opacity=".35"/></g>
                : <g filter="url(#mobius-shadow)"><path d="M183 333C154 190 313 109 450 207C590 107 750 193 717 337C687 474 526 483 450 365C371 483 211 467 183 333Z" fill="none" stroke="url(#mobius-paper)" strokeWidth="104" strokeLinejoin="round"/><path d="M183 333C154 190 313 109 450 207C590 107 750 193 717 337C687 474 526 483 450 365C371 483 211 467 183 333Z" fill="none" stroke="#4f3924" strokeWidth="2" opacity=".5"/><path className={tracing ? "mobius-trace is-tracing" : "mobius-trace"} onAnimationEnd={()=>{setTracing(false);setDiscovered(true)}} d="M183 333C154 190 313 109 450 207C590 107 750 193 717 337C687 474 526 483 450 365C371 483 211 467 183 333Z" fill="none" stroke="#f3ce62" strokeWidth="7" strokeLinecap="round" pathLength="1"/><circle cx="183" cy="333" r="10" fill="#f3ce62"/></g>}
              {labels&&<g className="mobius-labels"><text x="120" y="420">{labelsUi.start}</text><text x="640" y="175">{labelsUi.path}</text><path d="M170 402l14-55M650 188l-55 44"/></g>}
            </g>
          </svg>
          <div className="mobius-status" aria-live="polite"><span>{built ? discovered ? "03" : "02" : "01"}</span><div><b>{built ? discovered ? labelsUi.discovery : labelsUi.twist : labelsUi.flat}</b><small>{built ? labelsUi.join : labelsUi.build}</small></div></div>
        </div>
        <div className="mobius-controls" role="group" aria-label="Möbius strip controls">
          <button className="primary" onClick={()=>setBuilt(true)} disabled={built}><UnfoldHorizontal/>{labelsUi.build}</button>
          <button onClick={()=>setRotation((value)=>value+24)} disabled={!built}><RotateCw/>{labelsUi.rotate}</button>
          <button onClick={()=>setRotating((value)=>!value)} disabled={!built}>{rotating?<Pause/>:<Play/>}{rotating?labelsUi.pause:labelsUi.resume}</button>
          <button onClick={()=>{setTracing(false);requestAnimationFrame(()=>setTracing(true))}} disabled={!built||tracing}><Redo2/>{labelsUi.trace}</button>
          <button aria-pressed={labels} onClick={()=>setLabels((value)=>!value)} disabled={!built}><Tag/>{labels?labelsUi.hideLabels:labelsUi.labels}</button>
          <button aria-pressed={explanation} onClick={()=>setExplanation((value)=>!value)} disabled={!built}>{explanation?<EyeOff/>:<Eye/>}{explanation?labelsUi.hideExplain:labelsUi.explain}</button>
          <button onClick={reset}><Redo2/>{labelsUi.reset}</button>
        </div>
        {explanation&&<aside className="mobius-explanation"><BookOpen/><p>{labelsUi.explanation}</p></aside>}
      </div>
    </section>

    {document.available ? <EditorialSections className="mobius-mathematics q-shell" sections={split.mathematics}/> : <p className="mobius-editorial-empty q-shell">{labelsUi.editorialMissing}</p>}

    <section className={`mobius-reflection ${discovered ? "is-open" : "is-locked"}`} aria-labelledby="mobius-reflection-title">
      <div className="q-shell"><p className="q-kicker">02 · {labelsUi.reflection}</p><h2 id="mobius-reflection-title">{discovered ? labelsUi.reflection : labelsUi.locked}</h2>{discovered&&document.available&&<EditorialSections sections={split.philosophy}/>}</div>
    </section>

    <section className="mobius-sources q-shell"><header><BookOpen/><div><p className="q-kicker">{labelsUi.sources}</p><p>{labelsUi.sourceNote}</p></div></header><div>{sources.map((source)=><article key={`${source.type}-${source.title}`}><span>{source.type}</span><h3>{source.title}</h3><p>{source.status}</p></article>)}</div></section>
  </article>;
}

function splitSections(sections: MarkdownSection[]) {
  const philosophyIndex = sections.findIndex((section)=>section.title===philosophyStart);
  const opening = sections.slice(0,1);
  const mathematics = sections.slice(1,philosophyIndex < 0 ? sections.length : philosophyIndex);
  const philosophy = philosophyIndex < 0 ? [] : sections.slice(philosophyIndex);
  return { opening, mathematics, philosophy };
}

function EditorialSections({sections,className=""}:{sections:MarkdownSection[];className?:string}) {
  return <div className={`mobius-editorial ${className}`}>{sections.map((section)=><section key={section.title}><h2>{section.title}</h2><Blocks blocks={section.blocks}/></section>)}</div>;
}

function Blocks({blocks}:{blocks:MarkdownBlock[]}) {
  return <>{blocks.map((block,index)=>block.type==="list"?<ul key={index}>{block.items.map((item)=><li key={item}>{inline(item)}</li>)}</ul>:block.type==="heading"?<h3 key={index}>{inline(block.text)}</h3>:block.type==="quote"?<blockquote key={index}>{inline(block.text)}</blockquote>:<p key={index}>{inline(block.text)}</p>)}</>;
}

function inline(text:string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean).map((part,index)=>part.startsWith("**")?<strong key={index}>{part.slice(2,-2)}</strong>:part.startsWith("*")?<em key={index}>{part.slice(1,-1)}</em>:part);
}

function MobiusBackdrop() {
  return <svg className="mobius-hero-art" viewBox="0 0 1400 760" aria-hidden="true"><defs><radialGradient id="mobius-hero-light"><stop stopColor="#8d73b8" stopOpacity=".42"/><stop offset="1" stopColor="#07111f" stopOpacity="0"/></radialGradient></defs><rect width="1400" height="760" fill="#07111f"/><circle cx="980" cy="300" r="420" fill="url(#mobius-hero-light)"/><path d="M620 390C700 130 1010 135 1130 330c105 170-76 300-254 161-132-104-30-279 139-199 118 56 99 187 8 251" fill="none" stroke="#d7bd79" strokeWidth="36" opacity=".62"/><g fill="#dfc66e">{Array.from({length:30},(_,i)=><circle key={i} cx={80+(i*139)%1260} cy={50+(i*83)%640} r={i%8===0?2:1} opacity={.2+(i%4)*.12}/>)}</g></svg>;
}
