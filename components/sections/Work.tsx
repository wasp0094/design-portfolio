import { OtherGrid, ProjectRow } from "./ProjectRows";
import { featuredCount, workOrder } from "@/lib/site";
import type { WorkCard } from "@/lib/data";

/** Featured projects as full-bleed alternating rows, then the rest as a grid. */
export default function Work({ cards }: { cards: WorkCard[] }) {
  const bySlug = Object.fromEntries(cards.map((p) => [p.slug, p]));
  const ordered = workOrder.map((s) => bySlug[s]).filter(Boolean);
  const featured = ordered.slice(0, featuredCount);
  const others = ordered.slice(featuredCount);

  return (
    <section className="work" id="work">
      <div className="wrap work-head">
        <span className="eyebrow"><b>01</b> Selected work</span>
        <h2 className="section-title">Featured projects</h2>
      </div>

      <div className="prows">
        {featured.map((p, i) => (
          <ProjectRow key={p.slug} p={p} i={i} flip={i % 2 === 0} />
        ))}
      </div>

      {others.length > 0 && (
        <>
          <div className="wrap work-head">
            <h2 className="section-title">Other projects</h2>
          </div>
          <OtherGrid cards={others} />
        </>
      )}
    </section>
  );
}
