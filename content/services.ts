export type ServiceIcon =
  | "automation"
  | "backend"
  | "crm"
  | "reliability"
  | "web";

export type Service = {
  icon: ServiceIcon;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  /** Spans the full grid width — use for a single closing card. */
  wide?: boolean;
};

// Outcome-framed for business owners: what they get, not just what I use.
export const services: Service[] = [
  {
    icon: "automation",
    title: "Automation & Systems Integration",
    tagline: "Stop doing by hand what software can do for you.",
    description:
      "I connect the tools your business already runs on — CRM, project boards, email, spreadsheets — into one automated system, so leads, tasks, and updates flow without anyone copying data between tabs.",
    stack: ["n8n", "GoHighLevel", "Asana", "Webhooks", "REST APIs"],
  },
  {
    icon: "crm",
    title: "CRM & Data Architecture",
    tagline: "A single source of truth you can actually trust.",
    description:
      "I design clean CRM structures, routing, and access rules, then audit and de-duplicate the messy data underneath — so your team stops chasing ghosts and every contact lands with the right person.",
    stack: ["Supabase", "PostgreSQL", "GoHighLevel", "Access Control"],
  },
  {
    icon: "backend",
    title: "Backend & API Development",
    tagline: "Reliable systems that hold up in production.",
    description:
      "REST API contracts, webhooks, and backend services built with clean architecture and real error handling — the kind of plumbing that keeps working after launch, not just in the demo.",
    stack: ["Node.js", "FastAPI", "Django", "Prisma", "PostgreSQL"],
  },
  {
    icon: "web",
    title: "Web Apps & AI Integration",
    tagline: "Modern products, shipped end to end.",
    description:
      "Full web applications with role-based access, live features, and AI woven in where it earns its place — from the database schema to the deployed front end.",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Gemini API"],
  },
  {
    icon: "reliability",
    title: "Reliability, Monitoring & Security",
    tagline: "Know it's working before your customers tell you.",
    description:
      "Shipping is the easy half — someone has to keep it running. I set up end-to-end health checks, respond when something breaks, and audit the parts that touch your data, so silent failures show up as alerts instead of as lost revenue you find out about later.",
    stack: [
      "Health Checks",
      "Incident Response",
      "Security Audits",
      "PostgreSQL",
      "n8n",
    ],
    wide: true,
  },
];
