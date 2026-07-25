import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ExploreExperience } from "@/components/explore/explore-experience";
import { VietnameseExploreExperience } from "@/components/explore/vietnamese-explore-experience";
import {VietnameseManyWorldsInvestigation} from "@/components/explore/vietnamese-many-worlds-investigation";
import {VietnameseLifeInWaterInvestigation} from "@/components/explore/vietnamese-life-in-water-investigation";
import {VietnameseImpermanenceInvestigation} from "@/components/explore/vietnamese-impermanence-investigation";
import { defaultLocale, isLocale } from "@/i18n/config";
import { vietnameseExplore } from "@/lib/explore-localized-content";

export async function generateMetadata():Promise<Metadata>{
  const requested=await getLocale();
  const locale=isLocale(requested)?requested:defaultLocale;
  if(locale==="vi") return {title:vietnameseExplore.metadata.title,description:vietnameseExplore.metadata.description,keywords:vietnameseExplore.metadata.keywords,alternates:{canonical:"/vi/kham-pha",languages:{en:"/en/explore",vi:"/vi/kham-pha"}},openGraph:{title:vietnameseExplore.metadata.title,description:vietnameseExplore.metadata.description,locale:"vi_VN",type:"website"},twitter:{card:"summary_large_image",title:vietnameseExplore.metadata.title,description:vietnameseExplore.metadata.description}};
  return {
    title:"Explore",
    description:"An interactive museum exploring ancient Buddhist questions, modern science, quantum physics, consciousness, and the boundaries between them.",
    alternates:{canonical:"/en/explore",languages:{en:"/en/explore",vi:"/vi/kham-pha"}}
  };
}
export default async function Explore(){const locale=await getLocale();return locale==="vi"?<VietnameseExploreExperience excludeIds={["many-worlds","water","impermanence"]} featured={<><section id="vi-many-worlds" className="vi-featured-investigation"><VietnameseManyWorldsInvestigation/></section><section id="vi-water" className="vi-featured-investigation"><VietnameseLifeInWaterInvestigation/></section><section id="vi-impermanence" className="vi-featured-investigation"><VietnameseImpermanenceInvestigation/></section></>}/>:<ExploreExperience/>}
