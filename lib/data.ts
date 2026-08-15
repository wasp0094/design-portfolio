/* ============================================================
   CONTENT — edit this file to update the site.
   Add a project by appending to the `projects` array.
   Images live in public/projects/<dir>/.
   ============================================================ */

export const profile = {
  name: "Aditi Agarwal",
  role: "Product & UI/UX Designer",
  location: "New Delhi, India",
  available: true,
  tagline: [
    "I turn ambiguous",
    "problems into",
    "interfaces people",
    "actually use.",
  ],
  intro:
    "Product & UI/UX designer with 2+ years taking B2B and healthtech products from messy research all the way to shipped, high-fidelity UI — design systems, two-sided products, and the calm interfaces in between.",
  phone: "+91 98183 77310",
  // TODO: replace with Aditi's real LinkedIn URL
  email: "makedesignwithaditi@gmail.com",
  resume: "https://wasp0094.github.io/resume.pdf",
  socials: [
    { label: "Behance", handle: "designwithaditi", href: "https://www.behance.net/designwithaditi" },
    { label: "Dribbble", handle: "designwithaditii", href: "https://dribbble.com/designwithaditii" },
    { label: "Twitter", handle: "designwithaditi", href: "https://twitter.com/designwithaditi" },
    { label: "LinkedIn", handle: "aditi-agarwal", href: "https://www.linkedin.com/in/designwithaditi" },
  ],
};

export const stats = [
  { value: 2, suffix: "+", label: "Years shipping product" },
  { value: 23, suffix: "", label: "Screens in one build" },
  { value: 5, suffix: "", label: "Hackathon awards" },
  { value: 300, suffix: "+", label: "Students mentored" },
];

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
       *  thousands of pixels down the page */
      frame?: "web" | "mobile" | "bleed" | "card" | "scroll";
      annotations?: { n: number; text: string }[];
    }
  /** a row/grid of screens */
  | { kind: "figures"; cols?: 2 | 3 | 4; items: { src: string; caption?: string }[] }
  /** before/after pair */
  | { kind: "compare"; label?: string; before: string; after: string }
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
  blocks: Block[];
};

/** Composed product hero — a wide screen with a phone lifted over it.
 *  Use for two-sided products; either half may be omitted. */
export type StudyHero = {
  web?: string;       // wide/desktop screen (paths may be absolute to cross projects)
  app?: string;       // portrait phone screen
  webLabel?: string;  // small pill, e.g. "Therapist dashboard — web"
  appLabel?: string;  // small pill, e.g. "Patient app — iOS & Android"
  alt?: string;
};

export type Study = {
  hero?: StudyHero;                            // replaces the default detail-page hero
  meta?: { label: string; value: string }[];   // Role / Platforms / Scope — the header strip
  glance?: { value: string; label: string }[]; // outcome numbers, shown high on the page
  glanceNote?: string;
  sections: StudySection[];
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

/* brand logo (in /public/logos/) + a background colour that suits it,
   used for the card cover and the detail-page hero */
export const BRAND: Record<string, { logo: string; bg: string; dark?: boolean }> = {
  "formi-app": { logo: "formi.svg", bg: "#1A7A8A", dark: true },
  fourcore: { logo: "fourcore.svg", bg: "#0B1C30", dark: true },
  "conqr-platform": { logo: "conqr.svg", bg: "#F5EEE7" },
  autumn: { logo: "autumn.svg", bg: "#FBEDDF" },
};

export const projects: Project[] = [
  {
    slug: "fourcore-platform",
    dir: "fourcore-platform",
    title: "FourCore",
    subtitle: "Breach & attack simulation product",
    role: "UI/UX → Senior",
    timeline: "2+ years · ongoing",
    year: "2024 — Now",
    accent: "violet",
    professional: true,
    cover: "dashboard.png",
    hero: "dashboard.png",
    layout: "web",
    summary:
      "2+ years designing FourCore ATTACK — a breach-and-attack-simulation platform — building its design system from scratch and shipping 40+ new screens across new and upgraded features.",
    overview: [
      "FourCore ATTACK is a breach-and-attack-simulation (BAS) platform. Security teams use it to continuously emulate real-world adversaries — running attack techniques against their live systems — to validate whether their controls actually detect and block threats, then prioritise the gaps.",
      "This is my longest-running professional engagement: over 2+ years I grew from UI/UX Designer to Senior UI/UX Designer to Product Designer — owning the product’s design system, designing brand-new features, and modernising existing ones.",
    ],
    highlights: [
      "Built the product’s entire design system from scratch — brand, colour, type, components, iconography.",
      "Designed and shipped 5+ new features and 40+ new screens, concept to production.",
      "Upgraded existing features and pages to the new brand identity, including custom illustrations.",
      "Partnered with marketing on brand collateral — event posters, mood boards, and merch.",
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
          "FourCore ATTACK is a breach-and-attack-simulation platform in the cybersecurity space. It safely emulates real-world adversaries — executing attack techniques, moving laterally, escalating privileges — against an organisation’s live environment, then shows security teams exactly where their defenses held and where they broke, mapped to frameworks like MITRE ATT&CK.",
        ],
      },
      {
        heading: "My role — and how it grew",
        body: [
          "I joined as a UI/UX Designer, was promoted to Senior UI/UX Designer, and then to Product Designer — over 2+ years and counting. Across that arc I owned three threads: the design system, brand-new features, and the modernisation of everything that already existed.",
        ],
      },
      {
        heading: "The design system — from scratch",
        body: [
          "I built the product’s entire design system from the ground up: brand guidelines, colour theory, typography, the full UI component library, and a custom iconography set. In a dense, data-heavy security product, that system is what keeps a hundred different screens — dashboards, attack graphs, MITRE matrices, reports — feeling like one coherent tool, and it dramatically sped up how fast new screens ship.",
        ],
      },
      {
        heading: "New features — concept to production",
        body: [
          "I designed and shipped 5+ new features and 40+ new screens, owning them from first concept all the way to production alongside engineering. The specifics sit under an NDA, so I’ll keep this high-level — but the work spans the core surfaces of a modern BAS platform.",
        ],
      },
      {
        heading: "Upgrading what already existed",
        body: [
          "Beyond net-new work, I reworked existing features and pages to match the new brand identity — including custom illustrations — so the whole product moved forward together rather than becoming a patchwork of old and new.",
        ],
      },
      {
        heading: "Beyond the product — brand & marketing",
        body: [
          "I also worked closely with the marketing team, extending the design system beyond the app into brand collateral: event posters, mood boards, merch, and other materials — keeping FourCore consistent everywhere it shows up.",
        ],
      },
    ],
    /* CONFIDENTIAL CLIENT. Nothing in this study may be invented — platform
       data is sensitive and a plausible-sounding fabrication is a real risk,
       not just a copywriting gap. Every gap is a `todo` block on purpose. */
    study: {
      hero: {
        web: "dashboard.png",
        webLabel: "FourCore ATTACK — platform dashboard",
        alt: "The FourCore ATTACK platform dashboard",
      },
      meta: [
        { label: "Company", value: "FourCore — breach & attack simulation (cybersecurity)" },
        { label: "Role", value: "Senior UI/UX Designer — sole independent contributor on design" },
        { label: "Timeline", value: "Feb 2024 – present · 2+ years, ongoing" },
        { label: "Scope", value: "Full platform redesign, 40+ screens, solo · plus 5+ new features since" },
      ],
      glance: [
        { value: "40+", label: "Screens redesigned" },
        { value: "5+", label: "Features shipped" },
        { value: "2 yrs", label: "Ongoing" },
        { value: "Solo", label: "Sole design contributor" },
      ],
      glanceNote:
        "FourCore runs breach-and-attack simulations for security teams — letting them safely test how their defenses hold up against real attack techniques. I joined as the sole design owner and have redesigned the platform end to end since.",
      sections: [
        {
          id: "confidentiality",
          kicker: "Before you read",
          heading: "A note on what’s shown here",
          blocks: [
            {
              kind: "callout",
              title: "Confidential product",
              body:
                "FourCore’s platform data is confidential. Every screen on this page uses placeholder data — no client names, threat data, addresses or account details appear anywhere.",
            },
            {
              kind: "todo",
              items: [
                "DECIDE BEFORE PUBLISHING: password-protect this page, gate it behind a “request access” link, or split it — a light public version showing process and UI patterns only, plus a gated full version.",
                "AUDIT EVERY SCREEN used on this page for real data before it goes live. The images currently wired in are the ones already on the site; they have not been re-checked against this stricter standard.",
                "Confirm the claim in the callout above is actually true of the final screen set — I have written it as an intent, not a verified fact.",
              ],
              note: "This section should be deleted once the page is gated, or kept and tightened if the page stays public.",
            },
          ],
        },
        {
          id: "context",
          kicker: "Overview",
          heading: "Two years, one designer, a platform that kept growing",
          blocks: [
            {
              kind: "prose",
              body: [
                "Security teams use FourCore ATTACK to run simulated attacks against their own systems and see where the gaps are, before a real adversary finds them. I joined as the sole design owner and have redesigned the platform end to end since — 40+ screens across the core product, plus new features shipped along the way as the product itself evolved.",
              ],
            },
            {
              kind: "todo",
              items: [
                "A public-safe sentence or two on what the platform does for its users day to day. Keep it non-specific about actual client use cases — the line above is deliberately generic and should be checked before it stands.",
              ],
            },
          ],
        },
        {
          id: "surfaces",
          kicker: "UI Design",
          heading: "Surfaces redesigned",
          blocks: [
            {
              kind: "prose",
              body: [
                "Structured by surface rather than chronologically — two years doesn’t narrate well as a timeline, and each surface is really its own small case study.",
              ],
            },
            {
              kind: "scrolly",
              steps: [
                {
                  src: "dashboard.png",
                  title: "Dashboard",
                  body: ["The screen a user lands on first, and the one that has to be understood fastest."],
                },
                {
                  src: "threat-intelligence.png",
                  title: "Threat Intelligence",
                  body: ["Placeholder screen — pairing to be confirmed."],
                },
                {
                  src: "mitre-attack.png",
                  title: "Threat Library",
                  body: ["Placeholder screen — this surface later absorbed the Exposures feature."],
                },
                {
                  src: "preferences.png",
                  title: "Settings",
                  body: ["Placeholder screen — pairing to be confirmed."],
                },
              ],
            },
            {
              kind: "todo",
              items: [
                "Dashboard — what was wrong with the old one, what changed, and why.",
                "Threat Library — what the page is for and what the redesign changed. (Note: the brief spells this “Thread Library” and “Thread Intelligence” throughout — confirm whether that’s Threat or Thread before this goes live.)",
                "Threat Intelligence — purpose of the page and what changed.",
                "Settings — scope of the redesign; anything notable such as permissions complexity or the number of sub-sections.",
                "Integrations — what the page manages and what changed. No screen is wired in for this surface yet.",
                "Confirm each screen above is actually the surface it’s labelled as — I matched them by filename, not by knowing the product.",
              ],
            },
          ],
        },
        {
          id: "features",
          kicker: "Shipped",
          heading: "New features, beyond the redesign",
          blocks: [
            {
              kind: "prose",
              body: [
                "Five-plus net-new features have shipped since the redesign, as the product grew past what the original surfaces covered.",
              ],
            },
            {
              kind: "figures",
              cols: 2,
              items: [
                { src: "emerging-threats.png", caption: "Emerging Threats workflow" },
                { src: "schedule-details.png", caption: "Scheduler" },
              ],
            },
            {
              kind: "todo",
              items: [
                "Emerging Threats — what problem it solves and how it works at a high level.",
                "Scheduler — what gets scheduled, and why it mattered.",
                "Playbooks — what a playbook is in this context and what it lets users do. No screen wired in yet.",
              ],
            },
          ],
        },
        {
          id: "decisions",
          kicker: "Key Decision",
          heading: "Killing Exposures and folding it into the Threat Library",
          blocks: [
            {
              kind: "prose",
              body: [
                "Exposures shipped as a standalone feature, then was scrapped and replaced — its functionality absorbed into a redesigned Threat Library workflow instead of continuing as a separate surface.",
              ],
            },
            {
              kind: "todo",
              items: [
                "Why the standalone version didn’t work.",
                "What the merged version does better.",
                "Before/after screens of both states, if they exist — this is the strongest moment in the case study and deserves the visual.",
              ],
              note: "Killing a feature and folding it into something else is a real product decision. It’s what turns 40+ screens into a case study rather than a screen dump — worth writing properly.",
            },
          ],
        },
        {
          id: "outcome",
          kicker: "Outcome & Reflection",
          heading: "What two years as the only designer actually looks like",
          blocks: [
            {
              kind: "stats",
              items: [
                { value: "40+", label: "Screens redesigned" },
                { value: "5+", label: "Features shipped" },
                { value: "2 yrs", label: "Ongoing, sole design contributor" },
              ],
            },
            {
              kind: "todo",
              items: [
                "An honest reflection in the same register as Formi’s “Being straight about it” — what the role has actually meant. Owning design end to end with no team to share the load, holding a design system together as the product grew, whatever is true.",
              ],
              note: "A few honest sentences will read better than trying to summarise everything shipped over two years.",
            },
          ],
        },
      ],
    },
    gallery: [
      "dashboard.png",
      "threat-intelligence.png",
      "mitre-attack.png",
      "macbook-6.png",
      "macbook-7.png",
      "emerging-threats.png",
      "calendar-view.png",
      "schedule-details.png",
      "preferences.png",
      "sign-in.png",
      "empty-screen.png",
    ],
    link: "https://fourcore.io/",
    featured: true,
  },
  {
    slug: "fourcore",
    dir: "fourcore",
    title: "FourCore — Landing",
    subtitle: "Breach and attack simulation platform",
    role: "UI/UX Design Intern",
    timeline: "2–3 month sprint",
    year: "2025",
    accent: "blue",
    professional: true,
    cover: "new-home-hero.jpg",
    hero: "new-home-hero.jpg",
    layout: "web",
    summary:
      "A ground-up overhaul of FourCore’s marketing website — the public face of a breach-and-attack-simulation platform — from a cluttered legacy site to a focused, modern dark experience.",
    overview: [
      "FourCore ATTACK is a breach-and-attack-simulation platform — security teams use it to continuously emulate real-world adversaries and validate that their defenses actually work. This was my first project at FourCore, taken on as a UI/UX design intern: a complete redesign of the company’s website.",
      "The old site had grown cluttered and inconsistent. I rebuilt the core pages end-to-end — home, platform, demo, about, and blog, across desktop and mobile — into a focused, high-contrast dark experience that reads as serious, credible security tooling.",
    ],
    highlights: [
      "Redesigned the FourCore website end-to-end (10+ screens, desktop & mobile) in a 2–3 month sprint.",
      "Replaced a cluttered legacy hero with a single, confident message — ‘Security Control Validation. Supercharged.’",
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
        heading: "The role — professional work at FourCore",
        body: [
          "This is my professional experience as Senior UI/UX Designer at FourCore. FourCore ATTACK is an adversary-emulation (breach-and-attack-simulation) platform that lets security teams continuously test whether their controls actually stop real-world threats. I lead the product’s design and, here, redesigned the company’s public website.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "The legacy site had grown cluttered and inconsistent — a dense hero, mixed light/dark sections, and a raw Calendly-embed demo page, with no unifying visual system. For a product that sells trust and precision to security buyers, the site didn’t reflect the sophistication of the tool underneath.",
        ],
      },
      {
        heading: "The goal",
        body: [
          "Rebuild the marketing site into a focused, credible, modern experience that communicates the product’s value at a glance — and establish one consistent visual system across every page.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "I redesigned the core pages end-to-end — home, platform, demo, about, and blog — for both desktop and mobile, in a two-month sprint. The site leads with a single, punchy message on a focused dark canvas, and every page is built from the same components so it all reads as one product.",
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
          "A dark navy base with a single electric-blue accent, consistent typography and spacing, and a reusable component set — so home, platform, about, and blog all feel unmistakably like FourCore.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "A cohesive, modern marketing site — live at fourcore.io — that presents FourCore ATTACK with the clarity and authority its security audience expects.",
        ],
      },
    ],
    study: {
      hero: {
        web: "new-home-hero.jpg",
        webLabel: "fourcore.io — redesigned",
        alt: "The redesigned FourCore homepage",
      },
      meta: [
        { label: "Company", value: "FourCore — breach & attack simulation (cybersecurity)" },
        { label: "Role", value: "UI/UX Design Intern — first project after joining" },
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
                "The existing site didn’t read as a serious cybersecurity product. FourCore wanted something sharper, more modern and more credible-looking — something that matched where the product actually was rather than where it had started.",
              ],
            },
            {
              kind: "compare",
              label: "Homepage",
              before: "old-home.jpg",
              after: "new-home.jpg",
            },
            {
              kind: "todo",
              items: [
                "The year on this page still says 2025, but the FourCore Platform case study has you there as Senior UI/UX Designer from Feb 2024 — which would put this intern-era project before that, not after. What year did the redesign actually ship?",
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
                "A full redesign across five to six pages, from scratch — visual direction, layout, and the content structure of each page.",
              ],
            },
            {
              kind: "scrolly",
              steps: [
                {
                  src: "new-home.jpg",
                  title: "Home",
                  body: [
                    "The page carrying the most weight: what FourCore does, for whom, and why a security team should trust it.",
                  ],
                },
                {
                  src: "new-about.jpg",
                  title: "About",
                  body: [
                    "The credibility page — who is behind the product, in a category where that question gets asked early.",
                  ],
                },
                {
                  src: "new-demo.jpg",
                  title: "Demo",
                  body: [
                    "The conversion surface, and the one page where the redesign had to do commercial work rather than only look the part.",
                  ],
                },
                {
                  src: "new-blogs.jpg",
                  title: "Blog",
                  body: [
                    "A publishing surface for security research, which is how a company like this earns attention in the first place.",
                  ],
                },
              ],
            },
            {
              kind: "compare",
              label: "About",
              before: "old-about.jpg",
              after: "new-about.jpg",
            },
            {
              kind: "compare",
              label: "Demo",
              before: "old-demo.jpg",
              after: "new-demo.jpg",
            },
            {
              kind: "todo",
              items: [
                "Which pages were in scope, named individually — the four above are inferred from the available screens, not from the brief.",
                "One line per page on what changed and why, to replace the placeholder captions in the walkthrough above.",
              ],
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
                  "The old site read as pre-launch. Not broken — just new. It carried the visual signals of a product still finding its footing, at a point where the product itself had long since moved past that.",
                  "In security that’s a commercial problem, not a cosmetic one. FourCore sells to teams whose job is to be suspicious, and who are being asked to point the thing at their live environment. A site that looks provisional makes the product look provisional.",
                  "So the brief wasn’t “modernise” in the abstract. It was to make the platform feel well-placed, premium and trustworthy — and every choice underneath, typography included, was made against that one test: does this read as a company that has arrived, or one that just showed up?",
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
                "The site has been live since it shipped and hasn’t needed a further redesign — which, for a marketing site at a startup that has kept moving, is the outcome that matters.",
                "It was also the first thing I ever shipped. Redesigning something from scratch turned out to be a different skill from designing screens: the work was less about what I wanted to make and more about reading what the company actually needed, then finding the version of that I could argue for and hand over.",
                "Turning a client’s sense of what’s wrong into something actionable is the part I’d underestimated. “It should feel more modern” isn’t a brief — the job was getting from that to a decision I could defend on every page.",
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
    subtitle: "Physiotherapy platform — two-sided product",
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
      "Evolved from ‘Proctify’, a patients-only college project, into Formi — a full two-sided platform connecting physiotherapists and patients through AI-guided remote recovery.",
    overview: [
      "Formi is a physiotherapist-first digital health platform that keeps the care relationship productive between clinic visits — a professional practice-management and remote-monitoring tool for therapists, and a structured, AI-guided recovery experience for patients.",
      "It began as ‘Proctify’, a patients-only college project (Top 15 at the Smart India Hackathon, Top 50 Global at the Google Solution Challenge). I independently reworked it into a full two-sided product — introducing the therapist-facing dashboard the original never scoped, and authoring the complete PRD and design system.",
      "The therapist dashboard spans the whole practice: a home view that surfaces the patients who need attention, a practice-analytics layer for clinical outcomes and revenue, a step-by-step programme builder, per-patient progress tracking (pain trends, form accuracy, joint range), scheduling, in-app messaging, alerts, billing, and a physiotherapist-first onboarding flow.",
    ],
    highlights: [
      "Designed the full therapist dashboard — from a needs-attention home view to practice analytics, scheduling, and billing.",
      "Built a step-by-step programme builder and per-patient progress tracking (pain, form accuracy, joint range).",
      "Introduced the therapist-facing surface the original patients-only concept never scoped.",
      "Authored the complete PRD and design system — a 23-screen breakdown across both experiences.",
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
        heading: "The problem — physios giving care away for free",
        body: [
          "India has roughly one physiotherapist for every 25,000 people. Independent practitioners already deliver remote care between visits — but informally, over WhatsApp: unpaid, invisible, and impossible to scale past 10–15 active patients without burning out.",
          "The result is revenue leakage from dropout, WhatsApp chaos with no visibility between visits, ad-hoc cash/UPI billing, and progress that’s anecdotal rather than evidenced.",
        ],
      },
      {
        heading: "The strategic bet — physiotherapist-first",
        body: [
          "Most health apps acquire patients directly and treat the doctor as a distribution channel. Formi inverts that: the physiotherapist is the primary customer. They build programmes, set prices, and invite patients — the patient’s app is an extension of the therapist’s clinical work.",
          "The model is financially aligned — Formi only earns a platform fee (8–12%) when a programme payment clears, so the product’s incentive is the therapist’s: more completed programmes. That’s the north-star metric — completed programmes per therapist per month.",
        ],
      },
      {
        heading: "The design challenge",
        body: [
          "The dashboard had to be a practice-management tool, not just a monitoring screen — reducing the cognitive load of running a multi-patient practice. The guiding constraint: a therapist should be able to do their full daily patient review in under 10 minutes.",
          "That meant surfacing what needs attention without noise, and making billing and communication effortless.",
        ],
      },
      {
        heading: "Surfacing what matters — the overview dashboard",
        body: [
          "The home screen prioritises by urgency: flagged patients (pain spike, form deterioration, missed sessions) rise to the top, then active patients by last session, then upcoming starts. A banner states it plainly — ‘X patients need your attention.’",
          "Each patient card carries last session, pain-trend arrow, completion %, payment status, and any active flags — so the therapist triages a whole caseload at a glance.",
        ],
      },
      {
        heading: "The programme builder — the gateway",
        body: [
          "Programme creation is the therapist’s primary action and the single gate every patient enters through. I designed a builder for setting duration, frequency, and per-exercise sets / reps / hold / rest from a clinician-validated exercise library — with per-exercise notes, transparent instalment pricing (platform fee shown before publishing), reusable templates, and draft states.",
        ],
      },
      {
        heading: "Alerts — the clinical safety layer",
        body: [
          "The alert system is the platform’s most important safety layer. It’s tiered Critical / Moderate / Informational so it surfaces action without flooding the therapist with noise: pain-spike (post-session pain up 2+ vs. the 3-session average), form-deterioration, missed-session, instalment-due, and programme-completion-approaching flags — each paired with a suggested action.",
        ],
      },
      {
        heading: "Billing without the admin",
        body: [
          "To replace cash-and-WhatsApp billing, the dashboard handles the money: a revenue view of collected vs. expected, per-patient payment logs with the platform fee shown, automatic instalment reminders, offline-payment marking, GST-compliant receipts, and weekly payouts — turning previously unbillable clinical time into tracked revenue.",
        ],
      },
      {
        heading: "One system, two apps — and the outcome",
        body: [
          "Everything sits on a design system I built from the ground up — the same teal, Inter type, and 4pt spacing shared with the patient app — so the two-sided product feels like one product, with dense clinical data rendered as calm, scannable views.",
          "The result: a 23-screen therapist dashboard spanning programme creation, patient monitoring, alerts, scheduling, billing, and reporting — the clinical-oversight half of Formi’s two-sided model, evolved from a patients-only college project into a full practice-management platform.",
        ],
      },
    ],
    study: {
      hero: {
        web: "hero-dashboard.png",
        app: "hero-app.png",
        webLabel: "Therapist dashboard — web",
        appLabel: "Patient app — iOS & Android",
        alt: "The Formi therapist dashboard with the patient app alongside it",
      },
      meta: [
        { label: "Role", value: "Product Designer — 0 to 1 (PRD, research, UX, UI, design system)" },
        { label: "Platforms", value: "Web dashboard for physiotherapists · Mobile app for patients" },
        { label: "Scope", value: "53 screens across two products, one connected system" },
        { label: "Timeline", value: "Ongoing · 2026" },
      ],
      glance: [
        { value: "53", label: "Screens across two products" },
        { value: "23 + 30", label: "Therapist dashboard + patient app" },
        { value: "8–12%", label: "Platform fee — the whole business model" },
        { value: "Top 50", label: "Google Solution Challenge, Global (as Proctify)" },
      ],
      glanceNote:
        "A physiotherapist-first platform that keeps the care relationship productive between clinic visits. Evolved from ‘Proctify’, a patients-only college project, into a full two-sided product — I authored the PRD, the research, and the design system, and introduced the therapist-facing half the original never scoped.",
      sections: [
        {
          id: "context",
          kicker: "Overview",
          heading: "Recovery doesn’t happen in the clinic",
          blocks: [
            {
              kind: "lead",
              text: "Physiotherapy recovery extends far beyond the appointment — yet almost every tool treats it as session-bound.",
            },
            {
              kind: "prose",
              body: [
                "A physiotherapist sees a patient for forty minutes a week. The other six days and twenty-three hours — the part where recovery actually happens or doesn’t — are invisible to them. Patients go home with a printed sheet of exercises and no way to know whether they’re doing them correctly.",
                "Formi closes that gap from both ends: a practice-management dashboard that gives therapists visibility into what happens at home, and a mobile app that gives patients real-time guidance while they exercise. One connected system, two very different jobs.",
              ],
            },
            {
              kind: "figure",
              src: "hero-dashboard.png",
              frame: "web",
              caption: "The therapist’s home view — the whole caseload triaged by who needs attention first.",
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
                "India has roughly one physiotherapist for every 25,000 people. Independent practitioners already deliver remote care between visits — but informally, over WhatsApp: unpaid, invisible, and impossible to scale past 10–15 active patients without burning out.",
                "The result is revenue leakage from dropout, no clinical visibility between visits, ad-hoc cash and UPI billing, and progress that’s anecdotal rather than evidenced. Two completely different jobs exist inside one recovery programme — therapists manage it, patients live it — and most tools address only one side.",
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
                "Recovery breaks down between appointments — and neither side can see it happening.",
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
                "I built the product around two people whose needs only overlap at one point: the programme itself. Everything else — what they want to see, when they open the app, what a good day looks like — pulls in opposite directions.",
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
                "Clustering what both groups told me produced three themes — and the useful finding was that each theme shows up on both sides of the relationship, as the same problem wearing different clothes.",
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
          heading: "The bet — physiotherapist-first",
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
              body: "Completed programmes per therapist per month — not signups, not sessions logged.",
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
                "Both products sit on a design system I built from the ground up — shared colour, type, and a 4pt spacing base — so the two-sided product reads as one product rather than two apps that happen to talk to each other. Dense clinical data had to render as calm, scannable views.",
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
                  "Recovery isn’t a straight line — it loops, dips, and comes back around. The arc was the shape that captured that without needing to say it, and it reappears through the product as progress rings and session markers.",
              },
              right: {
                kind: "figure",
                src: "logo-grid.png",
                frame: "web",
                caption:
                  "Constructed, not drawn — both arcs are cut from two circles overlapping a 76px square.",
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
                    "The home screen sorts by urgency, not alphabetically. Flagged patients rise to the top — pain spike, form deterioration, missed sessions — then active patients by last session, then upcoming starts.",
                    "A banner states the day plainly: X patients need your attention. That single line is what makes a ten-minute daily review possible.",
                  ],
                },
                {
                  src: "ui-patient-overview.png",
                  title: "The patient overview",
                  body: [
                    "Everything needed to prepare for a session in one view — health summary and medications on the left, current status on the right, clinical snapshot underneath.",
                    "Progress is stated in plain language: Post-Operative Knee Recovery, week 5 of 12, 42% complete. Pain score, form accuracy, joint range and adherence sit together, so the numbers are read as one clinical picture rather than four separate metrics.",
                  ],
                },
                {
                  src: "ui-programme-library.png",
                  title: "Programmes as reusable objects",
                  body: [
                    "Most programmes start as a variation of a previous one, not a blank page. The library shows duration, exercise count, enrolled patients and progress at a glance, with view, edit and duplicate on every card.",
                    "Creating from scratch is deliberately the one dashed card in the grid — available, but not the default path.",
                  ],
                },
                {
                  src: "ui-programme-builder.png",
                  title: "The programme builder",
                  body: [
                    "Programme creation is the therapist’s primary action and the single gate every patient enters through. Exercises are dragged from a clinician-validated library into the session, each with its own sets, reps, hold and rest.",
                    "Therapist instructions travel with the exercise, and a patient view preview shows exactly what will appear on the phone — so the therapist never has to guess how their prescription reads at the other end.",
                  ],
                },
                {
                  src: "ui-alerts.png",
                  title: "Alerts as the safety layer",
                  body: [
                    "Tiered Critical, Moderate and Informational so urgency stays visually distinct. A pain spike carries its own suggested action — “pain increased from 4/10 to 7/10 over the last two sessions” — rather than leaving the therapist to work out what changed.",
                    "Missed sessions, form deterioration, instalments due and completion milestones all run through the same tiering. One mental model to learn, not five, and every alert ends in a button rather than a dead end.",
                  ],
                },
                {
                  src: "ui-revenue.png",
                  title: "Revenue that tracks the clinical goal",
                  body: [
                    "The money view replaces cash-and-WhatsApp billing: revenue per clinic hour, package sell-through, instalment tracking and weekly payouts, turning previously unbillable clinical time into tracked revenue.",
                    "Completion rate sits in the header row beside revenue, and the treatment funnel states the intent in its own subtitle — completions are the goal, not a drop-off. The commercial metrics and the clinical ones point the same way by construction.",
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
                  "It changes what the funnel is for. Early drop-off stops being churn to win back and becomes a clinical risk group to intervene on — which is exactly what the alerts layer already exists to catch.",
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
                "It began as ‘Proctify’, a patients-only college project. The therapist half — the half that makes it a business rather than an app — wasn’t in the original scope at all.",
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
                "Two things I’d do differently. I designed the pose-tracking session on reasoning alone; it’s the riskiest surface in the product and the one that most needed a rough prototype in someone’s hands early, not a polished spec late. And I’d instrument completion rate from the first build rather than treating it as a reporting feature — the entire business model rests on that single number, so it should have been the first thing measurable.",
              ],
            },
            {
              kind: "list",
              items: [
                "Usability-test the guided session with real patients, on low-end Android, on the floor",
                "Pilot with clinics to find out whether an 8–12% fee survives how therapists actually price",
                "Track completion rate from day one — the north-star metric has to be observable",
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
    title: "Formi — Patient App",
    subtitle: "AI-guided recovery — patient mobile app",
    role: "Independent Product Design",
    timeline: "Ongoing",
    year: "2026",
    accent: "teal",
    cover: "home.png",
    hero: "splash.png",
    layout: "mobile",
    captions: true,
    summary:
      "The patient half of Formi — a React Native app that turns a physiotherapist’s prescription into a guided, AI-tracked daily recovery experience.",
    overview: [
      "Formi’s patient app is the home half of a two-sided physiotherapy platform. It answers one question: what does a patient do after they leave the clinic? It turns a physiotherapist’s prescription into a guided daily recovery experience on the phone.",
      "Built for React Native (iOS + Android), it carries a patient from a therapist’s code through AI-tracked exercise sessions, pain logging, progress, and messaging — designed for real patients: often older, low digital literacy, exercising one-handed on the floor with patchy signal.",
    ],
    highlights: [
      "Authored the complete patient-app design process — 30 screens across 7 groups and 5 journey phases.",
      "Adapted the web design system to mobile: touch targets, thumb-zone actions, safe areas, and a 14px font floor that survives 1.3× system scaling.",
      "Designed the core AI exercise session — live pose-tracking UI, real-time form correction, and glanceable rep counting.",
      "Designed the activation funnel — code → programme preview → payment → account → health profile.",
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
          "The patient app is the connective tissue for that gap — it has to keep a patient exercising correctly, safely, and motivated, entirely on their own phone.",
        ],
      },
      {
        heading: "Who it’s for — and the constraints that shaped it",
        body: [
          "The primary users are patients aged 30–65 across urban and semi-urban India, with low-to-moderate digital literacy — often exercising one-handed while lying on the floor or steadying a limb.",
          "That reality set hard, non-negotiable constraints for every screen:",
        ],
        list: [
          "44/48pt minimum touch targets and thumb-zone primary actions — the session must be completable one-handed",
          "A 14px body-text floor that doesn’t break at 1.3× system font scaling",
          "Offline-first sessions with a clear sync state — patients exercise where signal is poor",
          "Visual restraint during live camera tracking so pose estimation doesn’t drop frames on low-end Android",
        ],
      },
      {
        heading: "The design process",
        body: [
          "I worked in a deliberate order — mobile design system, then user-flow diagrams, lo-fi wireframes, a component library, high-fidelity screens, a device prototype, and finally developer handoff — because skipping the system and wireframe stages is expensive to fix later.",
          "The full journey was mapped into five phases with clear entry and exit conditions: Discovery → Activation → Daily use → Progress → Completion. Every screen belongs to exactly one phase.",
        ],
      },
      {
        heading: "One design system, two apps",
        body: [
          "The patient app inherits the therapist dashboard’s design system — the same teal (#1A7A8A), Inter type, and 4pt spacing base — adapted for mobile. I built the component library first: a 10-dot pain scale, progress rings, a form-score badge, the AI-correction banner, streak indicators, and skeleton loaders — so every screen is composed from consistent, tested blocks.",
        ],
      },
      {
        heading: "Activation & payment — the make-or-break funnel",
        body: [
          "The most critical business interaction. A patient enters the code their physiotherapist shared, then sees a full programme preview — therapist, condition, duration, and what’s included — so they know exactly what they’re paying for before any account exists.",
          "Payment runs through Razorpay; account creation happens after payment clears (a strong completion incentive), followed by a quick health profile and a deliberate ‘programme ready’ arrival moment.",
        ],
      },
      {
        heading: "The daily exercise session — the core",
        body: [
          "This is the hardest surface in the product: the camera is live, AI is processing, and the patient is physically moving — so every element has to be glanceable, never something to stop and read.",
          "A pre-session pain and energy check-in (with a red-flag gate that notifies the therapist if pain is high) leads into a live camera view with a MediaPipe skeleton overlay, colour-coded green / amber / red by form. A large mono rep counter pulses on each rep, a calm voice cue and a single correction banner nudge form, and a rest timer scores each set.",
        ],
      },
      {
        heading: "Progress, motivation & retention",
        body: [
          "To fight dropout, the app scaffolds motivation: streaks that rest days don’t break, a weekly day-chip row, pain-trend sparklines, milestone confetti, and progress rings — plus reports and direct messaging that keep the therapist present between visits.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "The result is a complete, developer-ready design system and a 30-screen React Native specification — the patient half of Formi’s two-sided model, annotated for engineering with states, spacing, and interactions.",
        ],
      },
    ],
    /* Companion piece to `formi` — picks up from the dashboard case study
       rather than restating its problem/research narrative. */
    study: {
      hero: {
        app: "/projects/formi/hero-app.png",
        appLabel: "Patient app — iOS & Android",
        alt: "The Formi patient app join screen",
      },
      meta: [
        { label: "Role", value: "Product Designer — UX, UI, and design system (shared with the dashboard)" },
        { label: "Platform", value: "Native mobile, iOS & Android" },
        { label: "Scope", value: "30 screens" },
        { label: "Timeline", value: "Ongoing · 2026 — same engagement as the dashboard" },
      ],
      glance: [
        { value: "30", label: "Screens in the patient app" },
        { value: "1", label: "Design system shared with the dashboard" },
        { value: "2", label: "Native platforms — iOS & Android" },
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
                "The therapist dashboard exists to give clinicians visibility between appointments. The patient app is the other end of that same connection — where the recovery actually happens: doing the exercises, getting real-time form feedback, watching pain and progress move week to week.",
                "This page picks up from the dashboard case study rather than repeating it — the platform research and the business model live there. What follows is the same product seen from the other end.",
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
                "Physiotherapy has a completion problem. Most of a programme happens at home, unsupervised, in the days between appointments — and that is exactly where it falls apart. Form degrades with nobody watching. Pain easing gets mistaken for the injury being healed, so people stop early. Nothing and nobody registers that they stopped until the next visit, if there is one.",
                "The people doing this are not the people the fitness-app category is designed for. They’re 30–65, across urban and semi-urban India, with low-to-moderate digital literacy — often exercising one-handed while lying on the floor or steadying a limb, on a mid-range Android, on patchy signal. Every assumption a polished consumer app makes about attention, dexterity and connectivity is wrong here.",
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
                "Between one appointment and the next, nobody — not the patient, not the therapist — can tell whether recovery is actually happening.",
            },
            {
              kind: "prose",
              body: [
                "And the patient is often not alone. A family member or guardian is frequently the one holding the phone, positioning the camera, or watching to catch the moment something looks wrong — carrying real responsibility for the recovery while the product speaks only to the patient.",
              ],
            },
            {
              kind: "todo",
              items: [
                "The caregiver paragraph above is reasoned from your definition, not from research. If there’s anything real behind it — something a patient or a family member actually said — it belongs here instead.",
              ],
              note: "Once there’s material on both sides, this section could become a two-column patient/caregiver breakdown, the same shape as the themes matrix on the dashboard case study.",
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
              role: "Family caregiver — helps his wife through her daily sessions at home",
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
              kind: "todo",
              items: [
                "The caregiver persona above is derived, not researched — I built it from your definition (family member or guardian assisting at home) plus the emergency-contact field the dashboard already carries. The goals and frustrations are reasoned, not things anyone told you. Confirm or correct them before this publishes.",
              ],
            },
            {
              kind: "prose",
              body: [
                "The full persona work sits on the dashboard case study — this is here so the page stands on its own for anyone landing on it directly.",
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
                    "A patient arrives through a link their physiotherapist gave them, and sees a preview of the programme before committing to anything — condition, duration, what’s included.",
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
                    "During a session the AI tracks the patient’s pose and coaches them through it live — spoken cues alongside visual ones, so the patient never has to stop mid-movement to read anything.",
                    "That dual channel is also what makes the session usable by a caregiver. A family member holding the phone can follow the same cues and correct the patient themselves, which is the only way this works for someone who can’t manage it alone.",
                  ],
                },
                {
                  src: ["ui-messaging-conversation.png", "ui-messaging-video-call.png"],
                  title: "The physiotherapist stays reachable",
                  body: [
                    "Scheduled check-ins put the physiotherapist in the patient’s week by default rather than on request, so contact isn’t something the patient has to work up to asking for.",
                    "Emergencies skip the schedule. A pain spike opens an immediate route to the therapist — messaging or a video call — because the alternative is a frightened patient guessing, or quietly stopping.",
                  ],
                },
                {
                  src: ["ui-progress.png", "ui-progress-trends.png", "ui-progress-trends-2.png"],
                  title: "Feedback, and proof that it’s working",
                  body: [
                    "Every session ends with a question the patient can actually answer: what did the pain feel like? That single input drives an AI-written summary, which goes straight to the physiotherapist without the patient having to report anything themselves.",
                    "What comes back to the patient is the plain-language version — where they are, what’s improving. For someone recovering alone, seeing the trend move is what makes the next session feel worth doing.",
                  ],
                },
              ],
            },
            {
              kind: "todo",
              items: [
                "Swipe-to-pay — the payment gate is described above, but not why a swipe rather than a button or a card form. If it ties back to the dashboard’s “zero friction onboarding” decision, that’s the argument.",
                "Onboarding — the gallery holds an onboarding flow, an onboarding profile and a split variation, which suggests more than one approach was explored. Worth an A/B framing if that’s accurate.",
              ],
              note: "Collage frames are cropped to a phone aspect; the uncropped screens are in the gallery at the foot of the page.",
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
                "It was designed without a working prototype in front of real patients. That’s stated here the same way it’s stated on the dashboard case study — the session flow is a considered argument, not a validated one.",
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
                { value: "2", label: "Native platforms — iOS & Android" },
              ],
            },
            {
              kind: "callout",
              title: "Being straight about it",
              body:
                "Same caveat as the dashboard: this is a designed system with an argument behind it, not a validated product. The guided session in particular needs real usability testing on low-end Android, in someone’s hands, on the floor, before any claim that it works would be honest.",
            },
            {
              kind: "todo",
              items: [
                "A closing line specific to the patient app, if you want one beyond what the dashboard page already says.",
              ],
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
      "Turning an undirected brief into a design system — brand, component language, and a single-scroll landing page built from scratch for a legal-AI product’s launch.",
    overview: [
      "Conqr.ai is an AI legal assistant for lawyers. The client wanted their website redesigned but had no point of view on what it should look like, feel like, or say — a harder brief than a detailed one.",
      "Over two months the engagement produced a brand design system — colour, typography and a component language — and a single-scroll landing page built from scratch for the product’s public launch.",
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
          "Conqr.ai is an AI-powered legal co-pilot for corporate legal teams. Alongside overhauling the product UI, I was brought in — as the sole freelance designer — to give it something it didn’t have: a landing page.",
        ],
      },
      {
        heading: "The goal",
        body: [
          "The platform had no landing page to communicate its value to potential clients. I designed one from scratch to speak directly to corporate legal teams — an audience that prizes clarity, precision, and professionalism above all.",
        ],
      },
      {
        heading: "Grounded in one visual system",
        body: [
          "The landing page shares the product’s visual system — a neutral base with a single deep-navy accent (#0C4160) and the Merriweather / Lato pairing — so the marketing site and the product feel like one, credible brand.",
        ],
      },
      {
        heading: "Structure first",
        body: [
          "I wireframed the page in low fidelity to lock layout and hierarchy before any visual design — a strong hero, then capabilities, then trust.",
        ],
      },
      {
        heading: "The page",
        body: [
          "It leads with a bold hero — ‘Redefine Your Legal Process With Streamlined Solutions’ — then moves through the key capabilities (every document instantly searchable, due diligence at light speed, intelligence where you work), and builds trust with testimonials, an FAQ, and a ‘confidential by default’ security section. No clutter, no noise.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "A single-scroll marketing page that communicates Conqr.ai’s value clearly and quickly — built to convert a professional legal audience.",
        ],
      },
    ],
    /* Not a product design story — a story about managing an ambiguous
       client engagement. The friction at the end is the credibility; it is
       written plainly rather than smoothed over. */
    study: {
      hero: {
        web: "landing-hero.png",
        webLabel: "Conqr.ai — the shipped landing page",
        alt: "The Conqr.ai landing page",
      },
      meta: [
        { label: "Client", value: "Conqr.ai — AI legal assistant for lawyers" },
        { label: "Project type", value: "Freelance / contract — solo, direct client engagement" },
        { label: "Timeline", value: "2 months" },
        { label: "Scope", value: "Brand & design system, a landing page from scratch, and a visual redesign of the product screens" },
      ],
      glance: [
        { value: "3–4", label: "Full iterations before a direction held" },
        { value: "2", label: "Deliverables — a design system and a landing page" },
        { value: "Solo", label: "No PM, no team" },
      ],
      glanceNote:
        "A visual redesign, not a product one. Conqr.ai’s legal AI assistant — its features and its flows — was built separately. This work was the brand identity, the design system, a landing page from scratch for the launch, and that system applied across the product’s existing screens.",
      sections: [
        {
          id: "context",
          kicker: "Overview",
          heading: "“Redesign our website” — with no sense of direction",
          blocks: [
            {
              kind: "prose",
              body: [
                "Conqr.ai came in with a clear ask and an unclear target. They wanted their website redesigned, but had no point of view on what it should look like, feel like, or say.",
                "That’s a harder brief than a detailed one. There’s no direction to react to — only a blank page to fill on the client’s behalf, and no way to tell whether you’ve filled it correctly until you show them.",
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
                "With no strong brief to anchor to, the process leaned on showing rather than asking. I brought a wide set of visual references to give the client something concrete to react to, then iterated on whatever pulled them in a direction — a loop of “does this feel more like it, or less”.",
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
            {
              kind: "todo",
              items: [
                "The iterations above are in filename order, not chronological order — tell me the actual sequence, rough to refined.",
                "One line per round on what changed and why it moved the client. That progression is what communicates the ambiguity-to-clarity arc; without captions it reads as seven similar screens.",
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
                "Two deliverables came out of the two months: a brand design system — colour, typography and component language, arrived at through the iteration above — and the landing page itself, built from scratch rather than as a redesign of an existing page, single-scroll, used for the product’s public launch.",
              ],
            },
            {
              kind: "figure",
              src: "landing-full.png",
              frame: "scroll",
              caption: "The full page, top to bottom — scroll inside the frame",
            },
            {
              kind: "todo",
              items: [
                "Whether to mention that Conqr.ai has since redesigned their landing page and platform again. If yes, frame it factually: “the version shown here was used for their [year] launch and has since been updated.” If you’d rather not, cut the line and let the page stand as a point-in-time record.",
              ],
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
                "The features and the flows were the client’s. The visual language was mine — and it was carried onto the product itself: the workspace where legal teams draft, review and pay for agreements.",
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
                "The engagement ran the full two months, delivered a settled design system and a shipped landing page — and the client still wasn’t fully satisfied at the end. That’s part of the case study rather than something to smooth over.",
                "What it taught: how to build a design system from a genuinely ambiguous brief, and how to convert vague, shifting requirements into decisions that actually ship — even when “shipped” and “everyone’s happy” don’t fully overlap.",
              ],
            },
            {
              kind: "todo",
              items: [
                "A more specific lesson, if you want to name one — e.g. what you’d do differently to reach alignment faster next time.",
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
    subtitle: "Immersive e-book reader — mobile app",
    role: "Independent Project",
    timeline: "Concept · 2–3 months",
    year: "2024",
    accent: "coral",
    cover: "frame-44.png",
    hero: "frame-44.png",
    layout: "mobile",
    summary:
      "A subscription e-book reader designed to feel as immersive as reading a physical book — with a signature colour-coded, sticky-note tab system.",
    overview: [
      "Autumn is a subscription e-book reader designed to feel as immersive as reading a physical book — with the goal of boosting reading engagement and authenticity.",
      "Its signature feature is a set of personalised, colour-coded tabs that slide out into a sticky-note-style panel without leaving the page — alongside custom highlights, a distraction-free reading interface, bookmarks, and collapsible annotations, all in a warm, autumn-inspired visual system.",
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
          "The objective was to craft a digital reading interface that delivers a seamlessly immersive experience for readers — mirroring the engagement and authenticity of reading a physical copy.",
        ],
      },
      {
        heading: "The concept",
        body: [
          "Autumn is a harmonious blend of intuitive, user-friendly design and a carefully curated palette of warm colour tones — chosen to invoke a sense of warmth and familiarity, like flipping through the pages of a cherished novel.",
        ],
      },
      {
        heading: "Signature feature — sticky-note tabs",
        body: [
          "The stand-out interaction is a set of personalised, colour-coded tabs that slide out into a sticky-note-style panel without ever leaving the page — bringing the tactile, annotate-anywhere feeling of a physical book to the screen.",
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
          "A warm, autumn-inspired palette and the Mulish typeface (Light → Semi-Bold) keep the experience calm, legible, and focused — the visual equivalent of a quiet reading nook.",
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
        { label: "Project type", value: "Independent Product Design — personal project" },
        { label: "Role", value: "Solo — first UI/UX project, designed entirely from scratch" },
        { label: "Platform", value: "Mobile app" },
        { label: "Status", value: "Concept — designed, never built or shipped" },
        { label: "Timeline", value: "2–3 months" },
      ],
      glance: [
        { value: "12–15", label: "Screens designed" },
        { value: "2–3 mo", label: "Solo, start to finish" },
        { value: "Concept", label: "Never built" },
      ],
      glanceNote:
        "An e-book reader that starts from the physical reading experience instead of from a feature list — built to ask one narrow question rather than to compete with a Kindle.",
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
                "A concept, and only ever a concept — 12–15 screens designed over two to three months. Nothing here was built or shipped.",
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
                "The first independent project — built solo, end to end, with no client or team to answer to. Scope was deliberately core-first.",
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
                  "Most e-readers organise saved content the way a file system does — folders, lists, favourites. That’s software logic applied to a book.",
                  "Autumn’s tabs skip that model and mimic the physical habit directly: a tab sticks out from the edge of the page, visible while flipping through, findable by feel and memory rather than by opening a menu.",
                  "It’s a small decision, but it’s the one that best captures the whole premise — digital reading should borrow its logic from books, not from software.",
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
                "None of what follows has been designed or scoped. No screens exist for any of it — this is a vision statement, not a set of implied deliverables.",
            },
            {
              kind: "list",
              items: [
                "A marketplace — Kindle-style subscription access to a book library",
                "Sharing and gifting — two subscribers exchanging an annotated copy, margin notes included, or gifting a book outright",
                "Reading together — a collaborative mode where two people read the same book on their own time and leave annotations for each other to find",
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
                "A personal project, and the one that opened UI/UX design up for me. No client, no team, no brief — which meant the problem had to be found rather than handed over.",
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

export type TimelineItem = {
  year: string;
  type: string;          // shown as a tag
  accent: string;        // palette var
  title: string;
  org?: string;
  description: string;
  image?: string;        // filename in public/timeline/
  placeholder?: boolean; // dashed styling until real details are added
};

export const timeline: TimelineItem[] = [
  {
    year: "2020",
    type: "Education",
    accent: "violet",
    title: "Started B.Tech, Computer Science",
    org: "Maharaja Agrasen Institute of Technology",
    description:
      "Where the foundation was laid — computer science, with a growing pull toward how products actually feel to use.",
  },
  {
    year: "2022",
    type: "Recognition",
    accent: "coral",
    title: "Hackathon breakthroughs",
    org: "Google Solution Challenge · Smart India Hackathon",
    description:
      "Top 50 Global and Top 15 nationally with Proctify — my first taste of designing real products under pressure.",
  },
  {
    year: "2022–23",
    type: "Learning",
    accent: "yellow",
    title: "Design certifications",
    org: "Accenture · NPTEL · InnovateU",
    description:
      "UX Design, Product Design & Development, and more — turning instinct into deliberate craft.",
  },
  {
    year: "Feb 2024",
    type: "First role",
    accent: "blue",
    title: "UI/UX Design Intern at FourCore",
    org: "Breach & Attack Simulation platform",
    description:
      "My first design internship — stepping straight into complex B2B cybersecurity.",
  },
  {
    year: "2024",
    type: "Conversion",
    accent: "teal",
    title: "Converted to full-time UI/UX Designer",
    org: "FourCore",
    description:
      "Earned a full-time seat and built the product’s first design system from the ground up.",
  },
  {
    year: "Oct 2024",
    type: "Judge",
    accent: "pink",
    title: "Design competition judge",
    org: "Design Verse · BVCOE, New Delhi",
    description:
      "Invited to judge Design Verse — a two-day design seminar & competition (IEEE Student Branch) — reviewing student projects and awarding the winning teams.",
    // image kept in public/timeline/ — reference removed for now
  },
  {
    year: "Aug 2025",
    type: "Promotion",
    accent: "teal",
    title: "Promoted to Senior UI/UX Designer",
    org: "FourCore",
    description:
      "Now leading a junior designer and working directly with product and engineering to ship features.",
  },
];

export type Skill = { name: string; tier?: "primary" | "medium" };

export const capabilities: { title: string; accent: string; skills: Skill[] }[] = [
  {
    title: "Design",
    accent: "coral",
    skills: [
      { name: "Product Design", tier: "primary" },
      { name: "UI/UX Design", tier: "primary" },
      { name: "Design Systems", tier: "primary" },
      { name: "User Research", tier: "medium" },
      { name: "Prototyping", tier: "medium" },
      { name: "Interaction Design" },
      { name: "Wireframing" },
      { name: "Typography" },
    ],
  },
  {
    title: "Tools",
    accent: "blue",
    skills: [
      { name: "Figma", tier: "primary" },
      { name: "Figma Make", tier: "primary" },
      { name: "Sketch" },
      { name: "Canva" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "GitLab" },
    ],
  },
  {
    title: "AI & Productivity",
    accent: "violet",
    skills: [
      { name: "Figma AI", tier: "primary" },
      { name: "ChatGPT (GPT-5)", tier: "primary" },
      { name: "Claude Design", tier: "primary" },
      { name: "Prompt Engineering", tier: "medium" },
      { name: "AI-assisted UX Research", tier: "medium" },
      { name: "OpenAI Codex" },
      { name: "OpenCode" },
      { name: "PRD Authoring" },
      { name: "Design Documentation" },
      { name: "Frontend Prototyping" },
    ],
  },
];

export const marqueeWords = [
  "Product Design",
  "Design Systems",
  "User Research",
  "Prototyping",
  "Interaction Design",
  "Healthtech",
  "0 → 1",
  "Figma",
  "Typography",
  "Design that ships",
];

export const recognition = {
  highlights: [
    { rank: "Top 50", scope: "Global", event: "Google Solution Challenge", year: "2022", accent: "coral" },
    { rank: "Top 15", scope: "National", event: "Smart India Hackathon", year: "2022", accent: "blue" },
    { rank: "Rank 4", scope: "of 150", event: "LiveTheCode Hackathon", year: "", accent: "violet" },
  ],
  alsoPlaced: [
    "Runner-Up — Evotech 5.0 Ideathon",
    "Top 50 / 115 — DotSlash 5.0",
  ],
  certifications: {
    featured: { name: "UX Design", by: "Accenture" },
    others: [
      "Product Design & Development — NPTEL (85%)",
      "Functional & Conceptual Design — NPTEL (84%)",
      "UX Design Workshop — InnovateU",
    ],
  },
  education: {
    degree: "B.Tech, Computer Science",
    school: "Maharaja Agrasen Institute of Technology",
    years: "2020 — 2024",
    cgpa: "8.91 / 10",
  },
  mentorship: {
    num: "300+",
    org: "Girl Code It",
    text: "Ran a Git & GitHub fundamentals session for 300+ students and mentored 5+ through a UI development bootcamp.",
  },
};
