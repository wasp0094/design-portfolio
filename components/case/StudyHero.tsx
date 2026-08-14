import type { StudyHero as Hero } from "@/lib/data";

/** Composed product hero: the wide screen sits on a tinted stage, the phone
 *  is lifted over its right edge. Heights are driven by the images, so no
 *  aspect ratio is hard-coded and swapping a screen can't break the layout. */
export default function StudyHero({
  hero,
  dir,
  title,
}: {
  hero: Hero;
  dir?: string;
  title: string;
}) {
  const src = (file: string) => (file.startsWith("/") ? file : `/projects/${dir}/${file}`);
  const solo = !hero.web || !hero.app;

  return (
    <figure
      className={`study-hero${solo ? " is-solo" : ""}`}
      aria-label={hero.alt ?? `${title} — product overview`}
    >
      {hero.web && (
        <div className="study-hero-web">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src(hero.web)} alt={`${title} — web dashboard`} />
          {hero.webLabel && <span className="study-hero-tag">{hero.webLabel}</span>}
        </div>
      )}

      {hero.app && (
        <div className="study-hero-app">
          <div className="study-hero-device">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src(hero.app)} alt={`${title} — patient mobile app`} />
          </div>
          {hero.appLabel && <span className="study-hero-tag">{hero.appLabel}</span>}
        </div>
      )}
    </figure>
  );
}
