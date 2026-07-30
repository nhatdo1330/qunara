import type { SessionPhase } from "./session-controller";

export const constellationNavigationKeys=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"] as const;
export function canSelectReflection(phase:SessionPhase,transitioning:boolean){return phase==="active"&&!transitioning}
export function nextConstellationIndex(key:string,current:number,total:number){if(!total||!constellationNavigationKeys.includes(key as typeof constellationNavigationKeys[number]))return current;const direction=key==="ArrowLeft"||key==="ArrowUp"?-1:1;return(current+direction+total)%total}
export function reflectionTextVariant(index:number){return index===0?"full":"short" as const}
