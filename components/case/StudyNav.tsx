"use client";

import { motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { StudySection } from "@/lib/data";

type Props = { sections: StudySection[]; bodyId: string };

/* dock-style magnification: the bar nearest the pointer extends furthest,
   its neighbours taper off over FALLOFF px. */
const BAR_MIN = 26;
const BAR_MAX = 62;
const FALLOFF = 46; // ≈3 ticks either side at the current pitch

/** Contents rail. Idle it is just ticks — the active section is marked by
 *  colour alone. On hover the bars magnify toward the pointer and the
 *  nearest one names its UX step. */
export default function StudyNav({ sections, bodyId }: Props) {
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [hoverY, setHoverY] = useState<number | null>(null);

  const els = useRef<{ id: string; el: HTMLElement }[]>([]);
  const body = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const centers = useRef<number[]>([]);

  // Cache the section elements once; ids are rendered by the server component.
  useEffect(() => {
    body.current = document.getElementById(bodyId);
    els.current = sections
      .map((s) => ({ id: s.id, el: document.getElementById(s.id) as HTMLElement }))
      .filter((x) => x.el);
  }, [sections, bodyId]);

  // vertical centre of each tick, relative to the list
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const top = list.getBoundingClientRect().top;
    centers.current = Array.from(list.querySelectorAll("li")).map((li) => {
      const r = li.getBoundingClientRect();
      return r.top + r.height / 2 - top;
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, sections]);

  const update = () => {
    const list = els.current;
    if (!list.length) return;

    // active = the last section whose top has passed the reading line
    const line = window.innerHeight * 0.35;
    let current = list[0].id;
    for (const { id, el } of list) {
      if (el.getBoundingClientRect().top <= line) current = id;
    }
    setActive((prev) => (prev === current ? prev : current));

    const el = body.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      progress.set(scrollable > 0 ? Math.min(1, Math.max(0, -r.top / scrollable)) : 0);
    }
  };

  useMotionValueEvent(scrollY, "change", update);
  useEffect(update, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (sections.length < 2) return null;

  /** the rail names the UX step, not the long descriptive heading */
  const label = (s: StudySection) => s.kicker ?? s.heading;

  const dists = centers.current.map((c) =>
    hoverY == null ? Number.POSITIVE_INFINITY : Math.abs(c - hoverY),
  );
  const nearest =
    hoverY == null || !dists.length ? -1 : dists.indexOf(Math.min(...dists));

  const barWidth = (i: number) => {
    const d = dists[i];
    if (d == null || !Number.isFinite(d)) return BAR_MIN;
    const t = Math.max(0, 1 - d / FALLOFF);
    const eased = t * t * (3 - 2 * t); // smoothstep
    return BAR_MIN + (BAR_MAX - BAR_MIN) * eased;
  };

  return (
    <>
      <div className="study-progress" aria-hidden="true">
        <motion.div className="study-progress-fill" style={{ scaleX: progress }} />
      </div>

      <nav className="study-toc" aria-label="Case study contents">
        <h2 className="study-toc-title">Contents</h2>
        <ol
          ref={listRef}
          onPointerMove={(e) => {
            const list = listRef.current;
            if (!list) return;
            if (!centers.current.length) measure();
            setHoverY(e.clientY - list.getBoundingClientRect().top);
          }}
          onPointerLeave={() => setHoverY(null)}
        >
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`study-toc-link${active === s.id ? " is-active" : ""}`}
                data-hover
              >
                <span
                  className="bar"
                  aria-hidden="true"
                  style={{ width: `${barWidth(i)}px` }}
                />
                <span className={`t${nearest === i ? " is-shown" : ""}`}>{label(s)}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <details className="study-toc-mobile">
        <summary data-hover>
          Contents
          <span className="cur">{label(sections.find((s) => s.id === active) ?? sections[0])}</span>
        </summary>
        <ol>
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`study-toc-link${active === s.id ? " is-active" : ""}`}
                data-hover
              >
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="t is-shown">{label(s)}</span>
              </a>
            </li>
          ))}
        </ol>
      </details>
    </>
  );
}
