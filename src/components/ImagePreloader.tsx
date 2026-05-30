"use client";

import { isRemoteImage } from "@/lib/image";
import Image from "next/image";

/**
 * 指定した画像をオフスクリーンで先読みしておくためのコンポーネント。
 * HomeHero / TOP の背景と同じ next/image 設定（fill + sizes="100vw" + 最適化ON/OFFの判定）で
 * 読み込むため、実際の表示時はブラウザ／画像最適化のキャッシュから即座に表示される。
 *
 * 見た目には一切影響しない（1px の不可視領域で読み込むだけ）。
 */
export function ImagePreloader({ srcs }: { srcs: string[] }) {
  if (srcs.length === 0) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-50 h-px w-px overflow-hidden opacity-0"
    >
      {srcs.map((src) => (
        <div key={src} className="relative h-px w-px">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            unoptimized={isRemoteImage(src)}
          />
        </div>
      ))}
    </div>
  );
}
