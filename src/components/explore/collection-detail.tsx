import Link from "next/link";
import { ArrowLeft, Clock3, Gauge } from "lucide-react";

import type { InteractiveCard, StoryCard } from "@/lib/explore-collections";
import { CollectionArtwork } from "./explore-discovery-sections";

export function StoryDetail({ story, locale }: { story: StoryCard; locale: string }) {
  return <article className="collection-detail">
    <div className="collection-detail-art"><CollectionArtwork visual={story.visual} kind="story"/></div>
    <div className="q-shell collection-detail-copy">
      <Link href={`/${locale}/explore`}><ArrowLeft/>Explore</Link>
      <p className="q-kicker">{story.category} · {story.readingTime}</p>
      <h1>{story.title}</h1>
      <p>{story.description}</p>
      <aside>This story has been prepared for the Explore collection. Its full editorial narrative will be published here.</aside>
    </div>
  </article>;
}

export function InteractiveDetail({ experience, locale }: { experience: InteractiveCard; locale: string }) {
  return <section className="collection-detail interactive-detail">
    <div className="collection-detail-art"><CollectionArtwork visual={experience.visual} kind="interactive"/></div>
    <div className="q-shell collection-detail-copy">
      <Link href={`/${locale}/explore`}><ArrowLeft/>Explore</Link>
      <p className="q-kicker">Interactive exploration</p>
      <h1>{experience.title}</h1>
      <p>{experience.description}</p>
      <dl><div><dt><Gauge/>Difficulty</dt><dd>{experience.difficulty}</dd></div><div><dt><Clock3/>Exploration time</dt><dd>{experience.explorationTime}</dd></div></dl>
      <aside>The interactive canvas for this experience is being prepared.</aside>
    </div>
  </section>;
}
