"use client";

import { motion } from "motion/react";
import { useState } from "react";

type Item = { src: string; caption?: string };

/** Masonry gallery that never crops — wide images span full width,
 *  tall/portrait images flow in columns. Orientation is detected on load. */
export default function Gallery({ items, cols }: { items: Item[]; cols: number }) {
  return (
    <div className="gallery" style={{ ["--cols" as string]: cols }}>
      {items.map((it, i) => (
        <Shot key={it.src} it={it} i={i} />
      ))}
    </div>
  );
}

function Shot({ it, i }: { it: Item; i: number }) {
  const [orient, setOrient] = useState("");

  return (
    <motion.figure
      className={`shot ${orient}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.05, ease: [0.2, 0.7, 0.2, 1] as const }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={it.src}
        alt={it.caption ?? ""}
        loading="lazy"
        onLoad={(e) => {
          const im = e.currentTarget;
          const r = im.naturalWidth / im.naturalHeight;
          setOrient(r > 1.5 ? "wide" : r < 0.8 ? "tall" : "square");
        }}
      />
      {it.caption && <figcaption>{it.caption}</figcaption>}
    </motion.figure>
  );
}
