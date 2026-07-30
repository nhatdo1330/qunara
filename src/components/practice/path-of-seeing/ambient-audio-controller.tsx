"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { canPlayBell, canPlayOneShot } from "./audio-state";

type AudioRef=React.RefObject<HTMLAudioElement>;
const targets={water:.22,wind:.08,night:.06,bell:.18,selection:.16,reveal:.28} as const;

export function useAmbientAudioController(){
  const [muted,setMutedState]=useState(false),water=useRef<HTMLAudioElement>(null),wind=useRef<HTMLAudioElement>(null),night=useRef<HTMLAudioElement>(null),bell=useRef<HTMLAudioElement>(null),selection=useRef<HTMLAudioElement>(null),reveal=useRef<HTMLAudioElement>(null),activated=useRef(false),mutedRef=useRef(false),lastBell=useRef(-Infinity),lastSelection=useRef(-Infinity),lastInteraction=useRef(-Infinity),fadeTimers=useRef(new Map<HTMLAudioElement,number>()),layerTimers=useRef<number[]>([]);
  const all=useMemo(()=>[water,wind,night,bell,selection,reveal],[]);

  const clearFade=useCallback((audio:HTMLAudioElement)=>{const timer=fadeTimers.current.get(audio);if(timer!==undefined)window.clearInterval(timer);fadeTimers.current.delete(audio)},[]);
  const fadeTo=useCallback((audio:HTMLAudioElement,target:number,duration:number,pauseAfter=false)=>{
    clearFade(audio);const start=audio.volume,started=performance.now();
    const timer=window.setInterval(()=>{const progress=Math.min(1,(performance.now()-started)/duration);audio.volume=start+(target-start)*progress;if(progress>=1){clearFade(audio);if(pauseAfter)audio.pause()}},50);
    fadeTimers.current.set(audio,timer);
  },[clearFade]);
  const startLayer=useCallback((ref:AudioRef,volume:number,duration=2200)=>{const audio=ref.current;if(!audio||mutedRef.current)return;audio.volume=0;void audio.play().then(()=>fadeTo(audio,volume,duration)).catch(()=>{})},[fadeTo]);
  const scheduleLayers=useCallback(()=>{
    const schedule=(ref:AudioRef,minimum:number,range:number,volume:number)=>{const run=()=>{const id=window.setTimeout(()=>{if(activated.current&&!mutedRef.current&&ref.current?.paused)startLayer(ref,volume,1600);run()},minimum+Math.random()*range);layerTimers.current.push(id)};run()};
    schedule(wind,20_000,40_000,targets.wind);schedule(night,30_000,60_000,targets.night);
  },[startLayer]);
  const begin=useCallback(()=>{if(activated.current)return;activated.current=true;lastInteraction.current=Date.now();const audio=water.current;if(audio){audio.loop=true;startLayer(water,targets.water,2400)}scheduleLayers()},[scheduleLayers,startLayer]);
  const markInteraction=useCallback(()=>{lastInteraction.current=Date.now()},[]);
  const playOneShot=useCallback((ref:AudioRef,volume:number,last:React.MutableRefObject<number>,minimumInterval:number)=>{
    const audio=ref.current,now=Date.now();if(!audio||!canPlayOneShot({activated:activated.current,muted:mutedRef.current,isPlaying:!audio.paused&&!audio.ended,now,lastPlayedAt:last.current,minimumInterval}))return false;
    last.current=now;audio.currentTime=0;audio.volume=volume;void audio.play().catch(()=>{});return true;
  },[]);
  const playBell=useCallback((breathingVisible=false)=>{const audio=bell.current,now=Date.now();if(!audio||!canPlayBell({activated:activated.current,muted:mutedRef.current,isPlaying:!audio.paused&&!audio.ended,now,lastPlayedAt:lastBell.current,minimumInterval:45_000,breathingVisible,lastInteractionAt:lastInteraction.current,interactionQuietPeriod:8_000}))return false;lastBell.current=now;audio.currentTime=0;audio.volume=targets.bell;void audio.play().catch(()=>{});return true},[]);
  const playSelection=useCallback(()=>playOneShot(selection,targets.selection,lastSelection,220),[playOneShot]);
  const playReveal=useCallback(()=>playOneShot(reveal,targets.reveal,{current:-Infinity},0),[playOneShot]);
  const setMuted=useCallback((value:boolean|((current:boolean)=>boolean))=>{setMutedState(current=>{const next=typeof value==="function"?value(current):value;mutedRef.current=next;for(const ref of all){const audio=ref.current;if(!audio)continue;if(next)fadeTo(audio,0,350,true);else if(ref===water&&activated.current){audio.volume=0;void audio.play().then(()=>fadeTo(audio,targets.water,1200)).catch(()=>{})}}return next})},[all,fadeTo]);
  const stop=useCallback(()=>{activated.current=false;for(const id of layerTimers.current)window.clearTimeout(id);layerTimers.current=[];for(const ref of all){const audio=ref.current;if(!audio)continue;fadeTo(audio,0,3200,true)}},[all,fadeTo]);
  useEffect(()=>()=>{activated.current=false;for(const id of layerTimers.current)window.clearTimeout(id);for(const timer of Array.from(fadeTimers.current.values()))window.clearInterval(timer);for(const ref of all){ref.current?.pause();if(ref.current)ref.current.currentTime=0}},[all]);
  return{muted,setMuted,begin,stop,markInteraction,playBell,playSelection,playReveal,elements:<><audio ref={water} src="/audio/meditation/river.wav" preload="none"/><audio ref={wind} src="/audio/meditation/wind.wav" preload="none"/><audio ref={night} src="/audio/meditation/night.wav" preload="none"/><audio ref={bell} src="/audio/meditation/bowl.wav" preload="auto"/><audio ref={selection} src="/audio/meditation/air-tone.wav" preload="auto"/><audio ref={reveal} src="/audio/meditation/choir.wav" preload="auto"/></>};
}
