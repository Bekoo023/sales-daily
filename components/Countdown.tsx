"use client";
import { useEffect, useState } from "react";

function msToNext6AMUTC(): number {
  const now = new Date();
  const next = new Date();
  next.setUTCHours(6, 0, 0, 0);
  if (now.getTime() >= next.getTime()) next.setUTCDate(next.getUTCDate() + 1);
  return next.getTime() - now.getTime();
}

function fmt(ms: number): string {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function Countdown() {
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    setDisplay(fmt(msToNext6AMUTC()));
    const id = setInterval(() => setDisplay(fmt(msToNext6AMUTC())), 1000);
    return () => clearInterval(id);
  }, []);

  if (!display) return null;

  return (
    <span className="flex items-center gap-1.5">
      <span className="text-faint">Volgende editie over</span>
      <span className="tabular-nums text-gold">{display}</span>
    </span>
  );
}
