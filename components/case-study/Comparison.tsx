"use client";
// components/case-study/Comparison.tsx
//
// A labeled before/after treatment. For Showcases the before and after
// states are demonstrated by a single asset (the transition itself is the
// point), so both labels sit alongside one MediaFeature rather than two.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/Container";
import { MediaFeature } from "./MediaFeature";
import type { ComparisonSectionData } from "@/types/narrative-case-study";

interface ComparisonProps {
  section: ComparisonSectionData;
}

export function Comparison({ section }: ComparisonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ paddingTop: "var(--space-14)", paddingBottom: "var(--space-14)" }}
    >
      <Container>
        <p className="text-label mb-6" style={{ color: "var(--color-muted)" }}>
          {section.eyebrow}
        </p>
        <h2
          className="section-heading mb-8"
          style={{ color: "var(--color-ink)", maxWidth: "42rem" }}
        >
          {section.heading}
        </h2>
        {section.body && (
          <p
            className="leading-relaxed mb-10"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-ink)",
              maxWidth: "42.5rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {section.body}
          </p>
        )}

        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <span
            className="text-label"
            style={{
              color: "var(--color-muted)",
              border: "1px solid var(--color-border)",
              borderRadius: "999px",
              padding: "0.35rem 0.75rem",
            }}
          >
            {section.beforeLabel}
          </span>
          <span aria-hidden style={{ color: "var(--color-muted)" }}>
            →
          </span>
          <span
            className="text-label"
            style={{
              color: "var(--color-ink)",
              border: "1px solid rgba(10, 10, 10, 0.25)",
              borderRadius: "999px",
              padding: "0.35rem 0.75rem",
            }}
          >
            {section.afterLabel}
          </span>
        </div>

        <MediaFeature
          media={section.media}
          caption={section.caption}
          scale="wide"
        />

        {section.secondaryBeat && (
          <div className="mt-14">
            <p className="text-label mb-6" style={{ color: "var(--color-muted)" }}>
              Also considered
            </p>
            {section.secondaryBeat.body && (
              <p
                className="leading-relaxed mb-6"
                style={{ fontSize: "var(--text-body)", color: "var(--color-ink)", maxWidth: "42.5rem", whiteSpace: "pre-wrap" }}
              >
                {section.secondaryBeat.body}
              </p>
            )}
            <MediaFeature
              media={section.secondaryBeat.media}
              caption={section.secondaryBeat.caption}
              scale={section.secondaryBeat.scale ?? "contained"}
            />
          </div>
        )}
      </Container>
    </motion.div>
  );
}
