import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** レスポンスから X-Powered-By: Next.js を付与しない */
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  /**
   * 巨大な原画を next/image がリサイズする際、デフォルト 7 秒でタイムアウトすることがあります。
   * それでも出ない場合は画像を縮小するか、`Image` に `unoptimized` を付ける方法もあります。
   */
  experimental: {
    imgOptTimeoutInSeconds: 30,
  },
  images: {
    /** モダン形式で軽量配信（ローカル画像の最適化時に AVIF/WebP を優先） */
    formats: ["image/avif", "image/webp"],
    /**
     * 背景画像を 2560x1440 で固定運用するため、2560 の生成サイズを追加。
     * 大画面でちょうどのサイズを配信でき、無駄な拡大やオーバーサイズを防げる。
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    /** プレースホルダー（自前の SVG）を表示できるように許可 */
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    /**
     * デモ用に Unsplash を許可しています。
     * ローカル画像のみにする場合はこの remotePatterns を削除し、
     * `src/data/characters.ts` の URL を `/images/characters/...` に差し替えてください。
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
