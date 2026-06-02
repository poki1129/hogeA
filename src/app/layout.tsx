import { HoverTopNav } from "@/components/HoverTopNav";
import { SiteFooter } from "@/components/SiteFooter";
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

const SITE_NAME = "OFFICIAL LOUNGE ARCHIVE";
const SITE_DESCRIPTION = "世界観と造形美を静かに提示する公式アーカイブ。";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: SITE_NAME,
    template: "%s — OFFICIAL LOUNGE",
  },
  description: SITE_DESCRIPTION,
  applicationName: "OFFICIAL LOUNGE",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "OFFICIAL LOUNGE",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans font-light">
        <MotionProvider>
          <AmbientBackground />
          <HoverTopNav />
          <div className="relative z-10">{children}</div>
          <SiteFooter />
          {/* 全面に薄く重ねるフィルムグレイン（質感の上乗せ・操作は透過） */}
          <div aria-hidden className="grain pointer-events-none fixed inset-0 z-30" />
        </MotionProvider>
      </body>
    </html>
  );
}
