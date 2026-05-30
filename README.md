# Character Showcase Site

オリジナルキャラクター紹介サイト（Next.js + TypeScript + Tailwind CSS + Framer Motion）。全画面ビジュアルとデータ駆動のキャラクター管理を前提にしています。

**キャラ名・画像・文章の変え方が分からない場合は、まず [`キャラクター編集ガイド.md`](./キャラクター編集ガイド.md) を読んでください。**（フォルダ配置と `characters.ts` の対応表つき）

## 必要環境

- Node.js 20 以上推奨
- npm / pnpm / yarn のいずれか

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## スクリプト

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバー（Turbopack） |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動（`build` 後） |
| `npm run lint` | ESLint |

## ページ構成

| パス | 内容 |
| --- | --- |
| `/` | ランディングTOP（スケジュール・メモの右カラム＋下部キャラセレクト） |
| `/spotlight` | 展示モード（全画面背景・キャラ切替・DETAIL。`?id=` でキャラ指定） |
| `/characters` | キャラクター一覧 |
| `/characters/[id]` | キャラクター詳細（プロフィール・ギャラリー） |
| `/gallery` | 全キャラギャラリー抜粋 |
| `/about` | サイト説明 |
| `/contact` | 問い合わせ・リンク |

## 画像差し替え手順

1. 画像ファイルを `public/images/characters/` に置きます。推奨ファイル名の例:
   - `character01-bg.jpg` — トップ全画面背景
   - `character01-main.jpg` — 詳細ページのメイン立ち絵など
   - `character01-thumb.jpg` — 下部サムネ（省略時は背景画像を使用）
   - `character01-gallery-01.jpg`, `character01-gallery-02.jpg`, … — ギャラリー
2. `src/data/characters.ts` を開き、該当キャラクターの `imageBg` / `imageMain` / `imageThumb` / `gallery` の URL を **先頭が `/` のパス**に書き換えます。
   - 例: `imageBg: "/images/characters/character01-bg.jpg"`
3. 画像を **外部 URL からローカルだけ** に切り替える場合、`next.config.ts` の `images.remotePatterns` は不要になるため削除して問題ありません（`next/image` は同一オリジンの `/public` をそのまま最適化します）。

デモでは Unsplash の URL を使用しています。差し替え場所は `characters.ts` 先頭のブロックコメントにも記載しています。

## キャラクター追加手順

1. `public/images/characters/` に新キャラ用の画像を配置します（命名はプロジェクト内で統一すると管理しやすいです）。
2. `src/data/characters.ts` の `characters` 配列にオブジェクトを **1 件追加**します。
   - `id`: URL に使われます（例: `"04"` → `/characters/04`）。英数字推奨。
   - 必須フィールドは型定義 `Character` に従ってください。
3. 保存後、`npm run dev` を再起動する必要は通常ありません。`generateStaticParams` によりビルド時に静的ルートが生成されます。

## デプロイ方法

### Vercel（推奨）

1. GitHub 等にリポジトリを push します。
2. [Vercel](https://vercel.com/) にログインし、「New Project」からリポジトリをインポートします。
3. Framework Preset が **Next.js** と認識されることを確認し、Deploy を実行します。
4. 本番 URL が発行されたら完了です。環境変数は必須ではありません（外部画像を使う場合は `next.config.ts` の許可ホストに注意）。

### 静的エクスポート（任意）

本テンプレートは App Router + `next/image` のリモート画像を前提にしています。完全静的ホスティングでリモート画像を使う場合も Next の Image 最適化がビルド時に機能します。`output: "export"` への切替えは要件に応じて `next.config.ts` を調整してください（制約があるため、まずは Vercel / Node ホスティングを推奨します）。

### 自前 Node サーバー

```bash
npm run build
npm run start
```

リバースプロキシ（nginx 等）の背後に置く場合は、`next start` のポートとホストを環境に合わせてください。

### シンフリーサーバー（xfree）について

[シンフリーサーバー](https://www.xfree.ne.jp/) は **PHP / MySQL 中心の共有レンタルサーバー**です。無料 SSL や会社側のセキュリティ体制の説明は公式サイトを参照してください。

**このプロジェクト（Next.js）をそのまま載せることとの相性:** 本番は通常 **`next start`（Node.js 常駐）** が前提です。シンフリー無料プランの一般的な用途は **静的 HTML / PHP / WordPress** のため、**Node で動かす構成は想定されていません**。シンフリー上で運用する場合は、別途 **`output: 'export'` による静的書き出し** や、**Node が使えるレンタル／VPS／Vercel** への載せ替えを検討してください（静的化する場合は `next/image` の挙動や `/_next/image` 最適化の制約に注意が必要です）。

**アプリ側のセキュリティ:** HTTP ヘッダー（`X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、`Permissions-Policy` 等）と `X-Powered-By` 非表示を `next.config.ts` で付与しています。共有サーバーでは **FTP パスワードの強度・ファイル権限・古い PHP の放置**など運用面のリスクもあるため、マニュアルに沿った設定を推奨します。

## 技術スタック

- Next.js 15（App Router）
- TypeScript
- Tailwind CSS 3
- Framer Motion
- `next/image`

## ライセンス

プロジェクトテンプレートとして自由に改変してください。仮画像は Unsplash 経由のデモ用です。本番利用時は必ずご自身の素材に差し替えてください。
