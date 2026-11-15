"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "li" | "span" | "article";
};

/** Scroll-triggered reveal with stagger-friendly delay. */
export default function Reveal({ children, delay = 0, y = 34, duration = 0.75, className, style, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const Tag = as as ElementType;

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...style, ["--d" as string]: `${delay}s`, ["--y" as string]: `${y}px`, ["--dur" as string]: `${duration}s` }}
    >
      {children}
    </Tag>
  );
}
