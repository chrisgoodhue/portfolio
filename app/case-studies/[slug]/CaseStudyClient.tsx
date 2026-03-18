"use client";
// app/case-studies/[slug]/CaseStudyClient.tsx
//
// Client component: handles all animation, store subscriptions, back nav.
// Rendered by the server page.tsx wrapper below.

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseStudy, CaseStudySection as SectionData } from "@/types/case-study";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { transitionStore } from "@/lib/transition-store";
import { CaseStudyHero } from "@/components/CaseStudyHero";
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

  // Show content immediately when we have server-provided data (avoids blank state until client hydrates)
  const [visible, setVisible] = useState(() => !!initialCaseStudy);
  const [isLeaving, setIsLeaving] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const fadeRequestedRef = useRef(false);

  // Helper: show content then after paint tell overlay to fade (so no background flash)
  const showContentAndRequestOverlayFade = useCallback(() => {
    setVisible(true);
    transitionStore.setPhase("page-fade-in");
    if (fadeRequestedRef.current) return;

    // Capture the requestId for this navigation so stale pages can't
    // accidentally fade the overlay during a newer transition.
    const currentRequestId = transitionStore.getState().requestId;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (fadeRequestedRef.current) return;
        fadeRequestedRef.current = true;
        transitionStore.requestOverlayFadeOut(currentRequestId);
      });
    });
  }, []);

  // ── Fade in after overlay expansion ──────────────────────────────────────
  useEffect(() => {
    if (!caseStudy) return;

    const ts = transitionStore.getState();

    // Direct navigation or refresh: show immediately (no overlay to fade)
    if (ts.phase === "idle" || ts.phase === "page-fade-in") {
      setVisible(true);
      return;
    }

    // Coming via card click: wait for "expanded" phase
    const unsub = transitionStore.subscribe(() => {
      const s = transitionStore.getState();
      if (s.phase === "expanded") {
        requestAnimationFrame(() => showContentAndRequestOverlayFade());
      }
    });

    // Already expanded by the time this effect runs
    if (ts.phase === "expanded") {
      requestAnimationFrame(() => showContentAndRequestOverlayFade());
    }

    return unsub;
  }, [caseStudy, showContentAndRequestOverlayFade]);

  // Lock body scroll during transition
  useEffect(() => {
    const ts = transitionStore.getState();
    if (ts.phase !== "idle" && ts.phase !== "page-fade-in") {
      document.body.classList.add("is-transitioning");
    }
    return () => {
      document.body.classList.remove("is-transitioning");
    };
  }, []);

  // ── Back navigation ───────────────────────────────────────────────────────
  const handleBack = useCallback(async () => {
    if (isLeaving) return;
    setIsLeaving(true);

    // Step 1: fade out page content
    setVisible(false);

    // Wait for fade-out (400ms matches exit transition below)
    await new Promise((r) => setTimeout(r, 400));

    // Step 2: hand off to overlay to shrink back
    // We stored the card rect in the transition store when we began the expand.
    const storedRect = transitionStore.getState().rect;

    const collapseRect = storedRect ?? {
      top: 100,
      left: 80,
      width: Math.min(window.innerWidth * 0.65, 800),
      height: 520,
    };

    const collapse = (window as any).__portfolioCollapse;
    if (typeof collapse === "function") {
      await collapse(collapseRect);
    }

    setIsLeaving(false);
  }, [isLeaving]);

  // Handle browser back button
  useEffect(() => {
    const onPopState = () => handleBack();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [handleBack]);

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
      {/* Back button — always rendered above the animated content */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="back-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: "1.5rem",
              left: "1.5rem",
              zIndex: 200,
            }}
          >
            <button
              onClick={handleBack}
              className="text-label flex items-center gap-2"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: `${caseStudy.themeColorDark}aa`,
                padding: "0.5rem 0",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13 8H3M3 8L8 3M3 8L8 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
            <CaseStudyHero caseStudy={caseStudy} />

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
                  padding: "4rem 2.5rem",
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
