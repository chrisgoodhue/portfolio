// lib/transition-store.ts
//
// A simple client-side singleton that stores the card's bounding rect
// and theme color so the overlay can animate from card → fullscreen.
// This avoids prop-drilling across unrelated components and survives
// the Next.js route change.

export interface CardRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface TransitionState {
  rect: CardRect | null;
  color: string;
  slug: string;
  requestId: number;
  /** Homepage scroll position captured before navigating away from home. */
  scrollY: number | null;
  phase:
    | "idle"
    | "content-fade-out"  // Step 2: card content fades
    | "expanding"          // Step 4: container expands to fullscreen
    | "expanded"           // Step 4 complete: solid color fills screen
    | "page-fade-in"       // Step 5: case study content appears
    | "shrinking"          // Back: container shrinks
    | "content-fade-in";  // Back: card content reappears
  /** Set by case study page after content has painted; overlay fades only then */
  overlayFadeRequested: boolean;
}

let state: TransitionState = {
  rect: null,
  color: "#000",
  slug: "",
  requestId: 0,
  scrollY: null,
  phase: "idle",
  overlayFadeRequested: false,
};

const listeners = new Set<() => void>();

let requestCounter = 0;

function notify() {
  listeners.forEach((l) => l());
}

export const transitionStore = {
  getState: () => state,

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    // React effects expect a cleanup of type () => void; ensure we don't return boolean
    return () => {
      listeners.delete(listener);
    };
  },

  /** Start transition immediately (pre-measure) to prevent rapid double-click races. */
  requestExpandMeta: (color: string, slug: string, scrollY?: number | null) => {
    requestCounter += 1;
    state = {
      rect: null,
      color,
      slug,
      requestId: requestCounter,
      scrollY: typeof scrollY === "number" ? scrollY : null,
      phase: "content-fade-out",
      overlayFadeRequested: false,
    };
    notify();
  },

  /** Fill in the card rect after measuring it. */
  setExpandRect: (rect: CardRect) => {
    state = { ...state, rect, overlayFadeRequested: false };
    notify();
  },

  beginExpand: (rect: CardRect, color: string, slug: string, scrollY?: number | null) => {
    requestCounter += 1;
    state = {
      rect,
      color,
      slug,
      requestId: requestCounter,
      scrollY: typeof scrollY === "number" ? scrollY : null,
      phase: "content-fade-out",
      overlayFadeRequested: false,
    };
    notify();
  },

  setPhase: (phase: TransitionState["phase"]) => {
    state = { ...state, phase };
    notify();
  },

  /** Call from case study page after content has painted (e.g. double rAF) so overlay fades only then */
  requestOverlayFadeOut: (requestId: number) => {
    // If another navigation started, ignore stale fade requests.
    if (state.requestId !== requestId) return;
    state = { ...state, overlayFadeRequested: true };
    notify();
  },

  ackOverlayFadeOut: (requestId: number) => {
    if (!state.overlayFadeRequested) return;
    state = { ...state, overlayFadeRequested: false };
    notify();
  },

  reset: () => {
    state = {
      rect: null,
      color: "#000",
      slug: "",
      requestId: 0,
      scrollY: null,
      phase: "idle",
      overlayFadeRequested: false,
    };
    notify();
  },
};
