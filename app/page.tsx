import Cursor from "@/components/ui/Cursor";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Stats from "@/components/sections/Stats";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Recognition from "@/components/sections/Recognition";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Work />
        <About />
        <Experience />
        <Recognition />
        <Contact />
      </main>
    </>
  );
}
