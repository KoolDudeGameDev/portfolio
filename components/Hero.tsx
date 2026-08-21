import { ArrowRight, ArrowUpRight } from "./Icons";
import { site, mailtoHref } from "@/lib/site";

// Every figure here traces back to a case study in content/work.ts.
const stats = [
  { value: "100+", label: "Automated workflows live" },
  { value: "30+", label: "Pipeline stages automated" },
  { value: "1,900+", label: "CRM contacts consolidated" },
  { value: "5+", label: "Platforms integrated" },
  { value: "<24h", label: "Incident response" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative px-6 pt-36 pb-4 md:pt-44 md:pb-8"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {site.role}
        </div>

        <h1 className="max-w-4xl font-sans text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          I build the systems that make a business{" "}
          <span className="font-serif font-normal italic text-accent">
            run itself.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          I&apos;m {site.name} — I connect your CRM, tools, and data into
          automated workflows and reliable backends, so leads get followed up,
          tasks create themselves, and your team stops doing copy-paste work.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={mailtoHref}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            See my work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-10 text-center sm:grid-cols-3 md:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-serif text-3xl font-normal md:text-4xl">
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
