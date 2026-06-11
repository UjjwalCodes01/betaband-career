import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { PWAInstaller } from "@/components/PWAInstaller";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#3D5476",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "BeatBand™ Careers | Join the Team",
  description:
    "Explore career opportunities at BeatBand™ — India's Bluetooth sleep headband brand. Join our growing team and help us redefine comfortable audio.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BeatBand Careers",
  },
  openGraph: {
    title: "BeatBand™ Careers",
    description: "Join the BeatBand team and help us redefine comfortable audio.",
    url: "https://career.beatband.in",
    siteName: "BeatBand Careers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <NavBar />
        <PWAInstaller />
        {children}
      </body>
    </html>
  );
}

