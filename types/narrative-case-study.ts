// types/narrative-case-study.ts
//
// Content model for the new, motion-forward case-study system.
// Scope is deliberately limited to what "Reimagining Showcases" actually
// needs — see README / Phase 2 notes before adding new section types.
//
// This model is additive: it does not replace `types/case-study.ts`, which
// still powers the legacy case studies (Viewing Experience, Video
// Engagement, and the placeholders) until they're migrated.

/** What kind of asset will eventually replace this placeholder. */
export type MediaPlaceholderKind = "screen-recording" | "gif" | "animation" | "image";

export interface MediaPlaceholderData {
  kind: MediaPlaceholderKind;
  /** Short label — what the asset shows, e.g. "Legacy Showcase experiences" */
  label: string;
  /** Optional longer shot-list / directive copied from the approved brief. */
  description?: string;
  /** Manifest key, e.g. "showcases-legacy-layouts" — for matching against the asset list when real media lands. */
  assetId: string;
  /** Defaults to 16/9 at the component level. */
  aspect?: "16/9" | "1/1" | "4/3" | "21/9";
}

/**
 * Three visual weights, used to build rhythm across a page instead of every
 * media moment reading at the same size:
 *   - "full-bleed" — breaks out to the viewport edge. Reserved for the
 *     single strongest interaction moment on a page.
 *   - "wide"       — breaks out of the text column but stays within the
 *     page's max-width. The default for major supporting visuals.
 *   - "contained"  — sits inside the body-copy measure. For secondary,
 *     confirming evidence rather than a headline visual.
 */
export type MediaScale = "full-bleed" | "wide" | "contained";

/** One media moment within a NarrativeSection — a beat in the sequence. */
export interface MediaBeat {
  /** Optional secondary heading — used when a section transitions directly into a distinct second moment (e.g. "...adapts across contexts" beat, then a "The first iteration" beat) without starting a new top-level section. */
  heading?: string;
  /** Optional short text tied specifically to this beat (used when a section reveals two media moments in sequence, e.g. "explore" then "winner"). */
  body?: string;
  media: MediaPlaceholderData;
  caption?: string;
  /** Defaults to "wide" at the component level. */
  scale?: MediaScale;
}

export interface PullQuoteData {
  /** One or two short emphasized lines. */
  lines: string[];
  attribution?: string;
}

// ── Section types ───────────────────────────────────────────────────────
// Each maps to exactly one component. No shared "everything optional" shape —
// composition over a single polymorphic renderer.

export interface NarrativeSectionData {
  type: "narrative";
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  pullQuote?: PullQuoteData;
  /** Zero or more sequential media moments. */
  beats?: MediaBeat[];
  /** Optional bolded, italic callout line — used sparingly, for a single distilled takeaway. */
  keyTakeaway?: string;
  /** When true, the first beat's media renders above the heading/body instead of below — for sections where the visual should introduce the idea rather than illustrate it. */
  mediaFirst?: boolean;
  /** When true, reduces heading size and vertical padding — for a deliberately quick, low-weight beat rather than a major statement. */
  compact?: boolean;
}

export interface ComparisonSectionData {
  type: "comparison";
  id: string;
  eyebrow: string;
  heading: string;
  body?: string;
  /** Showcases' before/after moments are demonstrated by a single asset (the transition is the point), labeled rather than split into two media items. */
  media: MediaPlaceholderData;
  beforeLabel: string;
  afterLabel: string;
  caption?: string;
  /** Optional second, smaller tradeoff — rendered quieter (contained) within the same section rather than as a new numbered beat. Use sparingly; the point is judgment, not a catalog of every tradeoff. */
  secondaryBeat?: MediaBeat;
}

export interface PrototypeSectionData {
  type: "prototype";
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  pullQuote?: PullQuoteData;
  media: MediaPlaceholderData;
  /** Numbered shot list — what the recording demonstrates, step by step. */
  steps?: string[];
  caption?: string;
  /** Defaults to "wide". Set to "full-bleed" to make this the page's single strongest visual moment (also bumps heading size). */
  mediaScale?: MediaScale;
}

export interface OutcomeItem {
  title: string;
  body: string;
}

export interface OutcomeSectionData {
  type: "outcome";
  id: string;
  heading: string;
  /** Deliberately qualitative — no fabricated metrics for projects where none were supplied. */
  items: OutcomeItem[];
}

export interface ReflectionItem {
  title: string;
  body: string;
}

export interface ReflectionSectionData {
  type: "reflection";
  id: string;
  heading: string;
  items: ReflectionItem[];
}

export interface MetricItem {
  value: string;
  label: string;
  description?: string;
}

/**
 * For projects with real, supplied numeric outcomes (unlike `OutcomeSectionData`,
 * which is deliberately non-numeric for projects with no metrics to report).
 * Renders as a single dramatic, full-width, color-inverted band rather than a
 * grid of small cards — one clear "biggest moment," not six equal boxes.
 */
export interface MetricsSectionData {
  type: "metrics";
  id: string;
  /** Optional numbered eyebrow, matching the treatment used by the other section types — omitted on projects that don't number their beats. */
  eyebrow?: string;
  heading: string;
  intro?: string;
  items: MetricItem[];
}

export type NarrativeCaseStudySection =
  | NarrativeSectionData
  | ComparisonSectionData
  | PrototypeSectionData
  | OutcomeSectionData
  | ReflectionSectionData
  | MetricsSectionData;

export interface NextProjectRef {
  slug: string;
  title: string;
  company: string;
  themeColor: string;
  themeColorDark: string;
}

export interface NarrativeCaseStudyMeta {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  company: string;
  role: string;
  year: string;
  team: string;
  themeColor: string;
  themeColorDark: string;
  /** Short, non-numeric highlight phrases for the homepage card — not metrics. */
  cardHighlights: string[];
  /** The hero's full-bleed 1:1 image (rendered at "1/1" regardless of this data's own `aspect`). */
  heroImage: MediaPlaceholderData;
}

/**
 * The short closing coda for the condensed/portfolio presentation — one
 * emphasized line plus one supporting sentence. Deliberately not part of
 * `NarrativeCaseStudySection` since it isn't a repeating section pattern;
 * it's a single frame element, like the hero and context band.
 */
export interface ClosingStatementData {
  quote: string;
  support: string;
}

export interface NarrativeCaseStudy extends NarrativeCaseStudyMeta {
  sections: NarrativeCaseStudySection[];
  nextProject: NextProjectRef;
  /** Present on condensed/portfolio presentations; omitted on detailed ones (which close with a `reflection` section instead). */
  closingStatement?: ClosingStatementData;
}
