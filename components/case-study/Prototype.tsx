"use client";
// components/case-study/Prototype.tsx
//
// The emphasized treatment reserved for the case study's most important
// asset: a tinted section, full-bleed media, and a numbered walkthrough of
// what the recording demonstrates.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/Container";
import { MediaFeature } from "./MediaFeature";
import { PullQuote } from "./PullQuote";
import type { PrototypeSectionData } from "@/types/narrative-case-study";

interface PrototypeProps {
  section: PrototypeSectionData;
  themeColor: string;
  themeColorDark: string;
}

export function Prototype({ section, themeColor, themeColorDark }: PrototypeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const mediaScale = section.mediaScale ?? "wide";
  const featured = mediaScale === "full-bleed";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        paddingTop: featured ? "clamp(4rem, 9vw, 7rem)" : "var(--space-14)",
        paddingBottom: featured ? "clamp(4rem, 9vw, 7rem)" : "var(--space-14)",
        backgroundColor: `${themeColor}0d`,
      }}
    >
      <Container>
        <p className="text-label mb-6" style={{ color: "var(--color-muted)" }}>
          {section.eyebrow}
        </p>
        <h2
          className="mb-8"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontSize: featured ? "clamp(2.5rem, 5vw, 4.25rem)" : "clamp(2rem, 4vw, 3.5rem)",
            color: "var(--color-ink)",
            maxWidth: "42rem",
          }}
        >
          {section.heading}
        </h2>
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

        {section.pullQuote && (
          <div className="mb-12">
            <PullQuote lines={section.pullQuote.lines} themeColor={themeColor} />
          </div>
        )}

        <MediaFeature
          media={section.media}
          caption={section.caption}
          themeColor={themeColor}
          themeColorDark={themeColorDark}
          scale={mediaScale}
          aspect="16/9"
        />

        {section.steps && section.steps.length > 0 && (
          <ol className="mt-10 grid gap-4 sm:grid-cols-2" style={{ listStyle: "none", padding: 0 }}>
            {section.steps.map((step, i) => (
              <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span className="text-label" style={{ color: themeColorDark, opacity: 0.6, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-ink)", lineHeight: 1.5 }}>{step}</span>
              </li>
            ))}
          </ol>
        )}
      </Container>
    </motion.div>
  );
}
