"use client";

import { useEffect, useRef } from "react";
import { BrandMark } from "./BrandMark";
import { featuredTools, type StackItem } from "@/content/techstack";

/**
 * Pixels per second the strip drifts on its own. Matches the pace of the old
 * CSS translate animation (one full list in roughly 48s).
 */
const SPEED = 40;

// The track holds the list twice; scrolling past the first copy wraps back by
// exactly one copy's width, which lands on a seam-free loop. Hovering pauses
// the drift, dragging takes it over, and prefers-reduced-motion drops it to a
// static wrapped row.
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
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let last = 0;
    let hovered = false;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    /** One copy of the list — the distance that loops seamlessly. */
    const cycle = () => el.scrollWidth / 2;

    const wrap = () => {
      const width = cycle();
      if (width <= 0) return;
      if (el.scrollLeft >= width) el.scrollLeft -= width;
      else if (el.scrollLeft <= 0) el.scrollLeft += width;
    };

    const tick = (now: number) => {
      if (!last) last = now;
      const elapsed = (now - last) / 1000;
      last = now;
      if (!hovered && !dragging) {
        el.scrollLeft += SPEED * elapsed;
        wrap();
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduced.matches || frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Touch and trackpad already scroll this natively; taking over the pointer
    // there would only fight the platform's own momentum.
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      dragging = true;
      startX = event.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(event.pointerId);
      el.classList.add("is-dragging");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      event.preventDefault();
      el.scrollLeft = startScroll - (event.clientX - startX);
      wrap();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (el.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }
      el.classList.remove("is-dragging");
    };

    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onMotionChange = () => {
      if (reduced.matches) stop();
      else start();
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onLeave);
    reduced.addEventListener("change", onMotionChange);

    start();

    return () => {
      stop();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
      reduced.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <section aria-label="Tools and platforms" className="mt-20 pb-6 md:mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-border pt-12 md:pt-14">
          <p className="text-center text-xs uppercase tracking-[0.18em] text-muted">
            Tools &amp; platforms I work with
          </p>
        </div>
      </div>

      <div
        ref={scroller}
        tabIndex={0}
        role="group"
        aria-label="Tools and platforms, scrollable"
        className="marquee mt-10 select-none md:mt-12"
      >
        <div className="marquee-track flex">
          <Half />
          <Half clone />
        </div>
      </div>
    </section>
  );
}
