import buddhism from "../../content/vi/learn/buddhism.json";
import quantum from "../../content/vi/learn/quantum.json";
import glossary from "../../content/vi/learn/glossary.json";
import dialogue from "../../content/vi/learn/dialogue.json";
import { buddhismChapters, quantumChapters, type Chapter, type PathSlug } from "./learn-content";

type VietnameseText = {
  number:number;englishSlug:string;slug:string;title:string;subtitle:string;topics:string[];
  question:string;whyCare:string;history:string;lesson:string[];example:string;misunderstanding:string;
  reflection:string[];takeaways:string[];glossary:[string,string][];practice:string;discussion:string;
  quiz:Chapter["quiz"];
};

export type LocalizedChapter=Chapter&{englishSlug:string;question:string;whyCare:string;practice:string;discussion:string};

function merge(path:PathSlug,texts:VietnameseText[],english:Chapter[]):LocalizedChapter[]{
  return texts.map(text=>{
    const source=english.find(item=>item.slug===text.englishSlug);
    if(!source) throw new Error(`Missing English lesson for ${text.englishSlug}`);
    return {...source,...text,path,books:source.books,references:source.references} as LocalizedChapter;
  });
}

export const vietnameseQuantumChapters=merge("quantum",quantum as unknown as VietnameseText[],quantumChapters);
export const vietnameseBuddhismChapters=merge("buddhism",buddhism as unknown as VietnameseText[],buddhismChapters);
export const vietnameseChapters=[...vietnameseQuantumChapters,...vietnameseBuddhismChapters];
export const vietnameseGlossary=glossary;
export const vietnameseDialogueTopics=dialogue;

export const vietnamesePathSlugs={quantum:"vat-ly-luong-tu",buddhism:"phat-hoc"} as const;

export function getVietnameseChapter(path:string,slug:string){
  const canonicalPath=path==="vat-ly-luong-tu"?"quantum":path==="phat-hoc"?"buddhism":path;
  return vietnameseChapters.find(chapter=>chapter.path===canonicalPath&&chapter.slug===slug);
}

export function getVietnameseSlug(path:string,englishSlug:string){
  return vietnameseChapters.find(chapter=>chapter.path===path&&chapter.englishSlug===englishSlug)?.slug;
}

export function getEnglishSlug(path:string,vietnameseSlug:string){
  return vietnameseChapters.find(chapter=>chapter.path===path&&chapter.slug===vietnameseSlug)?.englishSlug;
}
