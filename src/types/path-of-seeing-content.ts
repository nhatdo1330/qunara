export const PATH_OF_SEEING_LOCALES = ["en", "vi"] as const;
export type PathOfSeeingLocale = (typeof PATH_OF_SEEING_LOCALES)[number];

export type ReflectionText = {
  full: string;
  medium: string;
  short: string;
};

export type EditorialReviewStatus = "draft" | "in_review" | "approved" | "rejected";
export type ReviewDecision = "pending" | "approved" | "changes_requested" | "not_required";
export type ReflectionIntensity = "very_gentle" | "gentle" | "moderate" | "deep";

/** Editorial source separation required by the Path of Seeing source map. */
export type ReflectionProvenance = {
  canonical_basis: string;
  teacher_basis: string;
  modern_commentary: string;
  qunara_interpretation: string;
  tradition_label: string;
  direct_quote: boolean;
  quote_attribution: string | null;
  quote_verified: boolean;
  copyright_review: ReviewDecision;
  doctrinal_review: ReviewDecision;
  content_safety_review: ReviewDecision;
};

export type ReflectionNode = {
  id: string;
  translations: Record<PathOfSeeingLocale, ReflectionText>;
  theme_ids: string[];
  stage_id: string;
  intensity: ReflectionIntensity;
  connections: string[];
  source_ids: string[];
  provenance: ReflectionProvenance;
  safety_flags: string[];
  review_status: EditorialReviewStatus;
};

export type ReflectionNodeLibrary = {
  version: string;
  entry_node_ids: string[];
  nodes: ReflectionNode[];
};

