import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { sourceIdsFromMarkdown, validateReflectionLibrary } from "./path-of-seeing-content-validator";

const root = process.cwd();
const contentDirectory = join(root, "content/path-of-seeing/nodes");
const sourceMapPath = join(root, "content/path-of-seeing/research/source-map.md");
const taxonomyPath = join(root, "content/path-of-seeing/taxonomy.json");

function jsonFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return jsonFiles(path);
    return extname(entry.name) === ".json" ? [path] : [];
  });
}

const taxonomy = JSON.parse(readFileSync(taxonomyPath, "utf8")) as {
  themes: Array<{ id: string }>;
  stages: Array<{ id: string }>;
};
const options = {
  sourceIds: sourceIdsFromMarkdown(readFileSync(sourceMapPath, "utf8")),
  themeIds: new Set(taxonomy.themes.map(({ id }) => id)),
  stageIds: new Set(taxonomy.stages.map(({ id }) => id)),
};
const files = jsonFiles(contentDirectory);

if (files.length === 0) {
  console.log("Path of Seeing content validation: no reflection-node libraries found.");
  console.log(`Add reviewed JSON libraries under ${relative(root, contentDirectory)}/.`);
  process.exit(0);
}

let errors = 0;
let warnings = 0;
for (const file of files) {
  let input: unknown;
  try {
    input = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    errors += 1;
    console.error(`ERROR invalid_json ${relative(root, file)}: ${(error as Error).message}`);
    continue;
  }
  for (const issue of validateReflectionLibrary(input, options)) {
    const location = [relative(root, file), issue.nodeId, issue.path].filter(Boolean).join(":");
    console[issue.severity === "error" ? "error" : "warn"](`${issue.severity.toUpperCase()} ${issue.code} ${location}: ${issue.message}`);
    issue.severity === "error" ? errors++ : warnings++;
  }
}

console.log(`Path of Seeing content validation: ${files.length} file(s), ${errors} error(s), ${warnings} warning(s).`);
if (errors > 0) process.exit(1);

