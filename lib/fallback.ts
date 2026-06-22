import type { Briefing } from "./types";

export function fallbackBriefing(date: string): Briefing {
  return {
    editionDate: date,
    isLive: false,
    generatedAt: new Date().toISOString(),
    lede: {
      title: "Gemiddeld is een keuze, niet een lot",
      body:
        "De meeste verkopers verdienen precies wat ze verdienen: gemiddeld resultaat na gemiddelde inspanning. " +
        "Ze wachten op de perfecte lead, het perfecte moment, de perfecte markt. " +
        "Winnaars wachten niet — ze trainen dagelijks, slaan dagelijks aan de bel, en worden dagelijks 1% beter. Zet je ANTHROPIC_API_KEY in .env.local om live content te activeren.",
    },
    headlines: [
      {
        title: "De verkoper die het snelst terugbelt, wint 78% van de deals",
        summary:
          "Onderzoek toont aan dat leads die binnen 5 minuten worden teruggebeld 21× meer kans hebben om te converteren dan na 30 minuten. " +
          "Stel vandaag nog een melding in voor elke nieuwe lead en bel binnen 3 minuten terug. Dat is het enige verschil tussen jij en je concurrent.",
        source: "Harvard Business Review",
      },
      {
        title: "AI-tools nemen het saaie saleswerk over — wie profiteert?",
        summary:
          "CRM-automatisering, AI-gestuurde follow-up en prospectresearch zijn nu beschikbaar voor een tientje per maand. " +
          "Automatiseer je eerste follow-up vandaag en richt je energie op gesprekken die écht geld opleveren.",
        source: "Salesforce State of Sales",
      },
      {
        title: "Kopers beslissen in 7 seconden — jouw openingszin bepaalt alles",
        summary:
          "Neuromarketing-onderzoek bewijst dat mensen binnen 7 seconden beslissen of ze verder luisteren. " +
          "Schrijf drie versies van je openingszin, test ze deze week en gooi de slechtste weg.",
        source: "Neuromarketing Science & Business Association",
      },
    ],
    tactic: {
      title: "De assumptieve follow-up — doe alsof het al geregeld is",
      body:
        "Na een gesprek stuur je geen 'Hoi, volgen jullie nog na?' maar: 'Ik heb alvast de contractsjabloon klaargelegd. " +
        "Zullen we maandag of dinsdag even doornemen?' Je behandelt de volgende stap als vanzelfsprekend. Zelfverzekerd. " +
        "Mensen volgen als iemand duidelijkheid geeft. Jij elimineert twijfel door richting te bieden. " +
        "Gebruik dit bij elk gesprek dat eindigt zonder harde 'nee'. De kans op respons stijgt met 30-40%.",
    },
    metric: {
      value: "1,01³⁶⁵",
      label: "= 37,8× beter in één jaar",
      context:
        "Elke dag 1% beter zijn in je gesprekken, je voorbereiding en je opvolging stapelt op tot een factor 37 na een jaar. " +
        "Wie dit negeert, staat volgend jaar op exact dezelfde plek als vandaag.",
    },
  };
}
