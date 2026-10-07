import Link from "next/link";
import Reveal from "../ui/Reveal";
import { experience } from "@/lib/site";

/** A plain, scannable list of roles, newest first. */
export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow"><b>03</b> Experience</span>
            <h2 className="section-title">Where I’ve worked</h2>
          </div>
        </div>

        <Reveal>
          <ol className="xp">
            {experience.map((x) => (
              <li className="xp-row" key={`${x.org}-${x.role}`}>
                <div className="xp-when">
                  <span className="xp-period">{x.period}</span>
                  <span className={`tag${x.current ? " tag-now" : ""}`}>{x.current ? "Current" : x.kind}</span>
                </div>

                <div className="xp-what">
                  <h3 className="xp-role">
                    {x.role} <span className="xp-org">at {x.org}</span>
                  </h3>
                  <p className="xp-desc">{x.description}</p>
                </div>

                {x.slug ? (
                  <Link className="xp-link" href={`/work/${x.slug}`}>
                    Case study <span aria-hidden>→</span>
                  </Link>
                ) : (
                  <span />
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
