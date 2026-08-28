// lib/case-studies.ts
import type { CaseStudy } from "@/types/case-study";

const allCaseStudies: CaseStudy[] = [
  {
    slug: "vimeo-viewing-experience",
    title: "Reimagining the Vimeo Viewing Experience",
    company: "Vimeo",
    role: "Principal Product Designer",
    year: "2023-2025",
    summary:
      "Rebuilt Vimeo’s fragmented viewing ecosystem into a unified modular platform. That turned disconnected surfaces into a single scalable viewer foundation.",
    themeColor: "#1AB7EA",
    themeColorDark: "#094356",
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
        body: "A platform overhaul that unified Vimeo's fragmented viewing surfaces into a cohesive viewer experience, spanning web, OTT, and mobile.",
      },
      {
        id: "problem",
        type: "problem",
        title: "The Problem",
        body:
          "Vimeo’s viewing ecosystem had been shaped by years of independent investments in Watch, Showcases, single video pages, and discovery. Each surface had its own layout, interaction patterns, and codebase, so what “watching on Vimeo” meant depended entirely on where you entered the product. For viewers, moving between surfaces often felt like switching products. Interactions changed, layouts jumped around, and muscle memory never had a chance to form. For internal teams, each surface lived in its own codebase, so designers and engineers kept rebuilding the same patterns, slowing delivery and making it hard to invest confidently in the viewing experience.",
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
          "I defined a single modular viewing platform (a shared set of components, layout rules, and interaction patterns) that could power every surface. Instead of redesigning pages one by one, we designed once and deployed everywhere, so new capabilities and refinements automatically propagated across the ecosystem.",
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
          "I began with a cross-surface audit, mapping every viewer state across Watch, Showcases, single video pages, and discovery. That work revealed a small set of recurring patterns (playback, metadata, comments, transcripts, related content) that were implemented differently everywhere.",
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
          "I created animated prototypes to explore interaction details (panel behavior, action placement, and how content should enter and exit) and tested them with viewers to avoid shipping jarring transitions. These prototypes also helped me align leaders on the experience before engineering invested in implementation.",
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
        id: "outcome",
        type: "outcome",
        title: "Impact",
        body:
          "This team's job was building the structural foundation, not chasing a single growth number \u2014 so the honest measure of success is what that foundation made possible afterward.\n\nPrivate Video, Public Video, and Showcases' viewing experience moved onto one shared component set, directly cutting the engineering cost of every viewing feature built since. After the team was disbanded, I stayed on to lead Showcases' customization work individually, building on the same foundation. Two years later, an entirely different team \u2014 with no connection to the original effort \u2014 reused the same components to rebuild Watch, Feed, Staff Picks, and navigation as part of a separate initiative with its own strategy.\n\nA system's real test isn't whether it ships. It's whether it outlives the team that built it. This one did, twice.",
      },
      {
        id: "reflection",
        type: "reflection",
        title: "Reflection",
        body: "The hardest part of this project wasn't the design. It was building alignment across three platform teams with different roadmaps and stakeholders. The design system became as much a governance artifact as a design one.",
      },
    ],
  },
  {
    slug: "vimeo-viewing-experience-updated",
    title: "Reimagining the Vimeo Viewing Experience (Updated)",
    company: "Vimeo",
    role: "Principal Product Designer",
    year: "2023–2025",
    summary:
      "Vimeo’s viewing ecosystem had become a set of independently built surfaces. I led a unified viewing platform—video pages, showcases, Watch, and the Feed—powered by a modular component system that delivered consistent behavior for viewers and a scalable architecture for teams.",
    themeColor: "#1AB7EA",
    themeColorDark: "#0A4A60",
    coverImage: "/images/vimeo-cover.jpg",
    outcomes: [
      { value: "+400%", label: "Increase in Video Views" },
      { value: "+98%", label: "Increase in Watch Page Visits" },
      { value: "+183%", label: "Increase in Community Bookings" },
      { value: "+12%", label: "Increase in Monthly Active Users" },
      { value: "42%", label: "Viewing surfaces migrated" },
    ],
    sections: [
      {
        id: "overview",
        type: "context",
        title: "Reimagining the Vimeo Viewing Experience",
        body: `🎬 HERO SURFACES
Private video page
Public video page
Showcase
Feed

Company: Vimeo
Role: Principal Product Designer
Timeline: 2023–2025
Team: 3 Product Managers · 2 UX Researchers · 8 Engineers · 2 Designers

Vimeo’s viewing ecosystem had evolved into a set of independently built surfaces—video pages, showcases, Watch, and the Feed—each with its own layout, interaction model, and codebase.
This created an inconsistent experience for viewers and significant duplication for internal teams.

I led the design of a unified viewing platform, defining a modular system of reusable components that could power every surface.
By aligning product, design, and engineering around a shared architecture and rolling it out in phases, we improved engagement, accelerated development, and reduced system complexity.`,
      },
      {
        id: "problem",
        type: "problem",
        title: "The Problem",
        body: `Vimeo’s viewing ecosystem was fragmented.

Different surfaces had:
- different layouts
- different interaction patterns
- separate codebases

For viewers, this resulted in an experience that felt inconsistent and unpredictable.
For internal teams, it led to duplicated effort—similar features were repeatedly built and maintained across multiple systems.`,
        image: {
          src: "/images/vimeo-context-fragmented.jpg",
          alt: "Old fragmented experiences collage (Watch, Showcase, Video Page)",
          fullWidth: true,
        },
      },
      {
        id: "solution",
        type: "solution",
        title: "The Opportunity",
        body: `Rather than redesigning individual pages, I reframed the problem as a platform opportunity:
How might we create a single system to power all viewing experiences?

We defined success across three areas:
Platform scalability — reduce duplicated engineering effort
Viewer retention — create a consistent experience
Deep engagement — increase watch time

Instead of rebuilding per surface, we standardized patterns into a modular component model that could adapt across contexts while keeping behavior consistent.`,
        image: {
          src: "/images/vimeo-solution-platform-opportunity.jpg",
          alt: "Unified platform opportunity (system moment)",
          fullWidth: false,
        },
      },
      {
        id: "approach",
        type: "approach",
        title: "Understanding the System",
        body: `I treated this as a platform problem, not a page redesign.
The work moved from auditing how each surface behaved, to defining a reusable component architecture, to validating interaction patterns before scaling.

Key insight:
It wasn’t missing patterns—it was inconsistent implementation.`,
      },
      {
        id: "approach-audit",
        type: "approach",
        title: "Auditing the Ecosystem",
        body: `I audited all viewing surfaces and mapped them to their underlying structure.
Despite visual differences, most experiences shared the same elements:
video player, metadata, comments, transcripts, and related content.

📸 Image concept: Wireframe component mapping (no UI)`,
        image: {
          src: "/images/vimeo-audit-mapping.jpg",
          alt: "Wireframe component mapping (no UI)",
          fullWidth: false,
        },
      },
      {
        id: "approach-key-insight",
        type: "approach",
        title: "Key Insight",
        body: `The issue wasn’t missing patterns—it was inconsistent implementation.
Instead of redesigning pages, we could standardize these patterns into reusable components.`,
      },
      {
        id: "approach-components",
        type: "approach",
        title: "From Pages to Components",
        body: `Defining the platform meant building from structure up.
Core modules:
- video details
- engagement panel
- transcripts
- video grids
- feed components`,
        image: {
          src: "/images/vimeo-component-design-system.jpg",
          alt: "Initial component design system (early UI components)",
          fullWidth: false,
        },
      },
      {
        id: "approach-alignment",
        type: "approach",
        title: "Securing Alignment",
        body: `To secure buy-in, I created a prototype that stitched these components into a full experience.

🎬 Animation concept:
End-to-end prototype walkthrough (login → viewing → navigation) — an executive storytelling moment.

This made the platform strategy tangible and aligned leadership around a shared vision.`,
        image: {
          src: "/images/vimeo-end-to-end-prototype.jpg",
          alt: "End-to-end prototype walkthrough (login → viewing → navigation)",
          fullWidth: true,
        },
      },
      {
        id: "approach-constraints",
        type: "approach",
        title: "Constraints",
        body: `- Legacy systems required phased migration
- Embedded contexts required flexible layouts
- Design system was still evolving`,
      },
      {
        id: "approach-validation",
        type: "approach",
        title: "Designing the System",
        body: `We assembled components into full experiences and explored layout variations.
We validated interaction patterns by testing:
- engagement placement
- panel behavior

This led to a panel-based interaction model used across the platform.`,
        image: {
          src: "/images/vimeo-layout-explorations-and-tests.jpg",
          alt: "Engagement placement test + Panel behavior prototype (2-up)",
          fullWidth: true,
        },
      },
      {
        id: "approach-rollout",
        type: "approach",
        title: "Rolling Out the Platform",
        body: `Phased Migration:
Private video pages
Public video pages
Showcases
Feed and Watch

Each phase:
launched at ~25%
measured performance
scaled to 100%

This allowed us to refine components while expanding the system.`,
        image: {
          src: "/images/vimeo-phased-progression-collage.jpg",
          alt: "Progression collage (video page → showcase → feed)",
          fullWidth: false,
        },
      },
      {
        id: "design",
        type: "design",
        title: "Final Experience",
        body: `The result was a unified system across all viewing surfaces.
The same components adapt across contexts while maintaining consistent behavior.

Designing for flexibility:
We introduced layout controls so creators could:
enable/disable modules
customize presentation
maintain familiarity`,
        image: {
          src: "/images/vimeo-final-multi-surface-collage.jpg",
          alt: "Multi-surface collage (private, public, showcase, feed)",
          fullWidth: true,
        },
      },
      {
        id: "design-video-panels",
        type: "design",
        title: "Video Pages (Panel Interaction)",
        body: `The viewing experience centers on a panel-based interaction model.
Video page → panel interaction → engagement surfaces that remain consistent across entry points.`,
        image: {
          src: "/images/vimeo-video-page-panels.jpg",
          alt: "Video page (panel interaction)",
          fullWidth: true,
        },
      },
      {
        id: "design-showcase-browsing",
        type: "design",
        title: "Showcase Browsing",
        body: `Showcases use the same modules with configurable layout controls.
Browsing stays cohesive because core interactions are standardized.`,
        image: {
          src: "/images/vimeo-showcase-browsing.jpg",
          alt: "Showcase browsing",
          fullWidth: true,
        },
      },
      {
        id: "design-feed-scrolling",
        type: "design",
        title: "Feed Scrolling",
        body: `Feed scrolling reuses the viewer language to drive discovery.
The unified model keeps creators' surfaces distinct while the experience remains predictable for viewers.`,
        image: {
          src: "/images/vimeo-feed-scrolling.jpg",
          alt: "Feed scrolling",
          fullWidth: true,
        },
      },
      {
        id: "design-flexibility",
        type: "design",
        title: "Designing for Flexibility",
        body: `To support different creator needs, we added layout controls that keep familiarity intact while enabling variation.

🎬 Animation concept:
Settings panel interaction or AI panel usage.`,
        image: {
          src: "/images/vimeo-settings-or-ai-panel.jpg",
          alt: "Settings panel interaction OR AI panel usage",
          fullWidth: false,
        },
      },
      {
        id: "design-adapting-after-launch",
        type: "design",
        title: "Adapting After Launch",
        body: `After launching public video pages, engagement dropped.
The issue was behavioral.

We had moved engagement actions out of the player, breaking existing user habits.
We responded by:
- reintroducing actions into the player (desktop)
- keeping a simplified layout (mobile)`,
        image: {
          src: "/images/vimeo-before-after-player.jpg",
          alt: "Before/after video player (with vs without engagement actions)",
          fullWidth: true,
        },
      },
      {
        id: "design-tradeoffs",
        type: "design",
        title: "Tradeoffs",
        body: `- Deferred immersive playback mode
- Removed motion-heavy transitions
- Simplified layout editing`,
        image: {
          src: "/images/vimeo-immersive-theater-mode.jpg",
          alt: "Immersive / theater mode prototype",
          fullWidth: false,
        },
      },
      {
        id: "outcome",
        type: "outcome",
        title: "Impact",
        metrics: [
          { value: "+400%", label: "Increase in Video Views" },
          { value: "+98%", label: "Increase in Watch Page Visits" },
          { value: "+183%", label: "Increase in Community Bookings" },
          { value: "+12%", label: "Increase in Monthly Active Users" },
          { value: "42%", label: "Viewing surfaces migrated" },
        ],
        body: `Why it worked:
Simplified layouts → better discovery
Consistent patterns → reduced friction
Shared system → faster iteration`,
      },
      {
        id: "reflection",
        type: "reflection",
        title: "Reflection",
        body: `Start with the system.
Solving structure unlocked scalable improvements.

Design for behavior.
Users don’t always follow ideal models—platforms need leverage, not perfect theory.

Platforms create leverage.
Shared components enabled faster, broader impact.

Final thought:
This project shifted Vimeo from designing individual pages to designing a unified viewing platform.
That shift didn’t just improve the product—it changed how teams build, iterate, and scale new features going forward.`,
      },
    ],
  },
];

export const caseStudies: CaseStudy[] = allCaseStudies.filter(
  (cs) => cs.slug !== "vimeo-viewing-experience-updated"
);

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
