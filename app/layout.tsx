import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono, Instrument_Serif, Newsreader } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { profile } from "@/content/profile";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: ["normal", "italic"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `${profile.name} | AI/ML Portfolio`, template: `%s | ${profile.name}` },
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fonts = [geistSans, geistMono, newsreader, instrument, caveat].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={`${fonts} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="caps sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:px-3 focus:py-2">
          Skip to content
        </a>
        <Nav />
        <div id="main" className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
