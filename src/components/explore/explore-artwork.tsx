export function ExploreArtwork(){return <svg viewBox="0 0 1400 900" role="img" aria-label="A universe of stars gradually forming the geometry of a lotus" className="explore-hero-art">
  <defs><radialGradient id="explore-nebula"><stop stopColor="#68578d" stopOpacity=".62"/><stop offset=".45" stopColor="#244963" stopOpacity=".28"/><stop offset="1" stopColor="#07111f" stopOpacity="0"/></radialGradient><linearGradient id="explore-horizon"><stop stopColor="#07111f" stopOpacity="0"/><stop offset="1" stopColor="#07111f"/></linearGradient><filter id="explore-blur"><feGaussianBlur stdDeviation="28"/></filter></defs>
  <rect width="1400" height="900" fill="#06101d"/><ellipse cx="940" cy="370" rx="500" ry="390" fill="url(#explore-nebula)" filter="url(#explore-blur)"/>
  <g fill="#e5c979">{Array.from({length:90},(_,i)=><circle key={i} cx={(i*193)%1380+10} cy={(i*127)%810+20} r={i%13===0?2.3:i%5===0?1.4:.7} opacity={.18+(i%6)*.1}/>)}</g>
  <g transform="translate(1015 430)" fill="none" strokeLinecap="round">{[0,45,90,135].map((a,i)=><ellipse key={a} rx="112" ry="270" transform={`rotate(${a})`} stroke={i%2?"#7c91b0":"#d8b45b"} strokeOpacity={i%2?".24":".46"}/>) }<circle r="174" stroke="#d8b45b" strokeOpacity=".14"/><circle r="8" fill="#d8b45b" stroke="none"/></g>
  <path d="M0 730C270 650 460 790 720 720s420-45 680 22v158H0z" fill="url(#explore-horizon)"/>
</svg>}
