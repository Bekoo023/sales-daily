import type { Briefing } from "./types";
import { getDailyBriefing } from "./briefing";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";
import { todayISO } from "./date";

const TABLE = "briefings";

type Row = {
  edition_date: string;
  data: Omit<Briefing, "editionDate" | "generatedAt">;
  generated_at: string;
};

function rowToBriefing(row: Row): Briefing {
  return {
    editionDate: row.edition_date,
    generatedAt: row.generated_at,
    isLive: row.data.isLive ?? true,
    lede: row.data.lede,
    headlines: row.data.headlines ?? [],
    tactic: row.data.tactic,
    metric: row.data.metric,
  };
}

export async function listEditions(): Promise<Briefing[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data, error } = await sb
    .from(TABLE)
    .select("edition_date, data, generated_at")
    .order("edition_date", { ascending: false });
  if (error || !data) return [];
  return (data as Row[]).map(rowToBriefing);
}

export async function getEdition(date: string): Promise<Briefing | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data, error } = await sb
    .from(TABLE)
    .select("edition_date, data, generated_at")
    .eq("edition_date", date)
    .maybeSingle();
  if (error || !data) return null;
  return rowToBriefing(data as Row);
}

async function storeEdition(b: Briefing): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const { error } = await sb.from(TABLE).upsert(
    {
      edition_date: b.editionDate,
      generated_at: b.generatedAt,
      data: {
        isLive: b.isLive,
        lede: b.lede,
        headlines: b.headlines,
        tactic: b.tactic,
        metric: b.metric,
      },
    },
    { onConflict: "edition_date" }
  );
  if (error) console.error("Kon editie niet opslaan:", error.message);
}

// Genereert (indien nog niet aanwezig) de editie van vandaag en bewaart hem.
export async function ensureTodaysEdition(): Promise<Briefing> {
  const date = todayISO();
  const existing = await getEdition(date);
  if (existing) return existing;

  const fresh = await getDailyBriefing(); // gebruikt de datum van vandaag
  fresh.editionDate = date;
  await storeEdition(fresh);
  return fresh;
}

// Voor de homepage: de nieuwste editie uit het archief.
// Zonder Supabase valt dit terug op losse generatie (geen archief).
export async function getLatestOrCreate(): Promise<Briefing> {
  if (!isSupabaseConfigured()) {
    return getDailyBriefing();
  }
  const all = await listEditions();
  if (all.length > 0) return all[0];
  return ensureTodaysEdition();
}
