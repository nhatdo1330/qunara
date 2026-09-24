"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Download, ExternalLink, Mail, MapPin } from "lucide-react";

import {
  career,
  credentials,
  echoMission,
  evalDimensions,
  investigationSteps,
  loadSkillResults,
  publications,
  skillGroups,
} from "./portfolio-data";
import styles from "./portfolio.module.css";

type ProjectId = "ink" | "echo" | "evals" | "loads";

const projects: Array<{ id: ProjectId; number: string; mode: string; title: string; summary: string; description: string }> = [
  { id: "ink", number: "01", mode: "Investigate", title: "InK-9 AI", summary: "Find the cause across evidence.", description: "Specialist agents collect signals, test hypotheses, and return a traceable engineering verdict." },
  { id: "echo", number: "02", mode: "Test", title: "Echo AI", summary: "Test an AI conversation end to end.", description: "A test mission conducts a browser conversation, captures evidence, and verifies whether the outcome is real." },
  { id: "evals", number: "03", mode: "Evaluate", title: "Echo Evals", summary: "Score and explain response quality.", description: "An evaluation framework scores conversation artifacts with an explicit five-part rubric and identifies a specific finding." },
  { id: "loads", number: "04", mode: "Load", title: "Echo Loads", summary: "Inspect measured load-test evidence.", description: "Parallel workers exercise AI skills while request, invocation, token, latency, and failure evidence remains visible." },
];

export function HoangPortfolio() {
  const [project, setProject] = useState<ProjectId>("ink");
  const activeProject = projects.find((item) => item.id === project) ?? projects[0];

  return <div className={styles.site}>
    <header className={`${styles.wrap} ${styles.header}`}>
      <a className={styles.brand} href="#top" aria-label="Hoang Do, back to top">HOANG DO<span/></a>
      <nav aria-label="Profile navigation">
        <a href="#work">Selected work</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
        <a className={styles.resume} href="/hoang/Hoang-Do-Resume.pdf" download>Résumé <Download aria-hidden="true"/></a>
      </nav>
    </header>

    <div id="top">
      <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="hoang-title">
        <div>
          <p className={styles.eyebrow}>Engineer · AI systems · Software quality</p>
          <h1 id="hoang-title">Hoang<br/><em>Do.</em></h1>
          <p className={styles.heroCopy}>I build systems that investigate software, evaluate AI behavior, and turn complex failures into evidence engineers can use.</p>
          <p className={styles.heroMeta}>Adobe engineering · San Jose, California<br/>Previously eBay, First Tech Credit Union, MeU Solutions, KMS Technology</p>
        </div>
        <figure className={styles.portrait}>
          <div><Image src="/images/hoang/portrait.jpeg" alt="Portrait of Hoang Do" fill priority sizes="(max-width: 680px) calc(100vw - 46px), 38vw"/></div>
          <figcaption><span>01 / Profile</span><span>Engineering in practice</span></figcaption>
        </figure>
      </section>

      <section className={styles.intro}>
        <div className={`${styles.wrap} ${styles.introInner}`}>
          <div><p className={styles.eyebrow}>The work</p><h2>AI is useful when you can inspect its decisions.</h2></div>
          <p>My work brings investigation, end-to-end AI testing, response evaluation, and load testing into systems where evidence stays visible. Select a project below to explore a synthetic example of the problem it addresses.</p>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.work}`} id="work" aria-labelledby="work-title">
        <header className={styles.sectionHead}>
          <div><p className={styles.eyebrow}>Selected systems</p><h2 id="work-title">Four projects.<br/>Different kinds of proof.</h2></div>
          <p>Each demonstration has its own interaction and a concrete outcome. No live Adobe systems, customer data, internal URLs, credentials, logs, or proprietary details are connected.</p>
        </header>

        <div className={styles.caseLayout}>
          <aside className={styles.projectNav} aria-label="Choose a project">
            <p>Select a system</p>
            {projects.map((item) => <button type="button" key={item.id} className={project === item.id ? styles.activeProject : ""} aria-pressed={project === item.id} onClick={() => setProject(item.id)}>
              <span>{item.number} / {item.mode}</span><strong>{item.title}</strong><small>{item.summary}</small>
            </button>)}
            <div className={styles.navNote}>A case study is more persuasive when the evidence is visible. Interact with each synthetic example.</div>
          </aside>

          <div className={styles.caseMain}>
            <header className={styles.caseHead}>
              <div><p className={styles.eyebrow}>{activeProject.number} / {activeProject.mode}</p><h3>{activeProject.title}</h3><p>{activeProject.description}</p></div>
              <span>Synthetic demonstration</span>
            </header>
            <div className={styles.workspace} aria-live="polite">
              <div className={styles.workspaceBar}><span>{activeProject.title} / Evidence workspace</span><i/><i/><i/></div>
              {project === "ink" && <InkWorkspace/>}
              {project === "echo" && <EchoWorkspace/>}
              {project === "evals" && <EvalsWorkspace/>}
              {project === "loads" && <LoadsWorkspace/>}
            </div>
            <p className={styles.caseNote}><strong>Evidence boundary</strong> · Synthetic demonstrations explain how each system works. Echo Loads sample figures describe one supplied run and are not general performance claims.</p>
          </div>
        </div>

        <section className={styles.skills} id="skills" aria-labelledby="skills-title">
          <div><p className={styles.eyebrow}>Technical practice</p><h2 id="skills-title">Built across the stack.</h2></div>
          <div className={styles.skillGrid}>{skillGroups.map(([title, detail]) => <article key={title}><h3>{title}</h3><p>{detail}</p></article>)}</div>
        </section>
      </section>

      <section className={styles.career} id="experience" aria-labelledby="experience-title">
        <div className={`${styles.wrap} ${styles.careerInner}`}>
          <header><p className={styles.eyebrow}>Experience</p><h2 id="experience-title">A career in engineering quality.</h2></header>
          <ol>{career.map((item) => <li key={`${item.company}-${item.period}`}><span>{item.period}</span><div><h3>{item.company}</h3><h4>{item.role}</h4><p>{item.detail}</p></div></li>)}</ol>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.details}`} aria-label="Credentials, publications, and Qunara">
        <article><p className={styles.eyebrow}>Education & credentials</p><ul>{credentials.map((item) => <li key={item}><Check aria-hidden="true"/>{item}</li>)}</ul></article>
        <article><p className={styles.eyebrow}>Selected publications</p>{publications.map((item) => <div className={styles.publication} key={item.title}><h3>{item.title}</h3><p>{item.venue}</p></div>)}</article>
        <article className={styles.qunara}><p className={styles.eyebrow}>Independent work</p><h2>Qunara</h2><p>A bilingual educational platform exploring quantum science, Buddhist philosophy, and contemplative practice while keeping evidence and interpretation distinct.</p><a href="https://qunara.ai/en/about">Read the Qunara story <ExternalLink aria-hidden="true"/></a></article>
      </section>

      <section className={`${styles.wrap} ${styles.contact}`} id="contact" aria-labelledby="contact-title">
        <div><p className={styles.eyebrow}>Contact</p><h2 id="contact-title">Bring me a difficult system.</h2><p>I’m interested in engineering problems where reliability, evidence, automation, and AI meet.</p></div>
        <div><a href="mailto:nhatdohoang@yahoo.com"><Mail aria-hidden="true"/>nhatdohoang@yahoo.com</a><span><MapPin aria-hidden="true"/>San Jose, California</span><a href="/hoang/Hoang-Do-Resume.pdf" download><Download aria-hidden="true"/>Download résumé</a></div>
      </section>
    </div>

    <footer className={`${styles.wrap} ${styles.footer}`}><span>Hoang Do · San Jose, California</span><a href="https://qunara.ai">Qunara · An independent project <ExternalLink aria-hidden="true"/></a></footer>
  </div>;
}

function InkWorkspace() {
  const [step, setStep] = useState(0);
  const item = investigationSteps[step];
  return <div className={styles.demoGrid}>
    <section className={styles.panel}><span>Investigation path</span><div className={styles.stageList}>{investigationSteps.map((entry, index) => <button type="button" key={entry.label} aria-current={index === step ? "step" : undefined} onClick={() => setStep(index)}><i/>{entry.label}</button>)}</div></section>
    <section className={styles.panel}><span>{item.actor}</span><h4>{item.title}</h4><p>{item.detail}</p></section>
    <section className={`${styles.panel} ${styles.paper}`}><span>Evidence trail</span><strong>{item.evidence}</strong><p>Signals belong to a fictional tenant and synthetic incident.</p></section>
    <section className={styles.panel}><span>{step === investigationSteps.length - 1 ? "Verdict" : "Assessment"}</span><h4>{step === investigationSteps.length - 1 ? "Probable handoff failure after queue acceptance." : "The investigation remains open."}</h4><p>{step === investigationSteps.length - 1 ? "The result states its uncertainty and preserves the evidence needed for escalation." : "Select each stage to follow the evidence before reaching a verdict."}</p></section>
  </div>;
}

function EchoWorkspace() {
  const [step, setStep] = useState(0);
  const [outcome, setOutcome] = useState<"verified" | "bug">("verified");
  return <div className={styles.demoGrid}>
    <section className={styles.panel}><span>Test mission</span><strong>Create a sample nurture campaign for a fictional audience.</strong><div className={styles.stepList}>{echoMission.map(([title], index) => <button type="button" key={title} aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}><b>{index < step ? "✓" : index + 1}</b>{title}</button>)}</div></section>
    <section className={styles.panel}><span>Conversation trace</span><div className={styles.chat}><p>Create a nurture campaign for this sample audience.</p><p>{step < 2 ? "Which approved sample email should I use?" : "The synthetic campaign has been created with the approved sample email."}</p></div></section>
    <section className={`${styles.panel} ${styles.paper}`}><span>Captured evidence</span><h4>{echoMission[step][0]}</h4><p>{echoMission[step][1]}</p></section>
    <section className={styles.panel}><span>Outcome verification</span><div className={styles.toggle} role="group" aria-label="Choose synthetic outcome"><button type="button" aria-pressed={outcome === "verified"} onClick={() => setOutcome("verified")}>Verified</button><button type="button" aria-pressed={outcome === "bug"} onClick={() => setOutcome("bug")}>Bug artifact</button></div><h4>{outcome === "verified" ? "Observed state matches the mission." : "Authorization boundary reproduced."}</h4><p>{outcome === "verified" ? "UI state, network response, and conversation evidence agree." : "Expected behavior, observed behavior, and replay steps are preserved without internal data."}</p></section>
  </div>;
}

function EvalsWorkspace() {
  const [scores, setScores] = useState([2, 5, 5, 3, 4]);
  return <div className={styles.demoGrid}>
    <section className={styles.panel}><span>Assistant response · sample</span><strong>“The QA Validation feature confirms your program meets all compliance requirements.”</strong><p>The synthetic evaluator checks whether the assurance is supported by available evidence.</p></section>
    <section className={`${styles.panel} ${styles.paper}`}><span>Rubric · 1 to 5</span>{evalDimensions.map((dimension, index) => <label className={styles.score} key={dimension}><span>{dimension}</span><input aria-label={`${dimension} score`} type="range" min="1" max="5" value={scores[index]} onChange={(event) => setScores((values) => values.map((value, scoreIndex) => scoreIndex === index ? Number(event.target.value) : value))}/><b>{scores[index]}/5</b></label>)}</section>
    <section className={styles.panel}><span>Specific finding</span><h4>Unsupported assurance flagged.</h4><p>The finding points to the exact claim and identifies the missing product evidence.</p></section>
    <section className={styles.panel}><span>Cross-session use</span><h4>One score is not the whole result.</h4><p>Per-session findings can be compared across runs to identify repeated weaknesses, contradictions, and regressions.</p></section>
  </div>;
}

function LoadsWorkspace() {
  const [selected, setSelected] = useState(2);
  const skill = loadSkillResults[selected];
  return <div className={styles.demoGrid}>
    <section className={styles.panel}><span>Supplied sample · one run</span><div className={styles.bigNumber}>564</div><strong>Total requests</strong><div className={styles.metrics}><div><b>564</b><small>skill invocations</small></div><div><b>100%</b><small>invocation rate</small></div><div><b>0</b><small>failures</small></div><div><b>0</b><small>rate limits</small></div></div></section>
    <section className={`${styles.panel} ${styles.paper}`}><span>Inspect a skill</span><div className={styles.skillChoices}>{loadSkillResults.map((item, index) => <button type="button" key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.name}</button>)}</div><h4>{skill.name}</h4><p>{skill.requests} requests and invocations · {skill.averageToolCalls} average tool calls in the supplied sample.</p></section>
    <section className={styles.panel}><span>Report dimensions</span><ul className={styles.signalList}><li>Latency</li><li>Skill invocation</li><li>Token use</li><li>Failures and rate limits</li></ul></section>
    <section className={styles.panel}><span>Interpretation</span><h4>One run. Measured, not extrapolated.</h4><p>The supplied figures describe this recorded sample only. They do not establish general capacity or future performance.</p></section>
  </div>;
}
