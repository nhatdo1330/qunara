import type { Metadata } from "next";
import {getLocale,getTranslations} from "next-intl/server";
import { LearnPaths } from "./learn-paths";
import {VietnameseLearnPaths} from "@/components/learn/vietnamese-learn-paths";
export async function generateMetadata():Promise<Metadata>{const locale=await getLocale();if(locale==="vi"){const t=await getTranslations("learn");return{title:t("metadataTitle"),description:t("metadataDescription"),alternates:{canonical:"/vi/hoc",languages:{en:"/en/learn",vi:"/vi/hoc"}},openGraph:{title:t("metadataTitle"),description:t("metadataDescription"),locale:"vi_VN",type:"website"},twitter:{card:"summary_large_image",title:t("metadataTitle"),description:t("metadataDescription")}}}return{title:"Learn",description:"Two structured twelve-chapter journeys through quantum physics and Buddhist philosophy.",alternates:{canonical:"/en/learn",languages:{en:"/en/learn",vi:"/vi/hoc"}}}}
export default async function Learn(){return await getLocale()==="vi"?<VietnameseLearnPaths/>:<LearnPaths/>}
