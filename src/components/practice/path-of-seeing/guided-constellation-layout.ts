export type NodeSize = { width: number; height: number };
export type NodePosition = { id: string; x: number; y: number; width: number; height: number };

const zones = [
  { x: .22, y: .23 },
  { x: .78, y: .25 },
  { x: .25, y: .58 },
] as const;

export function positionsOverlap(a: NodePosition, b: NodePosition, gap=24){
  return Math.abs(a.x-b.x)<(a.width+b.width)/2+gap&&Math.abs(a.y-b.y)<(a.height+b.height)/2+gap;
}

export function guidedConstellationLayout(stage:{width:number;height:number},focusId:string,relatedIds:string[],sizes:Map<string,NodeSize>):NodePosition[]{
  const safeTop=72,safeBottom=Math.max(safeTop+180,stage.height*.68),side=28;
  const sizeFor=(id:string,fallback:NodeSize)=>sizes.get(id)??fallback;
  const focusSize=sizeFor(focusId,{width:Math.min(430,stage.width*.72),height:96});
  const placed:NodePosition[]=[{id:focusId,x:stage.width*.5,y:stage.height*.41,width:focusSize.width,height:focusSize.height}];
  relatedIds.slice(0,3).forEach((id,index)=>{
    const size=sizeFor(id,{width:180,height:56}),zone=zones[index];
    let candidate:NodePosition={id,x:Math.max(side+size.width/2,Math.min(stage.width-side-size.width/2,stage.width*zone.x)),y:Math.max(safeTop+size.height/2,Math.min(safeBottom-size.height/2,stage.height*zone.y)),...size};
    for(let attempt=0;attempt<5&&placed.some(other=>positionsOverlap(candidate,other));attempt++)candidate={...candidate,y:Math.min(safeBottom-size.height/2,candidate.y+34)};
    if(!placed.some(other=>positionsOverlap(candidate,other)))placed.push(candidate);
  });
  return placed;
}

export function positionWithinSafeArea(position:NodePosition,stage:{width:number;height:number}){
  return position.x-position.width/2>=28&&position.x+position.width/2<=stage.width-28&&position.y-position.height/2>=72&&position.y+position.height/2<=Math.max(252,stage.height*.68);
}
