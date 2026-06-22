const MONTHS = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];
const WEEKDAYS = [
  "zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag",
];

// Datum van vandaag in NL-tijdzone als YYYY-MM-DD
export function todayISO(): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(new Date());
}

export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return `${WEEKDAYS[date.getUTCDay()]} ${d} ${MONTHS[m - 1]} ${y}`;
}

export function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function editionNumber(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  const start = Date.UTC(2026, 0, 1);
  const now = Date.UTC(y, m - 1, d);
  return Math.max(1, Math.floor((now - start) / 86_400_000) + 1);
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
