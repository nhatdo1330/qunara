import type { PathLocale } from "@/components/practice/path-of-seeing/path-of-seeing-config";

export const PATH_INTENSITIES = ["very_gentle", "gentle", "moderate", "deep"] as const;
export type PathIntensity = (typeof PATH_INTENSITIES)[number];

export type ApprovedReflectionNode = {
  id: string;
  englishQuestion: string;
  vietnameseEditorialVersion: string;
  shortEnglishLabel: string;
  shortVietnameseLabel: string;
  primaryTheme: string;
  secondaryThemes: string[];
  reflectionStage: string;
  depth: number;
  emotionalIntensity: PathIntensity;
  connections: string[];
  sourceFoundation: string;
  teacherOrTradition: string;
  sourceIds: string[];
  isDirectQuote: boolean;
  editorialStatus: string;
  sensitivityFlags: string[];
  createdDate: string;
  reviewDate: string | null;
  reviewerNotes: string;
  version: string;
};

export type ApprovedReflectionBatch = {
  batchId: string;
  schemaVersion: string;
  totalNodeCount: number;
  distribution: Record<string, number>;
  themes: Record<string, ApprovedReflectionNode[]>;
};

export type ReflectionText = { full: string; medium: string; short: string };
export type ReflectionNodeData = {
  id: string;
  text: Record<PathLocale, ReflectionText>;
  primaryTheme: string;
  stage: string;
  intensity: PathIntensity;
  connections: string[];
};

export type ReflectionNeighborhood = {
  focusId: string;
  nodes: ReflectionNodeData[];
  fallbackIds: string[];
};

