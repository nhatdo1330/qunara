"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

import { workflowProjects, type ProjectId, type WorkflowProject } from "./workflow-data";
import styles from "./portfolio.module.css";

type ViewId = "overview" | "architecture" | "demo";
type Point = { x: number; y: number };
type Edge = { id: string; from: Point; to: Point; reveal: number; tone?: string };

const sceneCount = 12;

export function ProjectShowcase() {
  const [projectId, setProjectId] = useState<ProjectId>("ink");
  const [view, setView] = useState<ViewId>("overview");
  const project = workflowProjects.find((item) => item.id === projectId) ?? workflowProjects[0];

  const changeProject = (id: ProjectId) => {
    setProjectId(id);
    setView("overview");
  };

  return <div className={styles.showcase}>
    <aside className={styles.systemSelector}>
      <p>Select a system</p>
      <div className={styles.productTabs} role="tablist" aria-label="Featured engineering projects">
      {workflowProjects.map((item) => <button type="button" role="tab" key={item.id} aria-selected={item.id === projectId} onClick={() => changeProject(item.id)}>
        <small>{item.number} / {item.mode}</small><strong>{item.title}</strong><span>{item.summary}</span>
      </button>)}
      </div>
      <p className={styles.selectorNote}>A case study is more persuasive when the evidence is visible. Interact with each synthetic example.</p>
    </aside>
    <div className={styles.projectPage}>
      <header className={styles.projectIntro}><div><p className={styles.eyebrow}>{project.number} / {project.mode}</p><h3>{project.title}</h3><p>{project.description}</p></div><span>Synthetic demonstration</span></header>
      <div className={styles.subtabs} role="tablist" aria-label={`${project.title} details`}>
        {(["overview", "architecture", "demo"] as ViewId[]).map((item) => <button type="button" role="tab" key={item} aria-selected={view === item} onClick={() => setView(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}
      </div>
      <section className={styles.projectWorkspace} aria-live="polite">
        <header><span>{project.title} / {view === "demo" ? "Workflow demo" : view}</span><div><i/><i/><i/></div></header>
        <div className={styles.projectWorkspaceBody}>
          {view === "overview" && <Overview project={project}/>} 
          {view === "architecture" && <Architecture project={project}/>} 
          {view === "demo" && <WorkflowDemo key={project.id} project={project}/>} 
        </div>
      </section>
      <p className={styles.showcaseBoundary}><strong>Illustrative walkthrough.</strong> Synthetic content only; no live Adobe system, internal URL, credential, customer information, or production endpoint is connected. Echo Loads figures describe one supplied sample run.</p>
    </div>
  </div>;
}

function Overview({ project }: { project: WorkflowProject }) {
  const [phase, setPhase] = useState(0);
  const selected = project.overview[phase];
  return <div className={styles.overviewGrid}>
    <section className={styles.phasePanel}><span className={styles.workspaceLabel}>Path from input to result</span><div className={styles.phaseGrid}>{project.overview.map((item, index) => <button type="button" key={item.title} aria-pressed={phase === index} onClick={() => setPhase(index)}><small>{String(index + 1).padStart(2, "0")} / 06</small><strong>{item.title}</strong></button>)}</div></section>
    <article className={styles.overviewMain}><span>The work</span><h4>{selected.title}</h4><p>{selected.detail}</p></article>
    <aside className={styles.overviewEvidence}><span>Visible evidence</span><strong>{selected.evidence}</strong><p>{project.resultNote}</p></aside>
    <article className={styles.overviewAssessment}><span>Assessment</span><h4>{phase === project.overview.length - 1 ? project.result : "The investigation remains open."}</h4><p>{phase === project.overview.length - 1 ? project.resultNote : "Select each stage to follow the evidence before reaching the final result."}</p></article>
  </div>;
}

function Architecture({ project }: { project: WorkflowProject }) {
  return <>
    <span className={styles.workspaceLabel}>Components / input to output</span>
    <p className={styles.archLead}>{project.description}</p>
    <div className={styles.architectureGrid}>{project.architecture.map((lane, index) => <article key={lane.title}><small>0{index + 1}</small><h4>{lane.title}</h4><strong>{lane.components}</strong><p>{lane.detail}</p></article>)}</div>
    <p className={styles.implementation}><strong>Implementation</strong> · {project.implementation}</p>
  </>;
}

function WorkflowDemo({ project }: { project: WorkflowProject }) {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLElement>());
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setScene((current) => {
        if (current >= sceneCount - 1) {
          window.clearInterval(timer);
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1600);
    return () => window.clearInterval(timer);
  }, [playing]);

  const register = useCallback((id: string) => (element: HTMLElement | null) => {
    if (element) nodeRefs.current.set(id, element);
    else nodeRefs.current.delete(id);
  }, []);

  const measure = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const base = canvas.getBoundingClientRect();
    const anchor = (id: string, edge: "top" | "bottom"): Point | null => {
      const node = nodeRefs.current.get(id);
      if (!node) return null;
      const rect = node.getBoundingClientRect();
      return { x: rect.left - base.left + rect.width / 2, y: (edge === "top" ? rect.top : rect.bottom) - base.top };
    };
    const next: Edge[] = [];
    const add = (id: string, fromId: string, toId: string, reveal: number, tone?: string) => {
      const from = anchor(fromId, "bottom");
      const to = anchor(toId, "top");
      if (from && to) next.push({ id, from, to, reveal, tone });
    };
    add("input-core", "input", "core", 1);
    project.branches.forEach((branch, index) => {
      add(`core-branch-${index}`, "core", `branch-${index}`, 2 + index * 2, branch.tone);
      add(`branch-output-${index}`, `branch-${index}`, `output-${index}`, 3 + index * 2, branch.tone);
      add(`output-join-${index}`, `output-${index}`, "join", 10, branch.tone);
    });
    add("join-result", "join", "result", 11);
    setEdges(next);
  }, [project]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    const update = () => { if (!cancelled) window.requestAnimationFrame(measure); };
    const observer = new ResizeObserver(update);
    observer.observe(canvas);
    nodeRefs.current.forEach((node) => observer.observe(node));
    document.fonts?.ready.then(update);
    update();
    window.addEventListener("resize", update);
    return () => { cancelled = true; observer.disconnect(); window.removeEventListener("resize", update); };
  }, [measure]);

  const narration = useMemo(() => getSceneNarration(project, scene), [project, scene]);
  const nodeState = (reveal: number) => scene < reveal ? styles.flowHidden : scene === reveal ? styles.flowCurrent : styles.flowPast;

  const selectScene = (next: number) => { setPlaying(false); setScene(next); };
  const reset = () => { setPlaying(false); setScene(0); };

  return <>
    <div className={styles.demoToolbar}>
      <p><strong>{project.title} in motion.</strong> Playback reveals one evidence path at a time; earlier evidence remains visible.</p>
      <div><button type="button" className={styles.playButton} aria-label={playing ? "Pause workflow" : "Play workflow"} onClick={() => setPlaying((value) => !value)}>{playing ? <Pause aria-hidden="true"/> : <Play aria-hidden="true"/>}{playing ? "Pause" : "Play"}</button><button type="button" className={styles.resetButton} onClick={reset}><RotateCcw aria-hidden="true"/>Reset</button></div>
    </div>
    <div className={styles.flowCanvas} ref={canvasRef}>
      <svg className={styles.connectorLayer} aria-hidden="true" width="100%" height="100%">
        {edges.filter((edge) => scene >= edge.reveal).map((edge) => { const path = connectorPath(edge.from, edge.to); return <g key={edge.id} className={edge.tone ? styles[edge.tone] : undefined}><path d={path}/><path className={styles.connectorPulse} d={path}/></g>; })}
      </svg>
      <div ref={register("input")} className={`${styles.flowNode} ${styles.flowInput} ${nodeState(0)}`}><small>01 / {project.inputLabel}</small><strong>{project.input}</strong></div>
      <div ref={register("core")} className={`${styles.flowNode} ${styles.flowCore} ${nodeState(1)}`}><small>02 / Orchestrate</small><strong>{project.orchestrator}</strong><p>{project.orchestratorNote}</p></div>
      <div className={styles.flowBranches}>{project.branches.map((branch, index) => <div className={`${styles.flowColumn} ${styles[branch.tone]}`} key={branch.label}>
        <article ref={register(`branch-${index}`)} className={`${styles.flowNode} ${styles.flowBranch} ${nodeState(2 + index * 2)}`}><small>0{index + 3} / {branch.label}</small><strong>{branch.title}</strong><p>{branch.detail}</p></article>
        <article ref={register(`output-${index}`)} className={`${styles.flowNode} ${styles.flowOutput} ${nodeState(3 + index * 2)}`}><small>Output</small><strong>{branch.output}</strong></article>
      </div>)}</div>
      <div ref={register("join")} className={`${styles.flowJoin} ${nodeState(10)}`}><span>Converge evidence</span></div>
      <div ref={register("result")} className={`${styles.flowNode} ${styles.flowResult} ${nodeState(11)}`}><small>Final / {project.result}</small><strong>{project.resultNote}</strong></div>
    </div>
    <div className={styles.sceneControls}>
      <div role="group" aria-label="Choose workflow scene">{Array.from({ length: sceneCount }, (_, index) => <button type="button" key={index} aria-current={scene === index ? "step" : undefined} aria-label={`Show scene ${index + 1}: ${getSceneNarration(project, index).label}`} onClick={() => selectScene(index)}>{index + 1}</button>)}</div>
      <span>{String(scene + 1).padStart(2, "0")} / {sceneCount}</span>
    </div>
    <div className={styles.sceneNarration} aria-live="polite"><div><small>{narration.label}</small><h4>{narration.title}</h4><p>{narration.detail}</p></div><aside><small>Current data path</small><p>{narration.path}</p></aside></div>
  </>;
}

function connectorPath(from: Point, to: Point) {
  const middle = from.y + Math.max(18, (to.y - from.y) / 2);
  return `M ${from.x} ${from.y} V ${middle} H ${to.x} V ${to.y}`;
}

function getSceneNarration(project: WorkflowProject, scene: number) {
  if (scene === 0) return { label: project.inputLabel, title: project.input, detail: "The synthetic input enters this workflow.", path: "Input ready" };
  if (scene === 1) return { label: "Orchestration", title: project.orchestrator, detail: project.orchestratorNote, path: "Input → orchestrator" };
  if (scene >= 2 && scene <= 9) {
    const index = Math.floor((scene - 2) / 2);
    const branch = project.branches[index];
    return scene % 2 === 0
      ? { label: branch.label, title: branch.title, detail: branch.detail, path: `Orchestrator → ${branch.title}` }
      : { label: `${branch.label} / evidence`, title: branch.output, detail: "This output remains visible and contributes to the final result.", path: `${branch.title} → captured output` };
  }
  if (scene === 10) return { label: "Aggregation", title: "Converge the evidence", detail: "The four paths meet before the final artifact is prepared.", path: "Four outputs → evidence convergence" };
  return { label: project.result, title: project.resultNote, detail: "The walkthrough is complete. The result remains bounded by the evidence shown.", path: `Converged evidence → ${project.result}` };
}
