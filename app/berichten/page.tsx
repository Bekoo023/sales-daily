import SiteHeader from "@/components/SiteHeader";
import PostCard from "@/components/PostCard";
import ProgressBar from "@/components/ProgressBar";
import { POSTS } from "@/lib/posts";

export const metadata = { title: "Het Playbook — De Salesvloer" };

export default function PlaybookPage() {
  return (
    <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <SiteHeader active="berichten" />

      <section className="rise py-12 sm:py-16">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
          {POSTS.length} regels · geen uitvluchten
        </span>
        <h1 className="display mt-5 text-[2.6rem] leading-[0.92] text-text sm:text-[4rem]">
          Tien regels.
          <br />
          Geen excuses.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-dim">
          Elke regel is een wapen. Gebruik ze. Morgen, in het eerste gesprek
          dat je voert.
        </p>
        <ProgressBar />
      </section>

      <div className="stagger grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {POSTS.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
