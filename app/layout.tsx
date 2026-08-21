import type { Metadata } from "next";
import { Instrument_Sans, Fraunces } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

// A grotesque with drawn personality rather than a neutral UI face — on a
// palette with no color, the type carries the design, and it has to stand
// next to Fraunces without disappearing.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kyle Gregory Ibo — AI Automation & Systems Engineer",
  description:
    "I build the AI automations, integrations, and backends that make businesses run themselves — n8n workflows, CRM systems, REST APIs, and web apps that turn manual work into reliable systems.",
  keywords: [
    "AI automation",
    "AI workflow automation",
    "automation engineer",
    "systems integration",
    "n8n",
    "workflow automation",
    "API integration",
    "GoHighLevel",
    "backend developer",
    "Supabase",
    "Next.js",
    "Kyle Gregory Ibo",
  ],
  authors: [{ name: "Kyle Gregory Ibo" }],
  openGraph: {
    title: "Kyle Gregory Ibo — AI Automation & Systems Engineer",
    description:
      "Automations, integrations, and backends that make businesses run themselves.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSans.variable} ${fraunces.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
