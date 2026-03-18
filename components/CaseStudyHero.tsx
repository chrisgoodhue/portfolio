"use client";
// components/CaseStudyHero.tsx
import { motion } from "framer-motion";
import type { CaseStudy } from "@/types/case-study";

interface CaseStudyHeroProps {
  caseStudy: CaseStudy;
}

function ViewingExperienceCollage({
  caseStudy,
  className = "",
  style = {},
}: {
  caseStudy: CaseStudy;
  className?: string;
  style?: React.CSSProperties;
}) {
  // Defensive guard: this collage should only exist for the explicitly
  // "updated" version. This prevents stale conditional rendering.
  if (caseStudy.slug !== "vimeo-viewing-experience-updated") return null;

  const stroke = `${caseStudy.themeColorDark}33`;
  const bg = `${caseStudy.themeColorDark}15`;

  return (
    <div
      className={className}
      style={{
        borderRadius: "var(--radius-sm)",
        backgroundColor: bg,
        border: `1px solid ${stroke}`,
        overflow: "hidden",
        display: "block",
        position: "relative",
        pointerEvents: "none",
        ...style,
      }}
      aria-hidden
    >
      {/* Subtle looping “scan” line across the collage */}
      <motion.div
        style={{
          position: "absolute",
          left: "8%",
          top: "20%",
          width: "84%",
          height: "2px",
          background: `${caseStudy.themeColorDark}55`,
          opacity: 0.35,
          borderRadius: "999px",
          transformOrigin: "left center",
        }}
        animate={{ scaleX: [0.15, 1, 0.15] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Panels (private/public/showcase/feed) — slight staggered motion */}
      <motion.div
        style={{
          position: "absolute",
          left: "-4%",
          top: "10%",
          width: "56%",
          height: "42%",
          borderRadius: "var(--radius-sm)",
          backgroundColor: `${caseStudy.themeColorDark}22`,
          border: `1px solid ${stroke}`,
          transform: "rotate(-2deg)",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          padding: "0.85rem",
        }}
        animate={{ y: [0, -8, 0], rotate: [-2, -1.2, -2] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-label" style={{ color: "var(--color-paper)" }}>
          Private video page
        </span>
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          right: "-6%",
          top: "6%",
          width: "52%",
          height: "36%",
          borderRadius: "var(--radius-sm)",
          backgroundColor: `${caseStudy.themeColorDark}26`,
          border: `1px solid ${stroke}`,
          transform: "rotate(2deg)",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          padding: "0.85rem",
        }}
        animate={{ y: [0, -6, 0], x: [0, 4, 0], rotate: [2, 1.2, 2] }}
        transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      >
        <span className="text-label" style={{ color: "var(--color-paper)" }}>
          Public video page
        </span>
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          left: "6%",
          bottom: "-7%",
          width: "48%",
          height: "48%",
          borderRadius: "var(--radius-sm)",
          backgroundColor: `${caseStudy.themeColorDark}18`,
          border: `1px solid ${stroke}`,
          transform: "rotate(1deg)",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          padding: "0.85rem",
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
      >
        <span className="text-label" style={{ color: "var(--color-paper)" }}>
          Showcase
        </span>
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          right: "6%",
          bottom: "-4%",
          width: "52%",
          height: "42%",
          borderRadius: "var(--radius-sm)",
          backgroundColor: `${caseStudy.themeColorDark}20`,
          border: `1px solid ${stroke}`,
          transform: "rotate(-1deg)",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          padding: "0.85rem",
        }}
        animate={{ y: [0, 6, 0], x: [0, -3, 0] }}
        transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
      >
        <span className="text-label" style={{ color: "var(--color-paper)" }}>
          Feed
        </span>
      </motion.div>
    </div>
  );
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
        borderRadius: "var(--radius-sm)",
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
            {caseStudy.slug === "vimeo-viewing-experience-updated" ? (
              <ViewingExperienceCollage caseStudy={caseStudy} className="h-full w-full" />
            ) : (
              <HeroImagePlaceholder caseStudy={caseStudy} className="h-full w-full" />
            )}
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
            maxWidth: "56rem",
          }}
        >
          {caseStudy.title}
        </h1>

        <p
          className="mt-8 text-lg leading-relaxed"
          style={{
            color: `${caseStudy.themeColorDark}cc`,
            maxWidth: "37.5rem",
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
                style={{ color: `${caseStudy.themeColorDark}88`, maxWidth: "10.625rem" }}
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
        {caseStudy.slug === "vimeo-viewing-experience-updated" ? (
          <ViewingExperienceCollage caseStudy={caseStudy} className="h-full w-full" />
        ) : (
          <HeroImagePlaceholder caseStudy={caseStudy} className="h-full w-full" />
        )}
      </motion.div>
    </div>
  );
}
