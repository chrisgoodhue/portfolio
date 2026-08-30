"use client";
// components/case-study/Outcome.tsx
//
// Qualitative outcomes — deliberately not styled as big display-metric
// numbers, because none were supplied for this project. What was
// established, not what was measured.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/Container";
import type { OutcomeSectionData } from "@/types/narrative-case-study";

interface OutcomeProps {
  section: OutcomeSectionData;
}

export function Outcome({ section }: OutcomeProps) {
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
        <h2
          className="section-heading mb-12"
          style={{ color: "var(--color-ink)", maxWidth: "42rem" }}
        >
          {section.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {section.items.map((item) => (
            <div key={item.title} className="border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "var(--text-body)",
                  color: "var(--color-ink)",
                  marginBottom: "0.5rem",
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: "var(--text-body)", color: "var(--color-muted)", lineHeight: 1.6 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
}
