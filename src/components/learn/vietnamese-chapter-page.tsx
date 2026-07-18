import {BookOpen,Clock3,Lightbulb,MessageCircle,Quote,Sparkles,TriangleAlert} from "lucide-react";
import {getTranslations} from "next-intl/server";

import {EvidenceBadge} from "@/components/evidence-badge";
import {Link} from "@/i18n/navigation";
import type {LocalizedChapter} from "@/lib/learn-localized-content";
import {LearnIllustration} from "./learn-illustration";
import {VietnameseLessonActions} from "./vietnamese-lesson-actions";
import {VietnameseReaderTools} from "./vietnamese-reader-tools";

export async function VietnameseChapterPage({chapter,chapters}:{chapter:LocalizedChapter;chapters:LocalizedChapter[]}){
  const t=await getTranslations("learn");const index=chapters.findIndex(item=>item.slug===chapter.slug);const previous=chapters[index-1],next=chapters[index+1];
  return <main className="chapter-page"><VietnameseReaderTools chapter={chapter}/><header className="chapter-hero"><LearnIllustration path={chapter.path} chapter={chapter.number}/><div className="chapter-hero-wash"/><div className="q-shell"><p>{chapter.path==="quantum"?t("quantumPath"):t("buddhismPath")} · {t("chapter")} {chapter.number}</p><h1>{chapter.question}</h1><blockquote>{chapter.subtitle}</blockquote><span><Clock3/>{t("readingTime")} · {t("minutes",{count:chapter.minutes})} · {t("foundation")}</span></div></header><article className="chapter-book"><aside className="chapter-margin"><span>{String(chapter.number).padStart(2,"0")}</span><p>{chapter.topics.join(" · ")}</p></aside><div className="chapter-body">
  <section className="chapter-care"><p className="chapter-label">{t("whyCare")}</p><h2>{t("careTitle")}</h2><p className="chapter-dropcap">{chapter.whyCare}</p></section>
  <section className="chapter-story"><p className="chapter-label">{t("story")}</p><h2>{t("storyTitle")}</h2><p className="chapter-dropcap">{chapter.history}</p><blockquote>{chapter.example}</blockquote></section>
  <section><p className="chapter-label">{t("simple")}</p><h2>{t("simpleTitle")}</h2><p className="chapter-dropcap">{chapter.lesson[0]}</p><aside className="lesson-plain-language"><Lightbulb/><p><b>{t("plain")}</b>{chapter.takeaways[0]}</p></aside></section>
  <figure className="chapter-illustration"><LearnIllustration path={chapter.path} chapter={chapter.number}/><figcaption>{t("illustration")}</figcaption></figure>
  <section><div className="chapter-section-heading"><EvidenceBadge kind="Historical context" label={t("history")}/><h2>{t("historyTitle")}</h2></div><div className="chapter-timeline"><span>{t("before")}</span><p>{chapter.path==="quantum"?"Bức tranh cũ giải thích tốt thế giới nhìn thấy, nhưng một số quan sát không chịu nằm trong đó.":"Các vị thầy kế thừa câu hỏi Ấn Độ cổ rồi thử chúng qua tranh luận, cộng đồng và thực hành quán chiếu."}</p><span>{t("turning")}</span><p>{chapter.history}</p><span>{t("now")}</span><p>{chapter.takeaways[1]}</p></div></section>
  <section className="chapter-deep"><p className="chapter-label">{t("deep")}</p><h2>{t("deepTitle")}</h2><p className="chapter-dropcap">{chapter.lesson[1]||chapter.lesson[0]}</p><p>{chapter.path==="quantum"?"Toán học làm các ranh giới trở nên chính xác. Bạn chưa cần phương trình, nhưng cần biết khẳng định khoa học hẹp hơn và mạnh hơn phép ẩn dụ phổ thông.":"Các trường phái Phật giáo phát triển nhiều cách đọc. Bài học nêu sợi chỉ chung mà không giả vờ mọi truyền thống nói cùng một giọng."}</p></section>
  <section className="chapter-misunderstanding"><TriangleAlert/><div><p className="chapter-label">{t("misunderstanding")}</p><h2>{t("shortcut")}</h2><p>{chapter.misunderstanding}</p></div></section>
  <section className="chapter-matters"><Sparkles/><div><p className="chapter-label">{t("matters")}</p><h2>{t("mattersTitle")}</h2><ul>{chapter.takeaways.map(item=><li key={item}>{item}</li>)}</ul></div></section>
  <section className="chapter-reflection"><Quote/><p className="chapter-label">{t("reflection")}</p>{chapter.reflection.map(item=><blockquote key={item}>{item}</blockquote>)}</section>
  <section className="chapter-practice"><p className="chapter-label">{t("practice")}</p><h2>{t("practiceTitle")}</h2><p>{chapter.practice}</p><Link href="/practice">{t("practiceLink")}</Link></section>
  <section className="chapter-discussion"><MessageCircle/><div><p className="chapter-label">{t("discussion")}</p><h2>{t("discussionTitle")}</h2><blockquote>{chapter.discussion}</blockquote><Link href="/community">{t("communityLink")}</Link></div></section>
  <section className="chapter-takeaways"><p className="chapter-label">{t("takeaways")}</p><h2>{t("takeawaysTitle")}</h2><ol>{chapter.takeaways.map((item,i)=><li key={item}><span>{String(i+1).padStart(2,"0")}</span>{item}</li>)}</ol></section>
  <section className="chapter-sources"><div><BookOpen/><p className="chapter-label">{t("books")}</p>{chapter.books.map(item=><p key={item}>{item}</p>)}</div><div><BookOpen/><p className="chapter-label">{t("sources")}</p>{chapter.references.map(item=><p key={item}>{item}</p>)}</div></section>
  <section className="chapter-glossary"><p className="chapter-label">{t("glossary")}</p><h2>{t("glossaryTitle")}</h2><dl>{chapter.glossary.map(([term,meaning])=><div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl></section>
  <VietnameseLessonActions chapter={chapter} previous={previous} next={next}/></div></article></main>;
}
