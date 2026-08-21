import { SectionHeading } from "./SectionHeading";
import { BrandMark } from "./BrandMark";
import { techStack } from "@/content/techstack";

export function TechStack() {
  return (
    <section id="stack" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Tech stack"
          title="The tools I reach for,"
          titleItalic="grouped by job."
          description="A working stack across automation, backend, data, and applied AI — chosen for what ships, not what's trendy."
        />

        <div className="divide-y divide-border border-y border-border">
          {techStack.map((group) => (
            <div
              key={group.group}
              className="grid gap-6 py-8 md:grid-cols-[220px_1fr] md:gap-10"
            >
              <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
                {group.group}
              </h3>

              <div>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-fg/25"
                    >
                      <BrandMark
                        slug={item.slug}
                        name={item.name}
                        mono={item.mono}
                        className="brand-mark--color h-6 w-6 shrink-0"
                      />
                      <span className="truncate text-sm font-medium tracking-tight">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {group.notes ? (
                  <p className="mt-5 text-xs leading-relaxed text-muted">
                    {group.notes.join("  ·  ")}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
