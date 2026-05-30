import { PageFade } from "@/components/PageFade";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CONTACT",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen-safe pb-24 pt-28 text-mist md:pt-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <PageFade>
          <p className="flex items-center gap-3 text-[10px] font-light tracking-[0.55em] text-white/40">
            <span className="h-px w-8 bg-white/30" />
            INQUIRY
          </p>
          <h1 className="mt-4 font-display text-3xl font-normal tracking-[0.18em] md:text-4xl">
            <span className="text-gradient">CONTACT</span>
          </h1>
          <p className="mt-8 text-sm font-extralight leading-relaxed tracking-wide text-white/60">
            お問い合わせは、下記のメールアドレスよりご連絡ください。返信には数日いただく場合があります。
          </p>
          <div className="mt-12 border border-white/[0.08] bg-white/[0.02] p-8">
            <p className="text-[10px] font-light tracking-[0.4em] text-white/40">MAIL</p>
            {/* REPLACE: 実際の問い合わせ先メールに差し替え */}
            <a
              href="mailto:contact@example.com"
              className="mt-3 inline-block text-sm font-extralight tracking-wider text-white/85 underline decoration-white/20 underline-offset-4 transition hover:decoration-white/50"
            >
              contact@example.com
            </a>
            <p className="mt-10 text-[10px] font-light tracking-[0.35em] text-white/40">SOCIAL（任意）</p>
            <ul className="mt-4 space-y-3 text-sm font-extralight text-white/70">
              {/* REPLACE: SNS リンクを追加・削除 */}
              <li>
                <a
                  href="https://twitter.com"
                  className="transition hover:text-white"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://www.pixiv.net"
                  className="transition hover:text-white"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  pixiv
                </a>
              </li>
            </ul>
          </div>
        </PageFade>
      </div>
    </main>
  );
}
