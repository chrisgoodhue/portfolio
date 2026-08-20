"use client";
// components/case-study/ClosingStatement.tsx
//
// The short closing coda for the portfolio presentation: one emphasized
// line, one supporting sentence. Deliberately quieter than PullQuote's
// in-section treatment (no border bar) — this is a standalone full-width
// moment, not a punctuation mark inside a section.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/Container";
import type { ClosingStatementData } from "@/types/narrative-case-study";

interface ClosingStatementProps {
  statement: ClosingStatementData;
}

export function ClosingStatement({ statement }: ClosingStatementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ paddingTop: "var(--space-14)", paddingBottom: "var(--space-14)" }}
    >
      <Container>
        <p
          className="text-display-italic"
          style={{ color: "var(--color-ink)", fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)", maxWidth: "44rem" }}
        >
          {statement.quote}
        </p>
        <p
          className="mt-8 leading-relaxed"
          style={{ fontSize: "var(--text-body)", color: "var(--color-muted)", maxWidth: "38rem" }}
        >
          {statement.support}
        </p>
      </Container>
    </motion.div>
  );
}
