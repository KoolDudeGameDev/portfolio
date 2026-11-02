import type { Metadata } from "next";
import { AllWork } from "@/components/AllWork";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "All work — Kyle Gregory Ibo",
  description:
    "Every project: custom web apps, automation, backend systems, open-source workflows and research, each presented by the business problem it solved.",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <AllWork />
      </main>
      <div className="ink ink-band">
        <Footer />
      </div>
    </>
  );
}
