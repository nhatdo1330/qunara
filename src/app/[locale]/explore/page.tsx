import type { Metadata } from "next";
import ExplorePage,{generateMetadata as generateExploreMetadata} from "../../explore/page";

export default function LocalizedExplore(){return <ExplorePage/>}
export function generateMetadata():Promise<Metadata>{return generateExploreMetadata()}
