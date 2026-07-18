import viExplore from "../../content/vi/explore.json";

export type VietnameseInvestigation = (typeof viExplore.investigations)[number];
export const vietnameseExplore = viExplore;

export const exploreSlugPairs = {
  "many-worlds": "tam-thien-dai-thien-the-gioi",
  "life-in-water": "sinh-mang-trong-mot-chen-nuoc",
  impermanence: "vo-thuong",
  "dependent-origination": "duyen-khoi",
  entanglement: "vuong-viu-luong-tu-va-duyen-khoi",
  superposition: "chong-chap-luong-tu-va-tu-duy-bat-nhi",
  measurement: "phep-do-luong-tu-va-chanh-niem",
  emptiness: "tanh-khong-va-chan-khong-luong-tu",
} as const;

export type EnglishExploreSlug = keyof typeof exploreSlugPairs;
export type VietnameseExploreSlug = (typeof exploreSlugPairs)[EnglishExploreSlug];

export function getVietnameseInvestigation(slug: string) {
  return viExplore.investigations.find((item) => item.slug === slug);
}

export function getEnglishExploreSlug(slug: string) {
  return (Object.entries(exploreSlugPairs) as [EnglishExploreSlug, VietnameseExploreSlug][])
    .find(([, vietnamese]) => vietnamese === slug)?.[0];
}
