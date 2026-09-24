"use client";

import Image from "next/image";
import { Check, Download, ExternalLink, Mail, MapPin } from "lucide-react";

import {
  career,
  credentials,
  publications,
  skillGroups,
} from "./portfolio-data";
import { ProjectShowcase } from "./project-showcase";
import styles from "./portfolio.module.css";

export function HoangPortfolio() {
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

        <ProjectShowcase/>

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
