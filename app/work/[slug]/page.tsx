import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — Aditi Agarwal`,
    description: p.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const heroFile = p.hero ?? p.cover;
  const heroSrc = p.dir && heroFile ? `/projects/${p.dir}/${heroFile}` : null;
  const hasGallery = Boolean(p.dir && p.gallery && p.gallery.length > 0);

  return (
    <main className="detail" style={{ ["--accent" as string]: `var(--${p.accent})` }}>
      <div className="wrap">
        <Reveal>
          <Link href="/#work" className="detail-back" data-hover>
            <span className="arw">←</span> All work
          </Link>
        </Reveal>

        <header className="detail-head">
          <Reveal>
            <div className="detail-eyebrow">
              {p.role} <i /> {p.timeline} <i /> {p.year}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="detail-title">{p.title}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="detail-sub">{p.subtitle}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="detail-tags">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </Reveal>
        </header>

        <Reveal delay={0.1}>
          {heroSrc ? (
            <figure className="detail-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroSrc} alt={`${p.title} — hero`} />
            </figure>
          ) : (
            <div className="detail-hero detail-hero--empty">
              <span className="detail-hero-mark">{p.template ? "+" : p.title.charAt(0)}</span>
            </div>
          )}
        </Reveal>

        <div className="detail-cols">
          <Reveal className="detail-overview">
            {p.overview.map((par, i) => (
              <p key={i}>{par}</p>
            ))}
          </Reveal>

          <Reveal className="detail-side" delay={0.08}>
            <div className="side-block">
              <h4>What I did</h4>
              <ul className="side-list">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

            {p.tools && (
              <div className="side-block">
                <h4>Tools</h4>
                <div className="side-chips">
                  {p.tools.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {p.metrics && (
              <div className="side-block">
                <h4>At a glance</h4>
                <div className="side-metrics">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="v">{m.value}</div>
                      <div className="l">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {p.link && (
              <a className="side-link" href={p.link} target="_blank" rel="noopener noreferrer" data-hover>
                View on Behance <span>↗</span>
              </a>
            )}
          </Reveal>
        </div>

        {hasGallery ? (
          <>
            <div className="detail-galhead">
              <h2 className="detail-galtitle">Screens</h2>
              <span className="detail-galcount">{p.gallery!.length} frames</span>
            </div>

            <div className={`gallery ${p.layout ?? "web"}`}>
              {p.gallery!.map((f, i) => (
                <Reveal key={f} delay={(i % 3) * 0.06} as="div">
                  <figure className="shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/projects/${p.dir}/${f}`} alt={`${p.title} screen ${i + 1}`} loading="lazy" />
                  </figure>
                </Reveal>
              ))}
            </div>

            <p className="detail-note">
              This is a visual walkthrough — a full written case study is on the way.
            </p>
          </>
        ) : (
          <p className="detail-note">
            {p.template
              ? "This is a template — add screenshots and copy to bring it to life."
              : "Screens and a full written case study are on the way — reach out for a walkthrough in the meantime."}
          </p>
        )}

        <Link href={`/work/${next.slug}`} className="detail-next" data-hover>
          <span className="lbl">Next project</span>
          <span className="nm">
            {next.title} <span className="arw">→</span>
          </span>
        </Link>

        <Link href="/#contact" className="detail-cta" data-hover>
          Like what you see? Let’s talk <span className="circle">↗</span>
        </Link>
      </div>
    </main>
  );
}
