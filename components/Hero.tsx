import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "./Icons";
import { site } from "@/lib/site";

/** Stagger for the load entrance: see `.rise` in globals.css. */
const rise = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

// Every figure here has to trace back to a case study in content/work.ts, and
// each does a different job: scale, data, breadth, delivered products. There was
// a "<24h incident response" here that traced to nothing on the site, so it went.
const stats = [
  { value: "190+", label: "Workflows on the platform" },
  { value: "1,900+", label: "CRM contacts consolidated" },
  { value: "5+", label: "Platforms integrated" },
  { value: "3", label: "Custom apps deployed" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="screen relative px-6 pt-32 pb-4 md:pt-44 md:pb-8"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="rise mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted">
          {/* A live "available" signal. The halo pulses only for users who
              haven't asked for reduced motion; everyone else sees a still dot. */}
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-live opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
          </span>
          {site.role}
        </div>

        <h1
          className="rise max-w-4xl font-sans text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-5xl md:text-6xl lg:text-[clamp(2.75rem,min(5.6vw,9svh),4.5rem)]"
          style={rise(0.08)}
        >
          I build the systems that make a business{" "}
          <span className="font-serif font-normal italic text-accent">
            run itself.
          </span>
        </h1>

        <p
          className="rise mt-7 max-w-3xl text-lg leading-relaxed text-muted md:text-xl lg:mt-[clamp(0.75rem,2.6svh,1.75rem)] lg:text-[clamp(1rem,2.3svh,1.25rem)]"
          style={rise(0.16)}
        >
          I am {site.name}. I help growing businesses replace spreadsheets and
          manual work with custom web apps and automation, then hand over
          everything needed to run them.
        </p>

        <div
          className="rise mt-10 flex flex-wrap items-center gap-4 lg:mt-[clamp(1rem,3.4svh,2.5rem)]"
          style={rise(0.24)}
        >
          <a
            href="#book"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#showcase"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            See my work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Flex-wrapped rather than a grid, so the row stays right whatever the
            count: a grid strands an odd last figure against the left edge,
            wrapping centres whatever lands on the final row. */}
        <dl
          className="rise mt-12 flex flex-wrap justify-center gap-x-10 gap-y-8 border-t border-border pt-10 text-center md:mt-16 md:gap-x-16 lg:mt-[clamp(1rem,4svh,3rem)] lg:pt-[clamp(0.75rem,3svh,2rem)]"
          style={rise(0.32)}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="w-36 md:w-auto md:min-w-[7.5rem]">
              <dt className="font-serif text-3xl font-normal md:text-4xl lg:text-[clamp(1.5rem,4.2svh,2.25rem)]">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs leading-snug text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
