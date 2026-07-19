"use client";

import Reveal from "../ui/Reveal";
import { recognition } from "@/lib/data";

export default function Recognition() {
  return (
    <section className="section" id="recognition">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker">Recognition</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              Awards &amp; <em>credentials</em>
            </h2>
          </div>
        </div>

        <div className="recog-grid">
          <div className="recog-col">
            <Reveal>
              <div className="recog-card tint-lime" data-hover>
                <h4>Awards</h4>
                <ul className="recog-list" style={{ ["--accent" as string]: "var(--coral)" }}>
                  {recognition.awards.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="recog-card tint-violet" data-hover>
                <h4>Mentorship</h4>
                <p className="mentor-txt">{recognition.mentorship}</p>
              </div>
            </Reveal>
          </div>

          <div className="recog-col">
            <Reveal delay={0.06}>
              <div className="recog-card tint-blue" data-hover>
                <h4>Certifications</h4>
                <ul className="recog-list" style={{ ["--accent" as string]: "var(--blue)" }}>
                  {recognition.certifications.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="recog-card tint-pink" data-hover>
                <h4>Education</h4>
                <div className="edu-degree">{recognition.education.degree}</div>
                <div className="edu-school">{recognition.education.school}</div>
                <div className="edu-detail">{recognition.education.detail}</div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
