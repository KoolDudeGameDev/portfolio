import type { CSSProperties } from "react";
import { brandMarks } from "@/content/brandmarks";

type Props = {
  /** simple-icons slug; falls back to a monogram when the brand has no mark. */
  slug?: string;
  name: string;
  /** Letters to draw when there is no icon (e.g. "GHL" for GoHighLevel). */
  mono?: string;
  className?: string;
};

/** Derive initials so a missing `mono` still renders something sensible. */
function initials(name: string): string {
  const caps = name.replace(/[^A-Za-z0-9]/g, "").match(/[A-Z0-9]/g);
  if (caps && caps.length >= 2) return caps.slice(0, 3).join("");
  return name.slice(0, 2).toUpperCase();
}

/**
 * A single-path brand mark. At rest it draws in `currentColor` so the row reads
 * as one grey texture; the `.brand-mark` rule in globals.css swaps it to the
 * brand color when an ancestor `.group` is hovered. Monogram fallbacks have no
 * brand color and simply stay in the foreground ink.
 */
export function BrandMark({ slug, name, mono, className = "h-7 w-7" }: Props) {
  const mark = slug ? brandMarks[slug] : undefined;

  if (mark) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        focusable="false"
        className={`brand-mark ${className}`}
        style={
          { "--brand": mark.light, "--brand-dark": mark.dark } as CSSProperties
        }
      >
        <path d={mark.path} />
      </svg>
    );
  }

  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center font-mono text-[0.6rem] font-semibold uppercase leading-none tracking-[0.08em] ${className}`}
    >
      {mono ?? initials(name)}
    </span>
  );
}
