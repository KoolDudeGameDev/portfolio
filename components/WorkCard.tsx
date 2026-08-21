import { ArrowRight } from "./Icons";
import { type WorkItem } from "@/content/work";
import { asset } from "@/lib/site";

/** Chips are capped so a long stack can't set the card's height. */
const MAX_TECH = 4;

function StatusBadge({ status }: { status: WorkItem["status"] }) {
  const tone =
    status === "Active" ? "text-fg border-fg/30" : "text-muted border-border";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide ${tone}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

/**
 * Every card reserves the same 16:9 block whether or not a screenshot exists,
 * so the grid stays even. Projects without one get a typographic title card
 * rather than an empty hole.
 */
function Thumbnail({ item }: { item: WorkItem }) {
  return (
    <div className="aspect-[16/9] overflow-hidden rounded-xl border border-border">
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(`/assets/${item.image}`)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-surface px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.16em]">
            {item.org}
          </span>
          <span className="text-xs text-muted">{item.category}</span>
        </div>
      )}
    </div>
  );
}

export function WorkCard({
  item,
  onOpen,
}: {
  item: WorkItem;
  onOpen: () => void;
}) {
  const extraTech = item.tech.length - MAX_TECH;

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-fg/25 md:p-6">
      <Thumbnail item={item} />

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.16em] text-muted">
          {item.category}
        </span>
        <StatusBadge status={item.status} />
      </div>

      <h3 className="mt-3 text-lg font-semibold md:text-xl">{item.title}</h3>
      <p className="mt-1 text-sm text-muted">{item.org}</p>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
        {item.problem}
      </p>

      <ul className="mt-4 flex flex-wrap items-center gap-2">
        {item.tech.slice(0, MAX_TECH).map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-surface px-2.5 py-1 text-xs text-muted"
          >
            {tech}
          </li>
        ))}
        {extraTech > 0 ? (
          <li className="text-xs text-muted">+{extraTech}</li>
        ) : null}
      </ul>

      {/* Pushes the action to the bottom so every card in a row lines up. */}
      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex w-full items-center justify-between border-t border-border pt-4 text-sm font-medium transition-colors hover:text-muted"
        >
          <span>
            Case study
            <span className="sr-only"> — {item.title}</span>
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}
