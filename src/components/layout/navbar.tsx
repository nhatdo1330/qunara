"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const links=[["Learn","/learn"],["Explore","/explore"],["Practice","/practice"],["Community","/community"],["Research","/research"],["About","/about"]];
export function Navbar(){const [open,setOpen]=useState(false);const pathname=usePathname();useEffect(()=>setOpen(false),[pathname]);return <header className="q-nav"><div className="q-shell q-nav-inner"><Link href="/" className="q-brand" aria-label="Qunara home"><Logo/><span><b>QUNARA</b><small>Science · Wisdom · Practice</small></span></Link><nav className="q-nav-links" aria-label="Main navigation">{links.map(([label,href])=><Link key={href} href={href} className={pathname.startsWith(href)?"active":""}>{label}</Link>)}</nav><div className="q-nav-actions"><Link href="/search" aria-label="Search Qunara"><Search/></Link><Link href="/learn" className="q-nav-cta">Start learning</Link><button onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button></div></div>{open&&<nav className="q-mobile-nav" aria-label="Mobile navigation">{links.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}<Link href="/search">Search</Link></nav>}</header>}
export function Logo(){return <span className="q-logo" aria-hidden="true"><i/><i/><i/><b/></span>}
