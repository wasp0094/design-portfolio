import Reveal from "@/components/ui/Reveal";
import Block from "./Blocks";
import StudyNav from "./StudyNav";
import type { Study, StudySection } from "@/lib/data";

const BODY_ID = "study-body";

/** Blocks to render for a section: the public telling, plus the gated detail
 *  when the reader has earned it. */
function blocksFor(s: StudySection, detailed: boolean) {
  return detailed && s.more?.length ? [...s.blocks, ...s.more] : s.blocks;
}

/** Sections worth rendering. On the public page a section that is entirely
 *  `more` would render as a bare heading, so it's dropped instead. */
export function visibleSections(study: Study, detailed: boolean) {
  return study.sections.filter((s) => blocksFor(s, detailed).length > 0);
}

/** Contents rail + the numbered sections. Each section is an ordered list
 *  of blocks, so screens and reasoning interleave instead of prose-then-gallery. */
export default function StudyBody({
  study,
  dir,
  detailed = false,
}: {
  study: Study;
  dir?: string;
  detailed?: boolean;
}) {
  const sections = visibleSections(study, detailed);
  if (!sections.length) return null;

  return (
    <div className="study">
      <StudyNav
        sections={sections.map((s) => ({ id: s.id, kicker: s.kicker, heading: s.heading }))}
        bodyId={BODY_ID}
      />

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
              {blocksFor(s, detailed).map((b, j) => (
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
