export type StackItem = {
  name: string;
  /** simple-icons slug — see content/brandmarks.ts. Omit if the brand has no
   *  mark in the set; `img` or `mono` is drawn instead. */
  slug?: string;
  /** Raster logo under public/assets, for brands with no vector anywhere. */
  img?: string;
  /** Paint `img`'s alpha in currentColor — for flat single-colour logos. */
  mask?: boolean;
  mono?: string;
};

export type StackGroup = {
  group: string;
  items: StackItem[];
};

export const techStack: StackGroup[] = [
  {
    group: "Automation & Integration",
    items: [
      { name: "n8n", slug: "n8n" },
      { name: "GoHighLevel", img: "mark-gohighlevel.png" },
      { name: "Asana", slug: "asana" },
      { name: "Zapier", slug: "zapier" },
      { name: "WhatsApp Business", slug: "whatsapp" },
      { name: "Apps Script", slug: "googleappsscript" },
      { name: "Slack", img: "mark-slack.png" },
      { name: "LearnWorlds", img: "mark-learnworlds.png", mask: true },
    ],
  },
  {
    group: "Backend, Frontend & APIs",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", img: "mark-javascript.png" },
      { name: "Python", slug: "python" },
      { name: "Django", slug: "django" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "Deno", slug: "deno" },
      { name: "Prisma", slug: "prisma" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
    ],
  },
  {
    group: "Data & Storage",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Supabase", slug: "supabase" },
      { name: "pandas", slug: "pandas" },
      { name: "SQL", slug: "sql" },
    ],
  },
  {
    group: "Testing, Security & Reliability",
    items: [
      { name: "Playwright", img: "mark-playwright.png" },
      { name: "Vitest", slug: "vitest" },
    ],
  },
  {
    group: "Applied AI",
    items: [
      { name: "Hugging Face", slug: "huggingface" },
      { name: "Gemini API", slug: "googlegemini" },
      { name: "Claude", slug: "claude" },
      { name: "Groq", img: "mark-groq.png", mask: true },
    ],
  },
  {
    group: "Infrastructure & Tools",
    items: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Docker", slug: "docker" },
      { name: "Linux", img: "mark-linux.png" },
      { name: "NGINX", slug: "nginx" },
      { name: "Cloudflare", slug: "cloudflare" },
      { name: "Google Cloud", slug: "googlecloud" },
      { name: "OVHcloud", slug: "ovh" },
      { name: "Hostinger", slug: "hostinger" },
      { name: "Railway", slug: "railway" },
      { name: "Shopify", slug: "shopify" },
      { name: "Jitsi", slug: "jitsi" },
    ],
  },
];
