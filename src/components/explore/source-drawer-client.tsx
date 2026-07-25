"use client";

import {useState, type ReactNode} from "react";
import {motion} from "framer-motion";
import {BookOpen, ChevronDown, ExternalLink} from "lucide-react";

import type {InvestigationSource} from "./investigation-system";

export function SourceDrawerClient({className = "", subtitle, sources, noteTitle, note}: {className?: string; subtitle: string; sources: InvestigationSource[]; noteTitle: string; note: ReactNode}) {
  const [open, setOpen] = useState(false);
  return <section className={`source-drawer ${className} q-shell`.trim()}><button onClick={() => setOpen(!open)} aria-expanded={open}><BookOpen/><span><b>Sources & editorial notes</b><small>{subtitle}</small></span><ChevronDown/></button>{open && <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: "auto"}}>{sources.map((source) => <article key={source.title}><span>{source.kind}</span><h3>{source.title}</h3><b>{source.publisher}</b><p>{source.note}</p>{source.href&&<a href={source.href} target="_blank" rel="noreferrer">Open source <ExternalLink/></a>}</article>)}<aside><b>{noteTitle}</b><p>{note}</p></aside></motion.div>}</section>;
}
