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

export const budgetTiers = [
  "< €2k",
  "€2k to €5k",
  "€5k to €10k",
  "€10k+",
  "Not sure yet",
] as const;

export type ProjectType = (typeof projectTypes)[number];
export type BudgetTier = (typeof budgetTiers)[number];
