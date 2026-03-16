// lib/case-studies.ts
import type { CaseStudy } from "@/types/case-study";

export const caseStudies: CaseStudy[] = [
  {
    slug: "vimeo-viewing-experience",
    title: "Reimagining the Vimeo Viewing Experience",
    company: "Vimeo",
    role: "Principal Product Designer",
    year: "2023–2025",
    summary:
      "Rebuilt Vimeo’s fragmented viewing ecosystem into a unified modular platform — turning disconnected surfaces into a single scalable viewer foundation.",
    themeColor: "#1AB7EA",
    themeColorDark: "#0A4A60",
    coverImage: "/images/vimeo-cover.jpg",
    outcomes: [
      { value: "42%", label: "Platform Unification" },
      { value: "+400%", label: "Increase in Video Views" },
      { value: "+98%", label: "Increase in Watch Page Visits" },
      { value: "+183%", label: "Increase in Community Bookings" },
    ],
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Reimagining the Vimeo Viewing Experience",
        body: "A platform overhaul that unified Vimeo's fragmented viewing surfaces into a cohesive viewer experience — spanning web, OTT, and mobile.",
      },
      {
        id: "problem",
        type: "problem",
        title: "The Problem",
        body:
          "Vimeo’s viewing ecosystem had been shaped by years of independent investments in Watch, Showcases, single video pages, and discovery. Each surface had its own layout, interaction patterns, and codebase, so what “watching on Vimeo” meant depended entirely on where you entered the product. For viewers, moving between surfaces often felt like switching products — interactions changed, layouts jumped around, and muscle memory never had a chance to form. For internal teams, each surface lived in its own codebase, so designers and engineers kept rebuilding the same patterns, slowing delivery and making it hard to invest confidently in the viewing experience.",
        image: {
          src: "/images/vimeo-context.jpg",
          alt: "Vimeo platform fragmentation diagram",
          fullWidth: true,
        },
      },
      {
        id: "solution",
        type: "solution",
        title: "The Solution",
        body:
          "I defined a single modular viewing platform — a shared set of components, layout rules, and interaction patterns — that could power every surface. Instead of redesigning pages one by one, we designed once and deployed everywhere, so new capabilities and refinements automatically propagated across the ecosystem.",
        image: {
          src: "/images/vimeo-solution.jpg",
          alt: "Overview of the unified modular viewing platform",
          fullWidth: false,
        },
      },
      {
        id: "approach",
        type: "approach",
        title: "Approach",
        body:
          "I treated this as a platform problem, not a page redesign. The work moved from understanding how every surface behaved, to defining a shared architecture, to validating interaction patterns with prototypes before committing them to code.",
      },
      {
        id: "approach-audit",
        type: "approach",
        title: "Audit & Pattern Mapping",
        body:
          "I began with a cross-surface audit, mapping every viewer state across Watch, Showcases, single video pages, and discovery. That work revealed a small set of recurring patterns — playback, metadata, comments, transcripts, related content — that were implemented differently everywhere.",
        image: {
          src: "/images/vimeo-approach-audit.jpg",
          alt: "Audit and mapping of viewing surfaces and shared patterns",
          fullWidth: false,
        },
      },
      {
        id: "approach-architecture",
        type: "approach",
        title: "Platform Architecture",
        body:
          "Using those patterns, I defined a modular component model and layout rules that could satisfy the hardest constraints first: private and public pages with complex states and breakpoints. This architecture became the contract that product, design, and engineering used to reason about new work.",
        image: {
          src: "/images/vimeo-approach-architecture.jpg",
          alt: "Modular component architecture for the unified viewer",
          fullWidth: false,
        },
      },
      {
        id: "approach-prototypes",
        type: "approach",
        title: "Prototypes & User Testing",
        body:
          "I created animated prototypes to explore interaction details — panel behavior, action placement, and how content should enter and exit — and tested them with viewers to avoid shipping jarring transitions. These prototypes also helped me align leaders on the experience before engineering invested in implementation.",
        image: {
          src: "/images/vimeo-approach-prototypes.gif",
          alt: "Animated prototype of viewer transitions and panel interactions",
          fullWidth: true,
        },
      },
      {
        id: "approach-rollout",
        type: "approach",
        title: "Phased Rollout",
        body:
          "Working with my PM and engineering partners, I planned a phased rollout that brought the new system online surface by surface while legacy code was still in production. That sequencing let us prove value quickly, de-risk migration, and keep the platform stable as adoption grew.",
        image: {
          src: "/images/vimeo-approach-rollout.jpg",
          alt: "Phased rollout plan across viewer surfaces",
          fullWidth: false,
        },
      },
      {
        id: "design",
        type: "design",
        title: "Design",
        body:
          "A unified modular system applied across private pages, public pages, showcases, and community discovery surfaces.",
      },
      {
        id: "design-private",
        type: "design",
        title: "Private Video Pages",
        body:
          "Consolidated playback, metadata, and engagement into a modular layout that centers the player while keeping actions and context predictable across devices. This became the reference implementation for how all future surfaces should feel.",
        image: {
          src: "/images/vimeo-design-private.jpg",
          alt: "Private video page layouts in the modular system",
          fullWidth: true,
        },
      },
      {
        id: "design-public",
        type: "design",
        title: "Public Video Pages",
        body:
          "Extended the same framework with transcripts, chapters, and related video feeds to support deep, long‑form viewing. Discovery tools were integrated into the layout rather than bolted on, so exploration never breaks the core viewing experience.",
        image: {
          src: "/images/vimeo-design-public.jpg",
          alt: "Public video page layouts within the modular system",
          fullWidth: true,
        },
      },
      {
        id: "design-showcases",
        type: "design",
        title: "Showcases",
        body:
          "Rebuilt Showcases as configurable modules instead of rigid templates, so creators can tailor banners, grids, and playback behavior without breaking consistency. The same set of components powers both simple portfolios and complex collections.",
        image: {
          src: "/images/vimeo-design-showcases.jpg",
          alt: "Showcase layouts built from reusable modules",
          fullWidth: true,
        },
      },
      {
        id: "design-community",
        type: "design",
        title: "Community Discovery",
        body:
          "Redesigned discovery surfaces to revive browsing inside Vimeo’s logged‑in experience, using the modular system at scale. The Feed and Watch now share the same viewer language, making it easier to move from “just looking” to committed viewing and bookings.",
        image: {
          src: "/images/vimeo-design-community.jpg",
          alt: "Community discovery and feed exploration surfaces",
          fullWidth: true,
        },
      },
      {
        id: "outcome",
        type: "outcome",
        title: "Impact",
        metrics: [
          { value: "42%", label: "Platform Unification" },
          { value: "+400%", label: "Increase in Video Views" },
          { value: "+98%", label: "Increase in Watch Page Visits" },
          { value: "+183%", label: "Increase in Community Bookings" },
        ],
        body:
          "42% Platform Unification\nLaunched 5 of 12 core viewing surfaces on a shared codebase.\n\n+400% Increase in Video Views\nThe new Feed dramatically increased video consumption and discovery.\n\n+98% Increase in Watch Page Visits\nMonthly visits grew from 905k to 1.8M after redesigning entry points and layouts.\n\n+183% Increase in Community Bookings\nImproved discovery and clarity led to increased conversion for paid community events.",
      },
      {
        id: "reflection",
        type: "reflection",
        title: "Reflection",
        body: "The hardest part of this project wasn't the design — it was building alignment across three platform teams with different roadmaps and stakeholders. The design system became as much a governance artifact as a design one.",
      },
    ],
  },
  {
    slug: "vimeo-video-engagement",
    title: "Empowering Viewers with Video Engagement",
    company: "Vimeo",
    role: "Principal Product Designer",
    year: "2023–2024",
    summary:
      "Turned Vimeo’s video player from a passive embed into an interactive knowledge engine for Enterprise customers, built around transcripts, chapters, and live DVR.",
    themeColor: "#0A4A60",
    themeColorDark: "#F8F7F4",
    coverImage: "/images/video-engagement-cover.jpg",
    outcomes: [
      { value: "$4.5M+", label: "Enterprise ARR impact" },
      { value: "Live DVR", label: "Industry-first with transcripts" },
      { value: "40,000+", label: "Average daily transcript views" },
      { value: "7,800+", label: "Weekly video segment shares" },
    ],
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Empowering Viewers with Video Engagement",
        body:
          "I led the evolution of Vimeo’s video player into an interactive platform that empowers viewers to engage with content rather than passively watch it. By introducing embeddable transcripts, chapter navigation and segment sharing, and Live DVR with transcripts, we redefined how Enterprise customers search, follow, and share important moments in video.",
      },
      {
        id: "problem",
        type: "problem",
        title: "The Problem",
        body:
          "For Enterprise customers, Vimeo’s player behaved like a black box: long videos were hard to search, scan, or reference, and key tools like transcripts disappeared in embedded players where most viewing happened. Teams using video as institutional knowledge couldn’t quickly find what they needed or share specific moments, which limited the value of Vimeo in training, communication, and decision-making.",
        image: {
          src: "/images/video-engagement-problem.jpg",
          alt: "Embedded player without transcripts compared to full Vimeo experience",
          fullWidth: true,
        },
      },
      {
        id: "solution",
        type: "solution",
        title: "The Solution",
        body:
          "I turned the player into an interactive discovery surface built around three capabilities: embeddable transcripts, chapter navigation with segment sharing, and live DVR with transcript support. Together, they make long-form video searchable, scannable, and shareable — even when embedded inside Enterprise tools.",
        image: {
          src: "/images/video-engagement-solution.jpg",
          alt: "Overview of interactive transcript, chapters, and DVR capabilities",
          fullWidth: false,
        },
      },
      {
        id: "approach",
        type: "approach",
        title: "Approach",
        body:
          "I reframed the player as a discovery surface rather than a passive container, and defined three core capabilities as the backbone: embeddable transcripts, chapter navigation with segment sharing, and live DVR with transcript support. Each capability had to work in the tight constraints of embedded players, with accessibility and performance as non‑negotiables.",
      },
      {
        id: "approach-audience",
        type: "approach",
        title: "Enterprise Workflows & Constraints",
        body:
          "I started by mapping how Enterprise teams actually used Vimeo: embedded training, town halls, and internal updates inside their own tools. That clarified that the player itself needed to carry discovery — transcripts, structure, and sharing — without relying on any surrounding page UI.",
        image: {
          src: "/images/video-engagement-approach-audience.jpg",
          alt: "Enterprise viewing contexts and embedded player constraints",
          fullWidth: false,
        },
      },
      {
        id: "approach-capabilities",
        type: "approach",
        title: "Capability-First Framing",
        body:
          "I framed the work around three capabilities rather than a list of features, and used them to drive decisions about layout, controls, and states. This kept the player focused while still supporting deep exploration across transcripts, chapters, and DVR.",
        image: {
          src: "/images/video-engagement-approach-capabilities.jpg",
          alt: "Capabilities map for transcripts, chapters, and DVR",
          fullWidth: false,
        },
      },
      {
        id: "approach-prototypes",
        type: "approach",
        title: "Prototypes & Experiments",
        body:
          "I built animated prototypes and A/B tests to compare entry points and panel behavior — overlay versus slide‑in transcripts, search icons versus transcript icons — and used real viewer behavior to choose patterns that felt obvious without overwhelming the player.",
        image: {
          src: "/images/video-engagement-approach-prototypes.gif",
          alt: "Animated mockups of transcript, chapters, and DVR interactions under test",
          fullWidth: true,
        },
      },
      {
        id: "approach-rollout",
        type: "approach",
        title: "Delivery & Sequencing",
        body:
          "With PM and engineering, I sequenced delivery so transcripts, chapters and sharing, and live DVR could each ship independently while still fitting into a cohesive knowledge-navigation model. That let us start driving value quickly without destabilizing a player that serves millions of daily views.",
        image: {
          src: "/images/video-engagement-approach-rollout.jpg",
          alt: "Phased rollout of transcripts, chapters, and DVR",
          fullWidth: false,
        },
      },
      {
        id: "design",
        type: "design",
        title: "Design",
        body:
          "An interactive player system that combines transcripts, chapters, segment sharing, and live DVR into a single, accessible experience across embedded and on-site players.",
      },
      {
        id: "design-transcripts",
        type: "design",
        title: "Embeddable Transcripts",
        body:
          "Synchronized, embeddable transcripts let viewers search within a video, jump directly to key moments, and follow along as playback progresses. This turned long-form training and communications into scannable, referenceable assets wherever the player is embedded.",
        image: {
          src: "/images/video-engagement-transcripts.jpg",
          alt: "Embedded player with transcript panel and inline search",
          fullWidth: true,
        },
      },
      {
        id: "design-chapters",
        type: "design",
        title: "Chapters & Segment Sharing",
        body:
          "Redesigned chapter navigation makes structure and duration visible at a glance, and segment-level sharing lets viewers send the exact moment that matters instead of an entire video.",
        image: {
          src: "/images/video-engagement-chapters.jpg",
          alt: "Chapter navigation and deep-linking to specific segments",
          fullWidth: true,
        },
      },
      {
        id: "design-dvr",
        type: "design",
        title: "Live DVR with Transcripts",
        body:
          "DVR controls let viewers rewind up to four hours of live content, catch up on missed moments, and jump back to live while transcripts stay fully synchronized, turning live events into reusable knowledge.",
        image: {
          src: "/images/video-engagement-dvr.jpg",
          alt: "Live DVR timeline with Skip to Live and transcript support",
          fullWidth: true,
        },
      },
      {
        id: "design-responsive",
        type: "design",
        title: "Responsive Player Surface",
        body:
          "Aligned transcripts, chapters, and DVR interactions across desktop and mobile so the player behaves like a complete product surface in embeds, not just a video frame.",
        image: {
          src: "/images/video-engagement-responsive.jpg",
          alt: "Player interactions across desktop and mobile breakpoints",
          fullWidth: true,
        },
      },
      {
        id: "outcome",
        type: "outcome",
        title: "Impact",
        metrics: [
          {
            value: "$4.5M+",
            label: "Enterprise ARR impact",
          },
          {
            value: "Live DVR",
            label: "Industry-first Live DVR with transcripts",
          },
          {
            value: "40,000+",
            label: "Average daily transcript views",
          },
          {
            value: "7,800+",
            label: "Weekly video segment shares",
          },
        ],
        body:
          "$4.5M+ Enterprise ARR impact\nInfluenced major renewals and expansions by introducing knowledge-transfer capabilities valued by Enterprise customers.\n\nIndustry-first Live DVR with transcripts\nEstablished Vimeo as the only platform offering transcript-supported DVR playback for live streams.\n\n40,000+ average daily transcript views\nDemonstrating strong adoption and demand for searchable video.\n\n7,800+ weekly video segment shares\nDriving discovery and extending the reach of long-form content.",
      },
      {
        id: "reflection",
        type: "reflection",
        title: "Reflection",
        body:
          "When customers treat video as their knowledge base, small interaction details — like which icon you use, how a panel opens, or how a link is shared — can directly affect multi-million-dollar deals. Designing for embedded, accessibility-first Enterprise workflows from the start made the player genuinely useful in the environments that mattered most.",
      },
    ],
  },
  {
    slug: "redesign-placeholder",
    title: "Scaling Design Systems at Scale",
    company: "Placeholder Co.",
    role: "Principal Product Designer",
    year: "2022–2023",
    summary:
      "Building the component infrastructure that powers a 200-person design org.",
    themeColor: "#F4E4C1",
    themeColorDark: "#5A3E1B",
    coverImage: "/images/placeholder-cover.jpg",
    outcomes: [
      { value: "200+", label: "Designers on system" },
      { value: "60%", label: "Faster time to ship" },
    ],
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Scaling Design Systems at Scale",
        body: "Placeholder content — add your case study here.",
      },
    ],
  },
  {
    slug: "mobile-redesign-placeholder",
    title: "Mobile-First Commerce Redesign",
    company: "Retail Co.",
    role: "Principal Product Designer",
    year: "2021–2022",
    summary:
      "A ground-up rethink of the mobile shopping experience that doubled conversion.",
    themeColor: "#D4E8D4",
    themeColorDark: "#1A3D1A",
    coverImage: "/images/retail-cover.jpg",
    outcomes: [
      { value: "2×", label: "Conversion rate" },
      { value: "40%", label: "Faster checkout" },
      { value: "#1", label: "App Store ranking" },
    ],
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Mobile-First Commerce Redesign",
        body: "Placeholder content — add your case study here.",
      },
    ],
  },
  {
    slug: "editorial-systems-placeholder",
    title: "Editorial Systems for Storytelling",
    company: "Various",
    role: "Principal Product Designer",
    year: "2019–2022",
    summary:
      "An exploration of how editorial grids, motion, and systems thinking can make complex product stories feel inevitable.",
    themeColor: "#E8D5C4",
    themeColorDark: "#3D2C23",
    coverImage: "/images/editorial-systems-cover.jpg",
    outcomes: [
      { value: "12+", label: "Product narratives shaped" },
      { value: "5", label: "Design systems influenced" },
      { value: "∞", label: "Future stories" },
    ],
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Editorial Systems for Storytelling",
        body:
          "A series of projects where I used editorial grids, motion, and modular layouts to turn complex product narratives into simple, cinematic stories.",
      },
      {
        id: "problem",
        type: "problem",
        title: "The Problem",
        body:
          "As products grew more complex, traditional marketing and product pages struggled to explain them without overwhelming people. Teams needed a way to tell layered stories that still felt focused and intentional.",
      },
      {
        id: "solution",
        type: "solution",
        title: "The Solution",
        body:
          "I leaned on editorial systems — strong grids, modular content blocks, and deliberate motion — to create layouts that could scale with the story while keeping a clear visual hierarchy.",
      },
      {
        id: "design",
        type: "design",
        title: "Design",
        body:
          "A flexible editorial grid, motion guidelines, and a component library that gave teams a repeatable way to tell complex stories without starting from scratch every time.",
      },
      {
        id: "outcome",
        type: "outcome",
        title: "Impact",
        metrics: [
          { value: "12+", label: "Product narratives shaped" },
          { value: "5", label: "Design systems influenced" },
          { value: "∞", label: "Future stories" },
        ],
        body:
          "These patterns have been reused across product, marketing, and case study work — making it easier to turn complex ideas into clear, confident stories.",
      },
      {
        id: "reflection",
        type: "reflection",
        title: "Reflection",
        body:
          "The same systems thinking I apply to products also applies to how we talk about them. Good storytelling infrastructure makes every future story faster and more coherent to tell.",
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
