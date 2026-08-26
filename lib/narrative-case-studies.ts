// lib/narrative-case-studies.ts
//
// Content for case studies built on the new narrative system (see
// types/narrative-case-study.ts).
//
// Each project can have two presentations that share one set of facts:
//   - a PORTFOLIO presentation — short, visual, the primary experience
//     linked from the homepage card and nav
//   - a DETAILED presentation — the full case study, reachable at
//     /case-studies/<slug>/full, not linked from primary navigation
//
// Both presentations share the same top-level meta (title, subtitle,
// description, role/company/year/team, theme colors, card highlights) via
// a single `<project>Meta` object spread into both — that's the single
// source of truth for anything that must stay identical between the two.
// The `sections` arrays are intentionally NOT derived from one another:
// the portfolio version is an edited, shorter piece of writing, not a
// mechanical truncation of the detailed one — same relationship as an
// abstract to a paper. Facts must match; prose doesn't have to.
//
// Two projects live here:
//   - Showcases    — portfolio AND detailed both built in this system.
//   - Viewer Experience — portfolio built here; "detailed" is the existing
//     legacy case-study page (lib/case-studies.ts), just re-routed to
//     /full instead of rebuilt, since it already exists and wasn't asked
//     to be redesigned. See the routing note near viewerExperiencePortfolio.
//
// Copy below is transcribed from the approved briefs / source documents
// verbatim. Do not add facts, metrics, or outcomes that weren't supplied.

import type { NarrativeCaseStudy, NarrativeCaseStudySection } from "@/types/narrative-case-study";
import type { CaseStudy, Metric } from "@/types/case-study";

// ── Shared facts: Viewer Experience ────────────────────────────────────────
// Defined first so Showcases' "next project" link can point at it directly,
// rather than looking it up from the legacy case-study list (which this
// project's primary route now shadows — see registries below).
const viewerExperienceMeta = {
  slug: "vimeo-viewing-experience",
  title: "Reimagining the Vimeo Viewing Experience",
  subtitle: "A modular platform for every way people watch on Vimeo.",
  description:
    "Vimeo's viewing experience had evolved into a collection of independently built surfaces. I led the design of a shared modular platform that could bring consistency to the underlying system while preserving the flexibility of different viewing contexts.",
  company: "Vimeo",
  role: "Principal Product Designer",
  year: "2023–2025",
  team: "3 PMs, 2 UX Researchers, 8 Engineers, 2 Designers",
  themeColor: "#1AB7EA",
  themeColorDark: "#0A4A60",
  cardHighlights: [] as string[],
  heroImage: {
    kind: "image" as const,
    label: "The unified viewing experience",
    description: "A hero shot of the new modular viewer — the single visual that stands in for the whole project.",
    assetId: "viewer-experience-hero",
  },
};

// ── Shared facts: Showcases ─────────────────────────────────────────────────
const showcasesMeta = {
  slug: "reimagining-showcases",
  title: "Designing for Creative Control",
  subtitle: "Helping creators shape how audiences experience their work.",
  description:
    "How iterative design, AI-assisted prototyping, and user testing helped transform Vimeo Showcases into a modular experience that creators could customize and teams could evolve.",
  company: "Vimeo",
  role: "Principal Product Designer",
  year: "2023–2025",
  team: "3 PMs, 2 UX Researchers, 8 Engineers, 2 Designers",
  themeColor: "#F2B84B",
  themeColorDark: "#3D2600",
  cardHighlights: ["AI-assisted prototyping", "Modular systems", "Creator customization"],
  heroImage: {
    kind: "image" as const,
    label: "The reimagined Showcase experience",
    description: "A hero shot of the new modular Showcase — the single visual that stands in for the whole project.",
    assetId: "showcases-hero",
  },
};

// ── Shared facts: Knowledge Discovery ───────────────────────────────────────
// Source of truth: brief supplied 2026-08-21 ("From Playback to Knowledge
// Discovery"). `year` and `team` were not supplied — left as explicit
// placeholders rather than guessed. Confirm both before this ships; `year`
// in particular renders in the hero eyebrow line as-is.
const knowledgeDiscoveryMeta = {
  slug: "vimeo-knowledge-discovery",
  title: "From Playback to Knowledge Discovery",
  subtitle: "Transforming Vimeo's player into an interactive platform for learning, navigation, and discovery.",
  description:
    "For decades, video players had been optimized for one thing: playback. But as Vimeo expanded into Enterprise, it became clear customers weren't simply watching videos — they were searching for information, revisiting discussions, and sharing knowledge. I saw an opportunity to transform the player from a passive viewing surface into an interactive tool for discovery.",
  company: "Vimeo",
  role: "Principal Product Designer",
  year: "[confirm years]",
  team: "",
  themeColor: "#A78BFA",
  themeColorDark: "#2E1065",
  cardHighlights: [] as string[],
  heroImage: {
    kind: "image" as const,
    label: "The knowledge discovery player",
    description: "A hero shot of the evolved player — transcript, chapters, and navigation visible alongside playback.",
    assetId: "knowledge-discovery-hero",
  },
};

// "Next project" cross-links — a three-way cycle so each project points to
// the next chapter: Viewer Experience → Knowledge Discovery → Showcases →
// back to Viewer Experience. Derived from each other's shared meta object,
// not a lookup, so titles/colors can't drift.
const showcasesNextProject = {
  slug: viewerExperienceMeta.slug,
  title: viewerExperienceMeta.title,
  company: viewerExperienceMeta.company,
  themeColor: viewerExperienceMeta.themeColor,
  themeColorDark: viewerExperienceMeta.themeColorDark,
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

// ── Showcases: portfolio presentation ───────────────────────────────────────
// ~6 beats. Recruiter/hiring-manager facing. Headings + visuals carry the
// story; body copy is deliberately short. See conversation brief for the
// word-budget guidance (~500–700 words).

const portfolioSections: NarrativeCaseStudySection[] = [
  {
    type: "narrative",
    id: "the-problem",
    eyebrow: "01",
    heading: "Three layouts had become three constraints",
    body: "Showcases had evolved into Default, Featured, and Live experiences. Each served a different use case, but maintaining separate layouts made the experience harder to customize and evolve.\n\nThe goal wasn't to create a better fourth template.\nIt was to create one flexible system that could support many different creator needs.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-legacy-layouts",
          label: "Legacy Showcase layouts",
          description: "Show Default → Featured → Live in a short, visually compelling sequence.",
        },
        caption: "Three specialized Showcase experiences had become three separate systems to maintain.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "north-star",
    eyebrow: "02",
    heading: "One system. Many possibilities.",
    body: "The new framework would use reusable Vimeo components—including Video Grid, Video Details, Banner, Comments, and Transcripts—as configurable building blocks.",
    keyTakeaway: "Give creators meaningful control without multiplying system complexity.",
    // The animation should communicate most of the idea — let it lead, with
    // the heading/body following as a brief explanation. Also compact:
    // this beat is deliberately quick, not a major statement.
    mediaFirst: true,
    compact: true,
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "showcases-component-system",
          label: "Components assembling into a Showcase",
          description: "Show the components coming together into the new Showcase experience.",
        },
        caption: "Reusable Vimeo components became the building blocks for a configurable Showcase.",
        scale: "wide",
      },
    ],
  },
  {
    type: "prototype",
    id: "the-difficult-problem",
    eyebrow: "03",
    heading: "How should creators edit it?",
    body: "If creators could configure individual components, they needed an intuitive way to edit them.\n\nThe strongest concept was also the hardest to prove:\nClick directly into the Showcase preview to edit it.\n\nEngineering estimated that proving the interaction could take months, and there was uncertainty about whether it was actually a better experience.\n\nRather than ask engineering to build an unproven idea, I used AI-assisted prototyping to make it testable.",
    media: {
      kind: "screen-recording",
      assetId: "showcases-ai-click-to-edit-prototype",
      label: "AI-assisted click-to-edit prototype",
      description:
        "Show: 1. Normal Showcase 2. Creator selects a section 3. Editing state appears 4. Creator changes it 5. Preview updates",
    },
    steps: ["Normal Showcase", "Creator selects a section", "Editing state appears", "Creator changes it", "Preview updates"],
    caption: "AI-assisted prototyping made a technically uncertain interaction tangible enough to evaluate.",
    // The single strongest visual moment on the page — true viewport-edge
    // media, larger heading. Everything else stays "wide" or "contained"
    // so this doesn't have to compete with anything.
    mediaScale: "full-bleed",
  },
  {
    type: "narrative",
    id: "validate-it",
    eyebrow: "04",
    heading: "Let users decide",
    body: "The prototype gave us something concrete to test.\n\nUser testing validated that in-context editing was the stronger experience, giving the team confidence to move forward.",
    pullQuote: {
      lines: ["Select what you see → change it → see the result immediately."],
    },
    // A quick confirming beat right after the page's biggest visual moment —
    // deliberately smaller and quieter, evidence rather than a headline.
    compact: true,
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-user-validation",
          label: "Prototype + user testing",
          description: "If possible, show the interaction alongside the testing evidence.",
        },
        caption: "User testing validated the in-context editing model.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "build-for-flexibility",
    eyebrow: "05",
    heading: "From templates to a system",
    body: "With the interaction model established, the three legacy layouts could become one configurable framework.\n\nCreators could configure components such as:\nVideo grids\nBanners / content blocks\nVideo details\nPlayback\n\nA video grid could use thumbnails that opened the immersive playback experience or continue to behave as an inline video feed.\n\nThe same framework could support richer content blocks and additional components over time.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-modular-system",
          label: "Modular Showcase system",
          description:
            "Show: Components → Configuration → Video grid → Banner → Preview updates. On-screen labels: Components · Configuration · Creator control.",
        },
        caption: "The new system treated different Showcase experiences as configurations of the same underlying framework.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "design-for-scale",
    eyebrow: "06",
    heading: "One system across Vimeo and the open web",
    body: "Showcases needed to work both on Vimeo and when embedded elsewhere.\n\nThe modular framework was designed to adapt across desktop, embedded, and mobile contexts.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-responsive",
          label: "Responsive Showcase",
          description: "Show desktop → embedded → mobile.",
        },
        caption: "The same Showcase adapts across Vimeo, embedded experiences, and mobile.",
        scale: "wide",
      },
      {
        heading: "The first iteration",
        body: "The first iteration shipped with click-to-edit, allowing creators to select and edit sections directly within the Showcase preview.\n\nThe work established a scalable foundation for evolving Showcases from fixed layouts into a configurable creator system.",
        media: {
          kind: "screen-recording",
          assetId: "showcases-shipped-click-to-edit",
          label: "Shipped click-to-edit experience",
        },
        caption: "The first iteration brought click-to-edit into the product.",
        // The closing payoff — back up to "wide" to end the page on a strong beat.
        scale: "wide",
      },
    ],
  },
];

export const showcasesPortfolio: NarrativeCaseStudy = {
  ...showcasesMeta,
  sections: portfolioSections,
  closingStatement: {
    quote:
      "The most valuable role of prototyping wasn't making the final design look real. It was making an uncertain product decision testable.",
    support:
      "AI-assisted prototyping helped turn a potentially months-long engineering question into something the team could experience, test with users, and confidently move forward with.",
  },
  nextProject: showcasesNextProject,
};

// ── Detailed presentation (unchanged content, moved from the old single export) ──
// The full, 13-section case study. Still the source of truth for the deep
// dive; not linked from primary navigation, reachable at
// /case-studies/reimagining-showcases/full.

const detailedSections: NarrativeCaseStudySection[] = [
  {
    type: "narrative",
    id: "templates-to-system",
    eyebrow: "01",
    heading: "Three layouts had become three constraints",
    body: "Vimeo Showcases had evolved into three distinct experiences: Default, Featured, and Live. Each served a different use case, but maintaining separate layouts made the experience harder to customize and harder to evolve.\n\nThe goal wasn't to create a better fourth template.\nIt was to create one flexible system that could support many different creator needs.\n\nI wanted to build on the modular viewing components I'd already established for Vimeo and give creators the ability to configure those components within a Showcase.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-legacy-layouts",
          label: "Legacy Showcase experiences",
          description: "Show the three legacy Showcase layouts.",
        },
        caption: "Three legacy Showcase experiences: Default, Featured, and Live.",
      },
    ],
  },
  {
    type: "narrative",
    id: "north-star",
    eyebrow: "02",
    heading: "One system. Many possibilities.",
    body: "Instead of predefined layouts, the new framework would be composed from reusable components such as Video Grid, Video Details, Banner, Comments, and Transcripts.\n\nCreators could configure those building blocks to create different experiences without introducing another one-off template.",
    keyTakeaway: "Give creators meaningful control without multiplying system complexity.",
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "showcases-component-system",
          label: "Existing Vimeo components assembling into a Showcase",
          description: "Show components becoming a configurable Showcase.",
        },
        caption: "The modular framework brought existing Vimeo viewing components together into a configurable Showcase.",
      },
    ],
  },
  {
    type: "narrative",
    id: "viewing-model",
    eyebrow: "03",
    heading: "Immersion without losing the collection",
    body: "Before solving how creators would customize Showcases, I needed to establish how viewers should move between an individual video and the larger collection.\n\nI explored several playback models and tested them with users through Maze.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-playback-explorations",
          label: "Playback model explorations",
          description: "Show competing playback models.",
        },
        caption: "Competing playback models explored for viewing a video within a Showcase.",
      },
      {
        body: "The preferred model kept the video gallery visible beneath the player and details, allowing viewers to move between videos without losing the context of the collection.",
        media: {
          kind: "gif",
          assetId: "showcases-winning-playback",
          label: "Winning playback model",
        },
        caption: "User testing favored a model that preserved the gallery while viewing an individual video.",
      },
    ],
  },
  {
    type: "narrative",
    id: "hard-problem-testable",
    eyebrow: "04",
    heading: "How should creators edit a modular Showcase?",
    body: "Once the viewing model was established, the harder question became the creator experience.\n\nIf creators could configure individual components, how should they actually edit them?\n\nThe strongest concept was also the one that initially appeared most expensive to prove:\nClick directly into the Showcase preview to edit it.\n\nEngineering estimated that building a proof of concept could take months, and there was uncertainty about whether the interaction was strong enough to justify that investment.\n\nRather than ask engineering to build an unproven idea, I used AI-assisted prototyping to make it tangible.",
  },
  {
    type: "prototype",
    id: "prototype-before-committing",
    eyebrow: "05",
    heading: "Make the idea testable before making it expensive",
    body: "This was the first project where I used AI to prototype an interaction through prompts.\n\nI used it to create a working model of the click-to-edit experience, allowing us to evaluate the interaction itself before committing significant engineering resources.",
    pullQuote: {
      lines: ['"Would this be worth building?"', '→ "Does this actually work?"'],
    },
    media: {
      kind: "screen-recording",
      assetId: "showcases-ai-click-to-edit-prototype",
      label: "AI-assisted click-to-edit prototype",
      description:
        "Show: 1. Normal Showcase 2. Creator selects a section 3. Editing state appears 4. Creator changes the section 5. Preview updates in context",
    },
    steps: [
      "Normal Showcase",
      "Creator selects a section",
      "Editing state appears",
      "Creator changes the section",
      "Preview updates in context",
    ],
    caption: "AI-assisted prototype exploring how creators could select and edit Showcase sections directly within the preview.",
  },
  {
    type: "narrative",
    id: "let-users-decide",
    eyebrow: "06",
    heading: "Validate the interaction",
    body: "The prototype made the interaction concrete enough to test.\n\nUser testing validated that in-context editing was the stronger experience, giving the team confidence to move forward with the approach.",
    pullQuote: {
      lines: ["Select what you see → change it → see the result immediately."],
    },
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-user-validation",
          label: "Click-to-edit interaction",
        },
        caption: "Creators select a section of the Showcase and edit it directly in context.",
      },
    ],
  },
  {
    type: "comparison",
    id: "build-for-flexibility",
    eyebrow: "07",
    heading: "Three layouts became one framework",
    body: "With the interaction model established, we could move away from the legacy Default, Featured, and Live templates.\n\nInstead, the Showcase was built from customizable components.\n\nThe new system could evolve by extending the component library rather than introducing another template.",
    beforeLabel: "Default · Featured · Live",
    afterLabel: "One modular framework",
    media: {
      kind: "animation",
      assetId: "showcases-modular-framework",
      label: "Default / Featured / Live → modular component system",
    },
    caption: "Three specialized layouts were consolidated into one framework built from reusable components.",
  },
  {
    type: "narrative",
    id: "flexible-video-grids",
    eyebrow: "08",
    heading: "Flexible video grids",
    body: "Creators could choose whether their video gallery used:\nThumbnails → immersive playback\nor\nInline video players → direct playback\n\nThis preserved important legacy behavior while allowing the new viewing model to coexist within the same underlying system.",
    keyTakeaway: "These were no longer separate Showcase layouts. They were configurations of the same system.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-video-grid-configuration",
          label: "Video grid configuration",
        },
        caption: "Creators can configure the video grid as thumbnails that open the immersive playback experience or as inline video players.",
      },
    ],
  },
  {
    type: "narrative",
    id: "banners-to-content-blocks",
    eyebrow: "09",
    heading: "From banners to content blocks",
    body: "The same framework created a path for additional customization.\n\nThe existing Banner component could become a flexible content block supporting:\nText\nAction buttons\nBackground images\nCustom background colors\n\nFuture iterations could introduce additional components and configurations without requiring a new layout architecture.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-banner-customization",
          label: "Banner customization",
        },
        caption: "The existing Banner component becomes a customizable content block within the Showcase.",
      },
    ],
  },
  {
    type: "narrative",
    id: "design-for-scale",
    eyebrow: "10",
    heading: "One experience across Vimeo and the open web",
    body: "Showcases needed to work both on Vimeo and when embedded on other websites.\n\nThat meant the system had to gracefully adapt across unpredictable container sizes and breakpoints.\n\nResponsive behavior wasn't a finishing touch.\nIt was part of the system.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-responsive",
          label: "Responsive Showcase",
        },
        caption: "The same modular Showcase adapts from a wide desktop experience to constrained embedded and mobile layouts.",
      },
    ],
  },
  {
    type: "narrative",
    id: "first-iteration",
    eyebrow: "11",
    heading: "Proving the foundation",
    body: "The first iteration of the new creator experience shipped with click-to-edit, allowing creators to select sections directly within the Showcase preview and edit them in context.\n\nThe broader system created a path toward additional capabilities—including richer banners and text blocks, multiple video grids, and other modular components—without requiring entirely new Showcase templates.\n\nThe result was a foundation that could become more capable through iteration without becoming proportionally more complex.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "showcases-shipped-click-to-edit",
          label: "Shipped click-to-edit experience",
        },
        caption: "The first iteration brought the click-to-edit interaction into the product.",
      },
    ],
  },
  {
    type: "outcome",
    id: "outcome",
    heading: "From fixed layouts to a scalable direction",
    items: [
      {
        title: "Validated interaction",
        body: "User testing demonstrated that in-context editing was a stronger creator experience.",
      },
      {
        title: "Reduced technical uncertainty",
        body: "AI-assisted, code-based prototyping reduced uncertainty around a technically complex interaction before significant engineering investment.",
      },
      {
        title: "Modular system",
        body: "Three specialized Showcase layouts were consolidated around reusable viewing components.",
      },
      {
        title: "Creator flexibility",
        body: "Creators could configure how their video galleries behaved without choosing between separate templates.",
      },
      {
        title: "A path for iteration",
        body: "New capabilities could be introduced as components and configurations rather than one-off layouts.",
      },
      {
        title: "A shipped first step",
        body: "Click-to-edit launched as the first iteration of the new creator workflow.",
      },
    ],
  },
  {
    type: "reflection",
    id: "reflection",
    heading: "Reflection",
    items: [
      {
        title: "Prototype the uncertainty",
        body: "The most valuable role of prototyping wasn't making the final design look real.\nIt was making an uncertain product decision testable.\n\nWhen an interaction appeared to require months of engineering effort, an AI-assisted prototype gave the team a way to evaluate the idea before making that investment.",
      },
      {
        title: "Design for the next iteration",
        body: "The goal wasn't to solve every possible Showcase use case at once.\nIt was to establish a foundation where each iteration could build on the last.\n\nBy reusing existing viewing components and treating customization as configuration rather than new templates, we created a system that could grow without multiplying complexity.",
      },
      {
        title: "Give creators control without giving them complexity",
        body: "The best customization systems don't expose every underlying decision.\nThey give people meaningful choices while maintaining sensible constraints underneath.\n\nThat principle shaped both the interaction and the architecture of the new Showcase experience.",
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
// (uploaded). No detailed narrative presentation is built for this project —
// the existing legacy case-study page (lib/case-studies.ts, slug
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
          description: "Show the different legacy viewing surfaces and collection types as fragmented experiences — make the duplicated patterns visually obvious.",
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
    body: "I started with a full audit, not a redesign.\n\nDespite surface differences, most experiences relied on the same underlying pieces — player, metadata, engagement tools, transcripts, related videos, grids. Vimeo didn't lack patterns; the same ones were just rebuilt differently on every surface.\n\nThat thinking extended beyond the viewing experience itself. I proactively aligned these patterns with Vimeo's broader design system — the video/asset thumbnail became one of the most reused cross-team components, and viewing-specific patterns went on to influence other experiences, including Search.",
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
        caption: "The opportunity wasn't to standardize every page — it was to create reusable building blocks that could be recombined across viewing contexts.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "prove-the-system",
    eyebrow: "03",
    heading: "Prove the system",
    body: "This wasn't a big-bang redesign. Private video was the first implementation of the new system — the foundational surface where shared components and patterns were established. Public video followed, validating those patterns at much larger scale.\n\nStaff Picks came next as the first Channel migrated to the new patterns — not a unique design, but a validation point before applying those patterns more broadly. Other Channels stayed on the legacy experience until that validation held up.",
    keyTakeaway: "Live was deprioritized, not ignored — it already worked well embedded, its audience was comparatively small, and its complexity risked slowing the migration. The plan was to fold it in later.",
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "viewer-experience-phased-migration",
          label: "Phased migration: Private → Public → Staff Picks",
          description: "Show Private Video → Public Video → Staff Picks, with shared components accumulating as the system matures.",
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
    body: "Showcases, Watch, and Feed came after the foundational video-page work — a test of whether the modular framework could support a more expressive collection experience, not just a single video.\n\nThe same building blocks — hero content, video grids, playback, collection navigation, responsive and embedded behavior — recombined into something different without rebuilding the system. Showcases pushed that flexibility furthest; that's the deeper story, told in its own case study.",
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "viewer-experience-component-recombination",
          label: "The same components, recombined",
          description: "Show the same underlying components being recombined into different viewing experiences.",
        },
        caption: "The same modular foundation could support very different experiences without rebuilding the system underneath.",
        scale: "wide",
      },
    ],
  },
  {
    type: "comparison",
    id: "design-with-engineering",
    eyebrow: "05",
    heading: "Design with engineering",
    body: "Architecture reviews weren't handoff meetings. In bi-weekly deep dives with engineering — plus weekly standups so decisions didn't sit and wait — we worked through component boundaries, responsive behavior, what belonged in the player versus the page, and how legacy surfaces would migrate.",
    beforeLabel: "WYSIWYG page editor — user-tested",
    afterLabel: "Toggle-based settings — shipped",
    media: {
      kind: "screen-recording",
      assetId: "viewer-experience-wysiwyg-concept",
      label: "WYSIWYG page editor concept",
      description: "The interactive WYSIWYG editing prototype that tested well with users.",
    },
    caption:
      "The strongest experience wasn't always the right implementation. Working directly with engineering helped us preserve the intent while reducing implementation cost.\n\nThe WYSIWYG editor tested well with users, but engineering estimated a multi-quarter build. We preserved the underlying customization need with toggle-based settings and presets that could ship within the release scope.",
    secondaryBeat: {
      body: "When the question was behavior rather than visual polish, architecture reviews also produced lower-fidelity interaction prototypes — a shared language for working through component boundaries and edge cases with engineering.",
      media: {
        kind: "screen-recording",
        assetId: "viewer-experience-architecture-prototype",
        label: "Architecture review prototype",
        description: "A lower-fidelity interaction prototype used to work through component behavior in architecture reviews, not visual polish.",
      },
      caption: "The goal wasn't just a visually coherent system — it was one that was technically scalable.",
      scale: "contained",
    },
  },
  {
    type: "narrative",
    id: "migrate-people",
    eyebrow: "06",
    heading: "Migrate people, not just technology",
    body: "Previous Vimeo redesigns had created confusion and support volume when workflows changed unexpectedly.\n\nI pushed for an opt-in, transitional rollout instead of a hard cutover — context and a softer path in, not an overnight replacement. Platform migration isn't only a technical problem; it's a user-adoption one.",
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
    type: "metrics",
    id: "outcomes",
    eyebrow: "07",
    heading: "A platform that compounds",
    intro:
      "The platform shift was associated with significant improvements across viewing, engagement, and discovery — downstream results of the work rather than targets set at the outset.",
    items: [
      {
        value: "42%",
        label: "Platform unification",
        description: "The project's measure of how much of Vimeo's viewing ecosystem had moved onto the shared modular foundation.",
      },
      {
        value: "+400%",
        label: "Video views",
        description: "Driven by the redesigned Feed experience.",
      },
      {
        value: "+98%",
        label: "Watch traffic",
        description: "Monthly visits grew from roughly 905K to 1.8M.",
      },
      {
        value: "+183%",
        label: "Community bookings",
        description: "Over nine months, following improved discovery and layout clarity.",
      },
      {
        value: "+39%",
        label: "Minutes viewed",
        description: "On-site minutes viewed increased from roughly 2.3M to 3.2M.",
      },
      {
        value: "+12%",
        label: "Monthly active users",
        description: "MAU on video pages grew from 24.7M to 27.6M.",
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
      "The work was associated with real gains across viewing, engagement, and discovery — but the more durable result was structural: a system that made each subsequent surface faster to bring online than the last.",
  },
  nextProject: viewerExperienceNextProject,
};

// ── Knowledge Discovery: portfolio presentation ─────────────────────────────
// ~9 beats. Source of truth: brief supplied 2026-08-21. No detailed
// presentation built for this project yet — this route serves as both the
// portfolio and, for now, the only presentation (no /full fallback exists).

const knowledgeDiscoveryPortfolioSections: NarrativeCaseStudySection[] = [
  {
    type: "narrative",
    id: "opportunity",
    eyebrow: "01",
    heading: "Video had become knowledge.",
    body: "Vimeo's player had long been recognized for reliable, high-quality playback. But our customers had changed — Enterprise organizations increasingly used Vimeo for onboarding, compliance, training, internal communications, conferences, and education. These weren't videos people consumed from beginning to end. They were repositories of information.\n\nYet interacting with them remained surprisingly primitive. Finding a single answer often meant scrubbing through hours of playback, important moments couldn't easily be referenced, and live viewers couldn't catch up after joining late. Because more than 85% of Enterprise viewing occurred in embedded players, many of Vimeo's existing discovery features disappeared entirely outside Vimeo.com.",
    keyTakeaway: "The player excelled at playback. It wasn't designed for knowledge discovery.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "knowledge-discovery-problem-infographic",
          label: "From passive playback to lost context",
          description: "Infographic: Passive Playback → Scrubbing → Lost Context → Knowledge Discovery Platform.",
        },
        caption: "Interacting with long-form video remained primitive — the player excelled at playback, not at helping people find what they needed.",
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
          description: "Diagram: Knowledge Discovery → Interactive Transcripts → Navigation → Sharing → Live DVR.",
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
    id: "interactive-transcripts",
    eyebrow: "04",
    heading: "Interactive Transcripts",
    body: "Interactive transcripts became the foundation of the new discovery experience.\n\nRather than treating transcripts as accessibility artifacts, I designed them as navigation tools. Viewers could search spoken content, jump directly to relevant moments, follow synchronized playback, and personalize the experience with timestamps and language preferences.\n\nSearch evolved through testing too. Instead of isolating search results, viewers preferred seeing matches inline within the transcript, preserving conversational context while making navigation effortless.",
    media: {
      kind: "screen-recording",
      assetId: "knowledge-discovery-transcript-evolution",
      label: "Interactive transcript evolution",
      description: "Show the transcript experience evolving: overlay concept → slide-in panel → inline search → final design.",
    },
    steps: [
      "Overlay concept — explored directly on the video",
      "Slide-in panel — preserved playback, established a reusable pattern",
      "Inline search — matches shown in context, not isolated",
      "Final design — search, navigate, and personalize in one panel",
    ],
    caption: "Extensive prototype testing shaped the final interaction model — transforming transcripts from passive documentation into an active exploration tool.",
    mediaScale: "full-bleed",
  },
  {
    type: "comparison",
    id: "chapters-and-navigation",
    eyebrow: "05",
    heading: "Chapters & Navigation",
    body: "The existing chapter experience contained unnecessary visual complexity and made scanning long-form content difficult. The redesign focused on clarity.",
    beforeLabel: "Legacy chapter markers — complex, hard to scan",
    afterLabel: "Duration-labeled chapters — shipped",
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
    body: "Knowledge becomes more valuable when it can be shared. Building on the redesigned chapter experience, I introduced one-click sharing for individual moments within a video — rather than sending an entire two-hour recording, viewers could reference exactly the information another person needed.",
    beforeLabel: "Rich editor concept — with preview and trimming",
    afterLabel: "URL-based sharing — shipped MVP",
    media: {
      kind: "screen-recording",
      assetId: "knowledge-discovery-sharing-tradeoff",
      label: "Segment sharing, concept to MVP",
      description: "Show the progression: editor concept → engineering tradeoff → final MVP.",
    },
    caption: "Early concepts envisioned a lightweight editing experience with preview and trimming. Engineering concerns about complexity led to a URL-based MVP that delivered immediate value while preserving a path to iterate — a deliberate tradeoff between the ideal experience and delivery velocity.",
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
    body: "Creators and Enterprise customers consistently praised the experience for making long-form content dramatically easier to navigate, reference, and share.\n\nUnexpectedly, transcripts also found a passionate audience outside Enterprise — reinforcing that improving discoverability benefited every type of viewer.",
    compact: true,
    beats: [
      {
        media: {
          kind: "image",
          assetId: "knowledge-discovery-customer-proof",
          label: "Customer quotes and social proof",
          description: "Placeholder for customer quotes and social-proof moments once collected.",
        },
        caption: "Customer reflections on what discovery unlocked.",
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
      "For years, video players had been optimized for playback. Reframing that question guided every decision — from transcripts to Live DVR — and turned one of Vimeo's most important products into a platform for knowledge discovery.",
  },
  nextProject: knowledgeDiscoveryNextProject,
};

// ── Registries ──────────────────────────────────────────────────────────
// `narrativeCaseStudies` lists one entry per project — the portfolio
// presentation, since that's what's linked from the homepage card and the
// nav's Work dropdown. Detailed presentations are a secondary route, not a
// separate nav-level "project".

export const narrativeCaseStudies: NarrativeCaseStudy[] = [
  viewerExperiencePortfolio,
  knowledgeDiscoveryPortfolio,
  showcasesPortfolio,
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
// the card and `outcomes` is intentionally empty — this project uses
// `highlightTags` instead of fabricated metrics.
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

// Homepage card shows the lead 3 metrics — sliced directly from the same
// `items` array the page's Metrics section renders, so the card can't drift
// out of sync with the page.
const viewerExperienceMetricsSection = viewerExperiencePortfolio.sections.find(
  (s): s is Extract<NarrativeCaseStudySection, { type: "metrics" }> => s.type === "metrics",
);
const viewerExperienceCardMetrics: Metric[] = (viewerExperienceMetricsSection?.items ?? [])
  .slice(0, 3)
  .map((m) => ({ value: m.value, label: m.label }));

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
  outcomes: viewerExperienceCardMetrics,
  sections: [],
};

const knowledgeDiscoveryMetricsSection = knowledgeDiscoveryPortfolio.sections.find(
  (s): s is Extract<NarrativeCaseStudySection, { type: "metrics" }> => s.type === "metrics",
);
const knowledgeDiscoveryCardMetrics: Metric[] = (knowledgeDiscoveryMetricsSection?.items ?? [])
  .slice(0, 3)
  .map((m) => ({ value: m.value, label: m.label }));

// Not yet added to the homepage grid (app/page.tsx) — that's a manually
// laid-out 12-col grid and adding a 9th card means deciding what it
// displaces. This adapter exists so the card is ready whenever that's
// decided; the page itself is already live and routable without it.
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
