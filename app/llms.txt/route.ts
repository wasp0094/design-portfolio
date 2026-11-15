import { siteMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";

export function GET() {
  return new Response(siteMarkdown(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
