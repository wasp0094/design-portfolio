"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/lib/site";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Recognition", href: "/#recognition" },
];

/** Sticky bar that slides away while scrolling down and returns on the first
 *  scroll up. Below 860px the links fold into a menu rather than disappearing. */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // ignore jitter; never hide near the top of the page
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className={`nav${hidden && !open ? " is-hidden" : ""}`} aria-label="Primary">
      <div className="wrap">
        <div className={`nav-inner${open ? " is-open" : ""}`}>
          <Link href="/#top" className="nav-brand" onClick={close}>
            <img className="nav-logo" src="/aditi-avatar.png" alt="" width={32} height={32} />
            Aditi Agarwal
          </Link>

          <div className="nav-links" id="nav-links">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={close}>
                {l.label}
              </Link>
            ))}
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" onClick={close}>
              Resume <span aria-hidden>↗</span>
            </a>
          </div>

          <Link href="/#contact" className="btn btn-primary nav-cta" onClick={close}>
            Let’s talk
          </Link>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
