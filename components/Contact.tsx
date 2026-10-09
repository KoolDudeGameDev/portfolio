import { ContactForm } from "./ContactForm";
import { FaqPanel } from "./Faq";

export function Contact() {
  return (
    <section id="contact" className="bg-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
            <span className="font-mono">06</span>
            <span className="h-px w-8 bg-border" />
            <span>Contact</span>
          </div>

          <h2 className="font-sans text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            Have a process worth{" "}
            <span className="font-serif font-normal italic text-accent">
              automating?
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            Tell me what&apos;s slowing your team down. I&apos;ll reply with a few
            questions and, if it&apos;s a fit, a scoped quote. Collaborations
            and technical questions are welcome too.
          </p>

          {/* Mirrors the hero pill, at the point where someone decides to write. */}
          <p className="mt-7 inline-flex items-center gap-2 text-sm font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-live opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
            </span>
            Currently accepting new clients
          </p>
        </div>

        {/* Answers on the left, the form on the right: the questions people
            hesitate over are next to the box they hesitate to fill in. */}
        {/* No `items-start`: the default `stretch` keeps both cards at the row
            height, so opening an answer extends the section bottom and the two
            stay level instead of drifting apart. */}
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
          <FaqPanel />

          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <h3 className="font-sans text-2xl font-semibold tracking-tight">
              Send me the bottleneck.
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              Where does the work pile up, and what are you running it on? Two
              or three lines is enough to start.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
