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
      className="w-full min-h-screen flex gap-8"
      style={{
        backgroundColor: caseStudy.themeColor,
        padding: "6rem 2.5rem 4rem",
      }}
    >
      {/* Left: text */}
      <motion.div
        className="flex flex-col justify-end flex-[3]"
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
        <div className="mt-10 flex flex-wrap gap-10">
          {caseStudy.outcomes.map((metric) => (
            <div key={metric.label}>
              <div
                className="text-metric"
                style={{
                  color: caseStudy.themeColorDark,
                  fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)",
                }}
              >
                {metric.value}
              </div>
              <div
                className="text-label mt-2"
                style={{ color: `${caseStudy.themeColorDark}88`, maxWidth: "170px" }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right: hero image placeholder */}
      <motion.div
        className="hidden lg:flex flex-[2]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "4px",
            backgroundColor: `${caseStudy.themeColorDark}15`,
            border: `1px solid ${caseStudy.themeColorDark}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Transparent PNG can be dropped here later */}
          <span
            className="text-label"
            style={{
              color: `${caseStudy.themeColorDark}aa`,
              textAlign: "center",
              padding: "1rem",
            }}
          >
            Hero image placeholder
          </span>
        </div>
      </motion.div>
    </div>
  );
}
