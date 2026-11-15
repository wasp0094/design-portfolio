import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import type { WorkCard } from "@/lib/data";

const TAG_TINTS = ["violet", "pink", "yellow", "teal"];

const cover = (p: WorkCard) => (p.cover && p.dir ? `/projects/${p.dir}/${p.cover}` : null);

/** One project as a full-bleed half-and-half row: the cover fills one side
 *  edge to edge, the pitch sits on the other. `flip` puts the cover on the
 *  right, so a stack of rows alternates. */
export function ProjectRow({ p, i, flip }: { p: WorkCard; i: number; flip: boolean }) {
  const src = cover(p);

  return (
    <Link
      href={`/work/${p.slug}`}
      className={`prow${flip ? " is-flip" : ""}`}
      style={{ ["--accent" as string]: `var(--${p.accent})` }}
    >
      <div className="prow-media">
        {src && <Image src={src} alt={`${p.title}: ${p.subtitle}`} width={1600} height={1200} sizes="(max-width: 900px) 100vw, 50vw" quality={90} />}
      </div>

      <div className="prow-body">
        <Reveal className="prow-inner" y={24} duration={0.6}>
          <div className="prow-tags">
            {p.tags.slice(0, 2).map((t, k) => (
              <span
                className="tag tag-pop"
                key={t}
                style={{ ["--tint" as string]: `var(--${TAG_TINTS[(i * 2 + k) % TAG_TINTS.length]})` }}
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="prow-title">
            {p.title}
            <span>{p.subtitle}</span>
          </h3>
          <p className="prow-sub">{p.summary}</p>
          <span className="prow-cta">
            See full case study <span className="arw" aria-hidden>→</span>
          </span>
        </Reveal>
      </div>
    </Link>
  );
}

/** The remaining projects as a tight three-up grid of covers. */
export function OtherGrid({ cards }: { cards: WorkCard[] }) {
  return (
    <div className="other-grid">
      {cards.map((p) => {
        const src = cover(p);
        return (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="ocard"
            style={{ ["--accent" as string]: `var(--${p.accent})` }}
          >
            <div className="ocard-media">{src && <Image src={src} alt={`${p.title}: ${p.subtitle}`} width={1600} height={1200} sizes="(max-width: 760px) 100vw, 33vw" quality={90} />}</div>
            <div className="ocard-body">
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>
              <span className="arw" aria-hidden>→</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
