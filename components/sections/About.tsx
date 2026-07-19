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
              <div className="cap-row">
                <h4>Design</h4>
                <div className="chips">
                  {capabilities.design.map((c) => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>
              <div className="cap-row">
                <h4>Tools</h4>
                <div className="chips">
                  {capabilities.tools.map((c) => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>
              <div className="cap-row">
                <h4>Frontend</h4>
                <div className="chips">
                  {capabilities.frontend.map((c) => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
