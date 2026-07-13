import { Collection, Resource } from "./types";

export const resources: Resource[] = [
  { slug:"double-slit", title:"The Double-Slit Experiment", description:"How interference reveals the probabilistic structure of quantum measurement.", category:"Experiments", domain:"Science", tags:["Measurement","Interference"], difficulty:"Foundational", author:"Dr. Mira Chen", source:"Qunara editorial", art:"wave" },
  { slug:"dependent-origination", title:"A Map of Dependent Origination", description:"An introduction to conditionality and the Buddhist account of experience.", category:"Dependent Origination", domain:"Buddhist philosophy", tags:["Conditionality","Early Buddhism"], difficulty:"Intermediate", author:"Tenzin Rao", source:"Qunara editorial", art:"lotus" },
  { slug:"entanglement", title:"Entanglement Without Mysticism", description:"What nonlocal correlations mean, and the popular claims they do not support.", category:"Entanglement", domain:"Science", tags:["Bell tests","Nonlocality"], difficulty:"Intermediate", author:"Dr. Elias Ward", source:"Qunara review", art:"orbit" },
  { slug:"emptiness", title:"Emptiness Is Not Nothingness", description:"Reading śūnyatā as a critique of intrinsic, independent existence.", category:"Emptiness", domain:"Buddhist philosophy", tags:["Madhyamaka","Relation"], difficulty:"Intermediate", author:"Maya Sen", source:"Qunara editorial", art:"mountain" },
  { slug:"observer", title:"What Does an Observer Do?", description:"Separating physical measurement from claims about conscious observation.", category:"Observer Effect", domain:"Science", tags:["Decoherence","Measurement"], difficulty:"Advanced", author:"Prof. Ada Lin", source:"Qunara research guide", art:"orbit" },
  { slug:"attention", title:"Attention as Lived Inquiry", description:"A phenomenological field guide to noticing sensation, thought, and change.", category:"Mindfulness", domain:"Human experience", tags:["Practice","Phenomenology"], difficulty:"Foundational", author:"Noah Bell", source:"Qunara practice desk", art:"lotus" },
  { slug:"relational-worlds", title:"Two Kinds of Relationality", description:"A careful comparison of relational physics and Buddhist anti-essentialism.", category:"Comparative philosophy", domain:"Perspective", tags:["Interpretation","Limits"], difficulty:"Advanced", author:"Dr. Leila Mora", source:"Qunara perspectives", art:"wave" },
  { slug:"impermanence", title:"Impermanence in Ordinary Life", description:"How change becomes visible when experience is observed at a finer grain.", category:"Impermanence", domain:"Human experience", tags:["Practice","Change"], difficulty:"Foundational", author:"Maya Sen", source:"Qunara practice desk", art:"mountain" }
];

export const collections: Collection[] = [
  { title:"Quantum, Clearly", description:"A grounded path from probability to entanglement, without hype.", count:12, art:"wave", href:"/quantum" },
  { title:"Foundations of Buddhist Thought", description:"Key teachings in historical and philosophical context.", count:16, art:"lotus", href:"/buddhism" },
  { title:"The Nature of Experience", description:"Consciousness through philosophy, science, and first-person inquiry.", count:9, art:"mountain", href:"/collections" }
];

export const quantumCategories = ["Quantum Mechanics","Entanglement","Wave Function","Observer Effect","Quantum Computing","Research Papers","Experiments"];
export const buddhismCategories = ["Four Noble Truths","Eightfold Path","Meditation","Mindfulness","Dependent Origination","Impermanence","Emptiness","Zen"];
