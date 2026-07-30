import { NextRequest, NextResponse } from "next/server";
import { getReflectionNeighborhood } from "@/lib/path-of-seeing-content";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const focusId = request.nextUrl.searchParams.get("focus");
  if (!focusId) return NextResponse.json({ error: "Missing focus node ID." }, { status: 400 });
  try {
    return NextResponse.json(await getReflectionNeighborhood(focusId), { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" } });
  } catch {
    return NextResponse.json({ error: "Reflection node was not found." }, { status: 404 });
  }
}
