import { NextResponse } from "next/server";
import { getLotusArtworkFile } from "@/lib/path-of-seeing-artworks";

export async function GET(_request:Request,{params}:{params:{variant:string;orientation:string}}){
  const image=await getLotusArtworkFile(params.variant,params.orientation);
  if(!image)return NextResponse.json({error:"Artwork not found."},{status:404});
  return new NextResponse(image,{headers:{"Content-Type":"image/webp","Cache-Control":"public, max-age=31536000, immutable"}});
}

