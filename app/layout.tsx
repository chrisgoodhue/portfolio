// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { TransitionOverlay } from "@/components/TransitionOverlay";

export const metadata: Metadata = {
  title: "Portfolio — Principal Product Designer",
  description: "Selected work in product design, systems, and experience design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* The overlay lives outside the page tree so it persists across routes */}
        <TransitionOverlay />
        {children}
      </body>
    </html>
  );
}
