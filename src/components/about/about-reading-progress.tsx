"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const scenes = [
  ["about-opening", "Opening"],
  ["childhood", "Childhood"],
  ["technology", "Technology"],
  ["rediscovery", "Listening again"],
  ["ai-quantum", "New questions"],
  ["principles", "Why Qunara"],
  ["community-invitation", "Invitation"],
] as const;
type SceneId = (typeof scenes)[number][0];

export function AboutReadingProgress() {
  const measuredProgress = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const scaleX = useSpring(measuredProgress, reduceMotion ? { stiffness: 1000, damping: 1000 } : { stiffness: 120, damping: 28, mass: .35 });
  const [active, setActive] = useState<SceneId>(scenes[0][0]);

  useEffect(() => {
    const updateProgress = () => {
      const story = document.getElementById("about-documentary");
      if (!story) return;
      const start = story.offsetTop;
      const distance = Math.max(1, story.offsetHeight - window.innerHeight);
      measuredProgress.set(Math.min(1, Math.max(0, (window.scrollY - start) / distance)));
    };
    const elements = scenes.map(([id]) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id as SceneId);
    }, { rootMargin: "-24% 0px -52%", threshold: [0, .15, .35, .6] });
    elements.forEach(element => observer.observe(element));
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [measuredProgress]);

  return <>
    <div className="about-reading-progress" aria-hidden="true"><motion.i style={{ scaleX }}/></div>
    <nav className="about-desktop-timeline" aria-label="Founder journey">
      {scenes.map(([id, label], index) => <a href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "step" : undefined} key={id}><span>{String(index + 1).padStart(2, "0")}</span><i/>{label}</a>)}
    </nav>
  </>;
}
