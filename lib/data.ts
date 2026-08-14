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

/** one screen plus the commentary that pins beside it while it scrolls */
export type ScrollyStep = { src: string; title: string; body: string[] };

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
      frame?: "web" | "mobile" | "bleed" | "card";
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
    /* TODO — case study. Fill `sections` to move this project onto the
       case-study template; `formi` below is the worked example, and the
       `Block` union above lists every block kind available. While `sections`
       is empty the page keeps its current overview + caseStudy layout.
       Suggested spine: context · problem · research · themes · strategy ·
       system · surfaces · decisions · outcome */
    study: {
      meta: [],    // Role / Platforms / Scope / Timeline — the header strip
      glance: [],  // outcome numbers, shown high on the page
      sections: [],
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
    role: "Senior UI/UX Designer",
    timeline: "2-month sprint",
    year: "2025",
    accent: "blue",
    professional: true,
    cover: "new-home-hero.jpg",
    hero: "new-home-hero.jpg",
    layout: "web",
    summary:
      "A ground-up overhaul of FourCore’s marketing website — the public face of a breach-and-attack-simulation platform — from a cluttered legacy site to a focused, modern dark experience.",
    overview: [
      "FourCore ATTACK is a breach-and-attack-simulation platform — security teams use it to continuously emulate real-world adversaries and validate that their defenses actually work. This was my professional work as Senior UI/UX Designer at FourCore: a complete redesign of the company’s website.",
      "The old site had grown cluttered and inconsistent. I rebuilt the core pages end-to-end — home, platform, demo, about, and blog, across desktop and mobile — into a focused, high-contrast dark experience that reads as serious, credible security tooling.",
    ],
    highlights: [
      "Redesigned the FourCore website end-to-end (10+ screens, desktop & mobile) in a 2-month sprint.",
      "Replaced a cluttered legacy hero with a single, confident message — ‘Security Control Validation. Supercharged.’",
      "Established a consistent dark visual system and reusable components across every page.",
      "Turned a raw Calendly demo embed into a designed conversion flow.",
    ],
    tags: ["Website", "Product Marketing", "Cybersecurity", "B2B"],
    tools: ["Figma"],
    metrics: [
      { value: "10+", label: "Screens" },
      { value: "2 mo", label: "Sprint" },
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
    /* TODO — case study. See the note on `fourcore-platform` above.
       This one has real before/after material: use `compare` blocks. */
    study: {
      meta: [],
      glance: [],
      sections: [],
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
    /* TODO — case study. The companion piece to `formi`: keep it shorter and
       scoped to the mobile surface, and cross-link back rather than restating
       the shared research. Use `frame: "mobile"` on figure blocks. */
    study: {
      meta: [],
      glance: [],
      sections: [],
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
    slug: "conqr-platform",
    dir: "conqr-platform",
    title: "Conqr.ai — Platform",
    subtitle: "Legal-AI product — UI overhaul",
    role: "Solo Freelance",
    timeline: "1 month",
    year: "2025",
    accent: "blue",
    cover: "cover-image.jpg",
    hero: "cover-image.jpg",
    layout: "web",
    summary:
      "A ground-up UI overhaul of Conqr.ai's legal-AI product — the document workspace where legal teams draft, review, and manage agreements.",
    overview: [
      "Conqr.ai is a legal-AI assistant. This project was a ground-up UI overhaul of the product — the workspace where legal teams draft, review, track, and pay for their agreements.",
      "Dense document management (all-documents views, dashboards, payments, approvals) was restructured into a calm, credible interface that feels approachable rather than intimidating — enterprise power with human simplicity.",
    ],
    highlights: [
      "Redesigned 10–12 core product screens solo.",
      "Restructured the document workspace: dashboard, all-documents, approvals, and payments.",
      "Set a calm, trustworthy visual tone for a legal-AI product.",
    ],
    tags: ["Product Redesign", "SaaS", "Legal AI", "Design System"],
    tools: ["Figma"],
    metrics: [
      { value: "12", label: "Screens redesigned" },
      { value: "4", label: "Process stages" },
      { value: "1 mo", label: "Timeline" },
    ],
    caseStudy: [
      {
        heading: "The project",
        body: [
          "Conqr.ai is an AI-powered legal co-pilot for corporate legal teams — it helps them automate document creation, track compliance, and streamline due-diligence workflows. I joined as the sole freelance UI designer to establish a cohesive visual identity across the product.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "The platform had no unified visual language — screens felt inconsistent across components, typography, and colour usage. For a product that needs to feel precise and trustworthy to corporate legal teams, that inconsistency was quietly undermining credibility.",
        ],
      },
      {
        heading: "The process",
        body: [
          "I worked in four stages — Audit, Wireframe, Visual System, Final UI.",
          "It began with a UI audit of the existing platform, cataloguing inconsistencies across components, typography, and colour — the map of everything to fix.",
        ],
      },
      {
        heading: "Wireframes — structure before style",
        body: [
          "Before committing to any visual direction, I mapped the core screens in low fidelity. The focus was structure, information hierarchy, content flow, and the user journey — without the distraction of colour or detail.",
        ],
      },
      {
        heading: "A visual system built for authority",
        body: [
          "The design language is a neutral base palette with a single purposeful accent — a deep navy (#0C4160) — keeping the interface modern and clean without losing the authority a corporate legal audience expects.",
          "Merriweather and Lato were chosen for legibility and professionalism, and a component library was built in Figma so every screen stays consistent.",
        ],
      },
      {
        heading: "The redesign",
        body: [
          "I applied the system across the product: the dashboard, an all-documents workspace (table and kanban views), plan and pricing, and document upload / compare — turning dense legal document management into calm, consistent, scannable screens.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "A cohesive, componentised platform UI delivered end-to-end in a one-month freelance engagement — the product half of a project that also produced Conqr.ai’s landing page.",
        ],
      },
    ],
    /* TODO — case study. See the note on `fourcore-platform` above. */
    study: {
      meta: [],
      glance: [],
      sections: [],
    },
    gallery: [
      "board-overview.jpg",
      "board-wireframes.jpg",
      "board-visual-system.jpg",
      "board-platform-redesign.jpg",
      "home-dashboard.png",
      "home-alldocuments.png",
      "home-payments.png",
    ],
    link: "https://www.behance.net/gallery/249693337/Conqrai-UI-Redesign-Landing-Page-Design",
    featured: true,
  },
  {
    slug: "conqr-landing",
    dir: "conqr-landing",
    title: "Conqr.ai — Landing",
    subtitle: "Legal-AI marketing landing page",
    role: "Solo Freelance",
    timeline: "1 month",
    year: "2025",
    accent: "teal",
    cover: "landing-hero.png",
    hero: "landing-hero.png",
    layout: "web",
    summary:
      "The single-scroll marketing landing page for Conqr.ai, designed from scratch — “Legal Intelligence. Perfected.”",
    overview: [
      "The single-scroll marketing landing page for Conqr.ai, designed from scratch. “Legal Intelligence. Perfected.” — the page positions an enterprise-grade legal-AI product with startup speed and human simplicity.",
      "It leads with a confident value proposition and layered product previews that build trust quickly and drive toward a free-trial CTA.",
    ],
    highlights: [
      "Designed the single-scroll landing page end-to-end.",
      "Crafted the hero, product previews, and conversion flow.",
      "Shaped an approachable, trustworthy brand tone.",
    ],
    tags: ["Landing Page", "Marketing", "Brand", "Web"],
    tools: ["Figma"],
    metrics: [
      { value: "1 mo", label: "Timeline" },
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
    /* TODO — case study. See the note on `fourcore-platform` above. */
    study: {
      meta: [],
      glance: [],
      sections: [],
    },
    gallery: [
      "board-landing-page.jpg",
      "board-overview.jpg",
      "board-visual-system.jpg",
      "frame-785.png",
      "frame-746.png",
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
    timeline: "Concept",
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
    /* TODO — case study. See the note on `fourcore-platform` above.
       A concept project, so lean on `callout` (the idea), `swatches` and
       `figures` for the visual system, and be honest in `outcome`. */
    study: {
      meta: [],
      glance: [],
      sections: [],
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
