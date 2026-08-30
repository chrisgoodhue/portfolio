"use client";
// app/components/ComponentsShowcase.tsx — Renders all reusable components for visual QA.
// Uses design tokens (spacing, radius, type, colors) — no raw pixels.

import Link from "next/link";
import { Container } from "@/components/Container";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { AboutCard } from "@/components/AboutCard";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { NarrativeSection } from "@/components/case-study/NarrativeSection";
import { PullQuote } from "@/components/case-study/PullQuote";
import { MediaFeature } from "@/components/case-study/MediaFeature";
import { Comparison } from "@/components/case-study/Comparison";
import { Prototype } from "@/components/case-study/Prototype";
import { Metrics } from "@/components/case-study/Metrics";
import { Outcome } from "@/components/case-study/Outcome";
import { Reflection } from "@/components/case-study/Reflection";
import { ClosingStatement } from "@/components/case-study/ClosingStatement";
import { NextProject } from "@/components/case-study/NextProject";
import { CaseStudySection } from "@/components/CaseStudySection";
import { CardGrid } from "@/components/CardGrid";
import { caseStudies } from "@/lib/case-studies";
import { narrativeCaseStudies, showcasesDetailed } from "@/lib/narrative-case-studies";
import type { CaseStudy, CaseStudySection as SectionData } from "@/types/case-study";
import type { GridCard } from "@/types/case-study";
import type {
  NarrativeSectionData,
  ComparisonSectionData,
  PrototypeSectionData,
  MetricsSectionData,
  OutcomeSectionData,
  ReflectionSectionData,
} from "@/types/narrative-case-study";

const showcaseSectionStyle = {
  paddingTop: "var(--space-13)", // 80px
  paddingBottom: "var(--space-13)", // 80px
  borderBottom: "1px solid var(--color-border)",
};

const pageTitleStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: 900,
  fontSize: "var(--text-3xl)",
  letterSpacing: "-0.03em",
  color: "var(--color-ink)",
  marginBottom: "var(--space-4)",
};

const headingStyle = {
  fontFamily: "var(--font-body)",
  fontWeight: 700,
  fontSize: "var(--text-2xl)",
  letterSpacing: "-0.02em",
  color: "var(--color-ink)",
  marginBottom: "var(--space-4)",
};

const captionStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-xs)",
  letterSpacing: "0.02em",
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

  // Narrative-system samples, pulled from the real case studies the same
  // way sampleCaseStudy/sampleSection are above, so these demos can't drift
  // from what's actually on the site.
  const allNarrativeSections = narrativeCaseStudies.flatMap((cs) => cs.sections);

  const sampleNarrativeSection = allNarrativeSections.find(
    (s): s is NarrativeSectionData =>
      s.type === "narrative" && (!s.beats || s.beats.every((b) => b.scale !== "full-bleed")),
  )!;

  const sectionWithPullQuote = allNarrativeSections.find(
    (s): s is NarrativeSectionData => s.type === "narrative" && !!s.pullQuote,
  )!;
  const samplePullQuote = sectionWithPullQuote.pullQuote!;

  const sampleComparisonSection = allNarrativeSections.find(
    (s): s is ComparisonSectionData => s.type === "comparison",
  )!;

  const samplePrototypeSectionRaw = allNarrativeSections.find(
    (s): s is PrototypeSectionData => s.type === "prototype",
  )!;
  // Every real prototype beat is mediaScale: "full-bleed" (each project's
  // single most-emphasized moment), shown at "wide" here instead so it fits
  // this page's layout; the real content (heading/body/steps/caption) is untouched.
  const samplePrototypeSection: PrototypeSectionData = {
    ...samplePrototypeSectionRaw,
    mediaScale: "wide",
  };

  const sampleMetricsSection = allNarrativeSections.find(
    (s): s is MetricsSectionData => s.type === "metrics",
  )!;

  // Outcome/Reflection are only used on Showcases' full/detailed page; no
  // portfolio presentation uses either section type.
  const sampleOutcomeSection = showcasesDetailed.sections.find(
    (s): s is OutcomeSectionData => s.type === "outcome",
  )!;
  const sampleReflectionSection = showcasesDetailed.sections.find(
    (s): s is ReflectionSectionData => s.type === "reflection",
  )!;

  const sampleClosingStatement = narrativeCaseStudies[0].closingStatement!;
  const sampleNextProject = narrativeCaseStudies[0].nextProject;

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-paper)",
        paddingBottom: "var(--space-24)",
      }}
    >
      {/* Hero: landing area for the design system docs */}
      <section
        style={{
          paddingTop: "var(--space-13)",
          paddingBottom: "var(--space-13)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2.5fr) minmax(0, 1.5fr)",
              gap: "var(--space-12)",
            }}
          >
            <div>
              <h1 style={pageTitleStyle}>Component library</h1>
              <p
                style={{
                  fontSize: "var(--text-body)",
                  lineHeight: "var(--leading-relaxed)",
                  color: "var(--color-ink)",
                  maxWidth: "40rem",
                  marginBottom: "var(--space-6)",
                }}
              >
                This page documents the design tokens and core components used across this portfolio. Use it as a
                reference when doing visual QA or introducing new components so everything stays aligned to the same
                system.
              </p>
              <Link
                href="/"
                className="text-label"
                style={{ color: "var(--color-muted)", display: "inline-block" }}
              >
                ← Back to home
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                padding: "var(--space-4)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-paper)",
              }}
            >
              <p className="text-label" style={{ color: "var(--color-muted)" }}>
                On this page
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-4)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-ink)",
                }}
              >
                <li>
                  <a href="#design-tokens">Design tokens</a>
                </li>
                <li>
                  <a href="#components">Components</a>
                </li>
                <li>
                  <a href="#how-to-add">How to add a new component</a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Design tokens reference */}
      <section id="design-tokens" style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>Design tokens</h2>
          <p style={captionStyle}>Foundation for spacing, radius, type, and color across the portfolio.</p>

          <div
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-ink)",
              lineHeight: "var(--leading-relaxed)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
              maxWidth: "42rem",
              marginBottom: "var(--space-10)",
            }}
          >
            <p>
              Tokens are the single source of truth for layout and visual style. Use them instead of raw values so
              spacing, shape, typography, and color stay consistent, even as the system evolves.
            </p>
            <p>
              Each group below shows the available tokens and how they&apos;re typically applied: compact vs. layout
              spacing, card vs. chip radius, type hierarchy, and color roles for backgrounds, text, borders, and
              tints.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-12)",
              fontSize: "var(--text-sm)",
              fontFamily: "var(--font-mono)",
              color: "var(--color-ink)",
            }}
          >
            {/* Spacing scale */}
            <div>
              <p style={{ fontWeight: 700, marginBottom: "var(--space-4)" }}>Spacing</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))",
                  gap: "var(--space-6)",
                }}
              >
                {[
                  { token: "--space-0", label: "0px, no gap" },
                  { token: "--space-4", label: "8px, small gaps, icon offsets & vertical rhythm inside cards" },
                  { token: "--space-6", label: "16px, default component padding" },
                  { token: "--space-8", label: "24px, gaps between cards & sections" },
                  { token: "--space-9", label: "32px, layout spacing" },
                  { token: "--space-10", label: "40px, generous layout spacing" },
                  { token: "--space-11", label: "48px, hero & large blocks" },
                  { token: "--space-12", label: "64px, page section padding" },
                  { token: "--space-13", label: "80px, extra spacious layouts" },
                  { token: "--space-14", label: "96px, hero bands, page edges" },
                ].map(({ token, label }) => (
                  <div
                    key={token}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-3)",
                    }}
                  >
                    <div
                      style={{
                        width: "0.75rem",
                        height: `var(${token})`,
                        borderRadius: "999rem",
                        backgroundColor: "var(--color-border)",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ textAlign: "left" }}>
                      <div>{token}</div>
                      <div style={{ opacity: 0.6 }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radius scale */}
            <div>
              <p style={{ fontWeight: 700, marginBottom: "var(--space-4)" }}>Radius</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                  gap: "var(--space-6)",
                  alignItems: "start",
                }}
              >
                {[
                  { token: "--radius-sm", label: "4px, small UI, chips" },
                  { token: "--radius-md", label: "8px, buttons, inputs" },
                  { token: "--radius-lg", label: "12px, larger surfaces" },
                  { token: "--radius-xl", label: "16px, cards" },
                  { token: "--radius-2xl", label: "24px, featured cards" },
                  { token: "--radius-3xl", label: "32px, hero surfaces" },
                ].map(({ token, label }) => (
                  <div key={token} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "3.5rem",
                        height: "3.5rem",
                        borderRadius: `var(${token})`,
                        border: "1px solid var(--color-border)",
                        backgroundColor: "var(--color-paper)",
                        boxShadow: "0 0 0 1px rgba(10,10,10,0.02)",
                        margin: "0 auto var(--space-4)",
                      }}
                    />
                    <div>{token}</div>
                    <div style={{ opacity: 0.6 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <p style={{ fontWeight: 700, marginBottom: "var(--space-4)" }}>Typography</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-8)",
                  fontFamily: "var(--font-body)",
                  color: "var(--color-ink)",
                }}
              >
                <div>
                  <p
                    className="text-display"
                    style={{
                      fontSize: "var(--text-display)",
                      lineHeight: "var(--leading-snug)",
                    }}
                  >
                    Display / H1
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      opacity: 0.7,
                      marginTop: "var(--space-3)",
                    }}
                  >
                    --text-display, --font-display
                  </p>
                </div>
                <div>
                  <p className="section-heading" style={{ color: "var(--color-ink)" }}>
                    Section heading / H2
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      opacity: 0.7,
                      marginTop: "var(--space-3)",
                    }}
                  >
                    .section-heading (--text-section, --font-body)
                  </p>
                </div>
                <div>
                  <p className="subsection-heading" style={{ color: "var(--color-ink)" }}>
                    Subsection heading / H3
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      opacity: 0.7,
                      marginTop: "var(--space-3)",
                    }}
                  >
                    .subsection-heading (--text-subsection, --font-body)
                  </p>
                </div>
                <div>
                  <p className="text-metric" style={{ fontSize: "var(--text-metric)", color: "var(--color-ink)" }}>
                    42%
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      opacity: 0.7,
                      marginTop: "var(--space-3)",
                    }}
                  >
                    .text-metric, for standout numbers. --text-metric, --font-display
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "var(--text-body)",
                      lineHeight: "var(--leading-relaxed)",
                      maxWidth: "36rem",
                    }}
                  >
                    Body copy uses --text-body with --leading-relaxed. Use this for most narrative content and longer
                    descriptions in case studies.
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      opacity: 0.7,
                      marginTop: "var(--space-3)",
                    }}
                  >
                    --text-body, --leading-relaxed
                  </p>
                </div>
                <div>
                  <p className="text-label" style={{ color: "var(--color-muted)" }}>
                    Label / eyebrow
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      opacity: 0.7,
                      marginTop: "var(--space-3)",
                    }}
                  >
                    .text-label, short words/phrases only (uppercase, tracked out). --text-xs, --font-mono
                  </p>
                </div>
                <div>
                  <p className="text-caption" style={{ color: "var(--color-muted)", maxWidth: "34rem" }}>
                    Caption / media description, a full sentence describing what an image or prototype shows.
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      opacity: 0.7,
                      marginTop: "var(--space-3)",
                    }}
                  >
                    .text-caption, for full-sentence captions (sentence case, not tracked out). --text-xs, --font-mono
                  </p>
                </div>
              </div>
            </div>

            {/* Colors & roles */}
            <div>
              <p style={{ fontWeight: 700, marginBottom: "var(--space-4)" }}>Colors &amp; roles</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                  gap: "var(--space-6)",
                  alignItems: "start",
                }}
              >
                {[
                  { token: "--color-paper", label: "Page background", swatch: "var(--color-paper)", border: true, textColor: false },
                  { token: "--color-ink", label: "Ink (text, headings)", swatch: "var(--color-ink)", border: false, textColor: false },
                  { token: "--color-muted", label: "Secondary text", swatch: "var(--color-paper)", border: true, textColor: true, sample: "rgba(10, 10, 10, 0.6)" },
                  { token: "--color-border", label: "Hairline borders", swatch: "var(--color-paper)", border: true, textColor: false, showBorder: "var(--color-border)" },
                  { token: "--color-overlay", label: "Subtle fill / tint", swatch: "var(--color-overlay)", border: true, textColor: false },
                ].map(({ token, label, swatch, border, textColor, sample, showBorder }) => (
                  <div key={token} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: swatch,
                        border: showBorder
                          ? `2px solid ${showBorder}`
                          : border
                          ? "1px solid var(--color-border)"
                          : "none",
                        margin: "0 auto var(--space-0)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: textColor ? sample : "inherit",
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                      }}
                    >
                      {textColor ? "A" : null}
                    </div>
                    <div>{label}</div>
                    <div style={{ opacity: 0.6 }}>{token}</div>
                  </div>
                ))}
              </div>
              <p style={{ opacity: 0.6, marginTop: "var(--space-4)", maxWidth: "32rem" }}>
                This is the whole palette outside a case study&apos;s own accent color. Theme color (a light/dark
                pair set per case study) is reserved for the hero and the homepage cards, everything else on the
                site, including the case study body, uses this fixed ink/paper system.
              </p>
            </div>
          </div>
        </Container>
      </section>


      {/* Navigation (docs) */}
      <section id="components" style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>Navigation</h2>
          <p style={captionStyle}>Global header and primary site navigation.</p>

          <div
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-ink)",
              lineHeight: "var(--leading-relaxed)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
              maxWidth: "42rem",
              marginBottom: "var(--space-8)",
            }}
          >
            <p>
              Fixed header that appears on every page. Shows site label on the left and primary destinations on the
              right.
            </p>

            <div>
              <p className="text-label" style={{ color: "var(--color-muted)", marginBottom: "var(--space-4)" }}>
                Tokens
              </p>
              <ul
                style={{
                  paddingLeft: "1.25rem",
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-4)",
                }}
              >
                <li>
                  Spacing: <code>--space-6</code> (header padding), <code>--space-8</code> (gap between links)
                </li>
                <li>
                  Colors: <code>--color-paper</code>, <code>--color-muted</code> (default),{" "}
                  <code>--color-ink</code> (hover/active)
                </li>
                <li>
                  Typography: <code>.text-label</code> (mono, uppercase) for links
                </li>
                <li>
                  Border (optional): <code>--color-border</code> for a bottom rule
                </li>
              </ul>
            </div>

            <div>
              <p className="text-label" style={{ color: "var(--color-muted)", marginBottom: "var(--space-4)" }}>
                Usage
              </p>
              <ul
                style={{
                  paddingLeft: "1.25rem",
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-4)",
                }}
              >
                <li>Use only for primary navigation (Home, About, Components, Contact).</li>
                <li>Don&apos;t add secondary actions or CTAs here; keep those in page content.</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-paper)",
              padding: "var(--space-6)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-8)",
              }}
            >
              <span className="text-label" style={{ color: "var(--color-muted)" }}>
                Portfolio
              </span>
              <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-8)" }}>
                {["About", "Components", "Contact"].map((item) => (
                  <span key={item} className="text-label" style={{ color: "var(--color-muted)" }}>
                    {item}
                  </span>
                ))}
              </nav>
            </div>
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
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>CaseStudyHero</h2>
          <p style={captionStyle}>
            Hero with theme color, metadata, title, summary, outcomes, and 1:1 image area. Runs full-bleed in
            production, framed here at the container width.
          </p>
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
            }}
          >
            <CaseStudyHero
              themeColor={sampleCaseStudy.themeColor}
              themeColorDark={sampleCaseStudy.themeColorDark}
              eyebrow={`${sampleCaseStudy.company} · ${sampleCaseStudy.role} · ${sampleCaseStudy.year}`}
              title={sampleCaseStudy.title}
              description={sampleCaseStudy.summary}
              image={{ kind: "image", label: "Hero image placeholder", assetId: `${sampleCaseStudy.slug}-hero` }}
              metrics={sampleCaseStudy.outcomes}
              highlightTags={sampleCaseStudy.highlightTags}
              fullBleed={false}
            />
          </div>
        </Container>
      </section>

      {/* NarrativeSection */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>NarrativeSection</h2>
          <p style={captionStyle}>
            The workhorse of the narrative case study system: eyebrow, heading, body, with optional pull quote, key
            takeaway, and media beats.
          </p>
        </Container>
        <NarrativeSection section={sampleNarrativeSection} />
      </section>

      {/* PullQuote */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>PullQuote</h2>
          <p style={captionStyle}>
            A short, emphasized statement used at the moments a narrative pivots. Reused inside both
            NarrativeSection and Prototype.
          </p>
          <PullQuote lines={samplePullQuote.lines} attribution={samplePullQuote.attribution} />
        </Container>
      </section>

      {/* MediaFeature */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>MediaFeature</h2>
          <p style={captionStyle}>
            The atomic media placeholder plus caption, reused by NarrativeSection, Prototype, and Comparison. Shown
            here at its default wide scale.
          </p>
          <MediaFeature
            media={sampleComparisonSection.media}
            caption={sampleComparisonSection.caption}
            scale="wide"
          />
        </Container>
      </section>

      {/* Comparison */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>Comparison</h2>
          <p style={captionStyle}>Labeled before/after treatment, built around a single MediaFeature.</p>
        </Container>
        <Comparison section={sampleComparisonSection} />
      </section>

      {/* Prototype */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>Prototype</h2>
          <p style={captionStyle}>
            The emphasized treatment reserved for the most important asset in a case study: a tinted section, media,
            and a numbered walkthrough. Real usage runs the media full-bleed; shown here at wide scale to fit this
            page.
          </p>
        </Container>
        <Prototype section={samplePrototypeSection} />
      </section>

      {/* Metrics */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>Metrics</h2>
          <p style={captionStyle}>
            A full-width, color-inverted band for projects with real numeric outcomes. Runs full-bleed in
            production, framed here at the container width.
          </p>
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
            }}
          >
            <Metrics section={sampleMetricsSection} fullBleed={false} />
          </div>
        </Container>
      </section>

      {/* Outcome */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>Outcome</h2>
          <p style={captionStyle}>
            Qualitative outcomes for projects with nothing numeric to report. Used only on the Showcases full case
            study page.
          </p>
        </Container>
        <Outcome section={sampleOutcomeSection} />
      </section>

      {/* Reflection */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>Reflection</h2>
          <p style={captionStyle}>
            Closing reflection items for a detailed case study page. Also used only on the Showcases full case study
            page.
          </p>
        </Container>
        <Reflection section={sampleReflectionSection} />
      </section>

      {/* ClosingStatement */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>ClosingStatement</h2>
          <p style={captionStyle}>
            The short closing coda for a portfolio case study presentation: one emphasized line, one supporting
            sentence.
          </p>
        </Container>
        <ClosingStatement statement={sampleClosingStatement} />
      </section>

      {/* NextProject */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>NextProject</h2>
          <p style={captionStyle}>Footer teaser linking to the next case study.</p>
        </Container>
        <NextProject
          href={`/case-studies/${sampleNextProject.slug}`}
          title={sampleNextProject.title}
          company={sampleNextProject.company}
        />
      </section>

      {/* CaseStudySection */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>CaseStudySection</h2>
          <p style={captionStyle}>Section with label, title, body, optional image and metrics</p>
          <div style={{ marginTop: "var(--space-8)" }}>
            <CaseStudySection
              section={sampleSection}
            />
          </div>
        </Container>
      </section>

      {/* CardGrid (minimal set) */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>CardGrid</h2>
          <p style={captionStyle}>
            Editorial grid: About + case study cards (subset for showcase). Spans full-bleed in production, framed
            here at the container width.
          </p>
          <div
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
            }}
          >
            <CardGrid cards={showcaseCards} />
          </div>
        </Container>
      </section>

      {/* How to add a new component */}
      <section id="how-to-add" style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>How to add a new component</h2>
          <p style={captionStyle}>Checklist for keeping new work aligned with the system</p>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--color-ink)", maxWidth: "40rem" }}>
            <ol style={{ paddingLeft: "1.25rem", lineHeight: "var(--leading-relaxed)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <li>
                <strong>Pick spacing from tokens only.</strong> Use <code>--space-*</code> for padding, gaps, and margins
                (for example: inner padding with <code>--space-4</code>, section spacing with{" "}
                <code>--space-12</code>). Avoid raw pixel or rem values.
              </li>
              <li>
                <strong>Use color roles, not raw hex.</strong> The whole palette is five tokens: <code>--color-paper</code>{" "}
                (background), <code>--color-ink</code> (text, headings), <code>--color-muted</code> (secondary text),{" "}
                <code>--color-border</code> (hairlines), and <code>--color-overlay</code> (subtle fills/tints).
              </li>
              <li>
                <strong>Choose a radius from the scale.</strong> Apply <code>--radius-*</code> to shapes (
                <code>--radius-md</code> for small UI, <code>--radius-xl</code>/<code>--radius-2xl</code> for cards).
              </li>
              <li>
                <strong>Reuse the shared heading classes, don&apos;t hand-roll them.</strong> Section/subsection
                headings are <code>.section-heading</code> / <code>.subsection-heading</code> (both defined once in
                globals.css), not a copy-pasted <code>fontWeight</code>/<code>letterSpacing</code>/<code>fontSize</code>{" "}
                style object. H1 = <code>.text-display</code>, body = <code>--text-body</code>.
              </li>
              <li>
                <strong>Pick the right small-text class.</strong> <code>.text-label</code> is uppercase and tracked
                out, for short words/phrases only (an eyebrow, a tag). The moment the text runs to a full sentence,
                a caption or a description, use <code>.text-caption</code> instead (sentence case). Uppercase does not
                read well past a word or two.
              </li>
              <li>
                <strong>Theme color is scoped to the hero and homepage cards only.</strong> A case study&apos;s
                light/dark theme pair sets its <code>CaseStudyHero</code> and its <code>CaseStudyCard</code>. Every
                other component in the case study body (sections, quotes, media placeholders, the metrics band, the
                next-project footer) uses the fixed ink/paper palette above, regardless of which case study it&apos;s
                in.
              </li>
              <li>
                <strong>Add a demo to this page.</strong> Create a small example of the component here (like the card,
                hero, and section examples) and list the key tokens it uses. This page is the source of truth.
              </li>
            </ol>
          </div>
        </Container>
      </section>
    </main>
  );
}
