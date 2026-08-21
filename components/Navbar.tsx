"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ResumeModal } from "./ResumeModal";
import { Menu, Close, FileIcon } from "./Icons";
import { site, mailtoHref } from "@/lib/site";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Tech Stack" },
  { href: "#experience", label: "Experience" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const ids = ["services", "work", "stack", "experience"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-border bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="font-serif text-lg font-semibold tracking-tight"
        >
          {site.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`transition-colors hover:text-fg ${
                    active === link.href.slice(1)
                      ? "text-fg"
                      : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-fg"
            >
              <FileIcon className="h-4 w-4" />
              Résumé
            </button>
            <a
              href={mailtoHref}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              Start a project
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg"
          >
            {open ? (
              <Close className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setResumeOpen(true);
                }}
                className="flex w-full items-center gap-2 py-2 text-left text-muted transition-colors hover:text-fg"
              >
                <FileIcon className="h-4 w-4" />
                Résumé
              </button>
            </li>
            <li className="pt-2">
              <a
                href={mailtoHref}
                onClick={() => setOpen(false)}
                className="inline-flex rounded-full bg-accent px-4 py-2 font-medium text-accent-fg"
              >
                Start a project
              </a>
            </li>
          </ul>
        </div>
      )}

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </header>
  );
}
