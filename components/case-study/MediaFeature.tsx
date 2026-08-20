"use client";
// components/case-study/MediaFeature.tsx
//
// One media "beat": a placeholder plus its caption, as a semantic
// figure/figcaption pair. This is the atomic unit reused by NarrativeSection
// (for each beat), Prototype, and Comparison — rather than duplicating the
// placeholder + caption markup in each of them.
//
// `scale` is the visual-rhythm lever: three weights so a page doesn't read
// as one repeated size. "full-bleed" should be rare — reserved for the
// single strongest moment on a page.

import { MediaPlaceholder } from "./MediaPlaceholder";
import type { MediaPlaceholderData, MediaScale } from "@/types/narrative-case-study";

interface MediaFeatureProps {
  media: MediaPlaceholderData;
  caption?: string;
  themeColor: string;
  themeColorDark: string;
  scale?: MediaScale;
  aspect?: string;
}

export function MediaFeature({
  media,
  caption,
  themeColor,
  themeColorDark,
  scale = "wide",
  aspect,
}: MediaFeatureProps) {
  // Full-bleed uses an explicit inline calc (same formula as CaseStudyHero's
  // breakout) rather than Tailwind's -mx utilities, since the element must
  // reach the true viewport edge regardless of Container's own width — a
  // negative margin sized to the container isn't enough.
  const wrapperClassName = scale === "wide" ? "-mx-6 md:-mx-10" : "";

  const wrapperStyle: React.CSSProperties =
    scale === "full-bleed"
      ? { margin: 0, width: "100vw", marginLeft: "calc(-50vw + 50%)" }
      : scale === "contained"
      ? { margin: 0, maxWidth: "42.5rem" }
      : { margin: 0 };

  return (
    <figure className={wrapperClassName} style={wrapperStyle}>
      <MediaPlaceholder data={media} themeColor={themeColor} themeColorDark={themeColorDark} aspect={aspect} />
      {caption && (
        <figcaption
          className="text-label"
          style={{
            color: "var(--color-muted)",
            marginTop: "var(--space-6)",
            maxWidth: scale === "contained" ? "42.5rem" : "38rem",
            paddingLeft: scale !== "contained" ? "var(--space-8)" : 0,
            paddingRight: scale !== "contained" ? "var(--space-8)" : 0,
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
