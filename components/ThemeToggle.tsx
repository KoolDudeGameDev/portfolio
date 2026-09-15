"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "./Icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid a hydration mismatch: render a stable placeholder until mounted.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  // One GPU-composited crossfade of the whole page, instead of transitioning
  // background-color on every element at once — that repaints on the CPU and
  // drops frames on a phone. `disableTransitionOnChange` stays on the provider
  // so nothing else animates. Browsers without View Transitions (Firefox) and
  // anyone asking for reduced motion get the instant swap, same as before.
  const toggle = () => {
    const next = isDark ? "light" : "dark";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof document.startViewTransition !== "function") {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => setTheme(next));
  };

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg/80 transition-colors hover:border-accent hover:text-accent"
    >
      {mounted && isDark ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
