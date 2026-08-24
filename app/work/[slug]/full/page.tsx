import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Gallery from "@/components/ui/Gallery";
import StudyHead from "@/components/case/StudyHead";
import StudyHero from "@/components/case/StudyHero";
import StudyBody from "@/components/case/StudyBody";
import Unlock from "@/components/case/Unlock";
import { relock } from "@/app/actions/unlock";
import { hasAccess } from "@/lib/gate";
import { projects } from "@/lib/data";

/* The gated long version of a case study. Reads a cookie, so it always
   renders per-request — never prerendered, never cached. The `more` blocks
   and the screen gallery are only serialised once access checks out. */

/* GATE DISABLED — nothing is password-gated any more, so this route has no
   extra content to show; anyone holding an old /full link lands on the full
   public study instead. Set this to false and uncomment `gated` in lib/data.ts
   to bring the password back. (Typed `boolean`, not the literal, so the code
   below stays reachable for the type checker.) */
const GATE_DISABLED: boolean = true;

export const metadata: Metadata = {
  title: "Protected case study — Aditi Agarwal",
  // an NDA'd page has no business in an index
  robots: { index: false, follow: false },
};

export default async function FullStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (GATE_DISABLED) redirect(`/work/${slug}`);
  if (!p?.study?.gated) notFound();

  const unlocked = await hasAccess(slug);
  const study = p.study;

  if (!unlocked) {
    return (
      <main className="detail" style={{ ["--accent" as string]: `var(--${p.accent})` }}>
        <div className="wrap">
          <Link href={`/work/${slug}`} className="detail-back" data-hover>
            <span className="arw">←</span> Back to the short version
          </Link>
          <Unlock slug={slug} title={p.title} />
        </div>
      </main>
    );
  }

  const hasGallery = Boolean(p.dir && p.gallery && p.gallery.length > 0);

  return (
    <main className="detail" style={{ ["--accent" as string]: `var(--${p.accent})` }}>
      <div className="wrap">
        <Reveal>
          <Link href={`/work/${slug}`} className="detail-back" data-hover>
            <span className="arw">←</span> Short version
          </Link>
        </Reveal>

        <header className="detail-head">
          <Reveal>
            <div className="detail-eyebrow">
              {p.role} <i /> {p.timeline} <i /> {p.year}
            </div>
            <span className="detail-pro is-unlocked">Confidential · unlocked</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="detail-title">{p.title}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="detail-sub">{p.subtitle}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="detail-tags">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </Reveal>
        </header>

        <Reveal delay={0.1}>
          {study.hero && <StudyHero hero={study.hero} dir={p.dir} title={p.title} />}
        </Reveal>

        <StudyHead study={study} />
        <StudyBody study={study} dir={p.dir} detailed />

        {hasGallery && (
          <>
            <div className="detail-galhead">
              <h2 className="detail-galtitle">Every screen</h2>
              <span className="detail-galcount">{p.gallery!.length} frames</span>
            </div>
            <Gallery
              cols={p.layout === "mobile" ? 3 : 2}
              items={p.gallery!.map((f) => ({
                src: f.startsWith("/") ? f : `/projects/${p.dir}/${f}`,
                caption: undefined,
              }))}
            />
          </>
        )}

        <form className="gate-relock" action={relock}>
          <input type="hidden" name="slug" value={slug} />
          <button type="submit" data-hover>
            Lock this again on this device
          </button>
        </form>

        <Link href="/#contact" className="detail-cta" data-hover>
          Like what you see? Let’s talk <span className="circle">↗</span>
        </Link>
      </div>
    </main>
  );
}
