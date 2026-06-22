import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import BriefingView from "@/components/BriefingView";
import PostCard from "@/components/PostCard";
import Ticker from "@/components/Ticker";
import StreakBadge from "@/components/StreakBadge";
import { getLatestOrCreate } from "@/lib/store";
import { POSTS } from "@/lib/posts";

export const dynamic = "force-dynamic";

const STATS = [
  { num: "10", label: "Verkoopregels" },
  { num: "6", label: "Technieken ontleed" },
  { num: "∞", label: "Dagelijkse edities" },
  { num: "1%", label: "Scherper per dag" },
];

export default async function Home() {
  const briefing = await getLatestOrCreate();
  const featured = POSTS.slice(0, 4);

  return (
    <main className="relative z-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SiteHeader active="vandaag" />

        {/* Hero */}
        <section className="rise py-16 sm:py-24">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
              Elke dag 1% scherper in verkopen
            </span>
            <StreakBadge />
          </div>
          <h1 className="display mt-2 text-[3.2rem] leading-[0.88] text-text sm:text-[6rem]">
            Talent verliest.
            <br />
            <span className="glow-text text-gold">Discipline</span> wint.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-dim">
            Elke dag een harde waarheid, een concrete tactiek en het bewijs dat
            kleine dagelijkse acties groter zijn dan elk talent. Geen excuses.
            Geen hype. Gewoon winnen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/berichten"
              className="bg-gold px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.16em] text-bg transition-opacity hover:opacity-90"
            >
              Lees het playbook →
            </Link>
            <Link
              href="/technieken"
              className="border border-line px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.16em] text-text transition-colors hover:border-gold hover:text-gold"
            >
              De methode
            </Link>
          </div>
        </section>
      </div>

      {/* Stats strip */}
      <div className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-5 sm:px-8 sm:py-6">
              <div className="stat-num text-3xl text-gold sm:text-4xl">{s.num}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Ticker />

      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        {/* Briefing van vandaag */}
        <div className="pt-8">
          <BriefingView briefing={briefing} />
        </div>

        {/* Playbook-teaser */}
        <section className="pt-20">
          <div className="flex items-end justify-between border-b border-line pb-5">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                Het playbook
              </span>
              <h2 className="display mt-2 text-2xl text-text sm:text-3xl">
                Uit het playbook
              </h2>
            </div>
            <Link
              href="/berichten"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold transition-opacity hover:opacity-70"
            >
              Alle 10 →
            </Link>
          </div>
          <div className="stagger mt-px grid gap-px overflow-hidden rounded-b-lg border-x border-b border-line bg-line sm:grid-cols-2">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* Methode-teaser */}
        <section className="mt-16 overflow-hidden rounded-lg border border-line">
          <div className="bg-surface p-8 sm:p-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
              De methode ontleed
            </span>
            <h2 className="display mt-3 max-w-2xl text-2xl text-text sm:text-4xl">
              Hoe de grootste hustle-marketing ter wereld werkte
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-dim">
              Van het affiliate-leger tot het wij-zij-verhaal: zes technieken
              uit de Andrew Tate-school, keihard uitgelegd. Wat werkt, waarom
              het werkt, en waar de grens ligt tussen overtuigen en manipuleren.
            </p>
            <Link
              href="/technieken"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-gold transition-opacity hover:opacity-70"
            >
              Ontleed de methode →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
