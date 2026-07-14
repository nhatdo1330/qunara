import Link from "next/link";
import { ArrowRight, Atom, BookOpen, Brain, CalendarDays, Flower2, Heart, Play, Sparkles, Users } from "lucide-react";

const memories = [
  { title: "Sunset with friends", meta: "By Alex · May 12, 2024", pos: "0% 0%" },
  { title: "Hiking in the Rockies", meta: "By Sarah · Apr 28, 2024", pos: "100% 0%" },
  { title: "Dad's 60th Birthday", meta: "By Michael · Mar 15, 2024", pos: "0% 100%" },
  { title: "First day of school", meta: "By Lina · Sep 1, 2023", pos: "100% 100%" },
];

const highlights = [
  { title: "Quantum Physics Explained Simply", source: "Live Talk with Dr. Akira Sharma", meta: "May 28, 2024 · 10:00 AM PT", pos: "0% 0%" },
  { title: "Loving-Kindness Meditation", source: "Group Practice Session", meta: "May 26, 2024 · 7:00 PM PT", pos: "100% 100%" },
  { title: "The Nature of Reality", source: "Discussion Circle", meta: "May 21, 2024 · 6:00 PM PT", pos: "100% 0%" },
];

export default function Home() {
  return <div className="home-page">
    <section className="home-hero">
      <div className="home-hero-shade" />
      <div className="home-hero-copy">
        <h1>Where Quantum<br/>Meets Consciousness</h1>
        <span className="gold-rule" />
        <p>Explore the harmony between modern science and ancient wisdom. Cultivate inner peace, expand your mind, and connect with a compassionate community.</p>
        <div className="hero-actions">
          <Link href="/explore" className="home-primary">Explore Now</Link>
          <Link href="/contact" className="home-secondary">Join Our Community</Link>
        </div>
      </div>
    </section>

    <section className="home-content">
      <div className="path-grid">
        <article className="path-card purple-card"><span className="path-icon"><Atom/></span><div><h2>Quantum &amp; Buddhism</h2><p>Discover the fascinating connections between quantum physics and Buddhist philosophy.</p><Link href="/quantum">Learn More <ArrowRight/></Link></div></article>
        <article className="path-card green-card"><span className="path-icon"><Flower2/></span><div><h2>Daily Inspiration</h2><p>“The mind is everything. What you think you become.”</p><small>— Buddha</small><Link href="/buddhism">Explore Teachings <ArrowRight/></Link></div></article>
        <article className="path-card blue-card"><span className="path-icon"><Brain/></span><div><h2>Mindful Practice</h2><p>Guided meditations and practices to help you live with awareness and compassion.</p><Link href="/perspectives">Start Practicing <ArrowRight/></Link></div></article>
      </div>

      <div className="home-lower-grid">
        <section className="memories-panel">
          <div className="panel-heading"><div><h2><Heart/> Shared Memories</h2><p>Cherish and share the beautiful moments that shape our lives.</p></div><button>Share Your Memory</button></div>
          <div className="memory-grid">{memories.map((m) => <article className="memory-card" key={m.title}><div className="memory-photo" style={{backgroundPosition:m.pos}}/><h3>{m.title}</h3><p>{m.meta}</p></article>)}</div>
        </section>

        <aside className="highlights-panel">
          <div className="panel-heading"><div><h2><Users/> Community Highlights</h2></div></div>
          <div className="highlight-list">{highlights.map((h) => <article className="highlight" key={h.title}><div className="highlight-photo" style={{backgroundPosition:h.pos}}><Play/></div><div><h3>{h.title}</h3><p>{h.source}</p><small><CalendarDays/> {h.meta}</small></div></article>)}</div>
          <Link href="/explore" className="events-link">View All Events <ArrowRight/></Link>
        </aside>
      </div>
    </section>
    <div className="home-quote"><BookOpen/><p>“Just as a single photon contains the whole universe of possibilities,<br/>within you lies the potential for infinite awakening.”</p><span><Sparkles/> Be kind. Be curious. Be you.</span></div>
  </div>;
}
