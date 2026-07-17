"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EditorialQuote } from "./editorial-quote";

export type SceneArt = "childhood" | "technology" | "return" | "quantum" | "community";

export function StoryScene({ id, number, eyebrow, title, quote, art, reverse = false, children }: { id: string; number: string; eyebrow: string; title: ReactNode; quote?: ReactNode; art: SceneArt; reverse?: boolean; children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  return <motion.section className={`about-story-scene about-scene-${art}${reverse ? " reverse" : ""}`} id={id} initial={reduceMotion ? false : { opacity: .9, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: reduceMotion ? 0 : .55, ease: [0.22, 1, 0.36, 1] }}>
    <div className="q-shell about-scene-grid">
      <div className="about-scene-copy">
        <span className="about-scene-number">{number}</span>
        <p className="q-kicker">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="about-scene-prose">{children}</div>
        {quote && <EditorialQuote>{quote}</EditorialQuote>}
      </div>
      <SceneStudy art={art}/>
    </div>
  </motion.section>;
}

function SceneStudy({ art }: { art: SceneArt }) {
  const labels: Record<SceneArt, string> = {
    childhood: "A modest Vietnamese family shrine, a bell, incense, and palm leaves in warm evening light",
    technology: "Calm architectural lines suggesting code, systems, and a human hand at a keyboard",
    return: "A familiar path seen differently after a storm",
    quantum: "Wave interference and information patterns opening into a field of probabilities",
    community: "Many quiet paths meeting beneath a lotus-like geometry of stars",
  };
  if (art === "childhood") return <ChildhoodStudy label={labels.childhood}/>;
  if (art === "technology") return <TechnologyStudy label={labels.technology}/>;
  if (art === "return") return <ReturnStudy label={labels.return}/>;
  if (art === "quantum") return <QuantumStudy label={labels.quantum}/>;
  if (art === "community") return <CommunityStudy label={labels.community}/>;
  return <div className={`about-scene-study ${art}`} role="img" aria-label={labels[art]}>
    <svg viewBox="0 0 720 720" aria-hidden="true">
      <circle className="study-orbit one" cx="360" cy="360" r="215"/>
      <circle className="study-orbit two" cx="360" cy="360" r="145"/>
      <path className="study-line" d="M70 520C210 400 270 540 380 390S570 260 660 165"/>
      <path className="study-line secondary" d="M80 575C220 455 290 590 405 430S590 315 680 220"/>
      {Array.from({ length: 18 }, (_, i) => <circle className="study-point" key={i} cx={95 + (i * 83) % 550} cy={90 + (i * 109) % 540} r={i % 5 === 0 ? 3 : 1.4}/>) }
    </svg>
    <span>{art}</span>
  </div>;
}

function ChildhoodStudy({ label }: { label: string }) {
  return <div className="about-scene-study childhood" role="img" aria-label={label}>
    <svg className="childhood-shrine-study" viewBox="0 0 720 720" aria-hidden="true">
      <defs>
        <linearGradient id="childhood-evening" x2="0" y2="1"><stop stopColor="#3a2c27"/><stop offset=".58" stopColor="#18232a"/><stop offset="1" stopColor="#09131d"/></linearGradient>
        <radialGradient id="childhood-lamp"><stop stopColor="#e8c56a" stopOpacity=".5"/><stop offset="1" stopColor="#d5ac4d" stopOpacity="0"/></radialGradient>
        <filter id="incense-soft"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      <rect width="720" height="720" fill="url(#childhood-evening)"/>
      <circle cx="486" cy="286" r="220" fill="url(#childhood-lamp)"/>
      <path d="M80 610Q185 530 285 590T480 570T720 525V720H80Z" fill="#0a151d" opacity=".62"/>
      <g className="shrine-frame" fill="none" stroke="#c9a85d" strokeOpacity=".5">
        <path d="M276 540h308M306 540V252h248v288M285 252h290M325 252v-48h210v48M365 204v-36h130v36"/>
        <path d="M336 466h188M350 440h160M430 440v100"/>
      </g>
      <g className="quan-am-symbol" transform="translate(430 312)" fill="none" stroke="#e0c77e" strokeOpacity=".65">
        <circle cx="0" cy="0" r="22"/>
        <path d="M0 25c-34 20-41 69 0 102 41-33 34-82 0-102Z"/>
        <path d="M0 70c-29-22-57-7-64 16 28 3 47 16 64 40M0 70c29-22 57-7 64 16-28 3-47 16-64 40"/>
        <path d="M-55 139Q0 112 55 139M-39 151Q0 132 39 151"/>
      </g>
      <g className="incense-bowl">
        <path d="M197 540q38 28 76 0l-8 38h-60Z" fill="#8a6843" stroke="#cfad64" strokeOpacity=".55"/>
        <path d="M218 540V414M236 540V397M254 540V426" stroke="#c39d55" strokeWidth="2"/>
      </g>
      <g className="incense-smoke" fill="none" stroke="#d9e0dc" strokeLinecap="round" filter="url(#incense-soft)">
        <path d="M218 408C177 361 254 329 211 279S235 205 219 159"/>
        <path d="M236 390C279 344 205 313 248 258S225 190 245 137"/>
        <path d="M254 420C292 382 238 350 272 313"/>
      </g>
      <g className="temple-bell" transform="translate(110 245)">
        <path d="M25 0h70M60 0v30M25 96q8-56 35-66 27 10 35 66Z" fill="#312a23" stroke="#d1ad60" strokeOpacity=".72"/>
        <path d="M16 96h88M58 96v17" stroke="#d1ad60" strokeOpacity=".72"/>
        <circle cx="58" cy="119" r="6" fill="#c49e55"/>
      </g>
      <g className="palm-leaves" fill="none" stroke="#688475" strokeOpacity=".52" strokeLinecap="round">
        <path d="M650 720Q615 545 636 376M635 455q-74-40-113-104M638 480q58-58 70-126M630 525q-82-16-130-60M634 550q48-45 76-101" strokeWidth="7"/>
      </g>
    </svg>
    <span>Childhood · Vietnam</span>
  </div>;
}

function TechnologyStudy({ label }: { label: string }) {
  return <div className="about-scene-study technology" role="img" aria-label={label}>
    <svg className="technology-system-study" viewBox="0 0 720 720" aria-hidden="true">
      <defs>
        <linearGradient id="technology-room" x2="1" y2="1"><stop stopColor="#07141e"/><stop offset=".55" stopColor="#102938"/><stop offset="1" stopColor="#0a1722"/></linearGradient>
        <linearGradient id="glass-panel" x2="1"><stop stopColor="#b9d0d8" stopOpacity=".03"/><stop offset=".5" stopColor="#d9e5e8" stopOpacity=".12"/><stop offset="1" stopColor="#718b99" stopOpacity=".025"/></linearGradient>
        <radialGradient id="human-light"><stop stopColor="#d5ac4d" stopOpacity=".18"/><stop offset="1" stopColor="#d5ac4d" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="720" height="720" fill="url(#technology-room)"/>
      <ellipse cx="562" cy="520" rx="220" ry="190" fill="url(#human-light)"/>
      <g className="system-architecture" fill="none" stroke="#91abb8" strokeOpacity=".36">
        <rect x="82" y="108" width="142" height="84" rx="4"/>
        <rect x="300" y="108" width="142" height="84" rx="4"/>
        <rect x="518" y="108" width="120" height="84" rx="4"/>
        <rect x="192" y="300" width="142" height="84" rx="4"/>
        <rect x="410" y="300" width="142" height="84" rx="4"/>
        <path d="M224 150h76M442 150h76M153 192v66h110v42M371 192v66H263M578 192v66H481v42M334 342h76"/>
      </g>
      <g className="system-nodes" fill="#d5ac4d">{[[153,150],[371,150],[578,150],[263,342],[481,342]].map(([cx,cy], i) => <circle key={i} cx={cx} cy={cy} r="4"/>)}</g>
      <g className="glass-code" transform="translate(58 405)">
        <rect width="390" height="220" rx="6" fill="url(#glass-panel)" stroke="#c5d6dc" strokeOpacity=".18"/>
        <g fill="none" strokeLinecap="round">
          <path d="M32 42h105M157 42h54M32 75h48M98 75h135M251 75h72M32 108h76M127 108h42M187 108h113M32 141h135M185 141h82M32 174h62M112 174h151" stroke="#9db2bc" strokeOpacity=".34" strokeWidth="5"/>
          <path d="M157 42h54M98 75h57M251 75h72M127 108h42M185 141h82M112 174h58" stroke="#d5ac4d" strokeOpacity=".55" strokeWidth="5"/>
        </g>
      </g>
      <g className="technology-human" transform="translate(500 426)" fill="#060d13">
        <circle cx="62" cy="42" r="28"/>
        <path d="M33 80q29-20 58 0l26 168H4Z"/>
        <path d="M40 117-27 184l15 15 80-57M85 117l51 57-13 14-64-46"/>
      </g>
      <path d="M440 618h236" stroke="#d5ac4d" strokeOpacity=".28"/>
    </svg>
    <span>Systems · Evidence · Change</span>
  </div>;
}

function ReturnStudy({ label }: { label: string }) {
  return <div className="about-scene-study return" role="img" aria-label={label}>
    <svg className="returning-light-study" viewBox="0 0 720 720" aria-hidden="true">
      <defs>
        <linearGradient id="return-sky" x2="1" y2="1"><stop stopColor="#09131e"/><stop offset=".5" stopColor="#172735"/><stop offset="1" stopColor="#765942"/></linearGradient>
        <radialGradient id="return-light"><stop stopColor="#efca72" stopOpacity=".54"/><stop offset=".45" stopColor="#d7a95a" stopOpacity=".16"/><stop offset="1" stopColor="#d7a95a" stopOpacity="0"/></radialGradient>
        <linearGradient id="return-water" x2="0" y2="1"><stop stopColor="#486373" stopOpacity=".7"/><stop offset="1" stopColor="#0a1822"/></linearGradient>
      </defs>
      <rect width="720" height="720" fill="url(#return-sky)"/>
      <circle cx="572" cy="220" r="245" fill="url(#return-light)"/>
      <path d="M0 410Q125 335 240 397T465 365T720 318V720H0Z" fill="#17252c" opacity=".78"/>
      <path d="M0 490Q170 413 325 472T720 410V720H0Z" fill="#0a171f"/>
      <path d="M0 510Q165 465 340 520T720 480V720H0Z" fill="url(#return-water)"/>
      <g className="water-lines" fill="none" stroke="#b9cbd0" strokeLinecap="round">
        <path d="M20 554q90-27 180 0t180 0 180 0 180 0"/>
        <path d="M-20 601q80-22 160 0t160 0 160 0 160 0 160 0"/>
        <path d="M35 651q65-17 130 0t130 0 130 0 130 0 130 0"/>
      </g>
      <g className="distant-temple" transform="translate(454 322)" fill="#101a1d" stroke="#c7a65b" strokeOpacity=".3">
        <path d="M0 118h205M30 118V54h145v64M12 54h181L160 30H45ZM66 30V9h75v21M55 9h97L128-5H79Z"/>
        <path d="M82 118V74h40v44"/>
      </g>
      <g className="season-tree" fill="none" stroke="#322b25" strokeLinecap="round">
        <path d="M125 516Q151 366 132 175M139 312q-65-68-111-61M137 277q61-77 113-77M130 380q-75-45-116-24M131 351q54-55 100-42" strokeWidth="11"/>
      </g>
      <g className="return-leaves" fill="#b8864f">
        {[[42,231,-20],[223,182,28],[78,337,12],[266,294,-30],[180,246,45],[304,372,18],[92,419,-14],[238,438,34]].map(([x,y,r], i) => <path key={i} transform={`translate(${x} ${y}) rotate(${r})`} d="M0 0q16-12 30 0Q17 20 0 0Z"/>)}
      </g>
      <path d="M445 548Q540 521 636 548" fill="none" stroke="#d5ac4d" strokeOpacity=".32" strokeWidth="2"/>
    </svg>
    <span>Change · Attention · Return</span>
  </div>;
}

function QuantumStudy({ label }: { label: string }) {
  return <div className="about-scene-study quantum" role="img" aria-label={label}>
    <svg className="ai-quantum-study" viewBox="0 0 720 720" aria-hidden="true">
      <defs>
        <linearGradient id="ai-quantum-bg" x2="1" y2="1"><stop stopColor="#08141e"/><stop offset=".52" stopColor="#141a2d"/><stop offset="1" stopColor="#1e1830"/></linearGradient>
        <radialGradient id="probability-wash"><stop stopColor="#8e79b6" stopOpacity=".25"/><stop offset="1" stopColor="#8e79b6" stopOpacity="0"/></radialGradient>
        <clipPath id="information-window"><rect x="56" y="92" width="205" height="500" rx="4"/></clipPath>
      </defs>
      <rect width="720" height="720" fill="url(#ai-quantum-bg)"/>
      <ellipse cx="535" cy="350" rx="250" ry="270" fill="url(#probability-wash)"/>
      <g className="quantum-stars" fill="#dce7ed">{Array.from({ length: 38 }, (_, i) => <circle key={i} cx={345 + (i * 101) % 335} cy={65 + (i * 73) % 510} r={i % 11 === 0 ? 1.7 : .7} opacity={.14 + (i % 5) * .07}/>)}</g>
      <g className="information-field" clipPath="url(#information-window)">
        {Array.from({ length: 11 }, (_, row) => <g key={row} transform={`translate(72 ${116 + row * 42})`}>
          {Array.from({ length: 7 }, (_, col) => <rect key={col} x={col * 26} width={col % 3 === row % 3 ? 13 : 5} height="5" rx="2.5" fill={col % 4 === 0 ? "#d5ac4d" : "#8da4b4"} opacity={.28 + ((row + col) % 4) * .12}/>) }
        </g>)}
      </g>
      <rect x="56" y="92" width="205" height="500" rx="4" fill="none" stroke="#b8cad1" strokeOpacity=".15"/>
      <g className="information-bridge" fill="none" stroke="#a7b8c5" strokeOpacity=".24">
        <path d="M261 225C310 225 304 286 348 286"/><path d="M261 342C316 342 300 342 365 342"/><path d="M261 459C310 459 304 398 348 398"/>
      </g>
      <g className="interference-waves" fill="none" strokeLinecap="round">
        <path d="M330 286q58-112 116 0t116 0 116 0" stroke="#d5ac4d" strokeOpacity=".48"/>
        <path d="M330 398q58 112 116 0t116 0 116 0" stroke="#91a9cc" strokeOpacity=".48"/>
        <path d="M330 342q43-54 86 0t86 0 86 0 86 0" stroke="#aa92ce" strokeOpacity=".4"/>
      </g>
      <g className="probability-points">{Array.from({ length: 26 }, (_, i) => <circle key={i} cx={405 + (i * 89) % 270} cy={165 + (i * 127) % 390} r={i % 7 === 0 ? 5 : 2} fill={i % 3 === 0 ? "#d5ac4d" : "#9caed0"} opacity={.18 + (i % 5) * .1}/>)}</g>
      <g className="lotus-geometry" transform="translate(579 560)" fill="none" stroke="#91aa91" strokeOpacity=".34">
        <path d="M0 42C-42 11-38-25 0-46 38-25 42 11 0 42Z"/>
        <path d="M0 42C-30 10-67 15-78 48-40 54-18 66 0 89M0 42C30 10 67 15 78 48 40 54 18 66 0 89"/>
        <path d="M-70 99Q0 66 70 99M-48 113Q0 91 48 113"/>
      </g>
      <path d="M294 620H676" stroke="#d5ac4d" strokeOpacity=".2"/>
    </svg>
    <span>Information · Probability · Inquiry</span>
  </div>;
}

function CommunityStudy({ label }: { label: string }) {
  return <div className="about-scene-study community" role="img" aria-label={label}>
    <svg className="qunara-composition-study" viewBox="0 0 720 720" aria-hidden="true">
      <defs>
        <linearGradient id="qunara-field" x2="1" y2="1"><stop stopColor="#07131d"/><stop offset=".52" stopColor="#111b2b"/><stop offset="1" stopColor="#132627"/></linearGradient>
        <radialGradient id="qunara-balance"><stop stopColor="#d5ac4d" stopOpacity=".19"/><stop offset="1" stopColor="#d5ac4d" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="720" height="720" fill="url(#qunara-field)"/>
      <circle cx="410" cy="342" r="300" fill="url(#qunara-balance)"/>
      <g className="qunara-star-field" fill="#e1e9ec">{Array.from({ length: 58 }, (_, i) => <circle key={i} cx={45 + (i * 127) % 640} cy={45 + (i * 91) % 530} r={i % 13 === 0 ? 1.8 : .7} opacity={.13 + (i % 5) * .075}/>)}</g>
      <g className="qunara-science-wave" fill="none" strokeLinecap="round">
        <path d="M55 352q65-125 130 0t130 0 130 0 130 0 130 0" stroke="#8fa9ca" strokeOpacity=".5" strokeWidth="2"/>
        <path d="M55 352q65 125 130 0t130 0 130 0 130 0 130 0" stroke="#d5ac4d" strokeOpacity=".42" strokeWidth="2"/>
        <path d="M55 352h610" stroke="#dbe4e7" strokeOpacity=".12" strokeDasharray="3 10"/>
      </g>
      <g className="qunara-lotus-form" transform="translate(438 296)" fill="none" stroke="#8eaa90" strokeOpacity=".55">
        <path d="M0 40C-49 1-43-44 0-70 43-44 49 1 0 40Z"/>
        <path d="M0 40C-37 0-79 8-91 50-48 55-21 72 0 107M0 40C37 0 79 8 91 50 48 55 21 72 0 107"/>
        <path d="M-79 119Q0 78 79 119M-54 136Q0 107 54 136"/>
      </g>
      <path className="qunara-human-path" d="M95 720C132 620 225 595 295 548s111-96 143-191" fill="none" stroke="#d5ac4d" strokeOpacity=".58" strokeWidth="3"/>
      <g className="qunara-walker" transform="translate(267 519)" fill="#060c11"><circle cx="18" cy="13" r="10"/><path d="M9 27q9-7 18 0l8 49H20l-3-27-7 27H-5Z"/></g>
      <g className="qunara-balance-lines" fill="none" stroke="#d5ac4d" strokeOpacity=".22"><circle cx="438" cy="350" r="188"/><circle cx="438" cy="350" r="245"/></g>
      <g className="qunara-distinction-labels" fontFamily="sans-serif" fontSize="9" letterSpacing="2"><text x="74" y="321" fill="#9cb1ca">MEASUREMENT</text><text x="493" y="491" fill="#9db39e">CONTEMPLATION</text><text x="78" y="674" fill="#d6b961">HUMAN EXPERIENCE</text></g>
    </svg>
    <span>Curiosity · Evidence · Humility</span>
  </div>;
}
