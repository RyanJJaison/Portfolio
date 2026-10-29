import type { Metadata } from "next";
import { Source_Serif_4, Young_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { profile } from "@/content/profile";

const display = Young_Serif({ variable: "--font-display", subsets: ["latin"], weight: "400" });
const text = Source_Serif_4({ variable: "--font-text", subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: { default: `${profile.name} | AI/ML Portfolio`, template: `%s | ${profile.name}` },
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/* Lets entrance styles hide content only when a script is there to show it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-3 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Nav />
        <div id="main" className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
