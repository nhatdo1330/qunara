import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom, Bot, Braces, CircleDot, Network, Sparkles, Users } from "lucide-react";

export const metadata:Metadata={title:"My Story",description:"The story behind Quantum & Buddhism—from a Buddhist upbringing and software engineering to AI, quantum ideas, and a community of open inquiry."};

const journey=[
  {number:"01",icon:CircleDot,title:"Roots in Buddhism",text:"I grew up with Buddhism as part of everyday life. Its teachings on compassion, impermanence, mindfulness, and the nature of the self shaped how I learned to see the world—and how I learned to look within."},
  {number:"02",icon:Braces,title:"Becoming an engineer",text:"I found another way of understanding reality through software engineering. Building systems taught me to think in structures, relationships, causes, feedback loops, and layers of abstraction. It also taught me humility: even elegant systems can behave in unexpected ways."},
  {number:"03",icon:Bot,title:"Awakening in the AI era",text:"As artificial intelligence began transforming our work and our lives, my questions became more urgent. What is intelligence? What is consciousness? What makes experience meaningful? Technology could imitate more of the mind, but the mystery of awareness remained."},
  {number:"04",icon:Atom,title:"Discovering quantum ideas",text:"My exploration of quantum physics opened a new horizon. I encountered a reality described through probability, measurement, uncertainty, and relationships—not the solid, separate world that common sense seems to present. Some of these themes felt strangely familiar."},
];

const connections=[
  {title:"A relational world",quantum:"Quantum properties are understood through interactions, systems, and measurement contexts.",buddhism:"Dependent origination teaches that things arise through causes and conditions, not in isolation.",note:"Both invite us to question the idea of completely independent things."},
  {title:"Change is fundamental",quantum:"At the smallest scales, physical reality is dynamic, probabilistic, and continually interacting.",buddhism:"Impermanence describes all conditioned experience as changing from moment to moment.",note:"Both replace the image of a fixed world with one of process and transformation."},
  {title:"Limits of ordinary perception",quantum:"Quantum phenomena resist the categories and intuitions formed by everyday experience.",buddhism:"Meditative inquiry examines how perception and mental habits construct our experience of reality.",note:"Both ask us to look beyond first impressions, using very different methods."},
  {title:"The observer question",quantum:"Measurement is essential to how quantum predictions connect with observable outcomes.",buddhism:"Mindfulness places careful observation at the center of understanding lived experience.",note:"The parallel is thought-provoking, but consciousness is not required by standard quantum theory."},
];

export default function About(){return <div className="story-page">
  <header className="story-hero">
    <div className="story-orbit" aria-hidden="true"><i/><i/><i/><span/></div>
    <div className="story-hero-inner">
      <p className="story-eyebrow">The story behind this community</p>
      <h1>Where my two worlds<br/><em>began to meet.</em></h1>
      <p className="story-lead">I grew up with the wisdom of Buddhism. I became a software engineer in a world reshaped by AI. Then quantum physics gave me a new language for questions I had carried for years.</p>
      <Link href="#journey" className="story-link">Read my journey <ArrowRight/></Link>
    </div>
  </header>

  <section className="story-intro">
    <p className="story-section-label">Why I created this space</p>
    <blockquote>“I am not trying to prove that Buddhism predicted quantum physics. I am exploring how two very different traditions can illuminate some of the same profound questions.”</blockquote>
    <p>One begins with mathematics, experiments, and predictions about the physical world. The other begins with direct experience, ethical practice, and the investigation of mind. They are not the same, and their differences matter. Yet where they echo one another, I find a powerful invitation to stay curious.</p>
  </section>

  <section className="journey-section" id="journey">
    <div className="story-section-head"><p className="story-section-label">My path</p><h2>From inherited wisdom<br/>to an open inquiry.</h2></div>
    <div className="journey-list">{journey.map(({number,icon:Icon,title,text})=><article key={number}><span className="journey-number">{number}</span><span className="journey-icon"><Icon/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
  </section>

  <section className="connections-section">
    <div className="story-section-head"><p className="story-section-label">Shared questions, different paths</p><h2>Connections worth<br/>exploring carefully.</h2><p>These are resonances, not scientific equivalences. They offer starting points for dialogue—not shortcuts to certainty.</p></div>
    <div className="connection-grid">{connections.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><div className="comparison"><p><b><Atom/> Quantum lens</b>{item.quantum}</p><p><b><Sparkles/> Buddhist lens</b>{item.buddhism}</p></div><footer>{item.note}</footer></article>)}</div>
  </section>

  <section className="community-callout">
    <Network className="community-network"/>
    <div><p className="story-section-label">The next chapter</p><h2>Let’s explore the mystery together.</h2><p>I am building a community for scientists, engineers, practitioners, philosophers, and curious minds. A place where we can learn without pretending to have all the answers, compare ideas without collapsing their differences, and bring both clear thinking and compassion to the unknown.</p><div className="community-actions"><Link href="/contact">Join the community <Users/></Link><Link href="/explore">Explore resources <ArrowRight/></Link></div></div>
  </section>
</div>}
