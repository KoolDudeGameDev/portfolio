import { ChevronRight } from "./Icons";
import { faqs } from "@/content/faq";

/**
 * Sits beside the contact form rather than in a section of its own: these are
 * the objections that come up at the moment someone decides whether to write,
 * and as a full-width band they cost a screen of scrolling for the lowest-value
 * content on the page.
 *
 * Native <details>/<summary>, so the accordion needs no JavaScript and is
 * keyboard-accessible for free. The shared `name` makes it an exclusive
 * accordion in the browser — opening one closes the last — which keeps the
 * card's growth bounded to a single answer, so the form beside it does not get
 * stretched by a stack of open ones. Browsers without it (pre-2024) just allow
 * several open, which is what this did before.
 *
 * Keeps `id="faq"` — it is a deep-link target, and the nav tests assert that
 * scrolling to it highlights nothing, since the nav does not list it.
 */
export function FaqPanel() {
  return (
    <div
      id="faq"
      className="scroll-mt-[92px] rounded-3xl border border-border bg-card p-6 md:p-8"
    >
      <h3 className="font-sans text-2xl font-semibold tracking-tight">
        Quick answers.{" "}
        <span className="font-serif font-normal italic text-muted">
          Still have one? Just ask.
        </span>
      </h3>

      <div className="mt-6 border-t border-border">
        {faqs.map((faq, i) => (
          <details
            key={faq.question}
            name="faq"
            className="group border-b border-border"
          >
            <summary className="flex cursor-pointer list-none items-start gap-4 py-4 text-left font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
              <span className="mt-0.5 font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">{faq.question}</span>
              <ChevronRight
                aria-hidden
                className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-90"
              />
            </summary>
            <p className="pb-5 pl-8 pr-6 leading-relaxed text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
