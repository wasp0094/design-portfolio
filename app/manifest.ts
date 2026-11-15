import type { MetadataRoute } from "next";
import { profile } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.name,
    description: profile.intro,
    start_url: "/",
    display: "browser",
    background_color: "#f8f4ee",
    theme_color: "#f8f4ee",
    icons: [
      { src: "/icon.png", sizes: "460x460", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
