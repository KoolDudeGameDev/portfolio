export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  location: string;
  summary: string;
};

export const experience: ExperienceItem[] = [
  {
    period: "May 2026 — Sep 2026",
    role: "Automation & Systems Integration Engineer",
    org: "Bai Finance",
    location: "Australia · remote from Cebu",
    summary:
      "Owned a version-controlled n8n automation platform integrating GoHighLevel and Asana across a 19-pipeline brokerage, built the CRM sync and inquiry pipeline behind the company website and a company-wide leave platform, put the platform under production monitoring and off-box backups, and led a six-person engineering team on builds, code reviews, and documentation standards.",
  },
  {
    period: "Jun 2026 — Sep 2026",
    role: "Software Engineer (Agency Contract)",
    org: "Confidential Client — Ecommerce",
    location: "Remote",
    summary:
      "Placed by a software agency as the sole engineer on a partly built affiliate-rewards ecommerce platform. Learned its architecture from the docs, cleared out the dead code and unused endpoints it was carrying, then built its finance and payout system end to end (schema, server functions and both role-gated dashboards), delivered 10 of 11 client requirements to production, hardened access to the live database, and closed the engagement with a full technical handoff to the incoming team.",
  },
  {
    period: "Jun 2025 — May 2026",
    role: "Undergraduate Researcher",
    org: "Cebuano Speech-to-Text Capstone",
    location: "Cebu, Philippines",
    summary:
      "Built and trained an end-to-end Cebuano ASR pipeline (Wav2Vec2-XLSR + KenLM) reaching 4.15% WER with beam search alone, and authored a conference paper on the results.",
  },
  {
    period: "Feb — May 2026",
    role: "Backend Developer",
    org: "AI Labeling Loop",
    location: "Cebu, Philippines",
    summary:
      "Developed a Django CRUD application unifying audio upload, transcription, correction, and export, deployed for live user testing via Cloudflare Tunnel.",
  },
];

export const education = {
  school: "Cebu Technological University — Ginatilan Campus",
  degree: "BIT, Major in Computer Technology",
  honor: "Cum Laude",
  period: "May 2026",
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
