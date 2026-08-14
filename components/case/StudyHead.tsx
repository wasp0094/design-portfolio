import Reveal from "@/components/ui/Reveal";
import type { Study } from "@/lib/data";

/** Under the hero: a spec list paired with the summary, then the outcome
 *  numbers full width. Results sit high on the page deliberately — a
 *  recruiter should get the "so what" before deciding to read the process. */
export default function StudyHead({ study }: { study: Study }) {
  const { meta, glance, glanceNote } = study;
  if (!meta?.length && !glance?.length && !glanceNote) return null;

  return (
    <div className="study-head">
      {(meta?.length || glanceNote) && (
        <Reveal>
          <div className="study-brief">
            {meta && meta.length > 0 && (
              <dl className="study-meta">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {glanceNote && <p className="study-brief-note">{glanceNote}</p>}
          </div>
        </Reveal>
      )}

      {glance && glance.length > 0 && (
        <Reveal delay={0.08}>
          <div className="study-glance">
            <h2 className="study-glance-title">At a glance</h2>
            <div className="study-glance-row">
              {glance.map((g) => (
                <div className="study-glance-item" key={g.label}>
                  <div className="v">{g.value}</div>
                  <div className="l">{g.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
