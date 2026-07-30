"use client";
import type { Ref } from "react";
import type { ReflectionText } from "@/types/path-of-seeing-batch";
import styles from "./path-of-seeing.module.css";

export type TextVariant="full"|"medium"|"short";
export function ReflectionNode({text,variant,kind,active,onSelect,nodeRef,style}:{text:ReflectionText;variant:TextVariant;kind:"focus"|"related";active:boolean;onSelect:()=>void;nodeRef?:Ref<HTMLButtonElement>;style:React.CSSProperties}){
  return <button ref={nodeRef} data-reflection-node className={`${styles.reflectionNode} ${kind==="focus"?styles.focusNode:styles.relatedNode} ${active?styles.selectedNode:""}`} style={style} onClick={onSelect}><span>{text[variant]}</span></button>
}
