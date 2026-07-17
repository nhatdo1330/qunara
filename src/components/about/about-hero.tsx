import { ArrowDown } from "lucide-react";

export function AboutHero() {
  return <header className="about-film-hero" id="about-opening">
    <HeroStudy/>
    <div className="about-film-wash"/>
    <div className="q-shell about-film-copy">
      <p className="q-kicker">The story behind Qunara</p>
      <h1>I did not begin<br/><em>with answers.</em></h1>
      <p>I began with questions that followed me from childhood, through technology, and into the unknown.</p>
      <a href="#founder-journey">Follow the journey <ArrowDown/></a>
    </div>
  </header>;
}

function HeroStudy() {
  return <svg className="about-hero-study" viewBox="0 0 1440 900" role="img" aria-label="A quiet human silhouette stands before a deep night landscape and a restrained field of stars">
    <defs>
      <linearGradient id="about-hero-bg" x2="1" y2="1"><stop stopColor="#050c15"/><stop offset=".55" stopColor="#102334"/><stop offset="1" stopColor="#17172a"/></linearGradient>
      <radialGradient id="about-hero-light"><stop stopColor="#d8b65b" stopOpacity=".26"/><stop offset=".55" stopColor="#a17f45" stopOpacity=".08"/><stop offset="1" stopColor="#d8b65b" stopOpacity="0"/></radialGradient>
      <linearGradient id="about-ridge" x2="0" y2="1"><stop stopColor="#1d3444"/><stop offset="1" stopColor="#09121c"/></linearGradient>
      <filter id="about-soft"><feGaussianBlur stdDeviation="22"/></filter>
    </defs>
    <rect width="1440" height="900" fill="url(#about-hero-bg)"/>
    <ellipse cx="1110" cy="315" rx="370" ry="315" fill="url(#about-hero-light)"/>
    <circle cx="1135" cy="300" r="68" fill="#d2b361" opacity=".08" filter="url(#about-soft)"/>
    <g className="about-stars" fill="#e7edf0">{Array.from({ length: 64 }, (_, i) => <circle key={i} cx={690 + (i * 137) % 690} cy={55 + (i * 83) % 470} r={i % 17 === 0 ? 1.9 : i % 7 === 0 ? 1.2 : .65} opacity={.12 + (i % 6) * .065}/>)}</g>
    <g fill="#d5ac4d"><circle cx="1118" cy="174" r="2.2" opacity=".72"/><circle cx="1260" cy="352" r="1.5" opacity=".55"/><circle cx="938" cy="246" r="1.3" opacity=".5"/></g>
    <path d="M0 675Q190 585 365 650T720 620T1050 600T1440 555V900H0Z" fill="#172b38" opacity=".72"/>
    <path d="M0 735Q210 650 430 705T835 680T1170 625T1440 650V900H0Z" fill="url(#about-ridge)"/>
    <path d="M0 800Q265 735 510 785T910 755T1440 710V900H0Z" fill="#07111a"/>
    <path className="about-gold-path" d="M760 900C815 770 875 710 956 660s142-108 187-205" fill="none" stroke="#d5ac4d" strokeOpacity=".3" strokeWidth="1.5"/>
    <g className="about-human" transform="translate(1042 493)" fill="#050b11">
      <circle cx="47" cy="38" r="24"/>
      <path d="M29 67Q47 57 66 68Q77 129 72 201L96 306H70L48 223L28 306H2l21-108Q15 123 29 67Z"/>
      <path d="M27 88Q4 132-12 175l17 7 31-62M66 88q23 44 39 87l-17 7-31-62"/>
    </g>
    <ellipse cx="1089" cy="806" rx="88" ry="17" fill="#000" opacity=".32"/>
  </svg>;
}
