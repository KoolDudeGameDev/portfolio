"use client";

import { ArrowRight } from "./Icons";

/**
 * The card used to say "Learn more" and then drop you at the contact form,
 * which is a promise the link never kept. It now says what it actually does —
 * and seeds the message box with the service you clicked, so the enquiry
 * arrives already saying which one it's about and the visitor doesn't face an
 * empty textarea.
 */
export function ServiceCta({ service }: { service: string }) {
  return (
    <a
      href="#contact"
      onClick={() => {
        // Runs after the hash jump rather than before it.
        requestAnimationFrame(() => {
          const box = document.getElementById("cf-message");
          if (!(box instanceof HTMLTextAreaElement)) return;

          // Three cases, and the middle one is why the last prefill is
          // remembered on the element: an empty box gets seeded; a box still
          // holding an untouched prefill gets replaced, so clicking a second
          // service actually changes the text; and anything the visitor has
          // typed themselves is left alone. Checking "is it empty" alone
          // stranded the first service they clicked.
          const untouched = box.value === box.dataset.prefill;
          if (box.value.trim() && !untouched) return;

          // Not lowercased — the titles carry acronyms ("CRM & Data
          // Architecture"), and "crm" reads like a typo.
          const text = `I'd like to talk about ${service}.\n\n`;
          box.value = text;
          box.dataset.prefill = text;
        });
      }}
      className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium transition-opacity after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
    >
      Discuss this
      <span className="sr-only"> — {service}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}
