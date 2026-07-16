export type Domain = "Science" | "Buddhist philosophy" | "Perspective" | "Human experience";
export type Difficulty = "Foundational" | "Intermediate" | "Advanced";
export interface Resource {
  slug: string; title: string; description: string; category: string; domain: Domain;
  tags: string[]; difficulty: Difficulty; author: string; source: string; art: "wave" | "lotus" | "orbit" | "mountain" | "buddha" | "bodhi";
}
export interface Collection { title: string; description: string; count: number; art: Resource["art"]; href: string; }
