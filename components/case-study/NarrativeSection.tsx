"use client";
// components/case-study/NarrativeSection.tsx
//
// The workhorse of the story: eyebrow + heading + short body, optionally
// followed by an emphasized pull-quote, a bolded key-takeaway line, and/or
// one or more MediaFeature beats (sequential media moments).
//
// Two rhythm levers, used sparingly and only where the content calls for
// it (most sections use neither):
//   - `mediaFirst`: the first beat leads, heading/body follow as a short
//     explanation rather than a setup — for sections where the visual
//     communicates most of the idea.
//   - `compact`: smaller heading, tighter vertical rhythm — for a
//     deliberately quick beat, not a major statement.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/Container";
import { MediaFeature } from "./MediaFeature";
import { PullQuote } from "./PullQuote";
import type { NarrativeSectionData } from "@/types/narrative-case-study";

interface NarrativeSectionProps {
  section: NarrativeSectionData;
}

export function NarrativeSection({ section }: NarrativeSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const compact = !!section.compact;
  const mediaFirst = !!section.mediaFirst;

  const textBlock = (
    <>
      <h2
        className={`section-heading ${mediaFirst ? "mt-10 mb-6" : "mb-8"}`}
        style={{
          fontSize: compact ? "clamp(1.6rem, 3vw, 2.25rem)" : undefined,
          color: "var(--color-ink)",
          maxWidth: "42rem",
        }}
      >
        {section.heading}
      </h2>

      <p
        className="leading-relaxed"
        style={{
          fontSize: "var(--text-body)",
          color: "var(--color-ink)",
          maxWidth: "42.5rem",
          whiteSpace: "pre-wrap",
        }}
      >
        {section.body}
      </p>

      {section.pullQuote && (
        <div className="mt-10">
          <PullQuote lines={section.pullQuote.lines} attribution={section.pullQuote.attribution} />
        </div>
      )}

      {section.keyTakeaway && (
        <p
          className="text-display-italic mt-10"
          style={{ color: "var(--color-ink)", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", maxWidth: "38rem" }}
        >
          {section.keyTakeaway}
        </p>
      )}
    </>
  );

  const mediaBlock = section.beats && section.beats.length > 0 && (
    <div className={mediaFirst ? "space-y-12" : "mt-12 space-y-12"}>
      {section.beats.map((beat, i) => (
        <div key={i}>
          {beat.heading && (
            <h3
              className="subsection-heading mb-6"
              style={{ color: "var(--color-ink)" }}
            >
              {beat.heading}
            </h3>
          )}
          {beat.body && (
            <p
              className="leading-relaxed mb-6"
              style={{
                fontSize: "var(--text-body)",
                color: "var(--color-ink)",
                maxWidth: "42.5rem",
                whiteSpace: "pre-wrap",
              }}
            >
              {beat.body}
            </p>
          )}
          <MediaFeature
            media={beat.media}
            caption={beat.caption}
            scale={beat.scale ?? "wide"}
          />
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        paddingTop: compact ? "var(--space-11)" : "var(--space-14)",
        paddingBottom: compact ? "var(--space-11)" : "var(--space-14)",
      }}
    >
      <Container>
        <p className="text-label mb-6" style={{ color: "var(--color-muted)" }}>
          {section.eyebrow}
        </p>

        {mediaFirst ? (
          <>
            {mediaBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {mediaBlock}
          </>
        )}
      </Container>
    </motion.div>
  );
}
