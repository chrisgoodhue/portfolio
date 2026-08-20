// app/case-studies/[slug]/page.tsx
// Server component — handles static generation.
// Passes initial case study so content is available on first paint (avoids client-only params delay).

import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import {
  narrativeCaseStudies,
  getNarrativeCaseStudyBySlug,
  getDetailedNarrativeCaseStudyBySlug,
} from "@/lib/narrative-case-studies";
import { CaseStudyClient } from "./CaseStudyClient";
import { NarrativeCaseStudyClient } from "@/components/case-study/NarrativeCaseStudyClient";

export function generateStaticParams() {
  const narrativeSlugs = narrativeCaseStudies.map((cs) => cs.slug);
  const narrativeSlugSet = new Set(narrativeSlugs);
  // A narrative portfolio entry shadows the legacy entry at the same slug
  // (e.g. Viewer Experience), so only include legacy slugs not already covered.
  const legacySlugs = caseStudies.map((cs) => cs.slug).filter((slug) => !narrativeSlugSet.has(slug));
  return [...narrativeSlugs, ...legacySlugs].map((slug) => ({ slug }));
}

export default function CaseStudyPage({ params }: { params: { slug: string | string[] } }) {
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  // Hard-remove this experimental duplicate from the site.
  if (slug === "vimeo-viewing-experience-updated") notFound();

  // Narrative system (Showcases, Viewer Experience) takes priority.
  // This route always serves the portfolio (condensed) presentation — the
  // detailed one lives at /case-studies/<slug>/full, whether that's a
  // narrative-detailed entry (Showcases) or the pre-existing legacy page
  // (Viewer Experience — see /full/page.tsx for that fallback).
  const narrativeCaseStudy = getNarrativeCaseStudyBySlug(slug);
  if (narrativeCaseStudy) {
    const hasDetailed = !!getDetailedNarrativeCaseStudyBySlug(slug) || !!getCaseStudyBySlug(slug);
    return (
      <NarrativeCaseStudyClient
        caseStudy={narrativeCaseStudy}
        detailedHref={hasDetailed ? `/case-studies/${slug}/full` : undefined}
      />
    );
  }

  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  return <CaseStudyClient initialCaseStudy={caseStudy} initialSlug={slug} />;
}
