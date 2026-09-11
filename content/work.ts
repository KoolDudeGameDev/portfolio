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
        src: "ghl-automation-overview.webp",
        caption:
          "The location's automation overview: 191 workflows, 41 of them published, and 14.1K enrollments to date.",
      },
      {
        src: "workflow-stage-sync.webp",
        caption:
          "The n8n side, in both directions. Each side reads where the record already is before writing; if it's already at that stage the run stops, and that check is what ended the echo loop.",
      },
      {
        src: "workflow-broker-routing.webp",
        caption:
          "Broker assignment: a new client is routed to the owning broker by originating BDA, and only a newly assigned broker is added as a follower and emailed.",
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
          "The commission engine. Every claim is routed by type and checked against the table that owns that bonus — a claim nobody can vouch for is rejected rather than paid.",
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
    image: "n8n-leave-intake.webp",
    shots: [
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
      {
        src: "leave-intake-form.webp",
        caption:
          "The intake page, served by n8n itself so the page and its API share an origin.",
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
    shots: [
      {
        src: "baifinance-site.webp",
        caption:
          "The public site. The exchange rate in the hero is live, not a figure someone remembers to update.",
      },
      {
        src: "baifinance-calculator.webp",
        caption:
          "One of the calculators: borrowing power, assessed with the buffer lenders actually apply rather than the headline rate.",
      },
      {
        src: "baifinance-contact.webp",
        caption:
          "The inquiry form. Every submission lands in the CRM through the same sync function the live chat uses, so neither channel drifts.",
      },
    ],
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
    image: "crm-pipeline.webp",
    shots: [
      {
        src: "crm-pipeline.webp",
        caption:
          "One pass from twenty-odd sources to one import-ready master. A single validation step decides what gets in; anything that fails a rule goes back to be fixed where it came from.",
      },
    ],
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
    image: "whatsapp-otp-login.webp",
    shots: [
      {
        src: "whatsapp-otp-login.webp",
        caption:
          "The code travels over WhatsApp, but the session is a genuine one: once the code checks out, an admin-minted magic-link token is exchanged for it.",
      },
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
    shots: [
      {
        src: "workflow-qr-capture.webp",
        caption:
          "A scan becomes a routed contact and a welcome email that lands: sent from the verified domain, with the owning broker as Reply-To.",
      },
    ],
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
    title: "Idempotent Webhook Intake",
    org: "Open source n8n workflow",
    image: "ref-idempotent-intake.webp",
    shots: [
      {
        src: "ref-idempotent-intake.webp",
        caption:
          "Three deliberate replies — unusable, already have it, created — so the caller can act on each one instead of guessing.",
      },
    ],
    group: "Backend & Data",
    category: "Open Source",
    status: "Shipped",
    problem:
      "Senders retry, and networks drop the response after the write has already happened. Any endpoint that creates something will eventually be called twice with the same payload — and quietly create two records.",
    build:
      "An importable n8n workflow that keys every request on a hash of the caller's own fields, checks that key before writing, and answers in a way the caller can act on. The reasoning sits in sticky notes beside the nodes it explains.",
    results: [
      "The key is a SHA-256 of the caller's identifying fields — never a timestamp or a random value, because a retry has to produce the same key",
      "A unique index on the key backs up the lookup, so a race that slips past the check still can't create a second row",
      "Answers 400 when retrying won't help, 200 when the record already exists, and 201 when something was created",
      "No client data and no credentials — every secret is an environment reference",
    ],
    tech: ["n8n", "Webhooks", "SHA-256", "Supabase"],
    links: [
      {
        label: "Workflow JSON",
        href: "https://github.com/KoolDudeGameDev/portfolio/blob/main/n8n-workflows/idempotent-webhook-intake.json",
        icon: "github",
      },
    ],
  },
  {
    title: "Endpoint Health Check",
    org: "Open source n8n workflow",
    image: "ref-health-check.webp",
    shots: [
      {
        src: "ref-health-check.webp",
        caption:
          "Every target is probed before anything is reported, so one dead endpoint can't hide the others behind it.",
      },
    ],
    group: "Infrastructure & Reliability",
    category: "Open Source",
    status: "Shipped",
    problem:
      "Most teams find out a service is down because a customer tells them. Monitoring that does exist tends to fire one alert per failure, which turns a real outage into an inbox nobody reads.",
    build:
      "A scheduled n8n workflow that probes a list of endpoints and sends a single digest only when something is actually down. Silence is the success case.",
    results: [
      "Every probe runs with errors captured as data, so one outage can't abort the run and mask the rest",
      "Failures are collected before anything is sent — one digest for ten dead endpoints, not ten alerts",
      "Nothing is sent when everything is up, so the channel stays worth reading",
      "Flap suppression is deliberately left out and documented as the next step, rather than half-built",
    ],
    tech: ["n8n", "Scheduling", "HTTP", "Uptime Monitoring"],
    links: [
      {
        label: "Workflow JSON",
        href: "https://github.com/KoolDudeGameDev/portfolio/blob/main/n8n-workflows/endpoint-health-check.json",
        icon: "github",
      },
    ],
  },
  {
    title: "Workflow Backup to Git",
    org: "Open source n8n workflow",
    image: "ref-workflow-backup.webp",
    shots: [
      {
        src: "ref-workflow-backup.webp",
        caption:
          "A nightly export of every workflow to a git repository — the backup that has to live somewhere other than the machine it protects.",
      },
    ],
    group: "Infrastructure & Reliability",
    category: "Open Source",
    status: "Shipped",
    problem:
      "An automation platform is usually the only copy of its own automations. When a hosted n8n plan ended and took its database with it, the workflows survived only because their JSON was already committed somewhere else.",
    build:
      "A nightly n8n workflow that exports every workflow through the n8n API and commits each one to a repository, so the running instance is reproducible rather than irreplaceable.",
    results: [
      "Files are named by workflow id, not name, so a rename produces a diff instead of an orphan plus a new file",
      "Fields that change on their own — active state, version id, timestamps — are stripped, so a nightly run only commits when something really changed",
      "Reads the current file SHA before writing, so an update never collides with the commit before it",
      "Built from the recovery that actually happened, not a hypothetical one",
    ],
    tech: ["n8n", "GitHub API", "REST APIs", "Backups"],
    links: [
      {
        label: "Workflow JSON",
        href: "https://github.com/KoolDudeGameDev/portfolio/blob/main/n8n-workflows/workflow-backup-to-git.json",
        icon: "github",
      },
    ],
  },
  {
    title: "RAG Gmail Reply Assistant",
    org: "Open source n8n workflow",
    image: "n8n-rag-gmail.webp",
    shots: [
      {
        src: "n8n-rag-gmail.webp",
        caption:
          "Triage first, retrieval second, and no send step anywhere. The best this workflow can do is leave a draft for a person to send.",
      },
    ],
    group: "Automation",
    category: "Open Source",
    status: "Shipped",
    problem:
      "Most inbound email is the same handful of questions, answered by hand from documents the business already has. A model answering from general knowledge will invent whatever those documents would have told it.",
    build:
      "An n8n workflow that triages each new email, lets an AI agent look the answer up in a Qdrant knowledge base built from the company's own documents, and saves the reply as a Gmail draft. A second lane loads documents into that knowledge base.",
    results: [
      "There is no send step, so the model can only ever produce a draft that a person reads and sends",
      "Triage runs before retrieval, so complaints and account-specific mail go straight to a person and never reach the agent",
      "When the knowledge base has nothing, the agent answers ESCALATE and the email is labelled for a human instead of guessed at",
      "The document lane and the question lane share one embedding model, because mixing two makes retrieval return confident nonsense",
    ],
    tech: ["n8n", "RAG", "Qdrant", "Gemini", "Gmail"],
    links: [
      {
        label: "Workflow JSON",
        href: "https://github.com/KoolDudeGameDev/portfolio/blob/main/n8n-workflows/rag-gmail-reply-assistant.json",
        icon: "github",
      },
    ],
  },
  {
    title: "Invoice Intake & Approval Queue",
    org: "Open source n8n workflow",
    image: "n8n-invoice-queue.webp",
    shots: [
      {
        src: "n8n-invoice-queue.webp",
        caption:
          "Two lanes: intake keeps queueing while approval takes the oldest invoice, one at a time.",
      },
    ],
    group: "Automation",
    category: "Open Source",
    status: "Shipped",
    problem:
      "Invoices arrive by email faster than anyone approves them. Approving straight from the inbox means a duplicate can be paid twice, nothing records what was decided, and a request nobody answered simply disappears.",
    build:
      "Two lanes in one n8n workflow. Intake reads each invoice PDF, extracts its fields with a model and queues it. Approval hands the oldest queued invoice to an approver, one at a time, and records the outcome in a masterfile.",
    results: [
      "Intake never waits on approval, so invoices keep queueing while one is in review",
      "Only one invoice is ever in review: the approval lane does nothing while any row is IN_REVIEW, and that single check is the whole queue lock",
      "A SHA-256 of vendor, invoice number and amount means the same PDF forwarded twice is recognised rather than queued again",
      "No answer within two days releases the invoice back to the queue, so a missed email never silently rejects it",
    ],
    tech: ["n8n", "Gemini", "Google Sheets", "Gmail", "SHA-256"],
    links: [
      {
        label: "Workflow JSON",
        href: "https://github.com/KoolDudeGameDev/portfolio/blob/main/n8n-workflows/invoice-intake-approval.json",
        icon: "github",
      },
    ],
  },
  {
    title: "Company Enrichment",
    org: "Open source n8n workflow",
    image: "n8n-company-enrichment.webp",
    shots: [
      {
        src: "n8n-company-enrichment.webp",
        caption:
          "Each company is fetched, profiled and written back on its own, so a dead website only fails its own row.",
      },
    ],
    group: "Automation",
    category: "Open Source",
    status: "Shipped",
    problem:
      "Researching a list of companies by hand (what they sell, to whom, B2B or B2C) is slow. Scripts that automate it tend to die on the first dead website and take the rest of the batch down with them.",
    build:
      "An n8n workflow that reads companies from a sheet, fetches each homepage, has a model profile the company from its own text against a fixed schema, and writes the profile back to the sheet.",
    results: [
      "A dead site fails its own row, not the batch. The fetch never throws, so the row is marked failed with its status code and the loop moves on",
      "The model may answer unknown and reports its confidence, because a visible blank beats a guess someone later mistakes for research",
      "Structured output means every row comes back in the same shape, ready to filter",
      "Requests are paced so a long list doesn't hammer anyone's site",
    ],
    tech: ["n8n", "Gemini", "Google Sheets", "HTTP", "Structured Output"],
    links: [
      {
        label: "Workflow JSON",
        href: "https://github.com/KoolDudeGameDev/portfolio/blob/main/n8n-workflows/company-enrichment.json",
        icon: "github",
      },
    ],
  },
  {
    title: "BaiAcademy Learning Platform",
    org: "Bai Finance",
    image: "baiacademy-lms.webp",
    shots: [
      {
        src: "baiacademy-lms.webp",
        caption:
          "The instructor dashboard. The sidebar is built from the signed-in role, so a student never renders these routes at all.",
      },
      {
        src: "baiacademy-courses.webp",
        caption:
          "Course management: publish state, enrolment and lesson progress per course, with subjects an instructor can claim.",
      },
    ],
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
