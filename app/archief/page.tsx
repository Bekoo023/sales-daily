import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { listEditions } from "@/lib/store";
import { isSupabaseConfigured } from "@/lib/supabase";
import { formatLongDate, editionNumber } from "@/lib/date";

export const dynamic = "force-dynamic";
export const metadata = { title: "Archief — De Salesvloer" };

export default async function ArchivePage() {
  const configured = isSupabaseConfigured();
  const editions = configured ? await listEditions() : [];

  return (
    <main className="relative z-10 mx-auto max-w-5xl px-5 pb-24 sm:px-8">
      <SiteHeader active="archief" />

      <section className="rise py-12 sm:py-16">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
          {editions.length} {editions.length === 1 ? "editie" : "edities"} bewaard
        </span>
        <h1 className="display mt-4 text-[2.6rem] leading-[0.92] text-text sm:text-[4rem]">
          Het archief
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dim">
          Elke editie blijft bewaard. Zo bouwt de briefing zich vanzelf op,
          ook op de dagen dat je niet langskomt.
        </p>
      </section>

      {!configured ? (
        <div className="rounded-lg border border-gold/30 bg-gold/5 px-6 py-5">
          <p className="font-mono text-[12px] leading-relaxed text-text/85">
            Het archief gebruikt Supabase. Zet{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 text-gold">SUPABASE_URL</code>{" "}
            en{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 text-gold">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
            in je omgeving en draai{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 text-gold">supabase/schema.sql</code>.
          </p>
        </div>
      ) : editions.length === 0 ? (
        <div className="rounded-lg border border-line bg-surface px-5 py-12 text-center">
          <p className="text-dim">
            Nog geen edities. De eerste verschijnt zodra de dagelijkse generatie
            draait, of bezoek de homepage om er meteen één te maken.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-gold transition-opacity hover:opacity-70"
          >
            Naar vandaag →
          </Link>
        </div>
      ) : (
        <ul className="stagger overflow-hidden rounded-lg border border-line">
          {editions.map((b, i) => (
            <li key={b.editionDate}>
              <Link
                href={`/editie/${b.editionDate}`}
                className="card-bar group flex flex-col gap-1.5 bg-surface px-6 py-5 transition-colors hover:bg-surface2 sm:flex-row sm:items-baseline sm:gap-6"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}
              >
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-faint sm:w-52">
                  <span className="text-gold">#{editionNumber(b.editionDate)}</span>{" "}
                  · {formatLongDate(b.editionDate)}
                </span>
                <span className="flex-1 text-lg font-semibold leading-snug text-text">
                  <span className="link-underline">{b.lede.title}</span>
                </span>
                <span className="hidden text-faint transition-all group-hover:translate-x-0.5 group-hover:text-gold sm:block">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
