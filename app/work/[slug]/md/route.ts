import { projects } from "@/lib/data";
import { projectMarkdown } from "@/lib/markdown";
import { markdown404, markdownHeaders } from "@/lib/md404";
import { SITE } from "@/app/sitemap";

export function generateStaticParams() {
  return projects.filter((p) => !p.template).map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug && !x.template);
  if (!p) return markdown404(`/work/${slug}`);
  return new Response(projectMarkdown(p), {
    headers: { ...markdownHeaders, Link: `<${SITE}/work/${slug}>; rel="canonical"` },
  });
}
