import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Gallery from "@/components/ui/Gallery";
import { projects, BRAND } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** turn a filename into a readable caption: "programme-builder-step1.png" → "Programme builder step 1" */
function prettify(file: string): string {
  return file
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/-/g, " ")
    .replace(/(\d+)/g, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
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
            {p.professional && <span className="detail-pro">Professional experience</span>}
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
          {p.heroGrid && p.dir ? (
            <div className="detail-hero-bento" aria-label={`${p.title} interface highlights`}>
              {p.heroGrid.map((file, i) => (
                <figure className={`detail-hero-bento-item item-${i + 1}`} key={file}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/projects/${p.dir}/${file}`} alt={`${p.title} — ${prettify(file)}`} />
                </figure>
              ))}
            </div>
          ) : BRAND[p.slug] ? (
            <figure
              className={`detail-hero logo-hero${BRAND[p.slug].dark ? " on-dark" : ""}`}
              style={{ background: BRAND[p.slug].bg }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="hero-logo" src={`/logos/${BRAND[p.slug].logo}`} alt={`${p.title} logo`} />
            </figure>
          ) : heroSrc ? (
            <figure className={`detail-hero${p.layout === "mobile" ? " is-mobile" : ""}`}>
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

        {p.caseStudy && (
          <div className="cs">
            {p.caseStudy.map((s, i) => (
              <Reveal key={i} as="section">
                <div className="cs-section">
                  <h2 className="cs-heading">
                    <span className="cs-num">{String(i + 1).padStart(2, "0")}</span>
                    {s.heading}
                  </h2>
                  <div className="cs-body">
                    {s.body.map((b, j) => (
                      <p key={j}>{b}</p>
                    ))}
                    {s.list && (
                      <ul className="cs-list">
                        {s.list.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {p.comparison && (
          <div className="cmp">
            <div className="detail-galhead">
              <h2 className="detail-galtitle">Before → after</h2>
              <span className="detail-galcount">{p.comparison.length} pages</span>
            </div>
            {p.comparison.map((c, i) => (
              <Reveal key={i} as="div">
                <div className="cmp-row">
                  <div className="cmp-label">{c.label}</div>
                  <div className="cmp-pair">
                    <figure className="cmp-item before">
                      <span className="cmp-tag">Before</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/projects/${p.dir}/${c.before}`} alt={`${c.label} — before`} loading="lazy" />
                    </figure>
                    <figure className="cmp-item after">
                      <span className="cmp-tag">After</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/projects/${p.dir}/${c.after}`} alt={`${c.label} — after`} loading="lazy" />
                    </figure>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {hasGallery ? (
          <>
            <div className="detail-galhead">
              <h2 className="detail-galtitle">{p.comparison ? "The redesign, page by page" : "Screens"}</h2>
              <span className="detail-galcount">{p.gallery!.length} frames</span>
            </div>

            <Gallery
              cols={p.layout === "mobile" ? 3 : 2}
              items={p.gallery!.map((f) => ({
                src: `/projects/${p.dir}/${f}`,
                caption: p.captions ? prettify(f) : undefined,
              }))}
            />

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
