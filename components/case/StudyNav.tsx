"use client";

import { motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef } from "react";

/** Reading progress for a case study: a thin bar across the top of the
 *  window that fills as the body scrolls past. */
export default function StudyNav({ bodyId }: { bodyId: string }) {
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);
  const body = useRef<HTMLElement | null>(null);

  const update = () => {
    const el = body.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const scrollable = r.height - window.innerHeight;
    progress.set(scrollable > 0 ? Math.min(1, Math.max(0, -r.top / scrollable)) : 0);
  };

  useEffect(() => {
    body.current = document.getElementById(bodyId);
    update();
  }, [bodyId]); // eslint-disable-line react-hooks/exhaustive-deps

  useMotionValueEvent(scrollY, "change", update);

  return (
    <div className="study-progress" aria-hidden="true">
      <motion.div className="study-progress-fill" style={{ scaleX: progress }} />
    </div>
  );
}
