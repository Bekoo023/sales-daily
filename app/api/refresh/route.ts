import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ensureTodaysEdition } from "@/lib/store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Dagelijks aangeroepen door Vercel Cron (zie vercel.json):
// genereert de editie van vandaag, bewaart hem in Supabase en ververst de pagina's.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const briefing = await ensureTodaysEdition();

  revalidatePath("/");
  revalidatePath("/archief");

  return NextResponse.json({
    ok: true,
    editionDate: briefing.editionDate,
    isLive: briefing.isLive,
    revalidatedAt: new Date().toISOString(),
  });
}
