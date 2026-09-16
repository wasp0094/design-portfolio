/* ============================================================
   SITE CONTENT — everything about Aditi rather than about a
   project: the intro, the stats, the timeline, the skills.

   This module is client-safe on purpose. The case studies live in
   lib/data.ts, which is marked server-only, because a client component
   imports its whole module into the browser bundle and some case-study
   content is under NDA. Anything a "use client" component needs belongs
   here; anything that quotes a case study does not.
   ============================================================ */

export const profile = {
  name: "Aditi Agarwal",
  role: "Product & UI/UX Designer",
  location: "New Delhi, India",
  available: true,
  /* the hero availability badge — `available` chooses the line */
  availability: {
    open: "Available for new work",
    closed: "Not taking new work right now",
  },
  tagline: [
    "I turn ambiguous",
    "problems into",
    "interfaces people",
    "actually use.",
  ],
  intro:
    "Product & UI/UX designer with 2+ years taking B2B and healthtech products from messy research all the way to shipped, high-fidelity UI: design systems, two-sided products, and the calm interfaces in between.",
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

/* brand logo (in /public/logos/) + a background colour that suits it,
   used for the card cover and the detail-page hero */
export const BRAND: Record<string, { logo: string; bg: string; dark?: boolean }> = {
  "formi-app": { logo: "formi.svg", bg: "#1A7A8A", dark: true },
  fourcore: { logo: "fourcore.svg", bg: "#0B1C30", dark: true },
  "conqr-platform": { logo: "conqr.svg", bg: "#F5EEE7" },
  autumn: { logo: "autumn.svg", bg: "#FBEDDF" },
};

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
      "Where the foundation was laid: computer science, with a growing pull toward how products actually feel to use.",
  },
  {
    year: "2022",
    type: "Recognition",
    accent: "coral",
    title: "Hackathon breakthroughs",
    org: "Google Solution Challenge · Smart India Hackathon",
    description:
      "Top 50 Global and Top 15 nationally with Proctify, my first taste of designing real products under pressure.",
  },
  {
    year: "2022–23",
    type: "Learning",
    accent: "yellow",
    title: "Design certifications",
    org: "Accenture · NPTEL · InnovateU",
    description:
      "UX Design, Product Design & Development, and more, turning instinct into deliberate craft.",
  },
  {
    year: "Feb 2024",
    type: "First role",
    accent: "blue",
    title: "UI/UX Design Intern at FourCore",
    org: "Breach & Attack Simulation platform",
    description:
      "My first design internship, stepping straight into complex B2B cybersecurity.",
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
      "Invited to judge Design Verse, a two-day design seminar & competition (IEEE Student Branch), reviewing student projects and awarding the winning teams.",
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
    "Runner-Up, Evotech 5.0 Ideathon",
    "Top 50 / 115, DotSlash 5.0",
  ],
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
    years: "2020, 2024",
    cgpa: "8.91 / 10",
  },
  mentorship: {
    num: "300+",
    org: "Girl Code It",
    text: "Ran a Git & GitHub fundamentals session for 300+ students and mentored 5+ through a UI development bootcamp.",
  },
};

/* ============================================================
   BRANDING — logo and identity work.

   Artwork lives in public/branding/. The section is built to be
   correct before those files exist: a card with no `image`, or one
   whose `image` 404s, falls back to the client's initials on the
   tinted stage, so a missing screenshot is a quieter card rather
   than a broken one. `placeholder: true` flags borrowed or
   not-final artwork with the same loud badge the case studies use.
   ============================================================ */
export type BrandingWork = {
  slug: string;      // also the filename stem in public/branding/
  client: string;
  sector?: string;   // mono micro-label; only ever from the client's own name
  year: string;
  accent: string;
  note?: string;
  href: string;      // the Dribbble shot
  image?: string;    // filename inside public/branding/
  placeholder?: boolean;
};

export const branding: BrandingWork[] = [
  {
    slug: "bkp",
    client: "BKP Knowledge Partners",
    sector: "Knowledge partners",
    // TODO(owner): confirm the year on each Dribbble shot.
    year: "2025",
    accent: "blue",
    href: "https://dribbble.com/shots/25966126-Logo-Design-for-BKP-Knowledge-Partners",
    image: "bkp.png",
  },
  {
    slug: "bridgevalue",
    client: "Bridgevalue Research and Consulting",
    sector: "Research & consulting",
    year: "2025",
    accent: "teal",
    href: "https://dribbble.com/shots/25965621-Logo-Design-for-Logo-Design-for-Bridgevalue-Research-and-Consulting-Inc",
    image: "bridgevalue.png",
  },
  {
    slug: "navikarana",
    client: "Navikarana Labs",
    sector: "Labs",
    year: "2025",
    accent: "violet",
    href: "https://dribbble.com/shots/25963492-Logo-Design-for-Navikarana-Labs",
    image: "navikarana.png",
  },
];
// TODO(owner): `note` is left empty on purpose — one honest line each
// beats an invented one. The card lays out correctly with or without it.

/* ============================================================
   LAB — small things shipped outside client work: side projects,
   live landing pages, and AI experiments.

   Entirely data-driven. The grid uses auto-fill, so three entries
   and eight both land in tidy rows with no stretched orphan, and
   adding one is a single object here and nothing else. An entry
   with `placeholder: true` renders dashed and inert until its URL
   exists. An empty array removes the section from the page.
   ============================================================ */
export type LabKind = "side-project" | "live-site" | "experiment";

export const LAB_KINDS: Record<LabKind, { label: string; accent: string }> = {
  "side-project": { label: "Side project", accent: "teal" },
  "live-site": { label: "Live site", accent: "blue" },
  experiment: { label: "AI experiment", accent: "violet" },
};

export type LabEntry = {
  title: string;
  blurb: string;   // one line, aim for under ~95 characters
  kind: LabKind;
  year: string;
  href: string;    // the live URL; empty string while `placeholder` is true
  placeholder?: boolean;
};

// TODO(owner): replace all three. They exist so the section can be seen
// and reviewed before the real entries land, one per flavour.
export const lab: LabEntry[] = [
  {
    title: "Untitled side project",
    blurb: "One line: what it does, and who it turned out to be for.",
    kind: "side-project",
    year: "2026",
    href: "",
    placeholder: true,
  },
  {
    title: "Untitled landing page",
    blurb: "One line: whose site it is, and the one job it had to do.",
    kind: "live-site",
    year: "2026",
    href: "",
    placeholder: true,
  },
  {
    title: "Untitled AI experiment",
    blurb: "One line: what you tried, and what actually came out of it.",
    kind: "experiment",
    year: "2026",
    href: "",
    placeholder: true,
  },
];

/* ============================================================
   PRICING — the single source of truth for the price guide.

   ⚠ PLACEHOLDER FIGURES. Tune the numbers in this object and
   nowhere else: the component reads the selected tier and does no
   arithmetic of its own, so no figure is buried in component logic.
   USD only — no toggle, no conversion.

   Shape: one project type is selected at a time, and each type owns
   its own sub-options. Switching type swaps the sub-options and
   selects that type's first one, so there is never a state with a
   type but no tier. `DEFAULT_TYPE` / the first tier of that group
   are what the page loads with.

   `from: true` means "starting at" — a minimum that real scope
   pushes upward, shown as "From $X".
   `custom: true` carries no price at all: some scopes can't be
   guessed from a menu, and inventing a number for them would be
   worse than admitting it.
   `soon: true` on a group shows it but makes it unselectable.

   Set each figure at the level you are HAPPY to work at, not the
   level you hope to win: the number shown is what gets quoted back
   at you.

   No `as const` here on purpose — it would make every price a
   literal type and every array readonly, which breaks useState
   inference and .find() downstream.
   ============================================================ */
export type PriceTier = {
  id: string;
  label: string;
  note: string;
  price: number;   // USD; ignored when `custom` is true
  from?: boolean;
  custom?: boolean;
};

export type PriceGroup = {
  id: string;
  label: string;
  short: string;   // the label on the type selector, kept to one or two words
  note?: string;
  accent: string;
  soon?: boolean;
  tiers: PriceTier[];
};

/** what the section loads with, alongside that group's first tier */
export const DEFAULT_TYPE = "website";

export const PRICING: { currency: string; groups: PriceGroup[] } = {
  currency: "USD",

  groups: [
    {
      id: "website",
      label: "Website design",
      short: "Website",
      note: "Design only. Front-end build is quoted separately.",
      accent: "coral",
      tiers: [
        {
          id: "web-small",
          label: "3–4 pages",
          note: "Home, about, one or two more. The essentials, done properly.",
          price: 1200,
        },
        {
          id: "web-large",
          label: "8–10 pages",
          note: "A full marketing site with room for services and case studies.",
          price: 2600,
        },
        {
          id: "web-custom",
          label: "Custom scope",
          note: "More pages, a CMS, or something that doesn't fit the two above.",
          price: 0,
          custom: true,
        },
      ],
    },
    {
      id: "app",
      label: "App & product design",
      short: "App design",
      note: "Scoped in conversation, not by screen count — the number of screens is an outcome of the work, not an input to it.",
      accent: "blue",
      tiers: [
        {
          id: "app-start",
          label: "Starting point",
          note: "Flows, screens, and the system holding them together.",
          price: 3000,
          from: true,
        },
        {
          id: "app-custom",
          label: "Custom scope",
          note: "An existing product, a rescue, or a build that spans platforms.",
          price: 0,
          custom: true,
        },
      ],
    },
    {
      id: "brand",
      label: "Brand & identity",
      short: "Branding",
      accent: "violet",
      tiers: [
        {
          id: "brand-logo",
          label: "Logo only",
          note: "Mark and wordmark, exported and ready to use.",
          price: 600,
        },
        {
          id: "brand-kit",
          label: "Logo + brand kit",
          note: "Logo, typography, colour, and the rules for using them.",
          price: 1400,
          from: true,
        },
        {
          id: "brand-custom",
          label: "Custom scope",
          note: "A full rebrand, or identity work across more than one product.",
          price: 0,
          custom: true,
        },
      ],
    },
    {
      id: "audit",
      label: "UX audit",
      short: "UX audit",
      note: "A written, screen-by-screen review of a product that already exists. Not open for bookings yet.",
      accent: "teal",
      soon: true,
      tiers: [],
    },
  ],
};
