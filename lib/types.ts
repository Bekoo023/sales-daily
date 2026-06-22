export type Headline = {
  title: string;
  summary: string;
  source: string;
  url?: string;
};

export type Briefing = {
  editionDate: string; // ISO date, bv "2026-06-22"
  lede: { title: string; body: string };
  headlines: Headline[];
  tactic: { title: string; body: string };
  metric: { value: string; label: string; context: string };
  generatedAt: string; // ISO timestamp
  isLive: boolean; // false = fallback/demo content
};
