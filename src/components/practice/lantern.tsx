"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./wave-of-thoughts.module.css";

export type LanternState={id:number;nodeId:string;label:string;x:number;y:number;drift:number;duration:number;releasing:boolean};
export function Lantern({lantern,hint,reducedMotion,onRelease}:{lantern:LanternState;hint:string;reducedMotion:boolean;onRelease:()=>void}){
  const timer=useRef<number>(),[holding,setHolding]=useState(false),[announced,setAnnounced]=useState(false);
  useEffect(()=>()=>window.clearTimeout(timer.current),[]);
  function begin(){if(lantern.releasing)return;setHolding(true);timer.current=window.setTimeout(()=>{setHolding(false);setAnnounced(true);onRelease()},reducedMotion?600:2000)}
  function cancel(){window.clearTimeout(timer.current);setHolding(false)}
  return <button className={`${styles.lantern} ${holding?styles.holding:""} ${lantern.releasing?styles.releasing:""}`} style={{left:`${lantern.x}%`,top:`${lantern.y}%`,"--drift":`${lantern.drift}vw`,"--duration":`${lantern.duration}s`} as React.CSSProperties} onPointerDown={begin} onPointerUp={cancel} onPointerCancel={cancel} onPointerLeave={cancel} onKeyDown={event=>{if((event.key===" "||event.key==="Enter")&&!event.repeat){event.preventDefault();begin()}}} onKeyUp={event=>{if(event.key===" "||event.key==="Enter")cancel()}} aria-label={`${lantern.label}. ${hint}`} aria-describedby={`lantern-help-${lantern.id}`}><span className={styles.lanternLight}/><b>{lantern.label}</b><i/><small id={`lantern-help-${lantern.id}`}>{hint}</small>{announced&&<span className={styles.srOnly} aria-live="polite">{lantern.label}</span>}</button>
}
