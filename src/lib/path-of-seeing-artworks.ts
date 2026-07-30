import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import type { LotusArtwork } from "@/types/path-of-seeing-artwork";

const root=path.join(process.cwd(),"content/artworks/lotus");
type ArtworkMetadata={id?:string;variant?:string;status?:string;mood?:string;dominantColor?:string;music?:string;duration?:number};
type InternalArtwork=LotusArtwork&{portraitPath:string;landscapePath:string};
let catalogPromise:Promise<InternalArtwork[]>|undefined;

async function validImage(file:string){try{return(await stat(file)).size>1024}catch{return false}}

async function loadCatalog():Promise<InternalArtwork[]>{
  if(!catalogPromise)catalogPromise=(async()=>{
    const entries=await readdir(root,{withFileTypes:true}),catalog:InternalArtwork[]=[];
    for(const entry of entries){
      if(!entry.isDirectory())continue;
      const directory=path.join(root,entry.name),portraitPath=path.join(directory,"portrait.webp"),landscapePath=path.join(directory,"landscape.webp");
      if(!await validImage(portraitPath)||!await validImage(landscapePath))continue;
      let metadata:ArtworkMetadata={};try{metadata=JSON.parse(await readFile(path.join(directory,"metadata.json"),"utf8")) as ArtworkMetadata}catch{}
      if(metadata.status==="placeholder")continue;
      const variant=metadata.variant??entry.name,id=metadata.id??`lotus-${variant}`;
      catalog.push({id,variant,mood:metadata.mood,dominantColor:metadata.dominantColor,music:metadata.music,duration:metadata.duration,portraitUrl:`/api/path-of-seeing/artworks/${encodeURIComponent(variant)}/portrait`,landscapeUrl:`/api/path-of-seeing/artworks/${encodeURIComponent(variant)}/landscape`,portraitPath,landscapePath});
    }
    return catalog;
  })();
  return catalogPromise;
}

export async function getLotusArtworkCatalog():Promise<LotusArtwork[]>{return(await loadCatalog()).map(item=>({id:item.id,variant:item.variant,mood:item.mood,dominantColor:item.dominantColor,music:item.music,duration:item.duration,portraitUrl:item.portraitUrl,landscapeUrl:item.landscapeUrl}))}
export async function getLotusArtworkFile(variant:string,orientation:string){const artwork=(await loadCatalog()).find(item=>item.variant===variant);if(!artwork||!(orientation==="portrait"||orientation==="landscape"))return null;return readFile(orientation==="portrait"?artwork.portraitPath:artwork.landscapePath)}
