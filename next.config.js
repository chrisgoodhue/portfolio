/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // "Empowering Viewers with Video Engagement" was replaced by the
      // narrative-system case study "From Playback to Knowledge Discovery"
      // (see lib/case-studies.ts / lib/narrative-case-studies.ts) — keep
      // any existing links to the old URL working.
      {
        source: "/case-studies/vimeo-video-engagement",
        destination: "/case-studies/vimeo-knowledge-discovery",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
