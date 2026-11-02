import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Showcase } from "@/components/Showcase";
import { Services } from "@/components/Services";
import { BuildFlow } from "@/components/BuildFlow";
import { Work } from "@/components/Work";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Book, Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* `snap-page` turns on one-screen-per-section. See globals.css. */}
      <main className="snap-page">
        <Hero />
        {/* The project carousel, unnumbered: it is proof, not a chapter. */}
        <Showcase />
        <Services />
        {/* How a build goes and what you keep. Unnumbered, like the carousel. */}
        <BuildFlow />
        <Work />
        <TechStack />
        <Experience />
        <About />
        <Book />
        {/* FAQ, form and footer, as one connected band. */}
        <Contact />
      </main>
    </>
  );
}
