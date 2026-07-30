"use client";
import { useEffect, useState } from "react";
import { reminderDelay } from "./audio-state";

export function useBreathingReminder(enabled:boolean){
  const [visible,setVisible]=useState(false);
  useEffect(()=>{if(!enabled){setVisible(false);return}let showTimer:number|undefined,hideTimer:number|undefined,cancelled=false;const schedule=()=>{showTimer=window.setTimeout(()=>{if(cancelled)return;setVisible(true);hideTimer=window.setTimeout(()=>{setVisible(false);if(!cancelled)schedule()},4_000+Math.random()*2_000)},reminderDelay(Math.random()))};schedule();return()=>{cancelled=true;window.clearTimeout(showTimer);window.clearTimeout(hideTimer);setVisible(false)}},[enabled]);
  return visible;
}

