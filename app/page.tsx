import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
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
      <Timeline />
      <Recognition />
      <Contact />
    </main>
  );
}
