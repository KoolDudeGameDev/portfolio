export type FaqItem = {
  question: string;
  answer: string;
};

// Written for business owners deciding whether to get in touch — these are the
// objections that come up on real calls, answered plainly. Keep the voice the
// same as services.ts: what they get, no jargon, no selling.
export const faqs: FaqItem[] = [
  {
    question: "How long does a project usually take?",
    answer:
      "Most single workflows or integrations take one to three weeks. An audit is one to two weeks. Larger builds, like an internal platform or a full CRM migration, run four to eight weeks. You get a timeline before any work starts, and I tell you early if something is going to slip.",
  },
  {
    question: "Do we have to switch tools to work with you?",
    answer:
      "No. I start with the tools you already pay for and connect them. Switching platforms is expensive and disruptive, so I only suggest it when the tool you have genuinely cannot do the job, and I will show you why before you spend anything.",
  },
  {
    question: "What does it cost?",
    answer:
      "Every engagement is quoted after a short call, once I know what the work actually involves. I would rather scope it properly than give you a number that changes later. There is no charge for that first call and no obligation after it.",
  },
  {
    question: "What happens when something breaks after launch?",
    answer:
      "Builds come with health checks so failures show up as alerts instead of as a customer complaining. If you are on a retainer I respond and fix it. If you are not, you still own the system and the documentation, and you can call me for one-off help.",
  },
  {
    question: "Does my team need to be technical to run this?",
    answer:
      "No. Anything I build is documented and handed over, and I walk your team through it. The point is that the system runs without me, not that you depend on me to keep it alive.",
  },
  {
    question: "Can you work with our timezone?",
    answer:
      "Yes. I am based in the Philippines and already work with teams in the US and Australia. I keep overlapping hours for calls and work asynchronously the rest of the time, so progress does not stop overnight.",
  },
  {
    question: "What do you need from us to get started?",
    answer:
      "A short call describing how the work moves through your business today, and access to the tools involved when we begin. That is enough for me to scope it. You do not need a technical spec written first.",
  },
];
