import { useEffect, type RefObject } from "react";

/** Everything the browser will let you Tab to, minus what's been opted out. */
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * The shared modal contract: Escape closes, the page behind stops scrolling,
 * focus moves into the panel and returns to wherever it came from on close,
 * and Tab cycles *inside* the dialog instead of walking out into the page
 * behind it — which is the part both modals were missing.
 *
 * `onKey` runs first for dialogs that want their own shortcuts (WorkModal's
 * arrow-key carousel); it never sees Tab or Escape, which are handled here.
 */
export function useDialog({
  open,
  onClose,
  panelRef,
  onKey,
}: {
  open: boolean;
  onClose: () => void;
  panelRef: RefObject<HTMLElement | null>;
  onKey?: (event: KeyboardEvent) => void;
}) {
  useEffect(() => {
    if (!open) return;

    const restoreTo = document.activeElement as HTMLElement | null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        onKey?.(event);
        return;
      }

      const panel = panelRef.current;
      if (!panel) return;

      // Recomputed per keypress rather than cached: the carousel swaps its
      // controls as slides change, and a cached list would send focus to a
      // button that is no longer on screen.
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.getClientRects().length > 0);

      // A dialog with nothing focusable still must not leak focus outward.
      if (items.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // The panel itself holds focus on open (tabIndex -1), so treat it as
      // "before the first item" when shift-tabbing back off the top.
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreTo?.focus();
    };
  }, [open, onClose, panelRef, onKey]);
}
