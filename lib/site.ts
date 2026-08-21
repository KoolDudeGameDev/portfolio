// Shared site constants and helpers.

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public asset path with the deploy base path. */
export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

export const site = {
  name: "Kyle Gregory Ibo",
  role: "AI Automation & Systems Engineer",
  email: "gregoryibo7@gmail.com",
  location: "Ginatilan, Cebu, Philippines",
  socials: {
    github: "https://github.com/KoolDudeGameDev",
    linkedin: "https://www.linkedin.com/in/kyle-gregory-ibo-a89455301/",
    facebook: "https://www.facebook.com/profile.php?id=61577563267705",
    maps: "https://www.google.com/maps/place/9%C2%B034'09.0%22N+123%C2%B019'04.2%22E/@9.5691561,123.314551,368m/data=!3m1!1e3!4m4!3m3!8m2!3d9.5691667!4d123.3178333",
  },
} as const;

/** Prebuilt mailto with a friendly subject for the primary CTA. */
export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Project inquiry",
)}`;
