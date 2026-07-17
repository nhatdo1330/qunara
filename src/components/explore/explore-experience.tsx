"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ArrowDown,ArrowRight,BookOpen,Compass,FlaskConical } from "lucide-react";
import { ComparisonDisclaimer } from "@/components/comparison-disclaimer";
import { CosmologyInvestigation } from "./cosmology-investigation";
import { DependentOriginationInvestigation } from "./dependent-origination-investigation";
import { EntanglementDialogue } from "./entanglement-dialogue";
import { ExploreArtwork } from "./explore-artwork";
import { ImpermanenceInvestigation } from "./impermanence-investigation";
import { WaterInvestigation } from "./water-investigation";
import { SuperpositionDialogue } from "./superposition-dialogue";
import { VacuumDialogue } from "./vacuum-dialogue";
type Mode="Story"|"Evidence"|"Deep Dive";
const modes:{name:Mode;icon:typeof BookOpen;title:string;text:string}[]=[{name:"Story",icon:BookOpen,title:"Begin with the human story",text:"Meet the people, places, questions, and historical moments that gave each idea its shape."},{name:"Evidence",icon:FlaskConical,title:"Follow what can be supported",text:"Separate canonical sources, experiments, scholarly interpretation, conceptual resonance, and open speculation."},{name:"Deep Dive",icon:Compass,title:"Stay with the difficult parts",text:"Explore longer comparisons, original context, important disagreements, sources, and questions without easy answers."}];
const sections=[{id:"ancient-echoes",number:"01",title:"Many Worlds"},{id:"life-in-water",number:"02",title:"Clear Water"},{id:"impermanence",number:"03",title:"Impermanence"},{id:"dependent-origination",number:"04",title:"Dependent Origination"},{id:"quantum-dialogue",number:"05",title:"Entanglement"},{id:"superposition-dialogue",number:"06",title:"Superposition"},{id:"vacuum-dialogue",number:"07",title:"Emptiness & Vacuum"}];
export function ExploreExperience(){const [mode,setMode]=useState<Mode>("Story");return <MotionConfig reducedMotion="user"><div className="explore-museum"><section className="explore-museum-hero"><ExploreArtwork/><div className="explore-hero-overlay"/><div className="q-shell explore-hero-copy"><motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="q-kicker">Explore</motion.p><motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:.08}}>Ancient Questions.<br/><em>Modern Discoveries.</em></motion.h1><motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.16}}>Buddhist traditions examine experience, suffering, and freedom through teaching and practice. Modern science investigates the physical world through measurement, mathematics, and experiments others can repeat. Here, we compare them without pretending they use the same method.</motion.p><motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.24}}><a href="#ancient-echoes">Explore Ancient Wisdom <ArrowDown/></a><a href="#quantum-dialogue">Explore Quantum Dialogue <ArrowRight/></a></motion.div></div><span className="explore-scroll-mark">Where they resonate · Where they differ · What remains unknown</span></section>
<section className="explore-editorial q-shell"><p className="q-kicker">An editorial promise</p><blockquote>Comparison should deepen both sides of a question—not flatten them into the same answer.</blockquote><div><p>Buddhist traditions and modern science emerged in different times, ask different kinds of questions, and use different standards of evidence. Explore preserves those differences while making room for thoughtful conversation.</p><ComparisonDisclaimer/></div></section>
<section className="explore-modes q-shell"><header><p className="q-kicker">Choose how you enter</p><h2>Three reading lenses.</h2></header><div className="mode-tabs" role="group" aria-label="Exploration mode">{modes.map(({name,icon:Icon})=><button aria-pressed={mode===name} className={mode===name?"active":""} onClick={()=>setMode(name)} key={name}><Icon/>{name}</button>)}</div>{modes.map(m=>m.name===mode&&<motion.article key={m.name} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}><m.icon/><span>{m.name} lens</span><h3>{m.title}</h3><p>{m.text}</p><small>Every investigation includes all three lenses; choose the one that helps you begin.</small></motion.article>)}</section>
<nav className="explore-section-nav" aria-label="Explore sections"><div className="q-shell">{sections.map(s=><a href={`#${s.id}`} key={s.id}><span>{s.number}</span>{s.title}</a>)}</div></nav>
<CosmologyInvestigation/>
<WaterInvestigation/>
<ImpermanenceInvestigation/>
<DependentOriginationInvestigation/>
<EntanglementDialogue/>
<SuperpositionDialogue/>
<VacuumDialogue/>
<section className="explore-phase-cta"><div className="q-shell"><Compass/><p className="q-kicker">Continue the inquiry</p><h2>Keep the wonder.<br/>Make the question precise.</h2><p>Use the learning paths to build the foundations behind these investigations, or bring a carefully framed question to the community.</p><div><Link href="/learn">Build the foundations <ArrowRight/></Link><Link href="/community">Join the community</Link></div></div></section></div></MotionConfig>}
