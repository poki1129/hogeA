import { getAllGalleryImages } from "@/data/characters";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageFade } from "@/components/PageFade";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GALLERY",
};

export default function GalleryPage() {
  const items = getAllGalleryImages();
  return (
    <main className="min-h-screen-safe pb-24 pt-28 text-mist md:pt-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <PageFade className="mb-14 border-b border-white/[0.08] pb-10">
          <p className="flex items-center gap-3 text-[10px] font-light tracking-[0.55em] text-white/40">
            <span className="h-px w-8 bg-white/30" />
            VISUAL
          </p>
          <h1 className="mt-4 font-display text-3xl font-normal tracking-[0.2em] md:text-4xl">
            <span className="text-gradient">GALLERY</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm font-extralight leading-relaxed text-white/55">
            キャラクターごとのビジュアル抜粋。クリックで詳細ページへ移動できます。
          </p>
        </PageFade>
        <GalleryGrid items={items} />
      </div>
    </main>
  );
}
