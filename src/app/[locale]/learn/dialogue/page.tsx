import type {Metadata} from "next";

import Dialogue from "../../../learn/dialogue/page";

export function generateMetadata({params}: {params: {locale: string}}): Metadata {
  return params.locale === "vi" ? {
    title: "Đối thoại giữa Vật lý Lượng tử và Triết học Phật giáo",
    description: "Mười cuộc đối thoại giữ rõ điểm tương đồng, khác biệt và giới hạn của bằng chứng.",
    alternates: {canonical: "/vi/hoc/doi-thoai", languages: {en: "/en/learn/dialogue", vi: "/vi/hoc/doi-thoai"}},
  } : {
    title: "The Dialogue",
    description: "An intellectually honest dialogue between quantum physics and Buddhist philosophy.",
  };
}

export default function LocalizedDialogue() {
  return <Dialogue />;
}
