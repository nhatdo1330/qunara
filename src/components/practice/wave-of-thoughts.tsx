"use client";

import { useLocale } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Contrast, Volume2, VolumeX, X } from "lucide-react";

import graph from "@/content/practice/thought-graph.json";
import { BreathingGuide } from "./breathing-guide";
import { LakeEnvironment } from "./lake-environment";
import { Lantern, type LanternState } from "./lantern";
import styles from "./wave-of-thoughts.module.css";

type Phase="closed"|"opening"|"experience"|"final";
type GraphNode=(typeof graph.nodes)[number];
const EXPERIENCE_MS=285_000;
const ui={
  en:{kicker:"Interactive practice · 3–5 minutes",title:"Wave of Thoughts",subtitle:"Lotus Awakening",lead:"A cinematic contemplative artwork shaped by water, night, and the gentle act of release.",enter:"Enter the lake",close:"Leave the lake",mute:"Mute sound",unmute:"Turn sound on",contrast:"High contrast",breath:"Take a slow breath.",inhale:"Inhale",exhale:"Exhale",sometimes:"Sometimes…",peace:"peace doesn’t arrive.",unfolds:"It quietly unfolds.",hold:"Press and hold to release",boundary:"A poetic experience—not therapy, a game, or a scientific simulation."},
  vi:{kicker:"Thực hành tương tác · 3–5 phút",title:"Làn Sóng Ý Nghĩ",subtitle:"Sen Nở Trong Đêm",lead:"Một tác phẩm chiêm nghiệm bằng hình ảnh, nơi mặt nước, đêm tối và hành động buông nhẹ cùng tạo nên trải nghiệm.",enter:"Bước vào mặt hồ",close:"Rời mặt hồ",mute:"Tắt âm thanh",unmute:"Bật âm thanh",contrast:"Tương phản cao",breath:"Hãy thở thật chậm.",inhale:"Hít vào",exhale:"Thở ra",sometimes:"Đôi khi…",peace:"bình yên không tìm đến.",unfolds:"Nó chỉ lặng lẽ nở ra.",hold:"Nhấn và giữ để buông",boundary:"Một trải nghiệm nghệ thuật—không phải trị liệu, trò chơi hay mô phỏng khoa học."}
} as const;

export function WaveOfThoughts(){
  const locale=useLocale()==="vi"?"vi":"en",t=ui[locale];
  const [phase,setPhase]=useState<Phase>("closed"),[muted,setMuted]=useState(false),[highContrast,setHighContrast]=useState(false),[breath,setBreath]=useState<"inhale"|"exhale"|null>(null),[lanterns,setLanterns]=useState<LanternState[]>([]),[releases,setReleases]=useState(0),[stars,setStars]=useState<{id:number;x:number;y:number}[]>([]),[finalLine,setFinalLine]=useState(0);
  const timers=useRef<number[]>([]),nextId=useRef(1),frontier=useRef<string[]>([]),started=useRef(0),releasesRef=useRef(0),phaseRef=useRef<Phase>("closed");
  const closeRef=useRef<()=>void>(()=>{}),finalRef=useRef<()=>void>(()=>{});
  const waterRef=useRef<HTMLAudioElement>(null),windRef=useRef<HTMLAudioElement>(null),nightRef=useRef<HTMLAudioElement>(null),bowlRef=useRef<HTMLAudioElement>(null),pianoRef=useRef<HTMLAudioElement>(null),choirRef=useRef<HTMLAudioElement>(null),rippleRef=useRef<HTMLAudioElement>(null);
  const reduced=useMemo(()=>typeof window!=="undefined"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);
  const nodeMap=useMemo(()=>new Map(graph.nodes.map(node=>[node.id,node])),[]);
  const rememberTimer=useCallback((callback:()=>void,delay:number)=>{const id=window.setTimeout(callback,delay);timers.current.push(id);return id},[]);
  const clearTimers=useCallback(()=>{timers.current.forEach(window.clearTimeout);timers.current=[]},[]);
  const play=useCallback((element:HTMLAudioElement|null,volume:number,loop=false)=>{if(!element||muted)return;element.loop=loop;element.volume=volume;void element.play().catch(()=>{})},[muted]);
  const stopAudio=useCallback(()=>[waterRef,windRef,nightRef,pianoRef,choirRef].forEach(ref=>{ref.current?.pause();if(ref.current)ref.current.currentTime=0}),[]);

  const selectNode=useCallback(()=>{const queued=frontier.current.shift();if(queued){const found=nodeMap.get(queued);if(found)return found}return graph.nodes[Math.floor(Math.random()*graph.nodes.length)]},[nodeMap]);
  const spawn=useCallback((node?:GraphNode)=>{if(phaseRef.current!=="experience")return;const selected=node??selectNode();setLanterns(current=>{if(current.length>=8)return current;const id=nextId.current++;return[...current,{id,nodeId:selected.id,label:selected.label[locale],x:10+Math.random()*80,y:50+Math.random()*34,drift:-7+Math.random()*14,duration:24+Math.random()*12,expiresAt:Date.now()+32_000+Math.random()*18_000,releasing:false,departing:false}]})},[locale,selectNode]);

  useEffect(()=>{phaseRef.current=phase},[phase]);
  useEffect(()=>{releasesRef.current=releases;if(releases>=20)play(pianoRef.current,.08,true);if(releases>=26)play(choirRef.current,.045,true)},[releases,play]);
  useEffect(()=>{[waterRef,windRef,nightRef,pianoRef,choirRef].forEach(ref=>{if(ref.current)ref.current.muted=muted});if(bowlRef.current)bowlRef.current.muted=muted;if(rippleRef.current)rippleRef.current.muted=muted},[muted]);
  useEffect(()=>{if(phase==="closed")return;document.body.style.overflow="hidden";const escape=(event:KeyboardEvent)=>{if(event.key==="Escape")closeRef.current()};window.addEventListener("keydown",escape);return()=>{document.body.style.overflow="";window.removeEventListener("keydown",escape)}},[phase]);
  useEffect(()=>()=>{clearTimers();stopAudio();document.body.style.overflow=""},[clearTimers,stopAudio]);
  useEffect(()=>{if(phase!=="experience")return;const id=window.setInterval(()=>{const elapsed=Date.now()-started.current;if(elapsed>=EXPERIENCE_MS){finalRef.current();return}const naturalCapacity=Math.min(8,3+Math.floor(elapsed/14_000));if(lanterns.length<naturalCapacity)spawn()},3500);return()=>window.clearInterval(id)},[phase,lanterns.length,spawn]);
  useEffect(()=>{if(phase!=="experience")return;const id=window.setInterval(()=>{const now=Date.now();setLanterns(current=>current.map(item=>!item.releasing&&now>=item.expiresAt?{...item,departing:true}:item).filter(item=>item.releasing||now<item.expiresAt+3000))},1000);return()=>window.clearInterval(id)},[phase]);

  function enter(){clearTimers();setPhase("opening");phaseRef.current="opening";setReleases(0);releasesRef.current=0;setStars([]);setLanterns([]);setFinalLine(0);frontier.current=[];play(waterRef.current,.5,true);play(windRef.current,.28,true);play(nightRef.current,.22,true);rememberTimer(()=>{setBreath("inhale");playBowl()},2500);rememberTimer(()=>{setBreath(null);startExperience()},reduced?100:9500)}
  function startExperience(){setPhase("experience");phaseRef.current="experience";started.current=Date.now();spawn();rememberTimer(()=>spawn(),1600);rememberTimer(()=>spawn(),3200);scheduleBreath()}
  function scheduleBreath(){if(phaseRef.current!=="experience")return;setBreath("inhale");playBowl();rememberTimer(()=>{if(phaseRef.current!=="experience")return;setBreath("exhale");playBowl()},4000);rememberTimer(()=>scheduleBreath(),10500)}
  function playBowl(){const bowl=bowlRef.current;if(!bowl||muted)return;bowl.currentTime=0;bowl.volume=.3;void bowl.play().catch(()=>{})}
  function release(lantern:LanternState){const node=nodeMap.get(lantern.nodeId);if(node)frontier.current.push(...[...node.connections].sort(()=>Math.random()-.5).slice(0,3));setLanterns(current=>current.map(item=>item.id===lantern.id?{...item,releasing:true}:item));const next=releasesRef.current+1;releasesRef.current=next;setReleases(next);const ripple=rippleRef.current;if(ripple&&!muted){ripple.currentTime=0;ripple.volume=.3;void ripple.play().catch(()=>{})}setStars(current=>[...current,...Array.from({length:3},(_,index)=>({id:lantern.id*10+index,x:Math.max(3,Math.min(97,lantern.x-5+Math.random()*10)),y:8+Math.random()*42}))].slice(-90));rememberTimer(()=>{setLanterns(current=>current.filter(item=>item.id!==lantern.id));const nextNode=selectNode();spawn(nextNode)},2200)}
  function beginFinal(){if(phaseRef.current!=="experience")return;setPhase("final");phaseRef.current="final";setBreath(null);setLanterns([]);setFinalLine(0);[windRef,nightRef,pianoRef,choirRef].forEach(ref=>ref.current?.pause());rememberTimer(()=>setFinalLine(1),6500);rememberTimer(()=>setFinalLine(2),9500);rememberTimer(()=>setFinalLine(3),13500);rememberTimer(()=>{setFinalLine(0);setPhase("experience");phaseRef.current="experience";started.current=Date.now();play(windRef.current,.2,true);play(nightRef.current,.16,true);spawn()},33500)}
  function close(){clearTimers();stopAudio();setPhase("closed");phaseRef.current="closed";setLanterns([]);setBreath(null)}
  closeRef.current=close;finalRef.current=beginFinal;

  return <section className={styles.launch} aria-labelledby="lotus-awakening-title"><div><p className="q-kicker">05 · {t.kicker}</p><h2 id="lotus-awakening-title">{t.title}</h2><h3>{t.subtitle}</h3><p>{t.lead}</p><small>{t.boundary}</small></div><button onClick={enter}>{t.enter}<ArrowRight/></button>
    <audio ref={waterRef} src="/audio/meditation/ocean.wav" preload="none"/><audio ref={windRef} src="/audio/meditation/wind.wav" preload="none"/><audio ref={nightRef} src="/audio/meditation/insects.wav" preload="none"/><audio ref={bowlRef} src="/audio/meditation/bowl.wav" preload="auto"/><audio ref={pianoRef} src="/audio/meditation/piano.wav" preload="none"/><audio ref={choirRef} src="/audio/meditation/choir.wav" preload="none"/><audio ref={rippleRef} src="/audio/meditation/ripple.wav" preload="auto"/>
    {phase!=="closed"&&<div className={`${styles.world} ${styles[phase]} ${highContrast?styles.highContrast:""}`} style={{"--releases":Math.min(30,releases)} as React.CSSProperties} role="dialog" aria-modal="true" aria-label={`${t.title}: ${t.subtitle}`}>
      <LakeEnvironment releases={phase==="final"?30:releases} stars={stars} reducedMotion={reduced}/>
      <div className={styles.controls}><button onClick={()=>setMuted(value=>!value)} aria-label={muted?t.unmute:t.mute}>{muted?<VolumeX/>:<Volume2/>}</button><button aria-pressed={highContrast} onClick={()=>setHighContrast(value=>!value)} aria-label={t.contrast}><Contrast/></button><button onClick={close} aria-label={t.close}><X/></button></div>
      {phase==="opening"&&<p className={styles.openingLine}>{t.breath}</p>}
      {phase==="experience"&&<><BreathingGuide state={breath} inhale={t.inhale} exhale={t.exhale}/><div className={styles.lanternField}>{lanterns.map(lantern=><Lantern key={lantern.id} lantern={lantern} hint={t.hold} reducedMotion={reduced} onRelease={()=>release(lantern)}/>)}</div></>}
      {phase==="final"&&<div className={styles.finalWords} aria-live="polite">{finalLine>=1&&<span>{t.sometimes}</span>}{finalLine>=2&&<strong>{t.peace}</strong>}{finalLine>=3&&<em>{t.unfolds}</em>}</div>}
    </div>}
  </section>
}
