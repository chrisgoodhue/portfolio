"use client";
// components/AboutCard.tsx
// Same overlay transition as case study cards: expand from card → fullscreen, shrink on back.
import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { transitionStore } from "@/lib/transition-store";

const ABOUT_THEME_COLOR = "#0A0A0A"; // --color-ink
const companies = ["Vimeo", "Spotify", "NYT", "IDEO"];

interface AboutCardProps {
  isAnimatingIn?: boolean;
  /** Only reveal this card for the matching transition request (prevents stale flashes). */
  returnRequestId?: number | null;
}

export function AboutCard({ isAnimatingIn = false, returnRequestId = null }: AboutCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  // Start hidden when we know we're returning (prevents a 1-frame flash).
  const [contentVisible, setContentVisible] = useState(() => !isAnimatingIn);

  useEffect(() => {
    return transitionStore.subscribe(() => {
      const s = transitionStore.getState();
      if (s.slug !== "about") return;
      if (returnRequestId != null && s.requestId !== returnRequestId) return;
      if (s.phase === "content-fade-in") {
        setTimeout(() => setContentVisible(true), 100);
      }
      if (s.phase === "idle") {
        setContentVisible(true);
      }
    });
  }, [returnRequestId]);

  useEffect(() => {
    if (isAnimatingIn) {
      setContentVisible(false);
    }
  }, [isAnimatingIn]);

  const handleClick = useCallback(() => {
    if (!cardRef.current) return;
    if (transitionStore.getState().phase !== "idle") return;

    // Start transition immediately to prevent rapid double-click races.
    const scrollY = typeof window !== "undefined" ? window.scrollY ?? 0 : 0;
    transitionStore.requestExpandMeta(ABOUT_THEME_COLOR, "about", scrollY);
    setContentVisible(false);

    const rect = cardRef.current.getBoundingClientRect();
    transitionStore.setExpandRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
      tabIndex={0}
      aria-label="Open About"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "20rem",
        backgroundColor: "var(--color-ink)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        alignItems: "stretch",
        // Prevent the card background from flashing while content is intentionally hidden.
        opacity: isAnimatingIn ? (contentVisible ? 1 : 0) : 1,
        transition: "opacity 0.35s ease-out",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated background texture */}
      <motion.div
        animate={{ scale: hovered ? 1.04 : 1, opacity: hovered ? 0.06 : 0.04 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          inset: "-10%",
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(248,247,244,0.4) 0%, transparent 60%),
              repeating-linear-gradient(45deg, rgba(248,247,244,0.15) 0px, rgba(248,247,244,0.15) 1px, transparent 1px, transparent 28px)`,
        }}
      />

      {/* Content — fades out on click, fades in on return */}
      <motion.div
        animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 20 }}
        transition={{
          duration: contentVisible ? 0.7 : 0.35,
          ease: [0.22, 1, 0.36, 1],
          delay: contentVisible ? 0.1 : 0,
        }}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(1.5rem, 4vw, 2.5rem)",
          width: "100%",
        }}
      >
          {/* Name + bio + companies */}
          <div>
            {/* Avatar circle */}
            <div
              style={{
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                backgroundColor: "rgba(248,247,244,0.08)",
                border: "1px solid rgba(248,247,244,0.12)",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {/* Replace with <Image> for actual photo */}
              <span style={{ color: "rgba(248,247,244,0.2)", fontSize: "1.5rem" }}>↗</span>
            </div>

            <h1
              className="mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "var(--color-paper)",
                fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)",
                lineHeight: 1,
                marginBottom: "1rem",
              }}
            >
              Your<br />
              <span style={{ opacity: 0.45, fontStyle: "italic" }}>Name</span>
            </h1>

            <p
              style={{
                fontSize: "var(--text-sm)",
                lineHeight: 1.65,
                color: "rgba(248,247,244,0.5)",
                maxWidth: "16.25rem",
                marginBottom: "2rem",
              }}
            >
              Principal Product Designer. Systems thinker, storyteller,
              12 years making digital things feel inevitable.
            </p>

            {/* Companies */}
            <div>
              <p
                className="text-label"
                style={{ color: "rgba(248,247,244,0.25)", marginBottom: "0.625rem" }}
              >
                Previously
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem" }}>
                {companies.map((co) => (
                  <span
                    key={co}
                    className="text-label"
                    style={{ color: "rgba(248,247,244,0.4)" }}
                  >
                    {co}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  );
}
