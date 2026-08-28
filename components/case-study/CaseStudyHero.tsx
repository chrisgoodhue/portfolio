"use client";
// components/case-study/CaseStudyHero.tsx
//
// The ONE hero for the whole site — both the legacy case-study shell and
// the narrative one render through this component. It intentionally takes
// a plain, domain-agnostic prop shape (not `CaseStudy` or `NarrativeCaseStudy`
// directly) so neither system has to be reshaped to fit the other; each
// call site passes the handful of primitives this needs.
//
// Full-viewport height, text anchored to the bottom of the block (an
// editorial/poster convention, not a typical centered hero), and a 1:1
// image flush to the edge sized by the hero's own height — the original
// design this site used before the narrative system's more restrained,
// type-only hero. Restored because that square panel + bottom-anchored
// text combination is what made the original distinctive.
//
// The bottom row is mutually exclusive: quantified `metrics` (real
// supplied numbers) win when present; otherwise `highlightTags` (the same
// non-numeric pill pattern already used on the homepage card) fill the
// same slot. Neither is fabricated here — both are passed in by the caller.

import { motion } from "framer-motion";
import { MediaPlaceholder } from "./MediaPlaceholder";
import type { MediaPlaceholderData } from "@/types/narrative-case-study";

interface HeroMetric {
  value: string;
  label: string;
}

interface CaseStudyHeroProps {
  themeColor: string;
  themeColorDark: string;
  eyebrow: string;
  title: string;
  /** Narrative-only italic line between title and description. */
  subtitle?: string;
  description: string;
  image: MediaPlaceholderData;
  /** Quantified outcomes — takes precedence over `highlightTags` when present. */
  metrics?: HeroMetric[];
  /** Non-numeric highlight phrases — shown when there's nothing to quantify. */
  highlightTags?: string[];
  /** Narrative-only. Rendered as a quiet closing line, bookending the eyebrow at the top. */
  team?: string;
  /**
   * When false, renders as a normal block instead of breaking out to full viewport width at lg+.
   * Defaults to true (real case-study usage). The components showcase page passes false so the
   * hero sits inside its bordered preview frame instead of escaping it.
   */
  fullBleed?: boolean;
}

export function CaseStudyHero({
  themeColor,
  themeColorDark,
  eyebrow,
  title,
  subtitle,
  description,
  image,
  metrics,
  highlightTags,
  team,
  fullBleed = true,
}: CaseStudyHeroProps) {
  const hasMetrics = !!metrics && metrics.length > 0;
  const hasTags = !hasMetrics && !!highlightTags && highlightTags.length > 0;

  return (
    <div
      className={[
        "relative flex w-full min-w-0 max-w-full flex-col overflow-x-hidden",
        fullBleed ? "min-h-0 lg:min-h-screen" : "min-h-0 lg:min-h-[32rem]",
        /* Match Container: px-6 / md:px-10 */
        "px-[var(--space-8)] md:px-[var(--space-10)]",
        fullBleed ? "lg:pl-[var(--space-10)] lg:pr-0" : "lg:px-[var(--space-10)]",
        "pt-[var(--space-14)] pb-[var(--space-12)]",
        /* Full-bleed breakout only at lg+, and only when not previewed in a contained frame */
        fullBleed ? "lg:w-[calc(100vw+20px)] lg:ml-[calc(-50vw+50%)]" : "",
      ].filter(Boolean).join(" ")}
      style={{ backgroundColor: themeColor }}
    >
      {/* Desktop/tablet: square image anchored right, flush top/right/bottom. Height = 100% hero → width = height (1:1). */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 left-0 pointer-events-none" aria-hidden>
        <div className="h-full w-full flex justify-end items-stretch">
          <motion.div
            className="h-full flex-shrink-0"
            style={{ aspectRatio: "1 / 1", width: "auto", minWidth: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <MediaPlaceholder data={image} aspect="1/1" />
          </motion.div>
        </div>
      </div>

      {/* Text block: left column on desktop (can overlap image); second on mobile. Anchored to the bottom of the full-height block. */}
      <motion.div
        className="relative z-10 flex flex-col justify-end order-2 lg:order-none flex-1 min-w-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <p className="text-label mb-[var(--space-8)]" style={{ color: themeColorDark }}>
          {eyebrow}
        </p>

        <h1
          className="text-display"
          style={{ color: themeColorDark, fontSize: "clamp(2.5rem, 7vw, 6rem)", maxWidth: "56rem" }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="text-display-italic mt-[var(--space-7)]"
            style={{ color: themeColorDark, fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", maxWidth: "42rem" }}
          >
            {subtitle}
          </p>
        )}

        <p
          className="mt-[var(--space-8)] text-lg leading-relaxed"
          style={{ color: themeColorDark, maxWidth: "37.5rem" }}
        >
          {description}
        </p>

        {hasMetrics && (
          <div className="mt-[var(--space-10)] flex flex-wrap gap-[var(--space-10)]">
            {metrics!.map((metric) => (
              <div key={metric.label}>
                <div
                  className="text-metric"
                  style={{ color: themeColorDark, fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)" }}
                >
                  {metric.value}
                </div>
                <div
                  className="text-label mt-[var(--space-4)]"
                  style={{ color: themeColorDark, maxWidth: "10.625rem" }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {hasTags && (
          <div className="mt-[var(--space-10)]" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {highlightTags!.map((tag) => (
              <span
                key={tag}
                className="text-label"
                style={{
                  color: themeColorDark,
                  border: `1px solid ${themeColorDark}33`,
                  borderRadius: "999px",
                  padding: "0.35rem 0.75rem",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {team && (
          <p className="text-label mt-[var(--space-8)]" style={{ color: themeColorDark }}>
            Team: {team}
          </p>
        )}
      </motion.div>

      {/* Mobile: hero image in flow, first in stack, 1:1 */}
      <motion.div
        className="order-1 w-full aspect-square lg:hidden mb-[var(--space-9)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <MediaPlaceholder data={image} aspect="1/1" />
      </motion.div>
    </div>
  );
}
