"use client";

import Reveal from "../ui/Reveal";
import { capabilities, profile } from "@/lib/data";

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M4 19h16" />
    </svg>
  );
}

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <span className="kicker">About</span>
        <div className="about-grid" style={{ marginTop: 28 }}>
          <div>
            <Reveal>
              <p className="about-lead">
                I’m a product designer who’s just as comfortable in{" "}
                <span className="mk">founder chaos</span> as in a tidy{" "}
                <span className="mk">design system</span> — turning ambiguous
                briefs into interfaces that actually ship.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="about-text">
                Over 2+ years I’ve taken B2B and healthtech products from research
                through high-fidelity UI — building a cybersecurity platform’s first
                design system from scratch, and independently expanding a
                physiotherapy app into a full two-sided product.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="about-text">
                I like working directly with founders, PMs, and engineers, and I care
                about the small, high-frequency moments most people scroll past.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <a className="resume-btn" href={profile.resume} target="_blank" rel="noopener noreferrer" data-hover>
                <DownloadIcon /> Resume
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="cap-block" data-hover>
              {capabilities.map((group) => (
                <div
                  className="cap-row"
                  key={group.title}
                  style={{ ["--accent" as string]: `var(--${group.accent})` }}
                >
                  <h4>
                    {group.title}
                    {group.title === "Design" && (
                      <span className="cap-hint">★ core strengths</span>
                    )}
                  </h4>
                  <div className="chips">
                    {group.skills.map((s) => (
                      <span
                        className={`chip${s.tier ? " " + s.tier : ""}`}
                        key={s.name}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
