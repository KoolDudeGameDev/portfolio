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
    period: "Jun 2026 — Present",
    role: "Freelance Software Engineer (Agency & Contract)",
    org: "Confidential clients",
    location: "Australia, Philippines, International",
    highlights: [
      "Took over a half-built ecommerce affiliate platform as its only engineer, and cleaned up the codebase before extending it.",
      "Built its commission and payout features, with tracking per order, refund handling and encrypted bank details.",
      "Maintain its automation workflows and database, and handle issues, fixes and security improvements.",
      "Closed a security gap in the live database and added a daily end-to-end health check.",
      "Build internal tools and job-market scrapers for finance and brokerage clients in Australia.",
      "Published open-source n8n workflows, including a RAG-based Gmail assistant that drafts replies from a company's own documents.",
    ],
  },
  {
    period: "May 2026 — Jan 2027",
    role: "Full-Stack & Automations Developer (Intern)",
    org: "Bai Group of Companies",
    location: "Cebu, Philippines · on-site",
    highlights: [
      "Lead two to three project teams of six engineers in total, from requirements and system design to release.",
      "Led the team building Jim's Franchise Loan, a custom loan CRM that replaced a spreadsheet, with 10 synced stages, a servicing calculator and per-account permissions.",
      "Led the team building Company Radar, a custom sales CRM that uses AI to find and score Australian companies hiring in the Philippines every week.",
      "Sole developer of the contractor Leave Application Platform: live leave credits, email sign-in and supervisor approval by email.",
      "Architected the self-hosted automation platform for a 64-user CRM (19 pipelines, 191 workflows), with two-way sync to the project tracker.",
      "Set up production monitoring: instant failure alerts, an hourly heartbeat check and backups at three levels.",
    ],
  },
  {
    period: "Jun 2025 — Present",
    role: "AI Engineer (Speech Recognition)",
    org: "Cebuano Speech AI",
    location: "Cebu, Philippines",
    highlights: [
      "Trained a Cebuano speech recognition model that reaches a 4.15% word error rate and a 1.16% character error rate on 552 held-out samples, using beam search alone.",
      "Built a dataset of 3,622 recordings in which no speaker appears in both the training and test data, with a Django app for labeling and correcting them.",
      "Wrote a conference paper on the results.",
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
