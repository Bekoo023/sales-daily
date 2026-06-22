import { NextResponse } from "next/server";
import { getLatestOrCreate } from "@/lib/store";

export const dynamic = "force-dynamic";

// Geeft de nieuwste editie als JSON (handig voor andere clients).
export async function GET() {
  const briefing = await getLatestOrCreate();
  return NextResponse.json(briefing);
}
