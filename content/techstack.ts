export type StackItem = {
  name: string;
  /** simple-icons slug — see content/brandmarks.ts. Omit if the brand has no
   *  mark in the set; `mono` is drawn instead. */
  slug?: string;
  mono?: string;
};

export type StackGroup = {
  group: string;
  items: StackItem[];
  /** Practices and APIs that have no logo but still belong to the group. */
  notes?: string[];
};

export const techStack: StackGroup[] = [
  {
    group: "Automation & Integration",
    items: [
      { name: "n8n", slug: "n8n" },
      { name: "GoHighLevel", mono: "GHL" },
      { name: "Asana", slug: "asana" },
      { name: "Zapier", slug: "zapier" },
      { name: "WhatsApp Business", slug: "whatsapp" },
      { name: "Apps Script", slug: "googleappsscript" },
      { name: "LearnWorlds", mono: "LW" },
    ],
    notes: [
      "GHL v2 API",
      "Webhooks",
      "REST payload contracts",
      "Bidirectional sync",
      "Email deliverability (SPF/DKIM/DMARC)",
    ],
  },
  {
    group: "Applied AI",
    items: [
      { name: "Gemini API", slug: "googlegemini" },
      { name: "Hugging Face", slug: "huggingface" },
    ],
    notes: [
      "LLM API integration",
      "Prompt design",
      "AI steps inside n8n workflows",
      "Human-in-the-loop approval",
      "Wav2Vec2-XLSR",
      "KenLM",
      "Speech recognition pipelines",
    ],
  },
  {
    group: "Backend, Frontend & APIs",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
      { name: "Django", slug: "django" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "Deno", slug: "deno" },
      { name: "Prisma", slug: "prisma" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
    ],
    notes: ["REST APIs", "Django REST Framework", "Supabase Edge Functions"],
  },
  {
    group: "Data & Storage",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Supabase", slug: "supabase" },
      { name: "pandas", slug: "pandas" },
      { name: "Python", slug: "python" },
      { name: "SQL", mono: "SQL" },
    ],
    notes: ["Data modeling", "Migrations", "Deduplication pipelines"],
  },
  {
    group: "Testing, Security & Reliability",
    items: [
      { name: "Playwright", mono: "PW" },
      { name: "Vitest", slug: "vitest" },
    ],
    notes: [
      "Row-Level Security",
      "Rate limiting",
      "CSP & security headers",
      "Health checks",
      "Incident response",
      "Uptime monitoring",
    ],
  },
  {
    group: "Infrastructure & Tools",
    items: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Docker", slug: "docker" },
      { name: "Linux", slug: "linux" },
      { name: "NGINX", slug: "nginx" },
      { name: "Cloudflare", slug: "cloudflare" },
      { name: "Google Cloud", slug: "googlecloud" },
      { name: "Railway", slug: "railway" },
      { name: "Shopify", slug: "shopify" },
      { name: "Jitsi", slug: "jitsi" },
    ],
    notes: ["CI/CD", "Cloudflare Tunnel", "Version-controlled deploys"],
  },
];

/**
 * The client-facing subset shown in the hero marquee — the names a business
 * owner is likely to recognise, not the full engineering stack.
 */
export const featuredTools: StackItem[] = [
  { name: "n8n", slug: "n8n" },
  { name: "GoHighLevel", mono: "GHL" },
  { name: "Supabase", slug: "supabase" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Python", slug: "python" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Asana", slug: "asana" },
  { name: "Zapier", slug: "zapier" },
  { name: "Shopify", slug: "shopify" },
  { name: "WhatsApp", slug: "whatsapp" },
  { name: "Docker", slug: "docker" },
  { name: "Cloudflare", slug: "cloudflare" },
];
