import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

export const SITE = "https://designwithaditi.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE },
    ...projects.filter((p) => !p.template).map((p) => ({ url: `${SITE}/work/${p.slug}` })),
  ];
}
