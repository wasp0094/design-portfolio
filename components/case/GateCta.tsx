import Link from "next/link";

/** Public-page footer card: says plainly what sits behind the password and
 *  how to ask for it, rather than dead-ending the reader. */
export default function GateCta({
  slug,
  teaser,
  includes,
  unlocked,
}: {
  slug: string;
  teaser: string;
  includes: string[];
  unlocked?: boolean;
}) {
  return (
    <aside className="gate-cta">
      <div className="gate-cta-head">
        <span className="gate-cta-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
            <path d={unlocked ? "M8 10.5V7a4 4 0 0 1 7.9-.8" : "M8 10.5V7a4 4 0 0 1 8 0v3.5"} />
          </svg>
        </span>
        <div>
          <h2 className="gate-cta-title">The detailed version</h2>
          <p className="gate-cta-note">{teaser}</p>
        </div>
      </div>

      <ul className="gate-cta-list">
        {includes.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>

      <Link className="gate-cta-btn" href={`/work/${slug}/full`} data-hover>
        {unlocked ? "Open the detailed version" : "Unlock with password"}
        <span className="arw">→</span>
      </Link>
    </aside>
  );
}
