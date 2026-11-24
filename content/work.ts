import { asset } from "@/lib/site";

/** One visual in a case study. The card shows `image`; the case-study page shows these. */
export type WorkShot = {
  /** Filename under public/assets. */
  src: string;
  /** What the reader is looking at. Shown under the image on the case-study page. */
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
  /**
   * Why this matters to the business. Say what the system enables, and never
   * state a benefit as a measured result unless it was measured.
   */
  value: string;
  results: string[];
  tech: string[];
  image?: string; // path under /assets — the card thumbnail
  /** The case-study page gallery. Falls back to `image` when omitted. */
  shots?: WorkShot[];
  links?: WorkLink[];
  status: "Active" | "Shipped" | "Completed" | "Research";
  featured?: boolean;
  /**
   * The case study's address: /work/<slug>/. Written out rather than derived from
   * the title, so renaming a project never breaks a link someone already shared.
   */
  slug: string;
};

/** Link to a case study page, base path included. */
export const workHref = (slug: string) => asset(`/work/${slug}/`);

// Real case studies, framed business problem -> what I built -> why it matters ->
// results. See "Writing standards" in CLAUDE.md.
export const work: WorkItem[] = [
  {
    title: "Jim's Franchise Loan",
    slug: "jims-franchise-loan",
    org: "Bai Finance — technical lead",
    // Every name and personal detail in these captures is fictional. See
    // "Case-study imagery" in CLAUDE.md before re-shooting any of them.
    image: "showcase/jims-dashboard.webp",
    shots: [
      {
        src: "showcase/jims-dashboard.webp",
        caption:
          "The dashboard: the pipeline by stage, and who needs attention today. All names and personal details here are fictional.",
      },
      {
        src: "showcase/jims-drawer.webp",
        caption:
          "An applicant opens beside the list, with their history, follow-ups and comments in one place.",
      },
      {
        src: "showcase/jims-board.webp",
        caption: "The same applicants as a board, one column per loan stage.",
      },
      {
        src: "showcase/jims-calculator.webp",
        caption:
          "The servicing calculator. Figures from the application form come in on their own, and the result updates as staff type.",
      },
      {
        src: "showcase/jims-permissions.webp",
        caption:
          "Permissions per account, enforced in the database rather than only hidden in the screen.",
      },
      {
        src: "showcase/jims-stages.webp",
        caption:
          "Stages matched to the CRM pipeline by id, so renaming one in the app never breaks the link.",
      },
    ],
    group: "Web Apps",
    category: "Custom CRM",
    status: "Active",
    featured: true,
    problem:
      "Bai Finance tracked loan applications from Jim's franchisees in a Google Sheet. A spreadsheet could not control who saw what, keep a reliable history, or give Jim's sales managers a shared view of each applicant's progress.",
    build:
      "Led the team from requirements analysis and system design through release, delivering a custom CRM-style loan tracker in Next.js and Supabase that replaced the spreadsheet. Applications arrive automatically from the intake form, move through 10 stages matched to the GoHighLevel pipeline, and are assessed by a built-in servicing calculator. Staff and sales managers now work from one record.",
    value:
      "Replacing a shared spreadsheet gives the business controlled access to sensitive financial data, a dependable history of every decision, and one view of each application, which reduces follow-up work and the risk of errors.",
    results: [
      "Servicing is assessed at intake, and applications with a credit score below 500 are declined automatically, with the decision recorded in the applicant's history",
      "Access is enforced in the database with row-level security: sales managers see their own applicants, and each account has its own permissions",
      "Every stage change, score edit and comment is recorded in the applicant's history, and follow-ups and mentions reach people by email",
      "Stages are matched to GoHighLevel by ID, so renaming one in the app never breaks the sync",
      "Sign-in uses an emailed code, with a 2-minute resend wait and a 10-minute expiry enforced on the server",
      "Covered by 624 automated tests, with the servicing calculator checked against saved reference results",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "n8n", "GoHighLevel API"],
  },
  {
    title: "Company Radar",
    slug: "company-radar",
    org: "Bai Philippines — technical lead",
    image: "showcase/radar-dashboard.webp",
    shots: [
      {
        src: "showcase/radar-dashboard.webp",
        caption:
          "The dashboard: this week's prospects, the pipeline, and who to call next. All company names and contacts here are fictional.",
      },
      {
        src: "showcase/radar-prospects.webp",
        caption: "The prospect list, one row per company, with its open roles and sources.",
      },
      {
        src: "showcase/radar-drawer.webp",
        caption:
          "A company's record: its score, contact, postings, and why it counts as a prospect.",
      },
      {
        src: "showcase/radar-dnc.webp",
        caption:
          "Companies the AI suspects are agencies wait here for an admin to decide. The AI never removes a company on its own.",
      },
      {
        src: "showcase/radar-manage.webp",
        caption:
          "Runs, search quota and AI spend, all on one screen, so a cost surprise cannot build up quietly.",
      },
    ],
    group: "Web Apps",
    category: "Custom CRM + AI",
    status: "Active",
    featured: true,
    problem:
      "Bai Philippines sells outsourcing to Australian companies, and its best prospects are the ones already advertising roles in the Philippines. Finding them meant searching job boards by hand and guessing which companies were genuinely Australian.",
    build:
      "Led the team that designed and built a custom sales CRM with AI prospecting: a weekly pipeline collects job ads, checks each company for Australian signals, then classifies and scores it, and the sales team manages prospects through nine stages in the dashboard.",
    value:
      "The sales team starts each week with a scored list of prospects instead of searching job boards by hand, which focuses its time on the companies most likely to need outsourcing.",
    results: [
      "Runs automatically every Monday, and the team can start a run from the app at any time",
      "Testing showed most job-board results were recruitment agencies rather than employers, so suspected agencies go to a review queue and an administrator makes the final decision",
      "A competitor list and a Do Not Contact archive keep those companies out of every future run",
      "Search quota and AI spending are visible on one screen, and each has a cap",
      "Each company keeps its stage, next follow-up date, notes and files, and the list exports to CSV",
      "Backed by more than 600 automated tests, including real browser flows",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "Supabase", "Groq", "Claude API", "n8n", "Docker"],
  },
  {
    title: "Automation & Integration Platform",
    slug: "automation-integration-platform",
    org: "Bai Finance",
    // The authored diagram leads, not the raw GoHighLevel canvas. At card size
    // a screenshot of a 30-node canvas is grey texture; this one still reads
    // the argument — two directions, one state check, echo dead — at 380px.
    // The real canvases follow it as evidence that it actually exists.
    image: "workflow-stage-sync.webp",
    shots: [
      {
        src: "workflow-stage-sync.webp",
        caption:
          "The sync, in both directions. Each side reads where the record already is before it writes, and if it is already at that stage the run stops. That check is what ended the echo loop.",
      },
      {
        src: "workflow-broker-routing.webp",
        caption:
          "Broker assignment: a new client is routed to the owning broker by originating BDA, and only a newly assigned broker is added as a follower and emailed.",
      },
      {
        src: "ghl-stage-fanout.webp",
        caption:
          "The same sync on the GoHighLevel side of one lending pipeline: an opportunity moving stage fans out to a branch per stage, each writing the matching opportunity on the master pipeline.",
      },
      {
        src: "ghl-automation-overview.webp",
        caption:
          "The location's automation overview: 191 workflows, 41 of them published, and 14.1K enrollments to date.",
      },
      {
        src: "ghl-workflow-list.webp",
        caption:
          "The master-pipeline sync folder: one workflow per lending pipeline, each feeding the same master board.",
      },
      {
        src: "ghl-workflow-scale.webp",
        caption:
          "One nurture workflow zoomed out, one of the 191 in the location.",
      },
      {
        src: "ghl-qualification-chatbot.webp",
        caption:
          "A lead-qualification chatbot branch: no answer, timed out, and showing interest each take a different route.",
      },
      {
        src: "ghl-reply-routing.webp",
        caption:
          "Reply routing: a positive reply books the lead, a negative one moves it to cold, and silence ends the sequence.",
      },
    ],
    group: "Automation",
    category: "Automation",
    status: "Active",
    featured: true,
    problem:
      "An Australian finance brokerage relied on a fragile Google Apps Script setup. New opportunities did not become tasks, and updates bounced between systems as duplicates.",
    build:
      "Designed a scalable, version-controlled automation platform on n8n that keeps GoHighLevel and Asana in sync in both directions, using dedicated webhook endpoints and documented data contracts.",
    value:
      "Brokers and support staff work from accurate records in both systems without entering data twice, so opportunities are less likely to stall and client information stays with the right broker.",
    results: [
      "Runs across 19 pipelines for a 64-user brokerage, with 191 workflows, 41 of them published, and 14.1K enrollments to date",
      "Converts more than 30 pipeline stages into tasks automatically",
      "Eliminated the echo loop behind the duplicate updates by checking each record's current state before writing to it",
      "Introduced follower-based broker routing that keeps each broker's client data confidential",
      "Led a six-person engineering team building on the platform, assigning builds, reviewing deliverables and setting the documentation standards",
    ],
    tech: ["n8n", "GoHighLevel v2 API", "Asana API", "Webhooks", "REST"],
  },
  {
    title: "Affiliate Commission & Payout System",
    slug: "affiliate-payout-system",
    org: "Confidential Client — Ecommerce",
    // Kept deliberately general (Kyle, 2026-11-24) so the client is hard to
    // identify: no counts, no client-specific findings, and none of the
    // client's own pre-existing workflows. Claims stay within what he built.
    image: "payout-system.webp",
    shots: [
      {
        src: "payout-system.webp",
        caption:
          "How a payout is earned and settled: an order earns commission, becomes payable once the refund window has passed, and is paid through a ledger that settles the oldest earnings first.",
      },
      {
        src: "health-check.webp",
        caption:
          "The daily health check: a real sign-up and login run against the live system, every server function and workflow is checked, and one morning report says what passed.",
      },
    ],
    group: "Web Apps",
    category: "Full-Stack",
    status: "Shipped",
    featured: true,
    problem:
      "An ecommerce business pays its affiliates a commission on sales. Its finance team could not see what each order earned, what had been paid or what was still owed, and a previous team had left the system half-built.",
    build:
      "Took over the system as its only engineer and cleaned up the codebase before building on it. Then built the commission and payout features: tracking per order, refund handling, a payout ledger and encrypted bank details. Alongside that, maintain its automation workflows and database, and handle issues, fixes and security improvements.",
    value:
      "Finance can see what every order earned and what each affiliate is owed, with bank details protected and a record behind every payout.",
    results: [
      "Audited the inherited codebase and removed dead code and unused endpoints before building on it",
      "Commission is tracked per order, refunds are held back until their window closes, and payouts settle the oldest earnings first",
      "Bank details are encrypted, and every time one is revealed the event is logged",
      "Closed a security gap that exposed the live database and fixed a permissions flaw",
      "A daily end-to-end health check reports on the live system every morning",
      "Handed over with documentation, runbooks and scripts for the next team",
    ],
    tech: ["Supabase", "PostgreSQL", "TypeScript", "JavaScript", "n8n", "REST APIs"],
  },
  {
    title: "Leave Application Platform",
    slug: "leave-application-platform",
    org: "Bai Finance — sole developer",
    image: "showcase/leave-form.webp",
    shots: [
      {
        src: "showcase/leave-form.webp",
        caption:
          "The request form, served by n8n itself. Staff see their leave credits before they ask. The person shown is sample data.",
      },
      {
        src: "showcase/leave-request-phone.webp",
        caption:
          "On a phone, where most requests are filed: leave type, dates, and a live count of the days.",
      },
      {
        src: "n8n-leave-intake.webp",
        caption:
          "Intake: serve the page, issue and burn a one-time code, open a session, then work out the balance before writing the request.",
      },
      {
        src: "n8n-leave-approval.webp",
        caption:
          "Approval. The top path only renders a confirmation page; the bottom path is the only one that records a decision.",
      },
    ],
    group: "Automation",
    category: "Internal Platform",
    status: "Active",
    featured: true,
    problem:
      "Contractors requested leave over chat and email. Approvals left no record, and the balance a person was quoted depended on who they asked.",
    build:
      "As the sole developer, analyzed the leave rules with HR and built a request form served directly from n8n, with an emailed sign-in code, a live view of each person's leave credits, and an email approval step for their supervisor. HR continues to work from the sheet it already maintains.",
    value:
      "Staff see their balance before they ask, supervisors approve from their inbox, and HR gains a complete record without a new system to maintain.",
    results: [
      "Staff sign in with their email, and one-time codes are stored hashed, limited by attempts and invalidated after use",
      "The form shows credits by period, carry-over and half days before anyone submits, so people know the answer before they ask",
      "Approval emails open a confirmation page instead of deciding on click, because mail scanners follow every link and would otherwise approve requests on their own",
      "HR data stays on the contractor sheet HR already runs, so there is no second system to keep in step",
    ],
    tech: ["n8n", "PostgreSQL", "Google Sheets API", "SMTP"],
  },
  {
    title: "Document Hub",
    slug: "document-hub",
    org: "Bai Philippines — lead developer",
    // Captured 2026-11-23 from a local copy running the demo seed: every client,
    // person and file is fictional. See product-videos/README.md.
    image: "showcase/doc-hub-portal.webp",
    shots: [
      {
        src: "showcase/doc-hub-overview.webp",
        caption:
          "The admin overview: clients, pending invitations and recent activity. Every name here is fictional.",
      },
      {
        src: "showcase/doc-hub-clients.webp",
        caption:
          "One card per client, with its OneDrive link, standard folders and portal users.",
      },
      {
        src: "showcase/doc-hub-client-admin.webp",
        caption:
          "A client's portal content, read live from their OneDrive folder. The internal folder at the bottom is hidden from the client.",
      },
      {
        src: "showcase/doc-hub-portal.webp",
        caption: "The client's own portal: only their folders, and what is new for them.",
      },
      {
        src: "showcase/doc-hub-upload.webp",
        caption: "A client uploads into a folder. The file goes straight to Microsoft, up to 100 MB.",
      },
      {
        src: "showcase/doc-hub-activity.webp",
        caption: "The activity log records every sign-in, upload and download, and every change made in the hub.",
      },
    ],
    group: "Web Apps",
    category: "Client Portal",
    status: "Active",
    problem:
      "Bai Philippines shares agreements, invoices, résumés and reports with each client from one company OneDrive. Its first client portal was a front-end prototype: nothing was stored anywhere real, the sign-in did not protect the files, and clients could have deleted Bai's own signed agreements.",
    build:
      "As lead developer, planned and rebuilt it as one secure web app on Bai's own server. Files stay in OneDrive and are read live through the Microsoft Graph API, never copied. Administrators link each client's main folder once and the hub matches the standard folders by name. Clients sign in with an emailed code, browse and upload into their own folders, and delete only what they uploaded.",
    value:
      "Each client gets one private place for every document Bai shares with them, Bai keeps filing in the OneDrive it already uses, and every sign-in, upload and download, and every change made in the hub, leaves a record.",
    results: [
      "Sign-in uses an emailed code that works once, expires in 10 minutes and can be resent every 2 minutes, enforced on the server",
      "Every request is checked against the client's own folders before anything is listed or downloaded",
      "Clients upload straight to Microsoft, up to 100 MB a file and only in allowed file types",
      "Internal folders can be hidden per client, and administrators can view any portal exactly as the client sees it",
      "Changes made in OneDrive appear in the hub within about 30 seconds, and deleted items can be restored",
      "Runs on Bai's server in Docker, with nightly backups",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Microsoft Graph API", "Docker"],
  },
  {
    title: "Automation Training Series",
    slug: "automation-training-series",
    org: "Bai Finance",
    image: "training-ghl-asana.webp",
    shots: [
      {
        src: "training-ghl-asana.webp",
        caption:
          "Part 1: a hands-on GHL → n8n → Asana sync. The point is learning to read an API reference and wire unfamiliar tools together, not the sync itself.",
      },
      {
        src: "training-crm.webp",
        caption:
          "Part 3, CRM configuration. Its recurring theme is that mistakes come out blank rather than broken, so configuration is verified by sending a real test, not by looking at it.",
      },
      {
        src: "training-debugging.webp",
        caption:
          "Part 5 is a handbook rather than a tutorial: triage order, status codes, five traps and a symptom index, all drawn from real incidents.",
      },
    ],
    group: "Automation",
    category: "Enablement",
    status: "Shipped",
    problem:
      "New engineers had to learn three unfamiliar systems (GoHighLevel, n8n and Asana) by building real integrations between them, without their practice work coming near live client data.",
    build:
      "Wrote a six-part, hands-on training series covering orientation and ground rules, a GHL → n8n → Asana sync and its reverse, CRM configuration, contact data and tagging, and a debugging and operations handbook. Each part ends in something the engineer builds and tests.",
    value:
      "New team members can contribute to real integrations sooner, and the business carries no risk to live client data while they learn.",
    results: [
      "Interns work in a separate testing account set up for the program, so they can practice freely without touching live data",
      "Both directions of a real integration are built against the actual APIs: reading the reference, finding the IDs and mapping the fields",
      "The debugging handbook draws on real failures: fixes left in draft, swallowed errors, test and production URLs confused, automations triggering each other, and matching on names instead of IDs",
      "Every part ends in a deliverable, and fixes are written up as runbook entries in one consistent format",
    ],
    tech: ["n8n", "GoHighLevel", "Asana API", "Technical Writing"],
  },
  {
    title: "Self-Hosted Automation Platform",
    slug: "self-hosted-automation-platform",
    org: "Bai Finance",
    image: "platform-architecture.webp",
    group: "Infrastructure & Reliability",
    category: "Infrastructure",
    status: "Active",
    problem:
      "The automation platform ran on a hosted n8n plan. When that plan ended, it took the database with it, and every workflow the business depended on was gone in one afternoon, with no way to log in and recover them.",
    build:
      "Rebuilt the platform on a VPS the company controls: a Docker Compose stack behind Traefik, with workflow definitions kept in Git so the running instance can always be reproduced.",
    value:
      "The business now controls its own automation platform and can restore it from version control, rather than depending on a vendor plan for systems it cannot run without.",
    results: [
      "Restored every workflow from the JSON exports committed to Git, which were the only surviving copy",
      "Traefik handles TLS and HTTP redirects at the edge, so no workflow has to manage certificates",
      "Postgres holds execution state instead of the container filesystem, so the stack can be rebuilt without losing history",
      "The encryption key is protected as the platform's most critical secret, because losing it would make every stored credential permanently unreadable",
      "Traced a TLS failure to a proxy release that had dropped two configuration keys and was serving a self-signed certificate instead of reporting an error",
      "Three backup tiers, each covering the last one's blind spot: provider snapshots, a nightly database dump on the server, and a nightly GitHub Actions job that commits every workflow off the server as normalized JSON, so a diff shows who changed what, and when",
      "Every workflow is tagged as production, internal or practice, and noisy internal workflows no longer store their successful runs, so the execution history holds what someone may actually need to read",
      "Opened the repository to the wider team with a contributing guide and a dev-branch model, so changes are reviewed before they reach the live instance",
    ],
    tech: ["Docker Compose", "Traefik", "Linux", "PostgreSQL", "n8n", "GitHub Actions"],
  },
  {
    title: "Workflow Monitor",
    slug: "workflow-monitor",
    org: "Bai Finance",
    image: "workflow-monitor.webp",
    // The two Discord captures (2026-10-19) show workflow names and errors only,
    // no people or client data.
    shots: [
      {
        src: "workflow-monitor.webp",
        caption: "How the monitor works: one lane alerts on each failure as it happens, the other posts a summary every hour.",
      },
      {
        src: "workflow-monitor-alert.webp",
        caption:
          "A live failure: the workflow, the failing step and the error, with a link to the run. Repeats inside the hour are counted in the next status post instead of alerting again.",
      },
      {
        src: "workflow-monitor-status.webp",
        caption: "A quiet night. The status post arrives even when nothing failed, so a missing post means n8n itself is down.",
      },
    ],
    group: "Infrastructure & Reliability",
    category: "Monitoring",
    status: "Active",
    problem:
      "The brokerage's production workflows caught their own errors so that callers always received a clean reply, which also meant n8n recorded every failure as a success. A broken CRM sync could fail on every lead for days without anyone knowing.",
    build:
      "Built a single n8n workflow with two lanes: one posts each failed run to the team's Discord the moment it happens, and the other posts a summary of the previous hour. Then changed the production workflows so that caught errors fail the run, giving the monitor something to report.",
    value:
      "The team hears about a failure as it happens, not days later from a broker or a client, which protects leads and shortens the time spent investigating.",
    results: [
      "Each workflow is muted for an hour after it alerts, so a workflow that fails on every lead posts once rather than once per lead, and one workflow's mute never silences another's",
      "The hourly post arrives even when everything is healthy, so a missing post means n8n itself is down, the one failure an error trigger can never report",
      "Caught errors now end the run as failed after the caller has its error reply, so the CRM and the task manager see no difference",
      "Watches every production workflow and itself, and a new workflow joins by pointing its error setting at the monitor",
      "Fire-drilled before go-live: a deliberately broken workflow alerted once, the repeat was muted, and the status lane reported all clear on the live instance",
    ],
    tech: ["n8n", "n8n REST API", "Discord", "Python"],
  },
  {
    title: "CRM Sync & Inquiry Pipeline",
    slug: "crm-sync-inquiry-pipeline",
    org: "Bai Finance — company website",
    image: "baifinance-inquiry-form.webp",
    shots: [
      {
        src: "baifinance-inquiry-form.webp",
        caption:
          "Where a lead enters. This form and the chat widget both write the same row, so one path reaches the CRM instead of two that drift apart.",
      },
      {
        src: "baifinance-home-chat.webp",
        caption:
          "The other entry point: the site's live chat, open on the homepage. A thread here ends by timer, by cron sweep, or by an admin — which is what made the close worth claiming explicitly.",
      },
      {
        src: "baifinance-inquiries-inbox.webp",
        caption:
          "The admin inbox, filtered by thread state — New, Open, Replied, Closed. Closing one from here is the path that races the ten-minute timer: first for the close itself, then again for the transcript email. Names and messages are blurred; these are real enquiries.",
      },
      {
        src: "baifinance-analytics.webp",
        caption:
          "The site's analytics view, built by the web team. Figures are blurred because they are the client's business volumes.",
      },
    ],
    group: "Backend & Data",
    category: "Integration",
    status: "Active",
    problem:
      "Leads from the brokerage's website reached GoHighLevel through an edge function that existed only in the deployed environment, unversioned and unreviewed. Separately, a chat thread could be closed by a timer, a scheduled sweep or an admin at the same moment, with nothing deciding which one owned the close.",
    build:
      "Brought the CRM sync into the repository as a reviewed Supabase Edge Function, and built the inquiry close-and-transcript pipeline behind it: tiered contact de-duplication, two independent exactly-once claims, and the schema and indexes underneath.",
    value:
      "Website inquiries reach the CRM matched to the right contact, and each transcript is delivered once, so the sales team is not working from duplicates or missing conversations.",
    results: [
      "Contact matching is tiered: an email match merges, a phone match merges only when the surname agrees, and a weaker match still creates the contact but tags it for review instead of silently combining two people",
      "A merge only fills blank fields, so an inbound lead can never overwrite good data already in the CRM",
      "Two separate exactly-once claims, because they race on different things: one conditional update claims the close, another claims the transcript email, and a failed send releases its claim so a retry can still deliver",
      "A closed thread now records whether a timer or a person ended it, which was previously impossible to tell",
      "Added the two indexes the scheduled sweep and transcript build were missing, because Postgres does not index a foreign key on its own",
      "Backed by unit, integration and security tests, on the 90% coverage floor CI enforces for the contact path",
    ],
    tech: ["Supabase Edge Functions", "Deno", "TypeScript", "PostgreSQL", "GoHighLevel API", "Vitest"],
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
    slug: "crm-migration-data-pipeline",
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
      "Years of growth had left thousands of contacts spread across more than 20 spreadsheets and CRM exports, with duplicates, malformed emails and phone numbers, and couples sharing a single record.",
    build:
      "Wrote a Python pipeline that consolidates every source into one import-ready master list: normalizing contact details, splitting joint applicants into individual records, and applying a namespaced tagging scheme through a single validation step.",
    value:
      "The team gains one clean contact base to market from and report on, so campaigns reach the right people and staff stop working around duplicates.",
    results: [
      "Audited more than 4,000 contacts across 20+ source sheets and consolidated them into more than 1,900 de-duplicated records",
      "Introduced a tag taxonomy where each tag carries exactly one fact, so adding a segment does not mean reworking existing lists",
      "Delivered a phased cleanup roadmap and a company-wide Contact Management SOP",
      "Designed a weekly data-quality digest that reviews every CRM contact each Monday and emails the team the records that are flagged, untagged or unowned, so the data stays clean",
    ],
    tech: ["Python", "pandas", "GoHighLevel", "Data Modeling"],
  },
  {
    title: "WhatsApp OTP Login",
    slug: "whatsapp-otp-login",
    org: "Confidential Client — Ecommerce",
    image: "whatsapp-otp-login.webp",
    shots: [
      {
        src: "whatsapp-otp-login.webp",
        caption:
          "The code travels over WhatsApp, but the session is a normal one: once the code checks out, it is exchanged for a standard signed-in session.",
      },
    ],
    group: "Backend & Data",
    category: "Backend",
    status: "Shipped",
    problem:
      "The platform's users rely on WhatsApp rather than email, but its sign-in provider could only send codes by email or SMS.",
    build:
      "Added a second sign-in option that sends a one-time code over WhatsApp and turns it into a normal signed-in session, leaving email sign-in unchanged.",
    value:
      "Users sign in through the app they already use, and the business adds no new vendor to do it.",
    results: [
      "Sign-in over WhatsApp, with email still available as a fallback",
      "Reused the platform's existing WhatsApp provider instead of adding a new vendor",
    ],
    tech: ["Supabase Auth", "WhatsApp API", "PostgreSQL", "TypeScript"],
  },
  {
    title: "QR Lead-Capture Flow",
    slug: "qr-lead-capture",
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
    status: "Active",
    problem:
      "Prospects scanned from business cards had to reach the right broker instantly, with a welcome email that would not land in spam.",
    build:
      "Built an n8n flow that adds scanned prospects to GoHighLevel, assigns the owning broker through a routing guard, and sends a welcome email from a verified sender with a per-broker Reply-To address.",
    value:
      "Every prospect met in person reaches the right broker straight away, with no lead waiting on manual follow-up.",
    results: [
      "Per-broker Reply-To routing that preserves SPF, DKIM and DMARC alignment",
      "No manual triage: every scan is routed and greeted automatically",
    ],
    tech: ["n8n", "GoHighLevel", "Email Deliverability", "DNS"],
  },
  {
    title: "Idempotent Webhook Intake",
    slug: "idempotent-webhook-intake",
    org: "Open-source n8n workflow",
    image: "workflow-idempotent-intake.webp",
    shots: [
      {
        src: "workflow-idempotent-intake.webp",
        caption:
          "The key is a hash of the caller's own fields, so a retry keys the same — and a unique index on it catches the race the check cannot.",
      },
      {
        src: "ref-idempotent-intake.webp",
        caption:
          "Three deliberate replies (unusable, already have it, created) so the caller can act on each one instead of guessing.",
      },
    ],
    group: "Backend & Data",
    category: "Open Source",
    status: "Shipped",
    problem:
      "Senders retry, and networks drop responses after a write has already happened. Any endpoint that creates something will eventually be called twice with the same data, and quietly create two records.",
    build:
      "An importable n8n workflow that identifies every request by a hash of the caller's own fields, checks that key before writing, and responds in a way the caller can act on. The reasoning sits in sticky notes beside the nodes it explains.",
    value:
      "Prevents duplicate records when systems retry, which keeps customer data clean and avoids the same order or lead being processed twice.",
    results: [
      "The key is a SHA-256 of the caller's identifying fields, never a timestamp or a random value, because a retry has to produce the same key",
      "A unique index on the key backs up the lookup, so a race that slips past the check still cannot create a second row",
      "Responds 400 when retrying will not help, 200 when the record already exists, and 201 when something was created",
      "Contains no client data or credentials: every secret is an environment reference",
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
    title: "More Open-Source Workflows",
    slug: "open-source-workflows",
    org: "Open-source n8n workflows",
    image: "workflow-open-source-set.webp",
    shots: [
      {
        src: "workflow-open-source-set.webp",
        caption:
          "Three workflows, each defined by what it does when something goes wrong rather than by its happy path.",
      },
      {
        src: "ref-health-check.webp",
        caption:
          "Endpoint health check: every target is probed before anything is reported, so one dead endpoint cannot hide the others behind it.",
      },
      {
        src: "ref-workflow-backup.webp",
        caption:
          "Workflow backup to git: a nightly export of every workflow to a repository — the backup that has to live somewhere other than the machine it protects.",
      },
      {
        src: "n8n-company-enrichment.webp",
        caption:
          "Company enrichment: each company is fetched, profiled and written back on its own, so a dead website only fails its own row.",
      },
    ],
    group: "Infrastructure & Reliability",
    category: "Open Source",
    status: "Shipped",
    problem:
      "Three smaller workflows built on one principle: how a system fails matters more than how it succeeds. Monitoring that fires one alert per failure, a platform that holds the only copy of its own automations, and an enrichment script that stops at the first dead website.",
    build:
      "An endpoint health check that tests a list of targets and sends one digest only when something is down, a nightly export that commits every workflow to Git, and a company enrichment run that profiles each homepage against a fixed schema and writes it back to a sheet.",
    value:
      "Each one removes a common operational risk: outages nobody notices, automations with no backup, and batch jobs that fail on a single bad record.",
    results: [
      "Health check: failures are collected before anything is sent, so ten dead endpoints produce one digest rather than ten alerts, and silence means success",
      "Git backup: files are named by workflow ID, so a rename produces a diff instead of an orphan, and self-changing fields are stripped so a nightly run commits only real changes",
      "Enrichment: a dead site fails its own row rather than the batch, and the model may answer unknown, because a visible blank is better than a guess later mistaken for research",
      "Built from real problems: the Git backup exists because a hosted n8n plan ended and took its database with it",
    ],
    tech: ["n8n", "Scheduling", "GitHub API", "Gemini", "Uptime Monitoring"],
    links: [
      {
        label: "Workflow JSON",
        href: "https://github.com/KoolDudeGameDev/portfolio/tree/main/n8n-workflows",
        icon: "github",
      },
    ],
  },
  {
    title: "RAG Gmail Reply Assistant",
    slug: "rag-gmail-reply-assistant",
    org: "Open-source n8n workflow",
    image: "workflow-rag-gmail.webp",
    shots: [
      {
        src: "workflow-rag-gmail.webp",
        caption:
          "Triage runs before retrieval, and there is no send step anywhere — the ceiling is a draft a person reads and sends.",
      },
      {
        src: "n8n-rag-gmail.webp",
        caption:
          "The workflow itself: the question lane above, the document lane that fills the knowledge base below, sharing one embedding model.",
      },
    ],
    group: "Automation",
    category: "Open Source",
    status: "Shipped",
    problem:
      "Most inbound email is the same handful of questions, answered by hand from documents the business already has. A model answering from general knowledge will invent whatever those documents would have told it.",
    build:
      "An n8n workflow that triages each new email, lets an AI agent find the answer in a Qdrant knowledge base built from the company's own documents, and saves the reply as a Gmail draft. A second lane loads documents into that knowledge base.",
    value:
      "Routine questions can be answered faster and more consistently from approved documents, while a person keeps control of every reply.",
    results: [
      "There is no send step, so the model can only ever produce a draft that a person reads and sends",
      "Triage runs before retrieval, so complaints and account-specific mail go straight to a person and never reach the agent",
      "When the knowledge base has no answer, the agent responds ESCALATE and the email is labeled for a person instead of being guessed at",
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
    slug: "invoice-intake-approval",
    org: "Open-source n8n workflow",
    image: "workflow-invoice-queue.webp",
    shots: [
      {
        src: "workflow-invoice-queue.webp",
        caption:
          "One row IN_REVIEW is the whole queue lock, and two days without an answer releases the invoice rather than rejecting it.",
      },
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
      "Invoices arrive by email faster than anyone can approve them. Approving straight from the inbox means a duplicate can be paid twice, nothing records what was decided, and a request nobody answered simply disappears.",
    build:
      "Two lanes in one n8n workflow. Intake reads each invoice PDF, extracts its fields with a model and queues it. Approval hands the oldest queued invoice to an approver, one at a time, and records the outcome in a master file.",
    value:
      "Reduces the risk of paying an invoice twice and gives finance a clear record of every decision, while invoices keep moving when an approver is unavailable.",
    results: [
      "Intake never waits on approval, so invoices keep queueing while one is in review",
      "Only one invoice is ever in review: the approval lane does nothing while any row is IN_REVIEW, and that single check is the whole queue lock",
      "A SHA-256 of vendor, invoice number and amount means the same PDF forwarded twice is recognized rather than queued again",
      "With no answer within two days, the invoice returns to the queue, so a missed email never silently rejects it",
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
    title: "Audit Logging & Production Hardening",
    slug: "audit-logging-hardening",
    org: "BaiAcademy — team-built LMS",
    image: "baiacademy-register.webp",
    shots: [
      {
        src: "baiacademy-register.webp",
        caption:
          "The registration wizard, which I built. Step one of five: the referral code a broker or BDA hands out is redeemed later in the flow, against a throttled endpoint, so the codes cannot be guessed by probing.",
      },
      {
        src: "baiacademy-lms.webp",
        caption:
          "The platform this work shipped into: a Django REST backend behind a Next.js front end, built by a team of eight across seven roles.",
      },
      {
        src: "baiacademy-courses.webp",
        caption:
          "Course management. My work sits underneath screens like this one — the logging, the deployment configuration, and the referral flow new brokers register through.",
      },
    ],
    group: "Web Apps",
    category: "Backend & Platform",
    status: "Active",
    problem:
      "A learning platform written by eight people across parallel branches had no audit trail, no log retention, and a deployment configuration with origins and TLS assumptions hard-coded for one machine. Migrations from separate feature branches had also diverged into conflicting heads.",
    build:
      "Built the audit and access-logging subsystem, owned the production deployment hardening, and shipped the broker and BDA referral-code flow end to end, from the Django model and migrations through DRF to the Next.js registration wizard.",
    value:
      "The platform can now show who did what and when, and its releases no longer depend on one developer's machine, which supports accountability and dependable deployments.",
    results: [
      "Added application, access and audit logging as first-class models, with middleware capturing every request and a management command enforcing per-table retention windows, with a dry-run mode",
      "Access logs are written by a background thread off a non-blocking queue and batched into bulk inserts, so a request never waits on a log write, and if the queue backs up, events are dropped and counted rather than slowing the site down",
      "That writer closes its database connection after each flush, as the Supabase transaction pooler requires, and drains what remains on shutdown",
      "Referral-code redemption is throttled under its own scope and logs failed attempts with the caller's IP address, so the codes cannot be found by probing",
      "Made the deployment portable: environment-driven CORS and CSRF trusted origins, proxy TLS trust for the host, and WhiteNoise serving static files, replacing values pinned to one developer's machine",
      "Shipped referral codes for broker and BDA signup across the whole stack: schema migration, a backfill for existing accounts, rate limiting on redemption, and the registration wizard and profile screens that use them",
      "Reconciled three-way migration conflicts between feature branches, so the shared database could migrate cleanly again",
      "Fixed an ASGI startup ordering bug that broke the WebSocket dashboard, and derived the socket URL from configuration instead of a hard-coded host",
    ],
    tech: ["Django", "DRF", "PostgreSQL", "Next.js", "TypeScript", "Railway"],
  },

  {
    title: "Cebuano Speech-to-Text",
    slug: "cebuano-speech-to-text",
    org: "Capstone Research",
    group: "Research & Systems",
    category: "Machine Learning",
    status: "Research",
    featured: true,
    image: "asr.webp",
    problem:
      "Cebuano is a low-resource language with almost no ready speech-recognition tooling to build on.",
    build:
      "Engineered an end-to-end speech recognition pipeline in Python with Hugging Face Transformers, Wav2Vec2-XLSR and a custom KenLM language model, training and decoding the models independently.",
    value:
      "Provides a working foundation for voice products in a language with very little existing tooling, including the Cebuano AI voice agent now in development.",
    results: [
      "Reached a 4.15% word error rate and a 1.16% character error rate on 552 held-out samples, using beam search with no language model, so the figure depends only on the acoustic model",
      "3,622 utterances from 22 speakers (1.72 hours), split on clean audio before augmentation so every augmented clip inherits its source clip's split and cannot leak across it",
      "Found a test-set leakage in my own KenLM evaluation after the fact. The decoder is being rebuilt, and no language-model figures are quoted until it is sound",
      "Now developing a Cebuano AI voice agent on this model: microphone, voice detection, speaker gate, speech recognition, then an LLM reply",
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
    slug: "ai-labeling-loop",
    org: "Speech Data Tooling",
    group: "Backend & Data",
    category: "Backend",
    status: "Completed",
    image: "labelingloop.webp",
    problem:
      "Building the speech dataset needed one place to upload, transcribe, correct and export audio, not a collection of scripts.",
    build:
      "Developed a Django application that brings audio upload, transcription, correction and export into a single workflow, deployed through Cloudflare Tunnel for live user testing.",
    value:
      "Gives the dataset one managed workflow, which reduces handling errors and makes the labeling process repeatable.",
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
