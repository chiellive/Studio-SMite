export const site = {
  name: "Studio SMITE",
  shortName: "SMITE",
  tagline: "Websites die jouw naam groter maken",
  description:
    "Studio SMITE bouwt snelle, mooie websites voor kleine bedrijven. Volledig op maat gemaakt, makkelijk vindbaar op Google, en het hele jaar door onderhouden. Opgericht door Chiel Smets.",
  url: "https://studiosmite.com",
  // Tijdelijk het persoonlijke adres, tot er een eigen studio-adres is.
  // Eén keer hier wijzigen past het overal aan: voettekst, contactpagina,
  // de juridische pagina's en elke mailto-link.
  email: "chielsmets1@gmail.com",
  location: "België, wereldwijd actief",
  founder: {
    name: "Chiel Smets",
    age: 23,
    role: "Student-zelfstandige uit België",
  },
} as const;

/**
 * Wettelijk verplichte ondernemingsgegevens.
 *
 * De inschrijving bij het ondernemingsloket is nog niet rond, dus adres,
 * ondernemingsnummer en btw-nummer staan op null. De footer en de juridische
 * pagina's tonen die regels dan gewoon niet en vallen terug op `pendingNote`.
 * Vul ze hier in zodra ze bekend zijn en ze verschijnen overal tegelijk.
 */
type LegalInfo = {
  tradeName: string;
  legalName: string;
  status: string;
  address: string | null;
  companyNumber: string | null;
  vatNumber: string | null;
  vatNote: string;
  pendingNote: string;
  jurisdiction: string | null;
};

export const legal: LegalInfo = {
  tradeName: "Studio SMITE",
  legalName: "Chiel Smets",
  status: "student-zelfstandige",
  address: null,
  companyNumber: null,
  vatNumber: null,
  vatNote:
    "BTW niet toepasselijk, vrijstellingsregeling kleine onderneming (art. 56bis Wbtw).",
  pendingNote:
    "De inschrijving bij het ondernemingsloket loopt. Het ondernemingsnummer en de btw-gegevens komen hier zodra ze toegekend zijn.",
  jurisdiction: null,
};

/**
 * Toegangssleutel van Web3Forms, de dienst die het contactformulier bezorgt.
 *
 * Deze sleutel hoort publiek te zijn: hij wordt vanuit de browser van de
 * bezoeker meegestuurd en staat dus sowieso in de JavaScript van de site. Hij
 * geeft alleen het recht om een bericht naar het ingestelde adres te sturen,
 * niet om iets te lezen. Beperk misbruik in het dashboard van Web3Forms door
 * het domein vast te zetten.
 */
export const web3formsKey = "d54fef3a-fc38-49ad-af2b-ec64d919ac43";

export const navItems = [
  { href: "/", label: "Home", index: "01" },
  { href: "/info", label: "Info", index: "02" },
  { href: "/contact", label: "Contact", index: "03" },
] as const;

export const legalPages = [
  { href: "/privacybeleid", label: "Privacyverklaring" },
  { href: "/cookiebeleid", label: "Cookiebeleid" },
  { href: "/algemene-voorwaarden", label: "Algemene voorwaarden" },
] as const;

export const projectTypes = [
  "Een nieuwe website voor mijn bedrijf",
  "Een opfrisbeurt van mijn huidige website",
  "Een webshop",
  "Eén pagina voor een campagne",
  "Een online tool of boekingssysteem",
  "Weet ik nog niet",
] as const;

/** Korting op de websitebouw die bij het zorgpakket hoort. Staat hier zodat het
 * percentage maar op één plek te wijzigen valt. */
export const careBuildDiscount = "40%";

export const plans = [
  {
    id: "care",
    name: "Zorgpakket",
    price: "€300",
    period: "per jaar",
    standardPrice: "€500",
    note: null,
    summary: `Hosting, updates en herstellingen, plus ${careBuildDiscount} korting op de bouw.`,
    // Wat de bouw kost bij deze keuze. De jaarlijkse kant van de vergelijking
    // wordt samengesteld uit price en period, zodat die nooit kan afwijken.
    upfront: `${careBuildDiscount} korting op de websitebouw`,
  },
  {
    id: "hosting",
    name: "Enkel hosting",
    price: "vanaf €150",
    period: "per jaar",
    standardPrice: null,
    note: "De exacte prijs hangt af van je domeinnaam.",
    summary:
      "Je website blijft online. Herstellingen en aanpassingen worden apart gefactureerd.",
    upfront: "Volle prijs voor de websitebouw",
  },
] as const;

/**
 * Verschijnt op het contactformulier zodra iemand voor enkel hosting kiest,
 * want dan is de bouw de hele opdracht en bepaalt dat budget wat haalbaar is.
 */
export const buildBudgets = [
  "Minder dan €1.500",
  "€1.500 tot €3.000",
  "€3.000 tot €5.000",
  "€5.000 of meer",
  "Bespreek ik liever",
] as const;

export type PlanId = (typeof plans)[number]["id"];
export type ProjectType = (typeof projectTypes)[number];
export type BuildBudget = (typeof buildBudgets)[number];
