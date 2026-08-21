"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Close, Download, ArrowUpRight } from "./Icons";
import { asset, site } from "@/lib/site";

const RESUME_PATH = "/assets/Kyle_Gregory_Ibo_Resume.pdf";
const FILE_NAME = "Kyle_Gregory_Ibo_Resume.pdf";

/** Shown wherever the PDF can't be rendered inline — small screens, or a
 *  browser configured to download PDFs instead of displaying them. */
function Fallback({ href, message }: { href: string; message: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-6 py-10 text-center">
      <p className="max-w-sm text-sm leading-relaxed text-muted">{message}</p>
      <div className="flex flex-col items-stretch gap-3">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg hover:text-fg"
        >
          <ArrowUpRight className="h-4 w-4" />
          Open in new tab
        </a>
        <a
          href={href}
          download={FILE_NAME}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>
    </div>
  );
}

export function ResumeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Close on Escape, lock body scroll, and park focus inside the dialog.
  useEffect(() => {
    if (!open) return;

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
  }, [open, onClose]);

  if (!open) return null;

  const href = asset(RESUME_PATH);

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
        aria-labelledby="resume-modal-title"
        tabIndex={-1}
        className="animate-panel-in flex h-full max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id="resume-modal-title"
              className="truncate text-base font-semibold sm:text-lg"
            >
              Résumé
            </h2>
            <p className="truncate text-xs text-muted sm:text-sm">
              {site.name} — {site.role}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={href}
              download={FILE_NAME}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 sm:px-4"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">Download</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close résumé"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-fg"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Preview — inline on larger screens, where PDF embedding is reliable.
            <object> rather than <iframe> so there is somewhere to land when the
            browser won't render a PDF inline: Chrome set to "download PDFs
            instead of opening them" shows an iframe as a blank grey panel with
            no way out, whereas an object falls through to its children. */}
        <div className="hidden flex-1 bg-surface sm:block">
          <object
            data={`${href}#view=FitH`}
            type="application/pdf"
            aria-label="Résumé preview"
            className="h-full w-full"
          >
            <Fallback
              href={href}
              message="Your browser is set to download PDFs rather than display them, so the preview can't render here."
            />
          </object>
        </div>

        {/* Mobile browsers embed PDFs inconsistently, so offer the actions instead. */}
        <div className="flex flex-1 sm:hidden">
          <Fallback
            href={href}
            message="One page, PDF. Open it in a new tab to read it here, or download a copy."
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
