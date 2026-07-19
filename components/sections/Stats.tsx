"use client";

import Reveal from "../ui/Reveal";
import CountUp from "../ui/CountUp";
import { stats } from "@/lib/data";

export default function Stats() {
  return (
    <section className="section" style={{ paddingBottom: "clamp(30px,4vw,60px)" }}>
      <div className="wrap">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="stat-card" data-hover>
                <div className="stat-num">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
