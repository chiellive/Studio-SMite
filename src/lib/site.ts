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
    price: "€475",
    period: "per year",
    standardPrice: "€650",
    note: null,
    summary: "Hosting, updates and repairs, all looked after for you.",
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
  },
] as const;

export type PlanId = (typeof plans)[number]["id"];
export type ProjectType = (typeof projectTypes)[number];
