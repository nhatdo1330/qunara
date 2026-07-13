import { Resource } from "@/lib/types";

export function Artwork({ type, className = "" }: { type: Resource["art"]; className?: string }) {
  const ids = { wave:"wave-g", lotus:"lotus-g", orbit:"orbit-g", mountain:"mountain-g" } as const;
  const id = ids[type];
  return (
    <svg viewBox="0 0 800 520" role="img" aria-label={`Abstract ${type} illustration`} className={className}>
      <defs>
        <radialGradient id={id}><stop stopColor="#D4AF37" stopOpacity=".3"/><stop offset="1" stopColor="#07111f" stopOpacity="0"/></radialGradient>
        <filter id={`${id}-blur`}><feGaussianBlur stdDeviation="18"/></filter>
      </defs>
      <rect width="800" height="520" fill="#091728"/>
      <circle cx="590" cy="170" r="150" fill={`url(#${id})`} filter={`url(#${id}-blur)`}/>
      {type === "wave" && <>
        {[0,1,2,3,4].map(i=><path key={i} d={`M-20 ${185+i*38} C130 ${70+i*55}, 250 ${330-i*20}, 410 ${205+i*20} S650 ${110+i*45}, 840 ${220+i*25}`} fill="none" stroke={i===2?"#D4AF37":"#7890A8"} strokeOpacity={i===2?".8":".24"} strokeWidth={i===2?2:1}/>) }
        <circle cx="480" cy="258" r="6" fill="#D4AF37"/><circle cx="480" cy="258" r="28" fill="none" stroke="#D4AF37" strokeOpacity=".25"/>
      </>}
      {type === "lotus" && <g transform="translate(400 260)" fill="none" strokeLinecap="round">
        {[0,45,90,135].map(a=><ellipse key={a} rx="70" ry="170" transform={`rotate(${a})`} stroke="#D4AF37" strokeOpacity=".42"/>) }
        <circle r="105" stroke="#EDE8DA" strokeOpacity=".14"/><circle r="8" fill="#D4AF37" stroke="none"/>
      </g>}
      {type === "orbit" && <g transform="translate(405 255)" fill="none">
        {[0,55,110].map((a,i)=><ellipse key={a} rx={210-i*28} ry={70+i*4} transform={`rotate(${a})`} stroke={i===0?"#D4AF37":"#8094AA"} strokeOpacity={i===0?".58":".3"}/>) }
        <circle r="20" fill="#D4AF37" fillOpacity=".85"/><circle cx="170" cy="-26" r="7" fill="#F4F2EC"/>
      </g>}
      {type === "mountain" && <>
        <circle cx="570" cy="155" r="92" fill="none" stroke="#D4AF37" strokeOpacity=".5"/>
        <path d="M0 430L170 270l70 75 120-160 105 124 72-57 263 185v83H0z" fill="#13263A" stroke="#52677D" strokeOpacity=".55"/>
        <path d="M0 455c190-60 300 30 455-20s240-14 345 20" fill="none" stroke="#F4F2EC" strokeOpacity=".18" strokeWidth="22"/>
      </>}
      <g fill="#D4AF37">{[...Array(18)].map((_,i)=><circle key={i} cx={(i*137)%760+20} cy={(i*83)%460+30} r={i%4===0?1.8:.8} opacity={.18+(i%3)*.12}/>)}</g>
    </svg>
  );
}
