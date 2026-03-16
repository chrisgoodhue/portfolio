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
      "A platform overhaul that unified Vimeo's fragmented viewing surfaces into a cohesive viewer experience.",
    themeColor: "#1AB7EA",
    themeColorDark: "#0A4A60",
    coverImage: "/images/vimeo-cover.jpg",
    outcomes: [
      { value: "32%", label: "Increase in viewer engagement" },
      { value: "500K", label: "Monthly viewers reached" },
      { value: "4.1→4.7", label: "App store rating" },
    ],
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Reimagining the Vimeo Viewing Experience",
        body: "A platform overhaul that unified Vimeo's fragmented viewing surfaces into a cohesive viewer experience — spanning web, OTT, and mobile.",
      },
      {
        id: "context",
        type: "context",
        title: "Context",
        body: "Vimeo had grown its product suite through acquisition and rapid iteration, resulting in three distinct viewing surfaces that felt disconnected from one another. Users moving between web, the Vimeo TV app, and mobile encountered fundamentally different interaction patterns and visual languages.",
        image: {
          src: "/images/vimeo-context.jpg",
          alt: "Vimeo platform fragmentation diagram",
          fullWidth: true,
        },
      },
      {
        id: "problem",
        type: "problem",
        title: "The Problem",
        body: "How might we create a viewing experience that feels unmistakably Vimeo — regardless of where or how content is consumed — while honoring the unique constraints of each surface?",
        quote: {
          text: "Our viewers shouldn't have to re-learn Vimeo every time they switch devices.",
          attribution: "VP of Product, Vimeo",
        },
      },
      {
        id: "approach",
        type: "approach",
        title: "Approach",
        body: "We began with a cross-surface audit, mapping every viewer state across 14 distinct contexts. From there, we identified a set of invariant principles — things that must always be true regardless of surface. These became the foundation of the Vimeo Viewer Design System.",
        image: {
          src: "/images/vimeo-approach.jpg",
          alt: "Cross-surface audit mapping",
          fullWidth: false,
        },
      },
      {
        id: "design",
        type: "design",
        title: "Design",
        body: "The redesign centered on a unified player shell with surface-adaptive components. We introduced a persistent viewer context layer — an ambient information system that maintained spatial memory as users navigated between content.",
        image: {
          src: "/images/vimeo-design.jpg",
          alt: "New Vimeo player design",
          fullWidth: true,
        },
      },
      {
        id: "outcome",
        type: "outcome",
        title: "Outcome",
        metrics: [
          { value: "32%", label: "Increase in viewer engagement" },
          { value: "500K", label: "Monthly viewers reached" },
          { value: "4.1→4.7", label: "App store rating improvement" },
          { value: "18%", label: "Reduction in support contacts" },
        ],
        body: "The unified viewing experience launched in Q1 2025 across all surfaces. Within 90 days, viewer engagement metrics exceeded projections across every tracked dimension.",
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
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
