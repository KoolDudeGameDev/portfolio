import type { CSSProperties } from "react";
import { SectionHeading } from "./SectionHeading";
import { ServiceCta } from "./ServiceCta";
import {
  ArrowRight,
  AutomationIcon,
  BackendIcon,
  Blocks,
  LifeBuoy,
  ReliabilityIcon,
  SearchCheck,
  WebIcon,
} from "./Icons";
import {
  engagements,
  services,
  type EngagementIcon,
  type ServiceIcon,
} from "@/content/services";

const iconMap: Record<ServiceIcon, typeof AutomationIcon> = {
  automation: AutomationIcon,
  backend: BackendIcon,
  reliability: ReliabilityIcon,
  web: WebIcon,
};

const engagementIconMap: Record<EngagementIcon, typeof SearchCheck> = {
  audit: SearchCheck,
  build: Blocks,
  support: LifeBuoy,
};

export function Services() {
  return (
    <section id="services" className="screen tint-1 px-6 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="Business solutions"
          title="From manual processes to"
          titleItalic="systems that scale."
          description="Most businesses outgrow spreadsheets and disconnected tools long before they have a system that fits. I build that system around how your team works, then hand it over complete."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              // The reveal sits on a wrapper: on the card it would pin the lift.
              <div
                key={service.title}
                className="reveal flex"
                style={{ "--i": i } as CSSProperties}
              >
                <article className="service-card group relative flex w-full flex-col rounded-2xl border border-border bg-card p-6 lg:p-[clamp(0.875rem,2.2svh,1.5rem)]">
                {/* What it gets you. On hover the link below takes this line. */}
                <p className="service-outcome border-b border-border pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                  <span className="mx-2 text-border">/</span>
                  {service.outcome}
                </p>

                <div className="fit-hide mb-3 mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-fg transition-colors group-hover:border-fg lg:mt-[clamp(0.5rem,1.6svh,1rem)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-3 font-semibold lg:mt-2">{service.title}</h3>
                <p className="mt-1 font-serif text-sm italic text-accent">
                  {service.tagline}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                {/* The ::after overlay makes the whole card clickable while
                    keeping one real link in the accessibility tree. Always
                    visible on touch, where there is no hover to reveal it. */}
                <ServiceCta service={service.title} />
                </article>
              </div>
            );
          })}
        </div>

        {/* How to hire me. No rates here on purpose: see content/services.ts. */}
        <div className="mt-10 lg:mt-[clamp(0.75rem,2.5svh,2rem)]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted">
              How we can work together
            </h3>
            <p className="flex flex-wrap items-center gap-x-3 text-sm text-muted">
              Scoped and quoted after an initial call.
              <a
                href="#book"
                className="group inline-flex items-center gap-1 font-medium text-fg underline-offset-4 hover:underline"
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </p>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {engagements.map((engagement, i) => {
              const EngagementIconMark = engagementIconMap[engagement.icon];
              return (
                <article
                  key={engagement.title}
                  style={{ "--i": i } as CSSProperties}
                  className="reveal flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-surface lg:p-[clamp(0.75rem,1.9svh,1.25rem)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <EngagementIconMark className="h-5 w-5 text-fg" />
                      <h4 className="font-semibold">{engagement.title}</h4>
                    </div>
                    <p className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {engagement.terms}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {engagement.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
