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
    slug: "sachet",
    dir: "sachet",
    title: "Sachet",
    subtitle: "Enterprise security operations (SOC) platform",
    role: "Product & UI/UX Design",
    timeline: "Case study",
    year: "2025",
    accent: "violet",
    cover: "frame-10.png",
    hero: "macbook-pro-14-1.png",
    layout: "web",
    summary:
      "A Security Operations Center platform that helps enterprises cut alert fatigue and respond to incidents faster — landing page and analytics dashboard.",
    overview: [
      "Sachet is a Security Operations Center (SOC) platform built to simplify security operations for the enterprise — giving teams complete visibility, less alert fatigue, and faster incident response from one intelligent dashboard.",
      "The work spanned both the marketing site and the core product: turning dense security telemetry — real-time threat detection, automated incident-response workflows, unified analytics, and compliance-ready reporting — into a calm, scannable interface analysts can act on quickly.",
    ],
    highlights: [
      "Designed the marketing landing page and the SOC analytics dashboard.",
      "Structured threat detection, incident-response workflows, and compliance reporting into one unified, scannable UI.",
      "Balanced enterprise depth with startup-level clarity.",
    ],
    tags: ["Product Design", "Dashboard", "Cybersecurity", "B2B"],
    tools: ["Figma"],
    gallery: ["frame-10.png"],
    featured: true,
  },
  {
    slug: "conqr-platform",
    dir: "conqr-platform",
    title: "Conqr.ai — Platform",
    subtitle: "Legal-AI product — UI overhaul",
    role: "Solo Freelance",
    timeline: "~2 months",
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
    metrics: [{ value: "12", label: "Screens redesigned" }],
    gallery: ["home-dashboard.png", "home-alldocuments.png", "home-payments.png", "conqr.png"],
    featured: true,
  },
  {
    slug: "conqr-landing",
    dir: "conqr-landing",
    title: "Conqr.ai — Landing",
    subtitle: "Legal-AI marketing landing page",
    role: "Solo Freelance",
    timeline: "~2 months",
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
    metrics: [{ value: "1.8k+", label: "Behance views" }],
    gallery: ["frame-785.png", "frame-746.png", "rectangle.png"],
    link: "https://www.behance.net/designwithaditi",
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
    hero: "frame-36.png",
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
    gallery: [
      "frame-44.png",
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
    image: "design-verse.jpg",
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
