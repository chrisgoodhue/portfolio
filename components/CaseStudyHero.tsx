"use client";
// components/CaseStudyHero.tsx
import { motion } from "framer-motion";
import type { CaseStudy } from "@/types/case-study";

interface CaseStudyHeroProps {
  caseStudy: CaseStudy;
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  return (
    <div
      className="w-full min-h-screen flex flex-col justify-end"
      style={{ backgroundColor: caseStudy.themeColor, padding: "6rem 2.5rem 4rem" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <p
          className="text-label mb-6"
          style={{ color: `${caseStudy.themeColorDark}88` }}
        >
          {caseStudy.company} — {caseStudy.role} — {caseStudy.year}
        </p>

        <h1
          className="text-display"
          style={{
            color: caseStudy.themeColorDark,
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            maxWidth: "900px",
          }}
        >
          {caseStudy.title}
        </h1>

        <p
          className="mt-8 text-lg leading-relaxed"
          style={{
            color: `${caseStudy.themeColorDark}cc`,
            maxWidth: "600px",
          }}
        >
          {caseStudy.summary}
        </p>

        {/* Outcome metrics row */}
        <div className="mt-16 flex flex-wrap gap-12">
          {caseStudy.outcomes.map((metric) => (
            <div key={metric.label}>
              <div
                className="text-metric"
                style={{
                  color: caseStudy.themeColorDark,
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                }}
              >
                {metric.value}
              </div>
              <div
                className="text-label mt-2"
                style={{ color: `${caseStudy.themeColorDark}77`, maxWidth: "160px" }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
