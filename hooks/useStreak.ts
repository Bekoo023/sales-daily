"use client";
import { useEffect, useState } from "react";

const KEY_DATE = "sf_last_visit";
const KEY_STREAK = "sf_streak";

export function useStreak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastVisit = localStorage.getItem(KEY_DATE);
    const current = parseInt(localStorage.getItem(KEY_STREAK) ?? "0", 10);

    if (!lastVisit) {
      localStorage.setItem(KEY_DATE, today);
      localStorage.setItem(KEY_STREAK, "1");
      setStreak(1);
      return;
    }

    if (lastVisit === today) {
      setStreak(current);
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split("T")[0];

    const next = lastVisit === yStr ? current + 1 : 1;
    localStorage.setItem(KEY_DATE, today);
    localStorage.setItem(KEY_STREAK, String(next));
    setStreak(next);
  }, []);

  return { streak };
}
