"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ImageZoom } from "./ImageZoom";
import { Pause, Play } from "./Icons";
import { WorkModal } from "./WorkModal";
import {
  showcaseRows,
  type ShowcaseRow,
  type ShowcaseShot,
} from "@/content/showcase";
import { work, type WorkItem } from "@/content/work";
import { asset } from "@/lib/site";

/** Two copies is the minimum that can loop at all; wide screens need more. */
const MIN_COPIES = 2;
/** A hovered row drifts at this share of its full speed. */
const HOVER_RATE = 0.22;
/** How fast a row eases between speeds. Higher is snappier. */
const EASE = 5;
/** Past this many pixels a press is a drag, not a click. */
const DRAG_SLOP = 6;
/** Left alone this long after a swipe, so native momentum can finish. */
const TOUCH_REST_MS = 1200;

const allShots = showcaseRows.flatMap((row) => row.shots);

function Copy({
  row,
  innerRef,
  hidden,
  onOpen,
}: {
  row: ShowcaseRow;
  innerRef?: React.Ref<HTMLUListElement>;
  hidden: boolean;
  onOpen: (shot: ShowcaseShot) => void;
}) {
  return (
    <ul
      ref={innerRef}
      aria-hidden={hidden || undefined}
      className="showcase-copy flex shrink-0"
    >
      {row.shots.map((shot) => (
        <li key={shot.src} className="shrink-0 pr-3">
          <button
            type="button"
            tabIndex={hidden ? -1 : undefined}
            onClick={() => onOpen(shot)}
            aria-label={`${shot.project}: ${shot.caption}. Open larger view.`}
            className="showcase-tile"
            data-kind={row.kind}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(`/assets/showcase/${shot.src}.thumb.webp`)}
              alt=""
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

/**
 * One drifting row: a real scroll container, so touch, trackpad and arrow keys
 * move the same thing the drift does. Past one copy's width it wraps back by
 * exactly that width, which is seamless because every copy is identical.
 */
function Row({
  row,
  index,
  stopped,
  onOpen,
}: {
  row: ShowcaseRow;
  index: number;
  stopped: boolean;
  onOpen: (shot: ShowcaseShot) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const firstCopy = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(MIN_COPIES);
  // Read inside the animation frame, so stopping never restarts the effect.
  const stoppedRef = useRef(stopped);
  stoppedRef.current = stopped;

  // scrollLeft clamps at `scrollWidth - clientWidth`, so the wrap point has to
  // stay reachable. Render enough copies for that at any viewport width.
  useEffect(() => {
    const el = scroller.current;
    const copy = firstCopy.current;
    if (!el || !copy) return;
    const measure = () => {
      if (copy.offsetWidth <= 0) return;
      const needed = Math.ceil((el.clientWidth * 2) / copy.offsetWidth) + 1;
      setCopies(Math.max(MIN_COPIES, needed));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    observer.observe(copy);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = scroller.current;
    const copy = firstCopy.current;
    if (!el || !copy) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sign = row.direction === "left" ? 1 : -1;

    let frame = 0;
    let last = 0;
    let hovered = false;
    let focused = false;
    let tabbing = false;
    let pressed = false;
    let dragging = false;
    let swallowClick = false;
    let touching = false;
    let restUntil = 0;
    let startX = 0;
    let startScroll = 0;
    let rate = 1;
    let offset = el.scrollLeft;
    let lastWritten = -1;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const width = copy.offsetWidth;
      if (width <= 0) return;

      // Trackpad, keys or a swipe moved it: take their position over ours.
      if (lastWritten < 0 || Math.abs(el.scrollLeft - lastWritten) > 1) {
        offset = ((el.scrollLeft % width) + width) % width;
      }

      if (!last) last = now;
      const elapsed = Math.min((now - last) / 1000, 0.1);
      last = now;

      const target = stoppedRef.current
        ? 0
        : hovered || focused
          ? HOVER_RATE
          : 1;
      rate += (target - rate) * Math.min(1, elapsed * EASE);

      // Leave scrollLeft alone while held, so native momentum isn't cancelled.
      if (dragging || touching || now < restUntil) {
        lastWritten = el.scrollLeft;
        return;
      }

      offset += sign * row.speed * rate * elapsed;
      if (offset >= width) offset -= width;
      if (offset < 0) offset += width;
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
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Touch already scrolls this natively; taking over would fight momentum.
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      pressed = true;
      swallowClick = false;
      startX = event.clientX;
      startScroll = el.scrollLeft;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!pressed) return;
      const delta = event.clientX - startX;
      if (!dragging) {
        if (Math.abs(delta) < DRAG_SLOP) return;
        dragging = true;
        swallowClick = true;
        el.setPointerCapture(event.pointerId);
        el.classList.add("is-dragging");
      }
      let next = startScroll - delta;
      const width = copy.offsetWidth;
      // Shift the origin with the wrap, so the drag stays continuous.
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
    const onPointerUp = () => {
      pressed = false;
      dragging = false;
      el.classList.remove("is-dragging");
    };
    // A drag ends with a click on whichever tile it stopped over; swallow it.
    const onClickCapture = (event: MouseEvent) => {
      if (!swallowClick) return;
      swallowClick = false;
      event.stopPropagation();
      event.preventDefault();
    };

    const onTouchStart = () => {
      touching = true;
    };
    const onTouchEnd = () => {
      touching = false;
      restUntil = performance.now() + TOUCH_REST_MS;
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== "touch") hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    // Only for someone tabbing along the row. Closing the popup hands focus
    // back to the tile, and that must not leave the row slow.
    const onKeyDown = (event: KeyboardEvent) => {
      tabbing = event.key === "Tab";
    };
    const onFocusIn = () => {
      focused = tabbing;
    };
    const onFocusOut = () => {
      focused = false;
    };
    const onMotionChange = () => {
      if (reduced.matches) stop();
      else start();
    };

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibility.observe(el);

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("keydown", onKeyDown);
    reduced.addEventListener("change", onMotionChange);

    return () => {
      stop();
      visibility.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      reduced.removeEventListener("change", onMotionChange);
    };
  }, [copies, row.direction, row.speed]);

  return (
    <div
      ref={scroller}
      role="group"
      aria-label={row.label}
      data-direction={row.direction}
      style={{ "--i": index } as React.CSSProperties}
      className="showcase-row reveal select-none"
    >
      <div className="showcase-track flex">
        {Array.from({ length: copies }, (_, i) => (
          <Copy
            key={i}
            row={row}
            innerRef={i === 0 ? firstCopy : undefined}
            hidden={i > 0}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * The three-row project carousel under the hero. Rows run opposite ways, a
 * hovered row slows, and opening an image stops all three until it closes.
 */
export function Showcase() {
  const [open, setOpen] = useState<ShowcaseShot | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [detail, setDetail] = useState<WorkItem | null>(null);

  // The popup walks through every screen of that project, not just the one row.
  const gallery = useMemo(
    () =>
      allShots
        .filter((shot) => shot.project === open?.project)
        .map((shot) => ({
          src: `showcase/${shot.src}.webp`,
          caption: `${shot.project}: ${shot.caption}`,
        })),
    [open],
  );

  const openShot = useCallback((shot: ShowcaseShot) => {
    const same = allShots.filter((s) => s.project === shot.project);
    setIndex(same.findIndex((s) => s.src === shot.src));
    setOpen(shot);
  }, []);
  const closeShot = useCallback(() => setOpen(null), []);
  const closeDetail = useCallback(() => setDetail(null), []);

  return (
    <section id="showcase" className="screen tint-4 overflow-x-clip py-14">
      <div className="mx-auto mb-5 flex w-full max-w-6xl flex-wrap items-end justify-between gap-x-8 gap-y-3 px-6 lg:mb-[clamp(0.75rem,2.5svh,1.75rem)]">
        <div>
          <h2 className="reveal font-sans text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[clamp(1.75rem,5.4svh,3rem)]">
            Deployed software,{" "}
            <span className="font-serif font-normal italic text-accent">
              not mockups.
            </span>
          </h2>
          <p className="mt-2 text-sm text-muted">
            Screens from apps I have built for real businesses, on desktop and
            mobile. All names and personal details shown are fictional.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-fg"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          {paused ? "Play" : "Pause"}
        </button>
      </div>

      <div className="showcase-rows flex flex-col">
        {showcaseRows.map((row, i) => (
          <Row
            key={row.label}
            row={row}
            index={i}
            stopped={paused || open !== null || detail !== null}
            onOpen={openShot}
          />
        ))}
      </div>

      {open ? (
        <ImageZoom
          shots={gallery}
          index={index}
          title={open.project}
          onIndex={setIndex}
          onClose={closeShot}
          action={{
            label: "Read the case study",
            onClick: () => {
              setDetail(work.find((w) => w.title === open.project) ?? null);
              setOpen(null);
            },
          }}
        />
      ) : null}
      <WorkModal item={detail} onClose={closeDetail} />
    </section>
  );
}
