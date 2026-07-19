"use client";

import { motion } from "motion/react";
import Reveal from "../ui/Reveal";
import { recognition } from "@/lib/data";

const r = recognition;

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

        {/* --- top awards, big & colourful --- */}
        <div className="recog-highlights">
          {r.highlights.map((a, i) => (
            <motion.article
              key={a.event}
              className="award-card"
              data-accent={a.accent}
              data-hover
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] as const }}
              whileHover={{ x: -4, y: -4 }}
            >
              {a.year && <span className="award-year">{a.year}</span>}
              <span className="award-scope">{a.scope}</span>
              <span className="award-rank">{a.rank}</span>
              <span className="award-event">{a.event}</span>
            </motion.article>
          ))}
        </div>

        <Reveal>
          <p className="recog-also">
            Also placed at{" "}
            {r.alsoPlaced.map((a, i) => (
              <span key={a}>
                <b>{a}</b>
                {i < r.alsoPlaced.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </Reveal>

        {/* --- credentials, clear headers + priority --- */}
        <div className="recog-detail">
          <Reveal className="recog-col" style={{ ["--accent" as string]: "var(--blue)" }}>
            <div>
              <h3 className="recog-h">Certifications</h3>
              <div className="cert-featured">
                <span className="star">★</span>
                <span className="n">{r.certifications.featured.name}</span>
                <span className="by">— {r.certifications.featured.by}</span>
              </div>
              <ul className="cert-list">
                {r.certifications.others.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="recog-col" delay={0.08}>
            <div style={{ ["--accent" as string]: "var(--coral)" }}>
              <h3 className="recog-h">Education</h3>
              <div className="edu-degree">{r.education.degree}</div>
              <div className="edu-school">{r.education.school}</div>
              <div className="edu-meta">
                <span className="edu-cgpa">{r.education.cgpa}</span>
                <span className="edu-years">CGPA · {r.education.years}</span>
              </div>
            </div>

            <div style={{ ["--accent" as string]: "var(--violet)" }}>
              <h3 className="recog-h">Mentorship</h3>
              <div className="mentor-stat">
                <span className="mentor-num">{r.mentorship.num}</span>
                <span className="mentor-org">students taught · {r.mentorship.org}</span>
              </div>
              <p className="mentor-text">{r.mentorship.text}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
