"use client";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { PathLocale } from "./path-of-seeing-config";
import type { ReflectionNodeData } from "@/types/path-of-seeing-batch";
import { guidedConstellationLayout, type NodePosition, type NodeSize } from "./guided-constellation-layout";
import { ReflectionNode, type TextVariant } from "./reflection-node";
import styles from "./path-of-seeing.module.css";
import { constellationNavigationKeys, nextConstellationIndex, reflectionTextVariant } from "./interaction-state";

export function ConstellationStage({locale,focus,related,historical,selectedId,quieting,onSelect}:{locale:PathLocale;focus:ReflectionNodeData;related:ReflectionNodeData[];historical:string[];selectedId:string|null;quieting:boolean;onSelect:(node:ReflectionNodeData)=>void}){
  const stageRef=useRef<HTMLDivElement>(null),sizes=useRef(new Map<string,NodeSize>()),[stage,setStage]=useState({width:800,height:700}),[positions,setPositions]=useState<NodePosition[]>([]),[variants,setVariants]=useState<Record<string,TextVariant>>({}),[measurementVersion,setMeasurementVersion]=useState(0);
  const nodes=useMemo(()=>[focus,...related.slice(0,3)],[focus,related]);
  useEffect(()=>setVariants(Object.fromEntries(nodes.map((node,index)=>[node.id,reflectionTextVariant(index)]))),[nodes]);
  useEffect(()=>{const element=stageRef.current;if(!element)return;const update=()=>setStage({width:element.clientWidth,height:element.clientHeight});update();const observer=new ResizeObserver(update);observer.observe(element);return()=>observer.disconnect()},[]);
  const measure=useCallback((id:string)=>(element:HTMLButtonElement|null)=>{if(!element)return;const rect=element.getBoundingClientRect(),previous=sizes.current.get(id),next={width:rect.width,height:rect.height};if(!previous||Math.abs(previous.width-next.width)>1||Math.abs(previous.height-next.height)>1){sizes.current.set(id,next);setMeasurementVersion(version=>version+1)}},[]);
  useLayoutEffect(()=>{const next=guidedConstellationLayout(stage,focus.id,related.map(node=>node.id),sizes.current);setPositions(next)},[stage,focus.id,related,variants,measurementVersion]);
  const byId=new Map(positions.map(position=>[position.id,position]));
  const ambientCount=Math.max(0,8-Math.min(8,historical.length));
  function keyboard(event:React.KeyboardEvent){if(!constellationNavigationKeys.includes(event.key as typeof constellationNavigationKeys[number]))return;event.preventDefault();const buttons=Array.from(stageRef.current?.querySelectorAll<HTMLButtonElement>("[data-reflection-node]")??[]),index=buttons.indexOf(document.activeElement as HTMLButtonElement);buttons[nextConstellationIndex(event.key,index,buttons.length)]?.focus()}
  return <div ref={stageRef} className={`${styles.constellationStage} ${quieting?styles.quieting:""}`} onKeyDown={keyboard}>
    <svg className={styles.connections} aria-hidden="true">{related.map(node=>{const from=byId.get(focus.id),to=byId.get(node.id);return from&&to?<line key={node.id} x1={from.x} y1={from.y} x2={to.x} y2={to.y}/>:null})}</svg>
    {Array.from({length:ambientCount},(_,index)=><i className={styles.ambientStar} key={index} style={{left:`${8+(index*37)%85}%`,top:`${12+(index*23)%52}%`,"--size":`${6+(index%4)*2}px`} as React.CSSProperties}/>)}
    {historical.slice(-8).map((id,index)=><i className={styles.historicalStar} key={`${id}-${index}`} style={{left:`${14+(index*41)%74}%`,top:`${17+(index*19)%48}%`}}/>)}
    {quieting&&<div className={styles.dissolutionParticles} aria-hidden="true">{Array.from({length:18},(_,index)=><i key={index} style={{left:`${18+(index*37)%65}%`,top:`${20+(index*29)%45}%`,animationDelay:`${index*.08}s`}}/>)}</div>}
    {quieting&&<div className={styles.lotusOutline} aria-hidden="true">{Array.from({length:7},(_,index)=><i key={index} style={{"--petal":index} as React.CSSProperties}/>)}</div>}
    {nodes.map((node,index)=>{const position=byId.get(node.id);if(!position)return null;return <ReflectionNode key={node.id} text={node.text[locale]} variant={variants[node.id]??reflectionTextVariant(index)} kind={index===0?"focus":"related"} active={selectedId===node.id} onSelect={()=>onSelect(node)} nodeRef={measure(node.id)} style={{left:position.x,top:position.y}}/>})}
  </div>
}
