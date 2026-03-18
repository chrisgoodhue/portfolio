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

function resolveCssVarToPx(varName: string) {
  // Web Animations are much more consistent when we animate computed
  // absolute lengths (e.g. "16px") instead of token values (e.g. "1rem").
  const dummy = document.createElement("div");
  dummy.style.position = "absolute";
  dummy.style.visibility = "hidden";
  dummy.style.borderRadius = `var(${varName})`;
  document.body.appendChild(dummy);
  const computed = getComputedStyle(dummy).borderRadius;
  dummy.remove();
  return computed?.trim() || "0px";
}

function parseHexColor(input: string): { r: number; g: number; b: number } | null {
  const hex = input.trim();
  const match = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(hex);
  if (!match) return null;

  let value = match[1].toLowerCase();
  if (value.length === 3) {
    value = `${value[0]}${value[0]}${value[1]}${value[1]}${value[2]}${value[2]}`;
  }

  const intVal = parseInt(value, 16);
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255,
  };
}

function getContrastingStroke(themeColor: string) {
  // Makes the border-radius tween perceivable even if overlay and body
  // share the same background color during the transition.
  const rgb = parseHexColor(themeColor);
  if (!rgb) return "rgba(0,0,0,0.12)";

  // Relative luminance (sRGB)
  const srgb = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  const luminance = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];

  return luminance > 0.55 ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.22)";
}

export function TransitionOverlay() {
  const router = useRouter();
  const [ts, setTs] = useState<TransitionState>(transitionStore.getState());
  const overlayRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const expandSeqRef = useRef(0);
  const watchdogRef = useRef<number | null>(null);

  useEffect(() => {
    return transitionStore.subscribe(() => {
      const next = transitionStore.getState();
      setTs({ ...next });
      // Fade only when still on case study page; skip if user already started collapse (shrinking)
      if (next.overlayFadeRequested && next.phase === "page-fade-in") {
        const el = overlayRef.current;
        if (!el || el.style.display === "none") return;
        const fadeRequestId = next.requestId;
        el.style.pointerEvents = "none";
        el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: OVERLAY_FADEOUT_MS,
          easing: "ease-out",
          fill: "forwards",
        }).finished.then(() => {
          // Only clear if this fade request is still the latest.
          transitionStore.ackOverlayFadeOut(fadeRequestId);
          // Don't hide if user already started collapse (back) — avoids hiding overlay during shrink
          const now = transitionStore.getState();
          // Hide only when we're actually in the "page shown" phase.
          // This prevents the overlay from blocking interactions during an in-progress expand/collapse.
          if (now.phase !== "page-fade-in") return;
          el.style.display = "none";
          el.style.opacity = "1";
          document.body.style.backgroundColor = "";
        });
      }
    });
  }, []);

  // Safety valve: if we ever return to idle, ensure the overlay can't block UI.
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (ts.phase === "idle") {
      el.style.display = "none";
      el.style.opacity = "1";
      document.body.style.backgroundColor = "";
    }
  }, [ts.phase]);

  // Watchdog: if a transition gets stuck (e.g. rapid double-clicks),
  // force-reset after a reasonable timeout so cards remain clickable.
  useEffect(() => {
    const clear = () => {
      if (watchdogRef.current != null) window.clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    };

    clear();
    if (ts.phase === "idle") return;

    const requestIdAtStart = ts.requestId;
    const phaseAtStart = ts.phase;

    watchdogRef.current = window.setTimeout(() => {
      const now = transitionStore.getState();
      // Only reset if nothing has progressed.
      if (now.phase !== "idle" && now.requestId === requestIdAtStart && now.phase === phaseAtStart) {
        const el = overlayRef.current;
        if (el) {
          el.style.display = "none";
          el.style.opacity = "1";
        }
        document.body.style.backgroundColor = "";
        transitionStore.reset();
      }
    }, 4000);

    return clear;
  }, [ts.phase, ts.requestId]);

  // ── EXPAND ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (ts.phase !== "content-fade-out" || !ts.rect) return;
    animatingRef.current = true;

    const myRequestId = ts.requestId;
    const seq = (expandSeqRef.current += 1);
    const mySeq = seq;

    const el = overlayRef.current;
    if (!el) return;

    const startRadius = resolveCssVarToPx("--radius-xl");
    const endRadius = "0px";
    const stroke = getContrastingStroke(ts.color);

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
      border-radius: ${startRadius};
      border-top-left-radius: ${startRadius};
      border-top-right-radius: ${startRadius};
      border-bottom-left-radius: ${startRadius};
      border-bottom-right-radius: ${startRadius};
      box-shadow: 0 0 0 1px ${stroke} inset;
      overflow: hidden;
      z-index: 9999;
      display: block;
      pointer-events: none;
      opacity: 1;
    `;
    // Match body to overlay so when overlay fades we never reveal white/paper
    document.body.style.backgroundColor = ts.color;

    const timer = setTimeout(async () => {
      // If another navigation started, bail out so we don't "double push".
      if (transitionStore.getState().requestId !== myRequestId) return;
      if (seq !== expandSeqRef.current) return;

      transitionStore.setPhase("expanding");
      document.body.classList.add("is-transitioning");

      await el
        .animate(
          [
            {
              top: `${top}px`,
              left: `${left}px`,
              width: `${width}px`,
              height: `${height}px`,
              borderRadius: startRadius,
              borderTopLeftRadius: startRadius,
              borderTopRightRadius: startRadius,
              borderBottomLeftRadius: startRadius,
              borderBottomRightRadius: startRadius,
            },
            {
              top: "0",
              left: "0",
              width: `${vw}px`,
              height: `${vh}px`,
              borderRadius: endRadius,
              borderTopLeftRadius: endRadius,
              borderTopRightRadius: endRadius,
              borderBottomLeftRadius: endRadius,
              borderBottomRightRadius: endRadius,
            },
          ],
          { duration: EXPAND_MS, easing: EXPAND_EASING, fill: "forwards" }
        )
        .finished;

      // Stale request guard
      if (transitionStore.getState().requestId !== myRequestId) return;
      if (seq !== expandSeqRef.current) return;

      el.style.top = "0";
      el.style.left = "0";
      el.style.width = "100vw";
      el.style.height = "100vh";
      el.style.borderRadius = endRadius;
      el.style.borderTopLeftRadius = endRadius;
      el.style.borderTopRightRadius = endRadius;
      el.style.borderBottomLeftRadius = endRadius;
      el.style.borderBottomRightRadius = endRadius;

      transitionStore.setPhase("expanded");
      const currentSlug = transitionStore.getState().slug;
      if (currentSlug === "about") {
        router.push("/about");
      } else {
        router.push(`/case-studies/${currentSlug}`);
      }
      document.body.classList.remove("is-transitioning");
      animatingRef.current = false;
    }, 120);

    return () => {
      // This effect re-runs when we advance phases ("content-fade-out" ->
      // "expanding" -> "expanded"). We *only* want to cancel if a new
      // navigation request superseded this one.
      const now = transitionStore.getState();
      const isStaleRequest = now.requestId !== myRequestId || expandSeqRef.current !== mySeq;
      if (!isStaleRequest) return;

      clearTimeout(timer);
      // Hard cancel any in-flight animations so quick clicks don't cause flashes.
      el.getAnimations().forEach((a) => a.cancel());
      // Hide immediately if we’re restarting/aborting so we don’t leave a
      // “half expanded” colored container sitting on top of the UI.
      el.style.display = "none";
      el.style.opacity = "1";
      document.body.style.backgroundColor = "";
      animatingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ts.phase, ts.rect, ts.color, ts.slug, ts.requestId]);

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

      let prevScrollRestoration: ScrollRestoration | null = null;
      try {
        const storedScrollY = transitionStore.getState().scrollY ?? 0;
        prevScrollRestoration = window.history.scrollRestoration;
        // Prevent Next.js from overriding our manual scroll restore during the transition.
        window.history.scrollRestoration = "manual";

        el.getAnimations().forEach((a) => a.cancel());

        const color = transitionStore.getState().color;
        const endRadius = resolveCssVarToPx("--radius-xl");
        const stroke = getContrastingStroke(color);

        el.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: ${color};
          border-radius: 0px;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
          box-shadow: 0 0 0 1px ${stroke} inset;
          overflow: hidden;
          z-index: 9999;
          display: block;
          pointer-events: none;
          opacity: 1;
        `;

        transitionStore.setPhase("shrinking");
        document.body.classList.add("is-transitioning");

        router.push("/");
        // Wait a tick for the homepage to mount, then restore scroll so the
        // shrink animation lands on the correct card (especially if it was below the fold).
        await new Promise((r) => setTimeout(r, 0));
        window.scrollTo(0, storedScrollY);
        document.documentElement.scrollTop = storedScrollY;
        document.body.scrollTop = storedScrollY;
        await new Promise((r) => setTimeout(r, 50));

        await el.animate(
          [
            {
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              borderRadius: "0px",
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px",
            },
            {
              top: `${rect.top}px`,
              left: `${rect.left}px`,
              width: `${rect.width}px`,
              height: `${rect.height}px`,
              borderRadius: endRadius,
              borderTopLeftRadius: endRadius,
              borderTopRightRadius: endRadius,
              borderBottomLeftRadius: endRadius,
              borderBottomRightRadius: endRadius,
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
        // Always restore scroll behavior even if the transition aborts.
        try {
          if (prevScrollRestoration) window.history.scrollRestoration = prevScrollRestoration;
        } catch {
          // ignore
        }
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
