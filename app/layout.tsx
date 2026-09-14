import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { HouseAds } from "@/components/HouseAds";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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

export const metadata: Metadata = {
  title: {
    default: "Avenues",
    template: "%s · Avenues",
  },
  description: "A small house for dated notes and signed essays.",
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
      </body>
    </html>
  );
}
