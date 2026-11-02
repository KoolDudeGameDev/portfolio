export type FaqItem = {
  question: string;
  answer: string;
};

// Written for business owners deciding whether to get in touch — these are the
// objections that come up on real calls, answered plainly. Keep the voice the
// same as services.ts: what they get, no jargon, no selling. All four are always
// open, in columns, so keep each answer to about three lines.
export const faqs: FaqItem[] = [
  {
    question: "How long does a project take?",
    answer:
      "A single workflow or integration typically takes one to three weeks, and a custom web app four to eight. You receive a timeline before work begins, and early notice if anything changes.",
  },
  {
    question: "What does it cost?",
    answer:
      "Every project is quoted after an initial call, once I understand the work involved. The call is free, with no obligation.",
  },
  {
    question: "What do we receive at the end?",
    answer:
      "The source code in your own repository, the accounts in your name, a team guide, a runbook and a live walkthrough. You own all of it, and it keeps running without me.",
  },
  {
    question: "Can you take over an existing system?",
    answer:
      "Yes. I document how it actually runs, remove what is broken or unused, then complete or extend it. You receive a written handover, so the next developer does not start from zero.",
  },
];
