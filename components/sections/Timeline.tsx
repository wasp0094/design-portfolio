"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { timeline } from "@/lib/site";

/** Vertical timeline — the spine fills as you scroll through the section. */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker">The journey</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              Growth <em>ladder</em>
            </h2>
          </div>
          <span className="pill">{timeline.length} milestones</span>
        </div>

        <div className="vtl" ref={ref}>
          <div className="vtl-spine">
            <motion.div className="vtl-fill" style={{ scaleY }} />
          </div>

          {timeline.map((m, i) => (
            <motion.div
              key={i}
              className={`vtl-item${m.placeholder ? " is-placeholder" : ""}`}
              style={{ ["--accent" as string]: `var(--${m.accent})` }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const }}
            >
              <span className="vtl-dot" />
              <div className="vtl-card">
                <div className="tl-top">
                  <span className="tl-year">{m.year}</span>
                  <span className="tl-tag">{m.type}</span>
                </div>
                <h3 className="tl-title">{m.title}</h3>
                {m.org && <div className="tl-org">{m.org}</div>}
                <p className="tl-desc">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
