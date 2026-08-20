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
  subtitle: "Unifying a fragmented viewing ecosystem into one scalable platform.",
  description:
    "How I unified Vimeo's fragmented viewing ecosystem into a single modular platform — aligning design, product, and engineering around a shared architecture to improve engagement, velocity, and business outcomes.",
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
  title: "Reimagining Showcases",
  subtitle: "From rigid templates to a flexible creator system.",
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

// "Next project" cross-links between the two — both derived from each
// other's shared meta object, not a lookup, so titles/colors can't drift.
const showcasesNextProject = {
  slug: viewerExperienceMeta.slug,
  title: viewerExperienceMeta.title,
  company: viewerExperienceMeta.company,
  themeColor: viewerExperienceMeta.themeColor,
  themeColorDark: viewerExperienceMeta.themeColorDark,
};

const viewerExperienceNextProject = {
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
    id: "the-problem",
    eyebrow: "01",
    heading: "A fragmented viewing ecosystem",
    body: "Vimeo's viewing experiences had evolved independently across multiple legacy codebases.\n\nThe result was an inconsistent experience for viewers and a growing maintenance burden for design and engineering. Different surfaces looked and behaved differently, while teams repeatedly solved similar problems in isolation.",
    keyTakeaway: "The problem wasn't that Vimeo needed a better page. It needed a better system.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "viewer-experience-fragmented-ecosystem",
          label: "Fragmented Vimeo viewing experiences",
          description: "Show several legacy experiences moving quickly between one another: single video, Showcase, Watch / community.",
        },
        caption: "Vimeo's viewing ecosystem had evolved into a collection of disconnected experiences and codebases.",
        scale: "full-bleed",
      },
    ],
  },
  {
    type: "narrative",
    id: "the-vision",
    eyebrow: "02",
    heading: "One platform. Many viewing experiences.",
    body: "The goal was not to redesign each viewing surface independently. It was to create a single modular viewing framework that could support multiple experiences from the same foundation.",
    pullQuote: {
      lines: ["Design once → build once → deploy everywhere"],
    },
    mediaFirst: true,
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "viewer-experience-shared-component-system",
          label: "Shared components becoming multiple experiences",
          description: "Show a common set of components becoming different surfaces: Shared components → Single Video → Showcase → Watch / Feed.",
        },
        caption: "Reusable components and shared rules created a common foundation for Vimeo's viewing experiences.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "start-with-architecture",
    eyebrow: "03",
    heading: "Map the ecosystem before redesigning it",
    body: "The initiative was too large to solve all at once.\n\nI began with a comprehensive audit of Vimeo's existing viewing experiences, mapping components by purpose and identifying where different products were solving the same problems in different ways.",
    keyTakeaway: "The audit made the underlying system visible.",
    beats: [
      {
        media: {
          kind: "image",
          assetId: "viewer-experience-foundational-audit",
          label: "Foundational audit / component mapping",
          description: "Show the progression: existing experiences → component inventory → common patterns → shared system.",
        },
        caption: "An audit of existing viewing experiences revealed overlapping components and opportunities to establish a shared foundation.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "north-star",
    eyebrow: "04",
    heading: "Design the path, not just the destination",
    body: "A complete migration couldn't happen all at once.\n\nI worked with Product to divide the initiative into manageable phases, starting with single-video experiences because they contained the greatest number of modules and provided the strongest opportunity to validate the new system.\n\nAs each phase was completed, the next became easier because the underlying components and patterns had already been established.",
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "viewer-experience-phased-migration",
          label: "Phased migration",
          description:
            "Show the platform expanding over time: Single videos → Public videos → Showcases → Community. (Showcases appears only as one phase in this sequence — the deeper Showcases story lives in its own dedicated case study.)",
        },
        caption: "A phased migration allowed us to validate the system incrementally while reducing the number of new modules required in each subsequent experience.",
        scale: "wide",
      },
    ],
  },
  {
    type: "narrative",
    id: "make-it-real",
    eyebrow: "05",
    heading: "Design with engineering, not for engineering",
    body: "This wasn't design handed over to engineering at the end.\n\nI worked closely with engineering throughout the process — through weekly standups, architecture deep dives, working sessions, prototypes, and design critiques with the broader design and design-systems teams.\n\nThe goal was to make decisions together while the system was still taking shape.",
    beats: [
      {
        media: {
          kind: "screen-recording",
          assetId: "viewer-experience-prototype-to-implementation",
          label: "Prototype → component → implementation",
          description: "Show an example of a design evolving from prototype to production-ready component.",
        },
        caption: "Prototypes became a shared language for working through layout, behavior, edge cases, and system constraints with engineering.",
        scale: "wide",
      },
      {
        heading: "Make the future tangible",
        body: "I also used high-fidelity prototypes to communicate the vision and align leadership around the transformation.\n\nI presented the Vimeo executive team with a walkthrough of the existing experience, highlighting inconsistency and user disorientation, followed by a walkthrough of the new modular layouts.",
        media: {
          kind: "screen-recording",
          assetId: "viewer-experience-executive-vision-prototype",
          label: "Executive vision prototype",
          description: "Show the old experience transitioning into the proposed system.",
        },
        caption: "A high-fidelity prototype made the difference between the fragmented current state and the unified vision tangible.",
        scale: "contained",
      },
    ],
  },
  {
    type: "comparison",
    id: "design-within-reality",
    eyebrow: "06",
    heading: "The best solution isn't always the one that ships",
    body: "The project required constant judgment about where to push the experience and where to simplify.\n\nRather than treating constraints as purely technical problems, I used them to preserve the underlying user need while finding solutions that could actually ship.",
    beforeLabel: "WYSIWYG page editor — user-tested",
    afterLabel: "Simplified toggle settings — shipped",
    media: {
      kind: "screen-recording",
      assetId: "viewer-experience-wysiwyg-to-settings",
      label: "WYSIWYG prototype → simplified settings experience",
      description: "Show the interactive WYSIWYG editing prototype, then the simplified toggle-based settings that shipped instead.",
    },
    caption: "The WYSIWYG editor tested well with users, but its engineering cost wasn't feasible for the release. We preserved the underlying customization need with a simpler settings model.",
    secondaryBeat: {
      body: "I also designed an immersive, cinematic playback mode. To meet the release deadline, we deferred it to explore later in partnership with the Player team for embedded video.",
      media: {
        kind: "screen-recording",
        assetId: "viewer-experience-immersive-mode-tradeoff",
        label: "Immersive mode prototype",
        description: "High-fidelity prototype showing a user entering an immersive \"Theater Mode.\"",
      },
      caption: "An immersive playback mode tested well but was deferred to focus engineering resources on the core migration.",
      scale: "contained",
    },
  },
  {
    type: "narrative",
    id: "system-at-scale",
    eyebrow: "07",
    heading: "From a design initiative to a platform",
    body: "The result wasn't simply a cleaner set of viewing experiences.\n\nThe work created a shared foundation that could support multiple viewing surfaces and allow new features to be designed once and deployed across the ecosystem.",
    beats: [
      {
        media: {
          kind: "animation",
          assetId: "viewer-experience-shared-system-at-scale",
          label: "Shared system powering multiple surfaces",
          description: "Show the same underlying components supporting: Single Video → Public Video → Showcase → Watch / Feed.",
        },
        caption: "The shared platform allowed new viewer-facing features to be designed once and deployed across multiple experiences.",
        scale: "wide",
      },
    ],
  },
  {
    type: "metrics",
    id: "outcomes",
    heading: "The system delivered measurable impact",
    intro:
      "By shifting to a shared platform, we didn't just create consistency. We unlocked measurable gains in engagement, business outcomes, and platform adoption.",
    items: [
      {
        value: "42%",
        label: "Platform unification",
        description: "5 of 12 distinct viewing surfaces were migrated to the new system.",
      },
      {
        value: "+400%",
        label: "Video views",
        description: "The new Feed drove 400% more video views and 1.5× more impressions.",
      },
      {
        value: "+98%",
        label: "Watch traffic",
        description: "Monthly Watch visits increased from 905K to 1.8M.",
      },
      {
        value: "+183%",
        label: "Community bookings",
        description: "Improved discovery and layout clarity contributed to increased Community bookings.",
      },
      {
        value: "+39%",
        label: "Minutes viewed",
        description: "On-site minutes viewed increased from 2.3M to 3.2M.",
      },
      {
        value: "+12%",
        label: "Monthly active users",
        description: "MAU on video pages increased from 24.7M to 27.6M.",
      },
    ],
  },
];

export const viewerExperiencePortfolio: NarrativeCaseStudy = {
  ...viewerExperienceMeta,
  sections: viewerExperiencePortfolioSections,
  closingStatement: {
    quote: "Solve the structural problem first. The interface gets easier when the system underneath it is right.",
    support:
      "The biggest lesson from the project was that the highest-leverage design decisions happened before the polished interfaces. By starting with an audit, mapping the system, and establishing reusable components, we created a foundation that allowed individual experiences to become progressively easier to design and develop.",
  },
  nextProject: viewerExperienceNextProject,
};

// ── Registries ──────────────────────────────────────────────────────────
// `narrativeCaseStudies` lists one entry per project — the portfolio
// presentation, since that's what's linked from the homepage card and the
// nav's Work dropdown. Detailed presentations are a secondary route, not a
// separate nav-level "project".

export const narrativeCaseStudies: NarrativeCaseStudy[] = [viewerExperiencePortfolio, showcasesPortfolio];

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
