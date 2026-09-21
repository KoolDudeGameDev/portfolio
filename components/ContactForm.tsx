"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Mail } from "./Icons";
import { site, mailtoHref } from "@/lib/site";

/**
 * The site is a static export, so there is no backend to post to. Web3Forms
 * takes the submission and emails it on; the access key is public by design
 * (it only authorises "send mail to the address this key was issued for"),
 * which is why it can sit in a NEXT_PUBLIC_ var at all.
 *
 * Read at module scope so the missing-key branch below is decided once, at
 * build time, rather than on every render.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted/70 transition-colors focus:border-fg focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const LABEL = "block text-xs uppercase tracking-[0.14em] text-muted";

/** Falls back to the old mailto button when no key is configured. */
function MailtoFallback() {
  return (
    <a
      href={mailtoHref}
      className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
    >
      <Mail className="h-4 w-4" />
      Email me
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // No key configured (a fork, a local checkout, or a build where the secret
  // wasn't passed): show the mailto button rather than a form that would
  // accept a message and quietly drop it. A broken form is worse than no form.
  if (!ACCESS_KEY) return <MailtoFallback />;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setError("");

    const payload = Object.fromEntries(new FormData(form));
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          // Web3Forms' own default sender name is "Notifications", which tells
          // you nothing in a crowded inbox. This does.
          from_name: "Portfolio contact form",
          subject: name
            ? `Portfolio enquiry — ${name}`
            : "Portfolio enquiry",
          // Puts their address in Reply-To, so hitting reply in Gmail goes
          // back to them rather than to Web3Forms.
          replyto: email,
          // The email template can't be restyled on this plan: Web3Forms
          // renders one row per field, labelled with the KEY it was sent
          // under. So the keys below are written as the labels we want to
          // read in the inbox, not as the input `name` attributes.
          Name: name,
          Email: email,
          Message: payload.message,
          // Must keep its exact name — the server checks this one.
          botcheck: payload.botcheck,
        }),
      });

      // The API documents the message in two shapes depending on status, so
      // read both rather than trusting one.
      const data = await response.json().catch(() => null);

      if (response.ok && data?.success !== false) {
        setStatus("sent");
        form.reset();
        return;
      }

      // The API's own message is developer-facing ("Must be a valid UUID"),
      // which is noise to a visitor — it goes to the console for whoever is
      // debugging. Rate limiting is the one case worth saying out loud,
      // because "wait and retry" is advice the visitor can actually act on.
      console.error("Web3Forms rejected the submission:", data);
      setError(
        response.status === 429
          ? "Too many messages from this network just now. Try again in a few minutes, or email me directly."
          : "That didn't go through.",
      );
      setStatus("error");
    } catch {
      // Offline, DNS, or a blocked request — nothing came back at all.
      setError(
        "Couldn't reach the server. Check your connection, or email me directly.",
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        // Focus-free live region: the form is gone, so the confirmation has to
        // announce itself to anyone not watching the screen.
        role="status"
        aria-live="polite"
        className="mx-auto max-w-xl rounded-2xl border border-border bg-bg px-6 py-10 text-center"
      >
        <p className="font-serif text-2xl italic text-accent">Message sent.</p>
        <p className="mt-3 leading-relaxed text-muted">
          Thanks — it's in my inbox. I usually reply within a day, and I'll
          come back with a few questions about scope.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xl space-y-4 text-left"
      noValidate={false}
    >
      {/* Honeypot. A real person never sees it, so anything that ticks it is a
          bot and Web3Forms drops the submission server-side. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        style={{ display: "none" }}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="cf-name" className={LABEL}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={sending}
            placeholder="Your name"
            className={FIELD}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="cf-email" className={LABEL}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={sending}
            placeholder="you@company.com"
            className={FIELD}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="cf-message" className={LABEL}>
          What's slowing you down?
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          disabled={sending}
          placeholder="The process you'd like to automate, the system you need built, or just a question."
          className={`${FIELD} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <Mail className="h-4 w-4" />
          {sending ? "Sending…" : "Send message"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Only renders once site.bookingUrl is set. */}
        {site.bookingUrl ? (
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Book a 15-min call
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        ) : null}

        {/* Kept as an escape hatch: some people would simply rather use their
            own mail client, and it's the recovery path when the POST fails. */}
        <a
          href={mailtoHref}
          className="text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
        >
          or email {site.email} directly
        </a>
      </div>

      {/* Announced rather than just drawn, so a failure isn't silent — which is
          the exact bug the mailto-only version had. */}
      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === "error" ? (
          <span className="text-fg">
            {error}{" "}
            <a
              href={mailtoHref}
              className="font-medium underline underline-offset-4"
            >
              Email me instead
            </a>
            .
          </span>
        ) : null}
      </p>
    </form>
  );
}
