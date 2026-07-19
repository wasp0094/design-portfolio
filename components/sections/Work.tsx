"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Reveal from "../ui/Reveal";
import { projects, type Project } from "@/lib/data";

function ProjectCard({ p }: { p: Project }) {
  // subtle 3D tilt toward cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  const inner = (
    <article
      className="project"
      data-accent={p.accent}
      data-hover
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <motion.div
        className="project-grid"
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      >
        <div className="project-visual">
          <div className="ribbon">
            {p.tags.slice(0, 2).map((t) => (
              <span className="float-tag" key={t}>{t}</span>
            ))}
          </div>
          <span className="mark">{p.title.charAt(0)}</span>
          <span className="yearbig">{p.year}</span>
        </div>

        <div className="project-body">
          <div className="project-role">
            {p.role} <span className="sep" /> {p.timeline}
          </div>
          <h3 className="project-name">{p.title}</h3>
          <div className="project-sub">{p.subtitle}</div>
          <p className="project-summary">{p.summary}</p>

          {p.metrics && (
            <div className="project-metrics">
              {p.metrics.map((m) => (
                <div className="m" key={m.label}>
                  <div className="v">{m.value}</div>
                  <div className="l">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="project-tags">
            {p.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <div className="project-cta">
            {p.link ? "View case study" : "Case study in progress"}
            <span className="circle">↗</span>
          </div>
        </div>
      </motion.div>
    </article>
  );

  return (
    <Reveal>
      {p.link ? (
        <a href={p.link} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        inner
      )}
    </Reveal>
  );
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker">Selected work</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              Things I’ve <em>shipped</em>
            </h2>
          </div>
          <span className="pill">{projects.length} projects</span>
        </div>

        <div className="work-list">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
