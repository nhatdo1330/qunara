import type {Metadata} from "next";

import LearnPage, {generateMetadata as generateLearnMetadata} from "../../learn/page";

export default function LocalizedLearnPage() {
  return <LearnPage />;
}

export function generateMetadata(): Promise<Metadata> {
  return generateLearnMetadata();
}
