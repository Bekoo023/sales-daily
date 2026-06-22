const ITEMS = [
  "Always Be Closing",
  "Snelheid wint",
  "Wie het frame bezit, bepaalt de prijs",
  "Geen deadline, geen besluit",
  "De fortuin zit in de follow-up",
  "Verkoop de uitkomst",
  "Zekerheid is besmettelijk",
  "Elke dag 1% scherper",
  "Laat anderen jou verkopen",
  "Noem eerst het grote getal",
];

export default function Ticker() {
  const line = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-line bg-surface py-3">
      <div className="marquee-wrap overflow-hidden">
        <div className="marquee-track font-mono text-[11px] uppercase tracking-[0.2em]">
          {line.map((t, i) => {
            const isHighlight = i % 4 === 1;
            return (
              <span
                key={i}
                className="mx-6 inline-flex items-center gap-6"
              >
                <span className={isHighlight ? "text-gold" : "text-dim"}>
                  {t}
                </span>
                <span className="text-gold/40" aria-hidden>✦</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
