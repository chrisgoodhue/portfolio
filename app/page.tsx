// app/page.tsx
import { CardGrid } from "@/components/CardGrid";
import { Nav } from "@/components/Nav";
import { caseStudies } from "@/lib/case-studies";
import type { GridCard } from "@/types/case-study";

const cards: GridCard[] = [
  {
    id: "about",
    type: "about",
    colSpan: 4,
  },
  {
    id: "vimeo-viewer",
    type: "case-study",
    colSpan: 8,
    caseStudy: caseStudies[0],
  },
  {
    id: "vimeo-engagement",
    type: "case-study",
    colSpan: 6,
    caseStudy: caseStudies[1],
  },
  {
    id: "systems",
    type: "case-study",
    colSpan: 6,
    caseStudy: caseStudies[2],
  },
  {
    id: "commerce",
    type: "case-study",
    colSpan: 6,
    caseStudy: caseStudies[3],
  },
  {
    id: "future-work",
    type: "case-study",
    colSpan: 6,
    caseStudy: caseStudies[4],
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
      <Nav />
      {/* pt-16 gives breathing room below fixed nav */}
      <div style={{ paddingTop: "0.5rem" }}>
        <CardGrid cards={cards} />
      </div>
    </main>
  );
}
