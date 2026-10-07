/* ============================================================
   SITE CONTENT — everything about Aditi rather than about a
   project: the intro, what she does, the experience, the awards.

   This module is client-safe on purpose. The case studies live in
   lib/data.ts, which is marked server-only, because a client component
   imports its whole module into the browser bundle and some case-study
   content is under NDA. Anything a "use client" component needs belongs
   here; anything that quotes a case study does not.
   ============================================================ */

export const profile = {
  name: "Aditi Agarwal",
  role: "Product Designer & Design Engineer",
  location: "New Delhi, India",
  available: true,
  intro:
    "Product designer and design engineer with 2+ years taking B2B and healthtech products from messy research to shipped, high-fidelity UI. Research, product design, visual design, brand and build, in one pair of hands.",
  phone: "+91 98183 77310",
  // TODO: replace with Aditi's real LinkedIn URL
  email: "makedesignwithaditi@gmail.com",
  resume: "https://wasp0094.github.io/resume.pdf",
  // cal.com discovery call; "Say hello" opens it. If emptied, the button falls back to email.
  booking: "https://cal.com/designwithaditi/discovery?overlayCalendar=true",
  socials: [
    { label: "Behance", handle: "designwithaditi", href: "https://www.behance.net/designwithaditi" },
    { label: "Dribbble", handle: "designwithaditii", href: "https://dribbble.com/designwithaditii" },
    { label: "Twitter", handle: "designwithaditi", href: "https://twitter.com/designwithaditi" },
    { label: "LinkedIn", handle: "aditi-agarwal", href: "https://www.linkedin.com/in/designwithaditi" },
  ],
};

/* The four things Aditi does. `primary` ones lead the page: they get the
   large tinted cards and the hero highlights. `work` links each discipline to
   the case studies that prove it, by project slug. */
export type Capability = {
  id: "product" | "engineering" | "visual" | "brand";
  title: string;
  accent: string; // palette var
  primary?: boolean;
  blurb: string;
  skills: string[];
  work: { label: string; slug: string }[];
};

export const capabilities: Capability[] = [
  {
    id: "product",
    title: "Product Design",
    accent: "yellow",
    primary: true,
    blurb:
      "Research-led product work, from the first interview to shipped UI. I map the problem with real users before I draw a screen, then carry it through flows, high-fidelity design and the system that keeps it consistent.",
    skills: ["User Research", "Wireframing", "Prototyping", "Interaction Design", "Design Systems", "PRD Authoring"],
    work: [
      { label: "FourCore", slug: "fourcore-platform" },
      { label: "Formi", slug: "formi" },
      { label: "Vaulted", slug: "vaulted" },
    ],
  },
  {
    id: "engineering",
    title: "Design Engineering",
    accent: "violet",
    primary: true,
    blurb:
      "A computer science degree sits under the design work. I prototype and build my own designs in code, write developer-ready specs with every state and token accounted for, and work in Git alongside engineering, so what ships matches what was designed.",
    skills: ["React & Next.js", "Coded Prototypes", "Developer-ready Specs", "Design Tokens", "Git & GitHub"],
    work: [
      { label: "Shell Ivory Studio", slug: "shell-ivory" },
      { label: "Solène", slug: "solene" },
      { label: "Formi Patient App", slug: "formi-app" },
    ],
  },
  {
    id: "visual",
    title: "Visual Design",
    accent: "coral",
    blurb:
      "Websites and apps with a point of view. Type, colour, layout and iconography tuned until the interface feels considered, not just correct.",
    skills: ["Web Design", "Mobile UI", "Typography", "Iconography", "Illustration"],
    work: [
      { label: "Solène", slug: "solene" },
      { label: "FourCore: Landing", slug: "fourcore" },
      { label: "Autumn", slug: "autumn" },
    ],
  },
  {
    id: "brand",
    title: "Brand Identity",
    accent: "pink",
    blurb:
      "Identities built to scale: logo, colour and type, then the guidelines and collateral that keep a brand recognisable everywhere it shows up.",
    skills: ["Logo & Identity", "Brand Guidelines", "Colour & Type Systems", "Marketing Collateral"],
    work: [
      { label: "Conqr.ai", slug: "conqr" },
      { label: "FourCore", slug: "fourcore-platform" },
    ],
  },
];

export const toolkit: { title: string; items: string[] }[] = [
  { title: "Tools", items: ["Figma", "Figma Make", "Sketch", "Canva", "Git", "GitHub", "GitLab"] },
  {
    title: "AI",
    items: [
      "Figma AI",
      "ChatGPT (GPT-5)",
      "Claude Design",
      "OpenAI Codex",
      "OpenCode",
      "Prompt Engineering",
      "AI-assisted UX Research",
    ],
  },
];

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  kind: string; // shown as a tag
  description: string;
  current?: boolean;
  slug?: string; // links the row to its case study
};

/* current role first; one row per employer */
export const experience: ExperienceItem[] = [
  {
    period: "2026 to now",
    role: "Web Designer & Design Engineer",
    org: "Shell Ivory Studio",
    kind: "Ongoing",
    current: true,
    description:
      "Designing the homepage for a marketing and creative studio and prototyping it in code as one continuous, scroll-driven experience.",
    slug: "shell-ivory",
  },
  {
    period: "Feb 2024 to Jul 2026",
    role: "Founding UI/UX Designer to Lead UI/UX Designer",
    org: "FourCore",
    kind: "Full-time",
    description:
      "Joined as the first designer on a breach and attack simulation platform, redesigned the product and its marketing site, and built the design system from the ground up. Went on to lead UI/UX, guiding a junior designer and shipping features with product and engineering.",
    slug: "fourcore-platform",
  },
  {
    period: "2026, ongoing",
    role: "Independent Product Designer",
    org: "Formi",
    kind: "Independent",
    description:
      "Designing a two-sided physiotherapy platform end to end: a therapist dashboard, a patient app, and the design system they share.",
    slug: "formi",
  },
  {
    period: "2025",
    role: "Freelance Brand & Product Designer",
    org: "Conqr.ai",
    kind: "Freelance",
    description:
      "A solo two-month engagement: brand, design system, and a launch landing page for a legal-AI product.",
    slug: "conqr",
  },
];

/* Order of the work on the home page. The first `featuredCount` get the
   large alternating rows; the rest sit in the "Other projects" grid. Case
   studies use the same order to pick what to show under "More projects". */
export const workOrder = ["fourcore-platform", "formi", "shell-ivory", "solene", "vaulted", "conqr", "fourcore", "formi-app", "autumn"];
export const featuredCount = 5;

export const marqueeWords = [
  "Product Design",
  "Design Engineering",
  "UX Research",
  "Design Systems",
  "Visual Design",
  "Brand Identity",
  "0 → 1",
  "Design that ships",
];

export const recognition = {
  highlights: [
    { rank: "Top 50", scope: "Global", event: "Google Solution Challenge", year: "2022", accent: "coral" },
    { rank: "Top 15", scope: "National", event: "Smart India Hackathon", year: "2022", accent: "blue" },
    { rank: "Rank 4", scope: "of 150", event: "LiveTheCode Hackathon", year: "", accent: "violet" },
  ],
  alsoPlaced: [
    "Runner-Up, Evotech 5.0 Ideathon",
    "Top 50 / 115, DotSlash 5.0",
  ],
  /* invited roles — moved here from the old timeline */
  judging: {
    title: "Design competition judge",
    org: "Design Verse · BVCOE, New Delhi",
    year: "Oct 2024",
    text: "Invited to judge a two-day design seminar and competition (IEEE Student Branch), reviewing student projects and awarding the winning teams.",
  },
  certifications: {
    featured: { name: "UX Design", by: "Accenture" },
    others: [
      "Product Design & Development, NPTEL (85%)",
      "Functional & Conceptual Design, NPTEL (84%)",
      "UX Design Workshop, InnovateU",
    ],
  },
  education: {
    degree: "B.Tech, Computer Science",
    school: "Maharaja Agrasen Institute of Technology",
    years: "2020 to 2024",
    cgpa: "8.91 / 10",
  },
  mentorship: {
    num: "300+",
    org: "Girl Code It",
    text: "Ran a Git & GitHub fundamentals session for 300+ students and mentored 5+ through a UI development bootcamp.",
  },
};
