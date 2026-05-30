"use client";

import { domMax, LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * framer-motion を軽量化するためのプロバイダ。
 * 重い `motion` の代わりに軽量な `m` を使い、必要な機能だけを読み込む。
 * `domMax` を指定することでレイアウトアニメーション（layoutId 等）も維持される。
 * strict にすることで、誤って重い `motion` を使うとエラーで気付ける。
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
