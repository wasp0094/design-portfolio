"use client";

import { motion } from "motion/react";
import { lab, LAB_KINDS, type LabEntry } from "@/lib/site";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** The host is the strongest "this leaves the site" signal there is,
 *  and it costs one line. Malformed URLs just fall back to nothing. */
function host(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function Body({ e }: { e: LabEntry }) {
  const kind = LAB_KINDS[e.kind];
  return (
    <>
      <span className="lab-kind">{kind.label}</span>
      <h3 className="lab-title">{e.title}</h3>
      <p className="lab-blurb">{e.blurb}</p>
      <div className="lab-foot">
        <span className="lab-host">{host(e.href) || e.year}</span>
        {e.placeholder ? (
          <span className="lab-soon">Not live yet</span>
        ) : (
          <span className="lab-live">
            Live{" "}
            <span className="circle" aria-hidden>
              ↗
            </span>
          </span>
        )}
      </div>
    </>
  );
}

export default function Lab() {
  if (lab.length === 0) return null;

  const live = lab.filter((e) => !e.placeholder).length;

  return (
    <section className="section is-continued" id="lab">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker">The lab</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              Small things I <em>ship</em>
            </h2>
          </div>
          {live > 0 && <span className="pill">{live} live</span>}
        </div>

        <div className="lab-grid">
          {lab.map((e, i) => {
            const accent = LAB_KINDS[e.kind].accent;
            const anim = {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "0px 0px -12% 0px" } as const,
              transition: { duration: 0.7, delay: (i % 3) * 0.08, ease: EASE },
            };

            // A placeholder is not a link and not interactive, so it is
            // neither an <a> nor carries data-hover.
            if (e.placeholder) {
              return (
                <motion.article key={e.title} className="lab-card is-placeholder" data-accent={accent} {...anim}>
                  <Body e={e} />
                </motion.article>
              );
            }

            return (
              <motion.a
                key={e.title}
                className="lab-card"
                data-accent={accent}
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                {...anim}
                whileHover={{ x: -4, y: -4 }}
              >
                <Body e={e} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
