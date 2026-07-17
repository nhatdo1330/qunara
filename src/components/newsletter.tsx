"use client";

import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

export function Newsletter(){
  const [done,setDone]=useState(false);
  const t=useTranslations("newsletter");
  const buttons=useTranslations("buttons");
  function submit(event:FormEvent){event.preventDefault();setDone(true)}
  return <section className="border-y border-white/10"><div className="shell grid gap-8 py-16 md:grid-cols-2 md:items-end"><div><p className="kicker">{t("eyebrow")}</p><h2 className="mt-4 max-w-xl font-serif text-4xl text-ivory sm:text-5xl">{t("title")}</h2></div>{done?<p className="flex items-center gap-3 text-sm text-gold"><Check size={18}/> {t("success")}</p>:<form onSubmit={submit} className="flex border-b border-white/30 pb-2 focus-within:border-gold"><label className="sr-only" htmlFor="email">{t("emailLabel")}</label><input required type="email" id="email" placeholder={t("emailPlaceholder")} className="w-full bg-transparent text-sm outline-none placeholder:text-mist"/><button className="icon-button border-0 text-gold" aria-label={buttons("subscribe")}><ArrowRight size={20}/></button></form>}</div></section>;
}
