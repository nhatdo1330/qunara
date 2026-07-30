"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SessionDuration } from "./path-of-seeing-config";

export type SessionPhase="setup"|"active"|"paused"|"quieting"|"reveal";
export function shouldPauseForVisibility(phase:SessionPhase,hidden:boolean){return hidden&&phase==="active"}
export function claimFinalReveal(state:{started:boolean}){if(state.started)return false;state.started=true;return true}
export function useSessionController(duration:SessionDuration){
  const [phase,setPhase]=useState<SessionPhase>("setup"),deadline=useRef(0),remaining=useRef<number>(duration),quietTimer=useRef<number>(),finalGate=useRef({started:false});
  const end=useCallback(()=>{if(!claimFinalReveal(finalGate.current))return;setPhase("quieting");quietTimer.current=window.setTimeout(()=>setPhase("reveal"),4800)},[]);
  useEffect(()=>{if(phase!=="active")return;const tick=()=>{if(Date.now()>=deadline.current)end()};tick();const id=window.setInterval(tick,250);return()=>window.clearInterval(id)},[phase,end]);
  useEffect(()=>()=>window.clearTimeout(quietTimer.current),[]);
  const start=useCallback(()=>{finalGate.current.started=false;remaining.current=duration;deadline.current=Date.now()+duration;setPhase("active")},[duration]);
  const pause=useCallback(()=>{if(phase!=="active")return;remaining.current=Math.max(0,deadline.current-Date.now());setPhase("paused")},[phase]);
  const resume=useCallback(()=>{if(phase!=="paused")return;deadline.current=Date.now()+remaining.current;setPhase("active")},[phase]);
  const reset=useCallback(()=>{window.clearTimeout(quietTimer.current);finalGate.current.started=false;remaining.current=duration;setPhase("setup")},[duration]);
  useEffect(()=>{const visibility=()=>{if(shouldPauseForVisibility(phase,document.hidden))pause()};document.addEventListener("visibilitychange",visibility);return()=>document.removeEventListener("visibilitychange",visibility)},[phase,pause]);
  return{phase,start,pause,resume,reset};
}
