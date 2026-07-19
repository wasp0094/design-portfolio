"use client";

import { motion, useInView } from "motion/react";
import { useRef, ReactNode, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "li" | "span";
};

/** Scroll-triggered reveal with stagger-friendly delay. */
export default function Reveal({ children, delay = 0, y = 34, className, style, as = "div" }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const M = motion[as];

  return (
    <M
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.7, 0.2, 1] as const }}
    >
      {children}
    </M>
  );
}
