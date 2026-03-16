"use client";
// app/components/ComponentsShowcase.tsx — Renders all reusable components for visual QA.
// Uses design tokens (spacing, radius, type, colors) — no raw pixels.

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Container } from "@/components/Container";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { AboutCard } from "@/components/AboutCard";
import { CaseStudyHero } from "@/components/CaseStudyHero";
import { CaseStudySection } from "@/components/CaseStudySection";
import { CardGrid } from "@/components/CardGrid";
import { caseStudies } from "@/lib/case-studies";
import type { CaseStudy, CaseStudySection as SectionData } from "@/types/case-study";
import type { GridCard } from "@/types/case-study";

const showcaseSectionStyle = {
  paddingTop: "var(--space-16)",
  paddingBottom: "var(--space-16)",
  borderBottom: "1px solid var(--color-border)",
};

const headingStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: 900,
  fontSize: "var(--text-3xl)",
  letterSpacing: "-0.03em",
  color: "var(--color-ink)",
  marginBottom: "var(--space-2)",
};

const captionStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "var(--color-muted)",
  marginBottom: "var(--space-6)",
};

export function ComponentsShowcase() {
  const sampleCaseStudy: CaseStudy = caseStudies[0];
  const sampleSection: SectionData = sampleCaseStudy.sections.find((s) => s.type === "problem") ?? {
    id: "problem",
    type: "problem",
    title: "The Problem",
    body: "Sample body text for the section component. This demonstrates how body copy and optional image placeholders render.",
    image: { src: "/images/vimeo-context.jpg", alt: "Sample image", fullWidth: true },
  };

  const showcaseCards: GridCard[] = [
    { id: "about", type: "about", colSpan: 4 },
    { id: "featured", type: "case-study", colSpan: 8, caseStudy: caseStudies[0] },
    { id: "card2", type: "case-study", colSpan: 6, caseStudy: caseStudies[1] },
    { id: "card3", type: "case-study", colSpan: 6, caseStudy: caseStudies[2] },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-paper)",
        paddingBottom: "var(--space-24)",
      }}
    >
      <Nav />

      <Container>
        <div style={{ paddingTop: "var(--space-20)" }}>
          <h1 style={headingStyle}>Component library</h1>
          <p style={{ ...captionStyle, marginBottom: "var(--space-12)" }}>
            Reusable components for visual QA — spacing, type, and colors use design tokens.
          </p>
          <Link
            href="/"
            className="text-label"
            style={{ color: "var(--color-muted)", marginBottom: "var(--space-12)", display: "inline-block" }}
          >
            ← Back to home
          </Link>
        </div>
      </Container>

      {/* Design tokens reference */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>Design tokens</h2>
          <p style={captionStyle}>Spacing (--space-*), radius (--radius-*), type (--text-*), colors (--color-*)</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 16rem), 1fr))", gap: "var(--space-6)", fontSize: "var(--text-sm)", fontFamily: "var(--font-mono)", color: "var(--color-ink)" }}>
            <div>
              <p style={{ fontWeight: 700, marginBottom: "var(--space-2)" }}>Spacing</p>
              <p>--space-1 … --space-24 (rem)</p>
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: "var(--space-2)" }}>Radius</p>
              <p>--radius-sm, --radius-md, --radius-lg</p>
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: "var(--space-2)" }}>Type</p>
              <p>--text-xs … --text-6xl, --text-display, --text-body</p>
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: "var(--space-2)" }}>Colors</p>
              <p>--color-ink, --color-paper, --color-border, --color-muted</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Container + typography */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>Container & typography</h2>
          <p style={captionStyle}>Container constrains width; text uses .text-display, .text-label, .text-metric</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <p className="text-label" style={{ color: "var(--color-muted)" }}>
              Label / uppercase mono
            </p>
            <p className="text-display" style={{ fontSize: "var(--text-display)", color: "var(--color-ink)" }}>
              Display headline
            </p>
            <p className="text-metric" style={{ fontSize: "var(--text-metric)", color: "var(--color-ink)" }}>
              42%
            </p>
            <p style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-relaxed)", color: "var(--color-ink)", maxWidth: "40rem" }}>
              Body copy at --text-body with --leading-relaxed. Container uses max-width and horizontal padding.
            </p>
          </div>
        </Container>
      </section>

      {/* CaseStudyCard */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>CaseStudyCard</h2>
          <p style={captionStyle}>Case study card with 16:9 image, meta, summary, outcomes</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 22rem), 1fr))", gap: "var(--space-6)" }}>
            <div style={{ minHeight: "20rem" }}>
              <CaseStudyCard caseStudy={sampleCaseStudy} fitHeightToContent />
            </div>
          </div>
        </Container>
      </section>

      {/* AboutCard */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>AboutCard</h2>
          <p style={captionStyle}>About entry with availability, name, bio, companies</p>
          <div style={{ maxWidth: "24rem" }}>
            <AboutCard />
          </div>
        </Container>
      </section>

      {/* CaseStudyHero */}
      <section style={{ ...showcaseSectionStyle, borderBottom: "none", paddingTop: "var(--space-12)" }}>
        <h2 style={{ ...headingStyle, paddingLeft: "var(--space-10)", paddingRight: "var(--space-10)" }}>
          CaseStudyHero
        </h2>
        <p style={{ ...captionStyle, paddingLeft: "var(--space-10)", paddingRight: "var(--space-10)" }}>
          Hero with theme color, metadata, title, summary, outcomes, and 1:1 image area
        </p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <CaseStudyHero caseStudy={sampleCaseStudy} />
        </div>
      </section>

      {/* CaseStudySection */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>CaseStudySection</h2>
          <p style={captionStyle}>Section with label, title, body, optional image and metrics</p>
          <div style={{ marginTop: "var(--space-8)" }}>
            <CaseStudySection
              section={sampleSection}
              themeColor={sampleCaseStudy.themeColor}
              themeColorDark={sampleCaseStudy.themeColorDark}
            />
          </div>
        </Container>
      </section>

      {/* CardGrid (minimal set) */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>CardGrid</h2>
          <p style={captionStyle}>Editorial grid: About + case study cards (subset for showcase)</p>
        </Container>
        <div style={{ padding: "var(--space-2)" }}>
          <CardGrid cards={showcaseCards} />
        </div>
      </section>
    </main>
  );
}
