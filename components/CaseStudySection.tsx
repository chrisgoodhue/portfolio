"use client";
// components/CaseStudySection.tsx
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { CaseStudySection as SectionData } from "@/types/case-study";
import type { MediaScale } from "@/types/narrative-case-study";
import { Container } from "./Container";

interface Props {
  section: SectionData;
  subsections?: SectionData[];
}

/**
 * Resolve the effective scale: an explicit `scale` wins; otherwise it's
 * derived from the legacy `fullWidth` boolean so nothing authored before
 * `scale` existed has to change. `fullWidth: false` now maps to "contained"
 * (narrower — matches the body-copy measure) rather than "the full
 * container width", which is what gives images and body text actual visual
 * rhythm instead of every non-fullWidth image reading at the same width as
 * the page itself.
 */
function resolveScale(explicit: MediaScale | undefined, fullWidth: boolean | undefined): MediaScale {
  return explicit ?? (fullWidth ? "wide" : "contained");
}

function mediaWrapperProps(scale: MediaScale): { className: string; style: React.CSSProperties } {
  if (scale === "full-bleed") {
    // Same breakout formula as CaseStudyHero / the narrative system's
    // MediaFeature — reaches the true viewport edge regardless of nesting.
    return { className: "", style: { width: "100vw", marginLeft: "calc(-50vw + 50%)" } };
  }
  if (scale === "contained") {
    return { className: "", style: { maxWidth: "42.5rem" } };
  }
  return { className: "-mx-6 md:-mx-10", style: {} };
}

/**
 * Clearly-labeled stand-in for an asset that hasn't been produced yet —
 * visually aligned with components/case-study/MediaPlaceholder.tsx so the
 * legacy and narrative systems read as one component library rather than
 * two different eras. No real image/video files exist for this content
 * yet, so both `image` and `video` sections render this instead of an
 * <img>/<video> pointing at a path that doesn't resolve.
 */
function MediaSlot({
  kind,
  label,
  scale,
  fullWidth,
}: {
  kind: "Image" | "Video";
  label: string;
  scale?: MediaScale;
  fullWidth?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const resolved = resolveScale(scale, fullWidth);
  const { className, style } = mediaWrapperProps(resolved);

  return (
    <div className={className} style={style}>
      <div
        role="img"
        aria-label={`Placeholder for ${kind.toLowerCase()}: ${label}`}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: "var(--radius-sm)",
          overflow: "hidden",
          backgroundColor: "var(--color-overlay)",
          border: "1px dashed rgba(10, 10, 10, 0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {!reduceMotion && (
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: "100%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(10, 10, 10, 0.35), transparent)",
            }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <span
          className="text-label"
          style={{
            color: "var(--color-muted)",
            marginBottom: "0.75rem",
            padding: "0.25rem 0.6rem",
            border: "1px solid var(--color-border)",
            borderRadius: "999px",
          }}
        >
          {kind}
        </span>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--color-ink)",
            maxWidth: "32rem",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

/**
 * The single dramatic moment on an "outcome" section — a full-bleed,
 * color-inverted band with the numbers at real scale, replacing what used
 * to be a small in-column grid. Fixed ink background with paper text,
 * matching the narrative system's Metrics component — theme color is
 * reserved for the hero and homepage cards, not the case study body.
 */
function OutcomeBand({
  heading,
  metrics,
}: {
  heading?: string;
  metrics: { value: string; label: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        backgroundColor: "var(--color-ink)",
        paddingTop: "clamp(4rem, 9vw, 7rem)",
        paddingBottom: "clamp(4rem, 9vw, 7rem)",
      }}
    >
      <Container>
        {heading && (
          <h2
            className="section-heading mb-14"
            style={{ color: "var(--color-paper)", maxWidth: "42rem" }}
          >
            {heading}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {metrics.map((m) => (
            <div key={m.label}>
              <div
                className="text-metric"
                style={{ color: "var(--color-paper)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                {m.value}
              </div>
              <div className="text-label mt-3" style={{ color: "var(--color-paper)", opacity: 0.85 }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
}

export function CaseStudySection({ section, subsections }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  // Outcome sections with real metrics get the full-bleed band treatment
  // below instead of the generic heading — skip the standalone title render
  // here so the band's own heading is the only one.
  const hasMetricsBand = section.type === "outcome" && !!section.metrics && section.metrics.length > 0;

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-[var(--space-14)]"
    >
      <Container>
        {/* Section label */}
        <p className="text-label mb-6" style={{ color: "var(--color-muted)" }}>
          {section.type.toUpperCase()}
        </p>

        {/* Title */}
        {section.title && !hasMetricsBand && (
          // Subsections (e.g. secondary problem/approach/design entries) use a smaller H3
          section.id !== section.type &&
          (section.type === "problem" ||
            section.type === "solution" ||
            section.type === "approach" ||
            section.type === "design") ? (
            <h3
              className="subsection-heading mb-8"
              style={{ color: "var(--color-ink)" }}
            >
              {section.title}
            </h3>
          ) : (
            <h2
              className="section-heading mb-10"
              style={{ color: "var(--color-ink)" }}
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
                borderLeft: "3px solid var(--color-ink)",
                paddingLeft: "2rem",
              }}
            >
              &ldquo;{section.quote.text}&rdquo;
            </p>
            {section.quote.attribution && (
              <footer className="text-label mt-4 ml-10" style={{ color: "var(--color-muted)" }}>
                - {section.quote.attribution}
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

        {/* Outcome metrics — full-bleed band (see OutcomeBand above) */}
        {hasMetricsBand && (
          <OutcomeBand
            heading={section.title}
            metrics={section.metrics!}
          />
        )}

        {/* Image */}
        {section.image && (
          <MediaSlot
            kind="Image"
            label={section.image.alt}
            scale={section.image.scale}
            fullWidth={section.image.fullWidth}
          />
        )}

        {/* Video */}
        {section.video && (
          <MediaSlot
            kind="Video"
            label={section.video.label ?? "Video placeholder"}
            scale={section.video.scale}
            fullWidth={section.video.fullWidth}
          />
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
                    className="subsection-heading mb-6"
                    style={{ color: "var(--color-ink)" }}
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

                {sub.image && (
                  <MediaSlot
                    kind="Image"
                    label={sub.image.alt}
                    scale={sub.image.scale}
                    fullWidth={sub.image.fullWidth}
                  />
                )}

                {sub.video && (
                  <MediaSlot
                    kind="Video"
                    label={sub.video.label ?? "Video placeholder"}
                    scale={sub.video.scale}
                    fullWidth={sub.video.fullWidth}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </motion.div>
  );
}
