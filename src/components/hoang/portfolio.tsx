"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowDown, Check, ChevronLeft, ChevronRight, Download, ExternalLink, Mail, MapPin, RotateCcw } from "lucide-react";

import { career, credentials, echoMission, evalDimensions, investigationSteps, publications, skillGroups } from "./portfolio-data";
import styles from "./portfolio.module.css";

export function HoangPortfolio() {
  return <div className={styles.site}>
    <header className={styles.header}>
      <a className={styles.mark} href="#top" aria-label="Hoang Do, back to top">HOANG <span>/</span> DO <i>APT 63</i></a>
      <nav aria-label="Portfolio navigation"><a href="#work">Work</a><a href="#background">Background</a><a href="#writing">Writing</a><a className={styles.resumeLink} href="/hoang/Hoang-Do-Resume.pdf" download>Résumé <Download/></a></nav>
    </header>

    <div id="top">
      <section className={styles.hero} aria-labelledby="hoang-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Software Quality Engineer · AI Systems & Automation Architect</p>
            <h1 id="hoang-title">I build systems<br/>that <em>find the truth.</em></h1>
            <p className={styles.lede}>More than 25 years in software engineering and quality—building automation, investigating distributed failures, and designing AI systems that turn complex behavior into evidence people can act on.</p>
            <div className={styles.heroActions}><a className={styles.primary} href="#work">Explore the systems <ArrowDown/></a><a className={styles.secondary} href="#background">Read my background</a></div>
          </div>
          <figure className={styles.portrait}><Image src="/images/hoang/portrait.jpeg" alt="Portrait of Hoang Do" fill priority sizes="(max-width: 680px) 88vw, 34vw"/><figcaption>Hoang Do · San Jose, California</figcaption></figure>
        </div>
        <dl className={styles.proof}><div><dt>25+</dt><dd>years in software engineering</dd></div><div><dt>4</dt><dd>featured AI systems</dd></div><div><dt>2</dt><dd>published technical papers</dd></div><div><dt>1</dt><dd>independent bilingual product</dd></div></dl>
      </section>

      <section className={styles.work} id="work" aria-labelledby="work-title">
        <SectionHeading eyebrow="Selected engineering work" title="Four systems. Four kinds of evidence." id="work-title">Each demonstration is self-contained and uses synthetic scenarios. No Adobe environments, internal URLs, customer information, credentials, logs, or proprietary implementation details are connected to this site.</SectionHeading>
        <div className={styles.projectStack}>
          <InkDemo/>
          <EchoDemo/>
          <EvalsDemo/>
          <LoadsDemo/>
        </div>
      </section>

      <section className={styles.background} id="background" aria-labelledby="background-title">
        <SectionHeading eyebrow="Career" title="Built through every layer of quality." id="background-title">From enterprise web systems and automation frameworks to production investigations and AI evaluation, the through-line is disciplined evidence.</SectionHeading>
        <ol className={styles.timeline}>{career.map((item)=><li key={`${item.company}-${item.period}`}><span>{item.period}</span><div><p>{item.company}</p><h3>{item.role}</h3><small>{item.detail}</small></div></li>)}</ol>
      </section>

      <section className={styles.capabilities} aria-labelledby="capabilities-title">
        <SectionHeading eyebrow="Technical practice" title="Engineering across the stack." id="capabilities-title">Hands-on systems work, quality architecture, and technical leadership grounded in repeatable methods.</SectionHeading>
        <div className={styles.skillGrid}>{skillGroups.map(([title,detail],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
        <div className={styles.credentials}><p className={styles.kicker}>Education & credentials</p>{credentials.map(item=><span key={item}><Check/>{item}</span>)}</div>
      </section>

      <section className={styles.writing} id="writing" aria-labelledby="writing-title">
        <SectionHeading eyebrow="Selected publications" title="Testing as a way of seeing." id="writing-title">Earlier research joined exploratory testing, heuristics, graph thinking, and machine learning.</SectionHeading>
        <div className={styles.publications}>{publications.map((publication,index)=><article key={publication.title}><span>0{index+1}</span><h3>{publication.title}</h3><p>{publication.venue}</p></article>)}</div>
      </section>

      <section className={styles.qunara} aria-labelledby="qunara-title">
        <div><p className={styles.kicker}>Independent product work</p><h2 id="qunara-title">Qunara</h2><p>A bilingual educational platform for exploring quantum science, Buddhist philosophy, and human experience through original editorial work and interactive reflection—with a clear boundary between scientific evidence and philosophical interpretation.</p><a href="https://qunara.ai/en/about">Explore the story behind Qunara <ExternalLink/></a></div><div className={styles.qunaraMark} aria-hidden="true"><span>Q</span><i/><i/><i/></div>
      </section>

      <section className={styles.contact} id="contact" aria-labelledby="contact-title"><p className={styles.kicker}>Contact</p><h2 id="contact-title">Bring me a difficult system.</h2><p>I’m interested in engineering problems where reliability, evidence, automation, and AI meet.</p><div><a href="mailto:nhatdohoang@yahoo.com"><Mail/>nhatdohoang@yahoo.com</a><span><MapPin/>San Jose, California</span><a href="/hoang/Hoang-Do-Resume.pdf" download><Download/>Download résumé</a></div></section>
    </div>

    <footer className={styles.footer}><span>Hoang Do · Apt 63 · San Jose, California</span><a href="https://qunara.ai">A Qunara project <ExternalLink/></a></footer>
  </div>;
}

function SectionHeading({ eyebrow, title, id, children }: { eyebrow: string; title: string; id: string; children: React.ReactNode }) {
  return <header className={styles.sectionHeading}><div><p className={styles.kicker}>{eyebrow}</p><h2 id={id}>{title}</h2></div><p>{children}</p></header>;
}

function ProjectShell({ number, title, purpose, children }: { number: string; title: string; purpose: string; children: React.ReactNode }) {
  return <article className={styles.project}><header><span>{number}</span><div><p className={styles.projectLabel}>Interactive system demo</p><h3>{title}</h3><p>{purpose}</p></div><b>Synthetic data</b></header>{children}</article>;
}

function StepControls({ step, count, setStep }: { step: number; count: number; setStep: (step:number)=>void }) {
  return <div className={styles.stepControls}><button onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0}><ChevronLeft/>Back</button><span>{String(step+1).padStart(2,"0")} / {String(count).padStart(2,"0")}</span><button onClick={()=>setStep(step===count-1?0:step+1)}>{step===count-1?<><RotateCcw/>Replay</>:<>Next<ChevronRight/></>}</button></div>;
}

function InkDemo() {
  const [step,setStep]=useState(0); const item=investigationSteps[step];
  return <ProjectShell number="01" title="InK-9 AI" purpose="A multi-agent investigation system that moves from an engineering question to a calibrated verdict without losing the evidence trail."><div className={styles.demoGrid}><div className={styles.flow} aria-label="Investigation stages">{investigationSteps.map((entry,index)=><button key={entry.label} aria-current={step===index?"step":undefined} onClick={()=>setStep(index)}><i/>{entry.label}</button>)}</div><div className={styles.console} aria-live="polite"><div className={styles.consoleTop}><span>{item.actor}</span><b>INK-SYNTHETIC</b></div><h4>{item.title}</h4><p>{item.detail}</p><aside><span>Evidence state</span>{item.evidence}</aside><StepControls step={step} count={investigationSteps.length} setStep={setStep}/></div></div></ProjectShell>;
}

function EchoDemo() {
  const [step,setStep]=useState(0); const [scenario,setScenario]=useState<"verified"|"bug">("verified");
  return <ProjectShell number="02" title="Echo AI" purpose="An end-to-end test mission that holds a browser conversation, captures evidence, verifies the result, and creates a useful bug artifact when the product fails."><div className={styles.demoGrid}><div className={styles.demoControls}><label>Mission outcome<select value={scenario} onChange={event=>{setScenario(event.target.value as "verified"|"bug");setStep(0)}}><option value="verified">Verified outcome</option><option value="bug">Authorization failure</option></select></label><ol className={styles.missionList}>{echoMission.map(([title],index)=><li className={index<=step?styles.complete:""} key={title}><button onClick={()=>setStep(index)}><span>{index<step?<Check/>:index+1}</span>{title}</button></li>)}</ol></div><div className={styles.console} aria-live="polite"><div className={styles.consoleTop}><span>ECHO / RUN E-SYN-118</span><b>Synthetic mission</b></div><p className={styles.transcriptRole}>{step===1?"Coworker ↔ Echo":step===4&&scenario==="bug"?"Bug artifact":echoMission[step][0]}</p><h4>{scenario==="bug"&&step===4?"Authorization boundary reproduced":echoMission[step][0]}</h4><p>{scenario==="bug"&&step===4?"The synthetic action returns a denied result. Echo preserves the redacted conversation, expected behavior, observed behavior, and exact replay sequence.":echoMission[step][1]}</p><div className={styles.evidenceStrip}><span>Browser state ✓</span><span>Conversation ✓</span><span>{step>=2?"Evidence captured ✓":"Evidence pending"}</span></div><StepControls step={step} count={echoMission.length} setStep={setStep}/></div></div></ProjectShell>;
}

function EvalsDemo() {
  const [scores,setScores]=useState([4,5,4,3,4]);
  const average=useMemo(()=>scores.reduce((sum,value)=>sum+value,0)/scores.length,[scores]);
  const weakest=Math.min(...scores); const verdict=weakest<3?"Human review required":average>=4.4?"Strong response":"Accept with findings";
  return <ProjectShell number="03" title="Echo Evals" purpose="A quality framework that judges each response, then looks across sessions for repeated weaknesses, contradictions, and regressions."><div className={styles.demoGrid}><div className={styles.rubric}>{evalDimensions.map((dimension,index)=><label key={dimension}><span>{dimension}<b>{scores[index]} / 5</b></span><input aria-label={`${dimension} score`} type="range" min="1" max="5" value={scores[index]} onChange={event=>setScores(values=>values.map((value,i)=>i===index?Number(event.target.value):value))}/></label>)}</div><div className={styles.console} aria-live="polite"><div className={styles.consoleTop}><span>EVAL / SESSION SYN-42</span><b>Adjust the rubric</b></div><div className={styles.scoreHero}><strong>{average.toFixed(1)}</strong><span>weighted session score</span></div><h4>{verdict}</h4><p>{weakest<=3?`${evalDimensions[scores.indexOf(weakest)]} is the weakest dimension. Compare this response with adjacent synthetic sessions before treating the issue as a regression.`:"The response is consistent across the five dimensions. Cross-session comparison shows no repeated critical finding in this synthetic set."}</p><div className={styles.sessionBars}>{[4.2,3.8,average,4.4,4.0].map((value,index)=><i key={index} style={{height:`${value*17}%`}} title={`Synthetic session ${index+1}: ${value.toFixed(1)}`}/>)}</div><small>Cross-session view · five synthetic sessions</small></div></div></ProjectShell>;
}

function LoadsDemo() {
  const [workers,setWorkers]=useState(12); const [minutes,setMinutes]=useState(10);
  const requests=Math.round(workers*minutes*4.7); const p95=Math.round(2140+workers*43); const tokens=Math.round(requests*1860);
  return <ProjectShell number="04" title="Echo Loads" purpose="Parallel test workers expose latency, skill invocation, failures, rate limits, and token use under controlled Coworker AI workloads."><div className={styles.demoGrid}><div className={styles.loadControls}><label><span>Parallel workers <b>{workers}</b></span><input type="range" min="2" max="30" value={workers} onChange={event=>setWorkers(Number(event.target.value))}/></label><label><span>Duration <b>{minutes} min</b></span><input type="range" min="2" max="20" value={minutes} onChange={event=>setMinutes(Number(event.target.value))}/></label><p>Illustrative projection updates as you change the workload. It is not a live Adobe test.</p><div className={styles.loadProjection}><span><b>{requests}</b> projected requests</span><span><b>{p95} ms</b> synthetic p95</span><span><b>{tokens.toLocaleString()}</b> projected tokens</span></div></div><div className={styles.console}><div className={styles.consoleTop}><span>DOCUMENTED SAMPLE</span><b>One recorded run</b></div><div className={styles.metricGrid}><Metric value="564" label="requests"/><Metric value="564" label="skill invocations"/><Metric value="100%" label="skill invocation rate"/><Metric value="0" label="failures"/><Metric value="0" label="rate limits"/><Metric value="~10m" label="run duration"/></div><p className={styles.dataBoundary}>These figures describe one documented run. They do not establish general capacity or future performance; repeat testing at additional workloads is required.</p></div></div></ProjectShell>;
}

function Metric({value,label}:{value:string;label:string}) { return <div className={styles.metric}><strong>{value}</strong><span>{label}</span></div>; }
