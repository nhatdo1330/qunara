import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { PathOfSeeingExperience } from "@/components/practice/path-of-seeing/path-of-seeing-experience";
import { getInitialReflectionNeighborhood } from "@/lib/path-of-seeing-content";
import { getLotusArtworkCatalog } from "@/lib/path-of-seeing-artworks";

export async function generateMetadata():Promise<Metadata>{const vi=(await getLocale())==="vi";return{title:vi?"Con Đường Thấy Biết":"Path of Seeing",description:vi?"Một trải nghiệm thực hành chiêm nghiệm trong cảnh hồ đêm tĩnh lặng.":"A contemplative practice experience in a quiet night landscape."}}
export default async function PathOfSeeingPage({searchParams}:{searchParams?:{seed?:string;duration?:string}}){
  const sessionSeed=searchParams?.seed?.slice(0,80)||crypto.randomUUID();
  const developmentDuration=process.env.NODE_ENV!=="production"&&searchParams?.duration==="30"?30_000:undefined;
  const [initialNeighborhood,artworks]=await Promise.all([getInitialReflectionNeighborhood(sessionSeed),getLotusArtworkCatalog()]);
  return <PathOfSeeingExperience initialNeighborhood={initialNeighborhood} sessionSeed={sessionSeed} artworks={artworks} initialDuration={developmentDuration}/>;
}
