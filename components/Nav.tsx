"use client";
// components/Nav.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState, type MouseEvent } from "react";
import { caseStudies } from "@/lib/case-studies";
import { navShouldUseLightForeground } from "@/lib/nav-contrast";
import { transitionStore } from "@/lib/transition-store";

export function Nav({ animateFromTop = false }: { animateFromTop?: boolean }) {
  const pathname = usePathname();
  const activeCaseSlug = useMemo(() => {
    const match = pathname.match(/^\/case-studies\/([^/]+)/);
    return match?.[1] ?? null;
  }, [pathname]);

  const activeCaseStudy = useMemo(() => {
    if (!activeCaseSlug) return null;
    return caseStudies.find((cs) => cs.slug === activeCaseSlug) ?? null;
  }, [activeCaseSlug]);

  /** Case study hero fills under the fixed nav — choose ink vs paper labels from contrast ratio. */
  const useLightNavText = useMemo(
    () => (activeCaseStudy ? navShouldUseLightForeground(activeCaseStudy.themeColor) : false),
    [activeCaseStudy],
  );

  const navLinkStyle = useMemo(
    () =>
      useLightNavText
        ? ({
            color: "rgba(248, 247, 244, 0.92)",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.45)",
          } as const)
        : ({
            color: "var(--color-ink)",
            opacity: 0.55,
          } as const),
    [useLightNavText],
  );

  const [workOpen, setWorkOpen] = useState(false);

  // Close dropdown on navigation.
  useEffect(() => {
    setWorkOpen(false);
  }, [pathname]);

  /** Same shrink-to-card animation as the in-page back control — used for Portfolio / Work → home. */
  const handleHomeNavigationClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") return;

      const rect = transitionStore.getState().rect;
      const collapse = (typeof window !== "undefined" && (window as unknown as { __portfolioCollapse?: unknown })
        .__portfolioCollapse) as
        | ((r: { top: number; left: number; width: number; height: number }) => Promise<void>)
        | undefined;

      if (rect && typeof collapse === "function") {
        e.preventDefault();
        void collapse(rect);
      }
    },
    [pathname],
  );

  return (
    <motion.header
      initial={animateFromTop ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: -20,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      transition={animateFromTop ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
      data-nav-contrast={useLightNavText ? "light-text" : "dark-text"}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-5) var(--space-4)",
        // Transparent — sits above page content; label color follows hero contrast
      }}
    >
      {/* Logo / site name */}
      <Link
        href="/"
        className="text-label"
        style={navLinkStyle}
        onClick={handleHomeNavigationClick}
      >
        Portfolio
      </Link>

      {/* Primary navigation */}
      <nav style={{ display: "flex", gap: "var(--space-10)", alignItems: "center" }}>
        <div
          style={{ position: "relative", display: "flex", alignItems: "center" }}
          onMouseEnter={() => setWorkOpen(true)}
          onMouseLeave={() => setWorkOpen(false)}
        >
          <Link
            href="/"
            className="text-label"
            style={navLinkStyle}
            onClick={handleHomeNavigationClick}
          >
            Work
          </Link>

          <AnimatePresence>
            {workOpen && (
              <motion.div
                key="work-dropdown"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "calc(100% + 0.5rem)",
                  right: 0,
                  minWidth: "22rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-paper)",
                  boxShadow: "0 18px 50px rgba(0,0,0,0.12)",
                  padding: "0.5rem",
                  zIndex: 60,
                }}
                role="menu"
                aria-label="Work menu"
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {caseStudies.map((cs) => {
                    const isActive = cs.slug === activeCaseSlug;
                    return (
                      <Link
                        key={cs.slug}
                        href={`/case-studies/${cs.slug}`}
                        role="menuitem"
                        className="text-label"
                        style={{
                          textAlign: "left",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "var(--radius-md)",
                          color: isActive ? "var(--color-ink)" : "var(--color-ink)",
                          opacity: isActive ? 1 : 0.65,
                          background: isActive ? "rgba(0,0,0,0.04)" : "transparent",
                          border: isActive ? "1px solid var(--color-border)" : "1px solid transparent",
                          transition: "opacity 0.15s ease, background 0.15s ease",
                        }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {cs.title}
                      </Link>
                    );
                  })}
                </div>

                {activeCaseStudy && (
                  <div
                    className="text-label"
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.35rem 0.75rem",
                      color: "var(--color-muted)",
                      opacity: 0.75,
                    }}
                  >
                    Viewing: {activeCaseStudy.title}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link href="/about" className="text-label" style={navLinkStyle}>
          About
        </Link>
        <Link href="/components" className="text-label" style={navLinkStyle}>
          Components
        </Link>
      </nav>
    </motion.header>
  );
}
