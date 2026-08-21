import { SectionHeading } from "./SectionHeading";
import { experience, education } from "@/content/experience";

export function Experience() {
  return (
    <section id="experience" className="bg-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title="Where I've been"
          titleItalic="building."
        />

        <ol className="relative border-l border-border">
          {experience.map((item) => (
            <li key={`${item.org}-${item.role}`} className="relative pb-12 pl-8 last:pb-0">
              <span className="absolute -left-[6px] top-1.5 h-3 w-3 rounded-full border-2 border-surface bg-accent" />
              <span className="font-mono text-xs uppercase tracking-wide text-accent">
                {item.period}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{item.role}</h3>
              <p className="text-sm text-muted">
                {item.org} · {item.location}
              </p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                {item.summary}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <h3 className="text-lg font-semibold">{education.degree}</h3>
            <p className="text-sm text-muted">{education.school}</p>
          </div>
          <div className="text-sm sm:text-right">
            <p className="font-serif text-lg italic text-accent">
              {education.honor}
            </p>
            <p className="text-muted">{education.period}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
