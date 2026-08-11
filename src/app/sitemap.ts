import type { MetadataRoute } from "next";

import { legalPages, navItems, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...navItems.map((item) => ({
      url: new URL(item.href, site.url).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: item.href === "/" ? 1 : 0.8,
    })),
    ...legalPages.map((page) => ({
      url: new URL(page.href, site.url).toString(),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
