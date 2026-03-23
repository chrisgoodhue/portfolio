// lib/nav-contrast.ts
// Pick light vs dark nav labels from the surface color behind the fixed header (case study heroes).

const INK = "#0A0A0A";
const PAPER = "#F8F7F4";

const HEX = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = HEX.exec(hex.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** WCAG relative luminance for sRGB hex, 0–1 */
export function getRelativeLuminance(hex: string): number | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const lin = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrastRatioLum(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Contrast ratio between two hex colors (WCAG). */
export function contrastRatio(hexA: string, hexB: string): number | null {
  const la = getRelativeLuminance(hexA);
  const lb = getRelativeLuminance(hexB);
  if (la == null || lb == null) return null;
  return contrastRatioLum(la, lb);
}

/**
 * When true, the fixed nav should use **light** foreground (paper-tinted text) on a dark hero.
 * When false, use **dark** foreground (ink) on a light hero / paper pages.
 *
 * Chooses whichever of ink or paper has the **higher** contrast ratio against `themeColorHex`.
 */
export function navShouldUseLightForeground(themeColorHex: string): boolean {
  const cInk = contrastRatio(themeColorHex, INK);
  const cPaper = contrastRatio(themeColorHex, PAPER);
  if (cInk == null || cPaper == null) return false;
  return cPaper > cInk;
}
