import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Work from "@/components/sections/Work";
import Branding from "@/components/sections/Branding";
import Lab from "@/components/sections/Lab";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Recognition from "@/components/sections/Recognition";
import Estimator from "@/components/sections/Estimator";
import Contact from "@/components/sections/Contact";
import { workCards } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      {/* proof — three surfaces, run together as one chapter */}
      <Work cards={workCards} />
      <Branding />
      <Lab />
      {/* who I am */}
      <About />
      <Timeline />
      <Recognition />
      {/* the last thing before the footer: what it costs, then how to reach me */}
      <Estimator />
      <Contact />
    </main>
  );
}
