import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Toaster } from 'sonner';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

export const metadata: Metadata = {
  title: {
    default: "BONBURL | Minimalist Luxury Handbags",
    template: "%s | BONBURL"
  },
  description: "BONBURL offers exquisite minimalist luxury handbags for the modern woman. Discover our collection of premium leather bags. Join our distributor network today.",
  keywords: ["Handbags", "Women's Bags", "Luxury Bags", "Minimalist Bags", "Bag Reseller", "Bag Distributor", "Indonesia Handbags", "女包", "女包分销", "奢侈品女包"],
  openGraph: {
    title: "BONBURL | Minimalist Luxury Handbags",
    description: "Discover timeless elegance with BONBURL's minimalist luxury handbags. Crafted for the modern woman.",
    type: "website",
    siteName: "BONBURL",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsTracker />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
