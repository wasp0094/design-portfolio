"use client";

import { motion } from "motion/react";
import { branding, profile } from "@/lib/site";

/** Shown when there is no artwork in public/branding/ yet, and revealed
 *  again if a file 404s — the logo sits above it on z-index. */
function initials(client: string) {
  return client
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

export default function Branding() {
  if (branding.length === 0) return null;

  const dribbble = profile.socials.find((s) => s.label === "Dribbble")?.href;

  return (
    <section className="section is-continued" id="branding">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker">Identity</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              Logos &amp; <em>marks</em>
            </h2>
          </div>
          {dribbble && (
            <a className="pill brand-more" href={dribbble} target="_blank" rel="noopener noreferrer">
              More on Dribbble <span aria-hidden>↗</span>
            </a>
          )}
        </div>

        <div className="brand-grid">
          {branding.map((w, i) => (
            <motion.a
              key={w.slug}
              className={`brand-card${w.placeholder ? " is-placeholder" : ""}`}
              data-accent={w.accent}
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.2, 0.7, 0.2, 1] as const }}
              whileHover={{ x: -4, y: -4 }}
            >
              <div className="brand-stage">
                <span className="brand-mark" aria-hidden>
                  {initials(w.client)}
                </span>
                {w.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="brand-logo"
                    src={`/branding/${w.image}`}
                    alt={`${w.client} logo`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                {w.placeholder && <span className="bk-placeholder">Stand-in</span>}
              </div>

              <div className="brand-info">
                <span className="brand-meta">
                  {w.sector ?? "Identity"} · {w.year}
                </span>
                <h3 className="brand-name">{w.client}</h3>
                {w.note && <p className="brand-note">{w.note}</p>}
                <div className="brand-foot">
                  <span className="brand-src">Dribbble</span>
                  <span className="brand-go" aria-hidden>
                    ↗
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
