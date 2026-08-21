import { Github, Linkedin, Facebook, Mail } from "./Icons";
import { site } from "@/lib/site";

const socials = [
  { icon: Github, href: site.socials.github, label: "GitHub" },
  { icon: Linkedin, href: site.socials.linkedin, label: "LinkedIn" },
  { icon: Facebook, href: site.socials.facebook, label: "Facebook" },
  { icon: Mail, href: `mailto:${site.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-serif text-lg">{site.name}</p>
          <p className="text-sm text-muted">{site.role}</p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            );
          })}
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-muted sm:text-left">
        © {new Date().getFullYear()} {site.name}. Built with Next.js &
        TypeScript.
      </p>
    </footer>
  );
}
