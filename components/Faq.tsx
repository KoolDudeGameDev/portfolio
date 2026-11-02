import type { CSSProperties } from "react";
import { faqs } from "@/content/faq";

/**
 * Four open columns at the top of the closing band, so nobody has to click to
 * get an answer, right above the form they would otherwise hesitate over.
 *
 * Keeps `id="faq"` — it is a deep-link target, and the nav tests assert that
 * scrolling to it highlights nothing, since the nav does not list it.
 */
export function Faq() {
  return (
    <div id="faq" className="scroll-mt-[92px]">
      <h2 className="reveal text-center font-sans text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[clamp(1.5rem,5svh,2.5rem)]">
        Quick answers.{" "}
        <span className="font-serif font-normal italic text-muted">
          Have another question? Please ask.
        </span>
      </h2>

      <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:mt-[clamp(0.75rem,3svh,2rem)] lg:grid-cols-4">
        {faqs.map((faq, i) => (
          <div
            key={faq.question}
            className="reveal sm:border-l sm:border-border sm:pl-5"
            style={{ "--i": i } as CSSProperties}
          >
            <dt className="font-semibold leading-snug">{faq.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
