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
}

export function AboutCard({ isAnimatingIn = false }: AboutCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  useEffect(() => {
    return transitionStore.subscribe(() => {
      const s = transitionStore.getState();
      if (s.slug !== "about") return;
      if (s.phase === "content-fade-in") {
        setTimeout(() => setContentVisible(true), 100);
      }
      if (s.phase === "idle") {
        setContentVisible(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isAnimatingIn) {
      setContentVisible(false);
    }
  }, [isAnimatingIn]);

  const handleClick = useCallback(() => {
    if (!cardRef.current) return;
    if (transitionStore.getState().phase !== "idle") return;
    const rect = cardRef.current.getBoundingClientRect();
    setContentVisible(false);
    transitionStore.beginExpand(
      { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      ABOUT_THEME_COLOR,
      "about"
    );
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
        height: "100%",
        minHeight: "520px",
        backgroundColor: "var(--color-ink)",
        borderRadius: "2px",
        overflow: "hidden",
        cursor: "pointer",
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
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(1.5rem, 4vw, 2.5rem)",
        }}
      >
          {/* Top: availability indicator */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#4ade80",
                }}
              />
              <span
                className="text-label"
                style={{ color: "rgba(248,247,244,0.35)" }}
              >
                Available for work
              </span>
            </div>

            {/* Arrow — slides on hover */}
            <motion.div
              animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0.3 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3.75 9H14.25M14.25 9L9 3.75M14.25 9L9 14.25"
                  stroke="rgba(248,247,244,0.6)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Bottom: name + bio + companies */}
          <div>
            {/* Avatar circle */}
            <div
              style={{
                width: "64px",
                height: "64px",
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

            <h2
              className="text-display"
              style={{
                color: "var(--color-paper)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1,
                marginBottom: "1rem",
              }}
            >
              Your<br />
              <span style={{ opacity: 0.45, fontStyle: "italic" }}>Name</span>
            </h2>

            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.65,
                color: "rgba(248,247,244,0.5)",
                maxWidth: "260px",
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
