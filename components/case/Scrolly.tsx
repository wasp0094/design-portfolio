"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ScrollyStep } from "@/lib/data";

/** Pinned commentary beside a scrolling stack of screens: the text column
 *  sticks while the images move past it, and the copy crossfades to whichever
 *  screen is nearest the middle of the viewport. Below 900px the pin is
 *  dropped and each screen carries its own caption inline instead. */
export default function Scrolly({ steps, dir }: { steps: ScrollyStep[]; dir?: string }) {
  const { scrollY } = useScroll();
  const [active, setActive] = useState(0);
  const shots = useRef<(HTMLElement | null)[]>([]);

  const update = () => {
    const mid = window.innerHeight / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    shots.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive((prev) => (prev === best ? prev : best));
  };

  useMotionValueEvent(scrollY, "change", update);
  useEffect(update, []); // eslint-disable-line react-hooks/exhaustive-deps

  const src = (f: string) => (f.startsWith("/") ? f : `/projects/${dir}/${f}`);
  const count = String(steps.length).padStart(2, "0");

  return (
    <div className="bk-scrolly">
      <div className="bk-scrolly-text">
        <div className="bk-scrolly-stack">
          {steps.map((s, i) => (
            <div
              key={s.src}
              className={`bk-scrolly-panel${i === active ? " is-active" : ""}`}
              aria-hidden={i !== active}
            >
              <span className="n">
                {String(i + 1).padStart(2, "0")} / {count}
              </span>
              <h4>{s.title}</h4>
              {s.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="bk-scrolly-media">
        {steps.map((s, i) => (
          <figure
            key={s.src}
            className={`bk-scrolly-shot${i === active ? " is-active" : ""}`}
            ref={(el) => {
              shots.current[i] = el;
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src(s.src)} alt={s.title} loading="lazy" />
            {/* the pinned column is hidden on narrow screens, so each shot
                carries its own copy there instead */}
            <figcaption className="bk-scrolly-inline">
              <h4>{s.title}</h4>
              {s.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
