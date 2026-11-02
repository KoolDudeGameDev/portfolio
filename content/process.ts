export type ProcessIcon =
  | "call"
  | "scope"
  | "build"
  | "health"
  | "handover"
  | "runs";

export type ProcessStep = {
  /** Rendered as the node's mono badge, so keep it two digits. */
  index: string;
  icon: ProcessIcon;
  label: string;
  /**
   * Whose time the step costs. Drives the card's corner mark and the legend:
   * filled for "you", outlined for "me". Real information, not decoration — a
   * client reading this wants to know what it asks of them.
   */
  plane: "you" | "me";
  /** The caption chip along the card's foot. Uppercased in the UI, ≤18 chars. */
  tag: string;
  /** One mono line under the label. Shown in the detail panel, not the card. */
  sub: string;
  /** Revealed in the canvas readout on hover or focus. One sentence. */
  detail: string;
  /** Exactly one step is focal — the outcome the whole diagram argues for. */
  focal?: boolean;
};

export type ProcessCluster = {
  /** Uppercased in the UI. */
  label: string;
  steps: ProcessStep[];
};

/**
 * How a build actually goes, for the process section.
 *
 * Every line here is already claimed somewhere else on the site — the
 * engagements in services.ts and the answers in faq.ts. Keep it that way: this
 * is the first concrete promise a visitor reads, and an interviewer or a client
 * will hold him to it.
 */
export const processClusters: ProcessCluster[] = [
  {
    label: "Agree",
    steps: [
      {
        index: "01",
        plane: "you",
        tag: "no charge",
        icon: "call",
        label: "A call",
        sub: "how work moves today",
        detail:
          "A short call about how work moves through your business today, with no charge and no obligation.",
      },
      {
        index: "02",
        plane: "you",
        tag: "fixed scope",
        icon: "scope",
        label: "Scope + quote",
        sub: "before any work starts",
        detail:
          "Scope, timeline and price are agreed before any work begins, and you hear early if anything is at risk.",
      },
    ],
  },
  {
    label: "Build",
    steps: [
      {
        index: "03",
        plane: "me",
        tag: "real data",
        icon: "build",
        label: "Build it",
        sub: "tested on real data",
        detail:
          "Built end to end and tested against your real data, not sample data that only works in a demonstration.",
      },
      {
        index: "04",
        plane: "me",
        tag: "alerts not tickets",
        icon: "health",
        label: "Health checks",
        sub: "wired in, not bolted on",
        detail:
          "Health checks are delivered with the system, so a failure reaches me as an alert, not as a complaint from your customer.",
      },
    ],
  },
  {
    label: "Hand over",
    steps: [
      {
        index: "05",
        plane: "you",
        tag: "docs + walkthrough",
        icon: "handover",
        label: "Handover",
        sub: "docs + a walkthrough",
        detail:
          "Documentation your team can follow, and a walkthrough with them. You own the system and the documents.",
      },
      {
        index: "06",
        plane: "me",
        tag: "no lock-in",
        icon: "runs",
        label: "It runs without me",
        sub: "that is the point",
        detail:
          "The system runs without me. Ongoing support is an option you choose, never a dependency.",
        focal: true,
      },
    ],
  },
];

/** The dashed return path: a live failure caught by the checks, not by a user. */
export const processLoop = "An alert, not a complaint";

/**
 * What the client receives at handover. This is the promise that sets him apart,
 * so each line has to match what his real handovers have produced: code, docs,
 * runbooks, scripts and a walkthrough.
 */
export const handoverItems = [
  { title: "Source code", detail: "In your own repository, with its full history." },
  { title: "Team guide", detail: "Written for the people who will use the system." },
  { title: "Runbook", detail: "What to check, and what to do if something fails." },
  { title: "Architecture notes", detail: "How the system fits together, for future developers." },
  { title: "Your accounts", detail: "Hosting, database and services in your name." },
  { title: "A walkthrough", detail: "A live session taking your team through everything." },
];
