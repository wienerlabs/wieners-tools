import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Arabic, Space_Grotesk } from "next/font/google";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s · ${siteName}`
  },
  description: "Browser-native image toolkit. 100% client-side.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    siteName,
    type: "website"
  },
  twitter: {
    card: "summary_large_image"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${notoSansArabic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
