"use client";
// components/TransitionOverlay.tsx
//
// Lives in the root layout — persists across ALL route changes.
// Controls the colored container that expands/contracts between
// card and fullscreen during navigation.
//
// Phases (expand):
//   idle → content-fade-out → expanding → expanded → page-fade-in
//
// Phases (collapse):
//   page-fade-in → shrinking → content-fade-in → idle

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { transitionStore, type TransitionState } from "@/lib/transition-store";

const EXPAND_EASING = "cubic-bezier(0.76, 0, 0.24, 1)";
const EXPAND_MS = 560;
const SHRINK_MS = 500;
const OVERLAY_FADEOUT_MS = 350;

export function TransitionOverlay() {
  const router = useRouter();
  const [ts, setTs] = useState<TransitionState>(transitionStore.getState());
  const overlayRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    return transitionStore.subscribe(() => {
      const next = transitionStore.getState();
      setTs({ ...next });
      // Fade only when still on case study page; skip if user already started collapse (shrinking)
      if (next.overlayFadeRequested && next.phase === "page-fade-in") {
        const el = overlayRef.current;
        if (!el || el.style.display === "none") return;
        el.style.pointerEvents = "none";
        el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: OVERLAY_FADEOUT_MS,
          easing: "ease-out",
          fill: "forwards",
        }).finished.then(() => {
          // Don't hide if user already started collapse (back) — avoids hiding overlay during shrink
          const now = transitionStore.getState();
          if (now.phase === "shrinking" || now.phase === "content-fade-in") return;
          el.style.display = "none";
          el.style.opacity = "1";
          document.body.style.backgroundColor = "";
        });
      }
    });
  }, []);

  // ── EXPAND ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (ts.phase !== "content-fade-out" || !ts.rect) return;
    if (animatingRef.current) return;
    animatingRef.current = true;

    const el = overlayRef.current;
    if (!el) return;

    // Clear any previous fade animation so the overlay is visible for scale
    el.getAnimations().forEach((a) => a.cancel());

    const { top, left, width, height } = ts.rect;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    el.style.cssText = `
      position: fixed;
      top: ${top}px;
      left: ${left}px;
      width: ${width}px;
      height: ${height}px;
      background-color: ${ts.color};
      z-index: 9999;
      display: block;
      pointer-events: all;
      opacity: 1;
    `;
    // Match body to overlay so when overlay fades we never reveal white/paper
    document.body.style.backgroundColor = ts.color;

    const timer = setTimeout(async () => {
      transitionStore.setPhase("expanding");
      document.body.classList.add("is-transitioning");

      await el.animate(
        [
          { top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px` },
          { top: "0px", left: "0px", width: `${vw}px`, height: `${vh}px` },
        ],
        { duration: EXPAND_MS, easing: EXPAND_EASING, fill: "forwards" }
      ).finished;

      el.style.top = "0px";
      el.style.left = "0px";
      el.style.width = "100vw";
      el.style.height = "100vh";

      transitionStore.setPhase("expanded");
      if (ts.slug === "about") {
        router.push("/about");
      } else {
        router.push(`/case-studies/${ts.slug}`);
      }
      document.body.classList.remove("is-transitioning");
      animatingRef.current = false;
    }, 200);

    return () => {
      clearTimeout(timer);
      animatingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ts.phase]);

  // ── COLLAPSE ─────────────────────────────────────────────────────────────
  const collapse = useCallback(
    async (rect: { top: number; left: number; width: number; height: number }) => {
      if (animatingRef.current) return;
      animatingRef.current = true;

      const el = overlayRef.current;
      if (!el) {
        animatingRef.current = false;
        return;
      }

      try {
        el.getAnimations().forEach((a) => a.cancel());

        const color = transitionStore.getState().color;

        el.style.cssText = `
          position: fixed;
          top: 0px;
          left: 0px;
          width: 100vw;
          height: 100vh;
          background-color: ${color};
          z-index: 9999;
          display: block;
          pointer-events: all;
          opacity: 1;
        `;

        transitionStore.setPhase("shrinking");
        document.body.classList.add("is-transitioning");

        router.push("/");
        await new Promise((r) => setTimeout(r, 100));

        await el.animate(
          [
            { top: "0px", left: "0px", width: "100vw", height: "100vh" },
            {
              top: `${rect.top}px`,
              left: `${rect.left}px`,
              width: `${rect.width}px`,
              height: `${rect.height}px`,
            },
          ],
          { duration: SHRINK_MS, easing: EXPAND_EASING, fill: "forwards" }
        ).finished;

        transitionStore.setPhase("content-fade-in");
        document.body.classList.remove("is-transitioning");

        await new Promise((r) => setTimeout(r, 380));
        el.style.display = "none";
        document.body.style.backgroundColor = "";
        transitionStore.reset();
      } finally {
        animatingRef.current = false;
      }
    },
    [router]
  );

  useEffect(() => {
    (window as any).__portfolioCollapse = collapse;
    return () => {
      delete (window as any).__portfolioCollapse;
    };
  }, [collapse]);

  return (
    <div
      ref={overlayRef}
      style={{ display: "none", position: "fixed", zIndex: 9999 }}
      aria-hidden="true"
    />
  );
}
