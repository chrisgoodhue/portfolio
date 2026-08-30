"use client";
// components/case-study/Reflection.tsx

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/Container";
import type { ReflectionSectionData } from "@/types/narrative-case-study";

interface ReflectionProps {
  section: ReflectionSectionData;
}

export function Reflection({ section }: ReflectionProps) {
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
          style={{ color: "var(--color-ink)" }}
        >
          {section.heading}
        </h2>

        <div className="space-y-12">
          {section.items.map((item) => (
            <div key={item.title} style={{ maxWidth: "42.5rem" }}>
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "var(--text-body)",
                  color: "var(--color-ink)",
                  marginBottom: "0.75rem",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "var(--text-body)",
                  color: "var(--color-ink)",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
}
