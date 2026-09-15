import type { Metadata } from "next";
import { Instrument_Sans, Fraunces } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { asset, SITE_ORIGIN } from "@/lib/site";
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
  title: "Kyle Gregory Ibo — Automation & Systems Integration Engineer",
  description:
    "I build the automations, integrations, and backends that make businesses run themselves: n8n, CRM systems, REST APIs, and web apps that turn manual work into reliable systems.",
  keywords: [
    "automation engineer",
    "systems integration",
    "n8n",
    "GoHighLevel",
    "backend developer",
    "Supabase",
    "Next.js",
    "Kyle Gregory Ibo",
  ],
  authors: [{ name: "Kyle Gregory Ibo" }],
  // Absolute URLs are required by link scrapers; without metadataBase the share
  // card resolves to a relative path and no preview renders at all.
  metadataBase: new URL(SITE_ORIGIN),
  openGraph: {
    title: "Kyle Gregory Ibo — Automation & Systems Integration Engineer",
    description:
      "Automations, integrations, and backends that make businesses run themselves.",
    type: "website",
    url: asset("/"),
    siteName: "Kyle Gregory Ibo",
    images: [
      {
        url: asset("/assets/og.png"),
        width: 1200,
        height: 630,
        alt: "Kyle Gregory Ibo — Automation & Systems Integration Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyle Gregory Ibo — Automation & Systems Integration Engineer",
    description:
      "Automations, integrations, and backends that make businesses run themselves.",
    images: [asset("/assets/og.png")],
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
