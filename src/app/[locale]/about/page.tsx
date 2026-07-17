import type { Metadata } from "next";

import AboutPage, { generateMetadata as generateAboutMetadata } from "../../about/page";

export default function LocalizedAbout() {
  return <AboutPage />;
}

export function generateMetadata(): Promise<Metadata> {
  return generateAboutMetadata();
}
