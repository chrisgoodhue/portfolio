// app/page.tsx
import { CardGrid } from "@/components/CardGrid";
import { caseStudies } from "@/lib/case-studies";
import type { GridCard } from "@/types/case-study";

// Wide screens: Row 1 = about (4) + featured (8); Row 2 = 2 equal (6+6); Row 3 = 3 equal (4+4+4)
const cards: GridCard[] = [
  {
    id: "about",
    type: "about",
    colSpan: 4,
    colSpan2xl: 4,
  },
  {
    id: "featured",
    type: "case-study",
    colSpan: 8,
    colSpan2xl: 4,
    caseStudy: caseStudies[0],
  },
  {
    id: "vimeo-engagement",
    type: "case-study",
    colSpan: 6,
    colSpan2xl: 4,
    caseStudy: caseStudies[1],
  },
  {
    id: "systems",
    type: "case-study",
    colSpan: 6,
    colSpan2xl: 3,
    caseStudy: caseStudies[2],
  },
  {
    id: "commerce",
    type: "case-study",
    colSpan: 4,
    colSpan2xl: 3,
    caseStudy: caseStudies[3],
  },
  {
    id: "editorial",
    type: "case-study",
    colSpan: 4,
    colSpan2xl: 3,
    caseStudy: caseStudies[4],
  },
  {
    id: "design-ops",
    type: "case-study",
    colSpan: 4,
    colSpan2xl: 3,
    caseStudy: caseStudies[5],
  },
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-paper)",
      }}
    >
      {/* pt-16 gives breathing room below fixed nav */}
      <div style={{ paddingTop: "0px" }}>
        <CardGrid cards={cards} />
      </div>
    </main>
  );
}
