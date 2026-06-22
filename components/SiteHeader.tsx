import Link from "next/link";

const NAV = [
  { href: "/", label: "Vandaag", key: "vandaag" },
  { href: "/berichten", label: "Playbook", key: "berichten" },
  { href: "/technieken", label: "De Methode", key: "technieken" },
  { href: "/archief", label: "Archief", key: "archief" },
] as const;

export default function SiteHeader({
  active,
}: {
  active: "vandaag" | "berichten" | "technieken" | "archief";
}) {
  return (
    <header className="pt-7 sm:pt-10">
      <div className="flex flex-wrap items-center justify-between gap-y-3 border-b border-line pb-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="display text-lg text-text transition-colors group-hover:text-gold">
            De Salesvloer
          </span>
          <span className="live-dot relative h-2 w-2 rounded-full bg-gold" aria-hidden />
        </Link>

        {/* Nav */}
        <nav
          className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] sm:gap-6"
          aria-label="Hoofdnavigatie"
        >
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={
                active === item.key
                  ? "text-gold"
                  : "text-faint transition-colors hover:text-text"
              }
              aria-current={active === item.key ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
