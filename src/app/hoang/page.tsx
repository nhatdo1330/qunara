import type { Metadata } from "next";

import { HoangPortfolio } from "@/components/hoang/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL("https://hoang.qunara.ai"),
  title: { absolute: "Hoang Do — Software Quality Engineer & AI Systems Builder" },
  description: "Hoang Do builds AI-assisted investigation, testing, evaluation, and load systems, backed by more than 25 years in software engineering and quality.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hoang Do — Engineering systems that find the truth",
    description: "Software quality engineering, AI systems, automation, publications, and interactive project demonstrations.",
    url: "/",
    type: "profile",
    images: [{ url: "/images/hoang/portrait.jpeg", width: 1024, height: 1024, alt: "Portrait of Hoang Do" }],
  },
  twitter: { card: "summary_large_image", title: "Hoang Do — Engineering systems that find the truth", description: "Software quality engineering, AI systems, automation, and interactive project demonstrations.", images: ["/images/hoang/portrait.jpeg"] },
};

export default function HoangPage() { return <HoangPortfolio/>; }
