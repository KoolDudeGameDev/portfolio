import type { CSSProperties } from "react";
import { SectionHeading } from "./SectionHeading";
import { experience, education } from "@/content/experience";

export function Experience() {
  return (
    <section id="experience" className="screen tint-2 px-6 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title="A record of"
          titleItalic="systems delivered."
        />

        {/* `.exp-track` draws the line the three dots sit on as you arrive. */}
        <ol className="exp-track relative grid gap-10 lg:grid-cols-[1.2fr_1.1fr_0.9fr] lg:gap-[clamp(1.25rem,3vw,2.5rem)]">
          {experience.map((item, i) => (
            <li
              key={`${item.org}-${item.role}`}
              className="reveal relative lg:pt-[clamp(0.75rem,2.2svh,1.25rem)]"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="absolute -top-[5px] left-0 hidden h-[11px] w-[11px] rounded-full border-2 border-bg bg-accent lg:block" />
              <span className="font-mono text-xs uppercase tracking-wide text-accent">
                {item.period}
              </span>
              <h3 className="mt-1.5 font-semibold leading-snug">{item.role}</h3>
              <p className="text-sm text-muted">
                {item.org} · {item.location}
              </p>
              <ul className="mt-[clamp(0.375rem,1.3svh,0.75rem)] space-y-[clamp(0.2rem,0.8svh,0.5rem)]">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2.5 text-[13px] leading-[1.45] text-muted"
                  >
                    <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-fg" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* The degree name is unfamiliar outside PH, so the coursework carries
            the explanation the resume no longer has room for. */}
        <div className="reveal mt-10 border-t border-border pt-4 text-sm lg:mt-[clamp(0.5rem,1.6svh,1.5rem)] lg:pt-[clamp(0.5rem,1.4svh,1rem)]">
          <div className="grid gap-x-8 sm:grid-cols-[1fr_auto]">
            <p className="font-semibold">{education.degree}</p>
            <p className="font-serif italic text-accent sm:text-right">
              {education.honor}
            </p>
            <p className="text-muted">{education.school}</p>
            <p className="text-muted sm:text-right">{education.period}</p>
          </div>
          <p className="fit-hide mt-1.5 text-xs text-muted">
            <span className="font-medium text-fg">Relevant coursework:</span>{" "}
            {education.coursework.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
