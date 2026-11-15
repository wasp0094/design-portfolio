import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

export const SITE = "https://designwithaditi.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, images: [`${SITE}/aditi-avatar.png`] },
    { url: `${SITE}/privacy` },
    ...projects
      .filter((p) => !p.template)
      .map((p) => ({
        url: `${SITE}/work/${p.slug}`,
        images: [...new Set([p.showcase, p.cover, p.hero, ...(p.gallery ?? [])])]
          .filter((f) => f && p.dir)
          .map((f) => (f!.startsWith("/") ? `${SITE}${f}` : `${SITE}/projects/${p.dir}/${f}`)),
      })),
  ];
}
