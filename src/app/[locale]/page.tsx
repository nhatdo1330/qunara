import type { Metadata } from "next";

import HomePage, { generateMetadata as generateHomeMetadata } from "../page";

export default function LocalizedHome() {
  return <HomePage />;
}

export function generateMetadata(): Promise<Metadata> {
  return generateHomeMetadata();
}
