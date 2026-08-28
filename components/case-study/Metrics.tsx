"use client";
// components/case-study/Metrics.tsx
//
// For projects with real, supplied numeric outcomes — unlike `Outcome`,
// which is deliberately non-numeric for projects with nothing to report.
// Renders as one dramatic, full-width, color-inverted band instead of a
// grid of small cards: the point is that this is the single biggest
// moment on the page, not six equal boxes. Numbers count up into place
// once in view (skipped entirely under prefers-reduced-motion).

import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import type { MetricsSectionData } from "@/types/narrative-case-study";

interface MetricsProps {
  section: MetricsSectionData;
}

function parseMetricValue(raw: string): { prefix: string; number: number; suffix: string } | null {
  const match = /^([^\d]*)(\d+(?:\.\d+)?)(.*)$/.exec(raw.trim());
  if (!match) return null;
  return { prefix: match[1], number: parseFloat(match[2]), suffix: match[3] };
}

function MetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();
  const parsed = parseMetricValue(value);
  // Always initialize to the real, final value — this must match what's
  // server-rendered, so the correct number is what's in the HTML for
  // no-JS/pre-hydration/crawler cases. The count-up below is a client-only
  // enhancement applied *after* mount, never the source of truth for content.
  const [display, setDisplay] = useState(value);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!inView || reduceMotion || !parsed || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    setDisplay(`${parsed.prefix}0${parsed.suffix}`);
    const controls = animate(0, parsed.number, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const isInteger = Number.isInteger(parsed.number);
        const formatted = isInteger ? Math.round(latest).toString() : latest.toFixed(1);
        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion]);

  return <span ref={ref}>{display}</span>;
}

export function Metrics({ section }: MetricsProps) {
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
        {section.eyebrow && (
          <p className="text-label mb-6" style={{ color: "var(--color-paper)", opacity: 0.65 }}>
            {section.eyebrow}
          </p>
        )}
        <h2
          className="section-heading mb-6"
          style={{ color: "var(--color-paper)", maxWidth: "42rem" }}
        >
          {section.heading}
        </h2>

        {section.intro && (
          <p
            className="leading-relaxed mb-14"
            style={{ fontSize: "var(--text-body)", color: "var(--color-paper)", opacity: 0.75, maxWidth: "38rem" }}
          >
            {section.intro}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12" style={{ marginTop: section.intro ? 0 : "var(--space-11)" }}>
          {section.items.map((item) => (
            <div key={item.label}>
              <div
                className="text-metric"
                style={{ color: "var(--color-paper)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                <MetricValue value={item.value} />
              </div>
              <div className="text-label mt-3" style={{ color: "var(--color-paper)", opacity: 0.85 }}>
                {item.label}
              </div>
              {item.description && (
                <p className="mt-2 leading-relaxed" style={{ fontSize: "var(--text-sm)", color: "var(--color-paper)", opacity: 0.65 }}>
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
}
