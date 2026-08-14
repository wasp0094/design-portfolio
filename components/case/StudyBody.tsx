import Reveal from "@/components/ui/Reveal";
import Block from "./Blocks";
import StudyNav from "./StudyNav";
import type { Study } from "@/lib/data";

const BODY_ID = "study-body";

/** Contents rail + the numbered sections. Each section is an ordered list
 *  of blocks, so screens and reasoning interleave instead of prose-then-gallery. */
export default function StudyBody({ study, dir }: { study: Study; dir?: string }) {
  const sections = study.sections;
  if (!sections.length) return null;

  return (
    <div className="study">
      <StudyNav sections={sections} bodyId={BODY_ID} />

      <div className="study-body" id={BODY_ID}>
        {sections.map((s, i) => (
          <section className="study-section" id={s.id} key={s.id}>
            <Reveal>
              <header className="study-section-head">
                <div className="study-section-meta">
                  <span className="study-section-num">{String(i + 1).padStart(2, "0")}</span>
                  {s.kicker && <span className="study-section-kicker">{s.kicker}</span>}
                </div>
                <h2 className="study-section-title">{s.heading}</h2>
              </header>
            </Reveal>

            <div className="study-blocks">
              {s.blocks.map((b, j) => (
                <Reveal key={j} delay={Math.min(j, 2) * 0.05}>
                  <Block block={b} dir={dir} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
