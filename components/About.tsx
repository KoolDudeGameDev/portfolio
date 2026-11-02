import { asset, site } from "@/lib/site";

/**
 * Four facts worth scanning before the prose. Each one is already claimed
 * elsewhere in the site's copy — keep it that way, so nothing here is a line
 * an interviewer can catch him out on.
 */
const facts = [
  { label: "Candidate for Cum Laude", sub: "Computer Technology, May 2027" },
  { label: site.location, sub: site.timezone },
  { label: "Leads six engineers", sub: "Across two project teams" },
  { label: "Australia + Philippines clients", sub: "And international clients" },
];

export function About() {
  return (
    <section id="about" className="screen tint-3 px-6 py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div className="reveal relative mx-auto w-full max-w-sm lg:max-w-[min(24rem,56svh)]">
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

        <div className="reveal">
          <div className="mb-5 lg:mb-[clamp(0.5rem,1.6svh,1.25rem)] flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
            <span className="font-mono">05</span>
            <span className="h-px w-8 bg-border" />
            <span>About</span>
          </div>
          <h2 className="font-sans text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[clamp(1.75rem,5svh,2.25rem)]">
            A developer who delivers{" "}
            <span className="font-serif font-normal italic text-accent">
              end to end.
            </span>
          </h2>

          {/* The thesis, carried by weight and contrast rather than colour:
              the claim in full-strength ink, the consequence in muted. */}
          <p className="mt-7 text-xl leading-snug tracking-tight sm:text-2xl lg:mt-[clamp(0.75rem,2.4svh,1.75rem)] lg:text-[clamp(1.1rem,3.2svh,1.5rem)]">
            <span className="font-semibold text-fg">
              A system nobody else can maintain is not finished.
            </span>{" "}
            <span className="text-muted">
              That is why documentation, health checks and the handover are
              delivered with the code, not after it.
            </span>
          </p>

          <div className="mt-6 space-y-4 leading-relaxed text-muted lg:mt-[clamp(0.5rem,2svh,1.5rem)] lg:space-y-[clamp(0.5rem,1.6svh,1rem)] lg:text-[clamp(0.875rem,2.2svh,1rem)]">
            <p>
              I turn business requirements into systems people rely on every day,
              from the database and APIs to the screens and the automation
              between them. I work on-site in Cebu for the Bai Group of
              Companies, where I lead two project teams of six engineers, and I
              take on freelance and agency work for clients in Australia, the
              Philippines and internationally.
            </p>
            <p>
              I am completing my degree in Computer Technology, expected in May
              2027, and developing a Cebuano AI voice agent on the speech model I
              trained.
            </p>
          </div>

          {/* Two across, not four: this column is ~600px, and four cells put
              every label on two ragged lines. */}
          <dl className="mt-9 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-border pt-7 sm:grid-cols-2 lg:mt-[clamp(0.75rem,2.6svh,2.25rem)] lg:gap-y-[clamp(0.5rem,2svh,1.5rem)] lg:pt-[clamp(0.75rem,2.4svh,1.75rem)]">
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
