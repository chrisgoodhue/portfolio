"use client";
// components/case-study/NextProject.tsx
//
// Footer teaser linking to another case study. Uses a plain <Link> — this
// intentionally does not trigger the shared-element expand animation, since
// that animation depends on measuring a card's on-screen rect at click time.
// (The persistent Nav's "Work"/"About" links already navigate the same way.)

import Link from "next/link";
import { Container } from "@/components/Container";

interface NextProjectProps {
  href: string;
  title: string;
  company: string;
}

export function NextProject({ href, title, company }: NextProjectProps) {
  return (
    <div style={{ borderTop: "1px solid var(--color-border)" }}>
      <Link href={href} style={{ display: "block" }}>
        <Container>
          <div style={{ paddingTop: "var(--space-13)", paddingBottom: "var(--space-13)" }}>
            <p className="text-label mb-4" style={{ color: "var(--color-ink)" }}>
              Next: {company}
            </p>
            <h2 className="text-display" style={{ color: "var(--color-ink)", fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              {title} →
            </h2>
          </div>
        </Container>
      </Link>
    </div>
  );
}
