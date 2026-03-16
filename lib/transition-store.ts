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
  phase: "idle",
  overlayFadeRequested: false,
};

const listeners = new Set<() => void>();

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

  beginExpand: (rect: CardRect, color: string, slug: string) => {
    state = { rect, color, slug, phase: "content-fade-out", overlayFadeRequested: false };
    notify();
  },

  setPhase: (phase: TransitionState["phase"]) => {
    state = { ...state, phase };
    notify();
  },

  /** Call from case study page after content has painted (e.g. double rAF) so overlay fades only then */
  requestOverlayFadeOut: () => {
    state = { ...state, overlayFadeRequested: true };
    notify();
  },

  reset: () => {
    state = { rect: null, color: "#000", slug: "", phase: "idle", overlayFadeRequested: false };
    notify();
  },
};
