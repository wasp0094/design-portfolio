"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import Magnetic from "../ui/Magnetic";
import { profile } from "@/lib/data";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Recognition", href: "/#recognition" },
  { label: "Resume", href: profile.resume, download: true },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [prev, setPrev] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > prev && y > 260);
    setPrev(y);
  });

  return (
    <motion.nav
      className="nav"
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] as const }}
    >
      <div className="wrap">
      <div className="nav-inner">
        <a href="/#top" className="nav-brand">
          <img className="nav-logo" src="/aditi-avatar.png" alt="Aditi Agarwal" width={30} height={30} />
          Aditi
        </a>
        <div className="nav-links">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hide-sm"
              {...(l.download ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {l.label}
            </a>
          ))}
          <Magnetic strength={0.3}>
            <a href="/#contact" className="nav-cta">
              Let’s talk
            </a>
          </Magnetic>
        </div>
      </div>
      </div>
    </motion.nav>
  );
}
