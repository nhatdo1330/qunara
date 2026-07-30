import assert from "node:assert/strict";
import test from "node:test";
import { getAllApprovedReflectionNodesForTesting, getInitialReflectionNeighborhood, getReflectionNeighborhood } from "../src/lib/path-of-seeing-content";
import { MAX_ACTIVE_NODES, MAX_READABLE_CHILDREN, selectReflectionChildren, visibleNodeCount, type TraversalContext } from "../src/lib/path-of-seeing-traversal";
import type { ReflectionNodeData } from "../src/types/path-of-seeing-batch";

const context=(seed="stable-seed",recentNodeIds:string[]=[]):TraversalContext=>({seed,step:3,recentNodeIds,recentThemes:["impermanence"],recentStages:["noticing"],maxIntensity:"gentle"});

test("Batch 001 has valid connection IDs and bilingual content",async()=>{
  const nodes=await getAllApprovedReflectionNodesForTesting(),ids=new Set(nodes.map(node=>node.id));
  assert.equal(nodes.length,200);
  for(const node of nodes){
    assert.ok(node.text.en.full&&node.text.en.short,`${node.id} is missing English`);
    assert.ok(node.text.vi.full&&node.text.vi.short,`${node.id} is missing Vietnamese`);
    for(const connection of node.connections)assert.ok(ids.has(connection),`${node.id} -> ${connection}`);
  }
});

test("approved nodes have no selectable dead ends",async()=>{
  const nodes=await getAllApprovedReflectionNodesForTesting(),fallbackIds=nodes.filter(node=>node.intensity!=="deep"&&node.intensity!=="moderate").map(node=>node.id);
  for(const focus of nodes.filter(node=>node.intensity!=="deep"&&node.intensity!=="moderate")){
    const choices=selectReflectionChildren(focus,nodes,fallbackIds,context(focus.id));
    assert.ok(choices.length>=2,`${focus.id} is a dead end`);
    assert.ok(choices.length<=MAX_READABLE_CHILDREN);
  }
});

test("selection avoids immediate repeats and respects maximum visible nodes",async()=>{
  const neighborhood=await getInitialReflectionNeighborhood("repeat-test"),focus=neighborhood.nodes.find(node=>node.id===neighborhood.focusId)!;
  const recent=focus.connections.slice(0,2),choices=selectReflectionChildren(focus,neighborhood.nodes,neighborhood.fallbackIds,context("repeat-test",recent));
  assert.ok(choices.every(node=>!recent.includes(node.id)&&node.id!==focus.id));
  assert.ok(choices.length<=3);
  assert.ok(visibleNodeCount(choices.length,8)<=MAX_ACTIVE_NODES);
});

test("a seeded session is stable",async()=>{
  const first=await getInitialReflectionNeighborhood("same-session"),second=await getInitialReflectionNeighborhood("same-session");
  assert.equal(first.focusId,second.focusId);
  const focus=first.nodes.find(node=>node.id===first.focusId)!;
  const one=selectReflectionChildren(focus,first.nodes,first.fallbackIds,context("same-session"));
  const two=selectReflectionChildren(focus,second.nodes,second.fallbackIds,context("same-session"));
  assert.deepEqual(one.map(node=>node.id),two.map(node=>node.id));
});

test("fallback selection remains safe when connected nodes are unavailable",()=>{
  const make=(id:string):ReflectionNodeData=>({id,text:{en:{full:id,medium:id,short:id},vi:{full:id,medium:id,short:id}},primaryTheme:id,stage:id,intensity:"very_gentle",connections:[]});
  const focus={...make("focus"),connections:["not-loaded"]},fallback=[make("safe-one"),make("safe-two"),make("safe-three")];
  const choices=selectReflectionChildren(focus,[focus,...fallback],fallback.map(node=>node.id),context());
  assert.ok(choices.length>=2);
  assert.ok(choices.every(node=>node.intensity==="very_gentle"));
});

test("node lookup returns only a bounded neighborhood",async()=>{
  const initial=await getInitialReflectionNeighborhood("payload-test"),neighborhood=await getReflectionNeighborhood(initial.focusId);
  assert.ok(neighborhood.nodes.length<200);
  assert.ok(neighborhood.nodes.some(node=>node.id===initial.focusId));
});
