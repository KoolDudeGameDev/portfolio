import type { CSSProperties } from "react";
import { brandMarks } from "@/content/brandmarks";
import { asset } from "@/lib/site";

type Props = {
  /** simple-icons slug; falls back to a monogram when the brand has no mark. */
  slug?: string;
  name: string;
  /** Letters to draw when there is no icon (e.g. "GHL" for GoHighLevel). */
  mono?: string;
  /** Filename under public/assets, for logos that only exist as a raster. */
  img?: string;
  /**
   * Paint `img`'s alpha in currentColor instead of showing its pixels. For the
   * flat single-color logos, which would otherwise be a black shape sitting
   * invisibly on the dark theme.
   */
  mask?: boolean;
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
 *
 * Raster marks (`img`) are the exception: a handful of logos have no vector
 * anywhere, so they ship as trimmed PNGs. Multi-color ones render as an
 * <img> because the color *is* the logo; single-color ones use `mask` so they
 * still invert with the theme.
 */
export function BrandMark({
  slug,
  name,
  mono,
  img,
  mask,
  className = "h-7 w-7",
}: Props) {
  if (img) {
    const src = asset(`/assets/${img}`);

    if (mask) {
      return (
        <span
          aria-hidden
          className={`mask-mark shrink-0 ${className}`}
          style={{ "--mark-src": `url(${src})` } as CSSProperties}
        />
      );
    }

    return (
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className={`shrink-0 object-contain ${className}`}
      />
    );
  }

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
