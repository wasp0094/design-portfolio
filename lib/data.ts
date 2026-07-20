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
};

export const projects: Project[] = [
  {
    slug: "formi",
    dir: "formi",
    title: "Formi",
    subtitle: "Physiotherapy platform — two-sided product",
    role: "Independent Product Design",
    timeline: "Ongoing",
    year: "2026",
    accent: "teal",
    cover: "dashboard.png",
    hero: "dashboard.png",
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
    cover: "conqr.png",
    hero: "conqr.png",
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
      { value: "1.8k+", label: "Behance views" },
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

  /* ---- TEMPLATE PROJECTS ------------------------------------
     Fill one of these in to add a real project:
     1. drop screenshots in public/projects/<dir>/
     2. set `dir`, `cover`, optional `hero`, and `gallery`
     3. replace the copy and remove `template: true`
     ---------------------------------------------------------- */
  {
    slug: "project-6",
    title: "Your next project",
    subtitle: "One-line project subtitle",
    role: "Your role",
    timeline: "Timeline",
    year: "20XX",
    accent: "pink",
    template: true,
    layout: "web",
    summary: "A short one-line description of the project, shown on the card.",
    overview: [
      "Add a paragraph describing the project — what it is, who it’s for, and the problem it solves.",
      "Add a second paragraph about your approach, key decisions, and the outcome.",
    ],
    highlights: ["Key contribution #1", "Key contribution #2", "Key contribution #3"],
    tags: ["Tag", "Tag", "Tag"],
    tools: ["Figma"],
  },
  {
    slug: "project-7",
    title: "Your next project",
    subtitle: "One-line project subtitle",
    role: "Your role",
    timeline: "Timeline",
    year: "20XX",
    accent: "yellow",
    template: true,
    layout: "web",
    summary: "A short one-line description of the project, shown on the card.",
    overview: [
      "Add a paragraph describing the project — what it is, who it’s for, and the problem it solves.",
      "Add a second paragraph about your approach, key decisions, and the outcome.",
    ],
    highlights: ["Key contribution #1", "Key contribution #2", "Key contribution #3"],
    tags: ["Tag", "Tag", "Tag"],
    tools: ["Figma"],
  },
  {
    slug: "project-8",
    title: "Your next project",
    subtitle: "One-line project subtitle",
    role: "Your role",
    timeline: "Timeline",
    year: "20XX",
    accent: "blue",
    template: true,
    layout: "web",
    summary: "A short one-line description of the project, shown on the card.",
    overview: [
      "Add a paragraph describing the project — what it is, who it’s for, and the problem it solves.",
      "Add a second paragraph about your approach, key decisions, and the outcome.",
    ],
    highlights: ["Key contribution #1", "Key contribution #2", "Key contribution #3"],
    tags: ["Tag", "Tag", "Tag"],
    tools: ["Figma"],
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
    year: "Aug 2024",
    type: "Education",
    accent: "violet",
    title: "Graduated B.Tech — 8.91 / 10 CGPA",
    org: "Maharaja Agrasen Institute of Technology",
    description:
      "Wrapped up the degree while already shipping design work at FourCore.",
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
  {
    year: "2026",
    type: "Promotion",
    accent: "coral",
    title: "Promoted to Product Designer",
    org: "FourCore",
    description:
      "A formal step up from UI/UX to Product Designer — owning problems end-to-end, from research through shipped UI.",
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
