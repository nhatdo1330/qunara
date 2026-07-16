export function LearnIllustration({path,chapter=1,className=""}:{path:"quantum"|"buddhism";chapter?:number;className?:string}){const id=`learn-${path}-${chapter}`;const variant=(chapter-1)%4;return <svg viewBox="0 0 1000 650" className={className} role="img" aria-label={path==="quantum"?"Editorial illustration of particles, waves, and the night sky":"Editorial ink landscape with mountains, water, and a Bodhi tree"}>
  <defs><linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor={path==="quantum"?"#071528":"#132735"}/><stop offset="1" stopColor={path==="quantum"?"#102a42":"#d9d0bd"}/></linearGradient><radialGradient id={`${id}-glow`}><stop stopColor="#e0b654" stopOpacity=".48"/><stop offset="1" stopColor="#e0b654" stopOpacity="0"/></radialGradient><filter id={`${id}-blur`}><feGaussianBlur stdDeviation="14"/></filter></defs>
  <rect width="1000" height="650" fill={`url(#${id}-sky)`}/>
  {path==="quantum"?<QuantumScene id={id} variant={variant}/>:<WisdomScene id={id} variant={variant}/>} 
</svg>}
function QuantumScene({id,variant}:{id:string;variant:number}){return <>
  <circle cx={variant%2?"710":"770"} cy={variant%2?"235":"175"} r="180" fill={`url(#${id}-glow)`} filter={`url(#${id}-blur)`}/>
  {Array.from({length:38},(_,i)=><circle key={i} cx={(i*173)%960+20} cy={(i*97)%590+20} r={i%7===0?2:1} fill={i%5===0?"#D8B052":"#C7D4DF"} opacity={.18+(i%4)*.13}/>)}
  {variant===0&&<><path d="M-20 380C130 210 240 540 390 350S680 205 1020 370" fill="none" stroke="#D8B052" strokeWidth="3"/><path d="M-20 420C180 275 260 500 430 390S730 285 1020 420" fill="none" stroke="#8AA6BB" strokeOpacity=".5"/><circle cx="390" cy="350" r="8" fill="#F1D183"/></>}
  {variant===1&&<><path d="M500 60v530" stroke="#D8B052" strokeOpacity=".35"/><path d="M455 250v150M545 250v150" stroke="#E8E1D2" strokeWidth="10"/><path d="M0 215C280 215 300 310 455 325M1000 215C720 215 700 310 545 325" fill="none" stroke="#7995AB" strokeOpacity=".45"/><path d="M555 325c150-90 255-90 445 0M555 325c150 90 255 90 445 0" fill="none" stroke="#D8B052" strokeOpacity=".7"/></>}
  {variant===2&&<g transform="translate(500 325)" fill="none">{[0,52,104].map((a,i)=><ellipse key={a} rx={250-i*35} ry={85+i*8} transform={`rotate(${a})`} stroke={i===0?"#D8B052":"#829EB4"} strokeOpacity={i===0?".72":".38"}/>) }<circle r="22" fill="#D8B052" stroke="none"/><circle cx="206" cy="-40" r="8" fill="#EDE6D8" stroke="none"/></g>}
  {variant===3&&<>{Array.from({length:12},(_,i)=><g key={i}><circle cx={110+(i%4)*245} cy={170+Math.floor(i/4)*160} r="9" fill="#D8B052"/><path d={`M${110+(i%4)*245} ${170+Math.floor(i/4)*160}L${355+(i%3)*245} ${170+((i+1)%3)*160}`} stroke="#8FA8BA" strokeOpacity=".28"/></g>)}</>}
  <path d="M0 560Q250 500 500 555T1000 535V650H0Z" fill="#07111F" fillOpacity=".72"/>
</>}
function WisdomScene({id,variant}:{id:string;variant:number}){return <>
  <circle cx={variant%2?"275":"735"} cy="155" r="92" fill="#D7AD51" fillOpacity=".55"/><circle cx={variant%2?"275":"735"} cy="155" r="145" fill={`url(#${id}-glow)`}/>
  <path d="M0 440L180 260l96 112 128-174 110 136 100-96 176 193 95-107 115 116v210H0z" fill="#354B52" fillOpacity=".52"/>
  <path d="M0 485C185 440 290 525 465 474S760 450 1000 493v157H0z" fill="#E1DACB" fillOpacity=".72"/>
  <path d="M0 520C180 480 310 575 505 518S810 500 1000 535" fill="none" stroke="#71898B" strokeOpacity=".58" strokeWidth="3"/>
  {variant===0&&<Tree x={665} y={445}/>} {variant===1&&<><Tree x={235} y={460}/><path d="M590 435c55-45 126-45 180 0-62 18-121 18-180 0z" fill="none" stroke="#B38D42" strokeWidth="3"/></>}
  {variant===2&&<><path d="M345 475c85-75 210-75 300 0" fill="none" stroke="#A78443" strokeWidth="5"/><path d="M400 472c60-50 135-50 190 0" fill="none" stroke="#71898B" strokeWidth="2"/><circle cx="497" cy="438" r="8" fill="#C59C49"/></>}
  {variant===3&&<><Tree x={780} y={450}/>{Array.from({length:6},(_,i)=><path key={i} d={`M${150+i*78} ${465-i%2*12}q35-28 70 0q-35 17-70 0z`} fill="none" stroke="#8C7445" strokeOpacity=".7"/>)}</>}
  <path d="M0 606c170-35 330 22 510-10s332-5 490 18" fill="none" stroke="#1D313A" strokeOpacity=".28" strokeWidth="16"/>
</>}
function Tree({x,y}:{x:number;y:number}){return <g transform={`translate(${x} ${y})`}><path d="M0 50c-4-66 8-122-4-184m3 96c-48-25-73-62-91-104m94 55c45-32 68-67 83-111" fill="none" stroke="#473E2F" strokeWidth="10" strokeLinecap="round"/>{[[-92,-155],[-54,-126],[-22,-173],[18,-155],[56,-185],[85,-130],[20,-95],[-55,-75]].map(([cx,cy],i)=><path key={i} d={`M${cx-25} ${cy}q25-42 50 0q-25 31-50 0z`} fill={i%3===0?"#B18B41":"#4C6C5B"} fillOpacity=".85"/>)}</g>}
