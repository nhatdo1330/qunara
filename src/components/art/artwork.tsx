import { Resource } from "@/lib/types";

export function Artwork({ type, className = "" }: { type: Resource["art"]; className?: string }) {
  const ids = { wave:"wave-g", lotus:"lotus-g", orbit:"orbit-g", mountain:"mountain-g", buddha:"buddha-g", bodhi:"bodhi-g" } as const;
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
      {type === "bodhi" && <g>
        <circle cx="400" cy="235" r="178" fill="none" stroke="#D4AF37" strokeOpacity=".18"/>
        <path d="M397 485c-5-83 7-142-3-221-6-49-33-77-58-109m58 117c34-28 69-58 93-108m-91 146c-43-29-89-34-131-25m130-65c-7-38 8-79 30-116" fill="none" stroke="#B8974A" strokeWidth="12" strokeLinecap="round"/>
        <path d="M397 486c-36 4-74 14-108 31m109-31c37 5 73 15 112 31" fill="none" stroke="#B8974A" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round"/>
        {["263,275","290,224","322,178","350,132","399,99","447,119","486,154","512,213","474,258","438,210","355,254","315,309","482,313","426,159"].map((p,i)=>{const [cx,cy]=p.split(",");return <path key={p} d={`M${cx} ${Number(cy)+28}c-${18+i%3*3}-25-${13+i%2*4}-45 0-57 17 13 29 33 0 57z`} fill={i%3===0?"#D4AF37":"#587565"} fillOpacity={i%3===0?".5":".55"}/>})}
        <path d="M305 485c30-28 59-40 91-43 34 3 65 17 96 43-58 13-126 13-187 0z" fill="#12283A" stroke="#D4AF37" strokeOpacity=".28"/>
      </g>}
      {type === "buddha" && <g transform="translate(400 270)">
        <circle cy="-72" r="176" fill="none" stroke="#D4AF37" strokeOpacity=".25"/>
        <circle cy="-112" r="54" fill="#1B3040" stroke="#D4AF37" strokeOpacity=".55"/>
        <path d="M-43-131c18-31 68-34 88 0-15-10-29-14-44-14s-30 4-44 14z" fill="#B28D45" fillOpacity=".55"/>
        <path d="M-14-112c8 5 20 5 28 0m-31 22c11 8 23 8 34 0" fill="none" stroke="#EDE8DA" strokeOpacity=".45" strokeLinecap="round"/>
        <path d="M-58-58c-70 38-94 99-99 176h314c-5-77-30-138-100-176-33 28-81 28-115 0z" fill="#152B3C" stroke="#D4AF37" strokeOpacity=".45"/>
        <path d="M-70 5c-37 35-58 71-68 108m208-108c38 35 59 71 68 108M-88 81c53 29 122 29 176 0" fill="none" stroke="#7E91A1" strokeOpacity=".45" strokeLinecap="round"/>
        <path d="M-166 128c54-21 108-21 166 0 57-21 111-21 166 0-89 40-244 40-332 0z" fill="#0E2131" stroke="#D4AF37" strokeOpacity=".5"/>
      </g>}
      <g fill="#D4AF37">{[...Array(18)].map((_,i)=><circle key={i} cx={(i*137)%760+20} cy={(i*83)%460+30} r={i%4===0?1.8:.8} opacity={.18+(i%3)*.12}/>)}</g>
    </svg>
  );
}
