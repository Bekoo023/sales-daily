import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import BriefingView from "@/components/BriefingView";
import { getEdition } from "@/lib/store";
import { formatLongDate, editionNumber } from "@/lib/date";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  return { title: `${formatLongDate(date)} — De Salesvloer` };
}

export default async function EditionPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const briefing = await getEdition(date);
  if (!briefing) notFound();

  return (
    <main className="relative z-10 mx-auto max-w-5xl px-5 pb-24 sm:px-8">
      <SiteHeader active="archief" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        <Link href="/archief" className="transition-colors hover:text-text">
          Archief
        </Link>
        <span aria-hidden>›</span>
        <span className="text-gold">Editie #{editionNumber(date)}</span>
        <span aria-hidden>›</span>
        <span className="text-dim">{formatLongDate(date)}</span>
      </div>

      <BriefingView briefing={briefing} />

      <div className="mt-6">
        <Link
          href="/archief"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-faint transition-colors hover:text-gold"
        >
          ← Terug naar archief
        </Link>
      </div>
    </main>
  );
}
