import { BusinessCard } from "./BusinessCard";
import { ContactForm } from "./ContactForm";
import { Faq } from "./Faq";
import { Footer } from "./Footer";
import { ArrowRight } from "./Icons";
import { site } from "@/lib/site";

/**
 * The closing invitation, on the back of the business card. The button goes to
 * the booking link once `site.bookingUrl` is set, and to the form until then.
 */
export function Book() {
  return (
    <section id="book" className="screen px-4 py-16 sm:px-6">
      {/* No `.reveal` here, and `.card-stage-wrap` opts out of the recede. See
          "BUSINESS CARD" in globals.css. */}
      <div className="card-stage-wrap w-full">
          <BusinessCard>
            <div className="card-content relative max-w-xl">
              <div className="mb-[3cqh] flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
                <span className="font-mono">06</span>
                <span className="h-px w-8 bg-border" />
                <span>Contact</span>
              </div>

              <h2 className="card-title font-sans font-semibold tracking-tight">
                Have a system worth{" "}
                <span className="font-serif font-normal italic text-accent">
                  building?
                </span>
              </h2>
              <p className="mx-auto mt-[3cqh] max-w-lg text-sm leading-relaxed text-muted md:text-base">
                Tell me what&apos;s slowing your team down. I&apos;ll reply with
                a few questions and, if it&apos;s a fit, a scoped quote.
                Collaborations and technical questions are welcome too.
              </p>

              <a
                href={site.bookingUrl || "#contact"}
                className="group mt-[5cqh] inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                Book a free session
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* Mirrors the hero pill, at the point where someone decides to write. */}
              <p className="mt-[3.5cqh] flex items-center justify-center gap-2 text-sm text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-live opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
                </span>
                Currently accepting new clients
              </p>
            </div>
          </BusinessCard>
      </div>
    </section>
  );
}

/**
 * FAQ, form and footer as one connected band, so the page ends in a single
 * place. "Book a free session" on the card and each service's link land here.
 */
export function Contact() {
  return (
    <section id="contact" className="screen contact-band ink ink-band pt-16">
      <div className="mx-auto my-auto w-full max-w-6xl px-6">
        <Faq />

        <div className="reveal mt-10 grid gap-5 lg:mt-[clamp(1rem,4svh,2.75rem)] lg:grid-cols-[1fr_2.4fr] lg:gap-10">
          <div>
            <h3 className="font-sans text-2xl font-semibold tracking-tight lg:text-[clamp(1.25rem,3.4svh,1.5rem)]">
              Send me the bottleneck.
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Where is work slowing down, and which tools are involved? Two or
              three lines are enough to begin.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      <Footer />
    </section>
  );
}
