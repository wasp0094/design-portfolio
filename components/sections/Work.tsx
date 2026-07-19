"use client";

import { motion } from "motion/react";
import { projects, type Project } from "@/lib/data";

type Size = "lg" | "md" | "wide";

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.7, delay: (i % 3) * 0.08, ease: [0.2, 0.7, 0.2, 1] as const },
  whileHover: { x: -4, y: -4 },
});

function Tile({ p, size, i }: { p: Project; size: Size; i: number }) {
  const big = size === "lg";

  const media = (
    <div className="tile-media">
      {p.image && <img className="tile-img" src={p.image} alt={`${p.title} — ${p.subtitle}`} />}
      <div className="tile-tags">
        {p.tags.slice(0, big ? 2 : 1).map((t) => (
          <span className="tile-tag" key={t}>{t}</span>
        ))}
      </div>
      {!p.image && <span className="tile-mark">{p.title.charAt(0)}</span>}
      <span className="tile-year">{p.year}</span>
    </div>
  );

  const info = (
    <div className="tile-info">
      <div className="tile-role">
        {p.role} <span className="sep" /> {p.timeline}
      </div>
      <h3 className="tile-name">{p.title}</h3>
      <div className="tile-sub">{p.subtitle}</div>

      {big && <p className="tile-summary">{p.summary}</p>}

      {big && p.metrics && (
        <div className="tile-metrics">
          {p.metrics.map((m) => (
            <div key={m.label}>
              <div className="v">{m.value}</div>
              <div className="l">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {big && (
        <div className="tile-chiprow">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}

      <div className="tile-cta">
        {p.link ? "View case study" : "In progress"}
        <span className="circle">↗</span>
      </div>
    </div>
  );

  const common = {
    className: `tile ${size}`,
    "data-accent": p.accent,
    "data-hover": true as const,
    ...reveal(i),
  };

  return p.link ? (
    <motion.a {...common} href={p.link} target="_blank" rel="noopener noreferrer">
      {media}
      {info}
    </motion.a>
  ) : (
    <motion.article {...common}>
      {media}
      {info}
    </motion.article>
  );
}

const sizeFor = (i: number): Size => (i === 0 ? "lg" : i <= 2 ? "md" : "wide");

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker">Selected work</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              Things I’ve <em>shipped</em>
            </h2>
          </div>
          <span className="pill">{projects.length} projects</span>
        </div>

        <div className="bento">
          {projects.map((p, i) => (
            <Tile key={p.slug} p={p} size={sizeFor(i)} i={i} />
          ))}

          <motion.a
            className="tile invite"
            href="#contact"
            data-hover
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const }}
            whileHover={{ x: -4, y: -4 }}
          >
            <span className="eyebrow">Have a project in mind?</span>
            <h3>Let’s design something people love to use.</h3>
            <span className="go">
              Start a conversation
              <span className="circle">↗</span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
