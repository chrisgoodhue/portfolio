// types/case-study.ts

export interface Metric {
  value: string;       // e.g. "32%", "500K"
  label: string;       // e.g. "Increase in viewer engagement"
}

export interface CaseStudySection {
  id: string;
  type:
    | "hero"
    | "context"
    | "problem"
    | "solution"
    | "approach"
    | "design"
    | "outcome"
    | "reflection";
  title?: string;
  body?: string;                // Rich text / markdown
  image?: {
    src: string;
    alt: string;
    fullWidth?: boolean;
  };
  video?: {
    src: string;
    poster?: string;
    fullWidth?: boolean;
  };
  metrics?: Metric[];
  quote?: {
    text: string;
    attribution?: string;
  };
}

export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  role: string;
  year: string;
  summary: string;               // One-sentence card summary
  themeColor: string;            // CSS color, e.g. "#E8D5C4"
  themeColorDark: string;        // Darker variant for text contrast
  coverImage: string;            // Path to cover image
  outcomes: Metric[];            // Snapshot metrics shown on card
  sections: CaseStudySection[];
}

// Grid card variants ─ extensible for future card types
export type CardType = "case-study" | "about" | "custom";

export interface GridCard {
  id: string;
  type: CardType;
  // Spans control the editorial grid layout (out of 12 columns)
  colSpan?: number;              // default: 6
  // Responsive 2xl span override (min-width: 1536px)
  colSpan2xl?: number;
  rowSpan?: number;              // default: 1
  caseStudy?: CaseStudy;         // populated when type === "case-study"
}
