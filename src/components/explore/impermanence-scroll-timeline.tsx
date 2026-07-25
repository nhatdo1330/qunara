"use client";

import {motion, MotionConfig} from "framer-motion";

export function ImpermanenceScrollTimeline({locale}: {locale: "en" | "vi"}) {
  const labels = locale === "vi"
    ? ["Sinh thành", "Phát triển", "Thay đổi", "Già đi", "Chuyển hóa", "Tái sinh"]
    : ["Birth", "Growth", "Change", "Aging", "Transformation", "Renewal"];

  return <MotionConfig reducedMotion="user"><ol className="anicca-scroll-timeline" aria-label={locale === "vi" ? "Dòng thời gian của thay đổi" : "Timeline of change"}>{labels.map((label, index) => <motion.li key={label} initial={{opacity: 0, y: 22}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: .65}} transition={{duration: .65, delay: index * .06}}><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true"/><b>{label}</b></motion.li>)}</ol></MotionConfig>;
}
