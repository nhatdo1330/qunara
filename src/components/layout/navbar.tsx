"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [["Explore","/explore"],["Quantum","/quantum"],["Buddhism","/buddhism"],["Perspectives","/perspectives"],["Collections","/collections"],["About","/about"]];
export function Navbar() {
  const [open,setOpen]=useState(false); const pathname=usePathname();
  useEffect(()=>setOpen(false),[pathname]);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-midnight/80 backdrop-blur-xl">
    <div className="shell flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center gap-3 font-semibold tracking-[.18em]" aria-label="Qunara home"><Logo/>QUNARA</Link>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
        {links.map(([label,href])=><Link key={href} href={href} className={`text-xs transition hover:text-gold ${pathname===href?"text-gold":"text-mist"}`}>{label}</Link>)}
      </nav>
      <div className="flex items-center gap-2">
        <Link href="/explore" aria-label="Search resources" className="icon-button"><Search size={17}/></Link>
        <button className="icon-button lg:hidden" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open?<X size={19}/>:<Menu size={19}/>}</button>
      </div>
    </div>
    {open&&<nav className="border-t border-white/10 bg-midnight px-5 py-6 lg:hidden" aria-label="Mobile navigation">{links.map(([label,href])=><Link key={href} href={href} className="block border-b border-white/10 py-3 text-sm text-mist">{label}</Link>)}</nav>}
  </header>;
}
export function Logo(){return <span className="grid size-8 place-items-center rounded-full border border-gold/50 text-gold" aria-hidden="true"><span className="size-2 rounded-full border border-gold"/></span>}
