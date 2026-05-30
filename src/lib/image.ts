/**
 * 画像 src が外部URL（http/https）かどうかを判定する。
 * - 外部URL: Next の最適化を通さず直接読み込む（開発時の遅延を避ける）
 * - ローカル(/...): Next の最適化を有効にする（AVIF/WebP で軽量配信。ローカルなので高速）
 */
export function isRemoteImage(src: string): boolean {
  return /^https?:\/\//i.test(src);
}
