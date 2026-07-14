"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [["Home","/"],["Discover","/explore"],["Memories","/collections"],["Community","/perspectives"],["Resources","/quantum"],["About","/about"]];
export function Navbar() {
  const [open,setOpen]=useState(false); const pathname=usePathname();
  useEffect(()=>setOpen(false),[pathname]);
  return <header className={`site-nav ${pathname === "/" ? "home-nav" : "inner-nav"}`}>
    <div className="nav-shell">
      <Link href="/" className="brand" aria-label="Quantum and Buddhism home"><Logo/><span><b>Quantum &amp; Buddhism</b><small>Science. Wisdom. Compassion.</small></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,href])=><Link key={href} href={href} className={pathname===href?"active":""}>{label}</Link>)}</nav>
      <div className="nav-actions"><Link href="/explore" aria-label="Search"><Search/></Link><button aria-label="Change theme"><Moon/></button><Link className="sign-in" href="/contact">Sign In</Link><Link className="join" href="/contact">Join Us</Link><button className="menu-button" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></div>
    </div>
    {open&&<nav className="mobile-nav">{links.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}</nav>}
  </header>;
}
export function Logo(){return <span className="brand-mark" aria-hidden="true"><i/><i/><i/><b/></span>}
