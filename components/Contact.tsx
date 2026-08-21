import { Mail, Linkedin, MapPin, Github, ArrowRight } from "./Icons";
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
    sub: "Working with clients remotely",
    href: site.socials.maps,
  },
];

export function Contact() {
  return (
    <section id="contact" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-border bg-card px-6 py-14 text-center md:px-16 md:py-20">
          <div className="mb-6 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
            <span className="font-mono">06</span>
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
            Tell me what&apos;s slowing your team down. I reply quickly and keep
            communication clear and direct — whether it&apos;s a project, a
            collaboration, or a technical question.
          </p>

          <div className="mt-9">
            <a
              href={mailtoHref}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              Email me
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
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
