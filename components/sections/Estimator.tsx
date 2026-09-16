"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import Reveal from "../ui/Reveal";
import { DEFAULT_TYPE, PRICING, profile, type PriceGroup, type PriceTier } from "@/lib/site";

const EASE = [0.2, 0.7, 0.2, 1] as const;

const usd = (n: number) => "$" + n.toLocaleString("en-US");

/** The groups a visitor can actually pick. `audit` is rendered but not
 *  bookable, so it never becomes the selected type. */
const SELECTABLE = PRICING.groups.filter((g) => !g.soon && g.tiers.length > 0);

function groupOf(id: string): PriceGroup {
  return SELECTABLE.find((g) => g.id === id) ?? SELECTABLE[0];
}

/** A number that animates from wherever it currently is to each new
 *  target, and is interruptible. components/ui/CountUp.tsx cannot be
 *  reused here: its effect re-runs animate(0, value) whenever `value`
 *  changes, so the price would drop to $0 and climb back on every click. */
function useTicker(target: number) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(target);
  const [shown, setShown] = useState(target);

  useMotionValueEvent(mv, "change", (v) => setShown(Math.round(v)));

  useEffect(() => {
    if (reduce) {
      mv.jump(target);
      return;
    }
    const controls = animate(mv, target, { duration: 0.5, ease: EASE });
    return () => controls.stop();
  }, [mv, target, reduce]);

  // globals.css disables CSS animation under prefers-reduced-motion but
  // not motion's JS, so the escape hatch has to be explicit here.
  return reduce ? target : shown;
}

export default function Estimator() {
  // A type is always selected, and so is one of its tiers — there is no
  // empty state to design around, which is why the page can open on a
  // real number instead of a dash.
  const [typeId, setTypeId] = useState<string>(DEFAULT_TYPE);
  const [tierId, setTierId] = useState<string>(groupOf(DEFAULT_TYPE).tiers[0].id);

  const group = groupOf(typeId);
  const tier: PriceTier = group.tiers.find((t) => t.id === tierId) ?? group.tiers[0];

  const isCustom = tier.custom === true;
  const isFloor = tier.from === true;

  // the ticker is called unconditionally to keep hook order stable;
  // its value is simply not shown for a custom scope
  const shown = useTicker(isCustom ? 0 : tier.price);

  /* switching type swaps the sub-options and lands on that type's first
     one, so the readout is never showing a tier the panel isn't offering */
  const pickType = (id: string) => {
    setTypeId(id);
    setTierId(groupOf(id).tiers[0].id);
  };

  /* ---- prefilled mail to the one generic contact ---- */
  const subject = `Project enquiry — ${group.label}`;
  const body = [
    "Hi Aditi,",
    "",
    "I used the price guide on your site and picked:",
    `- ${group.label}`,
    `- ${tier.label}`,
    isCustom
      ? "- It showed: custom scope, no figure"
      : `- It showed: ${isFloor ? "from " : "about "}${usd(tier.price)} ${PRICING.currency}`,
    "",
    "About the project:",
    "- What it is:",
    "- Roughly when I need it:",
    "- Anything already decided:",
    "",
    "Thanks,",
  ].join("\n");

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const kicker = isCustom ? "Custom scope" : isFloor ? "From" : "About";
  const honest = isCustom
    ? "Some scopes can't be guessed from a menu, and a made-up number would be worse than none. Tell me what you have in mind and I'll price it properly."
    : isFloor
      ? "A floor, not a total. This kind of work gets scoped together, and scoping only moves it up."
      : "For exactly what's selected. Anything on top of it gets quoted before it starts.";

  return (
    <section className="section" id="estimate">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker">Ballpark</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              What it usually <em>costs</em>
            </h2>
          </div>
          <span className="pill">Guide prices, not quotes</span>
        </div>

        <Reveal>
          <p className="est-lede">
            These are the numbers I start from. What a project actually costs depends on how much is
            already decided when we begin, so read them as a floor and a shape, not a bill.
          </p>
        </Reveal>

        <div className="est">
          {/* ---------- the menu ---------- */}
          <Reveal className="est-panel">
            <div className="est-block">
              <span className="est-legend" id="est-type">
                What are we making
              </span>
              <div className="est-types" role="radiogroup" aria-labelledby="est-type">
                {PRICING.groups.map((g) =>
                  g.soon ? (
                    // not a disabled button: a disabled control reads as
                    // "denied", a plain card reads as "preview"
                    <div className="est-type is-soon" key={g.id} data-accent={g.accent}>
                      <span className="lbl">{g.short}</span>
                      <span className="est-soon-tag">Soon</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      key={g.id}
                      className="est-type"
                      data-accent={g.accent}
                      role="radio"
                      aria-checked={g.id === typeId}
                      onClick={() => pickType(g.id)}
                    >
                      <span className="lbl">{g.short}</span>
                    </button>
                  )
                )}
              </div>
              {group.note && <p className="est-group-note">{group.note}</p>}
            </div>

            <div className="est-block" data-accent={group.accent}>
              <span className="est-legend" id="est-tier">
                How big is it
              </span>
              {/* the sub-options swap when the type changes */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={group.id}
                  className="est-tiers"
                  role="radiogroup"
                  aria-labelledby="est-tier"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {group.tiers.map((t, i) => (
                    <motion.button
                      type="button"
                      key={t.id}
                      className="est-tier"
                      role="radio"
                      aria-checked={t.id === tierId}
                      onClick={() => setTierId(t.id)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32, delay: i * 0.05, ease: EASE }}
                    >
                      <span className="t">
                        <span className="lbl">{t.label}</span>
                        <span className="amt">
                          {t.custom ? (
                            "Let's talk"
                          ) : (
                            <>
                              {t.from && <span className="pre">from </span>}
                              {usd(t.price)}
                            </>
                          )}
                        </span>
                      </span>
                      <span className="n">{t.note}</span>
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* ---------- the readout ---------- */}
          <Reveal delay={0.08}>
            <div className="est-out">
              <span className="est-out-kicker">{kicker}</span>

              <div className="est-figure" aria-hidden>
                {isCustom ? (
                  <span className="est-figure-text">Let&rsquo;s talk</span>
                ) : (
                  <>
                    {usd(shown)}
                    <span className="cur">{PRICING.currency}</span>
                  </>
                )}
              </div>
              {/* the visible figure changes ~60×/s while animating, so the
                  spoken value is the settled one */}
              <span className="est-sr" aria-live="polite">
                {isCustom
                  ? `${group.label}, custom scope. Priced in conversation.`
                  : `${group.label}, ${tier.label}. ${isFloor ? "From" : "About"} ${usd(tier.price)} US dollars.`}
              </span>

              <p className="est-honest">{honest}</p>

              <div className="est-rows">
                <div className="est-row">
                  <span className="k">
                    <b>{group.label}</b>
                    {tier.label}
                  </span>
                  <span className="v">
                    {isCustom ? (
                      "—"
                    ) : (
                      <>
                        {isFloor && <span className="pre">from </span>}
                        {usd(tier.price)}
                      </>
                    )}
                  </span>
                </div>
              </div>

              <a className="est-cta" href={mailto}>
                Send this to me
                <span className="go" aria-hidden>
                  ↗
                </span>
              </a>
              <a className="est-alt" href="#contact">
                or just scroll down and say hello
              </a>

              <p className="est-fine">
                {PRICING.currency} · design only · guide price · final scope agreed in writing
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
