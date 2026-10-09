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
 * How a build actually goes, for the diagram band under the hero.
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
          "A short call about how the work moves through your business today. No charge, and no obligation after it.",
      },
      {
        index: "02",
        plane: "you",
        tag: "fixed scope",
        icon: "scope",
        label: "Scope + quote",
        sub: "before any work starts",
        detail:
          "Scope, timeline and price agreed before anything is built — and you hear it early if something is going to slip.",
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
          "Built end to end and tested against your real data, not a demo fixture that only works on my machine.",
      },
      {
        index: "04",
        plane: "me",
        tag: "alerts not tickets",
        icon: "health",
        label: "Health checks",
        sub: "wired in, not bolted on",
        detail:
          "Checks that prove the system still works ship with it, so a failure reaches me as an alert instead of as your customer complaining.",
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
          "Documentation your team can actually follow, and I walk them through it. You own the system and the docs either way.",
      },
      {
        index: "06",
        plane: "me",
        tag: "no lock-in",
        icon: "runs",
        label: "It runs without me",
        sub: "that is the point",
        detail:
          "The system runs when I am not there. Ongoing support is a retainer you choose, never a dependency you are stuck with.",
        focal: true,
      },
    ],
  },
];

/** The dashed return path: a live failure caught by the checks, not by a user. */
export const processLoop = "An alert, not a complaint";
