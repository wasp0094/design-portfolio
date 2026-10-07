"use client";

import { motion } from "motion/react";
import { capabilities, profile } from "@/lib/site";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] as const },
});

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.p className="hero-hello" {...rise(0.05)}>
            Hi, I’m Aditi, a designer in {profile.location.split(",")[0]}
          </motion.p>

          <motion.h1 className="hero-title" {...rise(0.12)}>
            I research, <span className="mark mark-yellow">design</span> and{" "}
            <span className="mark mark-violet">build</span> digital products.
          </motion.h1>

          <motion.p className="hero-sub" {...rise(0.2)}>
            {profile.intro}
          </motion.p>

          <motion.div className="hero-actions" {...rise(0.28)}>
            <a className="btn btn-primary btn-lg" href="#work">
              See my work <span aria-hidden>↓</span>
            </a>
            <a className="btn btn-lg" href={profile.resume} target="_blank" rel="noopener noreferrer">
              Resume <span aria-hidden>↗</span>
            </a>
          </motion.div>
        </div>

        <motion.div className="hero-art" {...rise(0.2)}>
          <div className="hero-portrait">
            <img className="hero-portrait-illustration" src="/aditi-avatar.png" alt="Portrait of Aditi Agarwal" />
            <img className="hero-portrait-photo" src="/aditi-photo.jpg" alt="" aria-hidden="true" />
          </div>

          {/* the four disciplines, pinned around the portrait */}
          {capabilities.map((c) => (
            <a
              key={c.id}
              href="#about"
              className={`hero-chip hero-chip-${c.id}`}
              style={{ ["--accent" as string]: `var(--${c.accent})` }}
            >
              {c.title}
            </a>
          ))}

          {profile.available && (
            <span className="hero-available">
              <i aria-hidden /> Available for work
            </span>
          )}
        </motion.div>
      </div>
    </header>
  );
}
