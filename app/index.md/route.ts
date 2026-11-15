import { siteMarkdown } from "@/lib/markdown";
import { markdownHeaders } from "@/lib/md404";
import { SITE } from "@/app/sitemap";

export const dynamic = "force-static";

export function GET() {
  return new Response(siteMarkdown(), {
    headers: { ...markdownHeaders, Link: `<${SITE}>; rel="canonical"` },
  });
}
