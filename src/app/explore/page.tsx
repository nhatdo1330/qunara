import type { Metadata } from "next"; import { ExploreClient } from "./explore-client";
export const metadata:Metadata={title:"Explore",description:"Search and filter Qunara's curated knowledge library."};
export default function ExplorePage(){return <><header className="page-hero pb-12 sm:pb-14"><p className="kicker">Knowledge library</p><h1 className="page-title mt-6">Explore with clarity.</h1><p className="mt-7 max-w-xl text-sm leading-7 text-mist">Search evidence, philosophy, comparative interpretation, and reflection. Every resource is labeled by domain.</p></header><ExploreClient/></>}
