import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { guidedConstellationLayout, positionWithinSafeArea, positionsOverlap, type NodePosition, type NodeSize } from "../src/components/practice/path-of-seeing/guided-constellation-layout";
import { canSelectReflection, nextConstellationIndex, reflectionTextVariant } from "../src/components/practice/path-of-seeing/interaction-state";
import { claimFinalReveal, shouldPauseForVisibility } from "../src/components/practice/path-of-seeing/session-controller";
import { supportsHaptics } from "../src/components/practice/path-of-seeing/haptic-controller";
import { pathOfSeeingConfig } from "../src/components/practice/path-of-seeing/path-of-seeing-config";
import { canPlayOneShot } from "../src/components/practice/path-of-seeing/audio-state";
import { MAX_ACTIVE_NODES, visibleNodeCount } from "../src/lib/path-of-seeing-traversal";
import { getLotusArtworkCatalog, getLotusArtworkFile } from "../src/lib/path-of-seeing-artworks";
import { shouldUseArtworkFallback } from "../src/lib/path-of-seeing-artwork-selection";

function assertNoOverlap(positions:NodePosition[]){for(let left=0;left<positions.length;left++)for(let right=left+1;right<positions.length;right++)assert.equal(positionsOverlap(positions[left],positions[right]),false,`${positions[left].id} overlaps ${positions[right].id}`)}
function layout(stage:{width:number;height:number},sizes:NodeSize[]){return guidedConstellationLayout(stage,"focus",["one","two","three"],new Map([["focus",sizes[0]],["one",sizes[1]],["two",sizes[2]],["three",sizes[3]]]))}

test("small mobile and long Vietnamese layouts do not overlap",()=>{
  const stage={width:320,height:568},positions=layout(stage,[{width:230,height:132},{width:126,height:92},{width:128,height:108},{width:124,height:96}]);
  assert.ok(positions.length>=3,"focus plus at least two choices must remain visible");assertNoOverlap(positions);for(const position of positions)assert.ok(positionWithinSafeArea(position,stage));
});

test("portrait and landscape orientations remain bounded and collision-free",()=>{
  const sizes=[{width:260,height:110},{width:150,height:70},{width:150,height:70},{width:150,height:70}];
  for(const stage of [{width:390,height:844},{width:844,height:390}]){const positions=layout(stage,sizes);assertNoOverlap(positions);for(const position of positions)assert.ok(positionWithinSafeArea(position,stage))}
});

test("constellation exposes one full question and never exceeds twelve active nodes",()=>{
  assert.deepEqual([0,1,2,3].map(reflectionTextVariant),["full","short","short","short"]);
  assert.equal(visibleNodeCount(3,8),12);assert.ok(visibleNodeCount(99,99)<=MAX_ACTIVE_NODES);
});

test("safe-area and reduced-motion contracts remain in the stylesheet",async()=>{
  const css=await readFile("src/components/practice/path-of-seeing/path-of-seeing.module.css","utf8");
  assert.match(css,/env\(safe-area-inset-(?:top|bottom|right)\)/);assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);assert.match(css,/\.lotusArtwork img\{[^}]*object-fit:contain/);
});

test("Batch 001 IDs, connections, translations, paths, and provenance are complete",async()=>{
  const batch=JSON.parse(await readFile("content/path-of-seeing/nodes/batch-001-all-themes.json","utf8")) as {themes:Record<string,Array<{id:string;englishQuestion:string;vietnameseEditorialVersion:string;connections:string[];isDirectQuote:boolean;sourceIds:string[];teacherOrTradition:string;reviewDate:string|null;editorialStatus:string}>>};
  const nodes=Object.values(batch.themes).flat(),ids=new Set(nodes.map(node=>node.id));assert.equal(ids.size,nodes.length);
  for(const node of nodes){assert.ok(node.englishQuestion.trim());assert.ok(node.vietnameseEditorialVersion.trim());assert.ok(node.connections.length>0);for(const id of node.connections)assert.ok(ids.has(id),`${node.id} -> ${id}`);if(node.isDirectQuote)assert.ok(node.sourceIds.length&&node.teacherOrTradition&&node.reviewDate&&["approved","published"].includes(node.editorialStatus),`${node.id} lacks verified attribution`)}
  const reachable=new Set<string>(),queue=[nodes[0].id],byId=new Map(nodes.map(node=>[node.id,node]));while(queue.length){const id=queue.shift()!;if(reachable.has(id))continue;reachable.add(id);for(const connection of byId.get(id)?.connections??[])if(!reachable.has(connection))queue.push(connection)}assert.equal(reachable.size,nodes.length);
});

test("production durations and hidden development duration are configured",()=>{
  assert.deepEqual(pathOfSeeingConfig.durations,[180_000,300_000,600_000]);assert.equal(pathOfSeeingConfig.defaultDuration,300_000);assert.equal(pathOfSeeingConfig.developmentTestDuration,30_000);assert.equal(pathOfSeeingConfig.durations.includes(pathOfSeeingConfig.developmentTestDuration),false);
});

test("hidden tabs pause active sessions and final reveal can be claimed once",()=>{
  assert.equal(shouldPauseForVisibility("active",true),true);assert.equal(shouldPauseForVisibility("paused",true),false);assert.equal(shouldPauseForVisibility("active",false),false);
  const gate={started:false};assert.equal(claimFinalReveal(gate),true);assert.equal(claimFinalReveal(gate),false);
});

test("route cleanup contracts remove timers, listeners, and audio",async()=>{
  const [session,audio,experience]=await Promise.all([readFile("src/components/practice/path-of-seeing/session-controller.ts","utf8"),readFile("src/components/practice/path-of-seeing/ambient-audio-controller.tsx","utf8"),readFile("src/components/practice/path-of-seeing/path-of-seeing-experience.tsx","utf8")]);
  assert.match(session,/removeEventListener\("visibilitychange"/);assert.match(session,/clearTimeout\(quietTimer\.current\)/);assert.match(audio,/clearInterval/);assert.match(audio,/clearTimeout/);assert.match(audio,/\.pause\(\)/);assert.match(experience,/clearTimeout\(selectionTimer\.current\)/);assert.match(experience,/stopAudio\(\)/);
});

test("native activation, keyboard navigation, and rapid selection guard are supported",async()=>{
  const component=await readFile("src/components/practice/path-of-seeing/reflection-node.tsx","utf8");assert.match(component,/<button/);assert.match(component,/onClick=/);
  assert.equal(nextConstellationIndex("ArrowRight",0,3),1);assert.equal(nextConstellationIndex("ArrowLeft",0,3),2);assert.equal(canSelectReflection("active",false),true);assert.equal(canSelectReflection("active",true),false);assert.equal(canSelectReflection("paused",false),false);
});

test("muted audio and unsupported haptics degrade safely",()=>{
  assert.equal(canPlayOneShot({activated:true,muted:true,isPlaying:false,now:10,lastPlayedAt:-100,minimumInterval:1}),false);assert.equal(supportsHaptics({}),false);assert.equal(supportsHaptics(null),false);assert.equal(supportsHaptics({vibrate:()=>true}),true);
});

test("approved artwork provides both orientations and a loading fallback",async()=>{
  const catalog=await getLotusArtworkCatalog();assert.ok(catalog.length>0);
  for(const artwork of catalog){assert.ok(artwork.portraitUrl.endsWith("/portrait"));assert.ok(artwork.landscapeUrl.endsWith("/landscape"));for(const orientation of ["portrait","landscape"]){const file=await getLotusArtworkFile(artwork.variant,orientation);assert.ok(file);assert.equal(file!.subarray(0,4).toString(),"RIFF");assert.equal(file!.subarray(8,12).toString(),"WEBP")}}
  assert.equal(shouldUseArtworkFallback(catalog[0],false),false);assert.equal(shouldUseArtworkFallback(catalog[0],true),true);assert.equal(shouldUseArtworkFallback(null,false),true);
});
