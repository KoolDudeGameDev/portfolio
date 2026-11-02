"use client";

import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { WorkCard } from "./WorkCard";
import { WorkModal } from "./WorkModal";
import { work, workGroups, type WorkGroup, type WorkItem } from "@/content/work";

const ALL = "All" as const;
type Tab = typeof ALL | WorkGroup;

function inTab(item: (typeof work)[number], tab: Tab) {
  return tab === ALL || item.group === tab;
}

/** Only offer tabs that actually hold something. */
const tabs: Tab[] = [
  ALL,
  ...workGroups.filter((group) => work.some((item) => item.group === group)),
];

/** The full list on /work. The home page shows the featured six. */
export function AllWork() {
  const [active, setActive] = useState<Tab>(ALL);
  // One dialog for the whole section rather than one per card.
  const [detail, setDetail] = useState<WorkItem | null>(null);

  return (
    <section className="px-6 pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="All work"
          title="Real systems, built for"
          titleItalic="real businesses."
          description="Custom web apps, client automation, backend systems, open-source workflows and research, each presented by the business problem it solved."
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
