import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { Logo } from "./navbar";
export function Footer(){return <footer className="border-t border-white/10 bg-[#050c16]">
  <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
    <div><div className="mb-5 flex items-center gap-3 font-semibold tracking-[.18em]"><Logo/>QUNARA</div><p className="max-w-sm text-sm leading-7 text-mist">Trusted paths through science, philosophy, consciousness, and human experience.</p></div>
    <div><p className="footer-label">Explore</p>{[["Quantum","/quantum"],["Buddhism","/buddhism"],["Perspectives","/perspectives"],["Collections","/collections"]].map(([l,h])=><Link className="footer-link" href={h} key={h}>{l}</Link>)}</div>
    <div><p className="footer-label">Qunara</p>{[["About","/about"],["Contact","/contact"],["Editorial standards","/about#standards"]].map(([l,h])=><Link className="footer-link" href={h} key={h}>{l}</Link>)}</div>
  </div>
  <div className="shell flex flex-col gap-5 border-t border-white/10 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Qunara. Inquiry with integrity.</p><div className="flex gap-2"><a className="icon-button" href="mailto:hello@qunara.org" aria-label="Email"><Mail size={15}/></a><a className="icon-button" href="#" aria-label="LinkedIn"><Linkedin size={15}/></a><a className="icon-button" href="#" aria-label="GitHub"><Github size={15}/></a></div></div>
</footer>}
