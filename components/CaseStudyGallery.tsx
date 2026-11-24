"use client";

import { useState } from "react";
import { ZoomIn } from "./Icons";
import { ImageZoom } from "./ImageZoom";
import { type WorkShot } from "@/content/work";
import { asset } from "@/lib/site";

/**
 * A case study's screens as a grid with captions. A click opens the full-screen
 * viewer, the one modal left on these pages: it is a short look that returns
 * the reader to where they were.
 */
export function CaseStudyGallery({ shots, title }: { shots: WorkShot[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      {/* Phones get a swipeable row instead of six full-width screens stacked;
          from 640px it becomes a grid, three across on desktop. */}
      <ul className="-mx-6 mt-4 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {shots.map((shot, i) => (
          <li key={shot.src} className="w-[82%] shrink-0 snap-start sm:w-auto">

            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Enlarge: ${shot.caption || title}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(`/assets/${shot.src}`)}
                alt={shot.caption || title}
                loading="lazy"
                decoding="async"
                className={`aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
                  shot.src.startsWith("showcase/") ? "object-top" : "object-center"
                }`}
              />
              <span className="pointer-events-none absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <ZoomIn className="h-4 w-4" />
              </span>
            </button>
            {shot.caption ? <p className="mt-2.5 text-sm leading-relaxed text-muted">{shot.caption}</p> : null}
          </li>
        ))}
      </ul>

      {open !== null ? (
        <ImageZoom shots={shots} index={open} title={title} onIndex={setOpen} onClose={() => setOpen(null)} />
      ) : null}
    </>
  );
}
