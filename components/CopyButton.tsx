"use client";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({ text, label = "Kopieer", className }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Gekopieerd naar klembord");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Kopiëren mislukt — probeer handmatig");
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={`${label} naar klembord`}
      className={
        className ??
        "flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors hover:text-gold"
      }
    >
      <span aria-hidden>{copied ? "✓" : "⧉"}</span>
      <span>{copied ? "Gekopieerd" : label}</span>
    </button>
  );
}
