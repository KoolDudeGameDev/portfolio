import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Credibility band: what I build with. */}
        <LogoMarquee />
        <Services />
        <Work />
        <TechStack />
        <Experience />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
