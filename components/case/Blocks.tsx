import type { Block } from "@/lib/data";
import Scrolly from "./Scrolly";

/* One renderer per block kind. Server components — nothing here needs state.
   `dir` is the project's folder in public/projects/, prefixed onto every src. */

type Props = { block: Block; dir?: string };

const src = (dir: string | undefined, file: string) =>
  file.startsWith("/") ? file : `/projects/${dir}/${file}`;

export default function Block({ block: b, dir }: Props) {
  switch (b.kind) {
    case "prose":
      return (
        <div className="bk-prose">
          {b.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      );

    case "lead":
      return <p className="bk-lead">{b.text}</p>;

    case "list":
      return (
        <ul className="bk-list">
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );

    case "stats":
      return (
        <div className="bk-stats">
          {b.items.map((s) => (
            <div className="bk-stat" key={s.label}>
              <div className="v">{s.value}</div>
              <div className="l">{s.label}</div>
              {s.source && <div className="src">{s.source}</div>}
            </div>
          ))}
        </div>
      );

    case "quote":
      return (
        <figure className="bk-quote">
          <blockquote>{b.text}</blockquote>
          <figcaption>
            <span className="who">{b.author}</span>
            {b.role && <span className="what">{b.role}</span>}
          </figcaption>
        </figure>
      );

    case "persona":
      return (
        <article className="bk-persona">
          <header className="bk-persona-head">
            {b.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="bk-persona-photo" src={src(dir, b.photo)} alt="" />
            ) : (
              <span className="bk-persona-mark">{b.name.charAt(0)}</span>
            )}
            <div>
              <h4>
                {b.name}
                {b.age != null && <span className="age">, {b.age}</span>}
              </h4>
              <div className="role">{b.role}</div>
            </div>
          </header>

          {b.quote && <p className="bk-persona-quote">“{b.quote}”</p>}

          <div className="bk-persona-cols">
            <div>
              <h5>Goals</h5>
              <ul>
                {b.goals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Frustrations</h5>
              <ul>
                {b.frustrations.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      );

    case "themes":
      return (
        <div className="bk-themes">
          {b.rows.map((row) => (
            <div className="bk-theme" key={row.label}>
              <div className="bk-theme-label">{row.label}</div>
              <div
                className="bk-theme-cells"
                style={{ ["--theme-cols" as string]: b.columns.length }}
              >
                {b.columns.map((col, ci) => (
                  <div className="bk-theme-cell" key={col}>
                    <h5>{col}</h5>
                    <ul>
                      {(row.cells[ci] ?? []).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "figure":
      return (
        <div className={`bk-figwrap${b.annotations?.length ? " has-notes" : ""}`}>
          <figure className={`bk-figure frame-${b.frame ?? "web"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src(dir, b.src)} alt={b.caption ?? ""} loading="lazy" />
            {b.caption && <figcaption>{b.caption}</figcaption>}
          </figure>

          {b.annotations && b.annotations.length > 0 && (
            <ol className="bk-notes">
              {b.annotations.map((a) => (
                <li key={a.n}>
                  <span className="n">{String(a.n).padStart(2, "0")}</span>
                  <span className="t">{a.text}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      );

    case "scrolly":
      return <Scrolly steps={b.steps} dir={dir} />;

    case "figures":
      return (
        <div className="bk-figures" style={{ ["--fig-cols" as string]: b.cols ?? 2 }}>
          {b.items.map((it) => (
            <figure className="bk-figure" key={it.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src(dir, it.src)} alt={it.caption ?? ""} loading="lazy" />
              {it.caption && <figcaption>{it.caption}</figcaption>}
            </figure>
          ))}
        </div>
      );

    /* reuses the existing .cmp-* styles from the legacy detail page */
    case "compare":
      return (
        <div className="bk-compare">
          {b.label && <div className="cmp-label">{b.label}</div>}
          <div className="cmp-pair">
            <figure className="cmp-item before">
              <span className="cmp-tag">Before</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src(dir, b.before)} alt={`${b.label ?? "Screen"} — before`} loading="lazy" />
            </figure>
            <figure className="cmp-item after">
              <span className="cmp-tag">After</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src(dir, b.after)} alt={`${b.label ?? "Screen"} — after`} loading="lazy" />
            </figure>
          </div>
        </div>
      );

    case "decision":
      return (
        <article className="bk-decision">
          <h3 className="bk-decision-title">{b.title}</h3>
          <div className="bk-decision-body">
            {b.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
      );

    case "callout":
      return (
        <aside className="bk-callout">
          {b.title && <h5>{b.title}</h5>}
          <p>{b.body}</p>
        </aside>
      );

    case "flow":
      return (
        <ol className="bk-flow">
          {b.steps.map((s, i) => (
            <li className="bk-step" key={s.label}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="lbl">{s.label}</span>
              {s.note && <span className="note">{s.note}</span>}
            </li>
          ))}
        </ol>
      );

    /* recurses one level — the nested blocks aren't direct children of
       .study-blocks, so they don't pick up the section inset twice */
    case "split":
      return (
        <div
          className={[
            "bk-split",
            `w-${b.weight ?? "media"}`,
            b.align === "start" ? "align-start" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="bk-split-cell">
            <Block block={b.left} dir={dir} />
          </div>
          <div className="bk-split-cell">
            <Block block={b.right} dir={dir} />
          </div>
        </div>
      );

    case "swatches":
      return (
        <div className="bk-swatches">
          {b.items.map((s) => (
            <div className="bk-swatch" key={s.hex}>
              <span className="chip" style={{ background: s.hex }} />
              <span className="name">{s.name}</span>
              <span className="hex">{s.hex}</span>
            </div>
          ))}
        </div>
      );
  }
}
