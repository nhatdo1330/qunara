import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { VietnameseExploreExperience } from "@/components/explore/vietnamese-explore-experience";
import {VietnameseManyWorldsInvestigation} from "@/components/explore/vietnamese-many-worlds-investigation";
import {VietnameseLifeInWaterInvestigation} from "@/components/explore/vietnamese-life-in-water-investigation";
import {VietnameseImpermanenceInvestigation} from "@/components/explore/vietnamese-impermanence-investigation";
import {loadExploreMarkdown} from "@/lib/explore-markdown";
import { getEnglishExploreSlug, getVietnameseInvestigation } from "@/lib/explore-localized-content";

type Props={params:{locale:string;slug:string}};

export function generateMetadata({params}:Props):Metadata{
  if(params.locale==="vi"&&params.slug==="tam-thien-dai-thien-the-gioi"){
    const article=loadExploreMarkdown("many-worlds","vi");
    const title=`${article.metadata.title} | Qunara`;
    const description=article.metadata.summary;
    return {title,description,keywords:[article.metadata.title,"Tam Thiên Đại Thiên Thế Giới","Qunara"],alternates:{canonical:"/vi/kham-pha/tam-thien-dai-thien-the-gioi",languages:{en:"/en/explore/many-worlds",vi:"/vi/kham-pha/tam-thien-dai-thien-the-gioi"}},openGraph:{title,description,locale:"vi_VN",type:"article"},twitter:{card:"summary_large_image",title,description}};
  }
  if(params.locale==="vi"&&params.slug==="sinh-mang-trong-mot-chen-nuoc"){
    const article=loadExploreMarkdown("life-in-water","vi");
    const title=`${article.metadata.title} | Qunara`;
    const description=article.title;
    return {title,description,alternates:{canonical:"/vi/kham-pha/sinh-mang-trong-mot-chen-nuoc",languages:{en:"/en/explore/life-in-water",vi:"/vi/kham-pha/sinh-mang-trong-mot-chen-nuoc"}},openGraph:{title,description,locale:"vi_VN",type:"article"},twitter:{card:"summary_large_image",title,description}};
  }
  if(params.locale==="vi"&&params.slug==="vo-thuong"){
    const article=loadExploreMarkdown("impermanence","vi");
    const title=`${article.title} | Qunara`;
    return {title,description:article.title,alternates:{canonical:"/vi/kham-pha/vo-thuong",languages:{en:"/en/explore/impermanence",vi:"/vi/kham-pha/vo-thuong"}},openGraph:{title,description:article.title,locale:"vi_VN",type:"article"},twitter:{card:"summary_large_image",title,description:article.title}};
  }
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
  if(params.slug==="tam-thien-dai-thien-the-gioi") return <VietnameseManyWorldsInvestigation/>;
  if(params.slug==="sinh-mang-trong-mot-chen-nuoc") return <VietnameseLifeInWaterInvestigation/>;
  if(params.slug==="vo-thuong") return <VietnameseImpermanenceInvestigation/>;
  return <VietnameseExploreExperience slug={params.slug}/>;
}
