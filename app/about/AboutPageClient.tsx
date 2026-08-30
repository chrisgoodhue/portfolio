"use client";
// Handles overlay transition: request fade when mounted from card, back button triggers collapse.

import { useEffect, useRef } from "react";
import Image from "next/image";
import { transitionStore } from "@/lib/transition-store";

const timeline = [
  { year: "2026-Present", role: "Staff Product Designer, Seller Systems", company: "Stripe" },
  { year: "2016-2026", role: "Principal Product Designer", company: "Vimeo" },
  { year: "2016", role: "Senior Product Designer", company: "PayPal" },
  { year: "2015-2016", role: "Senior Product Designer", company: "American Express" },
  { year: "2008-2015", role: "Senior Designer", company: "Brooklyn United" },
];

const capabilities = [
  "Design Direction",
  "Design Systems",
  "Product Strategy & Ideation",
  "Design Leadership & Mentorship",
  "User Research",
  "Interaction & Visual Design",
  "Prototyping",
  "Cross-functional Collaboration",
];

// Bio broken into numbered chapters instead of one flowing block — mirrors
// the eyebrow-numbering already used on the case study Metrics sections
// (see components/case-study/Metrics.tsx), so this page picks up a device
// the rest of the site already established instead of inventing a new one.
const chapters = [
  {
    number: "01",
    title: "A Designer, Half My Life",
    paragraphs: [
      "I've been a designer for half my life. The shape of it keeps repeating: find the part of the product that's quietly turned into a mess, usually a handful of surfaces all solving the same problem differently, and build the system underneath it sturdy enough to outlast the team that built it. A decade of that at Vimeo is the best evidence I have. A piece of what I shipped there got picked up by a completely different team, with no connection to the original effort, two years after that team disbanded. Before Vimeo, I did a shorter stint in fintech at PayPal and American Express.",
    ],
  },
  {
    number: "02",
    title: "Where It Started",
    paragraphs: [
      "I come from a graphic design background, and it all started at a small digital agency in Brooklyn, where I became the designer I am today, making quality and craft central to everything I do. (Actually, it all started designing websites and flyers for pop punk bands in high school.)",
    ],
  },
  {
    number: "03",
    title: "These Days",
    paragraphs: [
      "These days I lead design for Seller Systems at Stripe: the tools our account executives use to create, configure, and get deals approved for Stripe's customers. It's the same kind of problem that's always pulled me in, a workflow with too many steps and too many handoffs, just aimed at our own sales team instead of the public.",
    ],
  },
  {
    number: "04",
    title: "Off The Clock",
    paragraphs: [
      "I'm a Massachusetts native, a former Brooklynite, and now live in Miami (for the in-laws, not the looksmaxxing) with my family: my brilliant daughters, Ruby and Rosie; my talented designer/illustrator wife, Liz; and Boo, our giant goldendoodle who thinks he's a lap dog.",
      "I love listening to music and playing easy Bob Dylan songs on guitar. I love watching movies too, though these days it's mostly Disney originals on repeat, and honestly, I'm not mad about it.",
    ],
  },
];

const contactLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chrisgoodhue/" },
  { label: "Working Not Working", href: "https://www.workingnotworking.com/chrisgoodhue" },
  { label: "Behance", href: "https://www.behance.net/chrisgoodhue" },
];

export function AboutPageClient() {
  const fadeRequestedRef = useRef(false);

  useEffect(() => {
    const ts = transitionStore.getState();
    if (ts.phase === "expanded" || ts.phase === "page-fade-in") {
      transitionStore.setPhase("page-fade-in");
      if (fadeRequestedRef.current) return;

      const currentRequestId = transitionStore.getState().requestId;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (fadeRequestedRef.current) return;
          fadeRequestedRef.current = true;
          transitionStore.requestOverlayFadeOut(currentRequestId);
        });
      });
    }
  }, []);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--color-paper)" }}>
      <div className="flex flex-col lg:flex-row" style={{ gap: "var(--space-4)", paddingLeft: "var(--space-4)" }}>
        {/* Photo — same inset as the homepage's cards (CardGrid's
            var(--space-4) padding), not true edge-to-edge. Sticky + inset
            top/bottom at lg+, so it stays put for the entire page (bio,
            Experience, Capabilities, Contact) while the right column
            scrolls past it. */}
        <div
          className="w-full lg:w-1/2 lg:sticky lg:top-[var(--space-4)] lg:h-[calc(100vh_-_(var(--space-4)*2))]"
          style={{
            aspectRatio: "1200 / 1791",
            backgroundColor: "var(--color-ink)",
            overflow: "hidden",
            borderRadius: "var(--radius-2xl)",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src="/images/chris-headshot.jpg"
              alt="Chris Goodhue"
              fill
              sizes="(min-width: 64rem) 50vw, 100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        {/* Everything else — the other half, scrolling normally */}
        <div className="w-full lg:w-1/2" style={{ paddingLeft: "var(--space-10)", paddingRight: "var(--space-10)" }}>
          <div className="pt-10 lg:pt-[calc(4.5rem_+_var(--space-10))]">
            <h1
              className="text-display mb-12"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.95 }}
            >
              Chris<br />
              <span style={{ opacity: 0.5 }}>Goodhue</span>
            </h1>

            {chapters.map((chapter) => (
              <div key={chapter.number} className="mb-14">
                <p className="text-label mb-3" style={{ color: "var(--color-muted)" }}>
                  {chapter.number}
                </p>
                <h2
                  className="text-display mb-4"
                  // Body font: a chapter subheading, not the page's own
                  // title (that's "Chris Goodhue" above) or a quote.
                  style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                >
                  {chapter.title}
                </h2>
                {chapter.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="leading-relaxed"
                    style={{
                      fontSize: "var(--text-body)",
                      color: "var(--color-ink)",
                      opacity: 0.7,
                      marginTop: i > 0 ? "1rem" : 0,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-10)", paddingBottom: "var(--space-10)" }}>
            <p className="text-label mb-6" style={{ color: "var(--color-muted)" }}>
              Experience
            </p>
            {timeline.map((item, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between py-5"
                style={{
                  borderBottom: i < timeline.length - 1 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <div>
                  <p className="text-display" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
                    {item.company}
                  </p>
                  <p className="text-label mt-1" style={{ color: "var(--color-muted)" }}>
                    {item.role}
                  </p>
                </div>
                <p className="text-label" style={{ color: "var(--color-muted)" }}>
                  {item.year}
                </p>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-10)", paddingBottom: "var(--space-10)" }}>
            <p className="text-label mb-6" style={{ color: "var(--color-muted)" }}>
              Capabilities
            </p>
            <div className="flex flex-wrap gap-3">
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className="text-label"
                  style={{
                    border: "1px solid var(--color-border)",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--color-ink)",
                  }}
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-10)", paddingBottom: "var(--space-13)" }}>
            <p className="text-label mb-6" style={{ color: "var(--color-muted)" }}>
              Contact
            </p>
            <a
              href="mailto:christopher.goodhue@gmail.com"
              className="text-display"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                display: "inline-block",
                borderBottom: "2px solid var(--color-ink)",
                paddingBottom: "0.25rem",
              }}
            >
              christopher.goodhue@gmail.com
            </a>

            <div className="mt-8 flex flex-wrap gap-6">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label"
                  style={{ color: "var(--color-muted)" }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
