"use client";
import styles from "./path-of-seeing.module.css";
export function BreathingGuide({enabled,inhale,exhale}:{enabled:boolean;inhale:string;exhale:string}){return <div className={`${styles.breathingGuide} ${enabled?styles.breathingEnabled:""}`} aria-hidden={!enabled}><i/><span><b>{inhale}</b><em>{exhale}</em></span></div>}
