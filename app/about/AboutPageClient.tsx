"use client";
// Handles overlay transition: request fade when mounted from card, back button triggers collapse.

import { useEffect, useRef } from "react";
import { Container } from "@/components/Container";
import { transitionStore } from "@/lib/transition-store";

const timeline = [
  { year: "2023–2025", role: "Principal Product Designer", company: "Vimeo" },
  { year: "2020–2023", role: "Senior Product Designer", company: "Spotify" },
  { year: "2017–2020", role: "Product Designer", company: "The New York Times" },
  { year: "2014–2017", role: "UX Designer", company: "IDEO" },
];

const capabilities = [
  "Product Strategy",
  "Design Systems",
  "User Research",
  "Interaction Design",
  "Prototyping",
  "Design Leadership",
  "Cross-platform Design",
  "Information Architecture",
];

export function AboutPageClient() {
  const fadeRequestedRef = useRef(false);

  useEffect(() => {
    const ts = transitionStore.getState();
    if (ts.phase === "expanded" || ts.phase === "page-fade-in") {
      transitionStore.setPhase("page-fade-in");
      if (fadeRequestedRef.current) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (fadeRequestedRef.current) return;
          fadeRequestedRef.current = true;
          transitionStore.requestOverlayFadeOut();
        });
      });
    }
  }, []);

  const handleBack = () => {
    const storedRect = transitionStore.getState().rect;
    const rect = storedRect ?? {
      top: 100,
      left: 80,
      width: Math.min(typeof window !== "undefined" ? window.innerWidth * 0.65 : 400, 800),
      height: 520,
    };
    const collapse = (typeof window !== "undefined" && (window as any).__portfolioCollapse) as
      | ((r: { top: number; left: number; width: number; height: number }) => Promise<void>)
      | undefined;
    if (typeof collapse === "function") {
      collapse(rect);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--color-paper)" }}>
      <header
        className="flex items-center justify-between px-5 py-5"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <button
          type="button"
          onClick={handleBack}
          className="text-label"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-muted)",
            padding: 0,
          }}
        >
          ← Work
        </button>
        <span className="text-label" style={{ color: "var(--color-ink)" }}>
          About
        </span>
      </header>

      <div
        style={{
          borderBottom: "1px solid var(--color-border)",
          padding: "6rem 0 5rem",
        }}
      >
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <div
                className="mb-10"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "var(--color-paper)", opacity: 0.4, fontSize: "1.5rem" }}>
                  ↗
                </span>
              </div>

              <h1
                className="text-display"
                style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", lineHeight: 0.9 }}
              >
                Your<br />
                <em style={{ fontStyle: "italic", opacity: 0.5 }}>Name</em>
              </h1>

              <p
                className="mt-10 leading-relaxed"
                style={{
                  fontSize: "1.25rem",
                  maxWidth: "560px",
                  color: "var(--color-ink)",
                  opacity: 0.7,
                }}
              >
                Principal Product Designer with 10+ years crafting digital experiences at the
                intersection of systems thinking and human-centered design. Currently focused on
                scaling design practice at high-growth companies.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div style={{ borderBottom: "1px solid var(--color-border)", padding: "5rem 0" }}>
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="text-label" style={{ color: "var(--color-muted)" }}>
                Experience
              </p>
            </div>
            <div className="col-span-12 lg:col-span-9">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between py-6"
                  style={{
                    borderBottom:
                      i < timeline.length - 1 ? "1px solid var(--color-border)" : "none",
                  }}
                >
                  <div>
                    <p
                      className="text-display"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
                    >
                      {item.company}
                    </p>
                    <p className="text-label mt-1" style={{ color: "var(--color-muted)" }}>
                      {item.role}
                    </p>
                  </div>
                  <p className="text-label" style={{ color: "var(--color-muted)" }}>
                    {item.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div style={{ borderBottom: "1px solid var(--color-border)", padding: "5rem 0" }}>
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="text-label" style={{ color: "var(--color-muted)" }}>
                Capabilities
              </p>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="flex flex-wrap gap-3">
                {capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="text-label"
                    style={{
                      border: "1px solid var(--color-border)",
                      padding: "0.5rem 1rem",
                      borderRadius: "2px",
                      color: "var(--color-ink)",
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div style={{ padding: "5rem 0" }}>
        <Container>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="text-label" style={{ color: "var(--color-muted)" }}>
                Contact
              </p>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <a
                href="mailto:hello@yourname.com"
                className="text-display"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  display: "inline-block",
                  borderBottom: "2px solid var(--color-ink)",
                  paddingBottom: "0.25rem",
                }}
              >
                hello@yourname.com
              </a>

              <div className="mt-10 flex gap-8">
                {["LinkedIn", "Read.cv", "Dribbble"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-label"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {link} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
