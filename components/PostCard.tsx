"use client";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { useProgress } from "@/hooks/useProgress";

export default function PostCard({ post }: { post: Post }) {
  const { isLearned } = useProgress();
  const learned = isLearned(post.slug);

  return (
    <Link
      href={`/berichten/${post.slug}`}
      className="card-bar group relative flex flex-col bg-surface p-7 transition-colors hover:bg-surface2"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            {post.technique}
          </span>
          {learned && (
            <span className="inline-flex w-fit items-center gap-1 rounded border border-gold/30 bg-gold/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-gold">
              ✓ Geleerd
            </span>
          )}
        </div>
        <span className="rule-num shrink-0 text-4xl sm:text-5xl">
          {String(post.num).padStart(2, "0")}
        </span>
      </div>

      <h3 className="display text-2xl text-text sm:text-[1.7rem]">
        <span className="link-underline">{post.title}</span>
      </h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-dim">{post.hook}</p>

      <div className="mt-5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint transition-colors group-hover:text-gold">
        <span>Lees regel</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
