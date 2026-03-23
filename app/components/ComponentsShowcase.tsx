"use client";
// app/components/ComponentsShowcase.tsx — Renders all reusable components for visual QA.
// Uses design tokens (spacing, radius, type, colors) — no raw pixels.

import Link from "next/link";
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
  marginBottom: "var(--space-2)",
};

const headingStyle = {
  fontFamily: "var(--font-body)",
  fontWeight: 700,
  fontSize: "var(--text-2xl)",
  letterSpacing: "-0.02em",
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
                  gap: "var(--space-2)",
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 2fr)",
              gap: "var(--space-10)",
              alignItems: "flex-start",
            }}
          >
            {/* Left: explanation & usage */}
            <div>
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
                  maxWidth: "30rem",
                }}
              >
                <p>
                  Tokens are the single source of truth for layout and visual style. Use them instead of raw values so
                  spacing, shape, typography, and color stay consistent—even as the system evolves.
                </p>
                <p>
                  Each group below shows the available tokens and how they’re typically applied: compact vs. layout
                  spacing, card vs. chip radius, type hierarchy, and color roles for backgrounds, text, borders, and
                  icons.
                </p>
              </div>
            </div>

            {/* Right: visuals */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-12)", // even more vertical space between token groups
                fontSize: "var(--text-sm)",
                fontFamily: "var(--font-mono)",
                color: "var(--color-ink)",
              }}
            >
              {/* Spacing scale (vertical bars stacked in a single column) */}
              <div>
                <p style={{ fontWeight: 700, marginBottom: "var(--space-3)" }}>Spacing</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  gap: "var(--space-6)",
                  }}
                >
                  {[
                    { token: "--space-1", label: "2px · hairline spacing" },
                    { token: "--space-2", label: "4px · tight spacing, icon offsets" },
                    { token: "--space-4", label: "8px · small gaps & inner padding" },
                    { token: "--space-5", label: "12px · vertical rhythm inside cards" },
                    { token: "--space-6", label: "16px · default component padding" },
                    { token: "--space-8", label: "24px · gaps between cards & sections" },
                    { token: "--space-9", label: "32px · layout spacing" },
                    { token: "--space-10", label: "40px · generous layout spacing" },
                    { token: "--space-11", label: "48px · hero & large blocks" },
                    { token: "--space-12", label: "64px · page section padding" },
                    { token: "--space-13", label: "80px · extra spacious layouts" },
                    { token: "--space-14", label: "96px · hero bands, page edges" },
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
                <p style={{ fontWeight: 700, marginBottom: "var(--space-3)" }}>Radius</p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: "var(--space-6)",
                    alignItems: "start",
                  }}
                >
                  {[
                    { token: "--radius-sm", label: "4px · small UI, chips" },
                    { token: "--radius-md", label: "8px · buttons, inputs" },
                    { token: "--radius-lg", label: "12px · larger surfaces" },
                    { token: "--radius-xl", label: "16px · cards" },
                    { token: "--radius-2xl", label: "24px · featured cards" },
                    { token: "--radius-3xl", label: "32px · hero surfaces" },
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
                          margin: "0 auto var(--space-2)",
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
                <p style={{ fontWeight: 700, marginBottom: "var(--space-5)" }}>Typography</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-8)", // larger, consistent spacing between type samples
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
                    <p
                      style={{
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        fontSize: "var(--text-section)",
                      }}
                    >
                      Section heading / H2
                    </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      opacity: 0.7,
                      marginTop: "var(--space-3)",
                    }}
                  >
                    --text-section, --font-body
                  </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        fontSize: "var(--text-subsection)",
                      }}
                    >
                      Subsection heading / H3
                    </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      opacity: 0.7,
                      marginTop: "var(--space-3)",
                    }}
                  >
                    --text-subsection, --font-body
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
                </div>
              </div>

              {/* Colors & roles */}
              <div>
                <p style={{ fontWeight: 700, marginBottom: "var(--space-3)" }}>Colors &amp; roles</p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                    gap: "var(--space-6)",
                    alignItems: "start",
                  }}
                >
                  {[
                    { token: "--background-page", label: "Page background" },
                    { token: "--background-card", label: "Card background" },
                    { token: "--text-primary", label: "Primary text" },
                    { token: "--text-secondary", label: "Secondary text" },
                    { token: "--border-subtle", label: "Subtle border" },
                    { token: "--icon-primary", label: "Primary icon" },
                    { token: "--color-ink", label: "Base ink" },
                    { token: "--color-paper", label: "Base paper" },
                  ].map(({ token, label }) => (
                    <div key={token} style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "var(--radius-md)",
                          backgroundColor: token.startsWith("--text") || token.startsWith("--icon")
                            ? "var(--color-paper)"
                            : `var(${token})`,
                          border:
                            token === "--background-page" ||
                            token === "--background-card" ||
                            token === "--border-subtle" ||
                            token === "--color-paper"
                              ? "1px solid var(--color-border)"
                              : "none",
                          margin: "0 auto var(--space-1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color:
                            token === "--text-primary" || token === "--text-secondary"
                              ? "var(--color-ink)"
                              : "inherit",
                        }}
                      >
                        {token.startsWith("--text") || token.startsWith("--icon") ? "A" : null}
                      </div>
                      <div>{label}</div>
                      <div style={{ opacity: 0.6 }}>{token}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Container + typography */}
      <section style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>Container & typography</h2>
          <p style={captionStyle}>Container constrains width; headings use DM Sans bold, H1 uses Playfair display</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <p className="text-label" style={{ color: "var(--color-muted)" }}>
              Label / uppercase mono
            </p>
            <p className="text-display" style={{ fontSize: "var(--text-display)", color: "var(--color-ink)" }}>
              H1 / Display (Playfair)
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                fontSize: "var(--text-2xl)",
                color: "var(--color-ink)",
              }}
            >
              H2 / Section heading (DM Sans)
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                fontSize: "var(--text-xl)",
                color: "var(--color-ink)",
              }}
            >
              H3 / Subsection heading (DM Sans)
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

      {/* Navigation (docs) */}
      <section id="components" style={showcaseSectionStyle}>
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 2fr)",
              gap: "var(--space-10)",
              alignItems: "flex-start",
            }}
          >
            {/* Left: spec */}
            <div>
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
                  maxWidth: "30rem",
                }}
              >
                <p>
                  Fixed header that appears on every page. Shows site label on the left and primary destinations on the
                  right.
                </p>

                <div>
                  <p className="text-label" style={{ color: "var(--color-muted)", marginBottom: "var(--space-2)" }}>
                    Tokens
                  </p>
                  <ul
                    style={{
                      paddingLeft: "1.25rem",
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-2)",
                    }}
                  >
                    <li>
                      Spacing: <code>--space-6</code> (header padding), <code>--space-8</code> (gap between links)
                    </li>
                    <li>
                      Colors: <code>--background-page</code>, <code>--text-secondary</code> (default),{" "}
                      <code>--text-primary</code> (hover/active)
                    </li>
                    <li>
                      Typography: <code>.text-label</code> (mono, uppercase) for links
                    </li>
                    <li>
                      Border (optional): <code>--border-subtle</code> for a bottom rule
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-label" style={{ color: "var(--color-muted)", marginBottom: "var(--space-2)" }}>
                    Usage
                  </p>
                  <ul
                    style={{
                      paddingLeft: "1.25rem",
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-2)",
                    }}
                  >
                    <li>Use only for primary navigation (Home, About, Components, Contact).</li>
                    <li>Don’t add secondary actions or CTAs here; keep those in page content.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: visual example (non-fixed) */}
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--background-page)",
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
                <span className="text-label" style={{ color: "var(--text-secondary)" }}>
                  Portfolio
                </span>
                <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-8)" }}>
                  {["About", "Components", "Contact"].map((item) => (
                    <span key={item} className="text-label" style={{ color: "var(--text-secondary)" }}>
                      {item}
                    </span>
                  ))}
                </nav>
              </div>
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

      {/* How to add a new component */}
      <section id="how-to-add" style={showcaseSectionStyle}>
        <Container>
          <h2 style={headingStyle}>How to add a new component</h2>
          <p style={captionStyle}>Checklist for keeping new work aligned with the system</p>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--color-ink)", maxWidth: "40rem" }}>
            <ol style={{ paddingLeft: "1.25rem", lineHeight: "var(--leading-relaxed)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <li>
                <strong>Pick spacing from tokens only.</strong> Use <code>--space-*</code> for padding, gaps, and margins
                (for example: inner padding with <code>--space-4</code> / <code>--space-5</code>, section spacing with{" "}
                <code>--space-12</code>). Avoid raw pixel or rem values.
              </li>
              <li>
                <strong>Use color roles, not raw hex.</strong> Choose from <code>--background-*</code>,{" "}
                <code>--text-*</code>, <code>--border-*</code>, and <code>--icon-*</code> (for example:{" "}
                <code>--background-card</code>, <code>--text-primary</code>, <code>--border-subtle</code>).
              </li>
              <li>
                <strong>Choose a radius from the scale.</strong> Apply <code>--radius-*</code> to shapes (
                <code>--radius-md</code> for small UI, <code>--radius-xl</code>/<code>--radius-2xl</code> for cards).
              </li>
              <li>
                <strong>Map typography to tokens.</strong> Use the same patterns as above: H1 = display, H2/H3 = DM Sans
                bold with <code>--text-section</code>/<code>--text-subsection</code>, body = <code>--text-body</code>.
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
