// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { TransitionOverlay } from "@/components/TransitionOverlay";
import { NavHost } from "@/components/NavHost";

// Self-hosted via next/font instead of the render-blocking @import that used
// to live in globals.css. That @import fetched fonts from Google on every
// load — the fallback font rendered first, then swapped once the real font
// arrived, reflowing text and visibly shifting the page down after paint
// (most noticeable on a hard refresh, when nothing's cached yet). next/font
// serves the files from this origin and generates a size-adjusted fallback
// so the swap doesn't change layout. Variable names match what globals.css
// and every component already reference via var(--font-display) etc., so
// nothing else needed to change.
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio - Principal Product Designer",
  description: "Selected work in product design, systems, and experience design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${dmSans.variable} ${dmMono.variable}`}>
        {/* The overlay lives outside the page tree so it persists across routes */}
        <TransitionOverlay />
        <NavHost>{children}</NavHost>
      </body>
    </html>
  );
}
