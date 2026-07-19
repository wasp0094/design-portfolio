"use client";

import { useEffect } from "react";
import { animate, useMotionValue } from "motion/react";

/** Blended dot + ring cursor that grows over interactive elements. */
export default function Cursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.body.classList.add("cursor-ready");
    const dot = document.getElementById("cursor-dot")!;
    const ring = document.getElementById("cursor-ring")!;

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      animate(ringX, e.clientX, { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const });
      animate(ringY, e.clientY, { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const });
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-hover]")) document.body.classList.add("cursor-hover");
    };
    const out = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-hover]")) document.body.classList.remove("cursor-hover");
    };

    const unsubDX = dotX.on("change", (v) => (dot.style.left = v + "px"));
    const unsubDY = dotY.on("change", (v) => (dot.style.top = v + "px"));
    const unsubRX = ringX.on("change", (v) => (ring.style.left = v + "px"));
    const unsubRY = ringY.on("change", (v) => (ring.style.top = v + "px"));

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      document.body.classList.remove("cursor-ready", "cursor-hover");
      unsubDX(); unsubDY(); unsubRX(); unsubRY();
    };
  }, [dotX, dotY, ringX, ringY]);

  return (
    <>
      <div id="cursor-ring" className="cursor-ring" aria-hidden />
      <div id="cursor-dot" className="cursor-dot" aria-hidden />
    </>
  );
}
