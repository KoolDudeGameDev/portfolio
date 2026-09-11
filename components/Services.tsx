import { SectionHeading } from "./SectionHeading";
import {
  ArrowRight,
  AutomationIcon,
  BackendIcon,
  CrmIcon,
  ReliabilityIcon,
  WebIcon,
} from "./Icons";
import { engagements, services, type ServiceIcon } from "@/content/services";
import { mailtoHref } from "@/lib/site";

const iconMap: Record<ServiceIcon, typeof AutomationIcon> = {
  automation: AutomationIcon,
  backend: BackendIcon,
  crm: CrmIcon,
  reliability: ReliabilityIcon,
  web: WebIcon,
};

export function Services() {
  return (
    <section id="services" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="What I do for businesses"
          title="Services that turn manual work into"
          titleItalic="reliable systems."
          description="I work with owners and small teams who are losing hours and leads to manual processes. Here's where I help most."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <article
                key={service.title}
                className={`group flex flex-col bg-bg p-8 transition-colors hover:bg-card md:p-10 ${
                  service.wide ? "sm:col-span-2" : ""
                }`}
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border text-fg transition-colors group-hover:border-fg">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 font-serif text-lg italic text-accent">
                  {service.tagline}
                </p>
                <p className="mt-4 flex-1 leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.stack.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* How to hire me. No rates here on purpose: see content/services.ts. */}
        <div className="mt-16">
          <h3 className="text-xs uppercase tracking-[0.2em] text-muted">
            How we&apos;d work together
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {engagements.map((engagement) => (
              <article
                key={engagement.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-7"
              >
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  {engagement.terms}
                </p>
                <h4 className="mt-3 text-lg font-semibold">
                  {engagement.title}
                </h4>
                <p className="mt-3 flex-1 leading-relaxed text-muted">
                  {engagement.description}
                </p>
                <p className="mt-5 border-t border-border pt-4 text-sm">
                  <span className="text-muted">Good for: </span>
                  {engagement.goodFor}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            Every engagement is quoted per project, after a short call about
            what you need.
            <a
              href={mailtoHref}
              className="group inline-flex items-center gap-1 font-medium text-fg underline-offset-4 hover:underline"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
