"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Turn } from "./Icons";
import { asset, site } from "@/lib/site";

/** How long the front stays up on arrival before the card turns itself over. */
const AUTO_FLIP_MS = 2000;
/** Roughly the smooth scroll to the card, so a "Start a project" click turns it on arrival. */
const LINK_FLIP_MS = 1100;
/** How far the card leans toward the pointer, in degrees. */
const MAX_TILT = 9;
const markStyle = {
  "--mark-src": `url(${asset("/assets/kg-mark.png")})`,
} as CSSProperties;

/**
 * The closing business card: icon, name and role on the front, `children` on the
 * back. It turns itself over once, a moment after arriving, so nobody misses
 * what is on the back, and after that it is the visitor's to flip.
 *
 * The turn and the depth are CSS (`.card-*` in globals.css). This only holds
 * which side is up and feeds the pointer position in. The face turned away is
 * `inert`, because `backface-visibility` hides it from the eye but not from Tab.
 */
export function BusinessCard({ children }: { children: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  // A visitor who has already flipped it shouldn't have it flipped on them.
  const touched = useRef(false);

  const flip = () => {
    touched.current = true;
    setFlipped((side) => !side);
  };

  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    // No motion to wait for, so go straight to the side with the Book button.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFlipped(true);
      return;
    }

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer);
        if (entry.intersectionRatio < 0.6 || touched.current) return;
        timer = window.setTimeout(() => {
          observer.disconnect();
          if (!touched.current) setFlipped(true);
        }, AUTO_FLIP_MS);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // "Start a project" leads here, so it must always land on the invitation, even
  // if the visitor turned the card back to its front earlier.
  useEffect(() => {
    let timer = 0;
    const onClick = (event: MouseEvent) => {
      if (!(event.target as Element).closest?.('a[href$="#book"]')) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setFlipped(true), LINK_FLIP_MS);
    };
    document.addEventListener("click", onClick);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const el = stage.current;
    const layer = tilt.current;
    if (!el || !layer) return;
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = el.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width;
        const y = (event.clientY - box.top) / box.height;
        layer.style.setProperty("--ry", `${(x - 0.5) * 2 * MAX_TILT}deg`);
        layer.style.setProperty("--rx", `${(0.5 - y) * 2 * MAX_TILT}deg`);
        layer.style.setProperty("--mx", `${x * 100}%`);
        layer.style.setProperty("--my", `${y * 100}%`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      for (const name of ["--rx", "--ry", "--mx", "--my"]) {
        layer.style.removeProperty(name);
      }
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={stage} className="card-stage">
      <div aria-hidden className="card-floor" />

      <div className="card-arrive">
      <div ref={tilt} className="card-tilt">
        <div className="card-flip" data-flipped={flipped ? "true" : undefined}>
          <div className="card-face card-front ink ring-panel" inert={flipped}>
            <span aria-hidden className="mask-mark card-deboss" style={markStyle} />
            <span aria-hidden className="mask-mark card-mark" style={markStyle} />

            <div className="relative">
              <p className="card-name font-serif">{site.name}</p>
              <p className="card-role">{site.role}</p>
            </div>

            {/* The ::after covers the face, so clicking anywhere flips it. */}
            <button
              type="button"
              onClick={flip}
              aria-label="Flip the card over"
              className="card-button card-button-cover"
            >
              <Turn className="h-3.5 w-3.5" />
              Flip
            </button>
            <div aria-hidden className="card-sheen" />
          </div>

          <div className="card-face card-back ink ring-panel" inert={!flipped}>
            <div aria-hidden className="ring-orb">
              <span />
              <span />
            </div>

            {children}

            <button
              type="button"
              onClick={flip}
              aria-label="Flip the card back"
              className="card-button"
            >
              <Turn className="h-3.5 w-3.5" />
              Flip
            </button>
            <div aria-hidden className="card-sheen" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
