import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { VietnameseExploreExperience } from "@/components/explore/vietnamese-explore-experience";
import { getEnglishExploreSlug, getVietnameseInvestigation } from "@/lib/explore-localized-content";

type Props={params:{locale:string;slug:string}};

export function generateMetadata({params}:Props):Metadata{
  const item=getVietnameseInvestigation(params.slug);
  if(!item) return {};
  const title=`${item.title} | Qunara`;
  const description=item.opening;
  const englishSlug=getEnglishExploreSlug(item.slug);
  const hasEnglishEquivalent=englishSlug&&englishSlug!=="measurement";
  return {title,description,keywords:[item.title,item.category,"Qunara"],alternates:{canonical:`/vi/kham-pha/${item.slug}`,languages:{vi:`/vi/kham-pha/${item.slug}`,...(hasEnglishEquivalent?{en:`/en/explore/${englishSlug}`}:{})}},openGraph:{title,description,locale:"vi_VN",type:"article"},twitter:{card:"summary_large_image",title,description}};
}

export default function LocalizedExploreInvestigation({params}:Props){
  if(params.locale==="en") {
    if(params.slug==="measurement") redirect("/en");
    const anchors:Record<string,string>={"many-worlds":"ancient-echoes","life-in-water":"life-in-water",impermanence:"impermanence","dependent-origination":"dependent-origination",entanglement:"quantum-dialogue",superposition:"superposition-dialogue",emptiness:"vacuum-dialogue"};
    redirect(`/en/explore#${anchors[params.slug]??""}`);
  }
  if(params.locale!=="vi"||!getVietnameseInvestigation(params.slug)) notFound();
  return <VietnameseExploreExperience slug={params.slug}/>;
}
