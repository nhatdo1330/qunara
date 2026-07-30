import { PATH_INTENSITIES, type PathIntensity, type ReflectionNodeData } from "@/types/path-of-seeing-batch";

export const MAX_READABLE_CHILDREN = 3;
export const MAX_READABLE_NODES = 4;
export const MAX_AMBIENT_NODES = 8;
export const MAX_ACTIVE_NODES = 12;

export type TraversalContext = {
  seed: string;
  step: number;
  recentNodeIds: string[];
  recentThemes: string[];
  recentStages: string[];
  maxIntensity: PathIntensity;
};

function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index++) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function allowed(node: ReflectionNodeData, maximum: PathIntensity): boolean {
  return PATH_INTENSITIES.indexOf(node.intensity) <= PATH_INTENSITIES.indexOf(maximum);
}

function rank(nodes: ReflectionNodeData[], context: TraversalContext, count: number): ReflectionNodeData[] {
  const recentThemes = new Set(context.recentThemes.slice(-4));
  const recentStages = new Set(context.recentStages.slice(-4));
  const remaining=[...nodes],selected:ReflectionNodeData[]=[];
  while(remaining.length&&selected.length<count){
    const selectedThemes=new Set(selected.map(node=>node.primaryTheme)),selectedStages=new Set(selected.map(node=>node.stage));
    const score = (node: ReflectionNodeData) =>
      (recentThemes.has(node.primaryTheme) ? 0 : 4) +
      (recentStages.has(node.stage) ? 0 : 3) +
      (selectedThemes.has(node.primaryTheme) ? 0 : 5) +
      (selectedStages.has(node.stage) ? 0 : 4) +
      (hash(`${context.seed}:${context.step}:${node.id}`) % 1000) / 1000;
    remaining.sort((left,right)=>score(right)-score(left));
    selected.push(remaining.shift()!);
  }
  return selected;
}

export function selectReflectionChildren(
  focus: ReflectionNodeData,
  availableNodes: readonly ReflectionNodeData[],
  fallbackIds: readonly string[],
  context: TraversalContext,
): ReflectionNodeData[] {
  const byId = new Map(availableNodes.map((node) => [node.id, node]));
  const recent = new Set([...context.recentNodeIds, focus.id]);
  const connected = focus.connections
    .map((id) => byId.get(id))
    .filter((node): node is ReflectionNodeData => Boolean(node) && allowed(node!, context.maxIntensity));
  const fresh = connected.filter((node) => !recent.has(node.id));
  const fallback = fallbackIds
    .map((id) => byId.get(id))
    .filter((node): node is ReflectionNodeData => Boolean(node) && node!.id !== focus.id && !recent.has(node!.id) && allowed(node!, context.maxIntensity));
  const pool = fresh.length >= 2 ? fresh : [...fresh, ...connected.filter((node) => !fresh.includes(node)), ...fallback];
  const unique = Array.from(new Map(pool.map((node) => [node.id, node])).values());
  const desired = Math.min(MAX_READABLE_CHILDREN, unique.length, 2 + (hash(`${context.seed}:${context.step}:count`) % 2));
  return rank(unique, context,desired);
}

export function visibleNodeCount(readableChildren: number, ambientNodes: number): number {
  return 1 + Math.min(readableChildren, MAX_READABLE_CHILDREN) + Math.min(ambientNodes, MAX_AMBIENT_NODES);
}
