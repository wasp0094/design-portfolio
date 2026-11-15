"use client";

import { useEffect, useRef } from "react";
import { marqueeWords } from "@/lib/site";

/** Infinite CSS marquee whose speed + direction react to scroll velocity. */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = trackRef.current?.getAnimations()[0];
    if (!anim) return;
    let direction = 1, rate = 1, target = 1, lastY = scrollY, lastT = performance.now();
    let raf = 0, settle = 0;

    const tick = () => {
      rate += (target - rate) * 0.12;
      anim.playbackRate = rate;
      raf = Math.abs(target - rate) > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      const now = performance.now();
      const v = ((scrollY - lastY) / Math.max(now - lastT, 1)) * 1000;
      lastY = scrollY;
      lastT = now;
      if (v) direction = v > 0 ? 1 : -1;
      target = direction * Math.min(5, 1 + Math.abs(v) / 400);
      clearTimeout(settle);
      settle = window.setTimeout(() => {
        target = direction;
        if (!raf) raf = requestAnimationFrame(tick);
      }, 300);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, []);

  const items = [...marqueeWords, ...marqueeWords];

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track" ref={trackRef}>
        {items.map((w, i) => (
          <span className="marquee-item" key={i}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
