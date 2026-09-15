import { SectionHeading } from "./SectionHeading";
import { ChevronRight } from "./Icons";
import { faqs } from "@/content/faq";

/**
 * Native <details>/<summary>, so the accordion needs no JavaScript and is
 * keyboard-accessible for free. Hairline rules instead of cards: the page is
 * already card-heavy, and a reading column suits prose answers better.
 */
export function Faq() {
  return (
    <section id="faq" className="bg-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          eyebrow="Questions"
          title="Before you get in"
          titleItalic="touch."
          description="The things owners usually want to know before a first call."
        />

        <div className="max-w-3xl border-t border-border">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-border"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-90"
                />
              </summary>
              <p className="pb-6 pr-10 leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
