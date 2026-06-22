"use client";
import { useStreak } from "@/hooks/useStreak";

export default function StreakBadge() {
  const { streak } = useStreak();
  if (!streak) return null;

  return (
    <div className="streak-badge inline-flex items-center gap-2 rounded border border-gold/25 bg-gold/8 px-3 py-1.5">
      <span className="text-base leading-none" aria-hidden>
        🔥
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
        {streak === 1 ? "Dag 1 — goed begin" : `${streak} dagen op rij`}
      </span>
    </div>
  );
}
