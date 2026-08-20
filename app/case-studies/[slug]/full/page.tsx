// app/case-studies/[slug]/full/page.tsx
//
// The detailed/deep-dive presentation of a narrative case study — reachable
// by direct link (and from a "Full case study →" link on the portfolio
// version) but not linked from primary navigation.
//
// Two ways a slug can resolve here:
//   1. A detailed presentation built in the new narrative system
//      (currently just Showcases) — rendered via NarrativeCaseStudyClient,
//      same shell as the portfolio route.
//   2. A slug whose primary route is now shadowed by a narrative PORTFOLIO
//      entry, but whose "detailed" version is still the pre-existing legacy
//      case-study page (currently Viewer Experience) — rendered via the
//      legacy CaseStudyClient, completely unchanged, just relocated here.
// A legacy entry only gets a /full route if a narrative portfolio entry
// exists at the same slug — otherwise its primary route already shows this
// exact content, and a duplicate /full route would be pointless.

import { notFound } from "next/navigation";
import {
  getDetailedNarrativeCaseStudyBySlug,
  detailedNarrativeCaseStudySlugs,
  getNarrativeCaseStudyBySlug,
} from "@/lib/narrative-case-studies";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { NarrativeCaseStudyClient } from "@/components/case-study/NarrativeCaseStudyClient";
import { CaseStudyClient } from "../CaseStudyClient";

export function generateStaticParams() {
  const narrativeDetailedSlugs = detailedNarrativeCaseStudySlugs();
  const shadowedLegacySlugs = caseStudies
    .map((cs) => cs.slug)
    .filter((slug) => !!getNarrativeCaseStudyBySlug(slug) && !narrativeDetailedSlugs.includes(slug));
  return [...narrativeDetailedSlugs, ...shadowedLegacySlugs].map((slug) => ({ slug }));
}

export default function CaseStudyFullPage({ params }: { params: { slug: string | string[] } }) {
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";

  const narrativeDetailed = getDetailedNarrativeCaseStudyBySlug(slug);
  if (narrativeDetailed) {
    return <NarrativeCaseStudyClient caseStudy={narrativeDetailed} />;
  }

  // Legacy fallback — only meaningful when this slug's primary route has
  // been shadowed by a narrative portfolio entry (see routing note above).
  if (getNarrativeCaseStudyBySlug(slug)) {
    const legacy = getCaseStudyBySlug(slug);
    if (legacy) {
      return <CaseStudyClient initialCaseStudy={legacy} initialSlug={slug} />;
    }
  }

  notFound();
}
