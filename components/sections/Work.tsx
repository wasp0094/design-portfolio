"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { projects, type Project } from "@/lib/data";

const MotionLink = motion.create(Link);

type Size = "big" | "tall" | "hbig" | "small" | "flat";

// bento arrangement from the layout sketch (per project index)
const LAYOUT: Size[] = ["big", "tall", "hbig", "hbig", "big", "small", "small", "flat"];
const sizeFor = (i: number): Size => LAYOUT[i] ?? "small";

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.7, delay: (i % 3) * 0.08, ease: [0.2, 0.7, 0.2, 1] as const },
  whileHover: { x: -4, y: -4 },
});

function Tile({ p, size, i }: { p: Project; size: Size; i: number }) {
  const rich = size === "big";
  const cover = p.cover && p.dir ? `/projects/${p.dir}/${p.cover}` : null;

  return (
    <MotionLink
      href={`/work/${p.slug}`}
      className={`tile ${size}${p.template ? " is-template" : ""}`}
      data-accent={p.accent}
      data-hover
      {...reveal(i)}
    >
      <div className="tile-media">
        <span className="tile-mark">{p.template ? "+" : p.title.charAt(0)}</span>
        {cover && (
          <img
            className="tile-img"
            src={cover}
            alt={`${p.title} — ${p.subtitle}`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <div className="tile-tags">
          {p.template ? (
            <span className="tile-tag">Template</span>
          ) : (
            p.tags.slice(0, rich ? 2 : 1).map((t) => (
              <span className="tile-tag" key={t}>{t}</span>
            ))
          )}
        </div>
        <span className="tile-year">{p.year}</span>
      </div>

      <div className="tile-info">
        <div className="tile-role">
          {p.role} <span className="sep" /> {p.timeline}
        </div>
        <h3 className="tile-name">{p.title}</h3>
        <div className="tile-sub">{p.subtitle}</div>

        {rich && <p className="tile-summary">{p.summary}</p>}

        {rich && p.metrics && (
          <div className="tile-metrics">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <div className="v">{m.value}</div>
                <div className="l">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {rich && (
          <div className="tile-chiprow">
            {p.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}

        <div className="tile-cta">
          {p.template ? "Add a project" : "View case study"}
          <span className="circle">↗</span>
        </div>
      </div>
    </MotionLink>
  );
}

export default function Work() {
  const real = projects.filter((p) => !p.template).length;

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
          <span className="pill">{real} projects</span>
        </div>

        <div className="bento">
          {projects.map((p, i) => (
            <Tile key={p.slug} p={p} size={sizeFor(i)} i={i} />
          ))}

          <motion.a
            className="tile flat invite"
            href="#contact"
            data-hover
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const }}
            whileHover={{ x: -4, y: -4 }}
          >
            <span className="eyebrow">Have a project in mind?</span>
            <h3>Let’s start a conversation.</h3>
            <span className="go">
              Say hello
              <span className="circle">↗</span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
