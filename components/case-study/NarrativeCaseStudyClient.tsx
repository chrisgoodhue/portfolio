"use client";
// components/case-study/NarrativeCaseStudyClient.tsx
//
// Page shell for the narrative case-study system. Mirrors the legacy
// CaseStudyClient's transition/back-nav behavior exactly (via the shared
// useCaseStudyTransition hook) but composes the richer section components
// directly instead of routing everything through one polymorphic renderer.

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCaseStudyTransition } from "@/lib/useCaseStudyTransition";
import { Container } from "@/components/Container";
import { CaseStudyHero } from "./CaseStudyHero";
import { NarrativeSection } from "./NarrativeSection";
import { Comparison } from "./Comparison";
import { Prototype } from "./Prototype";
import { Outcome } from "./Outcome";
import { Metrics } from "./Metrics";
import { Reflection } from "./Reflection";
import { ClosingStatement } from "./ClosingStatement";
import { NextProject } from "./NextProject";
import type { NarrativeCaseStudy, NarrativeCaseStudySection } from "@/types/narrative-case-study";

interface NarrativeCaseStudyClientProps {
  caseStudy: NarrativeCaseStudy;
  /** When provided, renders a small link to the full/deep-dive presentation of this project. Omitted on the detailed presentation itself. */
  detailedHref?: string;
}

export function NarrativeCaseStudyClient({ caseStudy, detailedHref }: NarrativeCaseStudyClientProps) {
  const { visible, handleBack } = useCaseStudyTransition({ hasContent: true });

  // Hero's metric row is sliced directly from this page's own Metrics
  // section (when it has one) — same "can't drift out of sync" trick
  // already used for the homepage card's metrics.
  const metricsSection = caseStudy.sections.find(
    (s): s is Extract<NarrativeCaseStudySection, { type: "metrics" }> => s.type === "metrics",
  );
  const heroMetrics = metricsSection?.items.slice(0, 4).map((m) => ({ value: m.value, label: m.label }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="narrative-case-study-content"
          className="overflow-x-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <CaseStudyHero
            themeColor={caseStudy.themeColor}
            themeColorDark={caseStudy.themeColorDark}
            eyebrow={`${caseStudy.company} — ${caseStudy.role} — ${caseStudy.year}`}
            title={caseStudy.title}
            subtitle={caseStudy.subtitle}
            description={caseStudy.description}
            image={caseStudy.heroImage}
            metrics={heroMetrics}
            highlightTags={caseStudy.cardHighlights}
            team={caseStudy.team}
          />

          <div style={{ backgroundColor: "var(--color-paper)" }}>
            {caseStudy.sections.map((section) => {
              switch (section.type) {
                case "narrative":
                  return (
                    <div key={section.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                      <NarrativeSection
                        section={section}
                        themeColor={caseStudy.themeColor}
                        themeColorDark={caseStudy.themeColorDark}
                      />
                    </div>
                  );
                case "comparison":
                  return (
                    <div key={section.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                      <Comparison
                        section={section}
                        themeColor={caseStudy.themeColor}
                        themeColorDark={caseStudy.themeColorDark}
                      />
                    </div>
                  );
                case "prototype":
                  return (
                    <div key={section.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                      <Prototype
                        section={section}
                        themeColor={caseStudy.themeColor}
                        themeColorDark={caseStudy.themeColorDark}
                      />
                    </div>
                  );
                case "outcome":
                  return (
                    <div key={section.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                      <Outcome section={section} />
                    </div>
                  );
                case "metrics":
                  return (
                    <div key={section.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                      <Metrics
                        section={section}
                        themeColor={caseStudy.themeColor}
                        themeColorDark={caseStudy.themeColorDark}
                      />
                    </div>
                  );
                case "reflection":
                  return (
                    <div key={section.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                      <Reflection section={section} />
                    </div>
                  );
                default:
                  return null;
              }
            })}

            {caseStudy.closingStatement && (
              <div style={{ borderTop: "1px solid var(--color-border)" }}>
                <ClosingStatement statement={caseStudy.closingStatement} />
              </div>
            )}

            <NextProject
              href={`/case-studies/${caseStudy.nextProject.slug}`}
              title={caseStudy.nextProject.title}
              company={caseStudy.nextProject.company}
              themeColor={caseStudy.nextProject.themeColor}
              themeColorDark={caseStudy.nextProject.themeColorDark}
            />

            {/* Footer strip — matches legacy CaseStudyClient's footer exactly, plus an optional link to the full case study */}
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
                      Back
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
                    {detailedHref && (
                      <Link href={detailedHref} className="text-label" style={{ color: "var(--color-ink)", display: "block", marginBottom: "0.75rem" }}>
                        Full case study →
                      </Link>
                    )}
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
  );
}
