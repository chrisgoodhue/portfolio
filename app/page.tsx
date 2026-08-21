// app/page.tsx
import { CardGrid } from "@/components/CardGrid";
import { showcasesCardData, viewerExperienceCardData, knowledgeDiscoveryCardData } from "@/lib/narrative-case-studies";
import type { CaseStudy, GridCard } from "@/types/case-study";

// Placeholder cards for projects that aren't written up yet — added purely
// to preview the grid at its eventual, more-populated size and sanity-check
// proportions before the real content exists. `comingSoon: true` makes
// CaseStudyCard render them inert (no click-through, "Coming soon" instead
// of the arrow) since there's no page at these slugs yet. Replace each with
// its real *CardData adapter (see lib/narrative-case-studies.ts) as it's
// written, and delete this block once the last one is.
const playerCardData: CaseStudy = {
  slug: "vimeo-player-platform",
  title: "Building the Player Behind Millions of Videos",
  company: "Vimeo",
  role: "Principal Product Designer",
  year: "[TBD]",
  summary: "Modernizing Vimeo's core player through accessibility, customization, and platform thinking.",
  themeColor: "#34D399",
  themeColorDark: "#064E3B",
  coverImage: "",
  outcomes: [],
  sections: [],
  comingSoon: true,
};

const personalOffersCardData: CaseStudy = {
  slug: "vimeo-personal-offers",
  title: "Making Every Offer Feel Personal",
  company: "Vimeo",
  role: "Principal Product Designer",
  year: "[TBD]",
  summary: "[Summary coming soon]",
  themeColor: "#FB7185",
  themeColorDark: "#4C0519",
  coverImage: "",
  outcomes: [],
  sections: [],
  comingSoon: true,
};

// Staggered rhythm: each row flips the big/small emphasis instead of
// repeating the same split, so the page has some visual movement going
// down it rather than reading as a uniform tile grid.
//   Row 1 — About (4)            + Featured (8)              [narrow → wide]
//   Row 2 — Knowledge Disc. (8)   + Showcases (4)             [wide → narrow]
//   Row 3 — Player (6)            + Personal Offers (6)       [even split]
// Same at every breakpoint (colSpan === colSpan2xl).
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
    colSpan2xl: 8,
    // Points at the new narrative-portfolio adapter (not the raw legacy
    // caseStudies[0]) so this card can't drift from the page it links to.
    caseStudy: viewerExperienceCardData,
  },
  {
    id: "knowledge-discovery",
    type: "case-study",
    // Replaces the old "vimeo-engagement" card (Empowering Viewers with
    // Video Engagement — see lib/case-studies.ts) — same underlying
    // project, now told through the narrative system. Given the wide slot
    // this row — it's the newest full case study, worth the emphasis.
    colSpan: 8,
    colSpan2xl: 8,
    caseStudy: knowledgeDiscoveryCardData,
  },
  {
    id: "showcases",
    type: "case-study",
    colSpan: 4,
    colSpan2xl: 4,
    caseStudy: showcasesCardData,
  },
  {
    id: "player-platform",
    type: "case-study",
    colSpan: 6,
    colSpan2xl: 6,
    caseStudy: playerCardData,
  },
  {
    id: "personal-offers",
    type: "case-study",
    colSpan: 6,
    colSpan2xl: 6,
    caseStudy: personalOffersCardData,
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
      {/* 0px is intentional: CardGrid supplies its own var(--space-5) padding
          on all sides plus var(--space-5) gaps between cards, so the top gap
          already matches the left/right/between-card gaps without this. */}
      <div style={{ paddingTop: "0px" }}>
        <CardGrid cards={cards} />
      </div>
    </main>
  );
}
