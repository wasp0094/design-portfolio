"use client";

import { motion } from "motion/react";
import Reveal from "../ui/Reveal";
import { recognition } from "@/lib/site";

const r = recognition;

export default function Recognition() {
  return (
    <section className="section section-paper" id="recognition">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow"><b>04</b> Recognition</span>
            <h2 className="section-title">Awards and credentials</h2>
          </div>
        </div>

        <div className="award-grid">
          {r.highlights.map((a, i) => (
            <motion.article
              key={a.event}
              className="award"
              style={{ ["--accent" as string]: `var(--${a.accent})` }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] as const }}
            >
              <div className="award-top">
                <span className="tag">{a.scope}</span>
                {a.year && <span className="award-year">{a.year}</span>}
              </div>
              <span className="award-rank">{a.rank}</span>
              <span className="award-event">{a.event}</span>
            </motion.article>
          ))}
        </div>

        <Reveal>
          <p className="recog-also">
            Also placed:{" "}
            {r.alsoPlaced.map((a, i) => (
              <span key={a}>
                <b>{a}</b>
                {i < r.alsoPlaced.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </Reveal>

        <div className="cred-grid">
          <Reveal className="cred">
            <h3 className="cred-h">Education</h3>
            <div className="cred-main">{r.education.degree}</div>
            <div className="cred-sub">{r.education.school}</div>
            <div className="cred-meta">
              <b>{r.education.cgpa}</b> CGPA · {r.education.years}
            </div>
          </Reveal>

          <Reveal className="cred" delay={0.06}>
            <h3 className="cred-h">Certifications</h3>
            <div className="cred-main">
              {r.certifications.featured.name}{" "}
              <span className="cred-by">by {r.certifications.featured.by}</span>
            </div>
            <ul className="cred-list">
              {r.certifications.others.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="cred" delay={0.12}>
            <h3 className="cred-h">Mentoring and judging</h3>
            <div className="cred-main">
              {r.mentorship.num} students taught{" "}
              <span className="cred-by">with {r.mentorship.org}</span>
            </div>
            <p className="cred-text">{r.mentorship.text}</p>
            <div className="cred-main cred-second">
              {r.judging.title} <span className="cred-by">{r.judging.year}</span>
            </div>
            <p className="cred-text">
              {r.judging.org}. {r.judging.text}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
