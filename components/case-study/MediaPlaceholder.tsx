"use client";
// components/case-study/MediaPlaceholder.tsx
//
// A clearly labeled stand-in for an asset that hasn't been produced yet.
// Every placeholder announces exactly what will replace it (kind + shot
// description) so the page can be evaluated for rhythm and craft before
// real media exists. Swap for <video>/<Image> per assetId when ready.

import { motion, useReducedMotion } from "framer-motion";
import type { MediaPlaceholderData } from "@/types/narrative-case-study";

const KIND_LABEL: Record<MediaPlaceholderData["kind"], string> = {
  "screen-recording": "Screen Recording",
  gif: "GIF",
  animation: "Animation",
  image: "Image",
};

interface MediaPlaceholderProps {
  data: MediaPlaceholderData;
  aspect?: string;
}

export function MediaPlaceholder({ data, aspect }: MediaPlaceholderProps) {
  const reduceMotion = useReducedMotion();
  const ratio = aspect ?? data.aspect ?? "16/9";

  return (
    <div
      role="img"
      aria-label={`Placeholder for ${KIND_LABEL[data.kind].toLowerCase()}: ${data.label}`}
      data-asset-id={data.assetId}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: ratio,
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        backgroundColor: "var(--color-overlay)",
        border: "1px dashed rgba(10, 10, 10, 0.25)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(1.5rem, 4vw, 3rem)",
      }}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(10, 10, 10, 0.35), transparent)",
          }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <span
        className="text-label"
        style={{
          color: "var(--color-muted)",
          marginBottom: "0.75rem",
          padding: "0.25rem 0.6rem",
          border: "1px solid var(--color-border)",
          borderRadius: "999px",
        }}
      >
        {KIND_LABEL[data.kind]}
      </span>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          color: "var(--color-ink)",
          maxWidth: "32rem",
        }}
      >
        {data.label}
      </p>

      {data.description && (
        <p
          className="text-caption"
          style={{
            marginTop: "0.75rem",
            color: "var(--color-muted)",
            maxWidth: "28rem",
            lineHeight: 1.6,
          }}
        >
          {data.description}
        </p>
      )}
    </div>
  );
}
