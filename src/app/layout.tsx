import { HoverTopNav } from "@/components/HoverTopNav";
import { AmbientBackground } from "@/components/motion/AmbientBackground";
import { MotionProvider } from "@/components/motion/MotionProvider";
import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Old_Mincho } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const display = Zen_Old_Mincho({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ORIGINAL CHARACTER ARCHIVE",
    template: "%s — CHARACTER ARCHIVE",
  },
  description: "オリジナルキャラクターの公式紹介サイト。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans font-light">
        <MotionProvider>
          <AmbientBackground />
          <HoverTopNav />
          <div className="relative z-10">{children}</div>
        </MotionProvider>
      </body>
    </html>
  );
}
