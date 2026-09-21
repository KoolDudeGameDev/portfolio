import { Mail, Linkedin, MapPin, Github } from "./Icons";
import { ContactForm } from "./ContactForm";
import { site, mailtoHref } from "@/lib/site";

const channels = [
  {
    icon: Mail,
    label: site.email,
    sub: "Best for project inquiries",
    href: mailtoHref,
  },
  {
    icon: Linkedin,
    label: "Kyle Gregory Ibo",
    sub: "Connect on LinkedIn",
    href: site.socials.linkedin,
  },
  {
    icon: Github,
    label: "KoolDudeGameDev",
    sub: "See the code",
    href: site.socials.github,
  },
  {
    icon: MapPin,
    label: site.location,
    sub: "Remote — working across AU and PH timezones",
    href: site.socials.maps,
  },
];

export function Contact() {
  return (
    <section id="contact" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-border bg-card px-6 py-14 text-center md:px-16 md:py-20">
          <div className="mb-6 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
            <span className="font-mono">07</span>
            <span className="h-px w-8 bg-border" />
            <span>Contact</span>
          </div>

          <h2 className="mx-auto max-w-3xl font-sans text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
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

          <div className="mt-9">
            <ContactForm />
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border text-left sm:grid-cols-2">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.sub}
                  href={channel.href}
                  target={channel.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="flex items-center gap-4 bg-card p-5 transition-colors hover:bg-surface"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">
                      {channel.label}
                    </span>
                    <span className="block text-sm text-muted">
                      {channel.sub}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
