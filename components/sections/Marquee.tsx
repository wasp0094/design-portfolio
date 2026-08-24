"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marqueeWords } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/** Infinite marquee whose speed + direction react to scroll velocity (GSAP). */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current!;
    const ctx = gsap.context(() => {
      const base = 22; // seconds per loop
      let direction = -1;

      // track holds the words twice, so -50% is one seamless loop
      const loop = gsap.to(track, {
        xPercent: -50,
        duration: base,
        ease: "none",
        repeat: -1,
      });

      const st = ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (v < 0 && direction !== 1) { direction = 1; loop.timeScale(-1); }
          else if (v > 0 && direction !== -1) { direction = -1; loop.timeScale(1); }
          const boost = gsap.utils.clamp(1, 5, 1 + Math.abs(v) / 400);
          gsap.to(loop, { timeScale: direction * boost, duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: direction * 1, duration: 0.6, delay: 0.3, overwrite: false });
        },
      });

      return () => { loop.kill(); st.kill(); };
    }, track);

    return () => ctx.revert();
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
