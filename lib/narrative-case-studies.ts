// lib/narrative-case-studies.ts
//
// Content for case studies built on the new narrative system (see
// types/narrative-case-study.ts).
//
// Each project can have two presentations that share one set of facts:
//   - a PORTFOLIO presentation, short, visual, the primary experience
//     linked from the homepage card and nav
//   - a DETAILED presentation, the full case study, reachable at
//     /case-studies/<slug>/full, not linked from primary navigation
//
// Both presentations share the same top-level meta (title, subtitle,
// description, role/company/year/team, theme colors, card highlights) via
// a single `<project>Meta` object spread into both. That's the single
// source of truth for anything that must stay identical between the two.
// The `sections` arrays are intentionally NOT derived from one another:
// the portfolio version is an edited, shorter piece of writing, not a
// mechanical truncation of the detailed one, same relationship as an
// abstract to a paper. Facts must match; prose doesn't have to.
//
// Five projects live here:
//   - Showcases: portfolio AND detailed both built in this system.
//   - Viewer Experience: portfolio built here; "detailed" is the existing
//     legacy case-study page (lib/case-studies.ts), just re-routed to
//     /full instead of rebuilt, since it already exists and wasn't asked
//     to be redesigned. See the routing note near viewerExperiencePortfolio.
//   - Knowledge Discovery: portfolio only.
//   - Community Strategy: portfolio only (no /full, a single well-crafted
//     recruiter-facing page was judged sufficient; the exhaustive internal
//     write-up lives in the source-of-truth doc, not the site).
//   - Player Platform: portfolio only, same rationale as Community Strategy.
//
// Copy below is transcribed from the approved briefs / source documents
// verbatim. Do not add facts, metrics, or outcomes that weren't supplied.

import type { NarrativeCaseStudy, NarrativeCaseStudySection } from "@/types/narrative-case-study";
import type { CaseStudy, Metric } from "@/types/case-study";

// ── Shared facts: Viewer Experience ────────────────────────────────────────
// Defined first so Showcases' "next project" link can point at it directly,
// rather than looking it up from the legacy case-study list (which this
// project's primary route now shadows, see registries below).
const viewerExperienceMeta = {
  slug: "vimeo-viewing-experience",
  title: "Reimagining the Vimeo Viewing Experience",
  subtitle: "A modular platform for every way people watch on Vimeo.",
  description:
    "Vimeo's viewing experience had evolved into a collection of independently built surfaces. I led the design of a shared modular platform that could bring consistency to the underlying system while preserving the flexibility of different viewing contexts.",
  company: "Vimeo",
  role: "Principal Product Designer",
  year: "2023-2025",
  team: "3 PMs, 2 UX Researchers, 8 Engineers, 2 Designers",
  // Re-derived after the hero image was replaced with a 6-panel grid of
  // real Vimeo screens (staff picks feed, a video page, two differently
  // branded Showcases/live channels, comments, a private-video password
  // gate). The most prominent non-neutral color this time is Vimeo's own
  // product cyan (the "New" upload button chrome, repeated across three of
  // the six screens) — darkened the same Spotify-Color-Extractor way as
  // before for a background wash, rather than the flat, full-saturation
  // brand blue this replaced originally. themeColorDark stays the light
  // foreground color for the dark gradient CaseStudyHero renders.
  themeColor: "#17454F",
  themeColorDark: "#F8F7F4",
  // Non-numeric. The project's real growth metrics belong to the later
  // Community team's work (see Community Strategy below), not this one.
  // See "outcomes" section, eyebrow 07, for the correction and why.
  cardHighlights: ["Platform architecture", "Design with engineering", "Outlived its own team"] as string[],
  heroImage: {
    kind: "image" as const,
    label: "The unified viewing experience",
    description: "A hero shot of the new modular viewer, the single visual that stands in for the whole project.",
    assetId: "viewer-experience-hero",
  },
};

// ── Shared facts: Showcases ─────────────────────────────────────────────────
const showcasesMeta = {
  slug: "reimagining-showcases",
  title: "Designing a Canvas for Creators' Showcases",
  subtitle: "Resequencing an approved roadmap to fix the thing creators actually needed first.",
  description:
    "I inherited a four-phase customization roadmap for Vimeo Showcases, and found a sequencing problem serious enough to ask Product, Engineering, and the GM to delay a plan that already had approval. AI-assisted prototyping then de-risked the harder problem underneath it: how creators should edit a modular page.",
  company: "Vimeo",
  role: "Principal Product Designer",
  year: "2023-2025",
  team: "3 PMs, 2 UX Researchers, 8 Engineers, 2 Designers",
  themeColor: "#F2B84B",
  themeColorDark: "#3D2600",
  cardHighlights: ["Roadmap resequencing", "AI-assisted prototyping", "Creator customization"],
  heroImage: {
    kind: "image" as const,
    label: "The reimagined Showcase experience",
    description: "A hero shot of a fully customized Showcase (banners, multiple video sections, and text sections) shown in the click-to-edit interface.",
    assetId: "showcases-hero",
  },
};

// ── Shared facts: Knowledge Discovery ───────────────────────────────────────
// Source of truth: brief supplied 2026-08-21 ("From Playback to Knowledge
// Discovery"), cross-referenced against the "Empowering Viewers with Video
// Engagement" deck for `year` and `team` (not in the original brief). That
// deck bundles multiple draft passes that disagree on team size, 2 of 3
// mentions say 1 PM / 1 Researcher / 5 Engineers, one says 2 PMs; Chris
// confirmed 2 PMs + a separate Designer is correct on 2026-08-26.
const knowledgeDiscoveryMeta = {
  slug: "vimeo-knowledge-discovery",
  title: "From Playback to Knowledge Discovery",
  subtitle: "Transforming Vimeo's player into an interactive platform for learning, navigation, and discovery.",
  description:
    "For decades, video players had been optimized for one thing: playback. But as Vimeo expanded into Enterprise, it became clear customers weren't simply watching videos. They were searching for information, revisiting discussions, and sharing knowledge. I saw an opportunity to transform the player from a passive viewing surface into an interactive tool for discovery.",
  company: "Vimeo",
  role: "Principal Product Designer",
  year: "2023-2024",
  team: "2 PMs, 1 UX Researcher, 5 Engineers, 1 Designer",
  themeColor: "#A78BFA",
  themeColorDark: "#2E1065",
  cardHighlights: ["Embeddable transcripts", "Live DVR", "Segment sharing"],
  heroImage: {
    kind: "image" as const,
    label: "The knowledge discovery player",
    description: "A hero shot of the evolved player, with transcript, chapters, and navigation visible alongside playback.",
    assetId: "knowledge-discovery-hero",
  },
};

// ── Shared facts: Community Strategy ────────────────────────────────────────
// Source of truth: Community-Strategy-SOT (Wayfinder + Zach Adams pass).
// Portfolio-only, see note in the file header on why this project doesn't
// get a /full page.
const communityMeta = {
  slug: "reigniting-vimeo-community",
  title: "Reigniting the Vimeo Community",
  subtitle: "A growth strategy's first phase, designed and shipped.",
  description:
    "A strategic pivot had quietly starved Vimeo's community-facing surfaces for years. I joined the team built to reverse that and led design for its first phase: rebuilding Watch, relaunching Feed, and giving Community its own navigation.",
  company: "Vimeo",
  role: "Principal Product Designer",
  year: "2025",
  team: "Community team (dedicated designer)",
  themeColor: "#E8734A",
  themeColorDark: "#3D1A0A",
  cardHighlights: ["Growth strategy execution", "Cross-team navigation redesign", "A/B-validated relaunch"],
  heroImage: {
    kind: "image" as const,
    label: "The rebuilt Watch page and Feed",
    description: "A hero shot of Watch and Feed side by side, in their finished cinematic form, the single visual that stands in for the whole project.",
    assetId: "community-strategy-hero",
  },
};

// ── Shared facts: Player Platform ───────────────────────────────────────────
// Source of truth: Player-Platform-SOT (reconciled across multiple
// conflicting legacy drafts. Role locked to Principal Product Designer,
// two single-draft-only unverified claims dropped, unrelated Lead
// Generation / User Badging / Segmented Sharing scope excluded).
const playerMeta = {
  slug: "vimeo-player-platform",
  title: "Crafting a More Inclusive, Custom Player",
  subtitle: "Rebuilding a legacy player into a business case for accessibility.",
  description:
    "Vimeo's core player predated the company's own design system, offered creators almost no branding control, and had real accessibility gaps. I led a ground-up rebuild around four pillars: design system integration, brand customization, multiple audio tracks, and closed caption customization. That work turned a legacy liability into a certified, award-winning enterprise differentiator.",
  company: "Vimeo",
  role: "Principal Product Designer",
  year: "2023-2024",
  team: "1 PM, 5 Engineers, 1 Designer",
  themeColor: "#34D399",
  themeColorDark: "#064E3B",
  cardHighlights: ["Accessibility as a business strategy", "Design system stewardship", "Third-party verified outcomes"],
  heroImage: {
    kind: "image" as const,
    label: "The rebuilt, accessible player",
    description: "A hero shot of the rebuilt player mid-playback, showing a branded playbar, an open audio-track selector, and live closed captions in a custom color and font.",
    assetId: "player-platform-hero",
  },
};

// "Next project" cross-links: a five-way cycle so each project points to
// the next chapter: Viewer Experience → Knowledge Discovery → Showcases →
// Community Strategy → Player Platform → back to Viewer Experience. Derived
// from each other's shared meta object, not a lookup, so titles/colors
// can't drift.
const showcasesNextProject = {
  slug: communityMeta.slug,
  title: communityMeta.title,
  company: communityMeta.company,
  themeColor: communityMeta.themeColor,
  themeColorDark: communityMeta.themeColorDark,
};

const viewerExperienceNextProject = {
  slug: knowledgeDiscoveryMeta.slug,
  title: knowledgeDiscoveryMeta.title,
  company: knowledgeDiscoveryMeta.company,
  themeColor: knowledgeDiscoveryMeta.themeColor,
  themeColorDark: knowledgeDiscoveryMeta.themeColorDark,
};

const knowledgeDiscoveryNextProject = {
  slug: showcasesMeta.slug,
  title: showcasesMeta.title,
  company: showcasesMeta.company,
  themeColor: showcasesMeta.themeColor,
  themeColorDark: showcasesMeta.themeColorDark,
};

const communityNextProject = {
  slug: playerMeta.slug,
  title: playerMeta.title,
  company: playerMeta.company,
  themeColor: playerMeta.themeColor,
  themeColorDark: playerMeta.themeColorDark,
};

const playerNextProject = {
  slug: viewerExperienceMeta.slug,
  title: viewerExperienceMeta.title,
  company: viewerExperienceMeta.company,
  themeColor: viewerExperienceMeta.themeColor,
  themeColorDark: viewerExperienceMeta.themeColorDark,
};

// ── Showcases: portfolio presentation ───────────────────────────────────────
// 5 beats. Recruiter/hiring-manager facing. Headings + visuals carry the
// story; body copy is deliberately short.

const portfolioSections: NarrativeCaseStudySection[] = [
  {
    type: "narrative",
    id: "what-i-inherited",
    eyebrow: "01",
    heading: "Four months. The same unanswered question.",
    body: "I inherited an existing roadmap for Showcase customization: banners, additional video sections, text sections, phased in across four sequential, one-month engineering builds.\n\nEvery phase's planning notes carried forward the same open question, unresolved: is the preview clickable? Creators had been asking for a real, working preview for a long time. Every phase added more configuration on top of a preview that still didn't do the one thing people wanted most.",
    keyTakeaway: "Repetition in a backlog is a signal, not noise.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "showcases-roadmap-repeated-question",
          label: "The four-phase roadmap, annotated",
          description: "Annotate the original four-phase roadmap to show the recurring, unresolved \"Is the preview clickable?\" question at each phase.",
        },
        caption: "Four consecutive one-month builds. The same unanswered question every time.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "the-reset",
    eyebrow: "02",
    heading: "Reset the sequence",
    body: "That repetition is what caught my attention. I pushed to reset the plan: ship a working clickable preview, in its simplest form, before anything else, so creators built the right expectation for what editing a live Showcase actually felt like, before more ambitious customization arrived on top of it.\n\nThat meant asking my PM, engineering lead, and GM to delay a roadmap that was already scheduled and moving. I made the case with clear, sequenced prototypes showing what shipping the preview first would unlock, rather than arguing for it in the abstract, and the team agreed to delay the planned launch to do it.",
    keyTakeaway: "This is the decision from this project I'm most proud of. Not a shipped feature. It's the judgment call to slow down an approved roadmap to fix the thing creators had been asking for the entire time.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "showcases-resequenced-roadmap",
          label: "Before/after the reset",
          description: "Show the original four-phase plan versus the resequenced plan with the clickable preview moved to the front.",
        },
        caption: "The reset: fix the foundational behavior first, then build on top of it.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "building-the-system",
    eyebrow: "03",
    heading: "Consistency without sameness",
    body: "With the clickable preview shipped, the fuller customization roadmap moved forward on something creators already understood, instead of a widening set of one-off settings. Multiple banners, additional video sections, and text sections became configurable, coherent parts of one modular system.\n\nThe same underlying components and responsive rules stayed stable while what a creator could arrange kept expanding, and every option had to hold up across wide desktop widths, constrained embeds, and mobile, since Showcases live on Vimeo and across countless third-party sites.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-modular-system",
          label: "Banners, sections, and layout assembling into a Showcase",
          description: "Show banner, video-section, and text-section configuration options assembling into a customized Showcase, responsive from desktop to embedded to mobile.",
        },
        caption: "The same system, now genuinely configurable, and still consistent across contexts.",
        scale: "wide",
      },
    ],
  },
  {
    type: "prototype",
    id: "the-hard-problem",
    eyebrow: "04",
    heading: "How do you edit a modular page?",
    body: "Once there was more to configure, a new problem followed: how should someone customize a banner, add a video section, or rearrange layout without navigating an abstract settings panel?\n\nA click-to-edit model promised something more direct: select the part of the page you care about, edit it in place, see the result in context. Engineering flagged this as potentially expensive to build. Rather than leave it as a speculative discussion, I used AI-assisted prototyping to make the interaction tangible, turning a debate about an idea into an evaluation of something people could actually try.",
    media: {
      kind: "screen-recording",
      assetId: "showcases-ai-click-to-edit-prototype",
      label: "AI-assisted click-to-edit prototype",
      description: "Show a creator selecting a page region, changing its configuration, and seeing the page respond in context.",
    },
    steps: ["Creator selects a page region", "Editing state appears in place", "Creator changes the configuration", "Preview updates in context"],
    caption: "The working prototype validated that in-context editing could make a more complex system approachable rather than intimidating, before real engineering time was committed.",
    mediaScale: "full-bleed",
  },
  {
    type: "narrative",
    id: "what-shipped",
    eyebrow: "05",
    heading: "What shipped",
    body: "A resequenced foundation: a working clickable preview shipped first, establishing the interaction model creators actually needed before anything more complex was layered on top.\n\nA configurable customization system: multiple banners, video sections, and text sections, all built as coherent parts of one system rather than one-off additions. A validated editing model: click-to-edit, made concrete and testable through AI-assisted prototyping before real build time was committed.",
    keyTakeaway: "The clearest measure of success isn't a single metric. It's that this shipped without the team ever needing to backtrack or patch a feature people didn't understand.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-shipped-click-to-edit",
          label: "The shipped click-to-edit experience",
          description: "Show the finished, shipped click-to-edit interaction in the live product.",
        },
        caption: "The first iteration brought click-to-edit into the product.",
        scale: "wide",
      },
    ],
  },
];

export const showcasesPortfolio: NarrativeCaseStudy = {
  ...showcasesMeta,
  sections: portfolioSections,
  closingStatement: {
    quote: "Sequencing is a design decision, not just a scheduling one.",
    support:
      "The most consequential decision on this project wasn't a layout or an interaction pattern. It was recognizing that an approved roadmap was building complexity on top of an unresolved foundation, and making the case to fix that first.",
  },
  nextProject: showcasesNextProject,
};

// ── Detailed presentation ──────────────────────────────────────────────────
// The full, 8-section case study. Not linked from primary navigation,
// reachable at /case-studies/reimagining-showcases/full.

const detailedSections: NarrativeCaseStudySection[] = [
  {
    type: "narrative",
    id: "what-i-inherited",
    eyebrow: "01",
    heading: "Four months. The same unanswered question.",
    body: "After the Viewer Home team shipped Showcases' viewing experience and its modular component foundation, I took over design for what came next: giving creators real control over how a Showcase looks and is organized.\n\nI inherited an existing roadmap for that work: banners, additional video sections, text sections, phased in across four sequential, one-month engineering builds. Every phase's planning notes carried forward the same open question, unresolved, four months running: is the preview clickable? Creators had been asking for a real, working preview of the Showcase they were editing for a long time. Every phase added more configuration complexity on top of a preview that still didn't do the one thing people wanted most from it.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "showcases-pre-customization-surface",
          label: "The pre-customization Showcase management surface",
          description: "A creator with no way to configure banners, sections, or layout beyond the fixed legacy templates.",
        },
        caption: "What creators could actually control, before this work began.",
        scale: "contained",
      },
      {
        media: {
          kind: "image",
          assetId: "showcases-roadmap-repeated-question",
          label: "The four-phase roadmap, annotated",
          description: "Annotate the original four-phase roadmap to show the recurring, unresolved \"Is the preview clickable?\" question at each phase.",
        },
        caption: "Four consecutive one-month builds. The same unanswered question every time.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "the-reset",
    eyebrow: "02",
    heading: "Reset the sequence",
    body: "That repetition is what caught my attention. I pushed to reset the plan: ship a working clickable preview, in its simplest form, before anything else, so creators built the right expectation for what editing a live Showcase actually felt like, before more ambitious customization arrived on top of it. The richer capabilities would follow once that foundation and habit existed.\n\nThat meant asking my PM, engineering lead, and GM to delay a roadmap that was already scheduled. I made the case with clear, sequenced prototypes showing what shipping the preview first would unlock, rather than arguing for the reset in the abstract, and the team agreed to delay the planned launch to do it. This is the decision from this project I'm most proud of. It wasn't a shipped feature. It was the judgment call to slow down an already-approved roadmap to fix the thing creators had been asking for the entire time.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "showcases-resequenced-roadmap",
          label: "Before/after the reset",
          description: "Show the original four-phase plan versus the resequenced plan with the clickable preview moved to the front.",
        },
        caption: "The reset: fix the foundational behavior first, then build on top of it.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "building-the-system",
    eyebrow: "03",
    heading: "Consistency without sameness",
    body: "With the clickable preview shipped, the fuller customization roadmap moved forward on top of something creators already understood, rather than a widening set of one-off settings bolted onto an unclear preview. Multiple banners, additional video sections, and text sections became configurable, coherent parts of one modular system.\n\nThe design principle was consistency without sameness: the same underlying components and responsive rules stayed stable, while what a creator could arrange kept expanding, and every option had to hold up across wide desktop widths, constrained embeds, and mobile, since Showcases live on Vimeo and across countless third-party sites.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-modular-system",
          label: "Banners, sections, and layout assembling into a Showcase",
          description: "Show banner, video-section, and text-section configuration options assembling into a customized Showcase, responsive from desktop to embedded to mobile.",
        },
        caption: "The same system, now genuinely configurable, and still consistent across contexts.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "the-hard-problem",
    eyebrow: "04",
    heading: "How should creators edit a modular page?",
    body: "Once there was more to configure, a new problem followed: how should someone customize a banner, add a video section, or rearrange layout without navigating an abstract settings panel?\n\nA click-to-edit model promised something more direct: select the part of the page you care about, edit it in place, see the result in context. Engineering flagged this as potentially expensive to build. Rather than leave it as a speculative discussion, I used AI-assisted prototyping to make it tangible for Engineering, Product, and research participants.",
  },
  {
    type: "prototype",
    id: "ai-prototype",
    eyebrow: "05",
    heading: "Turning a debate into an evaluation",
    body: "Rather than leave the interaction as a speculative discussion, I used AI-assisted prototyping to make it tangible, turning a debate about an idea into an evaluation of something people could actually try.",
    media: {
      kind: "screen-recording",
      assetId: "showcases-ai-click-to-edit-prototype",
      label: "AI-assisted click-to-edit prototype",
      description: "Show: 1. Normal Showcase 2. Creator selects a page region 3. Editing state appears in place 4. Creator changes the configuration 5. Preview updates in context",
    },
    steps: ["Normal Showcase", "Creator selects a page region", "Editing state appears in place", "Creator changes the configuration", "Preview updates in context"],
    caption: "AI-assisted prototyping made a technically uncertain interaction tangible enough to evaluate before committing engineering resources.",
    mediaScale: "full-bleed",
  },
  {
    type: "narrative",
    id: "validation",
    eyebrow: "06",
    heading: "Validate the interaction",
    body: "The working prototype validated that an in-context editing model could make a more complex system approachable rather than intimidating, and gave the team direct evidence for the direction before committing real engineering time to it.",
    pullQuote: {
      lines: ["Select what you see → change it → see the result immediately."],
    },
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-user-validation",
          label: "Click-to-edit interaction",
          description: "Show the interaction alongside the testing evidence, if possible.",
        },
        caption: "User testing validated the in-context editing model.",
        scale: "wide",
      },
    ],
  },
  {
    type: "outcome",
    id: "what-shipped",
    heading: "From an unresolved question to a shipped foundation",
    items: [
      {
        title: "A resequenced foundation",
        body: "A working clickable preview shipped first, establishing the interaction model creators actually needed before anything more complex was layered on top.",
      },
      {
        title: "A configurable system",
        body: "Multiple banners, video sections, and text sections became coherent, configurable parts of one modular system rather than one-off additions.",
      },
      {
        title: "A validated editing model",
        body: "Click-to-edit was made concrete and testable through AI-assisted prototyping before real engineering time was committed.",
      },
      {
        title: "No backtracking",
        body: "The clearest measure of success isn't a single metric. It's that this sequencing decision shipped without the team ever needing to backtrack or patch a feature people didn't understand.",
      },
    ],
  },
  {
    type: "reflection",
    id: "reflection",
    heading: "Reflection",
    items: [
      {
        title: "Sequencing is a design decision, not just a scheduling one.",
        body: "The most consequential decision on this project wasn't a layout or an interaction pattern. It was recognizing that an already-approved roadmap was building complexity on top of an unresolved foundation, and making the case to fix that foundation first.",
      },
      {
        title: "A concrete prototype beats an abstract argument.",
        body: "Both the roadmap reset and the click-to-edit direction depended on building something people could see and react to, rather than arguing for a delay or a new interaction model in the abstract.",
      },
      {
        title: "Repetition in a backlog is a signal, not noise.",
        body: "The same unanswered question, showing up unresolved across four straight months of planning documents, was the clearest evidence the plan was solving the wrong problem first.",
      },
    ],
  },
];

export const showcasesDetailed: NarrativeCaseStudy = {
  ...showcasesMeta,
  sections: detailedSections,
  nextProject: showcasesNextProject,
};

// ── Viewer Experience: portfolio presentation ───────────────────────────────
// ~7 beats. Source of truth: Vimeo_Viewer_Experience_Full_Case_Study_v2.docx
// (uploaded). No detailed narrative presentation is built for this project.
// The existing legacy case-study page (lib/case-studies.ts, slug
// "vimeo-viewing-experience") already IS the full case study; it just moves
// to /full instead of the primary route. See registries below.

const viewerExperiencePortfolioSections: NarrativeCaseStudySection[] = [
  {
    type: "narrative",
    id: "fragmented-ecosystem",
    eyebrow: "01",
    heading: "A fragmented viewing ecosystem",
    body: "Vimeo's viewing experience had evolved into a collection of independently built surfaces, each with its own codebase, history, and team context.\n\nInternally, the initiative was called \"Viewer Home.\" From the start, the opportunity was a shared viewing platform, not a redesigned page.\n\nThe problem wasn't a handful of bad pages. It was a fragmented ecosystem that kept solving the same underlying problems in different ways.",
    keyTakeaway: "The problem wasn't that Vimeo needed a better page. It needed a better system.",
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "viewer-experience-fragmented-ecosystem-map",
          label: "The fragmented viewing ecosystem",
          description: "Show the different legacy viewing surfaces and collection types as fragmented experiences. Make the duplicated patterns visually obvious.",
        },
        caption: "An audit of Vimeo's viewing ecosystem revealed many different surfaces built around the same underlying patterns.",
        scale: "full-bleed",
      },
    ],
  },
  {
    type: "narrative",
    id: "build-the-system",
    eyebrow: "02",
    heading: "Build the system, not another page",
    body: "I started with a full audit, not a redesign.\n\nDespite surface differences, most experiences relied on the same underlying pieces: player, metadata, engagement tools, transcripts, related videos, grids. Vimeo didn't lack patterns; the same ones were just rebuilt differently on every surface.\n\nThat thinking extended beyond the viewing experience itself. I proactively aligned these patterns with Vimeo's broader design system. The video/asset thumbnail became one of the most reused cross-team components, and viewing-specific patterns went on to influence other experiences, including Search.",
    pullQuote: {
      lines: ["Consistency at the system level.", "Flexibility at the experience level."],
    },
    mediaFirst: true,
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "viewer-experience-shared-building-blocks",
          label: "Shared building blocks converging into a system",
          description: "Show individual player, details, comments, transcript, and grid components being extracted from different surfaces and converging into a shared modular system.",
        },
        caption: "The opportunity wasn't to standardize every page. It was to create reusable building blocks that could be recombined across viewing contexts.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "prove-the-system",
    eyebrow: "03",
    heading: "Prove the system",
    body: "We rolled this out in phases, not all at once. Private video was the first implementation of the new system, the foundational surface where shared components and patterns were established. Public video followed, validating those patterns at much larger scale.\n\nShowcases followed as the third phase, the same foundation applied to a collection experience rather than a single video. It was validated the same incremental way, not treated as a special case.",
    keyTakeaway: "Live was deprioritized, not ignored. It already worked well embedded, its audience was comparatively small, and its complexity risked slowing the migration. The plan was to fold it in later.",
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "viewer-experience-phased-migration",
          label: "Phased migration: Private → Public → Showcases",
          description: "Show Private Video → Public Video → Showcases, with shared components accumulating as the system matures.",
        },
        caption: "The platform was validated incrementally, starting with foundational video experiences before expanding into collection surfaces.",
        scale: "wide",
      },
      {
        heading: "Building leadership alignment",
        body: "I used high-fidelity prototypes to show the modular system working across multiple viewing surfaces, building leadership alignment around the platform investment.",
        media: {
          kind: "screen-recording",
          assetId: "viewer-experience-executive-alignment-prototype",
          label: "Executive alignment prototype",
          description: "A high-fidelity prototype demonstrating the modular system applied across multiple viewing surfaces, used to build leadership alignment.",
        },
        caption: "Seeing one system applied across several surfaces helped leadership understand the case for the platform investment.",
        scale: "contained",
      },
    ],
  },
  {
    type: "narrative",
    id: "extend-the-system",
    eyebrow: "04",
    heading: "Extend the system",
    body: "Showcases came after the foundational video-page work. It was a test of whether the modular framework could support a more expressive collection experience, not just a single video.\n\nThe same building blocks (hero content, video grids, playback, collection navigation, responsive and embedded behavior) recombined into something different without rebuilding the system. That flexibility is the deeper story, told in its own case study.",
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "viewer-experience-component-recombination",
          label: "The same components, recombined",
          description: "Show the same underlying components recombined into the Showcases collection experience.",
        },
        caption: "The same modular foundation could support a very different experience without rebuilding the system underneath.",
        scale: "wide",
      },
    ],
  },
  {
    type: "comparison",
    id: "design-with-engineering",
    eyebrow: "05",
    heading: "Design with engineering",
    body: "Architecture reviews weren't handoff meetings. In bi-weekly deep dives with engineering, plus weekly standups so decisions didn't sit and wait, we worked through component boundaries, responsive behavior, what belonged in the player versus the page, and how legacy surfaces would migrate.",
    beforeLabel: "WYSIWYG page editor, user-tested",
    afterLabel: "Toggle-based settings, shipped",
    media: {
      kind: "screen-recording",
      assetId: "viewer-experience-wysiwyg-concept",
      label: "WYSIWYG page editor concept",
      description: "The interactive WYSIWYG editing prototype that tested well with users.",
    },
    caption:
      "The strongest experience wasn't always the right implementation. Working directly with engineering helped us preserve the intent while reducing implementation cost.\n\nThe WYSIWYG editor tested well with users, but engineering estimated a multi-quarter build. We preserved the underlying customization need with toggle-based settings and presets that could ship within the release scope.",
    secondaryBeat: {
      body: "When the question was behavior rather than visual polish, architecture reviews also produced lower-fidelity interaction prototypes, a shared language for working through component boundaries and edge cases with engineering.",
      media: {
        kind: "screen-recording",
        assetId: "viewer-experience-architecture-prototype",
        label: "Architecture review prototype",
        description: "A lower-fidelity interaction prototype used to work through component behavior in architecture reviews, not visual polish.",
      },
      caption: "The goal wasn't just a visually coherent system. It was one that was technically scalable.",
      scale: "contained",
    },
  },
  {
    type: "narrative",
    id: "migrate-people",
    eyebrow: "06",
    heading: "Migrate people, not just technology",
    body: "Previous Vimeo redesigns had created confusion and support volume when workflows changed unexpectedly.\n\nI pushed for an opt-in, transitional rollout instead of a hard cutover. Instead, it meant context and a softer path in, not an overnight replacement. Platform migration isn't only a technical problem; it's a user-adoption one.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "viewer-experience-transition-flow",
          label: "Private video transition flow",
          description: "Show the existing experience, the opt-in message, and the new experience.",
        },
        caption: "A gradual, opt-in transition gave people context instead of replacing their workflow overnight.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "outcomes",
    eyebrow: "07",
    heading: "A foundation, not a growth number",
    body: "This team's job was building the structural foundation, not chasing a single growth number. So the honest measure of success is what that foundation made possible afterward. Private Video, Public Video, and Showcases' viewing experience moved onto one shared component set, directly cutting the engineering cost of every viewing feature built since.\n\nAfter Viewer Home was disbanded, I stayed on to lead Showcases' customization work individually, building on the same foundation. Two years later, an entirely different team, with no connection to the original effort, reused the same components to rebuild Watch, Feed, Staff Picks, and navigation as part of a separate initiative with its own strategy.",
    keyTakeaway: "A system's real test isn't whether it ships. It's whether it outlives the team that built it. This one did, twice.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "viewer-experience-system-outlives-team",
          label: "The same component system, two years apart",
          description: "Show the original Viewer Home rollout and the later Community team's Watch/Feed rebuild built on the same foundation, side by side.",
        },
        caption: "The strongest evidence a system works: someone with no connection to it can build on it and move fast.",
        scale: "wide",
      },
    ],
  },
];

export const viewerExperiencePortfolio: NarrativeCaseStudy = {
  ...viewerExperienceMeta,
  sections: viewerExperiencePortfolioSections,
  closingStatement: {
    quote:
      "The biggest outcome wasn't a collection of redesigned viewing surfaces. It was a system that made the next one easier to design, build, and scale.",
    support:
      "This team's job was the structural foundation, not a single growth number. And two unrelated teams reusing that foundation, years apart, is the more durable proof it worked.",
  },
  nextProject: viewerExperienceNextProject,
};

// ── Knowledge Discovery: portfolio presentation ─────────────────────────────
// ~9 beats. Source of truth: brief supplied 2026-08-21. No detailed
// presentation built for this project yet. This route serves as both the
// portfolio and, for now, the only presentation (no /full fallback exists).

const knowledgeDiscoveryPortfolioSections: NarrativeCaseStudySection[] = [
  {
    type: "narrative",
    id: "opportunity",
    eyebrow: "01",
    heading: "Video had become knowledge.",
    body: "Vimeo's player had long been recognized for reliable, high-quality playback. But our customers had changed. Enterprise organizations increasingly used Vimeo for onboarding, compliance, training, internal communications, conferences, and education. These weren't videos people consumed from beginning to end. They were repositories of information.\n\nYet interacting with them remained surprisingly primitive. Finding a single answer often meant scrubbing through hours of playback, important moments couldn't easily be referenced, and live viewers couldn't catch up after joining late. Because more than 85% of Enterprise viewing occurred in embedded players, many of Vimeo's existing discovery features disappeared entirely outside Vimeo.com.",
    keyTakeaway: "The player excelled at playback. It wasn't designed for knowledge discovery.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "knowledge-discovery-problem-infographic",
          label: "From passive playback to lost context",
          description: "Infographic: Passive Playback → Scrubbing → Lost Context → Knowledge Discovery Platform.",
        },
        caption: "Interacting with long-form video remained primitive. The player excelled at playback, not at helping people find what they needed.",
        scale: "wide",
      },
      {
        media: {
          kind: "animation",
          assetId: "knowledge-discovery-evolution-overview",
          label: "The player's evolution",
          description: "Full-width animation showing the player evolving: Passive player → Transcript → Chapter navigation → Segment sharing → Live DVR.",
        },
        caption: "Four connected capabilities, developed over two years, turned the player into a platform for discovery.",
        scale: "full-bleed",
      },
    ],
  },
  {
    type: "narrative",
    id: "vision",
    eyebrow: "02",
    heading: "Transform playback into knowledge discovery.",
    body: "Rather than introducing isolated features, we asked a broader question: how might the player help people understand information instead of simply displaying video?\n\nThat vision shaped every decision that followed. Instead of designing unrelated capabilities, I built a cohesive interaction model centered on helping viewers search spoken content, navigate long-form video, share meaningful moments, and revisit live broadcasts.\n\nEach capability solved a different problem. Together, they transformed how viewers interacted with video.",
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "knowledge-discovery-vision-diagram",
          label: "From discovery to four capabilities",
          description: "Diagram: Knowledge Discovery → Embeddable Transcripts → Navigation → Sharing → Live DVR.",
        },
        caption: "Four different problems, one shared interaction model.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "research",
    eyebrow: "03",
    heading: "How people actually use long-form video",
    body: "I began by auditing the existing player experience across Vimeo.com and embedded players, mapping inconsistencies and identifying where discovery completely broke down.\n\nWorking alongside Product, Engineering, and Research, we combined design audits, usability testing, prototype validation, and A/B testing to understand how viewers expected to discover new functionality, where discovery controls should live, how transcript interactions should behave, how chapter navigation could become easier to scan, and how advanced functionality could remain approachable inside a constrained player.",
    pullQuote: {
      lines: ["Users weren't looking for more controls.", "They were looking for less effort."],
    },
    keyTakeaway: "That principle guided every interaction we designed.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "knowledge-discovery-research-wall",
          label: "Research wall",
          description: "Design audit → Prototype testing → Maze → A/B testing → Interaction model.",
        },
        caption: "A combination of audits, prototype testing, and quantitative validation shaped the interaction model.",
        scale: "wide",
      },
    ],
  },
  {
    type: "prototype",
    id: "embeddable-transcripts",
    eyebrow: "04",
    heading: "Embeddable Transcripts",
    body: "Transcripts already existed on Vimeo.com, but that wasn't where the opportunity was. More than 85% of Enterprise viewing happened in embedded players, off Vimeo.com entirely, and that's exactly where transcripts weren't available. Making transcripts work inside the embedded player, not just on Vimeo.com, was the actual unlock.\n\nOnce transcripts were embeddable, I designed them as navigation tools instead of accessibility artifacts. Viewers could search spoken content, jump directly to relevant moments, follow synchronized playback, and personalize the experience with timestamps and language preferences.\n\nSearch evolved through testing too. Instead of isolating search results, viewers preferred seeing matches inline within the transcript, preserving conversational context while making navigation effortless.",
    media: {
      kind: "screen-recording",
      assetId: "knowledge-discovery-transcript-evolution",
      label: "Embeddable transcript evolution",
      description: "Show the transcript experience evolving: overlay concept → slide-in panel → inline search → final design.",
    },
    steps: [
      "Overlay concept: explored directly on the video",
      "Slide-in panel: preserved playback, established a reusable pattern",
      "Inline search: matches shown in context, not isolated",
      "Final design: search, navigate, and personalize in one panel",
    ],
    caption: "Extensive prototype testing shaped the final interaction model, transforming transcripts from passive documentation into an active exploration tool.",
    mediaScale: "full-bleed",
  },
  {
    type: "comparison",
    id: "chapters-and-navigation",
    eyebrow: "05",
    heading: "Chapters & Navigation",
    body: "The existing chapter experience contained unnecessary visual complexity and made scanning long-form content difficult. The redesign focused on clarity.",
    beforeLabel: "Legacy chapter markers, complex, hard to scan",
    afterLabel: "Duration-labeled chapters, shipped",
    media: {
      kind: "screen-recording",
      assetId: "knowledge-discovery-chapters-before-after",
      label: "Chapter navigation, before and after",
      description: "Before/after comparison of the chapter experience.",
    },
    caption: "Showing the duration of each chapter made video structure immediately understandable, so users could identify relevant sections without scrubbing through timelines. Navigation became faster, mental models became simpler, and discovery became effortless.",
  },
  {
    type: "comparison",
    id: "segment-sharing",
    eyebrow: "06",
    heading: "Segment Sharing",
    body: "Knowledge becomes more valuable when it can be shared. Building on the redesigned chapter experience, I introduced one-click sharing for individual moments within a video, rather than sending an entire two-hour recording, viewers could reference exactly the information another person needed.",
    beforeLabel: "Rich editor concept, with preview and trimming",
    afterLabel: "URL-based sharing, shipped MVP",
    media: {
      kind: "screen-recording",
      assetId: "knowledge-discovery-sharing-tradeoff",
      label: "Segment sharing, concept to MVP",
      description: "Show the progression: editor concept → engineering tradeoff → final MVP.",
    },
    caption: "Early concepts envisioned a lightweight editing experience with preview and trimming. Engineering concerns about complexity led to a URL-based MVP that delivered immediate value while preserving a path to iterate. A deliberate tradeoff between the ideal experience and delivery velocity.",
  },
  {
    type: "narrative",
    id: "live-dvr",
    eyebrow: "07",
    heading: "Live DVR",
    body: "Enterprise customers frequently joined live events after they had already begun. Previously, missing the beginning meant waiting for the recording.\n\nLive DVR changed that. Viewers could rewind up to four hours, explore previously broadcast content, follow synchronized transcripts, and instantly return to the live broadcast using a dedicated \"Skip to Live\" control.",
    keyTakeaway: "At launch, Vimeo became the first platform to combine Live DVR with synchronized transcripts across both Vimeo.com and embedded players.",
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "knowledge-discovery-live-dvr",
          label: "Live DVR",
          description: "Show rewinding up to four hours of a live broadcast, browsing with synchronized transcripts, and returning to live via Skip to Live.",
        },
        caption: "Viewers could rewind, explore, and return to the live broadcast without losing their place.",
        scale: "wide",
      },
    ],
  },
  {
    type: "metrics",
    id: "results",
    eyebrow: "08",
    heading: "Discovery, at Enterprise scale",
    intro:
      "Beyond adoption, the work translated into major Enterprise renewals and expansions, made Vimeo the first platform to pair Live DVR with synchronized transcripts, and became a differentiator for Enterprise Sales.",
    items: [
      {
        value: "$4.5M+",
        label: "Enterprise ARR influenced",
        description: "Across major Enterprise renewals and expansions.",
      },
      {
        value: "40,000+",
        label: "Daily transcript views",
        description: "Adoption reached well beyond Enterprise, including creators outside the segment the work was built for.",
      },
      {
        value: "7,800+",
        label: "Weekly segment shares",
        description: "Viewers referencing exact moments instead of sending entire recordings.",
      },
      {
        value: "50%+",
        label: "Live events using DVR",
        description: "More than half of live events made use of DVR.",
      },
    ],
  },
  {
    type: "narrative",
    id: "customer-response",
    eyebrow: "09",
    heading: "An unexpected audience",
    body: "Creators and Enterprise customers consistently praised the experience for making long-form content dramatically easier to navigate, reference, and share.\n\nUnexpectedly, transcripts also found a passionate audience outside Enterprise, reinforcing that improving discoverability benefited every type of viewer.",
    compact: true,
    beats: [
      {
        media: {
          kind: "image",
          assetId: "knowledge-discovery-customer-proof",
          label: "Customer quotes and social proof",
          description: "Social posts praising the transcript panel after viewers noticed it on the Criterion Channel website.",
        },
        caption: "Viewers publicly praised the transcript panel after spotting it on the Criterion Channel website, evidence the appeal reached well past Enterprise.",
        scale: "contained",
      },
    ],
  },
];

export const knowledgeDiscoveryPortfolio: NarrativeCaseStudy = {
  ...knowledgeDiscoveryMeta,
  sections: knowledgeDiscoveryPortfolioSections,
  closingStatement: {
    quote: "What if the player helped people think, not just watch?",
    support:
      "For years, video players had been optimized for playback. Reframing that question guided every decision, from transcripts to Live DVR, and turned one of Vimeo's most important products into a platform for knowledge discovery.",
  },
  nextProject: knowledgeDiscoveryNextProject,
};

// ── Community Strategy: portfolio presentation ──────────────────────────────
// 7 beats. Source of truth: Community-Strategy-SOT (Wayfinder + Zach Adams
// pass). Portfolio-only, see file header.

const communityPortfolioSections: NarrativeCaseStudySection[] = [
  {
    type: "narrative",
    id: "the-pivot",
    eyebrow: "01",
    heading: "A deliberate trade-off, made years earlier",
    body: "In 2021, Vimeo's then-CEO described a deliberate pivot: away from being a viewing destination and toward becoming a video SaaS company for businesses. That focus grew the Enterprise business, and left Vimeo's community-facing surfaces, Watch, Feed, profiles, the on-site discovery layer, neglected for years.\n\nBy 2024 the cost was measurable: the flagship curation surface had lost the vast majority of its traffic from its earlier peak, self-serve subscriptions had declined for three consecutive years, and subscriber retention was eroding alongside it, despite community surfaces still driving the large majority of site traffic.",
    keyTakeaway: "This wasn't neglect by accident. It was a real trade-off that paid off for one part of the business while quietly costing another.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "community-pivot-context",
          label: "Vimeo's community surfaces before the strategy",
          description: "Show the flagship curation surface and Watch in their neglected, pre-strategy state.",
        },
        caption: "Years of underinvestment, made visible.",
        scale: "contained",
      },
    ],
  },
  {
    type: "comparison",
    id: "wayfinder",
    eyebrow: "02",
    heading: "Compounding neglect: the Wayfinder navigation redesign",
    body: "That neglect compounded further in 2024. Prior to a navigation redesign internally called \"Wayfinder,\" Watch had prime placement in Vimeo's primary navigation. Wayfinder, which reached general availability in August 2024, reorganized navigation around management and creator workflows, and Watch was demoted to a small entry point tucked in the corner of the logged-in homepage. Community visits dropped drastically in the months that followed.",
    beforeLabel: "Watch in Vimeo's primary navigation",
    afterLabel: "Watch demoted to a homepage corner (Wayfinder, Aug 2024)",
    media: {
      kind: "image",
      assetId: "community-wayfinder-nav",
      label: "Vimeo's navigation before and after Wayfinder",
      description: "Show the primary nav before Wayfinder (Watch prominent) and after (Watch buried in a homepage corner).",
    },
    caption: "A 2024 navigation redesign gave the neglect story a specific, dated cause, and made the case for a dedicated navigation fix as concrete as the case for reinvesting in the pages themselves.",
  },
  {
    type: "narrative",
    id: "the-natural-experiment",
    eyebrow: "03",
    heading: "The clearest evidence was an accident",
    body: "The clearest evidence came from an unplanned natural experiment: a regional change removed core community surfaces in one market while leaving hosting tools intact elsewhere. Year-over-year, the affected region saw steep drops across engagement, registrations, and retention, and sentiment cratered hardest of all.",
    pullQuote: {
      lines: ["Community wasn't a nice-to-have.", "It was what made the growth loop work."],
      attribution: "a Vimeo board member, internally",
    },
    compact: true,
  },
  {
    type: "narrative",
    id: "the-strategy",
    eyebrow: "04",
    heading: "The strategy I was designing against",
    body: "Leadership defined the strategy precisely: build for video professionals specifically, not a general audience, competing on quality and craft rather than scale. The plan laid out five phases, from reactivating the existing creator base to eventual audience monetization, with three-year targets to roughly double community-driven traffic and meaningfully lift subscription retention.\n\nI want to be precise about credit here: I didn't build this case or write this strategy. Leadership did. I was hired into the team it created. My part was the design work that put its first phase into production.",
    pullQuote: {
      lines: ['"YouTube is for everyone.', 'Vimeo is for the extraordinary."'],
      attribution: "Vimeo's Chief Product & Technology Officer",
    },
  },
  {
    type: "narrative",
    id: "my-role",
    eyebrow: "05",
    heading: "Designing Phase 1",
    body: "Phase 1 was about reactivating Vimeo's existing base of video professionals. As the Community team's dedicated designer, I led design for three releases: a full Watch page rebuild with a cinematic, autoplay-on-hover layout and native dark mode; Feed 2.0, rebuilt as an autoplaying, infinitely-scrolling experience; and, working alongside fellow designer Zach Adams, a unified Community navigation that made Feed, Watch, and Staff Picks a single click apart.\n\nA meaningful part of what let this move quickly was reuse: the modular component library from Viewer Home, a different initiative under different ownership, had stayed a living system. I'd kept building on it through the Showcases customization work after that original team disbanded, so it was coherent enough to build a full relaunch on top of without touching the underlying architecture. I also made sure the Watch rebuild supported proper analytics instrumentation from day one. That was a deliberate design decision, not an afterthought.",
    keyTakeaway: "A neglected surface isn't a lost one, if the foundation underneath it is still sound.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "community-before-after-watch-feed",
          label: "Watch and Feed, before and after",
          description: "The pre-relaunch Watch page and Feed, disconnected from the rest of Vimeo, alongside the rebuilt versions.",
        },
        caption: "Before: surfaces that felt abandoned. After: a cohesive discovery layer built on the Viewer Home foundation.",
        scale: "wide",
      },
      {
        heading: "The rebuilt Watch page",
        body: "Cinematic, autoplay-on-hover layout, native dark mode, and a consistent visual thread from homepage to clip page.",
        media: {
          kind: "image",
          assetId: "community-watch-rebuild",
          label: "The rebuilt Watch page",
          description: "Show the cinematic autoplay-on-hover layout and native dark mode.",
        },
        caption: "The first proof the Viewer Home foundation could serve a second team's strategy, years later.",
        scale: "wide",
      },
    ],
  },
  {
    type: "comparison",
    id: "feed-and-navigation",
    eyebrow: "06",
    heading: "Feed 2.0 and unified navigation",
    body: "Co-designed with Zach Adams, the unified Community navigation connected Feed, Watch, and Staff Picks, promoting Watch from a buried homepage corner into a top-level entry point, directly undoing Wayfinder's demotion.",
    beforeLabel: "Watch buried in a homepage corner",
    afterLabel: "Watch and Feed, one click apart",
    media: {
      kind: "image",
      assetId: "community-feed-nav-rebuild",
      label: "Feed 2.0 and the unified Community navigation",
      description: "Show Feed 2.0's autoplaying, infinitely-scrolling layout and the unified Community navigation, with Watch promoted to a top-level entry point.",
    },
    caption: "Community, made findable again.",
  },
  {
    type: "metrics",
    id: "outcomes",
    eyebrow: "07",
    heading: "Validated, then shipped to everyone",
    intro:
      "Both releases shipped as controlled A/B tests against production traffic before reaching general availability, with upload and monetization workflows holding steady throughout.",
    items: [
      {
        value: "+159%",
        label: "Watch visits within 7 days",
        description: "Increase in logged-in users visiting Watch within seven days of the relaunch.",
      },
      {
        value: "+22%",
        label: "Total Watch visits",
      },
      {
        value: "+14%",
        label: "Staff Pick video views",
      },
    ],
  },
];

export const communityPortfolio: NarrativeCaseStudy = {
  ...communityMeta,
  sections: communityPortfolioSections,
  closingStatement: {
    quote:
      "This was someone else's strategy and someone else's business case. My job was to execute its first phase well. And the results speak for that specifically.",
    support:
      "The Viewer Home component system stayed a living project, not because anyone was maintaining it as its own initiative, but because I kept building on it through the Showcases customization work after the original team disbanded. So when Community needed a foundation, it wasn't a dusty artifact still holding together, it was current.",
  },
  nextProject: communityNextProject,
};

// ── Player Platform: portfolio presentation ─────────────────────────────
// 7 beats. Reframed toward platform stewardship and long-term ownership,
// a legacy player rebuilt into a certified, independently-verified
// enterprise differentiator, not a feature list.

const playerPortfolioSections: NarrativeCaseStudySection[] = [
  {
    type: "narrative",
    id: "the-problem",
    eyebrow: "01",
    heading: "A legacy player holding the platform back",
    body: "The player was one of Vimeo's most-used surfaces, and one of its most constrained. Its front end predated Vimeo's current design system, so every visual inconsistency had to be patched by hand. For creators, customization meant a single highlight color and a playbar that bundled unrelated controls together (disable one, and you lose them all). The accessibility gaps were more serious: only one audio track, so no descriptive audio for blind and low-vision viewers, and captions rendered in one fixed style with no viewer control, at a time when FCC caption requirements kept expanding.\n\nEnterprise deals were being blocked on exactly these gaps: roughly 1,211 sales calls had mentioned \"accessibility\" since November 2020 (per Gong), with named accounts like Starbucks, Expedia, Boeing, and Walmart asking directly for descriptive audio.",
    keyTakeaway: "This wasn't a hypothetical business case. It was lost and at-risk revenue, made concrete.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "player-legacy-annotated",
          label: "The legacy player, annotated",
          description: "The legacy player with design and accessibility issues annotated: inconsistent button styling, fixed single highlight color, no caption customization.",
        },
        caption: "Before: a player that predated Vimeo's design system and offered viewers no accessibility controls.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "discovery-and-strategy",
    eyebrow: "02",
    heading: "Discovery, then four pillars",
    body: "I partnered with a third-party accessibility auditor to map every WCAG and FCC gap, and ran a parallel audit against Vimeo's design system to catalog every visual inconsistency. From there I structured the rebuild around four pillars from the outset, so accessibility was never a late add-on: design system integration, advanced player styling, multiple audio tracks, and closed caption customization.",
    keyTakeaway: 'People loved the player\'s simplicity and called it "clunky and outdated" in the same breath, and a competitive audit showed rivals already ahead on both accessibility and customization.',
    beats: [
      {
        media: {
          kind: "image",
          assetId: "player-competitive-audit",
          label: "Competitive feature comparison",
          description: "A competitive feature comparison chart showing accessibility and customization gaps between the Vimeo player and competitor players.",
        },
        caption: "The competitive audit shaped which gaps to prioritize and close first.",
        scale: "contained",
      },
    ],
  },
  {
    type: "narrative",
    id: "design-system",
    eyebrow: "03",
    heading: "Design system integration: what I'm proudest of",
    body: "I audited every visual component in the player (buttons, menus, iconography, the playbar) and redesigned each to match Vimeo's current design system. Not any single screen, but the component library itself: built on Vimeo's design system and documented in enough detail that engineers could build on it without me.",
    keyTakeaway: "The payoff was immediate for the team building on top of it: faster engineering velocity and a much shorter onboarding path.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "player-design-system-docs",
          label: "The component library and its documentation",
          description: "Screenshots of the player component library and its design documentation: every button, menu, and control mapped to Vimeo's design system, annotated for engineering handoff.",
        },
        caption: "The structural work underneath every other pillar.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "styling-and-audio",
    eyebrow: "04",
    heading: "Real choice, for creators and viewers alike",
    body: "The next two pillars were both about giving people real control: creators over how the player looks, viewers over what they hear.",
    beats: [
      {
        heading: "Advanced player styling",
        body: "Support for primary, secondary, and icon/text color options, a playbar whose individual controls could be shown, hidden, or repositioned independently, and a real-time preview with presets for reuse across a whole video library.",
        media: {
          kind: "image",
          assetId: "player-customization-interface",
          label: "The player customization interface",
          description: "The player customization interface (color pickers, font options, and playbar controls) with a live preview and the resulting branded player.",
        },
        caption: "Creators get granular, real-time control over the player's appearance, consistent everywhere it's embedded.",
        scale: "wide",
      },
      {
        heading: "Multiple audio tracks",
        body: "A creator-facing upload flow for labeling and attaching additional tracks (descriptive audio, alternate languages, commentary) and an in-player track selector built with screen-reader support, so options were properly announced to assistive technology.",
        media: {
          kind: "image",
          assetId: "player-audio-track-selector",
          label: "The in-player audio track selector",
          description: "The in-player audio track selector, open mid-playback, with descriptive audio and an alternate language listed alongside the default track.",
        },
        caption: "Viewers get real, screen-reader-announced choice over which audio track plays, not just a visual toggle.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "captions",
    eyebrow: "05",
    heading: "Closed caption customization, grounded in the standard",
    body: "Viewers got control over font size, color, edge styling, and background opacity, with an instant live preview and every default grounded in FCC guidance. The work shipped in three phases: viewer-side styling first, creator-side second, advanced creator styling with SDK support third. So viewers got real accessibility control as early as possible.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "player-caption-customization",
          label: "The closed caption customization menu",
          description: "The closed caption customization menu, with a live preview of font size, color, and background changes applied to the captions.",
        },
        caption: "Viewers can personalize captions for readability; every default is grounded in FCC and WCAG guidance.",
        scale: "wide",
      },
    ],
  },
  {
    type: "comparison",
    id: "the-rebuild",
    eyebrow: "06",
    heading: "The redesign in one frame",
    body: "Because the player is a mission-critical, high-traffic surface, reliability took priority over visual polish whenever the two were in tension. Heavier animation was deliberately limited to protect load time and playback stability.",
    beforeLabel: "The legacy player",
    afterLabel: "The rebuilt, branded, accessible player",
    media: {
      kind: "image",
      assetId: "player-before-after",
      label: "Before and after the rebuild",
      description: "A side-by-side before/after of the full player. The legacy UI on the left, the rebuilt, branded, accessible player on the right.",
    },
    caption: "From a dated, one-color template to a fully brand- and accessibility-customizable player.",
  },
  {
    type: "metrics",
    id: "outcomes",
    eyebrow: "07",
    heading: "Independently verified, not self-declared",
    intro:
      "The redesign was validated on two tracks: a third-party WCAG 2.1 AA accessibility audit, and ongoing usability testing (including a Maze study) as individual features shipped. The player also won the Barry Award from the American Council of the Blind.",
    items: [
      {
        value: "$4.6M",
        label: "ARR boost from enterprise clients",
      },
      {
        value: "90%+",
        label: "Customer satisfaction overall",
      },
      {
        value: "+4.6%",
        label: "CSAT lift on the small-player redesign",
        description: "90.3% → 94.5%, validated via a Maze study",
      },
    ],
  },
];

export const playerPortfolio: NarrativeCaseStudy = {
  ...playerMeta,
  sections: playerPortfolioSections,
  closingStatement: {
    quote:
      "Accessibility isn't a mandate to satisfy. It's a business case sitting in your own sales data, waiting to be read.",
    support:
      "The clearest evidence for investing in accessibility was Vimeo's own sales data. Real enterprise accounts asking for exactly these features. Backed by an independent audit and an outside award, the player stopped being a legacy liability and became a genuine enterprise differentiator.",
  },
  nextProject: playerNextProject,
};

// ── Registries ──────────────────────────────────────────────────────────
// `narrativeCaseStudies` lists one entry per project. The portfolio
// presentation, since that's what's linked from the homepage card and the
// nav's Work dropdown. Detailed presentations are a secondary route, not a
// separate nav-level "project".

export const narrativeCaseStudies: NarrativeCaseStudy[] = [
  viewerExperiencePortfolio,
  knowledgeDiscoveryPortfolio,
  showcasesPortfolio,
  communityPortfolio,
  playerPortfolio,
];

export function getNarrativeCaseStudyBySlug(slug: string): NarrativeCaseStudy | undefined {
  return narrativeCaseStudies.find((cs) => cs.slug === slug);
}

const detailedByProjectSlug: Record<string, NarrativeCaseStudy> = {
  [showcasesDetailed.slug]: showcasesDetailed,
};

export function getDetailedNarrativeCaseStudyBySlug(slug: string): NarrativeCaseStudy | undefined {
  return detailedByProjectSlug[slug];
}

export function detailedNarrativeCaseStudySlugs(): string[] {
  return Object.keys(detailedByProjectSlug);
}

// ── Homepage card adapter ─────────────────────────────────────────────────
// The homepage grid/card component reads the legacy `CaseStudy` shape.
// Rather than teach CardGrid/CaseStudyCard a second data model, we project
// the fields a card actually needs into that shape. `sections` is unused by
// the card.
export const showcasesCardData: CaseStudy = {
  slug: showcasesPortfolio.slug,
  title: showcasesPortfolio.title,
  company: showcasesPortfolio.company,
  role: showcasesPortfolio.role,
  year: showcasesPortfolio.year,
  summary: showcasesPortfolio.subtitle,
  themeColor: showcasesPortfolio.themeColor,
  themeColorDark: showcasesPortfolio.themeColorDark,
  coverImage: "/images/showcases-cover.jpg",
  outcomes: [],
  highlightTags: showcasesPortfolio.cardHighlights,
  sections: [],
};

// Viewer Experience's real growth metrics belong to the Community team's
// later work, not this project (see the "outcomes" section, eyebrow 07,
// above), so this card uses qualitative highlightTags, like Showcases,
// rather than deriving numbers from a metrics section that no longer exists.
export const viewerExperienceCardData: CaseStudy = {
  slug: viewerExperiencePortfolio.slug,
  title: viewerExperiencePortfolio.title,
  company: viewerExperiencePortfolio.company,
  role: viewerExperiencePortfolio.role,
  year: viewerExperiencePortfolio.year,
  summary: viewerExperiencePortfolio.subtitle,
  themeColor: viewerExperiencePortfolio.themeColor,
  themeColorDark: viewerExperiencePortfolio.themeColorDark,
  coverImage: "/images/vimeo-cover.jpg",
  outcomes: [],
  highlightTags: viewerExperiencePortfolio.cardHighlights,
  sections: [],
};

const knowledgeDiscoveryMetricsSection = knowledgeDiscoveryPortfolio.sections.find(
  (s): s is Extract<NarrativeCaseStudySection, { type: "metrics" }> => s.type === "metrics",
);
const knowledgeDiscoveryCardMetrics: Metric[] = (knowledgeDiscoveryMetricsSection?.items ?? [])
  .slice(0, 3)
  .map((m) => ({ value: m.value, label: m.label }));

export const knowledgeDiscoveryCardData: CaseStudy = {
  slug: knowledgeDiscoveryPortfolio.slug,
  title: knowledgeDiscoveryPortfolio.title,
  company: knowledgeDiscoveryPortfolio.company,
  role: knowledgeDiscoveryPortfolio.role,
  year: knowledgeDiscoveryPortfolio.year,
  summary: knowledgeDiscoveryPortfolio.subtitle,
  themeColor: knowledgeDiscoveryPortfolio.themeColor,
  themeColorDark: knowledgeDiscoveryPortfolio.themeColorDark,
  coverImage: "/images/knowledge-discovery-cover.jpg",
  outcomes: knowledgeDiscoveryCardMetrics,
  sections: [],
};

// Community and Player both have real metrics sections (unlike Viewer
// Experience and Showcases, which don't), so their cards show numbers too,
// same "can't drift out of sync" derivation as Knowledge Discovery's card,
// sliced directly from each project's own Metrics section.
const communityMetricsSection = communityPortfolio.sections.find(
  (s): s is Extract<NarrativeCaseStudySection, { type: "metrics" }> => s.type === "metrics",
);
const communityCardMetrics: Metric[] = (communityMetricsSection?.items ?? [])
  .slice(0, 3)
  .map((m) => ({ value: m.value, label: m.label }));

export const communityCardData: CaseStudy = {
  slug: communityPortfolio.slug,
  title: communityPortfolio.title,
  company: communityPortfolio.company,
  role: communityPortfolio.role,
  year: communityPortfolio.year,
  summary: communityPortfolio.subtitle,
  themeColor: communityPortfolio.themeColor,
  themeColorDark: communityPortfolio.themeColorDark,
  coverImage: "/images/community-strategy-cover.jpg",
  outcomes: communityCardMetrics,
  sections: [],
};

const playerMetricsSection = playerPortfolio.sections.find(
  (s): s is Extract<NarrativeCaseStudySection, { type: "metrics" }> => s.type === "metrics",
);
const playerCardMetrics: Metric[] = (playerMetricsSection?.items ?? [])
  .slice(0, 3)
  .map((m) => ({ value: m.value, label: m.label }));

export const playerCardData: CaseStudy = {
  slug: playerPortfolio.slug,
  title: playerPortfolio.title,
  company: playerPortfolio.company,
  role: playerPortfolio.role,
  year: playerPortfolio.year,
  summary: playerPortfolio.subtitle,
  themeColor: playerPortfolio.themeColor,
  themeColorDark: playerPortfolio.themeColorDark,
  coverImage: "/images/player-platform-cover.jpg",
  outcomes: playerCardMetrics,
  sections: [],
};
