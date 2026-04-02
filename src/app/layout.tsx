import type { Metadata, Viewport } from "next";
import { Archivo_Black, Instrument_Serif } from "next/font/google";
import "./globals.css";

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const siteUrl = "https://vibe-check-engine.vercel.app";
const siteTitle = "Vibe Check Engine — Go Viral or Go Home";
const siteDescription =
  "Drop your idea. Get content that actually slaps. Vibe Check Engine generates viral posts, captions, and hooks powered by AI — built for creators who don't have time to be mid.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // ── Core ──────────────────────────────────────────────────────────────────
  title: {
    default: siteTitle,
    template: "%s | Vibe Check Engine",
  },
  description: siteDescription,
  keywords: [
    "viral content generator",
    "AI caption generator",
    "social media post generator",
    "viral hooks AI",
    "TikTok caption generator",
    "Instagram caption AI",
    "content creation tool",
    "vibe check engine",
  ],
  authors: [{ name: "Vibe Check Engine", url: siteUrl }],
  creator: "Vibe Check Engine",
  publisher: "Vibe Check Engine",

  // ── Google Site Verification ───────────────────────────────────────────────
  verification: {
    google: "kC-kuA97R9ZCDpar9AAtq0--uVgzRJC1K5YDWPTMeEc",
  },

  // ── Canonical / Alternates ────────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Vibe Check Engine",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vibe Check Engine — Go Viral or Go Home",
        type: "image/png",
      },
    ],
    locale: "en_US",
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
    // creator: "@yourhandle",   // ← add your Twitter handle here
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  // ── Web App Manifest ──────────────────────────────────────────────────────
  manifest: "/manifest.json",

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} dark`}>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {/* Simplified background stack to prevent layout shifting crashes */}
        <div className="fixed inset-0 z-0 bg-black" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
