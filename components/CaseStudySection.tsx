"use client";
// components/CaseStudySection.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { CaseStudySection as SectionData } from "@/types/case-study";
import { Container } from "./Container";

interface Props {
  section: SectionData;
  subsections?: SectionData[];
  themeColor: string;
  themeColorDark: string;
}

export function CaseStudySection({ section, subsections, themeColor, themeColorDark }: Props) {
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
          // Subsections (e.g. secondary problem/approach/design entries) use a smaller H3
          section.id !== section.type &&
          (section.type === "problem" ||
            section.type === "solution" ||
            section.type === "approach" ||
            section.type === "design") ? (
            <h3
              className="mb-8"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                color: "var(--color-ink)",
              }}
            >
              {section.title}
            </h3>
          ) : (
            <h2
              className="mb-10"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "var(--color-ink)",
              }}
            >
              {section.title}
            </h2>
          )
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
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-ink)",
              maxWidth: "42.5rem",
              // Keep author-provided newlines (our case study copy uses multi-line bodies).
              whiteSpace: "pre-wrap",
            }}
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
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--color-ink)" }}
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

        {/* Subsections (e.g. Approach / Design sub-parts) */}
        {subsections && subsections.length > 0 && (
          <div className="mt-16 space-y-12">
            {subsections.map((sub) => (
              <div
                key={sub.id}
                className="pt-8"
              >
                {sub.title && (
                  <h3
                    className="mb-6"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                      color: "var(--color-ink)",
                    }}
                  >
                    {sub.title}
                  </h3>
                )}

                {sub.body && (
                  <p
                    className="leading-relaxed mb-8"
                    style={{
                      fontSize: "var(--text-body)",
                      color: "var(--color-ink)",
                      maxWidth: "42.5rem",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {sub.body}
                  </p>
                )}

                {sub.metrics && sub.metrics.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-8">
                    {sub.metrics.map((m) => (
                      <div key={m.label} className="border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
                        <div
                          className="text-metric"
                          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--color-ink)" }}
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

                {sub.image && (
                  <div
                    className={`relative overflow-hidden rounded-sm ${
                      sub.image.fullWidth ? "-mx-6 md:-mx-10" : ""
                    }`}
                    style={{ aspectRatio: "16/9", backgroundColor: "var(--color-border)" }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: `${themeColor}22` }}
                    >
                      <span className="text-label" style={{ color: "var(--color-muted)" }}>
                        {sub.image.alt}
                      </span>
                    </div>
                  </div>
                )}

                {sub.video && (
                  <div
                    className={`relative overflow-hidden rounded-sm ${
                      sub.video.fullWidth ? "-mx-6 md:-mx-10" : ""
                    }`}
                    style={{ aspectRatio: "16/9", backgroundColor: "var(--color-ink)" }}
                  >
                    <video
                      src={sub.video.src}
                      poster={sub.video.poster}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </motion.div>
  );
}
