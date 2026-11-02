"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight } from "./Icons";
import { SectionHeading } from "./SectionHeading";
import { WorkCard } from "./WorkCard";
import { WorkModal } from "./WorkModal";
import { work, type WorkItem } from "@/content/work";
import { asset } from "@/lib/site";

const featured = work.filter((item) => item.featured);

/** The six projects on the home page. The rest live on /work. */
export function Work() {
  // One dialog for the whole section rather than one per card.
  const [detail, setDetail] = useState<WorkItem | null>(null);

  return (
    <section id="work" className="screen tint-3 px-6 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-x-8">
          <SectionHeading
            index="02"
            eyebrow="Case studies"
            title="Real systems, built for"
            titleItalic="real businesses."
          />
          <a
            href={asset("/work/")}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium lg:mb-[clamp(1rem,2.6svh,3rem)]"
          >
            Browse all work
            <span className="text-muted">{work.length}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-[clamp(0.75rem,2svh,1.5rem)]">
          {featured.map((item, i) => (
            <div
              key={item.title}
              className="reveal flex"
              style={{ "--i": i % 3 } as CSSProperties}
            >
              <WorkCard item={item} onOpen={() => setDetail(item)} />
            </div>
          ))}
        </div>
      </div>

      <WorkModal item={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
