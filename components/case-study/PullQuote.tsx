"use client";
// components/case-study/PullQuote.tsx
//
// A short, emphasized statement — used at the moments the narrative pivots
// (a reframed question, a distilled principle). Reused inside both
// NarrativeSection and Prototype rather than duplicated in each.

interface PullQuoteProps {
  lines: string[];
  themeColor: string;
  attribution?: string;
}

export function PullQuote({ lines, themeColor, attribution }: PullQuoteProps) {
  return (
    <blockquote style={{ borderLeft: `3px solid ${themeColor}`, paddingLeft: "2rem" }}>
      {lines.map((line, i) => (
        <p
          key={i}
          className="text-display-italic"
          style={{ fontSize: "clamp(1.375rem, 2.75vw, 2.25rem)", color: "var(--color-ink)" }}
        >
          {line}
        </p>
      ))}
      {attribution && (
        <footer className="text-label mt-4" style={{ color: "var(--color-muted)" }}>
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}
