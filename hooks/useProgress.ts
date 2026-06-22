"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "sf_learned";

export function useProgress() {
  const [learned, setLearned] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[];
      setLearned(new Set(stored));
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const toggle = useCallback((slug: string) => {
    setLearned((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      try {
        localStorage.setItem(KEY, JSON.stringify([...next]));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const isLearned = useCallback(
    (slug: string) => learned.has(slug),
    [learned]
  );

  return { learned, toggle, isLearned, count: learned.size };
}
