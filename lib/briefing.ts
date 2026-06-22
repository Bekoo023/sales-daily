import type { Briefing, Headline } from "./types";
import { fallbackBriefing } from "./fallback";
import { todayISO } from "./date";

const MODEL = "claude-sonnet-4-6";
const ENDPOINT = "https://api.anthropic.com/v1/messages";

const FOCUS =
  process.env.BRIEFING_FOCUS ??
  "Dagelijkse 1%-verbetering in verkopen, overtuigen en ondernemerschap. Mindset, psychologie van overtuigen, concrete sales-tactieken en harde waarheden over succes. Gericht op Nederlandse ondernemers en verkopers die serieus willen winnen.";

function buildSystemPrompt(date: string): string {
  return [
    `Je bent de hoofdredacteur van DE SALESVLOER, een dagelijkse briefing voor verkopers en ondernemers die serieus willen winnen. De editie is van ${date}.`,
    "",
    "SCHRIJFSTIJL:",
    "Direct, bot, zonder bullshit. De energie van een topcoach die je 60 seconden heeft voor het podium op gaat. Geen zachte taal, geen 'misschien', geen corporate-speak. Rauw. Eerlijk. Activerend.",
    "",
    "Absolute regels voor de toon:",
    "- Spreek de lezer altijd aan als 'je' of 'jij' — direct, persoonlijk",
    "- Korte zinnen. Maximaal 18 woorden per zin.",
    "- Begin zinnen met een werkwoord of een getal",
    "- Geen relativering. Geen passiefzinnen.",
    "- Harde feiten. Concrete acties. Eerlijkheid die schuurt.",
    "- NIET: 'Het is wellicht zinvol om te overwegen...'",
    "- WEL: 'Bel binnen 3 minuten terug. Altijd. Zonder uitzondering.'",
    "",
    "VERBODEN (AI-kenmerken die de tekst verraden):",
    "- Geen gedachtestreepjes (—). Gebruik een punt of komma.",
    "- Geen 'Actie:'-label voor adviezen. Schrijf het gewoon als zin.",
    "- Geen 'Dit werkt omdat...'-openers.",
    "- Geen 'niet X, maar Y'-constructies.",
    "- Geen opsommingen met dubbele punt na een inleiding.",
    "- Nooit twee keer hetzelfde onderwerp in lede en tactic.",
    "",
    "VARIATIE (verplicht):",
    "Kies elke dag een ander invalshoek voor de lede. Wissel af tussen: mindset-shifts, psychologische inzichten, acquisitie-fouten, prijsstrategie, body language, voicemails, e-mail-openers, follow-up timing, objection handling, closing technieken, of leadgeneratie. Herhaal nooit een onderwerp dat je de afgelopen 5 dagen al gebruikt hebt.",
    "",
    "FOCUS VAN DEZE BRIEFING:",
    FOCUS,
    "",
    "STRUCTUUR — lever EXACT dit JSON-object, niets anders, geen markdown-codeblokken, geen uitleg:",
    `{
  "lede": {
    "title": string,
    "body": string
  },
  "headlines": [
    {
      "title": string,
      "summary": string,
      "source": string,
      "url": string
    }
  ],
  "tactic": {
    "title": string,
    "body": string
  },
  "metric": {
    "value": string,
    "label": string,
    "context": string
  }
}`,
    "",
    "VELDSPECIFICATIES:",
    "",
    "lede.title — De harde waarheid van vandaag. Maximaal 10 woorden. Provocerend, actief, geen vraagzin.",
    "  Goede voorbeelden: 'Jij verliest deals omdat je te aardig bent' / 'Wie wacht op motivatie, verkoopt nooit' / 'Je prijs is te laag en dat is je eigen schuld'",
    "  Slechte voorbeelden: 'Waarom discipliene belangrijk is' / 'Tips voor betere verkoop' / 'De kracht van consistentie'",
    "",
    "lede.body — 2-3 zinnen. Legt de titel uit en gooit oud denken omver. Schuurt. Geen ontsnappingsluik.",
    "",
    "headlines — 3 tot 5 items. Zoek naar ACTUEEL nieuws (afgelopen 48-72 uur) over:",
    "  verkooptactieken, koude acquisitie, AI in sales, neuromarketing, conversieratio's, klantpsychologie, ondernemerschap, LinkedIn strategie, email prospecting, pricing psychology.",
    "  Per item: title = de les voor een verkoper (niet de nieuwskop), summary = (1) wat er speelt + (2) wat jij morgen concreet doet.",
    "",
    "tactic.title — naam van de 1%-techniek (2-5 woorden, activerend zelfstandig naamwoord of gebod).",
    "tactic.body — 3-5 zinnen. Wat doe je exact? Wat zeg je letterlijk? Wanneer? Welk psychologisch mechanisme benut je?",
    "",
    "metric.value — één groot getal of percentage (bv. '78%', '8×', '€2.400', '14 seconden').",
    "metric.label — 3-6 woorden die het getal duiden (bv. 'meer omzet na snelle opvolging').",
    "metric.context — 2 zinnen: wat bewijst dit, en wat doet de lezer er morgen mee?",
    "",
    "Zoek eerst naar feiten en nieuws, dan pas schrijven. Alle URLs moeten echt en actueel zijn.",
  ].join("\n");
}

type AnthropicTextBlock = { type: "text"; text: string };
type AnthropicBlock = AnthropicTextBlock | { type: string; [k: string]: unknown };

function extractJson(text: string): unknown | null {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

function coerceBriefing(parsed: unknown, date: string): Briefing | null {
  if (!parsed || typeof parsed !== "object") return null;
  const p = parsed as Record<string, unknown>;
  const lede = p.lede as Record<string, unknown> | undefined;
  const tactic = p.tactic as Record<string, unknown> | undefined;
  const metric = p.metric as Record<string, unknown> | undefined;
  const rawHeadlines = Array.isArray(p.headlines) ? p.headlines : [];

  if (!lede?.title || !lede?.body) return null;

  const headlines: Headline[] = rawHeadlines
    .map((h) => {
      const item = h as Record<string, unknown>;
      return {
        title: String(item.title ?? "").trim(),
        summary: String(item.summary ?? "").trim(),
        source: String(item.source ?? "").trim(),
        url: item.url ? String(item.url).trim() : undefined,
      };
    })
    .filter((h) => h.title && h.summary)
    .slice(0, 5);

  if (headlines.length === 0) return null;

  return {
    editionDate: date,
    isLive: true,
    generatedAt: new Date().toISOString(),
    lede: { title: String(lede.title), body: String(lede.body) },
    headlines,
    tactic: {
      title: String(tactic?.title ?? "De 1% actie"),
      body: String(tactic?.body ?? ""),
    },
    metric: {
      value: String(metric?.value ?? ""),
      label: String(metric?.label ?? ""),
      context: String(metric?.context ?? ""),
    },
  };
}

export async function getDailyBriefing(): Promise<Briefing> {
  const date = todayISO();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) return fallbackBriefing(date);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 4096,
        system: buildSystemPrompt(date),
        tools: [
          { type: "web_search_20250305", name: "web_search", max_uses: 8 },
        ],
        messages: [
          {
            role: "user",
            content:
              "Stel de briefing van vandaag samen. Volg deze volgorde: (1) Zoek naar een verrassend salescijfer of gedragsstatistiek voor het metric-veld. (2) Zoek naar actueel nieuws van de afgelopen 48-72 uur voor de headlines — minimaal 4 resultaten. (3) Kies een lede-onderwerp dat vandaag vers en scherp aanvoelt. (4) Lever het JSON-object exact zoals het schema vereist. Geen uitleg. Geen markdown. Alleen het object.",
          },
        ],
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Anthropic API fout:", res.status);
      return fallbackBriefing(date);
    }

    const data = (await res.json()) as { content?: AnthropicBlock[] };
    const text = (data.content ?? [])
      .filter((b): b is AnthropicTextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    const parsed = extractJson(text);
    const briefing = parsed ? coerceBriefing(parsed, date) : null;
    return briefing ?? fallbackBriefing(date);
  } catch (err) {
    console.error("Kon briefing niet ophalen:", err);
    return fallbackBriefing(date);
  }
}
