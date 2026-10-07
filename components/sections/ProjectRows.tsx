"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { WorkCard } from "@/lib/data";

const TAG_TINTS = ["violet", "pink", "yellow", "teal"];

const cover = (p: WorkCard) => (p.cover && p.dir ? `/projects/${p.dir}/${p.cover}` : null);

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const },
};

/** One project as a full-bleed half-and-half row: the cover fills one side
 *  edge to edge, the pitch sits on the other. `flip` puts the cover on the
 *  right, so a stack of rows alternates. */
export function ProjectRow({ p, i, flip }: { p: WorkCard; i: number; flip: boolean }) {
  const src = cover(p);

  return (
    <Link
      href={`/work/${p.slug}`}
      className={`prow${flip ? " is-flip" : ""}`}
      style={{ ["--accent" as string]: `var(--${p.accent})` }}
    >
      <div className="prow-media">
        {src && <img src={src} alt={`${p.title}: ${p.subtitle}`} loading={i === 0 ? "eager" : "lazy"} />}
      </div>

      <div className="prow-body">
        <motion.div className="prow-inner" {...reveal}>
          <div className="prow-tags">
            {p.tags.slice(0, 2).map((t, k) => (
              <span
                className="tag tag-pop"
                key={t}
                style={{ ["--tint" as string]: `var(--${TAG_TINTS[(i * 2 + k) % TAG_TINTS.length]})` }}
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="prow-title">
            {p.title}
            <span>{p.subtitle}</span>
          </h3>
          <p className="prow-sub">{p.summary}</p>
          <span className="prow-cta">
            See full case study <span className="arw" aria-hidden>→</span>
          </span>
        </motion.div>
      </div>
    </Link>
  );
}

/** The remaining projects as a tight three-up grid of covers. */
export function OtherGrid({ cards }: { cards: WorkCard[] }) {
  return (
    <div className="other-grid">
      {cards.map((p) => {
        const src = cover(p);
        return (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="ocard"
            style={{ ["--accent" as string]: `var(--${p.accent})` }}
          >
            <div className="ocard-media">{src && <img src={src} alt="" loading="lazy" />}</div>
            <div className="ocard-body">
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>
              <span className="arw" aria-hidden>→</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
