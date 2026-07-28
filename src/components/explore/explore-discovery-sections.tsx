import Link from "next/link";
import { ArrowRight, Clock3, Gauge } from "lucide-react";

import type { InteractiveCard, StoryCard } from "@/lib/explore-collections";

type Props = {
  stories: StoryCard[];
  interactive: InteractiveCard[];
  locale: string;
};

const copy = {
  en: {
    stories: "Stories",
    storiesSubtitle: "Personal journeys, historical moments and inspiring discoveries.",
    open: "Open story",
    interactive: "Interactive Explorations",
    interactiveSubtitle: "Explore ideas with your eyes, your hands and your curiosity.",
    experience: "Open experience",
  },
  vi: {
    stories: "Câu chuyện",
    storiesSubtitle: "Những hành trình cá nhân, khoảnh khắc lịch sử và khám phá truyền cảm hứng.",
    open: "Đọc câu chuyện",
    interactive: "Khám phá tương tác",
    interactiveSubtitle: "Khám phá ý tưởng bằng đôi mắt, đôi tay và sự tò mò của bạn.",
    experience: "Mở trải nghiệm",
  },
};

export function ExploreDiscoverySections({ stories, interactive, locale }: Props) {
  const labels = locale === "vi" ? copy.vi : copy.en;
  return <div className="explore-discovery">
    <section className="explore-collection q-shell" id="stories" aria-labelledby="stories-heading">
      <header className="explore-collection-heading">
        <p className="q-kicker">Editorial narratives</p>
        <h2 id="stories-heading">{labels.stories}</h2>
        <p>{labels.storiesSubtitle}</p>
      </header>
      <div className="explore-card-grid">
        {stories.map((story) => <Link className="story-card" href={`/${locale}/stories/${story.slug}`} key={story.slug}>
          <CollectionArtwork visual={story.visual} kind="story"/>
          <div className="story-card-copy">
            <span>{story.category}</span>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
            <footer><small><Clock3/>{story.readingTime}</small><b>{labels.open}<ArrowRight/></b></footer>
          </div>
        </Link>)}
      </div>
    </section>

    <section className="explore-collection interactive-collection q-shell" aria-labelledby="interactive-heading">
      <header className="explore-collection-heading">
        <p className="q-kicker">Visual laboratory</p>
        <h2 id="interactive-heading">{labels.interactive}</h2>
        <p>{labels.interactiveSubtitle}</p>
      </header>
      <div className="explore-card-grid">
        {interactive.map((experience) => <Link className="interactive-card" href={`/${locale}/interactive/${experience.slug}`} key={experience.slug}>
          <CollectionArtwork visual={experience.visual} kind="interactive"/>
          <div className="interactive-card-copy">
            <h3>{experience.title}</h3>
            <p>{experience.description}</p>
            <dl><div><dt><Gauge/>Difficulty</dt><dd>{experience.difficulty}</dd></div><div><dt><Clock3/>Time</dt><dd>{experience.explorationTime}</dd></div></dl>
            <b>{labels.experience}<ArrowRight/></b>
          </div>
        </Link>)}
      </div>
    </section>
  </div>;
}

export function CollectionArtwork({ visual, kind }: { visual: string; kind: "story" | "interactive" }) {
  const seed = visual.split("").reduce((total, letter) => total + letter.charCodeAt(0), 0);
  const hue = kind === "story" ? "#d3a969" : "#9a91d1";
  return <svg className="collection-artwork" viewBox="0 0 640 400" role="img" aria-label="">
    <defs>
      <linearGradient id={`${kind}-${visual}-bg`} x2="1" y2="1"><stop stopColor={kind === "story" ? "#253b3b" : "#172039"}/><stop offset="1" stopColor="#07111f"/></linearGradient>
      <radialGradient id={`${kind}-${visual}-light`}><stop stopColor={hue} stopOpacity=".5"/><stop offset="1" stopColor={hue} stopOpacity="0"/></radialGradient>
    </defs>
    <rect width="640" height="400" fill={`url(#${kind}-${visual}-bg)`}/>
    <circle cx={390 + seed % 90} cy={165 + seed % 55} r="175" fill={`url(#${kind}-${visual}-light)`}/>
    {visual === "mobius" ? <path d="M150 210C210 70 390 80 475 187c74 94-36 174-151 92-85-60-33-158 73-119 83 30 78 112 18 155" fill="none" stroke={hue} strokeWidth="18" strokeLinecap="round" opacity=".78"/>
      : visual === "network" || visual === "bell" ? <g stroke={hue} fill="#07111f">{[[155,120],[320,76],[480,140],[210,290],[420,302],[320,205]].map(([x,y],index)=><g key={index}>{[[155,120],[320,76],[480,140],[210,290],[420,302],[320,205]].slice(index+1).map(([x2,y2],offset)=><line key={offset} x1={x} y1={y} x2={x2} y2={y2} opacity=".22"/>)}<circle cx={x} cy={y} r={index===5?18:8}/></g>)}</g>
      : visual === "wave" || visual === "perception" ? <g fill="none" stroke={hue}>{[0,1,2,3,4].map((line)=><path key={line} d={`M60 ${155+line*24}C170 ${45+line*28} 250 ${310-line*15} 355 ${165+line*19}S520 ${70+line*30} 610 ${185+line*12}`} opacity={.18+line*.12}/>)}</g>
      : visual === "fractal" ? <FractalBranch hue={hue}/>
      : <g fill="none" stroke={hue}><path d="M75 310Q205 130 325 240T595 105" strokeWidth="2"/><circle cx="325" cy="240" r="72" opacity=".45"/><circle cx="325" cy="240" r="120" opacity=".18"/></g>}
    <g fill="#f0cd79">{Array.from({length:18},(_,index)=><circle key={index} cx={30+(index*97+seed)%580} cy={25+(index*61+seed)%340} r={index%7===0?2:1} opacity={.2+(index%4)*.13}/>)}</g>
  </svg>;
}

function FractalBranch({ hue }: { hue: string }) {
  return <g fill="none" stroke={hue} strokeLinecap="round"><path d="M320 365V205M320 245L225 145M320 245l100-105M225 145l-68-62m68 62 5-91m190 86 70-66m-70 66-2-93" strokeWidth="7"/><path d="M157 83l-62-20m62 20-14-52m87 23-38-40m298 60 54-27m-54 27 11-49m-83 22-36-37" strokeWidth="4" opacity=".7"/></g>;
}
