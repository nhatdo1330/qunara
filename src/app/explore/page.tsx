import type { Metadata } from "next";
import { ExploreExperience } from "@/components/explore/explore-experience";
export const metadata:Metadata={title:"Explore",description:"An interactive museum exploring ancient Buddhist questions, modern science, quantum physics, consciousness, and the boundaries between them."};
export default function Explore(){return <ExploreExperience/>}
