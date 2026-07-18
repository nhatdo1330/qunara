"use client";

import {useEffect,useState} from "react";
import {motion} from "framer-motion";
import {ArrowRight,Atom,BookOpen,Check,LockKeyhole,Sparkles} from "lucide-react";
import {useTranslations} from "next-intl";

import {Link} from "@/i18n/navigation";
import {vietnameseBuddhismChapters,vietnamesePathSlugs,vietnameseQuantumChapters,type LocalizedChapter} from "@/lib/learn-localized-content";
import {LearnIllustration} from "./learn-illustration";

export function VietnameseLearnPaths(){
  const t=useTranslations("learn");
  const [complete,setComplete]=useState<string[]>([]);
  useEffect(()=>setComplete(JSON.parse(localStorage.getItem("qunara-learn-complete")||"[]") as string[]),[]);
  const qDone=vietnameseQuantumChapters.filter(c=>complete.includes(`quantum/${c.englishSlug}`)).length;
  const bDone=vietnameseBuddhismChapters.filter(c=>complete.includes(`buddhism/${c.englishSlug}`)).length;
  const unlocked=qDone===12&&bDone===12;
  return <main className="book-learn"><header className="book-learn-hero q-shell"><p className="q-kicker">{t("library")}</p><h1>{t("heroTitle")}</h1><p>{t("heroBody")}</p><div className="learn-progress-summary"><span><Atom/>{t("physicsProgress",{count:qDone})}</span><span><BookOpen/>{t("buddhismProgress",{count:bDone})}</span></div></header><section className="q-shell path-shelf"><VietnamesePathCard title={t("quantumPath")} label={t("pathOne")} description={t("quantumDescription")} chapters={vietnameseQuantumChapters} done={complete} path="quantum"/><VietnamesePathCard title={t("buddhismPath")} label={t("pathTwo")} description={t("buddhismDescription")} chapters={vietnameseBuddhismChapters} done={complete} path="buddhism"/></section><section className={`q-shell dialogue-unlock ${unlocked?"unlocked":""}`}><div className="dialogue-art"><LearnIllustration path="quantum" chapter={4}/></div><div>{unlocked?<Sparkles/>:<LockKeyhole/>}<p className="q-kicker">{t("thirdPath")}</p><h2>{t("dialogueTitle")}</h2><p>{unlocked?t("unlocked"):t("locked")}</p>{unlocked?<Link href="/learn/dialogue">{t("startLesson")} <ArrowRight/></Link>:<small>{t("foundations",{count:qDone+bDone})}</small>}</div></section></main>;
}

function VietnamesePathCard({title,label,description,chapters,done,path}:{title:string;label:string;description:string;chapters:LocalizedChapter[];done:string[];path:"quantum"|"buddhism"}){
  const t=useTranslations("learn");
  const count=chapters.filter(c=>done.includes(`${path}/${c.englishSlug}`)).length;
  return <motion.article initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} className="learning-path-card"><div className="path-book-art"><LearnIllustration path={path}/><span>{count}/12 {t("complete")}</span></div><div className="path-book-copy"><p className="q-kicker">{label}</p><h2>{title}</h2><p>{description}</p><div className="path-progress"><i style={{width:`${count/12*100}%`}}/></div><ol>{chapters.map(c=>{const finished=done.includes(`${path}/${c.englishSlug}`);return <li key={c.slug}><Link href={{pathname:"/learn/[path]/[chapter]",params:{path:vietnamesePathSlugs[path],chapter:c.slug}}}><span>{finished?<Check/>:String(c.number).padStart(2,"0")}</span><div><h3>{c.title}</h3><small>{t("minutes",{count:c.minutes})} · {c.topics.slice(0,2).join(" · ")}</small></div><ArrowRight/></Link></li>})}</ol></div></motion.article>;
}
