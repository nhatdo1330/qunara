"use client";

import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronDown, Compass, FlaskConical, HelpCircle, MessageCircle, Scale, Sparkles } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { getVietnameseInvestigation, vietnameseExplore, type VietnameseInvestigation } from "@/lib/explore-localized-content";
import { ExploreArtwork } from "./explore-artwork";

const modeIcons = [BookOpen, FlaskConical, Compass];

export function VietnameseExploreExperience({ slug }: { slug?: string }) {
  const [mode, setMode] = useState(0);
  const investigation = slug ? getVietnameseInvestigation(slug) : undefined;
  const items = investigation ? [investigation] : vietnameseExplore.investigations;
  const { hero, editorial, ui } = vietnameseExplore;

  return <MotionConfig reducedMotion="user"><div className="explore-museum vi-explore">
    <section className="explore-museum-hero"><ExploreArtwork/><div className="explore-hero-overlay"/><div className="q-shell explore-hero-copy"><motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="q-kicker">{hero.kicker}</motion.p><motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:.08}}>{investigation ? investigation.title : <>{hero.title.split(". ")[0]}.<br/><em>{hero.title.split(". ")[1]}.</em></>}</motion.h1><motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.16}}>{investigation?.subtitle ?? hero.body}</motion.p><motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.24}}>{investigation ? <Link href="/explore"><ArrowLeft/>{ui.back}</Link> : <><a href="#vi-investigations">{hero.ancientAction}<ArrowDown/></a><a href="#vi-quantum-dialogue">{hero.quantumAction}<ArrowRight/></a></>}</motion.div></div><span className="explore-scroll-mark">{hero.boundary}</span></section>

    {!investigation && <><section className="explore-editorial q-shell"><p className="q-kicker">{editorial.kicker}</p><blockquote>{editorial.quote}</blockquote><div><p>{editorial.body}</p><aside className="comparison-disclaimer"><HelpCircle/><p><b>{editorial.warningTitle}</b>{editorial.warning}</p></aside></div></section>
    <section className="explore-modes q-shell"><header><p className="q-kicker">{ui.contents}</p><h2>{ui.modesTitle}</h2></header><div className="mode-tabs" role="group" aria-label={ui.modesTitle}>{vietnameseExplore.modes.map((item,index)=>{const Icon=modeIcons[index];return <button key={item.id} aria-pressed={mode===index} className={mode===index?"active":""} onClick={()=>setMode(index)}><Icon/>{item.label}</button>})}</div><motion.article key={mode} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}><span>{vietnameseExplore.modes[mode].label}</span><h3>{vietnameseExplore.modes[mode].title}</h3><p>{vietnameseExplore.modes[mode].text}</p><small>{ui.modeHint}</small></motion.article></section>
    <nav className="explore-section-nav" aria-label={ui.contents}><div className="q-shell">{vietnameseExplore.investigations.map(item=><a href={`#vi-${item.id}`} key={item.id}><span>{item.number}</span>{item.title}</a>)}</div></nav></>}

    <main id="vi-investigations">{items.map(item=><VietnameseInvestigationSection item={item} detail={Boolean(investigation)} key={item.id}/>)}</main>

    <section className="explore-phase-cta"><div className="q-shell"><Compass/><p className="q-kicker">{ui.continue}</p><h2>{ui.continueTitle}</h2><p>{ui.continueBody}</p><div><Link href="/learn">{ui.learn}<ArrowRight/></Link><Link href="/community">{ui.community}</Link></div></div></section>
  </div></MotionConfig>;
}

function VietnameseInvestigationSection({item,detail}:{item:VietnameseInvestigation;detail:boolean}) {
  const [sourcesOpen,setSourcesOpen]=useState(false);
  const ui=vietnameseExplore.ui;
  return <article className="vi-investigation" id={`vi-${item.id}`}>
    <header className="vi-investigation-hero"><EditorialArtwork index={Number(item.number)}/><div className="vi-investigation-wash"/><div className="q-shell">{detail&&<nav className="vi-breadcrumb" aria-label="Đường dẫn"><Link href="/explore">Khám phá</Link><span aria-hidden="true">/</span><span aria-current="page">{item.title}</span></nav>}<p className="q-kicker">{item.category} · {item.number}</p><h2>{item.title}</h2><p>{item.subtitle}</p><div className="vi-reading-meta"><span>{item.readingTime}</span><span>{item.difficulty}</span><span>{ui.educational}</span></div>{!detail&&<Link href={{pathname:"/explore/[slug]",params:{slug:item.slug}}}>{ui.read}<ArrowRight/></Link>}</div></header>
    <section className="vi-story q-shell"><div><p className="q-kicker">{ui.story}</p><h3>{item.subtitle}</h3></div><p>{item.opening}</p></section>
    <section className="vi-perspectives"><div className="q-shell vi-two-columns"><article><BookOpen/><p className="q-kicker">{ui.buddhist}</p><p>{item.buddhist}</p></article><article><FlaskConical/><p className="q-kicker">{ui.science}</p><p>{item.science}</p></article></div></section>
    <section className="q-shell vi-comparison"><article><CheckCircle2/><h3>{ui.similarities}</h3><p>{item.similarities}</p></article><article><Scale/><h3>{ui.differences}</h3><p>{item.differences}</p></article><aside><HelpCircle/><div><h3>{ui.misconception}</h3><p>{item.misconception}</p></div></aside></section>
    <section className="q-shell vi-evidence"><header><p className="q-kicker">{ui.confidence}</p><h3>{item.title}</h3></header><div>{item.confidence.map(([label,value])=><article key={label}><span>{label}</span><b>{value}</b></article>)}</div></section>
    <section className="vi-timeline"><div className="q-shell"><p className="q-kicker">{ui.timeline}</p><ol>{item.timeline.map(([date,title],index)=><motion.li initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:index*.05}} key={`${date}-${title}`}><span>{date}</span><i/><p>{title}</p></motion.li>)}</ol></div></section>
    <section className="q-shell vi-actions"><article><Compass/><p className="q-kicker">{ui.reflection}</p><p>{item.reflection}</p></article><article><Sparkles/><p className="q-kicker">{ui.practice}</p><p>{item.practice}</p><Link href="/practice">{ui.practice}<ArrowRight/></Link></article><article><MessageCircle/><p className="q-kicker">{ui.discussion}</p><p>{item.discussion}</p><Link href="/community">{ui.community}<ArrowRight/></Link></article></section>
    <section className="source-drawer q-shell"><button onClick={()=>setSourcesOpen(!sourcesOpen)} aria-expanded={sourcesOpen}><BookOpen/><span><b>{ui.sources}</b><small>{item.sources.length ? `${item.sources.length} nguồn` : ui.noSources}</small></span><ChevronDown/></button>{sourcesOpen&&<motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}}>{item.sources.length?item.sources.map(([title,publisher,href])=><article key={title}><h3>{title}</h3><b>{publisher}</b><a href={href} target="_blank" rel="noreferrer">{ui.openSources}<ArrowRight/></a></article>):<aside><b>{ui.misconception}</b><p>{ui.noSources}</p></aside>}</motion.div>}</section>
  </article>;
}

function EditorialArtwork({index}:{index:number}) {
  return <svg className="vi-investigation-art" viewBox="0 0 1400 700" aria-hidden="true"><defs><linearGradient id={`vi-bg-${index}`} x2="1" y2="1"><stop stopColor="#07111f"/><stop offset=".55" stopColor={index<5?"#17332f":"#241d38"}/><stop offset="1" stopColor="#0b1828"/></linearGradient><radialGradient id={`vi-light-${index}`}><stop stopColor="#d5ac4d" stopOpacity=".45"/><stop offset="1" stopColor="#d5ac4d" stopOpacity="0"/></radialGradient></defs><rect width="1400" height="700" fill={`url(#vi-bg-${index})`}/><circle cx={900+(index%3)*90} cy={280+(index%2)*70} r="250" fill={`url(#vi-light-${index})`}/><g fill="none" stroke={index<5?"#90b4a2":"#a59acb"} strokeOpacity=".34">{Array.from({length:7},(_,i)=><ellipse key={i} cx="980" cy="340" rx={70+i*45} ry={30+i*28} transform={`rotate(${i*18} 980 340)`}/>)}</g><g fill="#e3c46d">{Array.from({length:34},(_,i)=><circle key={i} cx={620+(i*97)%700} cy={70+(i*61)%540} r={i%9===0?2.4:1} opacity={.2+(i%5)*.1}/>)}</g><path d="M0 590Q240 500 460 570T860 535T1400 480V700H0Z" fill="#07111f" opacity=".72"/></svg>;
}
