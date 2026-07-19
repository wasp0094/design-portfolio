"use client";

import Reveal from "../ui/Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section className="section" id="experience" style={{ paddingTop: "clamp(30px,4vw,60px)" }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker">Where I’ve worked</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              On the <em>team</em>
            </h2>
          </div>
        </div>

        {experience.map((e) => (
          <Reveal key={e.company}>
            <div className="exp-card">
              <div className="exp-head">
                <div>
                  <h3>{e.company}</h3>
                  <div className="ctx">{e.context}</div>
                  <span className="titles">{e.titles}</span>
                </div>
                <div className="period">{e.period}</div>
              </div>
              <div className="exp-points">
                {e.points.map((pt, i) => (
                  <div className="exp-point" key={i}>
                    <span className="idx">0{i + 1}</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
