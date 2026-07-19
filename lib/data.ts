/* ============================================================
   CONTENT — edit this file to update the site.
   Add a project by appending to the `projects` array.
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
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  year: string;
  accent: string;   // theme colour (CSS var name from palette)
  image?: string;   // e.g. "/projects/formi.png" — drop file in public/projects/
  summary: string;
  highlights: string[];
  tags: string[];
  metrics?: { value: string; label: string }[];
  link?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "formi",
    title: "Formi",
    subtitle: "Physiotherapy platform — two-sided product",
    role: "Independent Product Design",
    timeline: "Ongoing",
    year: "2026",
    accent: "teal",
    summary:
      "Evolved from ‘Proctify’, a college project for patients only, into Formi — a full two-sided platform connecting physiotherapists and patients through AI-guided remote recovery.",
    highlights: [
      "Introduced a therapist-facing web dashboard the original concept never accounted for.",
      "Rebuilt workflow, information architecture, and a programme-delivery model from the ground up.",
      "Authored the complete PRD and design system — a 23-screen breakdown across both experiences.",
    ],
    tags: ["Product Design", "Design System", "Healthtech", "0→1"],
    metrics: [
      { value: "23", label: "Screens" },
      { value: "2", label: "Sided surfaces" },
      { value: "Top 15", label: "Smart India Hackathon" },
    ],
    featured: true,
  },
  {
    slug: "conqr",
    title: "Conqr.ai",
    subtitle: "Legal AI assistant platform",
    role: "Solo Freelance",
    timeline: "~2 months",
    year: "2025",
    accent: "blue",
    image: "/projects/conqr.png",
    summary:
      "Shaped a brief for an approachable, trustworthy legal AI into a calm, credible interface — designing the single-scroll marketing landing page from scratch and redesigning the existing product solo.",
    highlights: [
      "Designed the single-scroll marketing landing page end-to-end.",
      "Redesigned 10–12 existing product screens for clarity and trust.",
      "Set the visual tone: calm, credible, and unmistakably approachable.",
    ],
    tags: ["Landing Page", "Product Redesign", "AI", "Brand"],
    metrics: [
      { value: "1.8k+", label: "Behance views" },
      { value: "12", label: "Screens redesigned" },
    ],
    link: "https://www.behance.net/designwithaditi",
    featured: true,
  },
  {
    slug: "sachet",
    title: "Sachet",
    subtitle: "UI/UX design project", // TODO: refine from Figma
    role: "Product Design",
    timeline: "Case study",
    year: "2025",
    accent: "pink",
    image: "/projects/sachet.png",
    // TODO: replace with real bullets from the Sachet Figma file
    summary:
      "A product design project — full case study coming soon. (Add the story from the Sachet Figma file.)",
    highlights: [],
    tags: ["UI/UX Design", "Product Design"],
    featured: true,
  },
  {
    slug: "autumn",
    title: "Autumn",
    subtitle: "Immersive e-book reader — mobile app",
    role: "Independent Project",
    timeline: "Concept",
    year: "2024",
    accent: "coral",
    summary:
      "A subscription e-book reader designed to feel as immersive as a physical book — with a signature feature: personalised, colour-coded tabs that slide out into a sticky-note panel without leaving the page.",
    highlights: [
      "Signature colour-coded tabs that slide into a sticky-note-style panel.",
      "Bookmarking, notes, and highlights without breaking the reading flow.",
      "A reading experience engineered for calm and focus.",
    ],
    tags: ["Mobile", "Interaction Design", "Concept", "Reading"],
    metrics: [{ value: "1", label: "Signature feature" }],
    link: "https://www.behance.net/designwithaditi",
    featured: true,
  },
  {
    slug: "ux-research",
    title: "UX Research Study",
    subtitle: "UI/UX research assignment", // TODO: refine from Figma
    role: "User Research",
    timeline: "Case study",
    year: "2025",
    accent: "yellow",
    image: "/projects/ux-research.png",
    // TODO: replace with real bullets from the research Figma file
    summary:
      "An end-to-end UX research assignment — methods, findings, and design decisions. Full write-up coming soon.",
    highlights: [],
    tags: ["User Research", "UX", "Discovery"],
    featured: true,
  },
  {
    slug: "bottom-nav",
    title: "Bottom Navigation Explorations",
    subtitle: "UI micro-interaction studies",
    role: "Exploration",
    timeline: "Series",
    year: "2024",
    accent: "violet",
    summary:
      "A study series exploring the small, high-frequency moments of mobile navigation — the bar you touch a hundred times a day.",
    highlights: [
      "Motion, states, and affordance experiments for bottom navigation.",
    ],
    tags: ["UI", "Micro-interaction", "Mobile"],
    link: "https://www.behance.net/designwithaditi",
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
  // top awards — shown big and colourful
  highlights: [
    { rank: "Top 50", scope: "Global", event: "Google Solution Challenge", year: "2022", accent: "coral" },
    { rank: "Top 15", scope: "National", event: "Smart India Hackathon", year: "2022", accent: "blue" },
    { rank: "Rank 4", scope: "of 150", event: "LiveTheCode Hackathon", year: "", accent: "violet" },
  ],
  // minor placements — one quiet line
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
