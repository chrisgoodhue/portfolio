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
  const [returningSlug, setReturningSlug] = useState<string>("");

  // Detect when we're returning from a case study (content-fade-in phase)
  useEffect(() => {
    const unsub = transitionStore.subscribe(() => {
      const s = transitionStore.getState();
      if (s.phase === "content-fade-in") {
        setReturningSlug(s.slug);
      } else if (s.phase === "idle") {
        setReturningSlug("");
      }
    });
    return unsub;
  }, []);

  return (
    <motion.div
      className="grid gap-2 p-2"
      style={{
        gridTemplateColumns: "repeat(12, 1fr)",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card) => {
        const isReturning =
          (card.type === "case-study" && card.caseStudy?.slug === returningSlug) ||
          (card.type === "about" && returningSlug === "about");

        return (
          <motion.div
            key={card.id}
            variants={cardVariants}
            style={{
              gridColumn: `span ${card.colSpan ?? 6}`,
            }}
          >
            {card.type === "case-study" && card.caseStudy && (
              <CaseStudyCard
                caseStudy={card.caseStudy}
                colSpan={12} // already constrained by grid parent
                isAnimatingIn={isReturning}
              />
            )}
            {card.type === "about" && <AboutCard isAnimatingIn={isReturning} />}
            {/* Future card types plug in here */}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
