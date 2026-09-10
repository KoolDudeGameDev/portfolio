"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Close, Github, ArrowUpRight } from "./Icons";
import { type WorkItem } from "@/content/work";
import { asset } from "@/lib/site";

function linkHref(href: string) {
  return href.startsWith("http") ? href : asset(href);
}

export function WorkModal({
  item,
  onClose,
}: {
  item: WorkItem | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const [shot, setShot] = useState(0);

  // Reopening a different case study must not inherit the last one's slide.
  useEffect(() => {
    setShot(0);
  }, [item]);

  // Close on Escape, lock body scroll, and park focus inside the dialog —
  // same contract as ResumeModal.
  useEffect(() => {
    if (!item) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreFocusRef.current?.focus();
    };
  }, [item, onClose]);

  if (!item) return null;

  // A card may carry several visuals (a UI screenshot plus the workflow behind
  // it). `shots` is the normalised list; `image` alone still works.
  const shots =
    item.shots?.length
      ? item.shots
      : item.image
        ? [{ src: item.image, caption: "" }]
        : [];

  const modal = (
    <div
      className="animate-overlay-in fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-modal-title"
        tabIndex={-1}
        className="animate-panel-in flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl outline-none"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {item.category}
            </p>
            <h2
              id="work-modal-title"
              className="mt-1 text-lg font-semibold sm:text-xl"
            >
              {item.title}
            </h2>
            <p className="text-sm text-muted">{item.org}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          {shots.length ? (
            <div className="mb-6">
              <div className="overflow-hidden rounded-xl border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(`/assets/${shots[shot].src}`)}
                  alt={shots[shot].caption || item.title}
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>

              {shots[shot].caption ? (
                <p className="mt-2 text-sm text-muted">{shots[shot].caption}</p>
              ) : null}

              {/* Only worth a filmstrip when there is more than one thing to
                  look at — a single-shot card keeps the quieter layout. */}
              {shots.length > 1 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {shots.map((s, i) => (
                    <button
                      key={s.src}
                      type="button"
                      onClick={() => setShot(i)}
                      aria-label={s.caption || `View ${i + 1}`}
                      aria-current={i === shot}
                      className={`h-14 w-24 overflow-hidden rounded-md border transition-colors ${
                        i === shot
                          ? "border-accent"
                          : "border-border opacity-70 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(`/assets/${s.src}`)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <p className="leading-relaxed text-muted">
            <span className="font-medium text-fg">The problem — </span>
            {item.problem}
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            <span className="font-medium text-fg">What I built — </span>
            {item.build}
          </p>

          <h3 className="mt-7 text-xs uppercase tracking-[0.16em] text-muted">
            Results
          </h3>
          <ul className="mt-3 space-y-2.5">
            {item.results.map((result) => (
              <li
                key={result}
                className="flex gap-3 leading-relaxed text-muted"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fg" />
                {result}
              </li>
            ))}
          </ul>

          <ul className="mt-7 flex flex-wrap gap-2 border-t border-border pt-5">
            {item.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md bg-surface px-2.5 py-1 text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          {item.links?.length ? (
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {item.links.map((link) => (
                <a
                  key={link.label}
                  href={linkHref(link.href)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  {link.icon === "github" ? (
                    <Github className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
