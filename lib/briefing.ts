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
    `Je bent de hoofdredacteur van een dagelijkse briefing voor verkopers en ondernemers die serieus willen winnen. De editie is van ${date}.`,
    "",
    "SCHRIJFSTIJL:",
    "Direct, bot, zonder bullshit. Denk aan de energie van Andrew Tate — maar dan gericht op echte verkoopvaardigheden en dagelijkse verbetering. Geen zachte taal, geen 'misschien', geen 'zou kunnen', geen corporate-speak.",
    "Regels voor de toon:",
    "- Spreek de lezer altijd aan als 'je' of 'jij', direct, persoonlijk",
    "- Korte zinnen. Maximaal 20 woorden per zin.",
    "- Begin zinnen met een werkwoord of een getal",
    "- Geen relativering. Geen passiefzinnen. Geen 'men kan stellen dat'.",
    "- Harde feiten. Concrete acties. Eerlijkheid die schuurt.",
    "- Zo klinkt het NIET: 'Het is wellicht zinvol om te overwegen...' ",
    "- Zo klinkt het WEL: 'Bel binnen 3 minuten terug. Altijd. Zonder uitzondering.'",
    "",
    "VERBODEN (AI-kenmerken die de tekst verraden):",
    "- Geen gedachtestreepjes (—). Gebruik een punt of komma.",
    "- Geen 'Actie:'-label voor adviezen. Schrijf het gewoon als zin.",
    "- Geen 'Dit werkt omdat...'-openers. Benoem de werking direct.",
    "- Geen 'niet X, maar Y'-constructies.",
    "- Geen 'niet alleen X, maar ook Y'.",
    "- Geen opsommingen met dubbele punt na een inleiding.",
    "Schrijf alles in vlot, strak Nederlands. Alsof een topverkoper dit toeblaast vlak voor je het podium op gaat.",
    "",
    "FOCUS VAN DEZE BRIEFING:",
    FOCUS,
    "",
    "STRUCTUUR — lever EXACT dit JSON-schema, niets anders, geen markdown-codeblokken:",
    `{
  "lede": {
    "title": string,   // De harde waarheid van vandaag — provocerend, scherp, maximaal 10 woorden. Geen vraagzinnen.
    "body": string     // 2-3 zinnen die die waarheid uitleggen en onderbouwen. Schuurt. Activeert. Geen motivational-poster-tekst.
  },
  "headlines": [       // 3 tot 5 items — nieuws en inzichten die er echt toe doen voor verkopers
    {
      "title": string,   // Kop: direct en bruikbaar — wat is hier de les voor een verkoper?
      "summary": string, // 2 zinnen: (1) wat gebeurt er, (2) wat kan de lezer hier MORGEN mee?
      "source": string,  // Naam van de publicatie of het platform
      "url": string      // Directe link naar het artikel of de bron
    }
  ],
  "tactic": {
    "title": string,   // Naam van de 1%-techniek — bondig, activerend
    "body": string     // 3-5 zinnen: wat doe je exact, hoe doe je het, en waarom werkt het psychologisch? Concreet. Geen theorie.
  },
  "metric": {
    "value": string,   // Het getal zelf — groot, visueel sterk (bv. "78%", "8×", "€340")
    "label": string,   // Korte duiding van het getal (bv. "van leads sluit niemand eerste contact")
    "context": string  // 2 zinnen: wat bewijst dit getal, en wat betekent het voor de lezer die actie wil nemen?
  }
}`,
    "",
    "INHOUD — gebruik web search voor actuele data:",
    "",
    "LEDE (harde waarheid van vandaag):",
    "Kies een principe of mentaliteitsshift dat de meeste verkopers negeren of verkeerd begrijpen. Iets wat schuurt. Dat mensen dwingt hun aanpak te veranderen. Verbind dit aan de 1%-filosofie: consistente actie verslaat talent.",
    "De titel is provocerend en direct — geen vraagzin, geen softheid. Voorbeelden van de JUISTE toon: 'Wie wacht op motivatie, verkoopt nooit' / 'Jij verliest deals omdat je te aardig bent' / 'Discipline doet wat talent belooft'.",
    "De body legt uit waarom dit klopt en gooit oud denken omver. 2-3 zinnen. Geen ontsnappingsluik.",
    "",
    "HEADLINES (nieuws dat telt):",
    "Zoek naar recente berichten (afgelopen dagen) over: verkooptactieken, koude acquisitie, onderhandelen, AI in sales, neuromarketing, conversieratio's, klantpsychologie of ondernemerschap. Vat elk bericht samen vanuit de vraag: wat kan een verkoper hier morgen mee doen?",
    "",
    "TACTIC (de 1% actie van vandaag):",
    "ÉÉN concrete techniek of gewoonte. Niet een boek aanbevelen. Geen vage adviezen. Beschrijf de exacte uitvoering: wat zeg je, wat doe je, wanneer doe je het. Geef ook de psychologische reden waarom het werkt — welk menselijk mechanisme benut je?",
    "",
    "METRIC (het bewijs):",
    "Een sprekend cijfer over sales, conversie, gedrag of psychologie. Iets dat bewijst dat actie loont — of dat laat zien hoeveel geld verkopers laten liggen door luiheid of onwetendheid.",
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
        max_tokens: 3500,
        system: buildSystemPrompt(date),
        tools: [
          { type: "web_search_20250305", name: "web_search", max_uses: 6 },
        ],
        messages: [
          {
            role: "user",
            content:
              "Stel de briefing van vandaag samen. Zoek eerst naar het laatste nieuws en de meest relevante salescijfers, en lever dan het JSON-object.",
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
