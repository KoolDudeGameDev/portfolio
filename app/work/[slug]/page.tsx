import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { work } from "@/content/work";
import { asset } from "@/lib/site";

// Every case study is exported as plain HTML at /work/<slug>/; nothing else exists.
export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) return {};
  const title = `${item.title} — Case study by Kyle Gregory Ibo`;
  // metadataBase is the origin only, so the base path has to be in every URL here.
  const url = asset(`/work/${slug}/`);
  // A page-level openGraph replaces the layout's whole object, so the share image is repeated.
  const og = { url: asset("/assets/og.png"), width: 1200, height: 630, alt: "Kyle Gregory Ibo — Full-Stack & Automations Developer" };
  return {
    title,
    description: item.value,
    alternates: { canonical: url },
    openGraph: { title, description: item.value, type: "article", url, siteName: "Kyle Gregory Ibo", images: [og] },
    twitter: { card: "summary_large_image", title, description: item.value, images: [og.url] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = work.findIndex((w) => w.slug === slug);
  if (index < 0) notFound();
  const prev = work[(index - 1 + work.length) % work.length];
  const next = work[(index + 1) % work.length];
  return (
    <>
      <Navbar />
      <main>
        <CaseStudy item={work[index]} prev={prev} next={next} />
      </main>
      <div className="ink ink-band">
        <Footer />
      </div>
    </>
  );
}
