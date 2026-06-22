import Link from "next/link";
import type { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/berichten/${post.slug}`}
      className="card-bar group relative flex flex-col bg-surface p-7 transition-colors hover:bg-surface2"
    >
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
          {post.technique}
        </span>
        <span className="rule-num text-4xl sm:text-5xl">
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
