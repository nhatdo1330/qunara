"use client";
import { useState } from "react";
import type { LotusArtwork } from "@/types/path-of-seeing-artwork";
import { shouldUseArtworkFallback } from "@/lib/path-of-seeing-artwork-selection";
import styles from "./path-of-seeing.module.css";

export function LotusReveal({artwork,message,showReflection}:{artwork:LotusArtwork|null;message:string;showReflection:boolean}){
  const [failed,setFailed]=useState(false);
  return <div className={`${styles.lotusReveal} ${shouldUseArtworkFallback(artwork,failed)?styles.artworkFallback:""}`} aria-live="polite">
    {artwork&&!failed&&<picture className={styles.lotusArtwork}>
      <source media="(orientation: portrait)" srcSet={artwork.portraitUrl}/>
      <img src={artwork.landscapeUrl} alt="" onError={()=>setFailed(true)}/>
    </picture>}
    <div className={styles.finalFog} aria-hidden="true"><i/><i/></div>
    <div className={styles.finalReflection} aria-hidden="true"/>
    <div className={styles.finalParticles} aria-hidden="true">{Array.from({length:24},(_,index)=><i key={index} style={{left:`${5+(index*37)%90}%`,top:`${8+(index*29)%78}%`,animationDelay:`${index*.18}s`}}/>)}</div>
    {showReflection&&<p className={styles.finalMessage}>{message}</p>}
  </div>
}
