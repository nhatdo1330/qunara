import { BookOpen, BrainCircuit, Compass, Heart, Scale, SearchCheck } from "lucide-react";
import { StoryScene } from "./story-scene";

export function FounderJourney() {
  return <div className="about-founder-journey" id="founder-journey">
    <StoryScene id="childhood" number="02" eyebrow="Growing up with Buddhism" title={<>The sounds came<br/>before the meaning.</>} quote="The sounds were familiar long before their meaning became clear." art="childhood">
      <p>I grew up in a large Vietnamese family with a strong Buddhist tradition. My grandparents established a place of worship dedicated to Quan Âm in Vietnam. Quan Âm is the Vietnamese name for Avalokiteśvara, a Buddhist figure associated with compassion.</p>
      <p>Chanting and Buddhist ceremonies were familiar sounds in my childhood. They belonged to the rhythm of family life.</p>
      <p>But familiarity is not the same as understanding. At that age, I did not understand Buddhism deeply, and I did not pay much attention to it. It was part of my surroundings, not yet my personal journey.</p>
    </StoryScene>

    <StoryScene id="technology" number="03" eyebrow="A life in technology" title={<>Learning to build.<br/>Learning to question.</>} quote="Technology taught me how systems work. Life made me ask why we suffer within them." art="technology" reverse>
      <p>As I grew older, I chose a different direction: information technology. For more than 25 years, I worked through different roles and wave after wave of change.</p>
      <p>The field trained me to think in logic and systems. I learned to follow evidence, test an idea, study what failed, and try again.</p>
      <p>Those habits helped me solve difficult technical problems. But personal and professional challenges raised other questions—questions that technology alone could not answer.</p>
    </StoryScene>

    <StoryScene id="rediscovery" number="04" eyebrow="Rediscovering Buddhism" title={<>Learning to hear<br/><em>familiar words again.</em></>} quote="The teachings had not changed. I had." art="return">
      <p>Life brought success, uncertainty, and personal and professional storms. Over time, those experiences changed the way I heard teachings that had been present since childhood.</p>
      <p>Impermanence—the fact that everything changes—became visible in changes I could not prevent. The teaching on attachment helped me recognize the mind&apos;s habit of clinging to what cannot stay fixed.</p>
      <p>Suffering, perception—the way we interpret experience—and compassion became practical questions rather than distant religious ideas. I did not arrive at a sudden conversion. I simply began listening differently, little by little.</p>
    </StoryScene>

    <StoryScene id="ai-quantum" number="05" eyebrow="AI and quantum curiosity" title={<>New tools.<br/>Older questions.</>} quote="Science gave me new questions. Buddhism taught me to examine the mind asking them." art="quantum" reverse>
      <p>The questions about mind and experience later met another part of my life: artificial intelligence. As I became deeply involved in the AI revolution, I asked how information is represented, how computation processes it, and what we mean by consciousness—the capacity for experience.</p>
      <p>That curiosity led me toward quantum physics. Quantum science challenged some everyday assumptions. Buddhist teachings questioned familiar ideas about permanence, separation, observation, and reality from a very different direction. I began to notice philosophical resonances—ideas that seemed to echo one another—as well as equally important differences.</p>
      <p>Quantum physics does not prove Buddhism. Buddhist texts did not describe modern quantum mechanics. Placing them in conversation is an invitation to investigate carefully, not a scientific conclusion.</p>
    </StoryScene>

    <StoryScene id="principles" number="06" eyebrow="Why Qunara exists" title={<>A community for<br/>careful inquiry.</>} art="community">
      <p>I did not create Qunara because I had found all the answers. I created it because the questions became deeper, and because they deserved a thoughtful community.</p>
      <p>Here, people can learn quantum science, understand Buddhist philosophy, explore similarities, recognize important differences, examine evidence, practice awareness and compassion, and share thoughtful experiences and questions.</p>
      <aside className="about-qunara-statement"><strong>Qunara is not an attempt to prove Buddhism through physics.</strong><span>It is a place to explore what each tradition may teach us when approached with curiosity, evidence and humility.</span></aside>
      <div className="about-principle-grid">
        <article><SearchCheck/><h3>Evidence</h3><p>Scientific claims remain tied to scientific methods and sources.</p></article>
        <article><BookOpen/><h3>Context</h3><p>Buddhist teachings are presented within their historical and philosophical traditions.</p></article>
        <article><Scale/><h3>Difference</h3><p>Resemblance begins a conversation; it does not establish equivalence.</p></article>
        <article><BrainCircuit/><h3>Reflection</h3><p>Open questions are labeled rather than filled with certainty.</p></article>
        <article><Heart/><h3>Practice</h3><p>Awareness and compassion keep inquiry connected to human life.</p></article>
        <article><Compass/><h3>Community</h3><p>People may disagree while remaining careful, respectful, and willing to learn.</p></article>
      </div>
    </StoryScene>
  </div>;
}
