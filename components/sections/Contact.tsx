"use client";

import Reveal from "../ui/Reveal";
import Magnetic from "../ui/Magnetic";
import { profile } from "@/lib/site";

export default function Contact() {
  const year = 2026;
  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <span className="kicker contact-kicker">Let’s build something</span>
        <Reveal>
          <h2 className="contact-title">
            <a href={`mailto:${profile.email}`}>Say hello</a>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Magnetic strength={0.25}>
            <a className="contact-mail" href={`mailto:${profile.email}`} data-hover>
              {profile.email}
              <span className="go">↗</span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.16}>
          <a className="resume-btn footer-resume" href={profile.resume} target="_blank" rel="noopener noreferrer" data-hover>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3v12" /><path d="M7 11l5 5 5-5" /><path d="M4 19h16" />
            </svg>
            Download resume
          </a>
        </Reveal>

        <div className="contact-socials">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              className="social-btn"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
            >
              {s.label} <span className="at">@{s.handle}</span>
            </a>
          ))}
          <a className="social-btn" href={`tel:${profile.phone.replace(/\s/g, "")}`} data-hover>
            {profile.phone}
          </a>
        </div>

        <div className="footer-bar">
          <span>© {year} {profile.name}</span>
          <span>Designed &amp; built with care · {profile.location}</span>
          <span>Bricolage Grotesque · Archivo · JetBrains Mono</span>
        </div>
      </div>
    </footer>
  );
}
