/** One tile in the Showcase. `src` is a name under public/assets/showcase. */
export type ShowcaseShot = {
  src: string;
  /** Must match a `title` in content/work.ts: the popup links to that case study. */
  project: string;
  /** What the screen is. Read out for the tile and shown in the popup. */
  caption: string;
};

export type ShowcaseRow = {
  kind: "web" | "phone";
  /** The direction the tiles travel. */
  direction: "left" | "right";
  /** Pixels per second at full speed. Rows differ so they never move in step. */
  speed: number;
  /** Stands in for the row in the accessibility tree. */
  label: string;
  shots: ShowcaseShot[];
};

const JIMS = "Jim's Franchise Loan";
const RADAR = "Company Radar";
const LEAVE = "Leave Application Platform";

// All people, companies and contact details in these screens are fictional.
// A new capture goes through the check in "Case-study imagery" in CLAUDE.md.
export const showcaseRows: ShowcaseRow[] = [
  {
    kind: "web",
    direction: "left",
    speed: 34,
    label: "Web apps, first row",
    shots: [
      { src: "jims-dashboard", project: JIMS, caption: "Pipeline dashboard" },
      { src: "radar-dashboard", project: RADAR, caption: "Weekly prospect dashboard" },
      { src: "jims-board", project: JIMS, caption: "Applicants by loan stage" },
      { src: "radar-prospects", project: RADAR, caption: "Prospect list" },
      { src: "leave-form", project: LEAVE, caption: "Leave credits and request form" },
      { src: "jims-drawer", project: JIMS, caption: "Applicant record and history" },
      { src: "radar-manage", project: RADAR, caption: "Runs, quota and AI spend" },
    ],
  },
  {
    kind: "phone",
    direction: "right",
    speed: 26,
    label: "Mobile views",
    shots: [
      { src: "jims-dashboard-phone", project: JIMS, caption: "Dashboard, mobile view" },
      { src: "radar-prospects-phone", project: RADAR, caption: "Prospects, mobile view" },
      { src: "leave-form-phone", project: LEAVE, caption: "Leave credits, mobile view" },
      { src: "jims-applicants-phone", project: JIMS, caption: "Applicants, mobile view" },
      { src: "radar-dashboard-phone", project: RADAR, caption: "Dashboard, mobile view" },
      { src: "leave-request-phone", project: LEAVE, caption: "Leave request, mobile view" },
      { src: "jims-calculator-phone", project: JIMS, caption: "Servicing result, mobile view" },
      { src: "radar-drawer-phone", project: RADAR, caption: "Company record, mobile view" },
      { src: "leave-email-phone", project: LEAVE, caption: "Email sign-in, mobile view" },
      { src: "jims-drawer-phone", project: JIMS, caption: "Applicant record, mobile view" },
      { src: "jims-permissions-phone", project: JIMS, caption: "Permissions, mobile view" },
      { src: "jims-login-phone", project: JIMS, caption: "Sign-in, mobile view" },
    ],
  },
  {
    kind: "web",
    direction: "left",
    speed: 42,
    label: "Web apps, second row",
    shots: [
      { src: "jims-calculator", project: JIMS, caption: "Servicing calculator" },
      { src: "radar-dnc", project: RADAR, caption: "Suspected competitors for review" },
      { src: "baifinance-home-chat", project: "CRM Sync & Inquiry Pipeline", caption: "Company website live chat" },
      { src: "jims-permissions", project: JIMS, caption: "Per-account permissions" },
      { src: "radar-drawer", project: RADAR, caption: "Company record" },
      { src: "baiacademy-register", project: "Audit Logging & Production Hardening", caption: "LMS registration flow" },
      { src: "jims-stages", project: JIMS, caption: "Stages mapped to the CRM" },
      { src: "baifinance-inquiry-form", project: "CRM Sync & Inquiry Pipeline", caption: "Website inquiry form" },
      { src: "jims-login", project: JIMS, caption: "Email code sign-in" },
    ],
  },
];
