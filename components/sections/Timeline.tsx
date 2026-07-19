"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { timeline } from "@/lib/data";

/** Horizontal career timeline — scroll left→right; the spine fills with scroll. */
export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = scrollRef.current;
    const fill = fillRef.current;
    if (!el || !fill) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    fill.style.transform = `scaleX(${Math.max(0.02, p)})`;
  };

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
          <span className="tl-hint">
            Scroll <span className="arw">→</span>
          </span>
        </div>
      </div>

      <div className="tl-scroll" ref={scrollRef} onScroll={onScroll}>
        <div className="tl-track">
          <div className="tl-line" aria-hidden>
            <div className="tl-fill" ref={fillRef} />
          </div>

          {timeline.map((m, i) => (
            <motion.div
              key={i}
              className={`tl-item${m.placeholder ? " is-placeholder" : ""}`}
              style={{ ["--accent" as string]: `var(--${m.accent})` }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.2, 0.7, 0.2, 1] as const }}
            >
              <span className="tl-dot" />
              <span className="tl-conn" />
              <div className="tl-card">
                {m.image && (
                  <div className="tl-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/timeline/${m.image}`} alt={`${m.title} — ${m.org ?? ""}`} loading="lazy" />
                  </div>
                )}
                <div className="tl-card-body">
                  <div className="tl-top">
                    <span className="tl-year">{m.year}</span>
                    <span className="tl-tag">{m.type}</span>
                  </div>
                  <h3 className="tl-title">{m.title}</h3>
                  {m.org && <div className="tl-org">{m.org}</div>}
                  <p className="tl-desc">{m.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
