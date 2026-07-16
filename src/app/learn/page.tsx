import type { Metadata } from "next";
import { LearnPaths } from "./learn-paths";
export const metadata:Metadata={title:"Learn",description:"Two structured twelve-chapter journeys through quantum physics and Buddhist philosophy."};
export default function Learn(){return <LearnPaths/>}
