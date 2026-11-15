import Image from "next/image";
import { capabilities, profile } from "@/lib/site";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-hello rise" style={{ ["--d" as string]: "0.05s" }}>
            Hi, I’m Aditi, a designer in {profile.location.split(",")[0]}
          </p>

          <h1 className="hero-title rise" style={{ ["--d" as string]: "0.12s" }}>
            I research, <span className="mark mark-yellow">design</span> and{" "}
            <span className="mark mark-violet">build</span> digital products.
          </h1>

          <p className="hero-sub rise" style={{ ["--d" as string]: "0.2s" }}>
            {profile.intro}
          </p>

          <div className="hero-actions rise" style={{ ["--d" as string]: "0.28s" }}>
            <a className="btn btn-primary btn-lg" href="#work">
              See my work <span aria-hidden>↓</span>
            </a>
            <a className="btn btn-lg" href={profile.resume} target="_blank" rel="noopener noreferrer">
              Resume <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div className="hero-art rise" style={{ ["--d" as string]: "0.2s" }}>
          <div className="hero-portrait">
            <Image className="hero-portrait-illustration" src="/aditi-avatar.png" alt="Portrait of Aditi Agarwal" fill unoptimized loading="eager" fetchPriority="high" />
            <Image className="hero-portrait-photo" src="/aditi-photo.jpg" alt="" aria-hidden="true" fill sizes="(max-width: 900px) 90vw, 40vw" quality={75} fetchPriority="low" />
          </div>

          {/* the four disciplines, pinned around the portrait */}
          {capabilities.map((c) => (
            <a
              key={c.id}
              href="#about"
              className={`hero-chip hero-chip-${c.id}`}
              style={{ ["--accent" as string]: `var(--${c.accent})` }}
            >
              {c.title}
            </a>
          ))}

          {profile.available && (
            <span className="hero-available">
              <i aria-hidden /> Available for work
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
