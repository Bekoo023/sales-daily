export type Technique = {
  num: number;
  title: string;
  what: string; // wat het is
  why: string; // waarom het werkt
  line: string; // de grens / ethische noot
};

export const TECHNIQUES: Technique[] = [
  {
    num: 1,
    title: "Verkoop de persoon, niet het product",
    what:
      "Andrew Tate bouwde een personage van extreme rijkdom en onwankelbaar zelfvertrouwen: de 'Top G', de Bugatti's, de sigaren. Wie zijn cursus kocht, kocht geen lessen maar de belofte om te worden zoals hij.",
    why:
      "Aspiratie verkoopt. Mensen kopen de versie van zichzelf die ze willen zijn. Een sterk, herkenbaar personage onthoudt en deelt men makkelijker dan welk product ook.",
    line:
      "Status kan oprecht zijn (bewezen kunde) of pure show. Geleende autoriteit klapt om zodra de realiteit niet matcht. Bouw je personage op iets dat je echt kunt waarmaken.",
  },
  {
    num: 2,
    title: "Maak jezelf onontkoombaar (het affiliate-leger)",
    what:
      "De motor achter zijn doorbraak: leden van Hustler's University kregen commissie om clips van Tate te knippen en massaal op TikTok, Reels en Shorts te zetten met een aanmeldlink. Duizenden accounts maakten hem in 2022 letterlijk onontkoombaar — bereik dat normaal tonnen per maand kost, vrijwel gratis.",
    why:
      "Herhaalde blootstelling voelt als vertrouwdheid, en vertrouwdheid voelt als vertrouwen. Tel daar sociale bewijskracht op schaal bij op en je krijgt een vliegwiel.",
    line:
      "Een marketinghoogleraar en diverse critici noemden het affiliate-model een sociale-media-piramidespel; betaalproviders en platforms trokken zich terug en het programma werd stopgezet. Bereik dat draait op het ronselen van nieuwe leden staat op juridisch glad ijs.",
  },
  {
    num: 3,
    title: "Bouw een wij-zij-verhaal",
    what:
      "Tate framede de gewone wereld als 'de Matrix' en niet-kopen als kiezen voor een leven als 'brokie'. Kopen werd zo geen aankoop, maar een ontsnapping en een identiteit.",
    why:
      "Een gedeelde vijand en een wij-zij-verhaal binden mensen en maken de beslissing emotioneel in plaats van rationeel. Je verkoopt niet langer een product, maar lidmaatschap van een stam.",
    line:
      "Hoe sterker het wij-zij-frame, hoe dunner de lijn met manipulatie — zeker richting jonge, beïnvloedbare doelgroepen. Juist dat targeten van tieners markeerden juristen en onderzoekers als zorgelijk.",
  },
  {
    num: 4,
    title: "Schaarste en exclusieve tiers",
    what:
      "Boven de instapcursus hing een dure, besloten laag (de 'War Room', duizenden euro's). Exclusiviteit zelf werd het product.",
    why:
      "Schaarste en status verhogen de waargenomen waarde. En de laag eronder lijkt ineens betaalbaar — klassieke anchoring.",
    line:
      "Exclusiviteit moet echte extra waarde leveren. Anders verkoop je lucht met een hoog prijskaartje, en dat valt vroeg of laat door de mand.",
  },
  {
    num: 5,
    title: "Lage drempel, terugkerende omzet",
    what:
      "Een lage instap (rond de $49,99 per maand, inmiddels hoger), maandelijks doorlopend, makkelijk erin — moeilijker eruit, zonder restitutie. Voorspelbare cashflow boven losse verkopen.",
    why:
      "Een klein maandbedrag voelt verwaarloosbaar bij instap, maar stapelt enorm op voor de aanbieder zodra het bij duizenden mensen doorloopt.",
    line:
      "Het verschil tussen een eerlijk abonnement en een val zit in hoe makkelijk je kunt opzeggen. Wees de aanbieder die mensen met een gerust hart laat vertrekken — dat bouwt op lange termijn meer waarde.",
  },
  {
    num: 6,
    title: "Stelligheid en herhaling",
    what:
      "Absolute zekerheid, korte rake boodschappen, eindeloos herhaald. Geen nuance, geen twijfel.",
    why:
      "Stelligheid leest als competentie, en herhaling maakt een boodschap in het hoofd 'waar'. Twee van de oudste hefbomen in overtuiging.",
    line:
      "Stelligheid zonder onderbouwing is precies hoe slechte producten alsnog verkopen. Vraag — als koper én als verkoper — altijd: waar is het bewijs?",
  },
];

// Eerlijke kanttekening die op de pagina komt te staan.
export const TECHNIQUES_NOTE =
  "Veel van deze hefbomen zijn gewone marketingfundamenten: aspiratie, sociale bewijskracht, schaarste, abonnementen. Wat de Tate-casus berucht maakt is de schaal, de jonge doelgroep en de context. Tate werd in 2022 van grote platforms verwijderd wegens haatzaaien, zijn affiliate-model werd breed als piramidespel bestempeld, en hij staat in Roemenië terecht voor onder meer mensenhandel en verkrachting — aanklachten die hij ontkent en die in 2026 nog lopen. Leer de mechaniek, kopieer de ethiek niet blind.";

export const TECHNIQUES_SOURCES = [
  { label: "Andrew Tate — Wikipedia", url: "https://en.wikipedia.org/wiki/Andrew_Tate" },
  {
    label: "The Real World / pyramide-kritiek — McCue Law",
    url: "https://www.mccue-law.com/andrew-tates-the-real-world-app-banned-by-google-amid-claims-its-a-pyramid-scheme/",
  },
];
