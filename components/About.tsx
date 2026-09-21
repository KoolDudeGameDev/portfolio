import { asset, site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="overflow-hidden rounded-2xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/assets/photo.webp")}
              alt={site.name}
              width={800}
              height={998}
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute -inset-3 -z-10 rounded-2xl border border-accent/40"
          />
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
            <span className="font-mono">05</span>
            <span className="h-px w-8 bg-border" />
            <span>About</span>
          </div>
          <h2 className="font-sans text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
            An engineer who ships{" "}
            <span className="font-serif font-normal italic text-accent">
              end to end.
            </span>
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              I&apos;m a Computer Technology graduate (Cum Laude)
              who turns business requirements into maintainable systems, from
              REST API contracts and webhooks to access-control logic and CRM
              data architecture.
            </p>
            <p>
              Day to day that runs from a React front end and a Postgres schema
              to a REST integration between two systems that were never meant
              to talk to each other. I work in JavaScript, TypeScript, Python
              and SQL, and I care about the boring parts that keep software
              alive: clear contracts, honest error handling, backups, and
              documentation the next person can actually follow.
            </p>
            <p>
              Most of that work is for clients offshore — currently an
              Australian finance brokerage, and an ecommerce platform I support
              under contract through a software agency. Working across
              timezones is the normal case for me, not the exception.
            </p>
            <p>
              I also lead a six-person engineering team at the brokerage,
              drawn from some of the country&apos;s top universities. I assign
              the workflow builds, review what they ship, and own the
              documentation standards we all work to. Getting six people
              building against the same conventions is its own engineering
              problem, and a system nobody else can maintain isn&apos;t
              finished.
            </p>
            <p>
              Whether it&apos;s a brokerage&apos;s pipeline, a learning
              platform, or a speech model trained from scratch, I like owning a
              problem from the database to the deployed product.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
