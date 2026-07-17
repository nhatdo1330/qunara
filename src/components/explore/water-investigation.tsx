"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Droplets, Eye, Filter, HelpCircle, MessageCircle, Microscope, Scale, Sparkles } from "lucide-react";
import { CommunityQuestion, ConfidenceRating, ConfidenceRatings, DifferencesPanel, OpeningStory, PracticeCard, ReflectionCard, SimilaritiesPanel, SourceDrawer } from "./investigation-system";

const views = [
  { label: "Human eye", scale: "1×", title: "Clear to the eye", text: "Color and cloudiness can be visible. Microorganisms usually cannot be identified by unaided sight.", dots: 0 },
  { label: "10x", scale: "10×", title: "Suspended details", text: "An educational view of larger particles and structures. What appears depends entirely on the sample.", dots: 7 },
  { label: "100x", scale: "100×", title: "A smaller field", text: "Some larger microscopic life may become observable with suitable equipment and preparation.", dots: 15 },
  { label: "1000x", scale: "1,000×", title: "Beyond ordinary sight", text: "Laboratory microscopy can reveal some cells and bacteria. Viruses generally require other methods or instruments.", dots: 27 },
];

const sources = [
  { kind: "Buddhist monastic source", title: "Pārivāra 1.1 — section on living beings", publisher: "SuttaCentral · translation by Bhikkhu Brahmali", note: "A canonical Vinaya summary records offenses concerning water known to contain living beings.", href: "https://suttacentral.net/pli-tv-pvr1.1/en/brahmali" },
  { kind: "Vinaya guide", title: "Water strainers and Pācittiya 62", publisher: "The Buddhist Monastic Code · Ṭhānissaro Bhikkhu", note: "Explains the water-strainer allowance at Cullavagga V.13 and its relationship to rules about water containing living beings.", href: "https://www.dhammatalks.org/vinaya/bmc/Section0022.html" },
  { kind: "Public-health science", title: "Germs That Can Contaminate Tap Water", publisher: "U.S. Centers for Disease Control and Prevention", note: "Describes bacteria, parasites, and viruses that may contaminate water, while noting that regulated public tap water is usually safe.", href: "https://www.cdc.gov/drinking-water/causes/germs-that-can-contaminate-tap-water.html" },
  { kind: "Public-health context", title: "Drinking-water fact sheet", publisher: "World Health Organization", note: "Explains microbial contamination as a major drinking-water safety risk and distinguishes safely managed water from contaminated sources.", href: "https://www.who.int/news-room/fact-sheets/detail/drinking-water" },
];

export function WaterInvestigation() {
  const [view, setView] = useState(0);
  const selected = views[view];

  return <article className="water-investigation" id="life-in-water">
    <header className="water-opening">
      <WaterArtwork/>
      <div className="water-opening-wash"/>
      <div className="q-shell">
        <p className="q-kicker">Investigation 02 · Ancient observations, modern echoes</p>
        <h1>Is Clear Water<br/><em>Truly Empty?</em></h1>
        <p>A bowl can look perfectly still. A monastic rule asks us to pause before assuming that nothing lives within it. Modern biology opens a different window—and demands a careful comparison.</p>
        <a href="#water-lens">Look more closely <ChevronDown/></a>
      </div>
    </header>

    <OpeningStory className="water-story q-shell" kicker="The story" title="A small act of care beside a well."><p>Imagine a monk preparing to drink after a long walk. The water before him is clear, but the Vinaya—the Buddhist monastic discipline—does not let appearance settle the matter.</p><p>Its rules show concern for living beings in water, and its practical allowances include strainers. The moral question is immediate: if life is present, how can ordinary need be met without careless harm?</p><p>That concern belongs to monastic ethics. It does not require a theory of cells, bacteria, or infection. The ancient text asks how to act; modern microbiology asks what is present, how it lives, and how we can detect it.</p></OpeningStory>

    <section className="water-lens q-shell" id="water-lens">
      <header><p className="q-kicker">Interactive magnification</p><h2>What changes when<br/>the lens changes?</h2><p>Select a magnification. The field is a conceptual illustration, not microscope data and not a prediction about any particular glass of water.</p></header>
      <div className="magnification-experience">
        <div className={`water-sample view-${view}`} aria-live="polite">
          <div className="sample-glass"><i/><i/><i/></div>
          <motion.div className="sample-lens" key={view} initial={{ opacity: .2, scale: .82 }} animate={{ opacity: 1, scale: 1 }}>
            <span className="sample-grid"/>
            {Array.from({ length: selected.dots }, (_, i) => <i key={i} style={{ left: `${9 + (i * 37) % 83}%`, top: `${8 + (i * 53) % 82}%`, transform: `rotate(${i * 29}deg) scale(${.65 + (i % 5) * .18})` }}/>) }
            <b>{selected.scale}</b>
          </motion.div>
        </div>
        <div className="magnification-copy"><span>{selected.scale} · Educational view</span><h3>{selected.title}</h3><p>{selected.text}</p><aside><Eye/><p><b>Visualization boundary</b>This stylized field does not represent every glass of water. Organisms vary by source, treatment, environment, sampling, preparation, and instrument.</p></aside></div>
      </div>
      <div className="magnification-controls" role="group" aria-label="Magnification level">{views.map((item, i) => <button key={item.label} aria-pressed={view === i} className={view === i ? "active" : ""} onClick={() => setView(i)}><span>0{i + 1}</span>{item.label}</button>)}</div>
    </section>

    <section className="water-source-context"><div className="q-shell">
      <div><ConfidenceRating label="Historical source" value="Strong textual basis" tone="strong"/><p className="q-kicker">What the Buddhist sources say</p><h2>Concern for life,<br/>expressed as conduct.</h2></div>
      <div><p>The <i>Vinaya</i>—the collection of rules and guidance for Buddhist monastic life—addresses water known to contain living beings. A section called the <i>Cullavagga</i> permits several kinds of strainer and expects a traveling monk to have access to one.</p><p>Later monastic explanations describe a practical ethical concern: make water usable while avoiding harm to small beings that can be noticed in it.</p><p>The ancient category is “living beings,” not “microorganisms” in the modern biological sense. Some traditional explanations discuss creatures visible to the eye. Reading “bacteria” back into the wording would exceed the evidence.</p><small>Source trail: Pārivāra 1.1 for the canonical summary; Cullavagga V.13 and the cited Buddhist Monastic Code for strainers and later monastic explanation.</small></div>
    </div></section>

    <section className="water-science q-shell">
      <header><p className="q-kicker">What modern science says</p><h2>Clear is a visual quality.<br/>Safe is a tested condition.</h2></header>
      <div className="water-science-grid"><article><Microscope/><h3>Untreated water can contain microscopic life</h3><p>Depending on its source, water may contain bacteria; protozoa, which are tiny single-celled organisms; algae; fungi; or other biological material. Viruses may also be present. Viruses are not cells and are usually too small for an ordinary light microscope.</p></article><article><Droplets/><h3>Not every organism is harmful</h3><p>Microorganisms—living things too small to see unaided—are diverse. Some are harmless, some help ecosystems, and some are pathogens, meaning they can cause disease. Appearance alone cannot identify which are present.</p></article><article><Filter/><h3>Modern treatment is more than cloth filtering</h3><p>Public-health systems may filter particles, disinfect water to control harmful organisms, test it regularly, and protect its source. An ancient cloth strainer is not equivalent to modern drinking-water treatment.</p></article></div>
      <aside className="water-health-note"><HelpCircle/><p><b>This exhibit is not drinking-water advice.</b> Regulated tap water is usually treated for safety. If authorities issue an advisory, or if a source may be unsafe, follow local public-health guidance rather than judging water by clarity.</p></aside>
    </section>

    <section className="water-comparison"><div className="q-shell">
      <header><p className="q-kicker">Comparison</p><h2>A shared pause.<br/>Different knowledge.</h2></header>
      <div><SimilaritiesPanel icon={CheckCircle2} label="Conceptual similarity" title="Unaided sight has limits."><p>The monastic practice refuses to assume that clear water is lifeless. Microbiology likewise shows that visual clarity alone does not establish biological absence.</p></SimilaritiesPanel><DifferencesPanel icon={Scale} label="Important difference" title="Ethical category is not biological taxonomy."><p>Vinaya rules guide conduct toward beings understood to be in water. Modern microbiology identifies organisms through instruments, classification, culture, molecular tests, and reproducible investigation.</p></DifferencesPanel></div>
    </div></section>

    <section className="water-misconceptions q-shell">
      <div><p className="q-kicker">Misconceptions</p><h2>What the text does not say.</h2></div>
      <ul><li><b>It does not describe bacteria.</b><span>The text does not provide modern cellular theory, microbial taxonomy, or laboratory evidence.</span></li><li><b>It does not count organisms in a cup.</b><span>Counts vary enormously by sample and method; this investigation makes no universal numerical claim.</span></li><li><b>It does not prove clear water is unsafe.</b><span>Treated drinking water may be clear and safe without being sterile. Safety depends on standards and testing, not this comparison.</span></li><li><b>It does not make cloth a modern purifier.</b><span>Removing visible creatures or debris is not scientifically equivalent to controlling all pathogens.</span></li></ul>
    </section>

    <ConfidenceRatings className="confidence-section water-confidence q-shell" title={<>Keep each claim<br/>inside its evidence.</>} items={[{label:"Vinaya concern",value:"Strong",tone:"strong",detail:"Canonical and monastic sources directly address water containing living beings and water strainers."},{label:"Microbial possibility",value:"Strong",tone:"strong",detail:"Modern public-health sources establish that untreated or contaminated water can contain microorganisms and pathogens."},{label:"Conceptual resonance",value:"Moderate",tone:"limited",detail:"Both challenge confidence in unaided appearance, but they do so with different aims and concepts."},{label:"Buddha discovered bacteria",value:"Unsupported",tone:"none",detail:"The sources do not describe bacteria through modern biology or demonstrate microbial discovery."}]}/>

    <section className="water-close q-shell"><ReflectionCard icon={Sparkles} title="Where else do you confuse “I cannot see it” with “it is not there”?"/><PracticeCard icon={Eye} kicker="Practice · Separate seeing from inference" linkLabel="Save a private reflection"><p>Place a clear glass of safe drinking water in light. Write three lines: what you directly see, what you infer, and what would require a test. Do not collect or drink untreated water for this exercise.</p></PracticeCard><CommunityQuestion icon={MessageCircle} linkLabel="Discuss with care"><p>How can an ancient ethical practice remain meaningful without turning it into a modern scientific discovery claim?</p></CommunityQuestion></section>

    <SourceDrawer className="water-sources" subtitle="Vinaya context and authoritative public-health references" sources={sources} note="No fixed organism count is offered. The illustrations are interpretive, and precise claims about early textual dating or the organisms intended by “living beings” require specialist editorial review."/>
  </article>;
}

function WaterArtwork() {
  return <svg className="water-artwork" viewBox="0 0 1400 820" role="img" aria-label="A cloth water strainer and clear bowl transitioning into a magnified field of microscopic forms"><defs><linearGradient id="water-bg" x2="1" y2="1"><stop stopColor="#071522"/><stop offset=".55" stopColor="#12364a"/><stop offset="1" stopColor="#07111d"/></linearGradient><radialGradient id="water-lens"><stop stopColor="#98d4d2" stopOpacity=".45"/><stop offset=".7" stopColor="#356e7c" stopOpacity=".16"/><stop offset="1" stopColor="#07111d" stopOpacity="0"/></radialGradient></defs><rect width="1400" height="820" fill="url(#water-bg)"/><path d="M50 620Q300 490 610 610T1370 570" fill="none" stroke="#a6d4cf" strokeOpacity=".14"/><g transform="translate(120 170)"><path d="M40 140q180 110 360 0l-22 275q-158 100-316 0z" fill="#8fc7ca" fillOpacity=".13" stroke="#b8d7d2" strokeOpacity=".35"/><ellipse cx="220" cy="140" rx="180" ry="48" fill="#bfe4df" fillOpacity=".1" stroke="#d7e7df" strokeOpacity=".35"/><path d="M75 112q145 85 290 0M80 123q140 80 280 0M87 136q133 72 266 0" fill="none" stroke="#d8c38a" strokeOpacity=".5"/><path d="M100 62q120 65 240 0" fill="none" stroke="#d5ac4d" strokeWidth="3"/></g><path d="M530 360C650 330 700 325 765 348" fill="none" stroke="#d5ac4d" strokeOpacity=".5" strokeDasharray="4 9"/><circle cx="1010" cy="390" r="275" fill="url(#water-lens)" stroke="#a4d6d4" strokeOpacity=".25"/>{Array.from({ length: 30 }, (_, i) => <g key={i} transform={`translate(${800 + (i * 79) % 420} ${190 + (i * 97) % 395}) rotate(${i * 31})`} opacity={.22 + (i % 4) * .13}><ellipse rx={5 + i % 9} ry={2 + i % 4} fill={i % 3 ? "#9ad0cb" : "#d7b75d"}/>{i % 4 === 0 && <path d="M8 0q18 8 27-4" fill="none" stroke="#9ad0cb"/>}</g>)}</svg>;
}
