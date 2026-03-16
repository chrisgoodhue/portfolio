"use client";
// components/CaseStudyCard.tsx
//
// Expansion sequence:
//   1. User clicks → records getBoundingClientRect()
//   2. Card content fades out (180ms)
//   3. transitionStore.beginExpand() → TransitionOverlay takes over
//
// Return sequence:
//   TransitionOverlay sets phase = "content-fade-in"
//   Card subscribes → starts its own fade-in

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/types/case-study";
import { transitionStore } from "@/lib/transition-store";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  isAnimatingIn?: boolean;
}

export function CaseStudyCard({ caseStudy, isAnimatingIn = false }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [contentVisible, setContentVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Subscribe to transition store — handles the return journey
  useEffect(() => {
    return transitionStore.subscribe(() => {
      const s = transitionStore.getState();
      // Only respond to events for this specific card
      if (s.slug !== caseStudy.slug) return;

      if (s.phase === "content-fade-in") {
        // Overlay has finished shrinking; short delay then fade content in
        setTimeout(() => setContentVisible(true), 100);
      }
      if (s.phase === "idle") {
        setContentVisible(true);
      }
    });
  }, [caseStudy.slug]);

  // If returning to this specific card (prop-driven, set by CardGrid)
  useEffect(() => {
    if (isAnimatingIn) {
      setContentVisible(false);
    }
  }, [isAnimatingIn]);

  const handleClick = useCallback(() => {
    if (!cardRef.current) return;
    if (transitionStore.getState().phase !== "idle") return;

    const rect = cardRef.current.getBoundingClientRect();
    setContentVisible(false);

    transitionStore.beginExpand(
      { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      caseStudy.themeColor,
      caseStudy.slug
    );
  }, [caseStudy.themeColor, caseStudy.slug]);

  return (
    <div
      ref={cardRef}
      data-card-slug={caseStudy.slug}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
      tabIndex={0}
      aria-label={`Open case study: ${caseStudy.title}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "520px",
        backgroundColor: caseStudy.themeColor,
        borderRadius: "2px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Subtle scale on hover — container only, not content */}
      <motion.div
        animate={{ scale: hovered ? 1.012 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Content layer — fades out on click, in on return */}
        <motion.div
          animate={{ opacity: contentVisible ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          {/* ── Image placeholder ── */}
          <div
            style={{
              flex: 1,
              borderRadius: "2px",
              backgroundColor: `${caseStudy.themeColorDark}18`,
              marginBottom: "2rem",
              minHeight: "160px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Decorative grid overlay */}
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id={`grid-${caseStudy.slug}`} width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={caseStudy.themeColorDark} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${caseStudy.slug})`} />
            </svg>

            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: caseStudy.themeColorDark,
                opacity: 0.08,
                userSelect: "none",
              }}
            >
              {caseStudy.company}
            </span>

            {/* Replace the above with next/image when real images are ready:
            <Image src={caseStudy.coverImage} alt={caseStudy.title} fill style={{ objectFit: "cover" }} /> */}
          </div>

          {/* ── Bottom: meta + metrics ── */}
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <p
                className="text-label"
                style={{ color: `${caseStudy.themeColorDark}77`, marginBottom: "0.75rem" }}
              >
                {caseStudy.company} — {caseStudy.year}
              </p>
              <h2
                className="text-display"
                style={{
                  color: caseStudy.themeColorDark,
                  fontSize: "clamp(1.375rem, 2.5vw, 2rem)",
                  lineHeight: 1.05,
                  marginBottom: "0.75rem",
                }}
              >
                {caseStudy.title}
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  color: `${caseStudy.themeColorDark}99`,
                  maxWidth: "460px",
                }}
              >
                {caseStudy.summary}
              </p>
            </div>

            {/* Metrics row */}
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {caseStudy.outcomes.slice(0, 3).map((metric) => (
                <div key={metric.label}>
                  <div
                    className="text-metric"
                    style={{
                      color: caseStudy.themeColorDark,
                      fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    className="text-label"
                    style={{
                      color: `${caseStudy.themeColorDark}66`,
                      marginTop: "0.25rem",
                      maxWidth: "110px",
                      lineHeight: 1.3,
                    }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Arrow indicator — slides in on hover */}
      <motion.div
        animate={{
          opacity: contentVisible ? (hovered ? 1 : 0.4) : 0,
          x: hovered ? 0 : -4,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 4vw, 2.5rem)",
          right: "clamp(1.5rem, 4vw, 2.5rem)",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          backgroundColor: `${caseStudy.themeColorDark}1a`,
          border: `1px solid ${caseStudy.themeColorDark}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7H11.5M11.5 7L7 2.5M11.5 7L7 11.5"
            stroke={caseStudy.themeColorDark}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
