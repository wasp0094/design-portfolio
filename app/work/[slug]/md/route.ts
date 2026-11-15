import { projects } from "@/lib/data";
import { projectMarkdown } from "@/lib/markdown";
import { SITE } from "@/app/sitemap";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => !p.template).map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug)!;
  return new Response(projectMarkdown(p), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${SITE}/work/${slug}>; rel="canonical"`,
    },
  });
}
