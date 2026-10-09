import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BuildFlow } from "@/components/BuildFlow";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Demonstration band, unnumbered like the marquee below it. */}
        <BuildFlow />
        {/* Credibility band: what I build with. */}
        <LogoMarquee />
        <Services />
        <Work />
        <TechStack />
        <Experience />
        <About />
        {/* The FAQ lives inside Contact, beside the form. */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
