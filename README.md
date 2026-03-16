# Portfolio

A design-award-caliber portfolio site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | Server components, static generation, Vercel-native |
| Language | TypeScript | Type-safe data model, safer refactors |
| Styles | Tailwind CSS | Utility-first, design tokens via CSS vars |
| Animation | Framer Motion + Web Animations API | Declarative React animations + precise imperative timing |
| Deployment | Vercel | Zero-config, edge network, preview deployments |

## Quick Start

```bash
# Install
npm install

# Develop
npm run dev
# → http://localhost:3000

# Build
npm run build

# Preview production build
npm start
```

## Architecture

```
portfolio/
├── app/                         # Next.js App Router pages
│   ├── layout.tsx               # Root layout — mounts TransitionOverlay
│   ├── page.tsx                 # Homepage — editorial card grid
│   ├── about/page.tsx           # About page — experience, philosophy, contact
│   └── case-studies/[slug]/
│       └── page.tsx             # Case study page — animated entrance/exit
│
├── components/
│   ├── TransitionOverlay.tsx    # The animation engine (see below)
│   ├── CardGrid.tsx             # 12-column editorial grid
│   ├── CaseStudyCard.tsx        # Clickable card with expand animation
│   ├── AboutCard.tsx            # Dark bio card
│   ├── CaseStudyHero.tsx        # Full-viewport case study hero
│   ├── CaseStudySection.tsx     # Polymorphic section renderer
│   ├── Container.tsx            # Max-width wrapper
│   └── Nav.tsx                  # Fixed transparent nav
│
├── lib/
│   ├── transition-store.ts      # Vanilla singleton store (persists across routes)
│   ├── useTransitionPhase.ts    # React hook for store subscription
│   ├── case-studies.ts          # All case study data
│   └── utils.ts                 # cn() and other utilities
│
└── types/
    └── case-study.ts            # CaseStudy, CaseStudySection, GridCard types
```

## The Card → Page Transition

The core interaction is a **shared container expansion** — the card's colored background grows to fill the viewport, then the case study content fades in:

```
User clicks card
  │
  ├─ CaseStudyCard records getBoundingClientRect()
  ├─ Card content fades out (180ms)
  └─ transitionStore.beginExpand(rect, color, slug)
       │
       └─ TransitionOverlay (mounted in layout, persists across routes)
             ├─ Positions div at exact card coordinates
             ├─ Animates to 100vw × 100vh (560ms, custom easing)
             ├─ router.push() fires once animation completes
             └─ Case study page fades in (350ms)
```

Back transition reverses: fade out → overlay shrinks to card rect → card content fades in.

The `transitionStore` is a vanilla singleton (no Redux/Zustand) that lives outside React's tree, so it survives route changes cleanly.

## Adding a Case Study

**1. Add to `lib/case-studies.ts`:**

```ts
{
  slug: "my-project",
  title: "Project Title",
  company: "Company Name",
  role: "Principal Product Designer",
  year: "2024",
  summary: "One sentence summary for the card.",
  themeColor: "#E8D4C8",       // Card + page background
  themeColorDark: "#4A2010",   // Text on top of themeColor
  coverImage: "/images/my-project-cover.jpg",
  outcomes: [
    { value: "48%", label: "Increase in retention" },
    { value: "2.1M", label: "Monthly active users" },
  ],
  sections: [
    { id: "hero", type: "hero", title: "...", body: "..." },
    { id: "context", type: "context", title: "Context", body: "..." },
    { id: "problem", type: "problem", title: "The Problem", quote: { text: "...", attribution: "..." } },
    { id: "approach", type: "approach", title: "Approach", body: "...", image: { src: "/images/approach.jpg", alt: "...", fullWidth: true } },
    { id: "design", type: "design", title: "Design", body: "..." },
    { id: "outcome", type: "outcome", title: "Outcome", metrics: [...] },
    { id: "reflection", type: "reflection", title: "Reflection", body: "..." },
  ],
}
```

**2. Add a card to `app/page.tsx`:**

```ts
const cards: GridCard[] = [
  // ... existing cards
  {
    id: "my-project",
    type: "case-study",
    colSpan: 6,  // 4 | 6 | 8 | 12
    caseStudy: caseStudies[3],
  },
];
```

That's it. The card, transition, and full page auto-wire.

## Adding Real Images

Replace placeholder divs in `CaseStudyCard.tsx` and `CaseStudySection.tsx`:

```tsx
// Instead of the placeholder div:
import Image from "next/image";

<Image
  src={caseStudy.coverImage}
  alt={caseStudy.title}
  fill
  style={{ objectFit: "cover" }}
  priority
/>
```

Put images in `/public/images/`. Recommended sizes:
- Cover images: 1600×1000px minimum
- Section images: 2400×1350px for full-width

## Adding a New Card Type

Example: adding a "Writing" card:

**1. `types/case-study.ts`** — extend the union:
```ts
export type CardType = "case-study" | "about" | "writing" | "custom";

export interface GridCard {
  // ...existing fields
  writingPost?: { title: string; date: string; url: string };
}
```

**2. Create `components/WritingCard.tsx`**

**3. `components/CardGrid.tsx`** — add one branch:
```tsx
{card.type === "writing" && card.writingPost && (
  <WritingCard post={card.writingPost} />
)}
```

**4. `app/page.tsx`** — add to grid:
```ts
{ id: "writing-01", type: "writing", colSpan: 4, writingPost: { ... } }
```

## Grid Layout Reference

The grid is 12 columns. `colSpan` values:

| colSpan | Desktop width | Use for |
|---|---|---|
| 4 | 1/3 | About card, narrow cards |
| 6 | 1/2 | Standard case study cards |
| 8 | 2/3 | Featured/hero case study |
| 12 | Full width | Statement piece |

## Choosing Theme Colors

Each case study needs:
- `themeColor` — the background color (card + page hero)
- `themeColorDark` — text/icon color on top of it

Good pairings:
```
Warm:  themeColor: "#E8C4A0"   themeColorDark: "#4A1E00"
Cool:  themeColor: "#B8D4E8"   themeColorDark: "#0A2840"
Sage:  themeColor: "#C8DCC0"   themeColorDark: "#1A3010"
Plum:  themeColor: "#D8C0D8"   themeColorDark: "#380A38"
Ink:   themeColor: "#1A1A2E"   themeColorDark: "#E8E8F4"
```

Use a contrast checker to ensure 4.5:1 ratio for body text.

## Deployment

### Vercel (recommended)

```bash
# One-time setup
npm i -g vercel
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

Or connect your GitHub repo at vercel.com → Import Project. Every push to `main` auto-deploys.

### Environment Variables

No environment variables required for the base setup. If you add a CMS or analytics later, set them in the Vercel dashboard under Project → Settings → Environment Variables.

## Typography

| Class | Font | Weight | Use |
|---|---|---|---|
| `.text-display` | Playfair Display | 900 | Headlines, card titles, hero text |
| `.text-display-italic` | Playfair Display | 700 italic | Quotes, emphasis |
| `.text-label` | DM Mono | 400 | Labels, metadata, nav items |
| `.text-metric` | Playfair Display | 900 | Large metric numbers |
| body | DM Sans | 300–400 | Body text, UI copy |

## Performance Notes

- All case study pages are **statically generated** via `generateStaticParams`
- Google Fonts loaded via CSS `@import` — swap to `next/font` for better LCP
- Images use `next/image` with automatic WebP conversion and responsive sizes
- Framer Motion is code-split per page via dynamic import if bundle size becomes a concern

## License

Personal portfolio — not for redistribution.
