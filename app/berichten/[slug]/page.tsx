import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import LearnButton from "@/components/LearnButton";
import { POSTS, getPost } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? `${post.title} — De Salesvloer` : "Niet gevonden" };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const next = POSTS[(post.num % POSTS.length)];

  const url = `${siteUrl()}/berichten/${post.slug}`;
  const shareText = `${post.title} — ${post.hook}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const cardHref = `/berichten/${post.slug}/opengraph-image`;

  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 pb-24 sm:px-8">
      <SiteHeader active="berichten" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        <Link href="/berichten" className="transition-colors hover:text-text">
          Het playbook
        </Link>
        <span aria-hidden>›</span>
        <span className="text-dim">Regel {String(post.num).padStart(2, "0")}</span>
      </div>

      <article className="rise py-10 sm:py-14">
        {/* Techniek + nummer */}
        <div className="flex items-center gap-5">
          <span className="rule-num text-6xl sm:text-7xl">
            {String(post.num).padStart(2, "0")}
          </span>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              {post.technique}
            </span>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              Regel {post.num} van {POSTS.length}
            </div>
          </div>
        </div>

        <h1 className="display mt-6 text-[2.4rem] leading-[0.95] text-text sm:text-[3.4rem]">
          {post.title}
        </h1>

        {/* Hook met gouden linkerbalk */}
        <p className="mt-6 border-l-2 border-gold pl-5 text-xl leading-relaxed text-dim">
          {post.hook}
        </p>

        {/* Body tekst */}
        <div className="mt-10 space-y-6 text-[17px] leading-[1.75] text-text/90">
          {post.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {/* Leren + Delen */}
      <div className="border-t border-line py-8">
        <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Jouw voortgang
        </div>
        <LearnButton slug={post.slug} />
      </div>

      <div className="border-t border-line py-8">
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Deel deze regel
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={liHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-bg transition-opacity hover:opacity-90"
          >
            LinkedIn
          </a>
          <a
            href={xHref}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-text transition-colors hover:border-gold hover:text-gold"
          >
            X / Twitter
          </a>
          <a
            href={cardHref}
            download={`salesvloer-regel-${post.num}.png`}
            className="border border-line px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-text transition-colors hover:border-gold hover:text-gold"
          >
            Download kaart ↓
          </a>
        </div>
      </div>

      {/* Volgende regel */}
      <Link
        href={`/berichten/${next.slug}`}
        className="group flex items-center justify-between gap-4 border-t border-line py-6 transition-colors hover:border-gold/30"
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            Volgende regel
          </span>
          <div className="display mt-1 text-xl text-text transition-colors group-hover:text-gold sm:text-2xl">
            {String(next.num).padStart(2, "0")} · {next.title}
          </div>
        </div>
        <span className="text-2xl text-faint transition-all group-hover:translate-x-1 group-hover:text-gold">
          →
        </span>
      </Link>
    </main>
  );
}
