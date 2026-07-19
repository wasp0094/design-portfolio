"use client";

import { motion } from "motion/react";
import { profile } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const line = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};
const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] as const } },
};

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-blobs" aria-hidden>
        <motion.span
          className="hero-blob b1"
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="hero-blob b2"
          animate={{ y: [0, -26, 0], x: [0, 22, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="hero-blob b3"
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="wrap hero-inner">
        <motion.div className="hero-top" variants={fade} initial="hidden" animate="show">
          <span className="badge-available">
            <span className="dot-live" /> Available for freelance &amp; full-time
          </span>
          <span className="pill">{profile.location}</span>
        </motion.div>

        <motion.h1 className="hero-title" variants={container} initial="hidden" animate="show">
          <span className="line">
            <motion.span className="word" variants={line}>
              I turn
            </motion.span>
          </span>
          <span className="line">
            <motion.span className="word" variants={line}>
              messy <span className="hl">problems</span>
            </motion.span>
          </span>
          <span className="line">
            <motion.span className="word" variants={line}>
              into interfaces
            </motion.span>
          </span>
          <span className="line">
            <motion.span className="word" variants={line}>
              people <span className="hl">use</span>
              <span className="star">✦</span>
            </motion.span>
          </span>
        </motion.h1>

        <div className="hero-foot">
          <motion.p variants={fade} initial="hidden" animate="show" transition={{ delay: 0.9 }}>
            {profile.intro}
          </motion.p>

          <motion.div
            className="hero-portrait"
            data-hover
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as const }}
            whileHover={{ rotate: -2, y: -6 }}
          >
            <div className="ph">
              <img src="/aditi-avatar.png" alt="Illustrated portrait of Aditi Agarwal" className="ph-img" />
              <span className="ph-name">Aditi Agarwal</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="scroll-cue"
          variants={fade}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.2 }}
        >
          <span className="arrow">↓</span> Scroll to explore the work
        </motion.div>
      </div>
    </header>
  );
}
