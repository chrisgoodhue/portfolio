"use client";
// components/CaseStudyHero.tsx
import { motion } from "framer-motion";
import type { CaseStudy } from "@/types/case-study";

interface CaseStudyHeroProps {
  caseStudy: CaseStudy;
}

function HeroImagePlaceholder({
  caseStudy,
  className = "",
  style = {},
}: {
  caseStudy: CaseStudy;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        borderRadius: "4px",
        backgroundColor: `${caseStudy.themeColorDark}15`,
        border: `1px solid ${caseStudy.themeColorDark}33`,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <span
        className="text-label"
        style={{ color: `${caseStudy.themeColorDark}aa`, textAlign: "center" }}
      >
        Hero image placeholder
      </span>
    </div>
  );
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  return (
    <div
      className="relative w-full min-w-full flex flex-col min-h-0 lg:min-h-screen overflow-x-hidden pt-24 pb-16 pl-10 pr-10 lg:pr-0"
      style={{
        backgroundColor: caseStudy.themeColor,
        /* TODO: revisit right-edge white gap — 100vw + overflow tried; may need scrollbar-gutter, different unit, or browser-specific fix */
        width: "calc(100vw + 20px)",
        marginLeft: "calc(-50vw + 50%)",
      }}
    >
      {/* Desktop/tablet: square image anchored right, flush top/right/bottom. Height = 100% hero → width = height (1:1). */}
      <div
        className="hidden lg:block absolute top-0 right-0 bottom-0 left-0 pointer-events-none"
        aria-hidden
      >
        <div className="h-full w-full flex justify-end items-stretch">
          <motion.div
            className="h-full flex-shrink-0"
            style={{
              aspectRatio: "1 / 1",
              width: "auto",
              minWidth: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <HeroImagePlaceholder caseStudy={caseStudy} className="h-full w-full" />
          </motion.div>
        </div>
      </div>

      {/* Text block: left column on desktop (can overlap image); second on mobile */}
      <motion.div
        className="relative z-10 flex flex-col justify-end order-2 lg:order-none flex-1 min-w-0"
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

      {/* Mobile: hero image in flow, first in stack, 1:1 */}
      <motion.div
        className="order-1 w-full aspect-square lg:hidden mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <HeroImagePlaceholder caseStudy={caseStudy} className="h-full w-full" />
      </motion.div>
    </div>
  );
}
