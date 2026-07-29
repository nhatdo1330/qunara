import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { MeditationStudio } from "./practice-client";
import { WaveOfThoughts } from "@/components/practice/wave-of-thoughts";

export async function generateMetadata():Promise<Metadata>{
  const vi=(await getLocale())==="vi";
  return {title:vi?"Phòng thiền":"Meditation Studio",description:vi?"Một không gian thiền yên tĩnh với đồng hồ, âm thanh nền và lịch sử lưu trên thiết bị.":"A quiet meditation studio with a timer, ambient sound, reflection, and private on-device history."};
}
export default function Practice(){return <><MeditationStudio/><WaveOfThoughts/></>}
