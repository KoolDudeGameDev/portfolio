export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  location: string;
  /**
   * The major work, most significant first. Every line has to survive "walk me
   * through that": see the claim rules in CLAUDE.md before adding one.
   */
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: "May 2026 — Jan 2027",
    role: "Full-Stack & Automations Developer (Intern)",
    org: "Bai Group of Companies",
    location: "Cebu, Philippines · on-site",
    highlights: [
      "Technical lead for two project teams and one solo build across a 1,800-hour internship, from requirements and system design through delivery, directing six engineers.",
      "Led the team building Jim's Franchise Loan, a custom loan CRM that replaced a spreadsheet: 10 synced stages, a servicing calculator, per-account permissions and 624 automated tests.",
      "Led the team building Company Radar, a custom sales CRM with AI prospecting that finds and scores Australian companies hiring in the Philippines each week.",
      "Sole developer of the contractor Leave Application Platform, with live leave credits, secure sign-in and supervisor approval by email.",
      "Architected a self-hosted automation platform of 191 workflows across 19 pipelines for 64 users, with two-way CRM sync.",
      "Introduced production monitoring with instant failure alerts, an hourly heartbeat and three-tier backups.",
    ],
  },
  {
    period: "Jun 2026 — Present",
    role: "Freelance Software Engineer (Agency & Contract)",
    org: "Confidential clients",
    location: "Australia, Philippines, international",
    highlights: [
      "Took over a partly built ecommerce rewards platform as sole engineer, auditing the codebase before extending it.",
      "Built its finance and payout system end to end, giving the client order-level visibility of commissions, refunds and payouts, with encrypted bank details, across 17 server functions and 28 migrations.",
      "Delivered 10 of 11 client requirements and shipped 25 server functions in one verified release.",
      "Closed an unauthenticated path to the live database, identified and fixed an admin self-escalation flaw, and introduced a daily end-to-end health check.",
      "Develop internal tools and job-market scrapers for Australian finance and brokerage clients.",
      "Built n8n automation tools, including an open-source RAG Gmail assistant that drafts replies from company documents.",
    ],
  },
  {
    period: "Jun 2025 — Present",
    role: "Backend Developer",
    org: "Cebuano Speech AI",
    location: "Cebu, Philippines",
    highlights: [
      "Built a Cebuano speech recognition model reaching a 4.15% word error rate and 1.16% character error rate on 552 held-out samples, with beam search alone.",
      "Prepared a speaker-disjoint dataset of 3,622 utterances, supported by a Django app for labeling and correction.",
      "Authored a conference paper on the results.",
      "Now developing a Cebuano AI voice agent on this model, combining voice detection, a speaker gate, speech recognition and an LLM.",
    ],
  },
];

export const education = {
  school: "Cebu Technological University — Ginatilan Campus",
  degree: "BIT, Major in Computer Technology",
  honor: "Candidate for Cum Laude",
  period: "Expected May 2027",
  // "BIT, Major in Computer Technology" doesn't tell a reader outside the
  // Philippines what the degree actually covered — this is what does.
  coursework: [
    "Programming",
    "Computer Networks and Security",
    "Microprocessor Systems",
    "Embedded Systems",
    "Digital Electronics",
  ],
};
