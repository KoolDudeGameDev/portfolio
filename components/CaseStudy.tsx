import { ArrowRight, ArrowUpRight, ChevronLeft, Github } from "./Icons";
import { CaseStudyGallery } from "./CaseStudyGallery";
import { workHref, type WorkItem } from "@/content/work";
import { asset } from "@/lib/site";

function linkHref(href: string) {
  return href.startsWith("http") ? href : asset(href);
}

/** One numbered part of the write-up: label on the left, text on the right. */
function Part({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border pt-5 first:border-t-0 first:pt-0">
      <h2 className="flex items-baseline gap-3 text-xs uppercase tracking-[0.16em] text-muted">
        <span className="font-mono">{n}</span>
        {label}
      </h2>
      <div className="mt-3 leading-relaxed text-muted md:text-[1.0625rem]">{children}</div>
    </section>
  );
}

/**
 * A case study as its own page, so it can be linked, shared and found. It reads
 * top to bottom in the site's order: the outcome (why it matters), the facts,
 * then problem, build and results, with the screens and the next project last.
 */
export function CaseStudy({ item, prev, next }: { item: WorkItem; prev: WorkItem; next: WorkItem }) {
  const shots = item.shots?.length ? item.shots : item.image ? [{ src: item.image, caption: "" }] : [];
  const facts = [
    { label: "Role and client", value: item.org },
    { label: "Type", value: item.category },
    { label: "Status", value: item.status },
  ];

  return (
    <article className="px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <a
          href={asset("/work/")}
          className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          All work
        </a>

        <header className="mt-6 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Case study · {item.category}</p>
          <h1 className="mt-3 font-sans text-4xl font-semibold leading-[1.05] tracking-[-0.025em] sm:text-5xl md:text-6xl">
            {item.title}
          </h1>
          {/* Why it matters leads, so the outcome comes before the technology. */}
          <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">
            <span className="sr-only">Why it matters: </span>
            {item.value}
          </p>
        </header>

        {/* The facts sit beside the write-up on desktop rather than in a row
            above it, so the story starts on the first screen. They come first
            in the DOM, so a phone and a screen reader still meet them first. */}
        <div className="mt-8 grid gap-8 border-t border-border pt-6 lg:grid-cols-[1fr_16rem] lg:gap-14">
          <aside className="lg:col-start-2 lg:row-start-1">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 lg:sticky lg:top-28 lg:grid-cols-1">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted">{f.label}</dt>
                  <dd className="mt-1 font-medium">{f.value}</dd>
                </div>
              ))}
              <div className="col-span-2 lg:col-span-1">
                <dt className="text-xs uppercase tracking-[0.16em] text-muted">Stack</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <li key={t} className="rounded-md bg-surface px-2.5 py-1 text-xs text-muted">{t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              {item.links?.length ? (
                <div className="col-span-2 flex flex-wrap items-center gap-x-5 gap-y-2 lg:col-span-1">
                  {item.links.map((link) => (
                    <a
                      key={link.label}
                      href={linkHref(link.href)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
                    >
                      {link.icon === "github" ? <Github className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </dl>
          </aside>

          <div className="space-y-6 lg:col-start-1 lg:row-start-1">
            <Part n="01" label="The business problem">{item.problem}</Part>
            <Part n="02" label="What I built">{item.build}</Part>
            <Part n="03" label="Results">
              <ul className="space-y-2">
                {item.results.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-fg" />
                    {r}
                  </li>
                ))}
              </ul>
            </Part>
          </div>
        </div>

        {shots.length ? (
          <section className="mt-10 border-t border-border pt-6">
            <h2 className="text-xs uppercase tracking-[0.16em] text-muted">The screens</h2>
            <CaseStudyGallery shots={shots} title={item.title} />
          </section>
        ) : null}

        <nav aria-label="More case studies" className="mt-10 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
          <a href={workHref(prev.slug)} className="group rounded-2xl border border-border p-5 transition hover:-translate-y-0.5 hover:border-fg/25">
            <span className="text-xs uppercase tracking-[0.16em] text-muted">Previous</span>
            <span className="mt-1.5 block font-semibold">{prev.title}</span>
          </a>
          <a href={workHref(next.slug)} className="group rounded-2xl border border-border p-5 text-right transition hover:-translate-y-0.5 hover:border-fg/25">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-muted">
              Next <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-1.5 block font-semibold">{next.title}</span>
          </a>
        </nav>
      </div>
    </article>
  );
}
