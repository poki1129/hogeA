import { PageFade } from "@/components/PageFade";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABOUT",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen-safe pb-24 pt-28 text-mist md:pt-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <PageFade>
          <p className="flex items-center gap-3 text-[10px] font-light tracking-[0.55em] text-white/40">
            <span className="h-px w-8 bg-white/30" />
            CONCEPT
          </p>
          <h1 className="mt-4 font-display text-3xl font-normal tracking-[0.18em] md:text-4xl">
            <span className="text-gradient">ABOUT</span>
          </h1>
          <div className="mt-12 space-y-8 text-sm font-extralight leading-[2] tracking-wide text-white/65">
            <p>
              本サイトは、オリジナルキャラクターの世界観と造形美を静かに提示することを目的としたアーカイブです。公式ブランドサイトのような余白と階調で、ビジュアルを主役に据えています。
            </p>
            <p>
              キャラクター情報・画像はすべてデータ駆動で管理されているため、差し替えや追加が容易です。展示会や同人誌、フィギュア企画など、様々な用途のハブとしてご利用ください。
            </p>
            <p className="text-white/45">
              ※ 掲載内容・画像はデモ用の仮データです。実運用時は `src/data/characters.ts` および `public/images/characters/` を編集してください。
            </p>
          </div>
        </PageFade>
      </div>
    </main>
  );
}
