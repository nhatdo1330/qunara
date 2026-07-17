"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

export function SearchBar({value,onChange}:{value:string;onChange:(value:string)=>void}){
  const t=useTranslations("searchBar");
  return <label className="flex h-14 items-center gap-3 rounded-lg border border-white/15 bg-white/[.035] px-4 transition focus-within:border-gold/60"><Search size={19} className="text-gold" aria-hidden="true"/><span className="sr-only">{t("label")}</span><input value={value} onChange={event=>onChange(event.target.value)} className="w-full bg-transparent text-sm text-ivory outline-none placeholder:text-mist/60" placeholder={t("placeholder")}/>{value&&<button onClick={()=>onChange("")} aria-label={t("clear")}><X size={16}/></button>}</label>;
}
