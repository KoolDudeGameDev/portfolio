export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  location: string;
  summary: string;
};

export const experience: ExperienceItem[] = [
  {
    period: "May 2026 — Present",
    role: "Automation & Systems Integration Engineer (IT Intern)",
    org: "Bai Finance",
    location: "Cebu, Philippines",
    summary:
      "Own a version-controlled n8n automation platform integrating GoHighLevel and Asana across a 19-pipeline brokerage, ship its marketing site and admin CMS, and lead a three-person intern team on builds, reviews, and documentation standards.",
  },
  {
    period: "Jun 2026 — Present",
    role: "Technical Operations Engineer (Agency Contract)",
    org: "Confidential Client — Ecommerce",
    location: "Remote — Malaysia",
    summary:
      "Placed by a software agency as the sole engineer on one client product — a Malaysian affiliate-rewards ecommerce platform — owning uptime monitoring, incident response, security review of live endpoints, Supabase/PostgreSQL maintenance, and React/TypeScript feature work under a tiered SLA, in direct contact with the client.",
  },
  {
    period: "Jun 2025 — May 2026",
    role: "Undergraduate Researcher",
    org: "Cebuano Speech-to-Text Capstone",
    location: "Ginatilan, Cebu",
    summary:
      "Built and trained an end-to-end Cebuano ASR pipeline (Wav2Vec2-XLSR + KenLM) reaching 3.07% WER, and authored a conference paper on the results.",
  },
  {
    period: "Feb — May 2026",
    role: "Backend Developer",
    org: "AI Labeling Loop",
    location: "Ginatilan, Cebu",
    summary:
      "Developed a Django CRUD application unifying audio upload, transcription, correction, and export, deployed for live user testing via Cloudflare Tunnel.",
  },
];

export const education = {
  school: "Cebu Technological University — Ginatilan Campus",
  degree: "BIT, Major in Computer Technology",
  honor: "Cum Laude standing",
  period: "Expected May 2027",
};
