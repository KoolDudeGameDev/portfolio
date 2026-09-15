"use client";

import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./BrandMark";
import { featuredTools, type StackItem } from "@/content/techstack";

/**
 * Pixels per second the strip drifts on its own. Matches the pace of the old
 * CSS translate animation (one full list in roughly 48s).
 */
const SPEED = 40;

/** Two copies is the minimum that can loop at all; wide screens need more. */
const MIN_COPIES = 2;

// The track holds the list several times over. Drifting past one copy's width
// wraps back by exactly that width, which lands on a seam-free loop because
// every copy is identical. Hovering pauses the drift, dragging takes it over,
// and prefers-reduced-motion drops it to a static wrapped row.
function Copy({
  innerRef,
  hidden,
}: {
  innerRef?: React.Ref<HTMLUListElement>;
  hidden?: boolean;
}) {
  return (
    <ul
      ref={innerRef}
      aria-hidden={hidden || undefined}
      className="marquee-copy flex shrink-0 items-center gap-14 pr-14"
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
            img={tool.img}
            mask={tool.mask}
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
  const firstCopy = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(MIN_COPIES);

  /**
   * A scroll container clamps scrollLeft to `scrollWidth - clientWidth`, so the
   * loop only works while one copy is narrower than that. With two copies that
   * stops being true somewhere around a 1950px viewport: the strip drifts to
   * the right edge, can never reach the wrap point, and stops dead. Render
   * enough copies that the wrap distance always stays comfortably reachable.
   */
  useEffect(() => {
    const el = scroller.current;
    const copy = firstCopy.current;
    if (!el || !copy) return;

    const measure = () => {
      const copyWidth = copy.offsetWidth;
      if (copyWidth <= 0) return;
      const needed = Math.ceil((el.clientWidth * 2) / copyWidth) + 1;
      setCopies(Math.max(MIN_COPIES, needed));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    observer.observe(copy);

    // Fonts land after first paint and change every copy's width.
    document.fonts?.ready.then(measure).catch(() => {});

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = scroller.current;
    const copy = firstCopy.current;
    if (!el || !copy) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let last = 0;
    let hovered = false;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    /** Kept as a float here rather than read back off the DOM each frame. */
    let offset = el.scrollLeft;
    let lastWritten = -1;

    /** One copy — the distance that loops seamlessly. */
    const cycle = () => copy.offsetWidth;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      const width = cycle();
      if (width <= 0) return;

      // Trackpad, arrow keys or a drag moved it: take their position over ours.
      if (lastWritten < 0 || Math.abs(el.scrollLeft - lastWritten) > 1) {
        offset = ((el.scrollLeft % width) + width) % width;
      }

      if (!last) last = now;
      const elapsed = (now - last) / 1000;
      last = now;

      // Leave scrollLeft alone while paused, so native momentum isn't cancelled.
      if (hovered || dragging) {
        lastWritten = el.scrollLeft;
        return;
      }

      offset += SPEED * elapsed;
      if (offset >= width) offset -= width;
      el.scrollLeft = offset;
      lastWritten = el.scrollLeft;
    };

    const start = () => {
      if (reduced.matches || frame) return;
      last = 0;
      lastWritten = -1;
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

      let next = startScroll - (event.clientX - startX);
      const width = cycle();
      // Shift the drag origin along with the wrap so the drag stays continuous
      // instead of snapping when it crosses a copy boundary.
      if (width > 0) {
        while (next >= width) {
          next -= width;
          startScroll -= width;
        }
        while (next < 0) {
          next += width;
          startScroll += width;
        }
      }
      el.scrollLeft = next;
      offset = next;
      lastWritten = el.scrollLeft;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (el.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }
      el.classList.remove("is-dragging");
    };

    // Safety net: a pointer released outside the element must not leave the
    // strip stuck in `dragging` and paused forever.
    const onWindowPointerUp = () => {
      if (!dragging) return;
      dragging = false;
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
    window.addEventListener("pointerup", onWindowPointerUp);
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
      window.removeEventListener("pointerup", onWindowPointerUp);
      reduced.removeEventListener("change", onMotionChange);
    };
  }, [copies]);

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
          {Array.from({ length: copies }, (_, i) => (
            <Copy
              key={i}
              innerRef={i === 0 ? firstCopy : undefined}
              hidden={i > 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
