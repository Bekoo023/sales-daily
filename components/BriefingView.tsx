import type { Briefing } from "@/lib/types";
import { formatLongDate, editionNumber, formatTime } from "@/lib/date";
import CopyButton from "@/components/CopyButton";
import Countdown from "@/components/Countdown";

export default function BriefingView({ briefing }: { briefing: Briefing }) {
  const longDate = formatLongDate(briefing.editionDate);
  const edition = editionNumber(briefing.editionDate);

  return (
    <>
      {/* Harde waarheid van vandaag */}
      <section className="rise border-b border-line py-9 sm:py-12">
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            Editie #{edition}
          </span>
          <span className="text-line" aria-hidden>|</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            {longDate}
          </span>
          {!briefing.isLive && (
            <span className="ml-1 rounded border border-faint/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
              demo
            </span>
          )}
        </div>

        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-5 bg-gold" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            De harde waarheid van vandaag
          </span>
        </div>

        <h1 className="display text-[2.4rem] text-text sm:text-[3.6rem]">
          {briefing.lede.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-dim sm:text-xl">
          {briefing.lede.body}
        </p>
        <div className="mt-4">
          <CopyButton
            text={`${briefing.lede.title}\n\n${briefing.lede.body}`}
            label="Kopieer waarheid"
          />
        </div>
      </section>

      {/* Nieuws dat telt */}
      <section className="py-9 sm:py-12">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            Nieuws dat telt
          </h2>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {briefing.headlines.map((h, i) => {
            const Wrapper = h.url ? "a" : "div";
            return (
              <Wrapper
                key={i}
                {...(h.url
                  ? { href: h.url, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="card-bar group flex flex-col bg-surface p-6 transition-colors hover:bg-surface2"
              >
                <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  {h.source || "Bron"}
                </span>
                <h3 className="text-xl font-semibold leading-snug text-text">
                  <span className="link-underline">{h.title}</span>
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-dim">
                  {h.summary}
                </p>
                {h.url && (
                  <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-gold">
                    Lees verder →
                  </span>
                )}
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* 1% Actie + Bewijs */}
      <section className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-5">
        {/* Tactic */}
        <div className="bg-surface p-7 sm:p-9 md:col-span-3">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-5 bg-gold" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
              De 1% actie van vandaag
            </span>
          </div>
          <h3 className="display text-2xl text-text sm:text-3xl">
            {briefing.tactic.title}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-dim">
            {briefing.tactic.body}
          </p>
          <div className="mt-5">
            <CopyButton
              text={`${briefing.tactic.title}\n\n${briefing.tactic.body}`}
              label="Kopieer tactiek"
            />
          </div>
        </div>

        {/* Metric */}
        <div className="flex flex-col justify-center bg-gold p-7 text-bg sm:p-9 md:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bg/60">
            Het bewijs
          </span>
          <div className="stat-num mt-3 text-4xl sm:text-5xl">
            {briefing.metric.value}
          </div>
          {briefing.metric.label && (
            <div className="mt-1 font-mono text-sm text-bg/80">
              {briefing.metric.label}
            </div>
          )}
          <p className="mt-4 text-[14px] font-medium leading-relaxed text-bg/80">
            {briefing.metric.context}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <span>
            {briefing.isLive ? "Live gegenereerd" : "Demo"} ·{" "}
            {formatTime(briefing.generatedAt)} (CET) · vernieuwt dagelijks
          </span>
          <Countdown />
        </div>
        <span className="text-gold">elke dag 1% scherper ✦</span>
      </footer>
    </>
  );
}
