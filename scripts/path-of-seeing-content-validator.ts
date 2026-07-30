import Ajv2020, { type ErrorObject } from "ajv/dist/2020";
import { readFileSync } from "node:fs";
import type { ReflectionNodeLibrary } from "../src/types/path-of-seeing-content";

export type ValidationSeverity = "error" | "warning";
export type ContentIssue = {
  severity: ValidationSeverity;
  code: string;
  message: string;
  nodeId?: string;
  path?: string;
};

export type ValidationOptions = {
  sourceIds: ReadonlySet<string>;
  themeIds: ReadonlySet<string>;
  stageIds: ReadonlySet<string>;
};

const TEXT_LIMITS = { full: 180, medium: 120, short: 60 } as const;
const schemaPath = new URL("../schemas/path-of-seeing/reflection-node.schema.json", import.meta.url);
const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as object;
const ajv = new Ajv2020({ allErrors: true, strict: true });
const validateSchema = ajv.compile<ReflectionNodeLibrary>(schema);

function schemaIssue(error: ErrorObject): ContentIssue {
  return {
    severity: "error",
    code: error.keyword === "required" && String(error.params.missingProperty).match(/^(en|vi)$/)
      ? "missing_translation"
      : "schema",
    path: error.instancePath || "/",
    message: `${error.instancePath || "/"} ${error.message ?? "is invalid"}`,
  };
}

export function validateReflectionLibrary(
  input: unknown,
  options: ValidationOptions,
): ContentIssue[] {
  const issues: ContentIssue[] = [];
  if (!validateSchema(input)) {
    return (validateSchema.errors ?? []).map(schemaIssue);
  }

  const library = input;
  const ids = new Set<string>();
  const duplicateIds = new Set<string>();
  for (const node of library.nodes) {
    if (ids.has(node.id)) duplicateIds.add(node.id);
    ids.add(node.id);
  }
  for (const id of Array.from(duplicateIds)) {
    issues.push({ severity: "error", code: "duplicate_id", nodeId: id, message: `Duplicate node ID: ${id}` });
  }

  for (const entryId of library.entry_node_ids) {
    if (!ids.has(entryId)) {
      issues.push({ severity: "error", code: "invalid_entry", message: `Entry node does not exist: ${entryId}` });
    }
  }

  for (const node of library.nodes) {
    for (const connection of node.connections) {
      if (!ids.has(connection)) {
        issues.push({ severity: "error", code: "invalid_connection", nodeId: node.id, message: `Connection points to missing node: ${connection}` });
      }
      if (connection === node.id) {
        issues.push({ severity: "error", code: "self_connection", nodeId: node.id, message: "A node cannot connect to itself." });
      }
    }
    for (const sourceId of node.source_ids) {
      if (!options.sourceIds.has(sourceId)) {
        issues.push({ severity: "error", code: "invalid_source_id", nodeId: node.id, message: `Unknown source ID: ${sourceId}` });
      }
    }
    for (const themeId of node.theme_ids) {
      if (!options.themeIds.has(themeId)) {
        issues.push({ severity: "error", code: "invalid_theme_id", nodeId: node.id, message: `Unknown taxonomy theme: ${themeId}` });
      }
    }
    if (!options.stageIds.has(node.stage_id)) {
      issues.push({ severity: "error", code: "invalid_stage_id", nodeId: node.id, message: `Unknown taxonomy stage: ${node.stage_id}` });
    }

    for (const [locale, variants] of Object.entries(node.translations)) {
      for (const [variant, value] of Object.entries(variants)) {
        const limit = TEXT_LIMITS[variant as keyof typeof TEXT_LIMITS];
        if (value.length > limit) {
          issues.push({ severity: "warning", code: "excessive_text_length", nodeId: node.id, path: `translations.${locale}.${variant}`, message: `${locale}.${variant} is ${value.length} characters; recommended maximum is ${limit}.` });
        }
      }
    }

    if (node.provenance.direct_quote && !node.provenance.quote_attribution?.trim()) {
      issues.push({ severity: "warning", code: "direct_quote_attribution", nodeId: node.id, message: "Direct quote requires an explicit attribution." });
    }
    if (node.provenance.direct_quote && !node.provenance.quote_verified) {
      issues.push({ severity: "warning", code: "direct_quote_unverified", nodeId: node.id, message: "Direct quote has not been verified against its source." });
    }
  }

  if (!issues.some((issue) => issue.code === "invalid_entry")) {
    const reachable = new Set<string>();
    const queue = [...library.entry_node_ids];
    const byId = new Map(library.nodes.map((node) => [node.id, node]));
    while (queue.length) {
      const id = queue.shift()!;
      if (reachable.has(id)) continue;
      reachable.add(id);
      for (const connection of byId.get(id)?.connections ?? []) {
        if (byId.has(connection) && !reachable.has(connection)) queue.push(connection);
      }
    }
    for (const node of library.nodes) {
      if (!reachable.has(node.id)) {
        issues.push({ severity: "error", code: "orphan_node", nodeId: node.id, message: "Node is unreachable from every entry node." });
      }
    }
  }

  return issues;
}

export function sourceIdsFromMarkdown(markdown: string): Set<string> {
  return new Set(Array.from(markdown.matchAll(/^## ((?:SC|DL|PV)-\d{3})\s*$/gm), (match) => match[1]));
}
