"use client";
// components/CaseStudySection.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { CaseStudySection as SectionData } from "@/types/case-study";
import { Container } from "./Container";

interface Props {
  section: SectionData;
  themeColor: string;
  themeColorDark: string;
}

export function CaseStudySection({ section, themeColor, themeColorDark }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-24"
    >
      <Container>
        {/* Section label */}
        <p className="text-label mb-6" style={{ color: "var(--color-muted)" }}>
          {section.type.toUpperCase()}
        </p>

        {/* Title */}
        {section.title && (
          <h2
            className="text-display mb-10"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--color-ink)" }}
          >
            {section.title}
          </h2>
        )}

        {/* Quote */}
        {section.quote && (
          <blockquote className="mb-12">
            <p
              className="text-display-italic"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                color: "var(--color-ink)",
                borderLeft: `3px solid ${themeColor}`,
                paddingLeft: "2rem",
              }}
            >
              &ldquo;{section.quote.text}&rdquo;
            </p>
            {section.quote.attribution && (
              <footer className="text-label mt-4 ml-10" style={{ color: "var(--color-muted)" }}>
                — {section.quote.attribution}
              </footer>
            )}
          </blockquote>
        )}

        {/* Body text */}
        {section.body && (
          <p
            className="leading-relaxed mb-12"
            style={{ fontSize: "1.125rem", color: "var(--color-ink)", maxWidth: "680px" }}
          >
            {section.body}
          </p>
        )}

        {/* Metrics grid */}
        {section.metrics && section.metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {section.metrics.map((m) => (
              <div key={m.label} className="border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
                <div
                  className="text-metric"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: themeColorDark || "var(--color-ink)" }}
                >
                  {m.value}
                </div>
                <div className="text-label mt-2" style={{ color: "var(--color-muted)" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image */}
        {section.image && (
          <div
            className={`relative overflow-hidden rounded-sm ${section.image.fullWidth ? "-mx-6 md:-mx-10" : ""}`}
            style={{ aspectRatio: "16/9", backgroundColor: "var(--color-border)" }}
          >
            {/* Replace with <Image> when real images are added */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: `${themeColor}22` }}
            >
              <span className="text-label" style={{ color: "var(--color-muted)" }}>
                {section.image.alt}
              </span>
            </div>
          </div>
        )}

        {/* Video */}
        {section.video && (
          <div
            className={`relative overflow-hidden rounded-sm ${section.video.fullWidth ? "-mx-6 md:-mx-10" : ""}`}
            style={{ aspectRatio: "16/9", backgroundColor: "var(--color-ink)" }}
          >
            <video
              src={section.video.src}
              poster={section.video.poster}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </Container>
    </motion.div>
  );
}
