"use client";

import {useEffect,useState} from "react";
import {ArrowLeft,ArrowRight,Check,Circle} from "lucide-react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import type {LocalizedChapter} from "@/lib/learn-localized-content";

export function VietnameseLessonActions({chapter,previous,next}:{chapter:LocalizedChapter;previous?:LocalizedChapter;next?:LocalizedChapter}){
  const t=useTranslations("learn");const key=`${chapter.path}/${chapter.englishSlug}`;const [selected,setSelected]=useState<number|null>(null);const [done,setDone]=useState(false);
  useEffect(()=>{const saved=JSON.parse(localStorage.getItem("qunara-learn-complete")||"[]") as string[];setDone(saved.includes(key))},[key]);
  function complete(){const saved=JSON.parse(localStorage.getItem("qunara-learn-complete")||"[]") as string[];localStorage.setItem("qunara-learn-complete",JSON.stringify(Array.from(new Set([...saved,key]))));setDone(true)}
  const href=(c:LocalizedChapter)=>({pathname:"/learn/[path]/[chapter]" as const,params:{path:c.path==="quantum"?"vat-ly-luong-tu":"phat-hoc",chapter:c.slug}});
  return <><section className="chapter-quiz"><p className="chapter-label">{t("quiz")}</p><h2>{chapter.quiz.question}</h2><div>{chapter.quiz.options.map((option,i)=><button key={option} onClick={()=>setSelected(i)} className={selected===i?(i===chapter.quiz.answer?"correct":"incorrect"):""}><span>{selected===i&&i===chapter.quiz.answer?<Check/>:<Circle/>}</span>{option}</button>)}</div>{selected!==null&&<p className="quiz-explanation">{selected===chapter.quiz.answer?t("correct"):t("incorrect")}{chapter.quiz.explanation}</p>}</section><section className="chapter-finish"><button onClick={complete} className={done?"done":""}>{done?<Check/>:<Circle/>}{done?t("completed"):t("markComplete")}</button><div>{previous&&<Link href={href(previous)}><ArrowLeft/>{t("previous")}</Link>}<Link href="/learn">{t("contents")}</Link>{next&&<Link href={href(next)}>{t("next")}<ArrowRight/></Link>}</div></section></>;
}
