// Shared site constants and helpers.

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public asset path with the deploy base path. */
export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

/**
 * Origin the site is served from. Social scrapers need absolute URLs, so this
 * plus BASE_PATH is what makes the share card resolve. Override for a custom
 * domain alongside NEXT_PUBLIC_BASE_PATH.
 */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://kooldudegamedev.github.io";

export const site = {
  name: "Kyle Gregory Ibo",
  role: "Automation & Systems Integration Engineer",
  email: "gregoryibo7@gmail.com",
  location: "Cebu, Philippines",
  socials: {
    github: "https://github.com/KoolDudeGameDev",
    linkedin: "https://www.linkedin.com/in/kyle-gregory-ibo-a89455301/",
    facebook: "https://www.facebook.com/profile.php?id=61577563267705",
    // Province-level on purpose. This used to be a pin on exact GPS
    // coordinates at street zoom, which is a home address in all but name.
    maps: "https://www.google.com/maps/place/Cebu,+Philippines",
  },
} as const;

/** Prebuilt mailto with a friendly subject for the primary CTA. */
export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Project inquiry",
)}`;
