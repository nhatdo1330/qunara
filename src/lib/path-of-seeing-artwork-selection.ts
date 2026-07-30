import type { LotusArtwork } from "@/types/path-of-seeing-artwork";

function seedIndex(seed:string,size:number){let hash=2166136261;for(const character of seed){hash^=character.charCodeAt(0);hash=Math.imul(hash,16777619)}return(hash>>>0)%size}

export function selectLotusArtwork(artworks:readonly LotusArtwork[],seed:string,lastArtworkId?:string|null):LotusArtwork|null{
  if(!artworks.length)return null;
  const alternatives=artworks.length>1&&lastArtworkId?artworks.filter(artwork=>artwork.id!==lastArtworkId):[...artworks];
  const pool=alternatives.length?alternatives:[...artworks];
  return pool[seedIndex(seed,pool.length)];
}
export function shouldUseArtworkFallback(artwork:LotusArtwork|null,failed:boolean){return !artwork||failed}
