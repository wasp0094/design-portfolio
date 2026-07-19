"use client";

import { motion } from "motion/react";
import { recognition } from "@/lib/data";

const cell = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.7, delay: i * 0.07, ease: [0.2, 0.7, 0.2, 1] as const },
  whileHover: { x: -3, y: -3 },
});

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

        <div className="recog-bento">
          <motion.div className="recog-card span-2x2 tint-lime" data-hover {...cell(0)}>
            <h4>Awards</h4>
            <ul className="recog-list" style={{ ["--accent" as string]: "var(--coral)" }}>
              {recognition.awards.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="recog-card span-2 tint-blue" data-hover {...cell(1)}>
            <h4>Certifications</h4>
            <ul className="recog-list" style={{ ["--accent" as string]: "var(--blue)" }}>
              {recognition.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="recog-card span-2 tint-violet" data-hover {...cell(2)}>
            <h4>Mentorship</h4>
            <p className="mentor-txt">{recognition.mentorship}</p>
          </motion.div>

          <motion.div className="recog-card span-4 tint-pink" data-hover {...cell(3)}>
            <h4>Education</h4>
            <div className="edu-inner">
              <span className="edu-degree">{recognition.education.degree}</span>
              <span className="edu-school">{recognition.education.school}</span>
              <span className="edu-detail">{recognition.education.detail}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
