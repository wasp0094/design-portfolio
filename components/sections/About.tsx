"use client";

import Link from "next/link";
import Reveal from "../ui/Reveal";
import { capabilities, profile, toolkit, type Capability } from "@/lib/site";

const ICONS: Record<Capability["id"], React.ReactNode> = {
  product: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  engineering: <path d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5M13.5 5l-3 14" />,
  visual: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M9.5 9.5v10" />
    </>
  ),
  brand: <path d="M12 3.5l2.3 5.4 5.7.5-4.3 3.8 1.3 5.7L12 15.9l-5 3 1.3-5.7L4 9.4l5.7-.5z" />,
};

function CapCard({ c }: { c: Capability }) {
  return (
    <article
      className={`cap${c.primary ? " is-primary" : ""}`}
      style={{ ["--accent" as string]: `var(--${c.accent})` }}
    >
      <header className="cap-head">
        <span className="cap-icon" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {ICONS[c.id]}
          </svg>
        </span>
        <h3 className="cap-title">{c.title}</h3>
        {c.primary && <span className="tag tag-dark">Primary</span>}
      </header>

      <p className="cap-blurb">{c.blurb}</p>

      <ul className="cap-skills">
        {c.skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div className="cap-work">
        <span>See it in</span>
        {c.work.map((w) => (
          <Link key={w.slug} href={`/work/${w.slug}`}>
            {w.label} <span aria-hidden>→</span>
          </Link>
        ))}
      </div>
    </article>
  );
}

export default function About() {
  return (
    <section className="section section-paper" id="about">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow"><b>02</b> About</span>
            <h2 className="section-title">One designer, the whole way through</h2>
          </div>
        </div>

        <div className="about-intro">
          <Reveal>
            <p className="about-lead">
              I’m a product designer who’s just as comfortable in{" "}
              <span className="mark mark-yellow">founder chaos</span> as in a tidy{" "}
              <span className="mark mark-violet">design system</span>, turning ambiguous
              briefs into interfaces that actually ship.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="about-text">
              <p>
                Over 2+ years I’ve taken B2B and healthtech products from research
                through high-fidelity UI: building a cybersecurity platform’s first
                design system from scratch, and independently expanding a
                physiotherapy app into a full two-sided product.
              </p>
              <p>
                I like working directly with founders, PMs, and engineers, and I care
                about the small, high-frequency moments most people scroll past.
              </p>
              <a className="btn" href={profile.resume} target="_blank" rel="noopener noreferrer">
                Download resume <span aria-hidden>↓</span>
              </a>
            </div>
          </Reveal>
        </div>

        <h3 className="sub-title">What I can do</h3>
        <div className="cap-grid">
          {capabilities.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 0.08} className="cap-cell">
              <CapCard c={c} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <dl className="toolkit">
            {toolkit.map((g) => (
              <div key={g.title}>
                <dt>{g.title}</dt>
                <dd>
                  {g.items.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
