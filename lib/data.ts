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
  dir: string;               // folder in public/projects/
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  year: string;
  accent: string;            // theme colour (CSS var name)
  cover: string;             // card image filename
  hero?: string;             // detail-page banner filename (defaults to cover)
  layout?: "web" | "mobile"; // gallery column style
  summary: string;           // one-liner for the card
  overview: string[];        // paragraphs for the detail page
  highlights: string[];
  tags: string[];
  tools?: string[];
  metrics?: { value: string; label: string }[];
  gallery: string[];         // filenames shown on the detail page
  link?: string;             // optional external link
  featured?: boolean;
};

export const projects: Project[] = [
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
];

export const experience = [
  {
    company: "FourCore",
    context: "Breach & Attack Simulation Platform · New Delhi",
    period: "Feb 2024 — Present",
    titles: "UI/UX Intern → Designer → Senior UI/UX Designer",
    accent: "yellow",
    points: [
      "Redesigned the FourCore website end-to-end (10+ screens, mobile & desktop) in a 2-month sprint, then led the ground-up redesign of the core adversary-emulation platform’s UI.",
      "Built the product’s first design system — components, spacing, and interaction patterns — bringing visual consistency and speeding up how fast new screens ship.",
      "Restructured how attack-simulation data is presented, turning dense security output into views users can read and act on quickly.",
      "Promoted to Senior (Aug 2025); now lead a junior designer and work directly with PM and engineering to turn research into shipped features.",
    ],
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
