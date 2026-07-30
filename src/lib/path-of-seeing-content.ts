import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ApprovedReflectionBatch, ApprovedReflectionNode, PathIntensity, ReflectionNeighborhood, ReflectionNodeData } from "@/types/path-of-seeing-batch";

const batchPath = path.join(process.cwd(), "content/path-of-seeing/nodes/batch-001-all-themes.json");
let cache: Promise<Map<string, ApprovedReflectionNode>> | undefined;

function assertString(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.trim() === "") throw new Error(`Invalid Path of Seeing field: ${field}`);
}

function validateNode(node: unknown): asserts node is ApprovedReflectionNode {
  if (!node || typeof node !== "object") throw new Error("Invalid Path of Seeing node record.");
  const item = node as Record<string, unknown>;
  for (const field of ["id", "englishQuestion", "vietnameseEditorialVersion", "shortEnglishLabel", "shortVietnameseLabel", "primaryTheme", "reflectionStage", "emotionalIntensity", "sourceFoundation", "teacherOrTradition", "editorialStatus", "createdDate", "version"]) assertString(item[field], field);
  for (const field of ["secondaryThemes", "connections", "sourceIds", "sensitivityFlags"]) {
    if (!Array.isArray(item[field]) || !(item[field] as unknown[]).every((value) => typeof value === "string")) throw new Error(`Invalid Path of Seeing field: ${field}`);
  }
  if (!Number.isInteger(item.depth) || (item.depth as number) < 1) throw new Error("Invalid Path of Seeing field: depth");
  if (!(["very_gentle", "gentle", "moderate", "deep"] as unknown[]).includes(item.emotionalIntensity)) throw new Error("Invalid Path of Seeing emotional intensity.");
  if (typeof item.isDirectQuote !== "boolean") throw new Error("Invalid Path of Seeing field: isDirectQuote");
}

async function loadNodeMap(): Promise<Map<string, ApprovedReflectionNode>> {
  if (!cache) cache = (async () => {
    const batch = JSON.parse(await readFile(batchPath, "utf8")) as ApprovedReflectionBatch;
    if (!batch || typeof batch !== "object" || !batch.themes || typeof batch.themes !== "object") throw new Error("Invalid Path of Seeing batch envelope.");
    const nodes = Object.values(batch.themes).flat();
    if (nodes.length !== batch.totalNodeCount) throw new Error(`Path of Seeing node count mismatch: expected ${batch.totalNodeCount}, found ${nodes.length}.`);
    const map = new Map<string, ApprovedReflectionNode>();
    for (const node of nodes) {
      validateNode(node);
      if (map.has(node.id)) throw new Error(`Duplicate Path of Seeing node ID: ${node.id}`);
      map.set(node.id, node);
    }
    for (const node of nodes) for (const connection of node.connections) if (!map.has(connection)) throw new Error(`Invalid connection ${node.id} -> ${connection}`);
    return map;
  })();
  return cache;
}

function clientNode(node: ApprovedReflectionNode): ReflectionNodeData {
  return {
    id: node.id,
    text: {
      en: { full: node.englishQuestion, medium: node.englishQuestion, short: node.shortEnglishLabel },
      vi: { full: node.vietnameseEditorialVersion, medium: node.vietnameseEditorialVersion, short: node.shortVietnameseLabel },
    },
    primaryTheme: node.primaryTheme,
    stage: node.reflectionStage,
    intensity: node.emotionalIntensity,
    connections: [...node.connections],
  };
}

function seededIndex(seed: string, size: number): number {
  let hash = 0;
  for (const character of seed) hash = (Math.imul(hash, 31) + character.charCodeAt(0)) | 0;
  return Math.abs(hash) % size;
}

export async function getReflectionNode(id: string): Promise<ReflectionNodeData | null> {
  const node = (await loadNodeMap()).get(id);
  return node ? clientNode(node) : null;
}

export async function getReflectionNeighborhood(focusId: string): Promise<ReflectionNeighborhood> {
  const map = await loadNodeMap();
  const focus = map.get(focusId);
  if (!focus) throw new Error(`Unknown Path of Seeing node: ${focusId}`);
  const safePool = Array.from(map.values()).filter((node) => node.id !== focus.id && (node.emotionalIntensity === "very_gentle" || node.emotionalIntensity === "gentle"));
  const start=seededIndex(focus.id,safePool.length);
  const fallbacks=Array.from({length:Math.min(12,safePool.length)},(_,index)=>safePool[(start+index)%safePool.length]);
  const records = [focus, ...focus.connections.map((id) => map.get(id)!), ...fallbacks];
  return { focusId, nodes: Array.from(new Map(records.map((node) => [node.id, clientNode(node)])).values()), fallbackIds: fallbacks.map(({ id }) => id) };
}

export async function getInitialReflectionNeighborhood(seed: string, maxIntensity: PathIntensity = "gentle"): Promise<ReflectionNeighborhood> {
  const order:PathIntensity[]=["very_gentle","gentle","moderate","deep"];
  const nodes = Array.from((await loadNodeMap()).values()).filter((node) => order.indexOf(node.emotionalIntensity)<=order.indexOf(maxIntensity));
  const focus = nodes[seededIndex(seed, nodes.length)];
  return getReflectionNeighborhood(focus.id);
}

export async function getAllApprovedReflectionNodesForTesting(): Promise<ReflectionNodeData[]> {
  return Array.from((await loadNodeMap()).values(), clientNode);
}
