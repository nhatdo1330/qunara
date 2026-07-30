import assert from "node:assert/strict";
import test from "node:test";
import type { ReflectionNodeLibrary } from "../src/types/path-of-seeing-content";
import { validateReflectionLibrary } from "../scripts/path-of-seeing-content-validator";

const options = {
  sourceIds: new Set(["SC-001"]),
  themeIds: new Set(["T01"]),
  stageIds: new Set(["S1"]),
};

function node(id: string, connections: string[]) {
  return {
    id,
    translations: {
      en: { full: "What is changing now?", medium: "What is changing?", short: "Changing?" },
      vi: { full: "Điều gì đang thay đổi lúc này?", medium: "Điều gì đang đổi?", short: "Đang đổi?" },
    },
    theme_ids: ["T01"], stage_id: "S1", intensity: "very_gentle" as const,
    connections, source_ids: ["SC-001"], safety_flags: [], review_status: "approved" as const,
    provenance: {
      canonical_basis: "A source-grounded summary.", teacher_basis: "", modern_commentary: "",
      qunara_interpretation: "An original contemplative prompt.", tradition_label: "Early Buddhism",
      direct_quote: false, quote_attribution: null, quote_verified: false,
      copyright_review: "not_required" as const, doctrinal_review: "approved" as const,
      content_safety_review: "approved" as const,
    },
  };
}

test("accepts a valid bilingual, connected library", () => {
  const library: ReflectionNodeLibrary = { version: "1.0", entry_node_ids: ["first"], nodes: [node("first", ["second"]), node("second", ["first"])] };
  assert.deepEqual(validateReflectionLibrary(library, options), []);
});

test("reports duplicate IDs, bad connections, unknown sources, and orphan nodes", () => {
  const library = { version: "1.0", entry_node_ids: ["first"], nodes: [node("first", ["missing"]), node("first", ["missing"]), node("orphan", ["orphan"]) ] };
  const issues = validateReflectionLibrary(library, options);
  const codes = new Set(issues.map(({ code }) => code));
  for (const code of ["duplicate_id", "invalid_connection", "self_connection", "orphan_node"]) assert.ok(codes.has(code), `expected ${code}`);
  library.nodes[0].source_ids = ["SC-999"];
  assert.ok(validateReflectionLibrary(library, options).some(({ code }) => code === "invalid_source_id"));
});

test("reports missing translations as a structural error", () => {
  const invalid = { version: "1.0", entry_node_ids: ["first"], nodes: [{ ...node("first", ["first"]), translations: { en: node("x", ["x"]).translations.en } }] };
  assert.ok(validateReflectionLibrary(invalid, options).some(({ code }) => code === "missing_translation"));
});

test("warns about excessive text and unattributed direct quotes", () => {
  const quoted = node("first", ["second"]);
  quoted.translations.en.full = "x".repeat(181);
  quoted.provenance.direct_quote = true;
  const library = { version: "1.0", entry_node_ids: ["first"], nodes: [quoted, node("second", ["first"])] };
  const codes = new Set(validateReflectionLibrary(library, options).map(({ code }) => code));
  assert.ok(codes.has("excessive_text_length"));
  assert.ok(codes.has("direct_quote_attribution"));
  assert.ok(codes.has("direct_quote_unverified"));
});

