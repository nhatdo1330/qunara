import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { MeditationStudio } from "./practice-client";
import { WaveOfThoughts } from "@/components/practice/wave-of-thoughts";
import { PathOfSeeingLaunch } from "@/components/practice/path-of-seeing/path-of-seeing-launch";

export async function generateMetadata():Promise<Metadata>{
  const vi=(await getLocale())==="vi";
  return {title:vi?"Phòng thiền":"Meditation Studio",description:vi?"Một không gian thiền yên tĩnh với đồng hồ, âm thanh nền và lịch sử lưu trên thiết bị.":"A quiet meditation studio with a timer, ambient sound, reflection, and private on-device history."};
}
export default async function Practice(){const locale=(await getLocale())==="vi"?"vi":"en";return <><MeditationStudio/><PathOfSeeingLaunch locale={locale}/><WaveOfThoughts/></>}
