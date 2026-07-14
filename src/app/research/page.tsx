import type { Metadata } from "next";
import { ResearchClient } from "./research-client";
export const metadata:Metadata={title:"Research Library",description:"Curated books, research papers, courses, experiments, and meditation studies with transparent source labels."};
export default function Research(){return <><header className="page-hero q-shell"><p className="q-kicker">Research library</p><h1 className="page-title">Go deeper.<br/>Know your sources.</h1><p className="research-lead">Books, papers, courses, and experiments selected for clarity, relevance, and reliability. Every item shows where it comes from and how to approach it.</p></header><main className="q-shell research-main"><ResearchClient/></main></>}
