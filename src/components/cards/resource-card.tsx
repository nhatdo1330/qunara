"use client";
import { Bookmark, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Resource } from "@/lib/types";
import { Artwork } from "../art/artwork";
export function ResourceCard({ resource }: { resource:Resource }){
  const [saved,setSaved]=useState(false);
  const t=useTranslations("buttons");
  return <article className="group overflow-hidden rounded-lg border border-white/10 bg-panel/80 transition duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-glow">
    <div className="relative aspect-[16/10] overflow-hidden"><Artwork type={resource.art} className="size-full transition duration-700 group-hover:scale-[1.03]"/><button onClick={()=>setSaved(!saved)} aria-label={saved?t("removeSavedResource"):t("saveResource")} className={`absolute right-3 top-3 icon-button backdrop-blur-md ${saved?"border-gold bg-gold text-midnight":"bg-midnight/70"}`}><Bookmark size={15} fill={saved?"currentColor":"none"}/></button></div>
    <div className="p-5"><div className="mb-4 flex items-center justify-between gap-3"><span className="domain-label">{resource.domain}</span><span className="text-[10px] text-mist">{resource.difficulty}</span></div><h3 className="mb-2 font-serif text-2xl leading-tight text-ivory">{resource.title}</h3><p className="line-clamp-2 min-h-12 text-sm leading-6 text-mist">{resource.description}</p><div className="mt-5 flex flex-wrap gap-2">{resource.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div><div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4"><div className="text-[10px] leading-5 text-mist"><p className="text-ivory/80">{resource.author}</p><p>{resource.source}</p></div><ExternalLink size={15} className="text-gold"/></div></div>
  </article>;
}
