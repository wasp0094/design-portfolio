"use client";

import Reveal from "../ui/Reveal";
import { capabilities } from "@/lib/data";

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
