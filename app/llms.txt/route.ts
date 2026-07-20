import { profile, projects, capabilities, recognition } from "@/lib/data";
import { SITE } from "../sitemap";

export const dynamic = "force-static";

export function GET() {
  const work = projects.filter((p) => !p.template);
  const primarySkills = capabilities
    .flatMap((g) => g.skills.filter((s) => s.tier === "primary").map((s) => s.name))
    .join(", ");

  const lines = [
    `# ${profile.name} — ${profile.role}`,
    ``,
    `> ${profile.intro}`,
    ``,
    `${profile.name} is a ${profile.role.toLowerCase()} based in ${profile.location}, with 2+ years taking B2B and healthtech products from research to shipped, high-fidelity UI. This site is her portfolio; each project below links to a full case study.`,
    ``,
    `## Selected work`,
    ...work.map((p) => `- [${p.title}](${SITE}/work/${p.slug}): ${p.summary}`),
    ``,
    `## About`,
    `- Role: ${profile.role}`,
    `- Location: ${profile.location}`,
    `- Core skills: ${primarySkills}`,
    `- Currently: Senior/Product Designer at FourCore (breach-and-attack-simulation cybersecurity platform)`,
    ``,
    `## Recognition`,
    ...recognition.highlights.map((h) => `- ${h.rank} (${h.scope}) — ${h.event}${h.year ? ` ${h.year}` : ""}`),
    `- ${recognition.certifications.featured.name} — ${recognition.certifications.featured.by}`,
    ``,
    `## Contact`,
    `- Email: ${profile.email}`,
    ...profile.socials.map((s) => `- ${s.label}: ${s.href}`),
    ``,
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
