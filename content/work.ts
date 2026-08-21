export type WorkLink = {
  label: string;
  href: string;
  icon: "github" | "external";
};

/** Tabs in the Work section. Order here is the order they render. */
export const workGroups = [
  "Automation",
  "Web Apps",
  "Backend & Data",
  "Reliability",
  "Research & Systems",
] as const;

export type WorkGroup = (typeof workGroups)[number];

export type WorkItem = {
  title: string;
  org: string;
  /** Which tab the project lives under. */
  group: WorkGroup;
  /** The card's own label — finer-grained than the tab it sits in. */
  category: string;
  problem: string;
  build: string;
  results: string[];
  tech: string[];
  image?: string; // path under /assets
  links?: WorkLink[];
  status: "Active" | "Shipped" | "Completed" | "Research";
  featured?: boolean;
};

// Real case studies, framed problem -> what I built -> result.
export const work: WorkItem[] = [
  {
    title: "Automation & Integration Platform",
    org: "Bai Finance",
    group: "Automation",
    category: "Automation",
    status: "Active",
    featured: true,
    problem:
      "A finance brokerage ran on a brittle Google Apps Script setup — new opportunities didn't become tasks, and updates echoed back and forth as duplicates.",
    build:
      "Architected a scalable, version-controlled automation platform on n8n with dedicated webhook endpoints and REST payload contracts, driving bidirectional GoHighLevel↔Asana sync on the GHL v2 API.",
    results: [
      "Runs across 19 pipelines and roughly 105 workflows for a 64-user brokerage",
      "Mapped 30+ pipeline stages into auto-created tasks",
      "Engineered an authoritative-state check that killed the bidirectional echo loop causing duplicate updates",
      "Added follower-based broker routing that enforces per-broker data confidentiality",
      "Lead a four-person intern team building against it — assigning workflow builds, reviewing deliverables, and owning the documentation standards",
    ],
    tech: ["n8n", "GoHighLevel v2 API", "Asana API", "Webhooks", "REST"],
  },
  {
    title: "Creator Rewards Platform Operations",
    org: "Confidential Client — Ecommerce",
    group: "Reliability",
    category: "Reliability",
    status: "Active",
    featured: true,
    problem:
      "A Malaysian ecommerce brand's affiliate rewards platform — storefront, dashboards, payouts, messaging — had one engineer available to keep it alive, and its failures surfaced as wrong numbers rather than as errors.",
    build:
      "Took sole ownership of production: uptime monitoring, incident response, security review, database maintenance, and feature work across 17 Supabase Edge Functions, two role-gated dashboards, and a self-hosted automation stack.",
    results: [
      "Removed an unauthenticated endpoint that could write directly to the live database, closing a path to forged commission records",
      "Root-caused an analytics endpoint that had silently returned zeros since launch, and rebuilt it to fail closed",
      "Built a daily end-to-end health check spanning the server, automation workflows, and message delivery",
      "Traced a same-day outage of two separate systems to one shared-host failure and restored both",
    ],
    tech: ["Supabase", "PostgreSQL", "React", "TypeScript", "Deno", "n8n"],
  },
  {
    title: "Marketing Site & Admin CMS",
    org: "Bai Finance",
    group: "Web Apps",
    category: "Web App",
    status: "Shipped",
    problem:
      "The brokerage needed a public site its own staff could keep current — services, calculators, blog, team — without a developer in the loop for every edit.",
    build:
      "Built a Next.js marketing site backed by a Supabase admin CMS, with admin routes gated in middleware, request rate limiting, and content-security headers set at the framework level.",
    results: [
      "Staff publish and edit content directly; admin routes stay invisible to anyone without the role",
      "Vitest and Playwright suites hold 90% coverage on the contact and calculator paths",
      "Every CRM write funnels through one sync function, so lead capture can't drift between channels",
    ],
    tech: ["Next.js", "Supabase", "Playwright", "Vitest", "Railway"],
  },
  {
    title: "CRM Migration & Data Pipeline",
    org: "Bai Finance",
    group: "Backend & Data",
    category: "Data",
    status: "Shipped",
    problem:
      "Years of growth left thousands of contacts spread across 20+ spreadsheets and CRM exports — duplicates, malformed emails and phone numbers, and couples sharing a single record.",
    build:
      "Wrote a Python pipeline that consolidates every source into one import-ready master: normalizing contact details, splitting joint applicants into individual records, and applying a namespaced tagging scheme through a single validation step.",
    results: [
      "1,900+ deduplicated contacts consolidated from 20+ source sheets",
      "A tag taxonomy where each tag carries exactly one fact, so adding a segment doesn't mean reworking existing lists",
      "Delivered a phased cleanup roadmap and a company-wide Contact Management SOP",
    ],
    tech: ["Python", "pandas", "GoHighLevel", "Data Modeling"],
  },
  {
    title: "WhatsApp OTP Login",
    org: "Confidential Client — Ecommerce",
    group: "Backend & Data",
    category: "Backend",
    status: "Shipped",
    problem:
      "Creators on the rewards platform live on WhatsApp, not email — but the authentication provider could only issue sessions from its own email or SMS codes.",
    build:
      "Designed a second login channel that delivers a one-time code over WhatsApp, then bridges it into a genuine authenticated session using admin-generated magic-link tokens, leaving the existing email login untouched.",
    results: [
      "Login over the channel creators already use, with email still available as a fallback",
      "Reused the platform's existing WhatsApp provider instead of onboarding a new vendor",
    ],
    tech: ["Supabase Auth", "Deno", "WhatsApp API", "PostgreSQL"],
  },
  {
    title: "QR Lead-Capture Flow",
    org: "Bai Finance",
    group: "Automation",
    category: "Automation",
    status: "Shipped",
    problem:
      "Prospects scanned from business cards had to reach the right broker instantly, with a welcome email that wouldn't land in spam.",
    build:
      "Built an n8n flow that upserts scanned prospects into GHL, assigns the owning broker through a routing guard, and sends a welcome email via a verified sender with per-broker Reply-To.",
    results: [
      "Per-broker Reply-To routing that preserves SPF/DKIM/DMARC alignment",
      "Zero manual triage — every scan is routed and greeted automatically",
    ],
    tech: ["n8n", "GoHighLevel", "Email Deliverability", "DNS"],
  },
  {
    title: "BaiAcademy Learning Platform",
    org: "Bai Finance",
    group: "Web Apps",
    category: "Web App",
    status: "Active",
    problem:
      "The company needed an internal learning platform with role-based access and live sessions — and a QA process to keep it stable.",
    build:
      "Built and QA-owned an internal LMS with a course builder, live sessions, and server-rendered certificates, and designed its GHL-to-LearnWorlds enrollment integration.",
    results: [
      "Access control across seven distinct roles, with a review flow for new accounts",
      "Certificate issuance with a public verification page that needs no login",
      "Triaged a P0–P2 defect backlog to stabilize the platform",
    ],
    tech: ["Next.js", "Django REST", "Supabase", "PostgreSQL"],
  },
  {
    title: "Cebuano Speech-to-Text",
    org: "Capstone Research",
    group: "Research & Systems",
    category: "Machine Learning",
    status: "Research",
    image: "asr.webp",
    problem:
      "Cebuano is a low-resource language with almost no ready speech-recognition tooling to build on.",
    build:
      "Engineered an end-to-end ASR pipeline in Python with Hugging Face Transformers, Wav2Vec2-XLSR, and a custom KenLM language model — training and decoding the models independently.",
    results: [
      "3.07% WER and 1.03% CER on 552 test samples",
      "Reproducible pipeline over 3,622 speaker-disjoint utterances; authored a conference paper",
    ],
    tech: ["Python", "Wav2Vec2-XLSR", "KenLM", "Hugging Face"],
    links: [
      {
        label: "Code",
        href: "https://github.com/KoolDudeGameDev/bisaya-stt-module",
        icon: "github",
      },
    ],
  },
  {
    title: "AI Labeling Loop",
    org: "Speech Data Tooling",
    group: "Backend & Data",
    category: "Backend",
    status: "Completed",
    image: "labelingloop.webp",
    problem:
      "Building the ASR dataset needed one place to upload, transcribe, correct, and export audio — not a pile of scripts.",
    build:
      "Developed a Django CRUD application integrating audio upload, transcription, correction, and export into a single backend workflow, deployed via Cloudflare Tunnel for live user testing.",
    results: [
      "Unified the full labeling workflow into one deployed app",
      "Ran live user testing through a Cloudflare Tunnel deployment",
    ],
    tech: ["Django", "Python", "SQL", "Cloudflare Tunnel"],
    links: [
      {
        label: "Demo",
        href: "https://kooldudegamedev.github.io/qr-display/",
        icon: "external",
      },
      {
        label: "Code",
        href: "https://github.com/KoolDudeGameDev/qr-display",
        icon: "github",
      },
    ],
  },
];
