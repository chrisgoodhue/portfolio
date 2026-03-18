"use client";
// components/CardGrid.tsx
//
// Renders the homepage editorial grid.
// Uses a 12-column CSS grid; each card declares its colSpan.
// New card types can be dropped in by extending the GridCard union.

import { motion } from "framer-motion";
import type { GridCard } from "@/types/case-study";
import { CaseStudyCard } from "./CaseStudyCard";
import { AboutCard } from "./AboutCard";
import { useEffect, useState } from "react";
import { transitionStore } from "@/lib/transition-store";

interface CardGridProps {
  cards: GridCard[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CardGrid({ cards }: CardGridProps) {
  const [returningSlug, setReturningSlug] = useState<string>(() => {
    const s = transitionStore.getState();
    // If the user navigated back while the overlay is still shrinking,
    // hide the returning card content on first paint to avoid flashes.
    if (s.phase === "shrinking" || s.phase === "content-fade-in") return s.slug;
    return "";
  });
  const [returningRequestId, setReturningRequestId] = useState<number | null>(() => {
    const s = transitionStore.getState();
    if (s.phase === "shrinking" || s.phase === "content-fade-in") return s.requestId;
    return null;
  });
  const [enableGridEnterAnim, setEnableGridEnterAnim] = useState<boolean>(() => {
    return transitionStore.getState().phase === "idle";
  });

  // Detect when we're returning from a case study (content-fade-in phase)
  useEffect(() => {
    const unsub = transitionStore.subscribe(() => {
      const s = transitionStore.getState();
      if (s.phase === "idle") {
        setReturningSlug("");
        setReturningRequestId(null);
        setEnableGridEnterAnim(true);
        return;
      }

      // During return to home, hide the returning card content immediately
      // (before overlay finishes shrinking) so the back animation matches the
      // hero text cadence.
      if (s.phase === "shrinking" || s.phase === "content-fade-in") {
        setReturningSlug(s.slug);
        setReturningRequestId(s.requestId);
      }

      // Avoid outer grid "enter" slide while overlay is in control.
      setEnableGridEnterAnim(false);
    });
    return unsub;
  }, []);

  return (
    <motion.div
      className="home-card-grid"
      variants={containerVariants}
      initial={enableGridEnterAnim ? "hidden" : "visible"}
      animate="visible"
      style={{
        padding: "var(--space-5)",
        columnGap: "var(--space-5)",
        rowGap: "var(--space-5)",
      }}
    >
      {cards.map((card) => {
        const isReturning =
          (card.type === "case-study" && card.caseStudy?.slug === returningSlug) ||
          (card.type === "about" && returningSlug === "about");
        const shouldAnimateIn = isReturning && returningRequestId != null;

        const isFeatured = card.id === "featured";
        const baseSpan = card.colSpan ?? 6;
        const span2xl = card.colSpan2xl ?? baseSpan;
        return (
          <motion.div
            key={card.id}
            variants={cardVariants}
            className="home-card-item"
            style={{
              ["--span-base" as any]: baseSpan,
              ["--span-2xl" as any]: span2xl,
              alignSelf: isFeatured ? "start" : "stretch",
              display: "flex",
              minHeight: isFeatured ? undefined : "max(320px, min-content)",
              // No height: 100% — let row size from content, then items stretch to equal height
            }}
          >
            {card.type === "case-study" && card.caseStudy && (
              <CaseStudyCard
                caseStudy={card.caseStudy}
                isAnimatingIn={shouldAnimateIn}
                returnRequestId={returningRequestId}
                fitHeightToContent={isFeatured}
              />
            )}
            {card.type === "about" && (
              <AboutCard isAnimatingIn={shouldAnimateIn} returnRequestId={returningRequestId} />
            )}
            {/* Future card types plug in here */}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
