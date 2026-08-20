"use client";
// app/case-studies/[slug]/CaseStudyClient.tsx
//
// Client component: handles all animation, store subscriptions, back nav.
// Rendered by the server page.tsx wrapper below.

import { useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseStudy, CaseStudySection as SectionData } from "@/types/case-study";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { useCaseStudyTransition } from "@/lib/useCaseStudyTransition";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/CaseStudySection";
import { Container } from "@/components/Container";

interface CaseStudyClientProps {
  initialCaseStudy?: CaseStudy | null;
  initialSlug?: string;
}

export function CaseStudyClient({ initialCaseStudy, initialSlug = "" }: CaseStudyClientProps = {}) {
  const params = useParams();
  const slugFromParams = typeof params?.slug === "string" ? params.slug : params?.slug?.[0] ?? "";
  const slug = slugFromParams || initialSlug;
  const caseStudy = getCaseStudyBySlug(slug) ?? initialCaseStudy ?? undefined;

  const pageRef = useRef<HTMLDivElement>(null);

  // Transition/back-nav behavior is shared with the narrative case-study
  // system via this hook — see lib/useCaseStudyTransition.ts.
  const { visible, handleBack } = useCaseStudyTransition({ hasContent: !!caseStudy });

  if (!caseStudy) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container>
          <p className="text-label" style={{ color: "var(--color-muted)" }}>
            Case study not found.
          </p>
        </Container>
      </main>
    );
  }

  const nonHeroSections = caseStudy.sections.filter((s) => s.type !== "hero");

  // Group subsections (e.g. approach-* and design-*) under their primary section
  const groupedSections: { section: SectionData; subsections?: SectionData[] }[] = (() => {
    const groups: { section: SectionData; subsections?: SectionData[] }[] = [];
    const canGroupTypes: Array<SectionData["type"]> = ["approach", "design"];

    for (let i = 0; i < nonHeroSections.length; i += 1) {
      const current = nonHeroSections[i] as SectionData;

      if (canGroupTypes.includes(current.type) && current.id === current.type) {
        const subsections: SectionData[] = [];
        let j = i + 1;

        while (j < nonHeroSections.length) {
          const next = nonHeroSections[j] as SectionData;
          if (next.type !== current.type || next.id === next.type) break;
          subsections.push(next);
          j += 1;
        }

        groups.push({ section: current, subsections });
        i = j - 1;
      } else {
        groups.push({ section: current });
      }
    }

    return groups;
  })();

  return (
    <>
      {/* Main content */}
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={pageRef}
            key="case-study-content"
            className="overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Hero — full viewport, theme color bg */}
            <CaseStudyHero
              themeColor={caseStudy.themeColor}
              themeColorDark={caseStudy.themeColorDark}
              eyebrow={`${caseStudy.company} — ${caseStudy.role} — ${caseStudy.year}`}
              title={caseStudy.title}
              description={caseStudy.summary}
              image={{ kind: "image", label: "Hero image placeholder", assetId: `${caseStudy.slug}-hero` }}
              metrics={caseStudy.outcomes}
              highlightTags={caseStudy.highlightTags}
            />

            {/* Body sections */}
            <div style={{ backgroundColor: "var(--color-paper)" }}>
              {groupedSections.map(({ section, subsections }, index) => (
                <div
                  key={section.id}
                  style={{
                    borderTop: index === 0 ? "none" : "1px solid var(--color-border)",
                  }}
                >
                  <CaseStudySection
                    section={section}
                    subsections={subsections}
                    themeColor={caseStudy.themeColor}
                    themeColorDark={caseStudy.themeColorDark}
                  />
                </div>
              ))}

              {/* Footer strip */}
              <div
                style={{
                  borderTop: "1px solid var(--color-border)",
                  padding: "var(--space-12) var(--space-10)",
                }}
              >
                <Container>
                  <div className="flex items-start justify-between flex-wrap gap-8">
                    <div>
                      <p className="text-label mb-2" style={{ color: "var(--color-muted)" }}>
                        Next
                      </p>
                      <button
                        onClick={handleBack}
                        className="text-label"
                        style={{ color: "var(--color-ink)", background: "none", border: "none", cursor: "pointer" }}
                      >
                        ← All work
                      </button>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p className="text-label" style={{ color: "var(--color-muted)" }}>
                        {caseStudy.company} — {caseStudy.year}
                      </p>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
