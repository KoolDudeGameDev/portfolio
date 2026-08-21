"use client";

import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { WorkCard } from "./WorkCard";
import { WorkModal } from "./WorkModal";
import { work, workGroups, type WorkGroup, type WorkItem } from "@/content/work";

const FEATURED = "Featured" as const;
type Tab = typeof FEATURED | WorkGroup;

function inTab(item: (typeof work)[number], tab: Tab) {
  return tab === FEATURED ? Boolean(item.featured) : item.group === tab;
}

/** Only offer tabs that actually hold something. */
const tabs: Tab[] = [
  FEATURED,
  ...workGroups.filter((group) => work.some((item) => item.group === group)),
];

export function Work() {
  const [active, setActive] = useState<Tab>(FEATURED);
  // One dialog for the whole section rather than one per card.
  const [detail, setDetail] = useState<WorkItem | null>(null);

  return (
    <section id="work" className="bg-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Real systems, shipped and"
          titleItalic="running in production."
          description="A mix of client automation work, backend systems, and research — each framed by the problem it solved."
        />

        <div className="mb-10 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const count = work.filter((item) => inTab(item, tab)).length;
            const selected = tab === active;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                aria-pressed={selected}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? "border-fg bg-fg text-bg"
                    : "border-border text-muted hover:border-fg/40 hover:text-fg"
                }`}
              >
                {tab}
                <span
                  className={selected ? "text-bg/60" : "text-muted/70"}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Every card stays in the markup and is hidden with CSS. Rendering
            only the active tab would leave the other projects out of the
            exported HTML entirely, where no crawler would ever see them. */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {work.map((item) => (
            <div
              key={item.title}
              className={inTab(item, active) ? "contents" : "hidden"}
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
