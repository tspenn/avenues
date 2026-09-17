import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { HouseAds } from "@/components/HouseAds";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { DEFAULT_SHARE_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const description = "A small house for dated notes and signed essays.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: SITE_NAME,
    description,
    images: [{ url: DEFAULT_SHARE_IMAGE, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description,
    images: [DEFAULT_SHARE_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceSerif.variable}`}>
      <body className="flex min-h-screen flex-col bg-page font-sans text-ink antialiased">
        <SiteHeader />
        <div className="mx-auto flex w-full max-w-[65ch] flex-1 flex-col gap-12 px-6 py-12 lg:max-w-[calc(65ch+14rem+3rem)] lg:flex-row lg:items-start">
          <main className="min-w-0 flex-1 lg:max-w-[65ch]">{children}</main>
          <HouseAds />
        </div>
        <SiteFooter />
        <SiteAnalytics />
      </body>
    </html>
  );
}
