"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { projects, BRAND, type Project } from "@/lib/data";

const MotionLink = motion.create(Link);

type Size = "big" | "tall" | "hbig" | "small" | "flat" | "wide";

// exact placement from the layout sketch
const ORDER: { slug: string; size: Size }[] = [
  { slug: "formi", size: "big" },
  { slug: "formi-app", size: "tall" },
  { slug: "fourcore", size: "hbig" },
  { slug: "autumn", size: "hbig" },
  { slug: "fourcore-platform", size: "big" },
  { slug: "conqr", size: "wide" },
];
const INVITE_AFTER = 4; // insert the "start a conversation" tile after FourCore platform

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.7, delay: (i % 3) * 0.08, ease: [0.2, 0.7, 0.2, 1] as const },
  whileHover: { x: -4, y: -4 },
});

function Tile({ p, size, i }: { p: Project; size: Size; i: number }) {
  const rich = size === "big" || size === "wide";
  const brand = BRAND[p.slug];
  const cover = p.cover && p.dir ? `/projects/${p.dir}/${p.cover}` : null;

  return (
    <MotionLink
      href={`/work/${p.slug}`}
      className={`tile ${size}`}
      data-project={p.slug}
      data-accent={p.accent}
      data-hover
      {...reveal(i)}
    >
      <div
        className={`tile-media${brand ? " logo-media" : ""}${brand?.dark ? " on-dark" : ""}`}
        style={brand ? { background: brand.bg } : undefined}
      >
        {brand ? (
          <img className="tile-logo" src={`/logos/${brand.logo}`} alt={`${p.title} logo`} />
        ) : (
          <>
            <span className="tile-mark">{p.title.charAt(0)}</span>
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
          </>
        )}
        <div className="tile-tags">
          {p.tags.slice(0, rich ? 2 : 1).map((t) => (
            <span className="tile-tag" key={t}>{t}</span>
          ))}
        </div>
        {p.professional && <span className="tile-pro">Professional</span>}
        <span className="tile-year">{p.year}</span>
      </div>

      <div className="tile-info">
        <div className="tile-role">
          <span>{p.role}</span> <span className="sep" /> <span>{p.timeline}</span>
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
          View case study
          <span className="circle">↗</span>
        </div>
      </div>
    </MotionLink>
  );
}

function InviteTile() {
  return (
    <motion.a
      /* `tall` (2 cols x 2 rows) so it fills the space beside the `big`
         FourCore tile — with six projects a `small` would leave a hole */
      className="tile tall invite"
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
        Say hello <span className="circle">↗</span>
      </span>
    </motion.a>
  );
}

export default function Work() {
  const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
  const tiles: React.ReactNode[] = [];
  ORDER.forEach((o, idx) => {
    const p = bySlug[o.slug];
    if (p) tiles.push(<Tile key={p.slug} p={p} size={o.size} i={idx} />);
    if (idx === INVITE_AFTER) tiles.push(<InviteTile key="invite" />);
  });

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
          <span className="pill">{ORDER.length} projects</span>
        </div>

        <div className="bento">{tiles}</div>
      </div>
    </section>
  );
}
