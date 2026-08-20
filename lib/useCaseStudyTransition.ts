"use client";
// lib/useCaseStudyTransition.ts
//
// Shared shell logic for any page that participates in the card → page
// shared-element transition (see components/TransitionOverlay.tsx). Extracted
// from the original CaseStudyClient so both the legacy case-study renderer
// and the new narrative renderer drive the exact same transition behavior
// instead of maintaining two copies of it.

import { useEffect, useState, useCallback, useRef } from "react";
import { transitionStore } from "@/lib/transition-store";

interface UseCaseStudyTransitionOptions {
  /** Whether content for this page is already available (skip blank first paint). */
  hasContent: boolean;
}

export function useCaseStudyTransition({ hasContent }: UseCaseStudyTransitionOptions) {
  const [visible, setVisible] = useState(() => hasContent);
  const [isLeaving, setIsLeaving] = useState(false);
  const fadeRequestedRef = useRef(false);

  // Helper: show content then after paint tell overlay to fade (so no background flash)
  const showContentAndRequestOverlayFade = useCallback(() => {
    setVisible(true);
    transitionStore.setPhase("page-fade-in");
    if (fadeRequestedRef.current) return;

    // Capture the requestId for this navigation so stale pages can't
    // accidentally fade the overlay during a newer transition.
    const currentRequestId = transitionStore.getState().requestId;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (fadeRequestedRef.current) return;
        fadeRequestedRef.current = true;
        transitionStore.requestOverlayFadeOut(currentRequestId);
      });
    });
  }, []);

  // ── Fade in after overlay expansion ──────────────────────────────────────
  useEffect(() => {
    if (!hasContent) return;

    const ts = transitionStore.getState();

    // Direct navigation or refresh: show immediately (no overlay to fade)
    if (ts.phase === "idle" || ts.phase === "page-fade-in") {
      setVisible(true);
      return;
    }

    // Coming via card click: wait for "expanded" phase
    const unsub = transitionStore.subscribe(() => {
      const s = transitionStore.getState();
      if (s.phase === "expanded") {
        requestAnimationFrame(() => showContentAndRequestOverlayFade());
      }
    });

    // Already expanded by the time this effect runs
    if (ts.phase === "expanded") {
      requestAnimationFrame(() => showContentAndRequestOverlayFade());
    }

    return unsub;
  }, [hasContent, showContentAndRequestOverlayFade]);

  // Lock body scroll only while a transition is active
  useEffect(() => {
    const syncBodyScrollLock = () => {
      const ts = transitionStore.getState();
      const shouldLock = ts.phase !== "idle" && ts.phase !== "page-fade-in";
      document.body.classList.toggle("is-transitioning", shouldLock);
    };
    syncBodyScrollLock();
    const unsub = transitionStore.subscribe(syncBodyScrollLock);
    return () => {
      unsub();
      document.body.classList.remove("is-transitioning");
    };
  }, []);

  // ── Back navigation ───────────────────────────────────────────────────────
  const handleBack = useCallback(async () => {
    if (isLeaving) return;
    setIsLeaving(true);

    // Step 1: fade out page content
    setVisible(false);

    // Wait for fade-out (400ms matches exit transition on the page shell)
    await new Promise((r) => setTimeout(r, 400));

    // Step 2: hand off to overlay to shrink back
    const storedRect = transitionStore.getState().rect;

    const collapseRect = storedRect ?? {
      top: 100,
      left: 80,
      width: Math.min(window.innerWidth * 0.65, 800),
      height: 520,
    };

    const collapse = (window as any).__portfolioCollapse;
    if (typeof collapse === "function") {
      await collapse(collapseRect);
    }

    setIsLeaving(false);
  }, [isLeaving]);

  // Handle browser back button
  useEffect(() => {
    const onPopState = () => handleBack();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [handleBack]);

  return { visible, isLeaving, handleBack };
}
