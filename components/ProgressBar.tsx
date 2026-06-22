"use client";
import { useProgress } from "@/hooks/useProgress";

const TOTAL = 10;

export default function ProgressBar() {
  const { count } = useProgress();
  const pct = Math.round((count / TOTAL) * 100);

  return (
    <div className="mt-6 rounded-lg border border-line bg-surface p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Jouw voortgang
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
          {count}/{TOTAL} geleerd
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-gold transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      {count === TOTAL && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
          ✦ Volledig playbook gemeesterd
        </p>
      )}
      {count > 0 && count < TOTAL && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
          {TOTAL - count} {TOTAL - count === 1 ? "regel" : "regels"} te gaan
        </p>
      )}
    </div>
  );
}
