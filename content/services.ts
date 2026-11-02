export type ServiceIcon = "automation" | "backend" | "reliability" | "web";

export type Service = {
  icon: ServiceIcon;
  title: string;
  /** Short outcome claim for the card's meta rail. Uppercased in the UI. */
  outcome: string;
  tagline: string;
  description: string;
};

// Outcome-framed for business owners: what they get, not just what I use.
// The custom web app leads, because it is the offer the rest supports.
export const services: Service[] = [
  {
    icon: "web",
    title: "Custom Web Apps",
    outcome: "built around you",
    tagline: "For when off-the-shelf software no longer fits.",
    description:
      "Internal tools, dashboards and client portals designed around your process, with the right access for each person.",
  },
  {
    icon: "automation",
    title: "Automation & Integration",
    outcome: "less manual work",
    tagline: "Free your team from repetitive work.",
    description:
      "I connect the tools you already use, so leads, tasks and updates move on their own and fewer leads are missed.",
  },
  {
    icon: "backend",
    title: "Backends, APIs & Data",
    outcome: "built to scale",
    tagline: "One source of truth you can trust.",
    description:
      "Clean data models, secure APIs and clear access rules, including the cleanup of existing records, built to grow with you.",
  },
  {
    icon: "reliability",
    title: "AI, Monitoring & Reliability",
    outcome: "no silent failures",
    tagline: "Know about a problem before your customers do.",
    description:
      "Practical AI and health checks that surface failures early, before they cost you revenue or customer trust.",
  },
];

export type EngagementIcon = "audit" | "build" | "support";

export type Engagement = {
  icon: EngagementIcon;
  title: string;
  /** How it's scoped and billed, in a few words. No prices on purpose. */
  terms: string;
  description: string;
};

// How a business can hire me. Deliberately no rates: every engagement is
// quoted after a short call, so the work is judged before the price is.
export const engagements: Engagement[] = [
  {
    icon: "audit",
    title: "Automation audit",
    terms: "1–2 week fixed scope",
    description:
      "I map how work moves through your tools, identify where time and leads are being lost, and deliver a prioritized plan you can build with me or another team.",
  },
  {
    icon: "build",
    title: "Custom build",
    terms: "Quoted per project",
    description:
      "One app, workflow or integration, built end to end: scoped before work begins, tested against real data, and handed over with everything your team needs.",
  },
  {
    icon: "support",
    title: "Ongoing support",
    terms: "Monthly retainer",
    description:
      "Monitoring, fixes and continuous improvements for systems already in use, including systems I did not build.",
  },
];
