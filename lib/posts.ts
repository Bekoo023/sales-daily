export type Post = {
  num: number;
  slug: string;
  technique: string;
  title: string;
  hook: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    num: 1,
    slug: "snelheid",
    technique: "Speed-to-lead",
    title: "De eerste die belt, wint",
    hook: "Een lead is heet voor vijf minuten. Daarna is het een lijk.",
    body: [
      "Reageer binnen 5 minuten op een nieuwe lead en je kans om 'm daadwerkelijk te spreken is tot tientallen keren groter dan na een uur. Snelheid is geen detail — het is de wedstrijd.",
      "De meeste verkopers verliezen niet op prijs of pitch. Ze verliezen omdat ze te laat zijn. Terwijl jij je koffie haalt, heeft de concurrent al gebeld.",
      "Bouw je proces zo dat een nieuwe lead binnen minuten een reactie krijgt. Automatiseer het eerste contact, maar bel zelf zodra het kan. Wie het snelst opvolgt, bepaalt het gesprek.",
    ],
  },
  {
    num: 2,
    slug: "schaarste",
    technique: "Schaarste & urgentie",
    title: "Wat altijd kan, doe je nooit",
    hook: "Onbeperkt beschikbaar betekent oneindig uitstelbaar.",
    body: [
      "Mensen komen pas in beweging als iets dreigt te verdwijnen. Geen deadline, geen besluit. Een aanbod zonder einddatum is een aanbod dat nooit getekend wordt.",
      "Echte schaarste werkt het sterkst: beperkte plekken, een prijs die stijgt, een bonus die vervalt. Nep-urgentie ruikt een klant van een kilometer afstand — gebruik het alleen als het waar is.",
      "Geef elk voorstel een natuurlijke vervaldatum. Niet om te pushen, maar om de klant te dwingen nú te kiezen in plaats van 'later' (lees: nooit).",
    ],
  },
  {
    num: 3,
    slug: "frame",
    technique: "Frame-controle",
    title: "Wie het frame bezit, bepaalt de prijs",
    hook: "Verkoop nooit vanuit de underdog-positie.",
    body: [
      "Elk gesprek heeft een frame: wie heeft hier wie nodig? Loop je binnen als smekende verkoper, dan onderhandel je vanaf de bodem. Loop je binnen als de expert die kiest met wie hij werkt, dan komt de klant naar jou toe.",
      "Frame-controle is geen arrogantie, het is rust. Je stelt de vragen. Je bepaalt de agenda. Je bent bereid weg te lopen. Die bereidheid is je grootste hefboom.",
      "Wie het meest geïnvesteerd is in de deal, heeft het zwakste frame. Zorg dat de klant eerst investeert — in tijd, informatie en commitment — voordat jij dat doet.",
    ],
  },
  {
    num: 4,
    slug: "zekerheid",
    technique: "Overtuiging",
    title: "Twijfel jij, dan twijfelt de klant",
    hook: "Zekerheid is besmettelijk. Twijfel ook.",
    body: [
      "Mensen kopen geen product, ze kopen jouw overtuiging dat het werkt. Sta jij niet 100% achter je aanbod, dan voelt de klant dat in elke aarzeling, elke 'eh', elke korting die je te snel geeft.",
      "Dit betekent niet liegen. Het betekent dat je écht moet geloven in de waarde die je levert — en als je dat niet doet, verkoop je het verkeerde ding.",
      "Bereid je zo voor dat je elke vraag kalm kunt beantwoorden. Zekerheid komt niet uit lef, maar uit voorbereiding.",
    ],
  },
  {
    num: 5,
    slug: "uitkomst",
    technique: "Waardeverkoop",
    title: "Niemand wil een boormachine",
    hook: "Ze willen het gat. Eigenlijk: de foto die er komt te hangen.",
    body: [
      "Klanten geven niets om je features, je specs of je 'innovatieve platform'. Ze geven om wat er in hún leven verandert: meer omzet, minder gedoe, tijd terug.",
      "Vertaal elk kenmerk naar een gevolg. Niet 'realtime dashboard', maar 'je ziet in één oogopslag waar je geld weglekt'. Niet 'AI-gestuurd', maar 'het werk dat je 's avonds deed, is 's ochtends al klaar'.",
      "De beste verkopers praten 80% over de uitkomst en 20% over het product. Amateurs doen het omgekeerd.",
    ],
  },
  {
    num: 6,
    slug: "bewijs",
    technique: "Sociale bewijskracht",
    title: "Laat anderen jou verkopen",
    hook: "Eén tevreden klant overtuigt meer dan tien van jouw beloftes.",
    body: [
      "Mensen vertrouwen mensen zoals zij. Een case van een vergelijkbaar bedrijf, een screenshot van een resultaat, een naam die ze herkennen — dat doet meer dan welk verkooppraatje ook.",
      "Verzamel bewijs systematisch. Vraag na elke succesvolle deal om een korte review of een cijfer dat je mag delen. Bouw een muur van bewijs.",
      "Toon dat bewijs op het juiste moment: precies wanneer de klant twijfelt. 'Snap ik — zo dacht [vergelijkbaar bedrijf] er ook over, en dit is wat er daarna gebeurde.'",
    ],
  },
  {
    num: 7,
    slug: "anker",
    technique: "Anchoring",
    title: "Noem eerst het grote getal",
    hook: "Het eerste bedrag dat valt, bepaalt alle volgende.",
    body: [
      "De prijs die je als eerste noemt, wordt het anker waaraan al het andere wordt afgemeten. Begin je met je goedkoopste pakket, dan voelt alles daarboven 'duur'. Begin je hoog, dan voelt je middenoptie als een koopje.",
      "Presenteer altijd je premium-optie eerst. Niet om die te verkopen, maar om de rest betaalbaar te laten lijken.",
      "Werk met drie opties: een ankerprijs (hoog), de optie die je echt wil verkopen (midden) en een instap. De meeste mensen kiezen het midden — precies waar je ze hebben wil.",
    ],
  },
  {
    num: 8,
    slug: "close",
    technique: "De assumptieve close",
    title: "Doe alsof de ja al gevallen is",
    hook: "Vraag niet óf. Vraag wanneer.",
    body: [
      "Zwakke verkopers vragen: 'Zou je interesse hebben?' Sterke verkopers vragen: 'Zullen we maandag of donderdag starten?' Je behandelt het besluit als genomen en gaat door naar het hoe.",
      "Dit werkt omdat je de klant een kleine, makkelijke keuze geeft (wanneer) in plaats van een grote, enge keuze (wel of niet).",
      "Gebruik het pas als de signalen goed staan. Te vroeg assumptief sluiten voelt als duwen. Op het juiste moment voelt het als de logische volgende stap.",
    ],
  },
  {
    num: 9,
    slug: "bezwaren",
    technique: "Bezwaren ombuigen",
    title: "Een bezwaar is een vraag om geruststelling",
    hook: "'Te duur' betekent zelden te duur.",
    body: [
      "Een klant die bezwaren maakt, is een klant die nadenkt over kopen. Wie écht niet wil, zegt niets en verdwijnt. Een bezwaar is een uitnodiging, geen muur.",
      "'Te duur' betekent meestal 'ik zie de waarde nog niet'. 'Ik moet erover nadenken' betekent 'er is een twijfel die ik niet uitspreek'. Graaf door tot je het echte bezwaar vindt.",
      "Bevestig eerst, weerleg dan. 'Logisch dat je naar de prijs kijkt. Laten we kijken wat het je oplevert — dan beslis jij of het dat waard is.'",
    ],
  },
  {
    num: 10,
    slug: "opvolging",
    technique: "Genadeloze follow-up",
    title: "De fortuin zit in de follow-up",
    hook: "De meeste deals sluiten na contact vijf. De meeste verkopers stoppen bij twee.",
    body: [
      "Het merendeel van de verkopen vraagt om vijf of meer contactmomenten. Het merendeel van de verkopers geeft op na één of twee. Reken uit waar het geld ligt.",
      "Opvolgen is geen zeuren — als je elke keer iets van waarde brengt. Een artikel, een idee, een concreet voorbeeld. Word de persoon die blijft helpen, niet de persoon die blijft vragen.",
      "Bouw een systeem: vaste momenten, vaste vorm, altijd met een reden om contact te zoeken. Discipline in opvolging verslaat talent in pitchen.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
