import type { Metadata, Viewport } from "next";
import { Host_Grotesk, Noto_Sans_Arabic } from "next/font/google";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-host",
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
    icon: "/logo.jpg"
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
    <html lang="en" className={`${hostGrotesk.variable} ${notoSansArabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
