"use client";

import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";

type Item = { src: string; caption?: string };

/** Masonry gallery (never crops) + a fullscreen lightbox with keyboard / arrow nav. */
export default function Gallery({ items, cols, bento = false }: { items: Item[]; cols: number; bento?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) => setOpen((cur) => (cur === null ? cur : (cur + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  return (
    <>
      <div className={`gallery${bento ? " bento" : ""}`} style={{ ["--cols" as string]: cols }}>
        {items.map((it, i) => (
          <Shot key={it.src} it={it} i={i} onOpen={() => setOpen(i)} />
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button className="lb-close" onClick={close} aria-label="Close">✕</button>
            {items.length > 1 && (
              <>
                <button
                  className="lb-nav prev"
                  onClick={(e) => { e.stopPropagation(); go(-1); }}
                  aria-label="Previous image"
                >‹</button>
                <button
                  className="lb-nav next"
                  onClick={(e) => { e.stopPropagation(); go(1); }}
                  aria-label="Next image"
                >›</button>
              </>
            )}
            <motion.figure
              className="lb-figure"
              key={open}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={items[open].src} alt={items[open].caption ?? ""} />
              <figcaption>
                <span>{items[open].caption ?? ""}</span>
                <span className="lb-count">{open + 1} / {items.length}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Shot({ it, i, onOpen }: { it: Item; i: number; onOpen: () => void }) {
  const [orient, setOrient] = useState("");

  return (
    <motion.figure
      className={`shot ${orient}`}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
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
      <span className="shot-zoom" aria-hidden>⤢</span>
      {it.caption && <figcaption>{it.caption}</figcaption>}
    </motion.figure>
  );
}
