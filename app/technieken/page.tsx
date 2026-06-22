import SiteHeader from "@/components/SiteHeader";
import { TECHNIQUES, TECHNIQUES_NOTE, TECHNIQUES_SOURCES } from "@/lib/techniques";

export const metadata = { title: "De Methode ontleed — De Salesvloer" };

export default function TechniquesPage() {
  return (
    <main className="relative z-10 mx-auto max-w-4xl px-5 pb-24 sm:px-8">
      <SiteHeader active="technieken" />

      <section className="rise py-12 sm:py-16">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
          De methode ontleed
        </span>
        <h1 className="display mt-5 text-[2.6rem] leading-[0.92] text-text sm:text-[4.2rem]">
          De Tate-school
          <br />
          van verkopen
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dim">
          Of je 'm nu bewondert of verafschuwt: Andrew Tate bouwde een van de
          meest viraal verkopende machines ooit. Hieronder de zes hefbomen die
          het lieten werken. Hoe ze werken, waarom, en waar de grens ligt
          tussen overtuigen en manipuleren.
        </p>
      </section>

      <div className="stagger space-y-px overflow-hidden rounded-lg border border-line bg-line">
        {TECHNIQUES.map((t) => (
          <section key={t.num} className="card-bar bg-surface p-7 sm:p-9">
            <div className="flex items-baseline gap-4">
              <span className="rule-num text-4xl sm:text-5xl">
                {String(t.num).padStart(2, "0")}
              </span>
              <h2 className="display text-2xl text-text sm:text-3xl">
                {t.title}
              </h2>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div className="rounded border border-line/60 bg-surface2 p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  Wat het is
                </span>
                <p className="mt-2 text-[14px] leading-relaxed text-dim">
                  {t.what}
                </p>
              </div>
              <div className="rounded border border-line/60 bg-surface2 p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  Waarom het werkt
                </span>
                <p className="mt-2 text-[14px] leading-relaxed text-dim">
                  {t.why}
                </p>
              </div>
              <div className="rounded border border-blood/20 bg-blood/5 p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-blood">
                  De grens
                </span>
                <p className="mt-2 text-[14px] leading-relaxed text-dim">
                  {t.line}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Eerlijke kanttekening */}
      <section className="mt-8 rounded-lg border border-blood/40 bg-blood/5 p-7 sm:p-9">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-px w-4 bg-blood" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-blood">
            Lees dit voordat je iets kopieert
          </span>
        </div>
        <p className="text-[15px] leading-relaxed text-text/85">
          {TECHNIQUES_NOTE}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="text-faint">Bronnen:</span>
          {TECHNIQUES_SOURCES.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-faint underline decoration-line underline-offset-4 transition-colors hover:text-gold"
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
