import Link from "next/link";

const NAV = [
  { href: "/", label: "Vandaag" },
  { href: "/berichten", label: "Playbook" },
  { href: "/technieken", label: "De Methode" },
  { href: "/archief", label: "Archief" },
];

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="display text-lg text-text transition-colors group-hover:text-gold">
                De Salesvloer
              </span>
              <span className="h-2 w-2 rounded-full bg-gold" aria-hidden />
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-faint">
              Dagelijkse tactieken, harde waarheden en het bewijs dat discipline
              wint van talent. Elke dag 1% beter. Geen excuses.
            </p>
          </div>

          {/* Nav links */}
          <nav
            className="flex gap-12 font-mono text-[11px] uppercase tracking-[0.16em]"
            aria-label="Footer navigatie"
          >
            <div className="flex flex-col gap-3.5">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-faint transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between">
          <span className="text-faint">
            © {new Date().getFullYear()} De Salesvloer
          </span>
          <span className="text-gold">Elke dag 1% scherper ✦</span>
        </div>
      </div>
    </footer>
  );
}
