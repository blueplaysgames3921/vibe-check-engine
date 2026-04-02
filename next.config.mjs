/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent clickjacking
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Block MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Force HTTPS for 2 years, include subdomains
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Control referrer info sent to external sites
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disable browser features the app doesn't use
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Cross-origin isolation
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  // Content Security Policy
  // - Scripts: self + Next.js inline (unsafe-inline kept for Next hydration)
  // - Styles: self + Google Fonts + inline (required by Tailwind)
  // - Images: self + data URIs + Pollinations (AI-generated images)
  // - Fonts: self + Google Fonts
  // - Connect: self + Anthropic API + Pollinations API
  // - Everything else: self only
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://gen.pollinations.ai",
      "media-src 'self'",
      "connect-src 'self' https://api.anthropic.com https://gen.pollinations.ai",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig = {
  // Apply security headers to all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gen.pollinations.ai",
      },
    ],
    // Disallow SVG to prevent XSS via dangerouslyAllowSVG
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Strip X-Powered-By: Next.js header
  poweredByHeader: false,

  // Strict mode catches subtle React bugs early
  reactStrictMode: true,
};

export default nextConfig;
