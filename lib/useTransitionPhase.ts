"use client";
// lib/useTransitionPhase.ts
// Convenience hook to reactively read the transition store in any component.

import { useState, useEffect } from "react";
import { transitionStore, type TransitionState } from "./transition-store";

export function useTransitionPhase(): TransitionState {
  const [state, setState] = useState<TransitionState>(
    transitionStore.getState()
  );

  useEffect(() => {
    const unsub = transitionStore.subscribe(() => {
      setState({ ...transitionStore.getState() });
    });
    return unsub;
  }, []);

  return state;
}
