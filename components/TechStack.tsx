import type { CSSProperties } from "react";
import { SectionHeading } from "./SectionHeading";
import { BrandMark } from "./BrandMark";
import { techStack } from "@/content/techstack";

export function TechStack() {
  return (
    <section id="stack" className="screen tint-1 px-6 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Tech stack"
          title="Technology chosen for"
          titleItalic="the problem at hand."
        />

        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-[clamp(1rem,3svh,2rem)]">
          {techStack.map((group, i) => (
            <div
              key={group.group}
              className="reveal border-t border-border pt-4"
              style={{ "--i": i % 3 } as CSSProperties}
            >
              <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                {group.group}
              </h3>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="group flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 transition-all hover:-translate-y-0.5 hover:border-fg/25"
                  >
                    <BrandMark
                      slug={item.slug}
                      name={item.name}
                      mono={item.mono}
                      img={item.img}
                      mask={item.mask}
                      className="brand-mark--color h-4 w-4 shrink-0"
                    />
                    <span className="text-xs font-medium tracking-tight">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
