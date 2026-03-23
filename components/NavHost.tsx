"use client";

import { usePathname } from "next/navigation";
import { Nav } from "./Nav";
import type { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { transitionStore } from "@/lib/transition-store";

export function NavHost({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showNav = pathname !== "/";

  const prevPathnameRef = useRef<string | null>(null);

  // Only animate when entering a non-home page from the homepage.
  // For in-site navigation (case study <-> case study, about <-> case study), keep it static.
  const animateFromTop = prevPathnameRef.current === "/" && pathname !== "/";

  useEffect(() => {
    prevPathnameRef.current = pathname;
  }, [pathname]);

  // Navigating home via <Link> / router doesn't run overlay collapse(), so the store can
  // stay in "page-fade-in" and block card clicks. Reset when we land on `/` with that stale phase.
  useEffect(() => {
    if (pathname !== "/") return;
    if (transitionStore.getState().phase === "page-fade-in") {
      transitionStore.reset();
    }
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {showNav && <Nav animateFromTop={animateFromTop} />}
      </AnimatePresence>
      {children}
    </>
  );
}

