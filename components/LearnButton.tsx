"use client";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

export default function LearnButton({ slug }: { slug: string }) {
  const { isLearned, toggle } = useProgress();
  const learned = isLearned(slug);

  function handleClick() {
    toggle(slug);
    if (!learned) {
      toast.success("Regel geleerd — morgen de volgende.");
    } else {
      toast("Teruggezet naar ongeleerd");
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] transition-all ${
        learned
          ? "border border-gold bg-gold/10 text-gold"
          : "border border-line text-text hover:border-gold/40 hover:text-gold"
      }`}
    >
      {learned ? "✓ Geleerd" : "Markeer als geleerd"}
    </button>
  );
}
