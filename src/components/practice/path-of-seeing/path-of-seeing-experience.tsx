"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { selectReflectionChildren, type TraversalContext } from "@/lib/path-of-seeing-traversal";
import { selectLotusArtwork } from "@/lib/path-of-seeing-artwork-selection";
import type { ReflectionNeighborhood, ReflectionNodeData } from "@/types/path-of-seeing-batch";
import type { LotusArtwork } from "@/types/path-of-seeing-artwork";
import { useAmbientAudioController } from "./ambient-audio-controller";
import { BreathingGuide } from "./breathing-guide";
import { ConstellationStage } from "./constellation-stage";
import { supportsHaptics, triggerLightHaptic } from "./haptic-controller";
import { LotusReveal } from "./lotus-reveal";
import { pathOfSeeingConfig, pathOfSeeingCopy, type PathLocale, type SessionDuration } from "./path-of-seeing-config";
import { useSessionController } from "./session-controller";
import { useBreathingReminder } from "./use-breathing-reminder";
import { canSelectReflection } from "./interaction-state";
import styles from "./path-of-seeing.module.css";

export function PathOfSeeingExperience({initialNeighborhood,sessionSeed,artworks,initialDuration}:{initialNeighborhood:ReflectionNeighborhood;sessionSeed:string;artworks:LotusArtwork[];initialDuration?:SessionDuration}){
  const locale=(useLocale()==="vi"?"vi":"en") as PathLocale,t=pathOfSeeingCopy[locale];
  const [duration,setDuration]=useState<SessionDuration>(initialDuration??pathOfSeeingConfig.defaultDuration),[soundEnabled,setSoundEnabled]=useState(true),[hapticEnabled,setHapticEnabled]=useState(false),[hapticSupported,setHapticSupported]=useState(false),[settingsLoaded,setSettingsLoaded]=useState(false);
  useEffect(()=>{const supported=supportsHaptics(navigator);setHapticSupported(supported);setHapticEnabled(supported);if(!initialDuration){const saved=Number(window.localStorage.getItem("path-of-seeing:duration"));if(pathOfSeeingConfig.durations.includes(saved as SessionDuration))setDuration(saved as SessionDuration)}const sound=window.localStorage.getItem("path-of-seeing:sound");if(sound!==null)setSoundEnabled(sound==="on");setSettingsLoaded(true)},[initialDuration]);
  useEffect(()=>{if(!settingsLoaded)return;if(duration!==pathOfSeeingConfig.developmentTestDuration)window.localStorage.setItem("path-of-seeing:duration",String(duration));window.localStorage.setItem("path-of-seeing:sound",soundEnabled?"on":"off")},[duration,soundEnabled,settingsLoaded]);
  return <PathSession key={duration} locale={locale} duration={duration} setDuration={setDuration} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} hapticEnabled={hapticEnabled} setHapticEnabled={setHapticEnabled} hapticSupported={hapticSupported} copy={t} initialNeighborhood={initialNeighborhood} sessionSeed={`${sessionSeed}:${duration}`} artworks={artworks}/>;
}

function traversalContext(seed:string,step:number,recentIds:string[],themes:string[],stages:string[]):TraversalContext{
  return {seed,step,recentNodeIds:recentIds,recentThemes:themes,recentStages:stages,maxIntensity:"gentle"};
}

function PathSession({locale,duration,setDuration,soundEnabled,setSoundEnabled,hapticEnabled,setHapticEnabled,hapticSupported,copy:t,initialNeighborhood,sessionSeed,artworks}:{locale:PathLocale;duration:SessionDuration;setDuration:(duration:SessionDuration)=>void;soundEnabled:boolean;setSoundEnabled:(value:boolean)=>void;hapticEnabled:boolean;setHapticEnabled:(value:boolean)=>void;hapticSupported:boolean;copy:(typeof pathOfSeeingCopy)[PathLocale];initialNeighborhood:ReflectionNeighborhood;sessionSeed:string;artworks:LotusArtwork[]}){
  const initialMap=new Map(initialNeighborhood.nodes.map(node=>[node.id,node]));
  const initialFocus=initialMap.get(initialNeighborhood.focusId)??initialNeighborhood.nodes[0];
  const initialRelated=selectReflectionChildren(initialFocus,initialNeighborhood.nodes,initialNeighborhood.fallbackIds,traversalContext(sessionSeed,0,[],[],[]));
  const session=useSessionController(duration),audio=useAmbientAudioController(),[focus,setFocus]=useState(initialFocus),[related,setRelated]=useState(initialRelated),[historical,setHistorical]=useState<string[]>([]),[selected,setSelected]=useState<string|null>(null),[breathing,setBreathing]=useState(true),[artworkRound,setArtworkRound]=useState(0),[artwork,setArtwork]=useState<LotusArtwork|null>(()=>selectLotusArtwork(artworks,sessionSeed)),[showFinalReflection,setShowFinalReflection]=useState(false),selectionTimer=useRef<number>(),bellTimer=useRef<number>(),step=useRef(0),recentIds=useRef<string[]>([]),recentThemes=useRef<string[]>([]),recentStages=useRef<string[]>([]),finalHaptic=useRef(false);
  const breathingVisible=useBreathingReminder(breathing&&session.phase==="active"&&!selected);
  const {muted,setMuted,begin:beginAudio,stop:stopAudio,markInteraction,playBell,playSelection,playReveal,elements:audioElements}=audio;
  useEffect(()=>setMuted(!soundEnabled),[soundEnabled,setMuted]);
  useEffect(()=>{const previous=typeof window!=="undefined"?window.sessionStorage.getItem("path-of-seeing:last-artwork"):null,next=selectLotusArtwork(artworks,`${sessionSeed}:${artworkRound}`,previous);setArtwork(next);if(next)window.sessionStorage.setItem("path-of-seeing:last-artwork",next.id)},[artworkRound,artworks,sessionSeed]);
  useEffect(()=>{if(session.phase!=="quieting"||!artwork)return;const image=new Image();image.src=window.matchMedia("(orientation: portrait)").matches?artwork.portraitUrl:artwork.landscapeUrl},[session.phase,artwork]);
  useEffect(()=>{if(session.phase!=="active")return;const schedule=()=>{bellTimer.current=window.setTimeout(()=>{playBell(breathingVisible);schedule()},45_000+Math.random()*45_000)};schedule();return()=>window.clearTimeout(bellTimer.current)},[session.phase,playBell,breathingVisible]);
  useEffect(()=>{if(session.phase!=="reveal")return;playReveal();if(hapticEnabled&&!finalHaptic.current){finalHaptic.current=true;triggerLightHaptic()}const reflectionTimer=window.setTimeout(()=>setShowFinalReflection(true),12_000),audioTimer=window.setTimeout(stopAudio,18_000);return()=>{window.clearTimeout(reflectionTimer);window.clearTimeout(audioTimer)}},[session.phase,playReveal,stopAudio,hapticEnabled]);
  useEffect(()=>()=>{window.clearTimeout(selectionTimer.current);window.clearTimeout(bellTimer.current);stopAudio()},[stopAudio]);
  useEffect(()=>{if(session.phase!=="active"&&session.phase!=="paused")return;const keys=(event:KeyboardEvent)=>{if(event.key==="Escape"){event.preventDefault();if(session.phase==="paused")session.resume();else session.pause()}if(event.key===" "){event.preventDefault();setBreathing(value=>!value)}};window.addEventListener("keydown",keys);return()=>window.removeEventListener("keydown",keys)},[session]);
  function start(){beginAudio();session.start()}
  async function choose(node:ReflectionNodeData){
    if(!canSelectReflection(session.phase,Boolean(selected)))return;
    setSelected(node.id);markInteraction();if(hapticEnabled)triggerLightHaptic();playSelection();
    let neighborhood:ReflectionNeighborhood;
    try{const response=await fetch(`/api/path-of-seeing/nodes?focus=${encodeURIComponent(node.id)}`);if(!response.ok)throw new Error("Node lookup failed");neighborhood=await response.json() as ReflectionNeighborhood}
    catch{setSelected(null);return}
    const nextMap=new Map(neighborhood.nodes.map(item=>[item.id,item])),nextFocus=nextMap.get(node.id)??node;
    const displayed=[focus.id,...related.map(item=>item.id)];
    recentIds.current=[...recentIds.current,...displayed].slice(-12);
    recentThemes.current=[...recentThemes.current,focus.primaryTheme].slice(-8);
    recentStages.current=[...recentStages.current,focus.stage].slice(-8);
    step.current+=1;
    const children=selectReflectionChildren(nextFocus,neighborhood.nodes,neighborhood.fallbackIds,traversalContext(sessionSeed,step.current,recentIds.current,recentThemes.current,recentStages.current));
    window.clearTimeout(selectionTimer.current);
    selectionTimer.current=window.setTimeout(()=>{setHistorical(current=>Array.from(new Set([...current,...displayed])).slice(-8));setFocus(nextFocus);setRelated(children);setSelected(null)},180);
  }
  const active=session.phase==="active"||session.phase==="paused"||session.phase==="quieting";
  function anotherSession(){setShowFinalReflection(false);finalHaptic.current=false;setArtworkRound(value=>value+1);session.reset()}
  return <div className={styles.experience}>
    <div className={styles.landscape} aria-hidden="true"><div className={styles.sky}>{Array.from({length:36},(_,index)=><i key={index} style={{left:`${(index*43)%97}%`,top:`${5+(index*31)%47}%`}}/>)}</div><div className={styles.mountains}><i/><i/><i/></div><div className={styles.mist}><i/><i/></div><div className={styles.lake}><i/><i/><i/><i/></div><div className={styles.closedLotus}><i/><i/><b/></div></div>
    {session.phase==="setup"&&<section className={styles.setup}><p className="q-kicker">{t.kicker}</p><h1>{t.title}</h1><p>{t.subtitle}</p><div className={styles.preSessionSettings}><fieldset><legend>{t.duration}</legend>{pathOfSeeingConfig.durations.map(value=><button key={value} type="button" aria-pressed={duration===value} onClick={()=>setDuration(value)}>{value/60_000} {t.minutes}</button>)}</fieldset><div className={styles.quietOptions}><button type="button" aria-pressed={soundEnabled} onClick={()=>setSoundEnabled(!soundEnabled)}><span>{t.sound}</span><b>{soundEnabled?t.on:t.off}</b></button>{hapticSupported&&<button type="button" aria-pressed={hapticEnabled} onClick={()=>setHapticEnabled(!hapticEnabled)}><span>{t.haptic}</span><b>{hapticEnabled?t.on:t.off}</b></button>}<div><span>{t.language}</span><b>{locale==="vi"?"Tiếng Việt":"English"}</b></div></div></div><button className={styles.begin} onClick={start}>{t.begin}</button><Link href="/practice"><ArrowLeft/>{t.leave}</Link></section>}
    {active&&<><header className={styles.controls}><button onClick={()=>{const next=!muted;setMuted(next);setSoundEnabled(!next)}} aria-label={muted?t.unmute:t.mute}>{muted?<VolumeX/>:<Volume2/>}</button></header><p className={styles.invitation}>{t.invitation}</p><ConstellationStage locale={locale} focus={focus} related={related} historical={historical} selectedId={selected} quieting={session.phase==="quieting"} onSelect={choose}/><BreathingGuide enabled={breathingVisible} inhale={t.inhale} exhale={t.exhale}/>{session.phase==="paused"&&<div className={styles.pausePanel}><Pause/><p>{t.pause}</p><button onClick={session.resume}><Play/>{t.resume}</button><Link href="/practice">{t.leave}</Link></div>}</>}
    {session.phase==="reveal"&&<section className={styles.ending}><LotusReveal artwork={artwork} message={t.closing} showReflection={showFinalReflection}/>{showFinalReflection&&<div className={styles.finalActions}><p>{t.noScore}</p><button onClick={anotherSession}>{t.another}</button><Link href="/practice">{t.leave}</Link></div>}</section>}
    {audioElements}
  </div>
}
