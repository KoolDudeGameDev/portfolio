/** One visual in a case study. The card shows `image`; the modal shows these. */
export type WorkShot = {
  /** Filename under public/assets. */
  src: string;
  /** What the reader is looking at. Shown under the image in the modal. */
  caption: string;
};

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
  "Infrastructure & Reliability",
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
  image?: string; // path under /assets — the card thumbnail
  /** Extra visuals for the modal. Falls back to `image` when omitted. */
  shots?: WorkShot[];
  links?: WorkLink[];
  status: "Active" | "Shipped" | "Completed" | "Research";
  featured?: boolean;
};

// Real case studies, framed problem -> what I built -> result.
export const work: WorkItem[] = [
  {
    title: "Automation & Integration Platform",
    org: "Bai Finance",
    image: "ghl-stage-fanout.webp",
    shots: [
      {
        src: "ghl-stage-fanout.webp",
        caption:
          "The GoHighLevel side of one lending pipeline: an opportunity moving stage fans out to a branch per stage, each writing the matching opportunity on the master pipeline.",
      },
      {
        src: "workflow-stage-sync.webp",
        caption:
          "The n8n side of the same sync. The coloured lanes are the workflow's own regions: trigger, mapping logic, then the success and error paths.",
      },
      {
        src: "workflow-broker-routing.webp",
        caption:
          "Broker assignment: a new client is routed to the owning broker by originating BDA, added as a follower, and notified by email.",
      },
      {
        src: "ghl-workflow-list.webp",
        caption:
          "The master-pipeline sync folder: one workflow per lending pipeline, each feeding the same master board.",
      },
      {
        src: "ghl-workflow-scale.webp",
        caption:
          "One nurture workflow zoomed out. The location carries roughly 105 of these across 19 pipelines.",
      },
      {
        src: "ghl-qualification-chatbot.webp",
        caption:
          "A lead-qualification chatbot branch: no answer, timed out, and showing interest each take a different route.",
      },
      {
        src: "ghl-reply-routing.webp",
        caption:
          "Reply routing — a positive reply books the lead, a negative one moves it to cold, and silence ends the sequence.",
      },
    ],
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
      "Led a six-person engineering team building against it — assigning workflow builds, reviewing deliverables, and owning the documentation standards",
    ],
    tech: ["n8n", "GoHighLevel v2 API", "Asana API", "Webhooks", "REST"],
  },
  {
    title: "Creator Rewards Platform Operations",
    org: "Confidential Client — Ecommerce",
    image: "workflow-commission-engine.webp",
    shots: [
      {
        src: "workflow-commission-engine.webp",
        caption:
          "The commission engine. Six commission types fan out from one switch, and each is checked against its own source-of-truth table before a payout row is written.",
      },
      {
        src: "workflow-sales-attribution.webp",
        caption:
          "Sales attribution: a storefront order is matched to a creator by discount code, then by referral link, before commission and tier progression run.",
      },
      {
        src: "workflow-messaging-engine.webp",
        caption:
          "The messaging engine — thirteen notification types routed to one delivery path, deduplicated by hashed message content so a retry can't send twice.",
      },
    ],
    group: "Infrastructure & Reliability",
    category: "Reliability",
    status: "Active",
    featured: true,
    problem:
      "A Malaysian ecommerce brand's affiliate-management platform — storefront, dashboards, payouts, messaging — had one engineer available to keep it alive, and its failures surfaced as wrong numbers rather than as errors.",
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
    title: "Leave Application Platform",
    org: "Bai Finance",
    image: "leave-intake-form.webp",
    shots: [
      {
        src: "leave-intake-form.webp",
        caption:
          "The intake page, served by n8n itself so the page and its API share an origin.",
      },
      {
        src: "n8n-leave-intake.webp",
        caption:
          "Intake: serve the page, issue and burn a one-time code, open a session, then price the request against the HR app's accrual engine before writing it.",
      },
      {
        src: "n8n-leave-approval.webp",
        caption:
          "Approval. The top path only renders a confirmation page; the bottom path is the only one that records a decision.",
      },
    ],
    group: "Automation",
    category: "Internal Platform",
    status: "Shipped",
    problem:
      "Staff filed leave over chat and email. Not everyone was onboarded into the HR app, approvals left no record, and the balance a person was quoted didn't always match the one the HR app would compute.",
    build:
      "Built a no-login intake page served by n8n itself, backed by an email approval layer that reads and writes the HR app's own database — no second system of record, and no second policy engine.",
    results: [
      "Staff sign in with an employee ID; the one-time code goes to the address already on their record, so nobody can direct a code to an address they chose",
      "Balances are computed once, in SQL, against the HR app's existing accrual engine — the two systems can't quote different numbers for the same person",
      "Leave spanning a quarter boundary is charged day by day to the quarter it falls in, and the paid/unpaid split is shown before anyone submits",
      "Approval emails open a confirmation page instead of deciding on click — mail scanners prefetch every link, and a decide-on-GET link would approve itself",
      "Lives in its own Postgres schema with no foreign keys into the HR app's tables, so its migrations can never fail because of this",
    ],
    tech: ["n8n", "Supabase", "PostgreSQL", "SQL", "SMTP"],
  },
  {
    title: "Self-Hosted Automation Platform",
    org: "Bai Finance",
    image: "platform-architecture.webp",
    group: "Infrastructure & Reliability",
    category: "Infrastructure",
    status: "Shipped",
    problem:
      "The automation platform ran on a hosted n8n plan. That plan went away and took its database with it — every workflow the business depended on, gone in one afternoon, with no way to log in and get them back.",
    build:
      "Rebuilt the platform on a VPS the company controls: a Docker Compose stack behind Traefik doing TLS at the edge, with the workflow definitions kept in git so the running instance is reproducible rather than irreplaceable.",
    results: [
      "Restored every workflow from the git-committed JSON exports — the repo was the only surviving copy, which is now the point rather than the accident",
      "Traefik terminates TLS and redirects HTTP at the entrypoint, so no workflow has to know anything about certificates",
      "Postgres holds execution state instead of the container filesystem, so the stack can be rebuilt without losing history",
      "The encryption key is treated as the platform's real secret — lose it and every stored credential becomes permanently unreadable",
      "Traced a TLS failure to a proxy release that had dropped two config keys, and was serving a self-signed certificate rather than erroring",
    ],
    tech: ["Docker Compose", "Traefik", "Linux", "PostgreSQL", "n8n", "DNS"],
  },
  {
    title: "Marketing Site & Admin CMS",
    org: "Bai Finance",
    image: "baifinance-site.webp",
    group: "Web Apps",
    category: "Web App",
    status: "Shipped",
    problem:
      "The brokerage needed a public site its own staff could keep current — services, calculators, blog, team — without a developer in the loop for every edit.",
    build:
      "Built a Next.js marketing site backed by a Supabase admin CMS — services, calculators, blog, team, partners and an inquiry chat — with admin access, rate limiting and security headers all enforced before a request reaches a page.",
    results: [
      "Staff publish and edit content themselves; a request to the admin area without the role gets a 404 rather than a 401, so the route never advertises that it exists",
      "The contact form and calculators hold a 90% coverage floor in CI, across unit tests and browser tests",
      "Every CRM write funnels through one sync function, so a chat lead and a form lead reach GoHighLevel the same way instead of drifting apart",
      "Rate limiting is keyed by caller and path in one place, so a new endpoint can't quietly ship without it",
      "Each release is checked by a read-only security suite run against the deployed site, not just the local build",
    ],
    tech: ["Next.js", "Supabase", "Playwright", "Vitest", "Railway"],
    links: [
      {
        label: "Live site",
        href: "https://www.baifinance.com.au/",
        icon: "external",
      },
    ],
  },
  {
    title: "CRM Migration & Data Pipeline",
    org: "Bai Finance",
    image: "workflow-intake-gatekeeper.webp",
    group: "Backend & Data",
    category: "Data",
    status: "Shipped",
    problem:
      "Years of growth left thousands of contacts spread across 20+ spreadsheets and CRM exports — duplicates, malformed emails and phone numbers, and couples sharing a single record.",
    build:
      "Wrote a Python pipeline that consolidates every source into one import-ready master: normalizing contact details, splitting joint applicants into individual records, and applying a namespaced tagging scheme through a single validation step.",
    results: [
      "Audited 4,000+ contacts across 20+ source sheets and consolidated them into 1,900+ deduplicated records",
      "A tag taxonomy where each tag carries exactly one fact, so adding a segment doesn't mean reworking existing lists",
      "Delivered a phased cleanup roadmap and a company-wide Contact Management SOP",
    ],
    tech: ["Python", "pandas", "GoHighLevel", "Data Modeling"],
  },
  {
    title: "WhatsApp OTP Login",
    org: "Confidential Client — Ecommerce",
    image: "workflow-messaging-engine.webp",
    shots: [
      {
        src: "workflow-messaging-engine.webp",
        caption:
          "The platform's existing WhatsApp delivery layer. The login reuses it to send the code rather than onboarding a second messaging vendor.",
      },
    ],
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
    image: "workflow-qr-capture.webp",
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
    image: "baiacademy-lms.webp",
    group: "Web Apps",
    category: "Web App",
    status: "Active",
    problem:
      "The company needed an internal learning platform with role-based access and live sessions — and a QA process to keep it stable.",
    build:
      "Built and QA-owned an internal LMS — a Django REST backend behind a Next.js front end — with a drag-and-drop course builder, quizzes, a community, Jitsi live sessions and server-rendered certificates, and designed its GoHighLevel enrollment integration.",
    results: [
      "Seven roles, each with its own dashboard; new broker, BDA and student accounts pass through a moderator review queue before they can see anything",
      "Moderator rights are granular rather than all-or-nothing, and every account action is written to an audit log",
      "Certificates are rendered on the server and confirmed at a public verification page that needs no login",
      "Dashboards update over a live socket instead of polling, so a review decision shows up without a refresh",
      "Triaged a P0–P2 defect backlog to stabilise the platform",
    ],
    tech: ["Next.js", "Django", "DRF", "Supabase", "Jitsi", "Railway"],
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
