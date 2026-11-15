import Link from "next/link";
import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import { privacy, profile } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy — Aditi Agarwal",
  description: "What this portfolio collects, the cookies it sets, and how to have your data deleted.",
  alternates: { canonical: "/privacy", types: { "text/markdown": "/privacy/md" } },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="detail">
        <div className="wrap">
          <div>
            <Link href="/" className="detail-back" data-hover>
              <span className="arw">←</span> Home
            </Link>
          </div>
          <header className="detail-head">
            <div className="detail-eyebrow">Last updated {privacy.updated}</div>
            <h1 className="detail-title">Privacy</h1>
          </header>
          <div className="cs">
            {privacy.sections.map((s) => (
              <section className="cs-section" key={s.heading}>
                <h2 className="cs-heading">{s.heading}</h2>
                <div className="cs-body">
                  {s.body.map((b) => (
                    <p key={b}>{b}</p>
                  ))}
                </div>
              </section>
            ))}
            <section className="cs-section">
              <h2 className="cs-heading">Contact</h2>
              <div className="cs-body">
                <p>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Contact />
    </>
  );
}
