export const site = {
  name: "Studio SMITE",
  shortName: "SMITE",
  tagline: "We Build Digital Dominance",
  description:
    "Studio SMITE builds fast, good-looking websites for small businesses. Made from scratch, easy to find on Google, and looked after all year. Founded by Chiel Smets.",
  url: "https://studio-smite.dev",
  email: "hello@studio-smite.dev",
  location: "Belgium, working worldwide",
  founder: {
    name: "Chiel Smets",
    age: 23,
    role: "Founder & Lead Developer",
  },
} as const;

export const navItems = [
  { href: "/", label: "Home", index: "01" },
  { href: "/info", label: "Info", index: "02" },
  { href: "/contact", label: "Contact", index: "03" },
] as const;

export const projectTypes = [
  "A new website for my business",
  "A refresh of the website I have",
  "A webshop",
  "A single page for a campaign",
  "An online tool or booking system",
  "Not sure yet",
] as const;

/**
 * The two yearly aftercare options. Quoted on the home page, in the contact
 * form and in the terminal, so the prices only ever change in one place.
 */
export const plans = [
  {
    id: "care",
    name: "Care package",
    price: "€375",
    period: "per year",
    standardPrice: "€650",
    note: null,
    summary: "Hosting, updates and repairs, plus 30% off the website build.",
    // The two lines every comparison on the site is built from.
    upfront: "30% off the website build",
    yearly: "€375 per year",
  },
  {
    id: "hosting",
    name: "Hosting only",
    price: "from €100",
    period: "per year",
    standardPrice: null,
    note: "The exact price depends on your domain name.",
    summary:
      "Your website stays online. Repairs and changes are charged separately.",
    upfront: "Full price for the website build",
    yearly: "from €100 per year",
  },
] as const;

/** Pay the care package up front for five years and the build costs nothing. */
export const prepayOffer = {
  years: 5,
  total: "€1,875",
  headline: "Pay 5 years up front and the website build is free.",
} as const;

/**
 * Shown on the contact form when someone picks hosting only, because then the
 * build is the whole job and its budget decides what is realistic.
 */
export const buildBudgets = [
  "Under €1,500",
  "€1,500 to €3,000",
  "€3,000 to €5,000",
  "€5,000 or more",
  "I would rather discuss it",
] as const;

export type PlanId = (typeof plans)[number]["id"];
export type ProjectType = (typeof projectTypes)[number];
export type BuildBudget = (typeof buildBudgets)[number];
