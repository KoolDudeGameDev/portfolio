"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Close, ZoomIn, ZoomOut } from "./Icons";
import { type WorkShot } from "@/content/work";
import { asset } from "@/lib/site";
import { useDialog } from "@/lib/useDialog";

const controlClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/70";

/**
 * Full-screen viewer for a case study's images, opened from WorkModal.
 *
 * Two states and no library: "fit" shows the whole image uncropped, and a click
 * switches to a larger fixed width inside a scrolling box, scrolled so the
 * point you clicked lands in the middle. Panning is native scrolling, so mouse
 * wheel, trackpad and touch-drag all work, and phones keep their own pinch.
 */
export function ImageZoom({
  shots,
  index,
  title,
  onIndex,
  onClose,
}: {
  shots: WorkShot[];
  index: number;
  title: string;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  // Width in px while zoomed, null while fitted.
  const [width, setWidth] = useState<number | null>(null);
  // Where to centre after zooming, as fractions of the image.
  const focus = useRef({ x: 0.5, y: 0.5 });

  const count = shots.length;
  const shot = shots[index];

  const go = useCallback(
    (step: number) => {
      setWidth(null);
      onIndex((index + step + count) % count);
    },
    [index, count, onIndex],
  );

  const zoomIn = useCallback((x = 0.5, y = 0.5) => {
    const img = imgRef.current;
    if (!img) return;
    focus.current = { x, y };
    // Natural size where it is a real step up, otherwise double the fit.
    setWidth(Math.max(img.naturalWidth, img.clientWidth * 2));
  }, []);

  const onKey = useCallback(
    (event: KeyboardEvent) => {
      if (count > 1 && event.key === "ArrowLeft") go(-1);
      if (count > 1 && event.key === "ArrowRight") go(1);
      if (event.key === "+" || event.key === "=") zoomIn();
      if (event.key === "-") setWidth(null);
    },
    [count, go, zoomIn],
  );

  useDialog({ open: true, onClose, panelRef, onKey });

  useLayoutEffect(() => {
    const box = scrollRef.current;
    const img = imgRef.current;
    if (!box || !img || width === null) return;
    box.scrollLeft =
      img.offsetLeft + focus.current.x * img.offsetWidth - box.clientWidth / 2;
    box.scrollTop =
      img.offsetTop + focus.current.y * img.offsetHeight - box.clientHeight / 2;
  }, [width]);

  const zoomed = width !== null;

  const viewer = (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${shot.caption || title} — enlarged`}
      tabIndex={-1}
      className="animate-overlay-in fixed inset-0 z-[110] flex flex-col bg-black/95 outline-none backdrop-blur-sm"
    >
      {/* Not flex-centred: a centred flex child that overflows is clipped on
          the left and top, out of scroll reach. Auto margins centre it only
          while it fits. */}
      <div
        ref={scrollRef}
        className="flex min-h-0 flex-1 overflow-auto p-4 sm:p-10"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget && !zoomed) onClose();
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={asset(`/assets/${shot.src}`)}
          alt={shot.caption || title}
          onClick={(e) => {
            if (zoomed) return setWidth(null);
            const r = e.currentTarget.getBoundingClientRect();
            zoomIn((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
          }}
          style={zoomed ? { width, maxWidth: "none" } : undefined}
          className={`m-auto select-none ${
            zoomed
              ? "h-auto shrink-0 cursor-zoom-out"
              : "max-h-full max-w-full cursor-zoom-in object-contain"
          }`}
          draggable={false}
        />
      </div>

      <div className="absolute right-4 top-4 flex gap-2">
        <button
          type="button"
          onClick={() => (zoomed ? setWidth(null) : zoomIn())}
          aria-label={zoomed ? "Fit to screen" : "Zoom in"}
          className={controlClass}
        >
          {zoomed ? (
            <ZoomOut className="h-5 w-5" />
          ) : (
            <ZoomIn className="h-5 w-5" />
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enlarged image"
          className={controlClass}
        >
          <Close className="h-5 w-5" />
        </button>
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className={`${controlClass} absolute left-4 top-1/2 -translate-y-1/2`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className={`${controlClass} absolute right-4 top-1/2 -translate-y-1/2`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      ) : null}

      <div className="flex shrink-0 items-baseline justify-between gap-4 px-5 pb-4 pt-2 text-sm text-white/75">
        <p className="leading-relaxed">{shot.caption}</p>
        {count > 1 ? (
          <span className="shrink-0 text-xs font-medium">
            {index + 1} / {count}
          </span>
        ) : null}
      </div>
    </div>
  );

  return createPortal(viewer, document.body);
}
