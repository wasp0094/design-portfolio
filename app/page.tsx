import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Recognition from "@/components/sections/Recognition";
import Contact from "@/components/sections/Contact";
import { workCards } from "@/lib/data";
import { capabilities, experience, profile, recognition } from "@/lib/site";
import { SITE } from "./sitemap";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: profile.name,
      jobTitle: profile.role,
      description: profile.intro,
      url: SITE,
      image: `${SITE}/aditi-avatar.png`,
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressRegion: "Delhi", addressCountry: "IN" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "hiring inquiries",
        email: profile.email,
        telephone: profile.phone,
        url: profile.booking,
        availableLanguage: "en",
      },
      worksFor: { "@type": "Organization", name: experience[0].org },
      alumniOf: { "@type": "CollegeOrUniversity", name: recognition.education.school },
      knowsAbout: capabilities.flatMap((c) => [c.title, ...c.skills]),
      sameAs: profile.socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: profile.name,
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Marquee />
      <Work cards={workCards} />
      <About />
      <Experience />
      <Recognition />
      <Contact />
    </main>
  );
}
