// app/case-studies/[slug]/page.tsx
// Server component — handles static generation.
// Passes initial case study so content is available on first paint (avoids client-only params delay).

import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { CaseStudyClient } from "./CaseStudyClient";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default function CaseStudyPage({ params }: { params: { slug: string | string[] } }) {
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  const caseStudy = getCaseStudyBySlug(slug);
  return <CaseStudyClient initialCaseStudy={caseStudy} initialSlug={slug} />;
}
