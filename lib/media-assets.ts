// lib/media-assets.ts
//
// Manifest of real media that has replaced a MediaPlaceholder stand-in.
// Keyed by the same `assetId` every MediaPlaceholderData already carries
// (see types/narrative-case-study.ts), so wiring in a finished asset is a
// one-line addition here rather than touching the placeholder's call site
// or the component itself. MediaPlaceholder checks this manifest first and
// renders a real <Image> when a match exists, falling back to the dashed
// placeholder otherwise.

export interface MediaAsset {
  /** Path under /public. */
  src: string;
  /** Intrinsic size, for aspect-ratio-correct rendering. */
  width: number;
  height: number;
}

export const MEDIA_ASSETS: Record<string, MediaAsset> = {
  "viewer-experience-hero": {
    src: "/images/vimeo-viewing-experience-hero.png",
    width: 1280,
    height: 1280,
  },
};
