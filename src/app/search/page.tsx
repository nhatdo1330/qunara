import type { Metadata } from "next";
import { SearchClient } from "./search-client";
export const metadata:Metadata={title:"Search",description:"Search all Qunara lessons, practices, comparisons, and research resources."};
export default function SearchPage(){return <><header className="page-hero q-shell search-hero"><p className="q-kicker">Search Qunara</p><h1 className="page-title">What are you<br/>curious about?</h1></header><main className="q-shell search-main"><SearchClient/></main></>}
