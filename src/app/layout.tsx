import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/Providers/Providers/Providers";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration/ServiceWorkerRegistration";
import { SITE_URL, EXTERNAL_LINKS } from "@/constants/links";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────
  title: {
    default: "Kamal Mohamed Sorour — Frontend Developer",
    template: "%s | Kamal Mohamed Sorour",
  },
  description:
    "Professional portfolio of Kamal Mohamed Sorour — a Frontend Developer specializing in React, Next.js, TypeScript, and modern UI technologies. Available for freelance and full-time opportunities.",
  keywords: [
    "Kamal Mohamed Sorour",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Developer",
    "UI Developer",
    "Tailwind CSS",
    "Portfolio",
    "Egypt Developer",
    "مطور ويب",
    "كمال محمد سرور",
  ],
  authors: [{ name: "Kamal Mohamed Sorour", url: SITE_URL }],
  creator: "Kamal Mohamed Sorour",
  publisher: "Kamal Mohamed Sorour",

  // ── Canonical & Alternates ────────────────────────
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },

  // ── Open Graph ────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_EG",
    url: SITE_URL,
    siteName: "Kamal Mohamed Sorour — Portfolio",
    title: "Kamal Mohamed Sorour — Frontend Developer",
    description:
      "Explore the professional portfolio of Kamal Mohamed Sorour. Frontend Developer creating modern, pixel-perfect web applications with React, Next.js, and TypeScript.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kamal Mohamed Sorour — Frontend Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  // ── Twitter Card ──────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Kamal Mohamed Sorour — Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, TypeScript & Tailwind CSS. View projects, skills, and get in touch.",
    images: ["/og-image.png"],
    creator: "@kamal_sorour",
  },

  // ── Robots (page-level reinforcement) ─────────────
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

  // ── Misc ──────────────────────────────────────────
  category: "technology",
  classification: "Portfolio",
};

// ── JSON-LD Structured Data ───────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kamal Mohamed Sorour",
  url: SITE_URL,
  jobTitle: "Frontend Developer",
  description:
    "Frontend Developer specializing in React, Next.js, TypeScript, and modern UI technologies.",
  sameAs: [
    EXTERNAL_LINKS.github,
    EXTERNAL_LINKS.linkedin,
    EXTERNAL_LINKS.facebook,
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML/CSS",
    "Framer Motion",
    "Figma",
    "Responsive Design",
  ],
  nationality: {
    "@type": "Country",
    name: "Egypt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* ── PWA Meta Tags ── */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Kamal Portfolio" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
      </head>
      <body className="min-h-full scroll-smooth" data-scroll-behavior="smooth">
        <ServiceWorkerRegistration />
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
