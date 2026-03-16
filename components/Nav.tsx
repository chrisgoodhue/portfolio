"use client";
// components/Nav.tsx
import Link from "next/link";
import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
        // Transparent — sits above the card grid
      }}
    >
      <span
        className="text-label"
        style={{ color: "var(--color-ink)", opacity: 0.5 }}
      >
        Portfolio
      </span>

      <nav style={{ display: "flex", gap: "var(--space-10)", alignItems: "center" }}>
        <Link
          href="/components"
          className="text-label"
          style={{ color: "var(--color-ink)", opacity: 0.5 }}
        >
          Components
        </Link>
        <Link
          href="/about"
          className="text-label"
          style={{ color: "var(--color-ink)", opacity: 0.5 }}
        >
          About
        </Link>
        <a
          href="mailto:hello@yourname.com"
          className="text-label"
          style={{ color: "var(--color-ink)", opacity: 0.5 }}
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
