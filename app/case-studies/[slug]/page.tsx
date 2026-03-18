// app/case-studies/[slug]/page.tsx
// Server component — handles static generation.
// Passes initial case study so content is available on first paint (avoids client-only params delay).

import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { CaseStudyClient } from "./CaseStudyClient";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default function CaseStudyPage({ params }: { params: { slug: string | string[] } }) {
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  // Hard-remove this experimental duplicate from the site.
  if (slug === "vimeo-viewing-experience-updated") notFound();

  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  return <CaseStudyClient initialCaseStudy={caseStudy} initialSlug={slug} />;
}
