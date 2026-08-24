/* ============================================================
   CASE STUDIES — edit this file to update the work.
   Add a project by appending to the `projects` array.
   Images live in public/projects/<dir>/.

   SERVER ONLY. A "use client" component pulls its entire import graph
   into the browser bundle, and some of what is below sits behind a
   password (see `Study.gated` and lib/gate.ts). Importing this module
   from a client component is a build error, by design: pass the data
   down from a server component as props instead, or import the
   client-safe site content from lib/site.ts.

   Types are exported from here too, but `import type` is erased at
   compile time, so type-only imports from client components are fine.
   ============================================================ */

import "server-only";

/* ============================================================
   CASE STUDY — a study is a list of sections, each section an
   ordered list of typed blocks. The block union *is* the template:
   every case study is assembled from the same vocabulary, so pages
   stay consistent while each project controls its own rhythm.
   Mix `figure` blocks between `prose` / `decision` blocks to keep
   screens and thinking interleaved rather than text-then-gallery.
   ============================================================ */

/** One step of a pinned walkthrough: the commentary, plus either a single
 *  screen or two–three staggered into a collage. A collage keeps portrait
 *  phone screens from filling the column, and fits more of the flow in. */
export type ScrollyStep = {
  src: string | string[];
  title: string;
  body: string[];
};

/** image paths in blocks are filenames inside the project's public/projects/<dir>/ */
export type Block =
  /** running paragraphs */
  | { kind: "prose"; body: string[] }
  /** one oversized statement paragraph — use sparingly, once per section at most */
  | { kind: "lead"; text: string }
  /** arrow-marked list */
  | { kind: "list"; items: string[] }
  /** evidence numbers; `source` renders as a small mono citation */
  | { kind: "stats"; items: { value: string; label: string; source?: string }[] }
  /** pull quote from a user or stakeholder */
  | { kind: "quote"; text: string; author: string; role?: string }
  /** research persona card */
  | {
      kind: "persona";
      name: string;
      age?: number;
      role: string;
      photo?: string;
      goals: string[];
      frustrations: string[];
      quote?: string;
    }
  /** insight matrix — one row per theme, one cell-group per column */
  | { kind: "themes"; columns: string[]; rows: { label: string; cells: string[][] }[] }
  /** a single screen, optionally with numbered callouts explaining it */
  | {
      kind: "figure";
      src: string;
      caption?: string;
      /** `scroll` windows a full-page capture so it doesn't run for
       *  thousands of pixels down the page. `wide` lets a flagship screen
       *  out past the section's text inset, so a dense dashboard is read
       *  rather than squinted at. */
      frame?: "web" | "mobile" | "bleed" | "card" | "scroll" | "crop" | "wide";
      annotations?: { n: number; text: string }[];
      /** STAND-IN IMAGE. Renders a loud badge over the frame so a borrowed
       *  screen can't be mistaken for the real one. Remove when the final
       *  export is dropped in. */
      placeholder?: boolean;
    }
  /** a row/grid of screens */
  | {
      kind: "figures";
      cols?: 2 | 3 | 4;
      items: { src: string; caption?: string; placeholder?: boolean }[];
    }
  /** before/after pair */
  | {
      kind: "compare";
      label?: string;
      before: string;
      after: string;
      /** either half is a stand-in — badges both frames */
      placeholder?: boolean;
    }
  /** a design decision and why it was made — reads as flowing prose under a
   *  large heading, not a boxed card, so it can sit beside the artefact */
  | { kind: "decision"; title: string; body: string[] }
  /** boxed constraint, "How might we", or aside */
  | { kind: "callout"; title?: string; body: string }
  /** process phases / journey steps */
  | { kind: "flow"; steps: { label: string; note?: string }[] }
  /** colour palette row */
  | { kind: "swatches"; items: { hex: string; name: string }[] }
  /** pinned commentary beside a scrolling stack of screens (desktop);
   *  stacks with inline captions below 900px */
  | { kind: "scrolly"; steps: ScrollyStep[] }
  /** a link out — "see also", a live site, a related case study */
  | { kind: "link"; href: string; label: string; note?: string }
  /** UNWRITTEN CONTENT. Renders a loud placeholder so a half-finished case
   *  study can't be published by accident. Every one of these must be
   *  replaced or deleted before the page goes live. */
  | { kind: "todo"; items: string[]; note?: string }
  /** two blocks side by side — e.g. a callout next to the figure proving it.
   *  `weight` favours the left (text) or right (media) column.
   *  Stacks below 760px. Nest sparingly; one level is the intent. */
  | {
      kind: "split";
      left: Block;
      right: Block;
      align?: "center" | "start";
      weight?: "text" | "even" | "media";
    };

export type StudySection = {
  id: string;        // anchor + TOC target, e.g. "problem"
  kicker?: string;   // small label above the heading, e.g. "Research"
  heading: string;
  /** the public telling — always rendered, on both versions of the page */
  blocks: Block[];
  /** the detail: screens, specifics, anything under NDA. Rendered only on
   *  /work/<slug>/full, once the reader has the password. A section whose
   *  `blocks` are empty and `more` is full simply doesn't exist publicly. */
  more?: Block[];
};

/** Composed product hero — a wide screen with a phone lifted over it.
 *  Use for two-sided products; either half may be omitted. */
export type StudyHero = {
  web?: string;       // wide/desktop screen (paths may be absolute to cross projects)
  app?: string;       // portrait phone screen
  webLabel?: string;  // small pill, e.g. "Therapist dashboard (web)"
  appLabel?: string;  // small pill, e.g. "Patient app (iOS & Android)"
  alt?: string;
};

export type Study = {
  hero?: StudyHero;                            // replaces the default detail-page hero
  meta?: { label: string; value: string }[];   // Role / Platforms / Scope — the header strip
  glance?: { value: string; label: string }[]; // outcome numbers, shown high on the page
  glanceNote?: string;
  sections: StudySection[];
  /** Split this study in two: a public short version at /work/<slug>, and a
   *  password-gated long version at /work/<slug>/full carrying every
   *  `more` block plus the screen gallery. See lib/gate.ts. */
  gated?: {
    /** the pitch on the public page's unlock card */
    teaser: string;
    /** what the reader gets for the password, listed on that card */
    includes: string[];
  };
};

export type Project = {
  slug: string;
  dir?: string;              // folder in public/projects/ (omit if no images yet)
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  year: string;
  accent: string;            // theme colour (CSS var name)
  cover?: string;            // card image filename (omit → colourful lettermark)
  hero?: string;             // detail-page banner filename (defaults to cover)
  heroGrid?: string[];       // optional four-image bento hero
  layout?: "web" | "mobile"; // gallery column style
  summary: string;           // one-liner for the card
  overview: string[];        // paragraphs for the detail page
  highlights: string[];
  tags: string[];
  tools?: string[];
  metrics?: { value: string; label: string }[];
  gallery?: string[];        // filenames shown on the detail page
  link?: string;             // optional external link
  featured?: boolean;
  template?: boolean;        // placeholder card to fill in later
  captions?: boolean;        // show per-screen captions in the gallery
  caseStudy?: { heading: string; body: string[]; list?: string[] }[];
  professional?: boolean;    // professional (employed) work, not freelance/independent
  comparison?: { label: string; before: string; after: string }[];
  /* Full case-study narrative. When present the detail page renders the
     case-study template instead of the legacy overview + caseStudy layout.
     `gallery` still renders underneath as the complete screen archive. */
  study?: Study;
};

export const projects: Project[] = [
  {
    slug: "fourcore-platform",
    dir: "fourcore-platform",
    title: "FourCore",
    subtitle: "Breach & attack simulation product",
    role: "UI/UX → Senior",
    timeline: "2+ years · ongoing",
    year: "2024 to Now",
    accent: "violet",
    professional: true,
    cover: "dashboard.png",
    hero: "dashboard.png",
    layout: "web",
    summary:
      "2+ years designing FourCore ATTACK, a breach-and-attack-simulation platform, building its design system from scratch and shipping 40+ new screens across new and upgraded features.",
    overview: [
      "FourCore ATTACK is a breach-and-attack-simulation (BAS) platform. Security teams use it to continuously emulate real-world adversaries, running attack techniques against their live systems, to validate whether their controls actually detect and block threats, then prioritise the gaps.",
      "This is my longest-running professional engagement: over 2+ years I grew from UI/UX Designer to Senior UI/UX Designer to Product Designer: owning the product’s design system, designing brand-new features, and modernising existing ones.",
    ],
    highlights: [
      "Built the product’s entire design system from scratch: brand, colour, type, components, iconography.",
      "Designed and shipped 5+ new features and 40+ new screens, concept to production.",
      "Upgraded existing features and pages to the new brand identity, including custom illustrations.",
      "Partnered with marketing on brand collateral: event posters, mood boards, and merch.",
    ],
    tags: ["Product Design", "Design System", "Cybersecurity", "B2B"],
    tools: ["Figma"],
    metrics: [
      { value: "40+", label: "New screens" },
      { value: "5+", label: "Features shipped" },
      { value: "2+ yrs", label: "Ongoing" },
    ],
    caseStudy: [
      {
        heading: "What is FourCore",
        body: [
          "FourCore ATTACK is a breach-and-attack-simulation platform in the cybersecurity space. It safely emulates real-world adversaries, executing attack techniques, moving laterally, escalating privileges, against an organisation’s live environment, then shows security teams exactly where their defenses held and where they broke, mapped to frameworks like MITRE ATT&CK.",
        ],
      },
      {
        heading: "How my role grew",
        body: [
          "I joined as a UI/UX Designer, was promoted to Senior UI/UX Designer, and then to Product Designer, over 2+ years and counting. Across that arc I owned three threads: the design system, brand-new features, and the modernisation of everything that already existed.",
        ],
      },
      {
        heading: "The design system, built from scratch",
        body: [
          "I built the product’s entire design system from the ground up: brand guidelines, colour theory, typography, the full UI component library, and a custom iconography set. In a dense, data-heavy security product, that system is what keeps a hundred different screens, dashboards, attack graphs, MITRE matrices, reports, feeling like one coherent tool, and it dramatically sped up how fast new screens ship.",
        ],
      },
      {
        heading: "New features, concept to production",
        body: [
          "I designed and shipped 5+ new features and 40+ new screens, owning them from first concept all the way to production alongside engineering. The specifics sit under an NDA, so I’ll keep this high-level, but the work spans the core surfaces of a modern BAS platform.",
        ],
      },
      {
        heading: "Upgrading what already existed",
        body: [
          "Beyond net-new work, I reworked existing features and pages to match the new brand identity, including custom illustrations, so the whole product moved forward together rather than becoming a patchwork of old and new.",
        ],
      },
      {
        heading: "Beyond the product, brand & marketing",
        body: [
          "I also worked closely with the marketing team, extending the design system beyond the app into brand collateral: event posters, mood boards, merch, and other materials, keeping FourCore consistent everywhere it shows up.",
        ],
      },
    ],
    /* CONFIDENTIAL CLIENT. Nothing in this study may be invented: platform
       data is sensitive and a plausible-sounding fabrication is a real risk,
       not just a copywriting gap.

       The study is split in two. `blocks` are the public telling, written to
       stand on its own for an application that can't be sent a password.
       `more` carries the screens and the specifics, and is only rendered on
       /work/fourcore-platform/full once the reader has unlocked it. Anything
       still unwritten is a `todo` block, and every stand-in image is flagged
       `placeholder: true` so it can't quietly pass as final. */
    study: {
      /* GATE DISABLED — this study is public in full: the `more` blocks and the
         screen gallery render on /work/fourcore-platform, no password. To put
         the gate back, uncomment `gated` below and undo the two matching
         "GATE DISABLED" edits in app/work/[slug]/page.tsx. */
      // gated: {
      //   teaser:
      //     "The public write-up above tells the story. The detailed version walks through the screens themselves: what the platform looked like before, what it looks like now, and the reasoning behind each surface.",
      //   includes: [
      //     "Before and after for every redesigned surface, screen by screen",
      //     "The design system: type scale, colour, components, iconography",
      //     "Emerging Threats, Reporting, Playbooks and Exposures in detail",
      //     "The analytics decision, with the annotated artefact",
      //     "The full screen archive",
      //   ],
      // },
      hero: {
        web: "dashboard-refined.png",
        webLabel: "FourCore ATTACK, platform dashboard",
        alt: "The FourCore ATTACK platform dashboard",
      },
      meta: [
        { label: "Company", value: "FourCore, breach & attack simulation (cybersecurity)" },
        {
          label: "Role",
          value: "UI/UX Design Intern → UI/UX Designer → Senior UI/UX Designer",
        },
        { label: "Timeline", value: "2024 to present · 2+ years, ongoing" },
        {
          label: "Scope",
          value:
            "Marketing site, full platform redesign, design system, and 40+ new screens across 5+ features",
        },
        {
          label: "Team",
          value: "First design hire. Now leading a junior designer, working with product and engineering",
        },
      ],
      glance: [
        { value: "40+", label: "New screens shipped" },
        { value: "5+", label: "Major features" },
        { value: "10+", label: "Website screens, in a two-month sprint" },
        { value: "2×", label: "Company revenue growth over a year" },
      ],
      glanceNote:
        "FourCore ATTACK lets security teams safely run real attack techniques against their own systems to find out what their defenses actually catch. I joined as the company’s first design hire, on an internship, and have spent 2+ years redesigning the product end to end and growing its design practice.",
      sections: [
        {
          id: "overview",
          kicker: "Overview",
          heading: "What FourCore is",
          blocks: [
            {
              kind: "prose",
              body: [
                "FourCore ATTACK is a breach-and-attack-simulation (BAS) platform. Security teams use it to safely emulate real-world adversaries against their own live environment: executing attack techniques, moving laterally, escalating privileges, and then seeing exactly where their defenses held and where they broke, mapped to frameworks like MITRE ATT&CK.",
                "That makes it a genuinely hard product to design for. Every run produces a large volume of technical output, and the person reading it is usually under time pressure and needs to know one thing first: what should I fix, and in what order. Most of the design work over the past two years has been in service of that question.",
              ],
            },
            {
              kind: "callout",
              title: "About the screens",
              body:
                "FourCore’s platform is confidential. Customer and account data in the screens below is blurred or replaced with test values; what each one is here to show is the interface and the reasoning behind it, not the data sitting in it.",
            },
          ],
        },
        {
          id: "role",
          kicker: "The Brief",
          heading: "Hired as an intern, as the first designer in the company",
          blocks: [
            {
              kind: "prose",
              body: [
                "I joined FourCore as a UI/UX design intern and was the first hire for their design team. There was no design function before me: no system, no shared components, no one whose job it was to own how the product looked or felt.",
                "The brief I was given was much larger than the title suggested. Redesign the entire platform and the brand experience around it. That turned into three chapters, each one earning the next: the marketing site as an intern, the platform itself once I converted to full-time, and then the design system and new features after being promoted to Senior UI/UX Designer.",
              ],
            },
            {
              kind: "flow",
              steps: [
                { label: "UI/UX Design Intern", note: "First design hire. Marketing site redesign." },
                { label: "UI/UX Designer", note: "Converted full-time. Platform redesign, 40+ screens." },
                {
                  label: "Senior UI/UX Designer",
                  note: "Design system, new features, leading a junior designer.",
                },
              ],
            },
          ],
        },
        {
          id: "landing",
          kicker: "Chapter 01",
          heading: "The marketing site, my first project",
          blocks: [
            {
              kind: "prose",
              body: [
                "My first responsibility was the public face of the company. FourCore’s website had grown cluttered and inconsistent, which is a problem when the thing you are selling is precision and trust to security buyers. I redesigned it end to end across 10+ screens, for both mobile and desktop, in a two-month sprint.",
              ],
            },
            {
              kind: "compare",
              label: "Home page",
              before: "/projects/fourcore/old-home.jpg",
              after: "/projects/fourcore/new-home.jpg",
            },
            {
              kind: "compare",
              label: "Book a demo",
              before: "/projects/fourcore/old-demo.jpg",
              after: "/projects/fourcore/new-demo.jpg",
            },
            {
              kind: "link",
              href: "/work/fourcore",
              label: "Read the full case study for this",
              note: "FourCore: Landing · 10+ screens, desktop and mobile",
            },
            {
              kind: "prose",
              body: [
                "The site shipped, and it is what got me the conversation about staying on full-time and taking on the product itself.",
              ],
            },
          ],
        },
        {
          id: "platform",
          kicker: "Chapter 02",
          heading: "Converting full-time, and redesigning the platform",
          blocks: [
            {
              kind: "prose",
              body: [
                "After the website, I converted to a full-time UI/UX Designer and moved onto the product. The platform worked, but it looked like what it was: an engineering-led tool that had grown feature by feature, with each screen solving its own problem in its own way.",
                "My job was to take every existing screen to a new look: a premium, enterprise-grade experience that felt like it belonged in a security operations centre, and that held together as one product rather than a collection of pages.",
              ],
            },
            {
              kind: "lead",
              text: "The dashboard was the place to start. It is the first thing a customer sees in a demo, and the screen that has to be understood fastest.",
            },
            {
              kind: "compare",
              label: "Dashboard",
              before: "dashboard-before.png",
              after: "dashboard-refined.png",
            },
            {
              kind: "prose",
              body: [
                "The old dashboard opened with a radar chart and two large donuts. Between them they took the top third of the screen to say three numbers, and the radar in particular is a shape that is hard to read quickly: you are comparing distances from a centre point across twelve axes at once.",
                "The redesign puts the four numbers that matter across the top as plain figures with a direction of travel against the previous period, then gives the rest of the screen to detail that is actually actionable: how each class of security control performed, which exposures scored highest, and which assets are in the worst shape. Nothing on the new screen needs a legend to read.",
                "It also fixed a structural problem. The old left-hand navigation listed eleven destinations in one flat column, mixing top-level surfaces with individual report types. The new one is grouped, and the groups match how people actually talk about the product: what you are protecting, what you are running against it, and what you have connected.",
              ],
            },
            {
              kind: "figure",
              src: "dashboard.png",
              frame: "scroll",
              caption:
                "The full dashboard, top to bottom. Scroll inside the frame — the real screen runs about seven thousand pixels.",
            },
            {
              kind: "callout",
              title: "One pattern, repeated",
              body:
                "Almost every card on this page is the same object in a different costume: a title, a headline figure, a supporting rate or two, and a link deeper in. That repetition is deliberate. In a product this dense, a reader who learns one card has learned twenty.",
            },
          ],
        },
        {
          id: "surfaces",
          kicker: "Chapter 02",
          heading: "Surface by surface",
          blocks: [
            {
              kind: "prose",
              body: [
                "Past the dashboard, the redesign worked through the surfaces a security team lives in day to day. Each one had the same underlying problem: the data was all there, and none of it was ranked.",
              ],
            },
            {
              kind: "compare",
              label: "MITRE ATT&CK matrix",
              before: "attack-matrix-before.png",
              after: "mitre-attack.png",
            },
            {
              kind: "prose",
              body: [
                "The ATT&CK matrix is the canonical way security teams think about attacker behaviour, and in the old build it was a panel embedded halfway down another page, scrolling horizontally inside its own box. It is the industry’s shared map, and it was being treated as a widget.",
                "The redesign gives it the whole screen and adds the thing the old one was missing: banding. Each technique carries a coverage band, so the matrix reads as a heat map first and a list of names second. You can see where you are weak from across the room, which is the only way anyone reads this thing in a review meeting.",
              ],
            },
            {
              kind: "split",
              weight: "text",
              align: "start",
              left: {
                kind: "callout",
                title: "Detail on demand",
                body:
                  "The tile itself stays quiet: a name, an action count, one bar. Coverage, prevented and successful rates only appear on hover, so the grid can hold hundreds of techniques without turning into a spreadsheet.",
              },
              right: {
                kind: "figure",
                src: "attack-matrix-hover.png",
                frame: "card",
                caption: "Hovering a technique",
              },
            },
            {
              kind: "figure",
              src: "threat-intel-listing.png",
              frame: "wide",
              caption: "Threat Intelligence — spotlights, reports and in-the-wild activity in one feed",
            },
            {
              kind: "prose",
              body: [
                "Threat Intelligence is the part of the product that answers “should I care about this one”. It is editorial content, so it is laid out like editorial content: a card grid with imagery, a date, the actor and the categories, and a coverage bar showing how you would fare against it right now. That last element is the one that makes it a product feature rather than a news feed.",
              ],
            },
            {
              kind: "figure",
              src: "threat-intel-detail.png",
              frame: "wide",
              caption: "A threat, opened — abstract, who it targets, and your own performance against it",
            },
            {
              kind: "prose",
              body: [
                "Opening a threat splits it into three tabs so the analyst, the executive and the operator each have a place to land: the abstract and target profile up front, the full analyst report behind a tab, and the specific threats you can run behind another.",
              ],
            },
            {
              kind: "figure",
              src: "integrations.png",
              frame: "wide",
              caption: "Integrations — what is connected, then what FourCore suggests connecting next",
            },
            {
              kind: "prose",
              body: [
                "Integrations splits into two states on one page: what you have connected and can manage, and what FourCore recommends you connect next. Recommendations sit below active connections rather than in a separate tab, because the moment someone is thinking about their tooling is the moment they are already on this screen.",
              ],
            },
          ],
        },
        {
          id: "assets",
          kicker: "Chapter 02",
          heading: "Assets, the thing every simulation points at",
          blocks: [
            {
              kind: "prose",
              body: [
                "Nothing in the product works until a customer has assets in it. An asset is a machine, a mailbox or a web endpoint with the FourCore agent installed, and it is the target every simulation runs against. It is also the least glamorous part of the product and the one most likely to be where a trial quietly dies.",
              ],
            },
            {
              kind: "figure",
              src: "assets-listing.png",
              frame: "wide",
              caption: "Assets, split by type: endpoint, email and web",
            },
            {
              kind: "figure",
              src: "asset-detail.png",
              frame: "scroll",
              caption:
                "One asset, opened: what it is, how it has performed, and every simulation it has been through",
            },
            {
              kind: "prose",
              body: [
                "The asset detail page carries two audiences at once. The top half is machine facts — OS, kernel, CPU, memory, agent version, last seen — which an engineer needs and nobody else reads. The bottom half is history: blocked and alerted rates over time, and the full run log with the same analytics column used everywhere else in the product.",
                "Splitting them vertically rather than into tabs means the person who came for the run history scrolls past the specification once and never has to think about it again, while the person debugging an agent gets it without a click.",
              ],
            },
            {
              kind: "figure",
              src: "asset-add-windows.png",
              frame: "wide",
              caption: "Adding an endpoint — the install laid out as numbered steps, per platform",
            },
            {
              kind: "prose",
              body: [
                "Adding an asset means installing software on a production machine, usually by someone who has to justify doing it. The drawer lays the install out as numbered steps with the exact exclusion path and a copyable script, and it ends by telling you what success looks like: the agent shows up on the assets page. Instructions that stop before the confirmation are how support tickets get made.",
              ],
            },
          ],
        },
        {
          id: "access",
          kicker: "Chapter 02",
          heading: "Getting in, and getting a team in",
          blocks: [
            {
              kind: "prose",
              body: [
                "Authentication and settings are the screens no one puts in a portfolio, and they are the ones every single customer sees. I redesigned the whole set.",
              ],
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "sign-in.png", caption: "Sign in" },
                { src: "auth-register.png", caption: "Registration" },
              ],
            },
            {
              kind: "prose",
              body: [
                "Sign-in and registration share one composition: a full-bleed gradient panel on the left holding the brand, the form on the right, and nothing else on the page. The gradient is doing real work — it is the only place in the entire product where the brand gets to be loud, because every screen after this one belongs to the customer’s data.",
              ],
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "auth-signin-error.png", caption: "A failed sign in" },
                { src: "auth-forgot-password.png", caption: "Forgot password" },
              ],
            },
            {
              kind: "figure",
              src: "settings-team-v2.png",
              frame: "wide",
              caption: "Settings → Team: roles, status and last active in one table",
            },
            {
              kind: "prose",
              body: [
                "Team management is where a single-seat trial becomes an account with a security team on it. The table carries the three things an admin checks — who they are, what they can do, and whether the invite was ever accepted — without a click.",
              ],
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "settings-audit-logs.png", caption: "Audit logs" },
                { src: "settings-rest-api.png", caption: "API keys, with a key opened" },
              ],
            },
            {
              kind: "prose",
              body: [
                "Audit logs and API keys are compliance surfaces: they exist because a security buyer’s procurement checklist asks for them. The key drawer spells out every permission a key grants in plain sentences next to its scope name, because the person revoking a key at 2am is not the person who created it.",
              ],
            },
            {
              kind: "figure",
              src: "preferences.png",
              frame: "wide",
              caption: "Preferences — organisation, time zone and alerting",
            },
          ],
        },
        {
          id: "states",
          kicker: "Detail",
          heading: "The screens nobody asks for",
          blocks: [
            {
              kind: "prose",
              body: [
                "A design system is mostly judged on its happy path and mostly used off it. These are the states that get skipped in a redesign brief and then get built badly under deadline, so I drew them up front.",
              ],
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "empty-screen.png", caption: "Team, before anyone has been invited" },
                { src: "report-aborted-state.png", caption: "A simulation the user stopped part way" },
              ],
            },
            {
              kind: "prose",
              body: [
                "Both of these do the same two jobs: say plainly what happened, and offer the one action that resolves it. “It’s a bit lonely in here” with an Invite User button; “this simulation was aborted by user” with Simulate Again. Neither leaves the reader wondering whether something is broken.",
              ],
            },
            {
              kind: "figures",
              cols: 3,
              items: [
                { src: "performance-empty-state.png", caption: "A chart with no data yet" },
                { src: "card-empty-rest.png", caption: "A zeroed card, at rest" },
                { src: "card-empty-hover.png", caption: "The same card, on hover" },
              ],
            },
            {
              kind: "prose",
              body: [
                "The zero states are the ones I care most about. A new account opens a dashboard where every number is legitimately 0% and every chart is legitimately empty, and that screen has to read as “nothing has run yet”, not as “this product is broken”.",
                "So the empty chart keeps its own skeleton — the bars are still there, greyed, holding their shape — and the zeroed card hides a Simulate Attack button until you hover it. The card is not just reporting that nothing has happened; it is offering to make something happen.",
              ],
            },
          ],
        },
        {
          id: "iterations",
          kicker: "Process",
          heading: "The same screen, more than once",
          blocks: [
            {
              kind: "prose",
              body: [
                "None of the screens above arrived in one pass. A few of them are worth showing twice, because the distance between the two versions is most of what the job actually is.",
              ],
            },
            {
              kind: "lead",
              text: "Alert filters: from a page of a notebook to a shipped drawer.",
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "alerts-drawer-sketch.png", caption: "Where it started" },
                { src: "alerts-drawer-final.png", caption: "Where it ended up" },
              ],
            },
            {
              kind: "prose",
              body: [
                "The problem was that simulation-finished emails were firing on everything, so people either muted them or ignored them. The fix was to let an admin narrow what triggers an alert: which assets, which users, which execution types, and — the important one — which results.",
                "The sketch already has the whole structure in it. Four filters, each with its own on/off so the defaults stay quiet, and a result filter that needed a range rather than a value. That last control is the only thing that really changed between the two: the loose slider in the notebook became a two-handled threshold with the numbers called out, so “alert me when successful attacks land between 40% and 60%” is something you can read back off the screen.",
              ],
            },
            {
              kind: "compare",
              label: "Settings → Team, first pass and second",
              before: "settings-team-v1.png",
              after: "settings-team-v2.png",
            },
            {
              kind: "prose",
              body: [
                "The first pass split users across two tabs, Users and Pending Invites, and put the role in its own column as plain text with a tooltip explaining what each role meant. Reviewing it, two things were wrong. Splitting by invite state meant the answer to “is everyone set up” lived in a badge on a tab. And a tooltip is where you put an explanation you hope nobody needs.",
                "The second pass merges the tabs into one table and adds Status as a real column, so Active, Invited and Disabled sit side by side and can be filtered. The role moves up next to the name as a coloured badge, where it reads as a property of the person rather than a cell in a grid. The hover explanation is gone.",
              ],
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "assets-listing.png", caption: "The asset table as it shipped" },
                { src: "assets-table-later.png", caption: "A later pass: criticality and environment" },
              ],
            },
            {
              kind: "prose",
              body: [
                "The asset table went the same way. The first version answered “what is connected” — hostname, version, IP, OS, last seen. The later pass answers “what matters”, adding a criticality level and the business environment each asset belongs to, so a list of machines becomes a list of machines you can prioritise.",
              ],
            },
            {
              kind: "lead",
              text: "And two cards, explored at two densities.",
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "card-vulnerable-assets-lean.png", caption: "Most Vulnerable Assets, lean" },
                { src: "card-vulnerable-assets-rich.png", caption: "Most Vulnerable Assets, expanded" },
              ],
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "card-security-controls-lean.png", caption: "Security Control Analytics, lean" },
                { src: "card-security-controls-rich.png", caption: "Security Control Analytics, expanded" },
              ],
            },
            {
              kind: "prose",
              body: [
                "Both cards were drawn twice: once as a ranked list that fits five rows in the height of a dashboard tile, and once as a fuller record with a ring per row, the exposure count, and the security tools covering each asset.",
                "The lean version is the one on the dashboard. On a screen where a card is competing with eleven others, the job is to name the worst offenders and hand you a link — the detail belongs on the page you land on when you take it.",
              ],
            },
          ],
        },
        {
          id: "decision",
          kicker: "Key Decision",
          heading: "Making a table tell you where to look",
          blocks: [
            {
              kind: "decision",
              title: "Percentages told users the number. They did not tell them where to look.",
              body: [
                "FourCore is a data-heavy product, and a lot of that data lives in tables. Users kept telling us the same thing in different words: they could read any individual row fine, but scanning a full table to work out which entry needed their attention first was slow.",
                "The analytics in those tables were rendered as percentages. A percentage is precise, and precision is the right call in a security tool, but a column of numbers gives the eye nothing to catch on. Reading it is a serial task: you go row by row, comparing as you go. That is exactly the wrong shape for a screen someone opens when something is on fire.",
                "The constraint was that whatever replaced it could not cost us the table. Tables here are dense and have to stay responsive across a lot of columns and a lot of rows, so anything that needed real horizontal space, a bar column, a sparkline, an extra cell, was out before it started.",
                "What I landed on was combining the two rather than choosing between them: the percentage stays, and a small ring chart wraps it in the same cell. The ring costs almost no additional width because it occupies space the cell already had, and it turns the number into something the eye can compare in parallel. Users get the exact figure when they need it and, before that, an at-a-glance read of which rows are worth their attention.",
              ],
            },
            {
              kind: "split",
              weight: "text",
              align: "start",
              left: {
                kind: "prose",
                body: [
                  "The component had to survive every value the data could hand it, not just the demo-friendly middle. A full ring at 100% and an empty one at 0% both have to stay legible at sixteen pixels, and the colour has to carry meaning without being the only thing carrying it — blocked, successful and alerted are green, red and amber, but they are also three different icons.",
                  "The row that mattered most was the one that is not a number at all. When an attack fails to execute there is no percentage to show, and the honest answer is to say so in words and grey the rest of the row out, rather than render a 0% that reads as “nothing got through”.",
                ],
              },
              right: {
                kind: "figure",
                src: "ring-analytics-states.png",
                frame: "card",
                caption: "The ring across its states, including the one that has no value",
              },
            },
            {
              kind: "figure",
              src: "reports-listing.png",
              frame: "wide",
              caption: "The rings in production, in the Analytics column of the reports table",
            },
            {
              kind: "prose",
              body: [
                "In place, three rings sit in the width a single percentage used to take. The table keeps its density — attack name, assets, date, actions all still fit — and the column that used to be read row by row can now be skimmed down.",
              ],
            },
            {
              kind: "figure",
              src: "simulation-report-before.png",
              frame: "wide",
              caption: "The old simulation report: results as full-width bars and status badges",
            },
            {
              kind: "prose",
              body: [
                "For contrast, this is how results were presented before: horizontal bars that each needed most of a column, and Success / Detected badges repeated down every row. It is readable one row at a time, which was exactly the complaint.",
              ],
            },
            /* TO WRITE — hidden for now. Uncomment to bring the checklist back. */
            // {
            //   kind: "todo",
            //   items: [
            //     "The specific ‘before’ artefact your decision text describes — the table cell with the bare percentage column. The screen above shows the older bar-and-badge treatment, which makes a slightly different point than the one you are arguing.",
            //     "Anything measurable from after it shipped, even qualitative: what users said once it was live.",
            //     "The other key decisions you mentioned wanting to add later. This section is built to take more than one.",
            //   ],
            // },
          ],
        },
        {
          id: "system",
          kicker: "Chapter 03",
          heading: "Promoted to Senior, and building the design system",
          blocks: [
            {
              kind: "prose",
              body: [
                "Being promoted to Senior UI/UX Designer changed what the job was. Redesigning screens one at a time had got the product to a consistent place, but nothing was holding it there. Every new feature was a fresh negotiation about type sizes and spacing and what a button looked like.",
                "So the first thing I did as a senior was stop designing screens for a while and build the design system for FourCore from scratch: the entire library, spanning typography, colour, components, and a custom icon set. In a product this dense, that system is what lets a hundred different screens, dashboards, attack graphs, MITRE matrices and reports feel like one tool, and it is the reason new features started shipping much faster after it existed.",
              ],
            },
            /* TO WRITE — hidden for now. Uncomment to bring the checklist back. */
            // {
            //   kind: "todo",
            //   items: [
            //     "The design system artefacts: type scale, colour ramps, the component library, the icon set.",
            //     "The colour values, if they can be shown, for a swatches block.",
            //     "Roughly how many components ended up in the library, and how much faster a new screen got to build afterwards. Even a rough before-and-after is stronger than ‘much faster’.",
            //   ],
            //   note: "This is the half of the screens that has not been sent yet — everything above is the work up to the Senior promotion.",
            // },
          ],
        },
        {
          id: "features",
          kicker: "Shipped",
          heading: "New features, concept to production",
          blocks: [
            {
              kind: "prose",
              body: [
                "With the system in place, the work moved to net-new product. Over the following stretch I designed and shipped 5+ major features and 40+ new screens, taking each from first concept through to production alongside engineering.",
              ],
            },
            {
              kind: "list",
              items: [
                "Emerging Threats — a feed of live malware campaigns you can run against yourself",
                "The scheduler — everything the platform runs, on a calendar",
                "Playbooks — attack chains grouped into the stages of a real intrusion",
                "Exposures — the ranked list of what to fix",
                "Reporting, rebuilt",
              ],
            },
            {
              kind: "prose",
              body: [
                "The four sections that follow take each of them in turn: what the feature is for, and the decisions inside it that are not obvious from a screenshot.",
              ],
            },
            /* TO WRITE — hidden for now. Uncomment to bring the checklist back. */
            // {
            //   kind: "todo",
            //   items: [
            //     "Reporting: what was wrong with the old reports and what the rebuild changed. No screens for it yet — the reports listing in the Key Decision section above is the only one wired in.",
            //   ],
            // },
          ],
        },
        {
          id: "emerging-threats",
          kicker: "Feature",
          heading: "Emerging Threats, end to end",
          blocks: [
            {
              kind: "prose",
              body: [
                "Emerging Threats is the feature I took furthest, from the first concept through to production. The premise is simple to state and hard to build: a new malware campaign appears in the wild, and a security team needs to know, today, whether their own defenses would stop it.",
                "Before something like this exists, that question takes days. Someone reads a threat report, works out which techniques it uses, finds or writes samples, sets up a run, and interprets the output. Emerging Threats collapses that into a feed you can act on, where every row is a real campaign and every row has a Run button.",
              ],
            },
            {
              kind: "figure",
              src: "emerging-threats.png",
              frame: "wide",
              caption: "The Emerging Threats surface: exposure summary above, the day’s campaigns below",
            },
            {
              kind: "prose",
              body: [
                "The top of the screen answers “how exposed am I, overall”, and it does it twice, along the two axes that change what you would actually do about it. Exposure by filetype tells you what to tighten — if 56% of your vulnerable files are DLLs, that is a different afternoon than if they are Office documents. Exposure by vector tells you where to tighten it: on disk, through the web proxy, or in email.",
                "Both are single stacked bars rather than pie charts, with the high-risk slice called out in words rather than left to colour alone. Underneath, the ranked list carries the same three rings used everywhere else in the product, so a rate here means what a rate means anywhere.",
                "Each row is a campaign, tagged by the industries, regions and threat actors it is associated with — the three things a reader uses to decide whether it is aimed at someone like them. And the primary action sits on the row itself. There is no detail page to visit first, because the whole point is to shorten the distance between reading about a threat and testing yourself against it.",
              ],
            },
            {
              kind: "callout",
              title: "Designing for the labels you do not control",
              body:
                "Industry and region names come from threat data, not from us, so the filter was specified against labels that wrap onto two lines rather than the tidy one-word options a mockup usually uses. Selected items pin to the top with a count and a Clear All, so a long list stays navigable once you are several filters deep.",
            },
            {
              kind: "figure",
              src: "et-filter-industry.png",
              caption: "The industry filter, specified with realistic labels rather than convenient ones",
            },
            {
              kind: "lead",
              text: "A feature nobody knows exists has not shipped. So it introduces itself.",
            },
            {
              kind: "figure",
              src: "et-intro-1.png",
              frame: "wide",
              caption: "01 — Say what it is",
            },
            {
              kind: "figure",
              src: "et-intro-2.png",
              frame: "wide",
              caption: "02 — Then say why it is theirs",
            },
            {
              kind: "figure",
              src: "et-intro-3.png",
              frame: "wide",
              caption: "03 — Then ask for the one decision",
            },
            {
              kind: "prose",
              body: [
                "Three steps, each doing a different job. The first names the thing. The second is the one that turns a global feed into something personal — the platform maps worldwide activity onto your assets, your regions, your sectors. Without that step, Emerging Threats reads as a news ticker; with it, the list behind the dialog is a list about you.",
                "The third step is the reason the flow exists at all. Automation is what makes the feature useful without anyone remembering to open it, so it is marked Recommended and given a real button — but the way out is a plain “Skip for now”, set at the same size as the thing it declines. A first-run flow that traps people is worse than no first-run flow.",
                "All three sit over the live screen rather than on a blank page, blurred but still legible at the edges, so the reader can see the thing being described while it is described.",
              ],
            },
            {
              kind: "figure",
              src: "et-campaign-detail.png",
              frame: "scroll",
              caption:
                "A campaign, opened: what it is, who runs it, who it targets, and how you have fared",
            },
            {
              kind: "prose",
              body: [
                "Opening a campaign has to serve two readers at once. The analyst wants the write-up, the source links, and the payload hashes. The person who has to make a decision wants to know whether it applies to them and what happened last time it ran.",
                "So the narrative sits on the left and the attributes — first observed, discovered on, threat actors, industries, regions — sit in a scannable right rail. Simulate Now is at the top next to the current rates, because the most common reason to open this page is to decide whether to run it.",
                "Below that, trend analysis over time, then the payloads themselves. That order is deliberate: the trend is the thing you can act on, the payload list is the thing you check afterwards.",
              ],
            },
            {
              kind: "prose",
              body: [
                "The payload row is the densest object in the feature, so it was specified as a small state machine rather than a static row: resting, hovered, and expanded.",
                "Collapsed, it shows the filename, the filetype and the rates. Expanded, it adds what the file actually did, its behavioural tags, and the hashes an analyst will paste into their own tooling — each with a copy button, because nobody types a SHA256 by hand.",
              ],
            },
            {
              kind: "figure",
              src: "et-payload-states.png",
              frame: "card",
              caption: "One payload row, specified across its three states",
            },
            {
              kind: "lead",
              text: "Two doors into the same room.",
            },
            {
              kind: "figure",
              src: "et-create-ai.png",
              frame: "wide",
              caption: "The AI-assisted path — hand it the report you already have",
            },
            {
              kind: "figure",
              src: "et-create-manual.png",
              frame: "scroll",
              caption: "The manual path — the same campaign, entered field by field",
            },
            {
              kind: "prose",
              body: [
                "Customers also need to test threats that are not in the feed — something their own intel team found, or a report a vendor sent them. That is a lot of structured data to enter by hand: campaign name, actor, industry, region, threat family, category, and every payload.",
                "The AI-assisted path takes the artefact people already have — a PDF report or a URL — and extracts that structure automatically. The manual path is the same campaign, entered field by field.",
                "Neither is hidden behind the other. Each drawer ends with a plain-text link to its opposite: “I want to enter threat details manually”, and “Switch to AI-based malware upload”. That link is the whole design decision. An automated path that cannot be escaped is a trap when the extraction gets it wrong, and a manual path with no shortcut is a chore when it would have got it right.",
              ],
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "et-automation-enabled.png", caption: "Automation, switched on — the config read back as a receipt" },
                { src: "et-delete-campaign.png", caption: "Deleting a one-off campaign" },
                { src: "et-delete-automation.png", caption: "Deleting a recurring automation — “Edit instead”, not just Cancel" },
              ],
            },
            {
              kind: "prose",
              body: [
                "Automation runs attacks against production systems on a schedule, so the moments where it is switched on and off get the same care as the feature itself. Every one of these dialogs restates the thing being acted on in full — the schedule, the industries, the regions, the actors, the named assets — rather than asking “are you sure?” about an abstraction.",
                "The confirmation screen doubles as a receipt: it is the first time the reader sees their configuration written out as a sentence, and Edit Preferences sits right there in case reading it back changes their mind.",
                "The two delete dialogs differ by one word, and it is the word that matters. Deleting a one-off campaign offers Cancel. Deleting a recurring automation offers “Edit instead” — because someone deleting a schedule usually wants it to stop doing what it currently does, not to stop existing.",
              ],
            },
            /* TO WRITE — hidden for now. Uncomment to bring the checklist back. */
            // {
            //   kind: "todo",
            //   items: [
            //     "The concept work behind this — early explorations, whatever you rejected, and why the feed-with-a-Run-button won. This section shows the destination and not the route.",
            //     "Anything you can say about how it landed: adoption, what customers said, whether automation gets switched on.",
            //     "Your own account of the AI-assisted extraction — whose idea it was, and what you had to design around when it gets things wrong.",
            //   ],
            //   note: "The reasoning written above is read off the screens. Correct anything I have inferred wrongly.",
            // },
          ],
        },
        {
          id: "scheduler",
          kicker: "Feature",
          heading: "The scheduler, and the calendar that runs it",
          blocks: [
            {
              kind: "prose",
              body: [
                "Everything the platform can run — a chain, an exposure test, a playbook, an emerging threat, an automated campaign — can also be run on a schedule. Which means the scheduler quietly became the surface where the whole product shows up in one place, and where the question stops being “what can I run” and becomes “what is already running, and when.”",
                "It ships as two views of the same data. The calendar is for “what is happening this month”. The list is for “tell me the rules”. Neither is a subset of the other, so they get equal billing behind one toggle rather than one being buried.",
              ],
            },
            {
              kind: "figure",
              src: "sch-calendar.png",
              frame: "wide",
              caption: "The calendar view — a month of scheduled simulations, colour-coded by type",
            },
            {
              kind: "prose",
              body: [
                "In the calendar, every entry is colour-coded by what kind of simulation it is, and carries a count when a day holds several of the same type. A recurrence icon marks anything repeating, so a one-off and the fourth instance of a weekly schedule are never confused. Days that failed carry an error dot; days that did not run say Skipped rather than showing nothing.",
                "That last one matters more than it looks. On a calendar, an empty cell and a cell where something was supposed to happen and did not are visually identical unless you say otherwise.",
              ],
            },
            {
              kind: "split",
              weight: "text",
              align: "start",
              left: {
                kind: "callout",
                title: "One colour system, two surfaces",
                body:
                  "The category colours are not decoration local to the calendar. The same six live on the filter chips, so the colour you filter by is the colour you then look for in the grid. Assign a palette once and both surfaces get easier to read.",
              },
              right: {
                kind: "figure",
                src: "sch-category-chips.png",
                frame: "card",
                caption: "The six simulation categories",
              },
            },
            {
              kind: "figure",
              src: "sch-list.png",
              frame: "wide",
              caption: "The list view — the same schedules, stated as rules",
            },
            {
              kind: "prose",
              body: [
                "The list exists because a calendar cannot tell you a rule. “Repeats every 3 weeks on Wednesday and Friday until Apr 16, 2026” is a sentence, and no arrangement of coloured blocks on a grid says it. So each row states the rule in plain English, names the assets it targets, and ends with the single most useful piece of status: when the next run is, or that every run has already completed.",
                "The type badge sits top-right and the coloured rail runs down the left edge of each card, which is the same colour language as the calendar, again.",
              ],
            },
            {
              kind: "figure",
              src: "sch-edit-drawer.png",
              frame: "scroll",
              caption: "Editing a schedule — recurrence, end condition, targets, and the sentence that checks your work",
            },
            {
              kind: "prose",
              body: [
                "The edit drawer is the hardest screen in the feature, because recurrence rules are famously easy to build and famously hard to verify. Someone sets a start date, a frequency, an interval, two weekdays and an end condition, and then has no way of knowing whether the thing they just described is the thing they meant.",
                "So the drawer ends by reading the whole configuration back as one sentence: repeat every three weeks on Wednesday and Friday at 10:00 AM, from this date to that one. Every control above it is an input to that sentence, and the sentence is the answer to “did I get this right”.",
                "The rest is guardrails. The start date says up front that it cannot be changed after the first run, rather than failing later. End condition is three explicit choices — never, after a number of runs, on a date — instead of an optional field that silently means “never” when left blank.",
              ],
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "sch-filters-empty.png", caption: "The filter panel, untouched" },
                { src: "sch-filters-applied.png", caption: "The same panel, six filters deep" },
              ],
            },
            {
              kind: "prose",
              body: [
                "The filter panel was drawn in both of its states, because the interesting one is not the empty version. As selections accumulate, the long select fields collapse into removable chips with an Add More button, so the panel shows you what you have chosen instead of making you reopen each dropdown to find out.",
                "The count in the footer is doing quiet work too: once you are six filters deep and looking at three results, “(6) Selected” next to Clear Filter(s) is the fastest explanation of why the screen behind looks so empty.",
              ],
            },
            {
              kind: "split",
              weight: "text",
              align: "start",
              left: {
                kind: "prose",
                body: [
                  "Picking targets has the same problem the filter has, one level down. A mature account has endpoints, mailboxes, web apps and firewalls, in numbers that make a flat alphabetical list useless.",
                  "So the picker groups by asset type, collapses each group, gives every group its own Select All, and pins what you have already chosen to the top with a Clear All. You can take every Windows machine in two clicks without scrolling past the Linux ones.",
                ],
              },
              right: {
                kind: "figure",
                src: "sch-asset-picker.png",
                frame: "card",
                caption: "The target picker, grouped by asset type",
              },
            },
            {
              kind: "figure",
              src: "schedule-details.png",
              frame: "scroll",
              caption: "A schedule, opened over the calendar: the rule, the trend, and every run it has produced",
            },
            {
              kind: "prose",
              body: [
                "Opening an entry slides its detail in beside the calendar rather than navigating away, so the month stays visible behind it. The drawer restates the rule, then gives the two things you came for: how results have trended over the schedule’s life, and the individual runs, each downloadable.",
              ],
            },
          ],
        },
        {
          id: "playbooks",
          kicker: "Feature",
          heading: "Playbooks",
          blocks: [
            {
              kind: "prose",
              body: [
                "A single attack technique tells you very little. Real adversaries run sequences, and the interesting question is not “can this one command get through” but “how far down the chain do they get before something stops them”. A playbook is that sequence, packaged: a curated set of attack chains, grouped into stages, aimed at a scenario a security team actually worries about.",
              ],
            },
            {
              kind: "figure",
              src: "playbooks-listing.png",
              frame: "wide",
              caption: "The playbook library — each card sized by what it covers",
            },
            {
              kind: "prose",
              body: [
                "Every card answers the same three questions in the same order: how big is this (chains and actions), what does it get me (exposures tackled, MITRE techniques covered), and is it current (last updated). Those are the terms a security lead compares options in, so they are the terms the card is built from rather than a description they would have to read four times.",
                "Some playbooks carry a Dynamic marker, which sets them apart from the fixed ones — a distinction the card makes with a single pill instead of a separate section of the library.",
              ],
            },
            {
              kind: "figure",
              src: "playbook-stage.png",
              caption: "One stage of a playbook, with its chains and its own scoreboard",
            },
            {
              kind: "prose",
              body: [
                "Inside, a playbook is broken into named stages that follow the shape of a real intrusion — this one covers initial compromise — and each stage gets a plain-language explanation of what it is simulating before any chain appears. That sentence is the difference between a tool a security engineer can use and a tool only its authors understand.",
                "Each stage also carries its own scoreboard: chains, actions and exposures on the left, with the successful and blocked split right underneath. So you can see which stage of the attack your defenses actually broke at, rather than getting one number for the whole playbook. Stages collapse, because a long playbook read end to end is a wall.",
              ],
            },
            /* TO WRITE — hidden for now. Uncomment to bring the checklist back. */
            // {
            //   kind: "todo",
            //   items: [
            //     "What a Dynamic playbook does differently — the pill is visible in the library but the behaviour behind it is not something I can read off a screen.",
            //     "Who authors playbooks: FourCore Labs, the customer, or both. The library header suggests recommended ones are curated, which is worth stating outright.",
            //     "The playbook listing card title and the stage screens are cropped or blurred — a full detail page would let this section show the whole structure rather than one stage.",
            //   ],
            // },
          ],
        },
        {
          id: "exposures",
          kicker: "Feature",
          heading: "Exposures",
          blocks: [
            {
              kind: "prose",
              body: [
                "Everything else in the platform produces evidence. Exposures is where that evidence turns into a list of things to fix, in order — which is the output the whole product exists to produce.",
              ],
            },
            {
              kind: "figure",
              src: "exposures-overview.png",
              frame: "wide",
              caption: "Exposures — coverage by control class, then the ranked list of what to fix",
            },
            {
              kind: "prose",
              body: [
                "The top of the screen is scoped by control class — endpoint, email, web, firewall — because that is how remediation work gets assigned. The team that fixes an email gateway is rarely the team that fixes endpoint policy, and each card carries both progress fractions a lead needs: how many exposures have been assessed at all, and how many actions have actually run.",
                "Below it, every exposure leads with a score. That score is the reason the page works: it turns a list into a ranking, and a ranking is the only form of this information anyone can act on before lunch.",
                "Each row then carries what you need to decide and what you need to act. The chips count the actions behind the finding and the detection rules that exist for it — Sigma and YARA, the formats a detection engineer already writes in — and the body text is remediation guidance, not a restatement of the problem. A finding that tells you what is wrong without telling you what to do is a ticket someone else has to write.",
              ],
            },
            /* TO WRITE — hidden for now. Uncomment to bring the checklist back. */
            // {
            //   kind: "todo",
            //   items: [
            //     "How the score is calculated, at whatever level of detail is safe to publish. It is the most important number on this screen and the case study currently cannot explain it.",
            //     "The exposure detail page, and the flow from an exposure to the runs that produced it.",
            //     "Whether remediation guidance is authored by FourCore Labs or pulled from the detection rules.",
            //   ],
            // },
          ],
        },
        {
          id: "practice",
          kicker: "Practice",
          heading: "How the work actually happens",
          blocks: [
            {
              kind: "prose",
              body: [
                "The title changed, but so did the shape of the work. Design at FourCore is not a request queue at the end of a product process, and most of what I do now sits earlier than the file.",
              ],
            },
            {
              kind: "list",
              items: [
                "Applied AI-assisted prompt engineering to speed up rapid prototyping and day-to-day product design work, getting to something testable in hours rather than days.",
                "Took part directly in user research, and turned what clients and users said into features that shipped.",
                "Worked directly with engineers, the CTO and the founders, rather than handing designs over a wall.",
                "Led the design function, and mentored a junior designer joining the team.",
              ],
            },
            /* TO WRITE — hidden for now. Uncomment to bring the checklist back. */
            // {
            //   kind: "todo",
            //   items: [
            //     "A concrete example of the AI-assisted prototyping: what you were trying to get to, what you prompted, and what it saved. One specific story lands harder than the claim.",
            //     "One research finding that changed a design decision, described in a way that does not identify the client.",
            //   ],
            // },
          ],
        },
        {
          id: "outcome",
          kicker: "Outcome",
          heading: "What it added up to",
          blocks: [
            {
              kind: "prose",
              body: [
                "Over the year that followed the redesign, the design system, and the new features, FourCore’s revenue doubled. That is a company result, not a design one: it belongs to the product, engineering and go-to-market work as much as anything I drew.",
                "What design can fairly claim is the part it made possible. A product that looks and behaves like enterprise software is one that enterprise buyers will take seriously in a demo. A design system meant features stopped taking as long to build. And restructuring how simulation results are presented turned dense security output into something a customer could act on in the room, which is usually where the buying decision actually gets made.",
              ],
            },
            {
              kind: "stats",
              items: [
                {
                  value: "2×",
                  label: "Company revenue growth over a year",
                  source: "Company-wide outcome across product, engineering and go-to-market",
                },
                { value: "40+", label: "New screens shipped" },
                { value: "5+", label: "Major features, concept to production" },
              ],
            },
          ],
        },
        {
          id: "growth",
          kicker: "Reflection",
          heading: "Two years from amateur to professional",
          blocks: [
            {
              kind: "prose",
              body: [
                "I joined FourCore as an intern who could make things look good and left that version of myself behind fairly quickly. For most of that time I was the only designer in the company, which means there is nobody to check your work and no house style to inherit. Every convention in the product is one you either set deliberately or set by accident.",
                "The biggest shift was learning to design for a domain I did not start out understanding. I could not have told you what lateral movement was on day one. Designing a security product means the interface is only as good as your grasp of what the user is actually looking at, and a lot of the past two years has been spent closing that gap by sitting with engineers, with the CTO, and with the people who use it.",
                "The rest of it was learning that the job is not the file. It is arguing for a direction, cutting scope when the deadline is real, keeping a system coherent while the product changes underneath it, and now helping someone else find their footing as a designer. That is the part that turned this from an internship into a career.",
              ],
            },
          ],
        },
      ],
    },
    /* the archive under the study — real exports only, no stand-ins, roughly
       in the order the case study walks through them */
    gallery: [
      "dashboard-refined.png",
      "dashboard.png",
      "mitre-attack.png",
      "threat-intel-listing.png",
      "threat-intel-detail.png",
      "integrations.png",
      "reports-listing.png",
      "assets-listing.png",
      "asset-detail.png",
      "asset-add-windows.png",
      "assets-table-later.png",
      "sign-in.png",
      "auth-register.png",
      "preferences.png",
      "settings-team-v2.png",
      "settings-audit-logs.png",
      "settings-rest-api.png",
      "empty-screen.png",
      "report-aborted-state.png",
      "alerts-drawer-final.png",
      "emerging-threats.png",
      "et-campaign-detail.png",
      "et-create-ai.png",
      "et-create-manual.png",
      "sch-calendar.png",
      "sch-list.png",
      "sch-edit-drawer.png",
      "schedule-details.png",
      "playbooks-listing.png",
      "playbook-stage.png",
      "exposures-overview.png",
    ],
    link: "https://fourcore.io/",
    featured: true,
  },
  {
    slug: "fourcore",
    dir: "fourcore",
    title: "FourCore: Landing",
    subtitle: "Breach and attack simulation platform",
    role: "UI/UX Design Intern",
    timeline: "2–3 month sprint",
    year: "2024",
    accent: "blue",
    professional: true,
    cover: "new-home-hero.jpg",
    hero: "new-home-hero.jpg",
    layout: "web",
    summary:
      "A ground-up overhaul of FourCore’s marketing website, the public face of a breach-and-attack-simulation platform, from a cluttered legacy site to a focused, modern dark experience.",
    overview: [
      "FourCore ATTACK is a breach-and-attack-simulation platform, security teams use it to continuously emulate real-world adversaries and validate that their defenses actually work. This was my first project at FourCore, taken on as a UI/UX design intern: a complete redesign of the company’s website.",
      "The old site had grown cluttered and inconsistent. I rebuilt the core pages end-to-end, home, platform, demo, about, and blog, across desktop and mobile, into a focused, high-contrast dark experience that reads as serious, credible security tooling.",
    ],
    highlights: [
      "Redesigned the FourCore website end-to-end (10+ screens, desktop & mobile) in a 2–3 month sprint.",
      "Replaced a cluttered legacy hero with a single, confident message, ‘Security Control Validation. Supercharged.’",
      "Established a consistent dark visual system and reusable components across every page.",
      "Turned a raw Calendly demo embed into a designed conversion flow.",
    ],
    tags: ["Website", "Product Marketing", "Cybersecurity", "B2B"],
    tools: ["Figma"],
    metrics: [
      { value: "10+", label: "Screens" },
      { value: "2–3 mo", label: "Sprint" },
      { value: "Live", label: "at fourcore.io" },
    ],
    caseStudy: [
      {
        heading: "The role, professional work at FourCore",
        body: [
          "This is my professional experience as Senior UI/UX Designer at FourCore. FourCore ATTACK is an adversary-emulation (breach-and-attack-simulation) platform that lets security teams continuously test whether their controls actually stop real-world threats. I lead the product’s design and, here, redesigned the company’s public website.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "The legacy site had grown cluttered and inconsistent: a dense hero, mixed light/dark sections, and a raw Calendly-embed demo page, with no unifying visual system. For a product that sells trust and precision to security buyers, the site didn’t reflect the sophistication of the tool underneath.",
        ],
      },
      {
        heading: "The goal",
        body: [
          "Rebuild the marketing site into a focused, credible, modern experience that communicates the product’s value at a glance, and establish one consistent visual system across every page.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "I redesigned the core pages end-to-end, home, platform, demo, about, and blog, for both desktop and mobile, in a two-month sprint. The site leads with a single, punchy message on a focused dark canvas, and every page is built from the same components so it all reads as one product.",
        ],
      },
      {
        heading: "Before → after",
        body: [
          "The clearest way to see the shift is side by side. The old hero (‘Validate Your Security Controls’) was heavy and split across mismatched sections; the new hero (‘Security Control Validation. Supercharged.’) is one confident line on a calm, high-contrast canvas. The old demo page was a bare Calendly embed; the redesign turns it into a designed flow.",
        ],
      },
      {
        heading: "The system",
        body: [
          "A dark navy base with a single electric-blue accent, consistent typography and spacing, and a reusable component set: so home, platform, about, and blog all feel unmistakably like FourCore.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "A cohesive, modern marketing site, live at fourcore.io, that presents FourCore ATTACK with the clarity and authority its security audience expects.",
        ],
      },
    ],
    study: {
      hero: {
        web: "new-home-hero.jpg",
        webLabel: "fourcore.io, redesigned",
        alt: "The redesigned FourCore homepage",
      },
      meta: [
        { label: "Company", value: "FourCore, breach & attack simulation (cybersecurity)" },
        { label: "Role", value: "UI/UX Design Intern, first project after joining" },
        { label: "Scope", value: "5–6 page marketing website, redesigned solo" },
        { label: "Timeline", value: "2–3 month sprint" },
        { label: "Status", value: "Live, and unchanged since it shipped" },
      ],
      glance: [
        { value: "5–6", label: "Pages redesigned end to end" },
        { value: "2–3 mo", label: "From brief to shipped site, solo" },
        { value: "Live", label: "at fourcore.io" },
      ],
      glanceNote:
        "A cybersecurity startup whose product had outgrown its website. The brief was simple to state and a real design problem underneath: make it read as a serious security product.",
      sections: [
        {
          id: "context",
          kicker: "Overview",
          heading: "The product outgrew the website",
          blocks: [
            {
              kind: "prose",
              body: [
                "The existing site didn’t read as a serious cybersecurity product. FourCore wanted something sharper, more modern and more credible-looking, something that matched where the product actually was rather than where it had started.",
              ],
            },
          ],
        },
        {
          id: "surfaces",
          kicker: "UI Design",
          heading: "Page by page",
          blocks: [
            {
              kind: "prose",
              body: [
                "A full redesign across five to six pages, from scratch: visual direction, layout, and the content structure of each page.",
              ],
            },
            {
              kind: "compare",
              label: "Home: what FourCore does, for whom, and why a security team should trust it",
              before: "old-home.jpg",
              after: "after-home.png",
            },
            {
              kind: "compare",
              label: "About: the credibility page, in a category where that question gets asked early",
              before: "old-about.jpg",
              after: "after-about.png",
            },
            {
              kind: "compare",
              label: "Demo: the conversion surface, and the one page that had to do commercial work",
              before: "old-demo.jpg",
              after: "after-demo.png",
            },
            {
              kind: "figure",
              src: "new-blogs.jpg",
              frame: "crop",
              caption:
                "Blog: a publishing surface for security research, which is how a company like this earns attention. No before exists for this one; it didn’t have a blog until the redesign. Cropped from a full-page capture.",
            },
          ],
        },
        {
          id: "decisions",
          kicker: "Key Decision",
          heading: "Designing for a company that had already arrived",
          blocks: [
            {
              kind: "split",
              weight: "text",
              left: {
                kind: "decision",
                title: "Make it look established, not launched",
                body: [
                  "The old site read as pre-launch. Not broken, just new. It carried the visual signals of a product still finding its footing, at a point where the product itself had long since moved past that.",
                  "In security that’s a commercial problem, not a cosmetic one. FourCore sells to teams whose job is to be suspicious, and who are being asked to point the thing at their live environment. A site that looks provisional makes the product look provisional.",
                  "So the brief wasn’t “modernise” in the abstract. It was to make the platform feel well-placed, premium and trustworthy: and every choice underneath, typography included, was made against that one test: does this read as a company that has arrived, or one that just showed up?",
                ],
              },
              right: {
                kind: "figure",
                src: "old-home-menu.jpg",
                frame: "web",
                caption: "The site the redesign was reacting to.",
              },
            },
          ],
        },
        {
          id: "outcome",
          kicker: "Outcome & Reflection",
          heading: "Still standing",
          blocks: [
            {
              kind: "prose",
              body: [
                "The site has been live since it shipped and hasn’t needed a further redesign: which, for a marketing site at a startup that has kept moving, is the outcome that matters.",
                "It was also the first thing I ever shipped. Redesigning something from scratch turned out to be a different skill from designing screens: the work was less about what I wanted to make and more about reading what the company actually needed, then finding the version of that I could argue for and hand over.",
                "Turning a client’s sense of what’s wrong into something actionable is the part I’d underestimated. “It should feel more modern” isn’t a brief, the job was getting from that to a decision I could defend on every page.",
                "I was an intern when I took it on, and was converted to a full-time role after it went live.",
              ],
            },
          ],
        },
      ],
    },
    gallery: [
      "landing-01.png",
      "landing-02.png",
      "landing-03.png",
      "landing-04.png",
      "landing-05.png",
      "landing-06.png",
      "landing-07.png",
      "landing-08.png",
      "landing-09.png",
    ],
    link: "https://fourcore.io/",
    featured: true,
  },
  {
    slug: "formi",
    dir: "formi",
    title: "Formi",
    subtitle: "Physiotherapy platform, two-sided product",
    role: "Independent Product Design",
    timeline: "Ongoing",
    year: "2026",
    accent: "teal",
    cover: "formi-webapp.png",
    hero: "dashboard.png",
    heroGrid: ["patient-progress.png", "analytics.png", "programme-builder-step2.png", "alerts.png"],
    layout: "web",
    captions: true,
    summary:
      "Evolved from ‘Proctify’, a patients-only college project, into Formi, a full two-sided platform connecting physiotherapists and patients through AI-guided remote recovery.",
    overview: [
      "Formi is a physiotherapist-first digital health platform that keeps the care relationship productive between clinic visits: a professional practice-management and remote-monitoring tool for therapists, and a structured, AI-guided recovery experience for patients.",
      "It began as ‘Proctify’, a patients-only college project (Top 15 at the Smart India Hackathon, Top 50 Global at the Google Solution Challenge). I independently reworked it into a full two-sided product: introducing the therapist-facing dashboard the original never scoped, and authoring the complete PRD and design system.",
      "The therapist dashboard spans the whole practice: a home view that surfaces the patients who need attention, a practice-analytics layer for clinical outcomes and revenue, a step-by-step programme builder, per-patient progress tracking (pain trends, form accuracy, joint range), scheduling, in-app messaging, alerts, billing, and a physiotherapist-first onboarding flow.",
    ],
    highlights: [
      "Designed the full therapist dashboard: from a needs-attention home view to practice analytics, scheduling, and billing.",
      "Built a step-by-step programme builder and per-patient progress tracking (pain, form accuracy, joint range).",
      "Introduced the therapist-facing surface the original patients-only concept never scoped.",
      "Authored the complete PRD and design system, a 23-screen breakdown across both experiences.",
    ],
    tags: ["Product Design", "Design System", "Healthtech", "0 → 1"],
    tools: ["Figma"],
    metrics: [
      { value: "23", label: "Screens" },
      { value: "2", label: "Sided surfaces" },
      { value: "Top 15", label: "Smart India Hackathon" },
    ],
    caseStudy: [
      {
        heading: "The problem, physios giving care away for free",
        body: [
          "India has roughly one physiotherapist for every 25,000 people. Independent practitioners already deliver remote care between visits: but informally, over WhatsApp: unpaid, invisible, and impossible to scale past 10–15 active patients without burning out.",
          "The result is revenue leakage from dropout, WhatsApp chaos with no visibility between visits, ad-hoc cash/UPI billing, and progress that’s anecdotal rather than evidenced.",
        ],
      },
      {
        heading: "The strategic bet, physiotherapist-first",
        body: [
          "Most health apps acquire patients directly and treat the doctor as a distribution channel. Formi inverts that: the physiotherapist is the primary customer. They build programmes, set prices, and invite patients, the patient’s app is an extension of the therapist’s clinical work.",
          "The model is financially aligned, Formi only earns a platform fee (8–12%) when a programme payment clears, so the product’s incentive is the therapist’s: more completed programmes. That’s the north-star metric, completed programmes per therapist per month.",
        ],
      },
      {
        heading: "The design challenge",
        body: [
          "The dashboard had to be a practice-management tool, not just a monitoring screen, reducing the cognitive load of running a multi-patient practice. The guiding constraint: a therapist should be able to do their full daily patient review in under 10 minutes.",
          "That meant surfacing what needs attention without noise, and making billing and communication effortless.",
        ],
      },
      {
        heading: "Surfacing what matters, the overview dashboard",
        body: [
          "The home screen prioritises by urgency: flagged patients (pain spike, form deterioration, missed sessions) rise to the top, then active patients by last session, then upcoming starts. A banner states it plainly, ‘X patients need your attention.’",
          "Each patient card carries last session, pain-trend arrow, completion %, payment status, and any active flags, so the therapist triages a whole caseload at a glance.",
        ],
      },
      {
        heading: "The programme builder, the gateway",
        body: [
          "Programme creation is the therapist’s primary action and the single gate every patient enters through. I designed a builder for setting duration, frequency, and per-exercise sets / reps / hold / rest from a clinician-validated exercise library: with per-exercise notes, transparent instalment pricing (platform fee shown before publishing), reusable templates, and draft states.",
        ],
      },
      {
        heading: "Alerts, the clinical safety layer",
        body: [
          "The alert system is the platform’s most important safety layer. It’s tiered Critical / Moderate / Informational so it surfaces action without flooding the therapist with noise: pain-spike (post-session pain up 2+ vs. the 3-session average), form-deterioration, missed-session, instalment-due, and programme-completion-approaching flags: each paired with a suggested action.",
        ],
      },
      {
        heading: "Billing without the admin",
        body: [
          "To replace cash-and-WhatsApp billing, the dashboard handles the money: a revenue view of collected vs. expected, per-patient payment logs with the platform fee shown, automatic instalment reminders, offline-payment marking, GST-compliant receipts, and weekly payouts, turning previously unbillable clinical time into tracked revenue.",
        ],
      },
      {
        heading: "One system, two apps, and the outcome",
        body: [
          "Everything sits on a design system I built from the ground up, the same teal, Inter type, and 4pt spacing shared with the patient app, so the two-sided product feels like one product, with dense clinical data rendered as calm, scannable views.",
          "The result: a 23-screen therapist dashboard spanning programme creation, patient monitoring, alerts, scheduling, billing, and reporting: the clinical-oversight half of Formi’s two-sided model, evolved from a patients-only college project into a full practice-management platform.",
        ],
      },
    ],
    study: {
      hero: {
        web: "hero-dashboard.png",
        app: "hero-app.png",
        webLabel: "Therapist dashboard (web)",
        appLabel: "Patient app (iOS & Android)",
        alt: "The Formi therapist dashboard with the patient app alongside it",
      },
      meta: [
        { label: "Role", value: "Product Designer: 0 to 1 (PRD, research, UX, UI, design system)" },
        { label: "Platforms", value: "Web dashboard for physiotherapists · Mobile app for patients" },
        { label: "Scope", value: "53 screens across two products, one connected system" },
        { label: "Timeline", value: "Ongoing · 2026" },
      ],
      glance: [
        { value: "53", label: "Screens across two products" },
        { value: "23 + 30", label: "Therapist dashboard + patient app" },
        { value: "8–12%", label: "Platform fee, the whole business model" },
        { value: "Top 50", label: "Google Solution Challenge, Global (as Proctify)" },
      ],
      glanceNote:
        "A physiotherapist-first platform that keeps the care relationship productive between clinic visits. Evolved from ‘Proctify’, a patients-only college project, into a full two-sided product: I authored the PRD, the research, and the design system, and introduced the therapist-facing half the original never scoped.",
      sections: [
        {
          id: "context",
          kicker: "Overview",
          heading: "Recovery doesn’t happen in the clinic",
          blocks: [
            {
              kind: "lead",
              text: "Physiotherapy recovery extends far beyond the appointment, yet almost every tool treats it as session-bound.",
            },
            {
              kind: "prose",
              body: [
                "A physiotherapist sees a patient for forty minutes a week. The other six days and twenty-three hours, the part where recovery actually happens or doesn’t, are invisible to them. Patients go home with a printed sheet of exercises and no way to know whether they’re doing them correctly.",
                "Formi closes that gap from both ends: a practice-management dashboard that gives therapists visibility into what happens at home, and a mobile app that gives patients real-time guidance while they exercise. One connected system, two very different jobs.",
              ],
            },
            {
              kind: "figure",
              src: "hero-dashboard.png",
              frame: "web",
              caption: "The therapist’s home view, the whole caseload triaged by who needs attention first.",
            },
          ],
        },
        {
          id: "problem",
          kicker: "Problem",
          heading: "Care given away for free, in a gap no one can see",
          blocks: [
            {
              kind: "prose",
              body: [
                "India has roughly one physiotherapist for every 25,000 people. Independent practitioners already deliver remote care between visits: but informally, over WhatsApp: unpaid, invisible, and impossible to scale past 10–15 active patients without burning out.",
                "The result is revenue leakage from dropout, no clinical visibility between visits, ad-hoc cash and UPI billing, and progress that’s anecdotal rather than evidenced. Two completely different jobs exist inside one recovery programme, therapists manage it, patients live it, and most tools address only one side.",
              ],
            },
            {
              kind: "stats",
              items: [
                {
                  value: "35%",
                  label: "of physiotherapy patients fully adhere to their home exercise programme",
                  source: "Sprypt, 2025",
                },
                {
                  value: "50.6%",
                  label: "potential revenue lost to patients dropping out before treatment goals are met",
                  source: "Physiotutors clinical research review",
                },
                {
                  value: "7 of 10",
                  label: "trials showed an adherence boost from digital tracking tools",
                  source: "Physitrack RCT meta-review",
                },
              ],
            },
            {
              kind: "callout",
              title: "The gap",
              body:
                "Recovery breaks down between appointments, and neither side can see it happening.",
            },
          ],
        },
        {
          id: "research",
          kicker: "User Research",
          heading: "Two users, one programme",
          blocks: [
            {
              kind: "prose",
              body: [
                "I built the product around two people whose needs only overlap at one point: the programme itself. Everything else, what they want to see, when they open the app, what a good day looks like, pulls in opposite directions.",
              ],
            },
            {
              kind: "persona",
              name: "Dr. Ananya Rao",
              age: 34,
              role: "Independent physiotherapist running a small clinic",
              // Unsplash photo-1623854767648-e7bb8009f0db (Unsplash License,
              // free to use, no attribution required)
              photo: "persona-ananya.jpg",
              quote:
                "I can prescribe the right programme, but I have no idea if it’s actually happening at home.",
              goals: [
                "See actual patient behaviour between visits",
                "Cut down manual notes and follow-up chasing",
                "Keep patients engaged through the full programme",
              ],
              frustrations: [
                "No visibility once the patient leaves",
                "Forced to rely on inaccurate self-reporting",
                "Existing software prioritises billing over patient care",
              ],
            },
            {
              kind: "persona",
              name: "Mary Cooper",
              age: 56,
              role: "Post-operative recovery patient",
              // Unsplash photo-1764173039248-78beb636931a (Unsplash License,
              // free to use, no attribution required)
              photo: "persona-mary.jpg",
              quote:
                "I do the exercises, but I never know if I’m doing them properly until my next appointment.",
              goals: [
                "Recover fully and safely without reinjury",
                "Get feedback on her form while she exercises",
                "Track pain trends and see progress accumulate",
              ],
              frustrations: [
                "Zero feedback between appointments",
                "Uncertain about exercise form when alone",
                "Loses track of progress over time",
              ],
            },
          ],
        },
        {
          id: "themes",
          kicker: "Synthesis",
          heading: "From insights to three themes",
          blocks: [
            {
              kind: "prose",
              body: [
                "Clustering what both groups told me produced three themes: and the useful finding was that each theme shows up on both sides of the relationship, as the same problem wearing different clothes.",
              ],
            },
            {
              kind: "themes",
              columns: ["Therapist", "Patient"],
              rows: [
                {
                  label: "Visibility",
                  cells: [
                    [
                      "Can’t see what happens after the patient leaves",
                      "By the time I find out something’s wrong, it’s been two sessions",
                    ],
                    [
                      "Don’t know if I’m doing this right",
                      "I only find out my form was wrong at the next appointment",
                    ],
                  ],
                },
                {
                  label: "Continuity",
                  cells: [
                    ["I’m re-explaining the same programme every time"],
                    [
                      "I forget what I was even told to focus on",
                      "Every visit feels disconnected from the last",
                    ],
                  ],
                },
                {
                  label: "Motivation",
                  cells: [
                    [
                      "Patients disengage without check-ins",
                      "Silence between sessions usually means they’ve stopped",
                      "No visibility means no way to intervene early",
                    ],
                    [
                      "It’s easy to quit when no one notices",
                      "Hard to stay consistent when I can’t see progress",
                    ],
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "strategy",
          kicker: "Strategy",
          heading: "The bet, physiotherapist-first",
          blocks: [
            {
              kind: "prose",
              body: [
                "Most health apps acquire patients directly and treat the clinician as a distribution channel. Formi inverts that. The physiotherapist is the primary customer: they build programmes, set prices, and invite patients. The patient’s app is an extension of the therapist’s clinical work, not a separate product competing for the same attention.",
                "That choice set the constraint that shaped every dashboard screen: a therapist should be able to complete their full daily patient review in under ten minutes.",
              ],
            },
            {
              kind: "callout",
              title: "North star",
              body: "Completed programmes per therapist per month: not signups, not sessions logged.",
            },
          ],
        },
        {
          id: "system",
          kicker: "Design System",
          heading: "One system, two apps",
          blocks: [
            {
              kind: "prose",
              body: [
                // TODO: the Vercel case study says Lato; the copy below and the
                // formi-app entry both say Inter. Confirm which is correct.
                "Both products sit on a design system I built from the ground up, shared colour, type, and a 4pt spacing base, so the two-sided product reads as one product rather than two apps that happen to talk to each other. Dense clinical data had to render as calm, scannable views.",
              ],
            },
            {
              kind: "swatches",
              items: [
                { hex: "#1A7A8A", name: "Primary teal" },
                { hex: "#E6F4F6", name: "Teal light" },
                { hex: "#F97316", name: "Orange accent" },
                { hex: "#FFF0E8", name: "Warm off-white" },
                { hex: "#1A1A18", name: "Near-black" },
                { hex: "#E2E8F0", name: "Slate" },
              ],
            },
            {
              kind: "split",
              left: {
                kind: "callout",
                title: "The logomark",
                body:
                  "Recovery isn’t a straight line: it loops, dips, and comes back around. The arc was the shape that captured that without needing to say it, and it reappears through the product as progress rings and session markers.",
              },
              right: {
                kind: "figure",
                src: "logo-grid.png",
                frame: "web",
                caption:
                  "Constructed, not drawn: both arcs are cut from two circles overlapping a 76px square.",
              },
            },
          ],
        },
        {
          id: "surfaces",
          kicker: "UI Design",
          heading: "The therapist dashboard, surface by surface",
          blocks: [
            {
              kind: "scrolly",
              steps: [
                {
                  src: "hero-dashboard.png",
                  title: "Triage before anything else",
                  body: [
                    "The home screen sorts by urgency, not alphabetically. Flagged patients rise to the top, pain spike, form deterioration, missed sessions, then active patients by last session, then upcoming starts.",
                    "A banner states the day plainly: X patients need your attention. That single line is what makes a ten-minute daily review possible.",
                  ],
                },
                {
                  src: "ui-patient-overview.png",
                  title: "The patient overview",
                  body: [
                    "Everything needed to prepare for a session in one view: health summary and medications on the left, current status on the right, clinical snapshot underneath.",
                    "Progress is stated in plain language: Post-Operative Knee Recovery, week 5 of 12, 42% complete. Pain score, form accuracy, joint range and adherence sit together, so the numbers are read as one clinical picture rather than four separate metrics.",
                  ],
                },
                {
                  src: "ui-programme-library.png",
                  title: "Programmes as reusable objects",
                  body: [
                    "Most programmes start as a variation of a previous one, not a blank page. The library shows duration, exercise count, enrolled patients and progress at a glance, with view, edit and duplicate on every card.",
                    "Creating from scratch is deliberately the one dashed card in the grid: available, but not the default path.",
                  ],
                },
                {
                  src: "ui-programme-builder.png",
                  title: "The programme builder",
                  body: [
                    "Programme creation is the therapist’s primary action and the single gate every patient enters through. Exercises are dragged from a clinician-validated library into the session, each with its own sets, reps, hold and rest.",
                    "Therapist instructions travel with the exercise, and a patient view preview shows exactly what will appear on the phone, so the therapist never has to guess how their prescription reads at the other end.",
                  ],
                },
                {
                  src: "ui-alerts.png",
                  title: "Alerts as the safety layer",
                  body: [
                    "Tiered Critical, Moderate and Informational so urgency stays visually distinct. A pain spike carries its own suggested action, “pain increased from 4/10 to 7/10 over the last two sessions”, rather than leaving the therapist to work out what changed.",
                    "Missed sessions, form deterioration, instalments due and completion milestones all run through the same tiering. One mental model to learn, not five, and every alert ends in a button rather than a dead end.",
                  ],
                },
                {
                  src: "ui-revenue.png",
                  title: "Revenue that tracks the clinical goal",
                  body: [
                    "The money view replaces cash-and-WhatsApp billing: revenue per clinic hour, package sell-through, instalment tracking and weekly payouts, turning previously unbillable clinical time into tracked revenue.",
                    "Completion rate sits in the header row beside revenue, and the treatment funnel states the intent in its own subtitle: completions are the goal, not a drop-off. The commercial metrics and the clinical ones point the same way by construction.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "decisions",
          kicker: "Key Decisions",
          heading: "Two choices that defined the product",
          blocks: [
            {
              kind: "split",
              weight: "text",
              left: {
                kind: "decision",
                title: "A platform fee, not a subscription",
                body: [
                  "Most tools in this space charge a subscription, either a flat cost to the therapist or a paid app for the patient. Both create the wrong incentive: a therapist pays whether they use it well or not, a patient pays regardless of how recovery is actually going.",
                  "Formi takes a different route. Patients pay nothing. Therapists are charged a small platform fee, 8 to 12%, only when they prescribe a programme. No programme, no fee.",
                  "That decision shaped the dashboard’s revenue section too. Not a subscription screen, but a live read on programmes prescribed and earnings tied to real usage. And it meant patients get zero friction onboarding, no paywall sitting in the middle of a recovery journey.",
                ],
              },
              right: {
                kind: "figure",
                src: "decision-financial-summary.png",
                frame: "card",
              },
            },
            {
              kind: "split",
              weight: "text",
              left: {
                kind: "decision",
                title: "Completion rate over renewal rate",
                body: [
                  "The obvious metric for a platform like this is renewals. But optimising for renewals quietly rewards keeping someone in treatment longer than they need to be, which is the opposite of what a good physiotherapist is trying to do.",
                  "So the dashboard leads with completion rate instead. A patient finishing their programme and being discharged reads as a win, not as revenue walking out of the door.",
                  "It changes what the funnel is for. Early drop-off stops being churn to win back and becomes a clinical risk group to intervene on, which is exactly what the alerts layer already exists to catch.",
                ],
              },
              right: {
                kind: "figure",
                src: "decision-treatment-funnel.png",
                frame: "card",
              },
            },
          ],
        },
        {
          id: "outcome",
          kicker: "Outcome & Reflection",
          heading: "What shipped, and what’s still unproven",
          blocks: [
            {
              kind: "stats",
              items: [
                { value: "53", label: "Screens across two products" },
                { value: "7", label: "Functional groups in the dashboard" },
                { value: "2", label: "Native platforms specified" },
                { value: "1", label: "Design system shared by both apps" },
              ],
            },
            {
              kind: "prose",
              body: [
                "The work landed as a developer-ready specification, not a mood board. A 23-screen therapist dashboard spanning programme creation, patient monitoring, alerts, scheduling, billing and reporting; a 30-screen patient app carrying someone from a therapist’s code through AI-tracked sessions to discharge. Both are composed from one design system, annotated with states, spacing and interactions.",
                "It began as ‘Proctify’, a patients-only college project. The therapist half, the half that makes it a business rather than an app, wasn’t in the original scope at all.",
              ],
            },
            {
              kind: "callout",
              title: "Being straight about it",
              body:
                "None of this is validated. It’s a designed system with an argument behind it, not a product with users.",
            },
            {
              // TODO: reflection drafted from the documented validation gaps —
              // review the wording before publishing.
              kind: "prose",
              body: [
                "Two things I’d do differently. I designed the pose-tracking session on reasoning alone; it’s the riskiest surface in the product and the one that most needed a rough prototype in someone’s hands early, not a polished spec late. And I’d instrument completion rate from the first build rather than treating it as a reporting feature: the entire business model rests on that single number, so it should have been the first thing measurable.",
              ],
            },
            {
              kind: "list",
              items: [
                "Usability-test the guided session with real patients, on low-end Android, on the floor",
                "Pilot with clinics to find out whether an 8–12% fee survives how therapists actually price",
                "Track completion rate from day one, the north-star metric has to be observable",
              ],
            },
            {
              kind: "quote",
              text: "0 to 1 design is less about the pixels, and more about deciding what not to build yet.",
              author: "What I took away",
            },
          ],
        },
      ],
    },
    gallery: [
      "analytics.png",
      "patient-progress.png",
      "patient-profile.png",
      "programme-library.png",
      "programme-builder-step1.png",
      "programme-builder-step2.png",
      "programme-builder-step3.png",
      "programme-builder-step4.png",
      "programme-published.png",
      "schedule.png",
      "session-log.png",
      "inbox.png",
      "messages.png",
      "alerts.png",
      "notifications.png",
      "billing.png",
      "reports.png",
      "onboarding-flow.png",
      "onboarding-profile.png",
      "onboarding-split-variation.png",
      "settings-profile.png",
    ],
    featured: true,
  },
  {
    slug: "formi-app",
    dir: "formi-app",
    title: "Formi: Patient App",
    subtitle: "AI-guided recovery, patient mobile app",
    role: "Independent Product Design",
    timeline: "Ongoing",
    year: "2026",
    accent: "teal",
    cover: "home.png",
    hero: "splash.png",
    layout: "mobile",
    captions: true,
    summary:
      "The patient half of Formi: a React Native app that turns a physiotherapist’s prescription into a guided, AI-tracked daily recovery experience.",
    overview: [
      "Formi’s patient app is the home half of a two-sided physiotherapy platform. It answers one question: what does a patient do after they leave the clinic? It turns a physiotherapist’s prescription into a guided daily recovery experience on the phone.",
      "Built for React Native (iOS + Android), it carries a patient from a therapist’s code through AI-tracked exercise sessions, pain logging, progress, and messaging: designed for real patients: often older, low digital literacy, exercising one-handed on the floor with patchy signal.",
    ],
    highlights: [
      "Authored the complete patient-app design process, 30 screens across 7 groups and 5 journey phases.",
      "Adapted the web design system to mobile: touch targets, thumb-zone actions, safe areas, and a 14px font floor that survives 1.3× system scaling.",
      "Designed the core AI exercise session: live pose-tracking UI, real-time form correction, and glanceable rep counting.",
      "Designed the activation funnel, code → programme preview → payment → account → health profile.",
    ],
    tags: ["Mobile", "Product Design", "Healthtech", "React Native"],
    tools: ["Figma", "React Native"],
    metrics: [
      { value: "30", label: "Screens designed" },
      { value: "5", label: "Journey phases" },
      { value: "2", label: "Platforms (iOS + Android)" },
    ],
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "Physiotherapy has a completion problem: 50–65% of patients never finish their prescribed home programme. Form breaks down without supervision, pain reduction gets mistaken for full recovery, and there’s no accountability between clinic visits.",
          "The patient app is the connective tissue for that gap: it has to keep a patient exercising correctly, safely, and motivated, entirely on their own phone.",
        ],
      },
      {
        heading: "Who it’s for, and the constraints that shaped it",
        body: [
          "The primary users are patients aged 30–65 across urban and semi-urban India, with low-to-moderate digital literacy, often exercising one-handed while lying on the floor or steadying a limb.",
          "That reality set hard, non-negotiable constraints for every screen:",
        ],
        list: [
          "44/48pt minimum touch targets and thumb-zone primary actions, the session must be completable one-handed",
          "A 14px body-text floor that doesn’t break at 1.3× system font scaling",
          "Offline-first sessions with a clear sync state, patients exercise where signal is poor",
          "Visual restraint during live camera tracking so pose estimation doesn’t drop frames on low-end Android",
        ],
      },
      {
        heading: "The design process",
        body: [
          "I worked in a deliberate order, mobile design system, then user-flow diagrams, lo-fi wireframes, a component library, high-fidelity screens, a device prototype, and finally developer handoff, because skipping the system and wireframe stages is expensive to fix later.",
          "The full journey was mapped into five phases with clear entry and exit conditions: Discovery → Activation → Daily use → Progress → Completion. Every screen belongs to exactly one phase.",
        ],
      },
      {
        heading: "One design system, two apps",
        body: [
          "The patient app inherits the therapist dashboard’s design system: the same teal (#1A7A8A), Inter type, and 4pt spacing base, adapted for mobile. I built the component library first: a 10-dot pain scale, progress rings, a form-score badge, the AI-correction banner, streak indicators, and skeleton loaders: so every screen is composed from consistent, tested blocks.",
        ],
      },
      {
        heading: "Activation & payment, the make-or-break funnel",
        body: [
          "The most critical business interaction. A patient enters the code their physiotherapist shared, then sees a full programme preview, therapist, condition, duration, and what’s included, so they know exactly what they’re paying for before any account exists.",
          "Payment runs through Razorpay; account creation happens after payment clears (a strong completion incentive), followed by a quick health profile and a deliberate ‘programme ready’ arrival moment.",
        ],
      },
      {
        heading: "The daily exercise session, the core",
        body: [
          "This is the hardest surface in the product: the camera is live, AI is processing, and the patient is physically moving: so every element has to be glanceable, never something to stop and read.",
          "A pre-session pain and energy check-in (with a red-flag gate that notifies the therapist if pain is high) leads into a live camera view with a MediaPipe skeleton overlay, colour-coded green / amber / red by form. A large mono rep counter pulses on each rep, a calm voice cue and a single correction banner nudge form, and a rest timer scores each set.",
        ],
      },
      {
        heading: "Progress, motivation & retention",
        body: [
          "To fight dropout, the app scaffolds motivation: streaks that rest days don’t break, a weekly day-chip row, pain-trend sparklines, milestone confetti, and progress rings, plus reports and direct messaging that keep the therapist present between visits.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "The result is a complete, developer-ready design system and a 30-screen React Native specification: the patient half of Formi’s two-sided model, annotated for engineering with states, spacing, and interactions.",
        ],
      },
    ],
    /* Companion piece to `formi` — picks up from the dashboard case study
       rather than restating its problem/research narrative. */
    study: {
      hero: {
        app: "/projects/formi/hero-app.png",
        appLabel: "Patient app (iOS & Android)",
        alt: "The Formi patient app join screen",
      },
      meta: [
        { label: "Role", value: "Product Designer: UX, UI, and design system (shared with the dashboard)" },
        { label: "Platform", value: "Native mobile, iOS & Android" },
        { label: "Scope", value: "30 screens" },
        { label: "Timeline", value: "Ongoing · 2026, same engagement as the dashboard" },
      ],
      glance: [
        { value: "30", label: "Screens in the patient app" },
        { value: "1", label: "Design system shared with the dashboard" },
        { value: "2", label: "Native platforms, iOS & Android" },
      ],
      glanceNote:
        "The other half of Formi. Where the therapist dashboard is built for a ten-minute daily review, the patient app is built for the moment someone is alone, mid-exercise, and needs to know whether they’re doing it right.",
      sections: [
        {
          id: "context",
          kicker: "Overview",
          heading: "The half of the platform patients actually live in",
          blocks: [
            {
              kind: "prose",
              body: [
                "The therapist dashboard exists to give clinicians visibility between appointments. The patient app is the other end of that same connection: where the recovery actually happens: doing the exercises, getting real-time form feedback, watching pain and progress move week to week.",
                "This page picks up from the dashboard case study rather than repeating it, the platform research and the business model live there. What follows is the same product seen from the other end.",
              ],
            },
          ],
        },
        {
          id: "problem",
          kicker: "Problem",
          heading: "Recovery is something you do alone, badly, and can’t tell",
          blocks: [
            {
              kind: "lead",
              text:
                "A patient leaves the clinic with a sheet of exercises and no way to know whether they’re doing any of them correctly.",
            },
            {
              kind: "prose",
              body: [
                "Physiotherapy has a completion problem. Most of a programme happens at home, unsupervised, in the days between appointments, and that is exactly where it falls apart. Form degrades with nobody watching. Pain easing gets mistaken for the injury being healed, so people stop early. Nothing and nobody registers that they stopped until the next visit, if there is one.",
                "The people doing this are not the people the fitness-app category is designed for. They’re 30–65, across urban and semi-urban India, with low-to-moderate digital literacy: often exercising one-handed while lying on the floor or steadying a limb, on a mid-range Android, on patchy signal. Every assumption a polished consumer app makes about attention, dexterity and connectivity is wrong here.",
              ],
            },
            {
              kind: "stats",
              items: [
                {
                  value: "50–65%",
                  label: "of patients never finish their prescribed home programme",
                },
                {
                  value: "35%",
                  label: "fully adhere to a home exercise programme",
                  source: "Sprypt, 2025",
                },
              ],
            },
            {
              kind: "callout",
              title: "The gap this app has to close",
              body:
                "Between one appointment and the next, nobody, not the patient, not the therapist, can tell whether recovery is actually happening.",
            },
            {
              kind: "prose",
              body: [
                "And the patient is often not alone. A family member or guardian is frequently the one holding the phone, positioning the camera, or watching to catch the moment something looks wrong, carrying real responsibility for the recovery while the product speaks only to the patient.",
              ],
            },
          ],
        },
        {
          id: "user",
          kicker: "Who it’s for",
          heading: "Two people in the room, not one",
          blocks: [
            {
              kind: "prose",
              body: [
                "A session at home is rarely a solo activity. There is the person recovering, and very often a second person holding the phone, setting up the camera, or just watching to make sure nothing goes wrong. The app has to work for both without ever confusing whose turn it is to act.",
              ],
            },
            {
              kind: "persona",
              name: "Mary Cooper",
              age: 56,
              role: "Post-operative recovery patient",
              photo: "/projects/formi/persona-mary.jpg",
              quote:
                "I do the exercises, but I never know if I’m doing them properly until my next appointment.",
              goals: [
                "Recover fully and safely without reinjury",
                "Get feedback on form while exercising, not a week later",
                "Track pain trends and see progress accumulate",
              ],
              frustrations: [
                "Zero feedback between appointments",
                "Uncertain about form when alone",
                "Loses track of progress over time",
              ],
            },
            {
              kind: "persona",
              name: "Rajesh Shah",
              age: 58,
              role: "Family caregiver, helps his wife through her daily sessions at home",
              photo: "persona-rajesh.png",
              quote:
                "I want to help, but I genuinely don’t know if I’m helping or getting in the way.",
              goals: [
                "Know what he’s actually meant to do during a session",
                "Be sure she isn’t pushing too hard and undoing the surgery",
                "Know when something is worth calling the physiotherapist about",
              ],
              frustrations: [
                "Every instruction is written for the patient; none of it is addressed to him",
                "Can’t tell ordinary post-exercise soreness from the kind that means stop",
                "Only finds out something was being done wrong at the next appointment",
              ],
            },
            {
              kind: "prose",
              body: [
                "The full persona work sits on the dashboard case study: this is here so the page stands on its own for anyone landing on it directly.",
              ],
            },
          ],
        },
        {
          id: "surfaces",
          kicker: "UI Design",
          heading: "What the app does",
          blocks: [
            {
              kind: "scrolly",
              steps: [
                {
                  src: [
                    "ui-onboarding-join.png",
                    "ui-onboarding-preview.png",
                    "ui-onboarding-payment.png",
                  ],
                  title: "Onboarding, from a link the physiotherapist sends",
                  body: [
                    "A patient arrives through a link their physiotherapist gave them, and sees a preview of the programme before committing to anything: condition, duration, what’s included.",
                    "Payment sits behind that preview as the gate: the programme activates the moment payment clears. Nobody is asked to create an account before they know what they’re buying.",
                  ],
                },
                {
                  src: [
                    "ui-session-live.png",
                    "ui-session-camera-setup.png",
                    "ui-session-rest.png",
                  ],
                  title: "AI pose-tracking, with voice and visual assistance",
                  body: [
                    "During a session the AI tracks the patient’s pose and coaches them through it live: spoken cues alongside visual ones, so the patient never has to stop mid-movement to read anything.",
                    "That dual channel is also what makes the session usable by a caregiver. A family member holding the phone can follow the same cues and correct the patient themselves, which is the only way this works for someone who can’t manage it alone.",
                  ],
                },
                {
                  src: ["ui-messaging-conversation.png", "ui-messaging-video-call.png"],
                  title: "The physiotherapist stays reachable",
                  body: [
                    "Scheduled check-ins put the physiotherapist in the patient’s week by default rather than on request, so contact isn’t something the patient has to work up to asking for.",
                    "Emergencies skip the schedule. A pain spike opens an immediate route to the therapist, messaging or a video call, because the alternative is a frightened patient guessing, or quietly stopping.",
                  ],
                },
                {
                  src: ["ui-progress.png", "ui-progress-trends.png", "ui-progress-trends-2.png"],
                  title: "Feedback, and proof that it’s working",
                  body: [
                    "Every session ends with a question the patient can actually answer: what did the pain feel like? That single input drives an AI-written summary, which goes straight to the physiotherapist without the patient having to report anything themselves.",
                    "What comes back to the patient is the plain-language version: where they are, what’s improving. For someone recovering alone, seeing the trend move is what makes the next session feel worth doing.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "decisions",
          kicker: "Key Decision",
          heading: "Designing the riskiest surface on reasoning alone",
          blocks: [
            {
              kind: "prose",
              body: [
                "The guided pose-tracking session is the highest-risk surface in the whole platform. It’s the one place where getting the UI wrong could mean a patient performing a rehab exercise incorrectly, unsupervised, with nobody watching.",
                "It was designed without a working prototype in front of real patients. That’s stated here the same way it’s stated on the dashboard case study: the session flow is a considered argument, not a validated one.",
              ],
            },
          ],
        },
        {
          id: "outcome",
          kicker: "Outcome & Reflection",
          heading: "What exists, and what it still needs",
          blocks: [
            {
              kind: "stats",
              items: [
                { value: "30", label: "Screens in the patient app" },
                { value: "1", label: "Design system shared with the dashboard" },
                { value: "2", label: "Native platforms, iOS & Android" },
              ],
            },
            {
              kind: "callout",
              title: "Being straight about it",
              body:
                "Same caveat as the dashboard: this is a designed system with an argument behind it, not a validated product. The guided session in particular needs real usability testing on low-end Android, in someone’s hands, on the floor, before any claim that it works would be honest.",
            },
          ],
        },
      ],
    },
    gallery: [
      "splash.png",
      "welcome.png",
      "join.png",
      "programme-preview.png",
      "payment-loading.png",
      "payment-success.png",
      "payment-failure.png",
      "create-account.png",
      "personal-info.png",
      "home.png",
      "notifications.png",
      "rest.png",
      "camera-setup.png",
      "session-details.png",
      "live-session.png",
      "pause-session.png",
      "session-summary.png",
      "session-report.png",
      "progress.png",
      "trends.png",
      "reports.png",
      "history.png",
      "conversation.png",
      "messages.png",
      "health.png",
      "document-viewer.png",
      "profile.png",
      "security.png",
      "about.png",
      "help.png",
    ],
    featured: true,
  },
  {
    /* Merged from the former `conqr-platform` and `conqr-landing` entries —
       one two-month engagement, not two. Both old URLs redirect here via
       next.config.ts. */
    slug: "conqr",
    dir: "conqr-landing",
    title: "Conqr.ai",
    subtitle: "Brand, design system, and a launch landing page",
    role: "Solo Freelance",
    timeline: "2 months",
    year: "2025",
    accent: "teal",
    cover: "landing-hero.png",
    hero: "landing-hero.png",
    layout: "web",
    summary:
      "Turning an undirected brief into a design system: brand, component language, and a single-scroll landing page built from scratch for a legal-AI product’s launch.",
    overview: [
      "Conqr.ai is an AI legal assistant for lawyers. The client wanted their website redesigned but had no point of view on what it should look like, feel like, or say, a harder brief than a detailed one.",
      "Over two months the engagement produced a brand design system, colour, typography and a component language, and a single-scroll landing page built from scratch for the product’s public launch.",
    ],
    highlights: [
      "Built a design system out of an ambiguous brief, through 3–4 full iterations.",
      "Designed the single-scroll launch landing page end to end.",
      "Set a calm, credible visual tone for a product sold to corporate legal teams.",
    ],
    tags: ["Brand Design", "Design System", "Landing Page", "Client Work"],
    tools: ["Figma"],
    metrics: [
      { value: "2 mo", label: "Engagement" },
      { value: "3–4", label: "Iterations to a direction" },
      { value: "Legal Tech", label: "Industry" },
    ],
    caseStudy: [
      {
        heading: "The project",
        body: [
          "Conqr.ai is an AI-powered legal co-pilot for corporate legal teams. Alongside overhauling the product UI, I was brought in, as the sole freelance designer, to give it something it didn’t have: a landing page.",
        ],
      },
      {
        heading: "The goal",
        body: [
          "The platform had no landing page to communicate its value to potential clients. I designed one from scratch to speak directly to corporate legal teams: an audience that prizes clarity, precision, and professionalism above all.",
        ],
      },
      {
        heading: "Grounded in one visual system",
        body: [
          "The landing page shares the product’s visual system, a neutral base with a single deep-navy accent (#0C4160) and the Merriweather / Lato pairing, so the marketing site and the product feel like one, credible brand.",
        ],
      },
      {
        heading: "Structure first",
        body: [
          "I wireframed the page in low fidelity to lock layout and hierarchy before any visual design: a strong hero, then capabilities, then trust.",
        ],
      },
      {
        heading: "The page",
        body: [
          "It leads with a bold hero, ‘Redefine Your Legal Process With Streamlined Solutions’, then moves through the key capabilities (every document instantly searchable, due diligence at light speed, intelligence where you work), and builds trust with testimonials, an FAQ, and a ‘confidential by default’ security section. No clutter, no noise.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "A single-scroll marketing page that communicates Conqr.ai’s value clearly and quickly, built to convert a professional legal audience.",
        ],
      },
    ],
    /* Not a product design story — a story about managing an ambiguous
       client engagement. The friction at the end is the credibility; it is
       written plainly rather than smoothed over. */
    study: {
      hero: {
        web: "landing-hero.png",
        webLabel: "Conqr.ai, the shipped landing page",
        alt: "The Conqr.ai landing page",
      },
      meta: [
        { label: "Client", value: "Conqr.ai, AI legal assistant for lawyers" },
        { label: "Project type", value: "Freelance / contract: solo, direct client engagement" },
        { label: "Timeline", value: "2 months" },
        { label: "Scope", value: "Brand & design system, a landing page from scratch, and a visual redesign of the product screens" },
      ],
      glance: [
        { value: "3–4", label: "Full iterations before a direction held" },
        { value: "2", label: "Deliverables, a design system and a landing page" },
        { value: "Solo", label: "No PM, no team" },
      ],
      glanceNote:
        "A visual redesign, not a product one. Conqr.ai’s legal AI assistant, its features and its flows, was built separately. This work was the brand identity, the design system, a landing page from scratch for the launch, and that system applied across the product’s existing screens.",
      sections: [
        {
          id: "context",
          kicker: "Overview",
          heading: "“Redesign our website”, with no sense of direction",
          blocks: [
            {
              kind: "prose",
              body: [
                "Conqr.ai came in with a clear ask and an unclear target. They wanted their website redesigned, but had no point of view on what it should look like, feel like, or say.",
                "That’s a harder brief than a detailed one. There’s no direction to react to: only a blank page to fill on the client’s behalf, and no way to tell whether you’ve filled it correctly until you show them.",
              ],
            },
          ],
        },
        {
          id: "process",
          kicker: "Process",
          heading: "Finding direction through iteration, not discovery",
          blocks: [
            {
              kind: "prose",
              body: [
                "With no strong brief to anchor to, the process leaned on showing rather than asking. I brought a wide set of visual references to give the client something concrete to react to, then iterated on whatever pulled them in a direction: a loop of “does this feel more like it, or less”.",
                "It took three to four full iterations before a direction solidified into an actual design system: a defined colour palette, typography, and a component language the client could commit to.",
              ],
            },
            {
              kind: "figures",
              cols: 3,
              items: [
                { src: "iter-11.png" },
                { src: "iter-18.png" },
                { src: "iter-20.png" },
                { src: "iter-21.png" },
                { src: "iter-22.png" },
                { src: "iter-dashboard.png" },
                { src: "iter-dashboard-2.png" },
                { src: "board-visual-system.jpg", caption: "The visual system that eventually held" },
              ],
            },
          ],
        },
        {
          id: "surfaces",
          kicker: "UI Design",
          heading: "What shipped",
          blocks: [
            {
              kind: "prose",
              body: [
                "Two deliverables came out of the two months: a brand design system, colour, typography and component language, arrived at through the iteration above, and the landing page itself, built from scratch rather than as a redesign of an existing page, single-scroll, used for the product’s public launch.",
              ],
            },
            {
              kind: "figure",
              src: "landing-full.png",
              frame: "scroll",
              caption: "The full page, top to bottom, scroll inside the frame",
            },
          ],
        },
        {
          id: "product",
          kicker: "Applied",
          heading: "The system on the product surfaces",
          blocks: [
            {
              kind: "prose",
              body: [
                "The features and the flows were the client’s. The visual language was mine: and it was carried onto the product itself: the workspace where legal teams draft, review and pay for agreements.",
                "Nothing about how the product worked changed. What changed was whether it looked like something a corporate legal team would hand a contract to. Dense document management stopped reading as unfinished software and started reading as a tool with a point of view, and the marketing site and the product it sold stopped looking like two different companies.",
              ],
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "/projects/conqr-platform/home-dashboard.png", caption: "Dashboard" },
                { src: "/projects/conqr-platform/home-alldocuments.png", caption: "All documents" },
                { src: "/projects/conqr-platform/home-payments.png", caption: "Payments" },
              ],
            },
          ],
        },
        {
          id: "outcome",
          kicker: "Reflection",
          heading: "Honest about the outcome",
          blocks: [
            {
              kind: "prose",
              body: [
                "The engagement ran the full two months, delivered a settled design system and a shipped landing page, and the client still wasn’t fully satisfied at the end. That’s part of the case study rather than something to smooth over.",
                "What it taught: how to build a design system from a genuinely ambiguous brief, and how to convert vague, shifting requirements into decisions that actually ship, even when “shipped” and “everyone’s happy” don’t fully overlap.",
              ],
            },
          ],
        },
      ],
    },
    /* absolute entries pull in the former conqr-platform folder */
    gallery: [
      "board-landing-page.jpg",
      "board-overview.jpg",
      "board-visual-system.jpg",
      "frame-785.png",
      "frame-746.png",
      "/projects/conqr-platform/board-platform-redesign.jpg",
      "/projects/conqr-platform/home-dashboard.png",
      "/projects/conqr-platform/home-alldocuments.png",
      "/projects/conqr-platform/home-payments.png",
      "/projects/conqr-platform/cover-image.jpg",
    ],
    link: "https://www.behance.net/gallery/249693337/Conqrai-UI-Redesign-Landing-Page-Design",
    featured: true,
  },
  {
    slug: "autumn",
    dir: "autumn",
    title: "Autumn",
    subtitle: "Immersive e-book reader, mobile app",
    role: "Independent Project",
    timeline: "Concept · 2–3 months",
    year: "2024",
    accent: "coral",
    cover: "frame-44.png",
    hero: "frame-44.png",
    layout: "mobile",
    summary:
      "A subscription e-book reader designed to feel as immersive as reading a physical book: with a signature colour-coded, sticky-note tab system.",
    overview: [
      "Autumn is a subscription e-book reader designed to feel as immersive as reading a physical book, with the goal of boosting reading engagement and authenticity.",
      "Its signature feature is a set of personalised, colour-coded tabs that slide out into a sticky-note-style panel without leaving the page: alongside custom highlights, a distraction-free reading interface, bookmarks, and collapsible annotations, all in a warm, autumn-inspired visual system.",
    ],
    highlights: [
      "Signature colour-coded tabs that slide into a sticky-note panel.",
      "Custom highlights, bookmarks, and collapsible annotations without leaving the page.",
      "A warm, autumn-inspired system (Mulish type) tuned for calm, focused reading.",
    ],
    tags: ["Mobile", "Interaction Design", "Reading", "Concept"],
    tools: ["Figma"],
    metrics: [{ value: "1", label: "Signature feature" }],
    link: "https://www.behance.net/gallery/190310823/Autumn-UIUX-Design-eBook-Reader-Application",
    caseStudy: [
      {
        heading: "The idea",
        body: [
          "The objective was to craft a digital reading interface that delivers a seamlessly immersive experience for readers, mirroring the engagement and authenticity of reading a physical copy.",
        ],
      },
      {
        heading: "The concept",
        body: [
          "Autumn is a harmonious blend of intuitive, user-friendly design and a carefully curated palette of warm colour tones: chosen to invoke a sense of warmth and familiarity, like flipping through the pages of a cherished novel.",
        ],
      },
      {
        heading: "Signature feature, sticky-note tabs",
        body: [
          "The stand-out interaction is a set of personalised, colour-coded tabs that slide out into a sticky-note-style panel without ever leaving the page: bringing the tactile, annotate-anywhere feeling of a physical book to the screen.",
        ],
      },
      {
        heading: "Core features",
        body: ["The reading experience is built around four features:"],
        list: [
          "Custom highlights",
          "A distraction-free reading interface",
          "Bookmarks and highlights that don’t break the flow",
          "Collapsible annotations",
        ],
      },
      {
        heading: "Colour & typography",
        body: [
          "A warm, autumn-inspired palette and the Mulish typeface (Light → Semi-Bold) keep the experience calm, legible, and focused, the visual equivalent of a quiet reading nook.",
        ],
      },
    ],
    /* Deliberately short — a first project, not a flagship. One scroll. */
    study: {
      hero: {
        app: "reading-interface-6.png",
        appLabel: "Reading view",
        alt: "The Autumn reading interface",
      },
      meta: [
        { label: "Project type", value: "Independent Product Design, personal project" },
        { label: "Role", value: "Solo: first UI/UX project, designed entirely from scratch" },
        { label: "Platform", value: "Mobile app" },
        { label: "Status", value: "Concept: designed, never built or shipped" },
        { label: "Timeline", value: "2–3 months" },
      ],
      glance: [
        { value: "12–15", label: "Screens designed" },
        { value: "2–3 mo", label: "Solo, start to finish" },
        { value: "Concept", label: "Never built" },
      ],
      glanceNote:
        "An e-book reader that starts from the physical reading experience instead of from a feature list, built to ask one narrow question rather than to compete with a Kindle.",
      sections: [
        {
          id: "context",
          kicker: "Overview",
          heading: "Reading lost its rituals when it went digital",
          blocks: [
            {
              kind: "prose",
              body: [
                "Physical books carry small rituals that most e-readers strip away without noticing: dog-earing a page, lending a book to a friend with a note in the margin, someone recommending exactly the right book at exactly the right time. Digital reading solved portability and lost the parts that made a book feel personal.",
              ],
            },
            {
              kind: "lead",
              text:
                "What does an e-reader look like if it starts from the physical reading experience instead of the feature list of a Kindle?",
            },
            {
              kind: "callout",
              title: "Where this got to",
              body:
                "A concept, and only ever a concept, 12–15 screens designed over two to three months. Nothing here was built or shipped.",
            },
          ],
        },
        {
          id: "surfaces",
          kicker: "UI Design",
          heading: "What shipped",
          blocks: [
            {
              kind: "prose",
              body: [
                "The first independent project: built solo, end to end, with no client or team to answer to. Scope was deliberately core-first.",
              ],
            },
            {
              kind: "scrolly",
              steps: [
                {
                  src: ["reading-interface-7.png", "reading-interface-6.png", "book-info-page-4.png"],
                  title: "Layout customisation",
                  body: [
                    "Text, spacing and background tuned to how someone actually likes to read, rather than to a default someone else picked.",
                  ],
                },
                {
                  src: ["bookmarks-menu-page-10.png", "book-info-page-5.png", "book-info-prototype-1.png"],
                  title: "Bookmarks",
                  body: ["Mark a page the way you’d dog-ear it."],
                },
                {
                  src: ["highlights-menu-page-9.png", "highlights-menu-page-11.png", "book-info-prototype-2.png"],
                  title: "Notes",
                  body: ["Margin-style annotation, written while reading rather than after it."],
                },
                {
                  src: [
                    "compact-tab-feature-page-12.png",
                    "compact-tab-feature-cont-page-13.png",
                    "compact-tab-feature-dark-mode-pg-14.png",
                  ],
                  title: "Tabs",
                  body: [
                    "The standout feature: a digital analogue to leaving paper tabs sticking out of a book, marking chapters, favourite passages, or places to come back to.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "decisions",
          kicker: "Key Decision",
          heading: "Tabs, not folders",
          blocks: [
            {
              kind: "split",
              weight: "text",
              left: {
                kind: "decision",
                title: "Tabs, not folders",
                body: [
                  "Most e-readers organise saved content the way a file system does: folders, lists, favourites. That’s software logic applied to a book.",
                  "Autumn’s tabs skip that model and mimic the physical habit directly: a tab sticks out from the edge of the page, visible while flipping through, findable by feel and memory rather than by opening a menu.",
                  "It’s a small decision, but it’s the one that best captures the whole premise: digital reading should borrow its logic from books, not from software.",
                ],
              },
              right: {
                kind: "figure",
                src: "compact-tab-feature-cont-page-13.png",
                frame: "mobile",
              },
            },
          ],
        },
        {
          id: "next",
          kicker: "Where it’s headed",
          heading: "Three directions, none of them designed",
          blocks: [
            {
              kind: "callout",
              title: "Not a roadmap",
              body:
                "None of what follows has been designed or scoped. No screens exist for any of it: this is a vision statement, not a set of implied deliverables.",
            },
            {
              kind: "list",
              items: [
                "A marketplace, Kindle-style subscription access to a book library",
                "Sharing and gifting: two subscribers exchanging an annotated copy, margin notes included, or gifting a book outright",
                "Reading together, a collaborative mode where two people read the same book on their own time and leave annotations for each other to find",
              ],
            },
          ],
        },
        {
          id: "outcome",
          kicker: "Reflection",
          heading: "The first one",
          blocks: [
            {
              kind: "prose",
              body: [
                "A personal project, and the one that opened UI/UX design up for me. No client, no team, no brief, which meant the problem had to be found rather than handed over.",
                "That turned out to be the actual lesson: noticing what’s wrong with something people already use, and then converting that noticing into a solution specific enough to design. Everything since has been a version of the same two steps.",
              ],
            },
          ],
        },
      ],
    },
    gallery: [
      "reading-interface-6.png",
      "reading-interface-7.png",
      "book-info-page-4.png",
      "book-info-page-5.png",
      "book-info-prototype-1.png",
      "book-info-prototype-2.png",
      "book-info-prototype-3.png",
      "highlights-menu-page-9.png",
      "highlights-menu-page-11.png",
      "bookmarks-menu-page-10.png",
      "compact-tab-feature-page-12.png",
      "compact-tab-feature-cont-page-13.png",
      "compact-tab-feature-dark-mode-pg-14.png",
      "compact-tab-feature-cont-dark-mode-pg-15.png",
      "iphone-14-15-pro-7.png",
      "iphone-14-15-pro-12.png",
      "iphone-14-15-pro-19.png",
      "iphone-14-15-pro-20.png",
      "iphone-14-15-pro-22.png",
      "iphone-14-15-pro-23.png",
      "iphone-14-15-pro-24.png",
      "iphone-14-15-pro-25.png",
      "iphone-14-15-pro-26.png",
      "iphone-14-15-pro-27.png",
      "iphone-14-15-pro-28.png",
      "iphone-14-15-pro-29.png",
      "iphone-14-15-pro-39.png",
    ],
    featured: true,
  },

];

/* ------------------------------------------------------------
   Card-level projection of `projects`.

   The work grid is a client component, and anything a client component
   imports is bundled and shipped to the browser. Importing `projects`
   there would send every case-study body to every visitor, including the
   `more` blocks that are meant to sit behind a password. This is the only
   shape the grid needs, so it is the only shape it gets.
   ------------------------------------------------------------ */
export type WorkCard = Pick<
  Project,
  | "slug" | "title" | "subtitle" | "role" | "timeline" | "year"
  | "accent" | "cover" | "dir" | "summary" | "tags" | "metrics" | "professional"
>;

export const workCards: WorkCard[] = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
  role: p.role,
  timeline: p.timeline,
  year: p.year,
  accent: p.accent,
  cover: p.cover,
  dir: p.dir,
  summary: p.summary,
  tags: p.tags,
  metrics: p.metrics,
  professional: p.professional,
}));

