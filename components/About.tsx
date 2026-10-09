import { asset, site } from "@/lib/site";

/**
 * Four facts worth scanning before the prose. Each one is already claimed
 * elsewhere in the site's copy — keep it that way, so nothing here is a line
 * an interviewer can catch him out on.
 */
const facts = [
  { label: "Cum Laude", sub: "Computer Technology" },
  { label: site.location, sub: site.timezone },
  { label: "Leads 6 engineers", sub: "At the brokerage" },
  { label: "Australia + US clients", sub: "Remote, under contract" },
];

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

          {/* The thesis, carried by weight and contrast rather than colour:
              the claim in full-strength ink, the consequence in muted. */}
          <p className="mt-7 text-xl leading-snug tracking-tight sm:text-2xl">
            <span className="font-semibold text-fg">
              A system nobody else can maintain isn&apos;t finished.
            </span>{" "}
            <span className="text-muted">
              So the documentation, the health checks and the handover ship with
              the code, not after it.
            </span>
          </p>

          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              I&apos;m a Computer Technology graduate who turns business
              requirements into maintainable systems, from REST API contracts
              and webhooks to access-control logic and CRM data architecture.
              Day to day that runs from a React front end and a Postgres schema
              to an integration between two systems that were never meant to
              talk to each other.
            </p>
            <p>
              Most of that work is for clients offshore — currently an
              Australian finance brokerage, and an ecommerce platform I support
              under contract through a software agency. Working across timezones
              is the normal case for me, not the exception. At the brokerage I
              also lead a six-person engineering team: I assign the workflow
              builds, review what they ship, and own the documentation standards
              we all work to.
            </p>
          </div>

          {/* Two across, not four: this column is ~600px, and four cells put
              every label on two ragged lines. */}
          <dl className="mt-9 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-border pt-7 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-semibold leading-snug text-fg">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  {fact.sub}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
