import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

export const SITE = "https://designwithaditi.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const work = projects
    .filter((p) => !p.template)
    .map((p) => ({
      url: `${SITE}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...work,
  ];
}
