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
              I&apos;m a Computer Technology student (Cum Laude standing) who
              turns business requirements into maintainable systems — from REST
              API contracts and webhooks to access-control logic and CRM data
              architecture.
            </p>
            <p>
              Day to day I build live integrations across GoHighLevel, n8n,
              Asana, and Supabase with JavaScript, Python, and SQL. I care about
              the boring parts that keep software alive: clear contracts,
              honest error handling, backups, and documentation the next person
              can actually follow.
            </p>
            <p>
              Whether it&apos;s automating a brokerage&apos;s pipeline or
              training a speech model from scratch, I like owning a problem from
              the database to the deployed product. My first reaction to a
              manual process is to ask why it&apos;s still manual — then go
              build the thing that ends it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
