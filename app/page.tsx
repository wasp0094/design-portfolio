import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Recognition from "@/components/sections/Recognition";
import Contact from "@/components/sections/Contact";
import { workCards } from "@/lib/data";

export default function Home() {
  return (
    <main>
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
