import Link from "next/link";
import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import { OtherGrid } from "@/components/sections/ProjectRows";
import { workOrder } from "@/lib/site";
import { workCards } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page not found — Aditi Agarwal",
};

export default function NotFound() {
  const cards = workOrder.map((s) => workCards.find((c) => c.slug === s)).filter((c) => c !== undefined);

  return (
    <>
      <main className="detail">
        <div className="wrap">
          <header className="detail-head">
            <div className="detail-eyebrow">404</div>
            <h1 className="detail-title">Page not found</h1>
            <p className="detail-sub">This page doesn’t exist or has moved.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" href="/">
                Back home
              </Link>
              <Link className="btn btn-lg" href="/#work">
                See the work <span aria-hidden>↓</span>
              </Link>
            </div>
          </header>
        </div>

        <section className="more">
          <div className="wrap work-head">
            <h2 className="section-title">Case studies</h2>
          </div>
          <OtherGrid cards={cards} />
        </section>
      </main>
      <Contact />
    </>
  );
}
