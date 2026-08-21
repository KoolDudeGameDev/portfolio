import { BrandMark } from "./BrandMark";
import { featuredTools, type StackItem } from "@/content/techstack";

// The track holds the list twice; the CSS loops it by -50%, which lands exactly
// on the seam because each half carries its own trailing gap as padding.
// Hovering pauses it, and prefers-reduced-motion drops it to a static row.
function Half({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      aria-hidden={clone || undefined}
      className={`flex shrink-0 items-center gap-14 pr-14 ${
        clone ? "marquee-clone" : ""
      }`}
    >
      {featuredTools.map((tool: StackItem) => (
        <li
          key={tool.name}
          className="flex items-center gap-2.5 whitespace-nowrap"
        >
          <BrandMark
            slug={tool.slug}
            name={tool.name}
            mono={tool.mono}
            className="brand-mark--color h-6 w-6"
          />
          <span className="text-sm font-medium tracking-tight">
            {tool.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  return (
    <section aria-label="Tools and platforms" className="mt-20 pb-6 md:mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-border pt-12 md:pt-14">
          <p className="text-center text-xs uppercase tracking-[0.18em] text-muted">
            Tools &amp; platforms I work with
          </p>
        </div>
      </div>

      <div className="marquee mt-10 overflow-hidden md:mt-12">
        <div className="marquee-track flex">
          <Half />
          <Half clone />
        </div>
      </div>
    </section>
  );
}
