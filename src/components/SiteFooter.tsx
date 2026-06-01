"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/characters", label: "CHARACTERS" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
] as const;

const socialLinks = [
  { href: "https://twitter.com", label: "X" },
  { href: "https://www.pixiv.net", label: "pixiv" },
] as const;

// 没入型の全画面ページ（TOP / スポットライト）では下部固定 UI と競合するため非表示
const HIDE_ON = ["/", "/spotlight"];

export function SiteFooter() {
  const pathname = usePathname();
  if (HIDE_ON.includes(pathname)) return null;

  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.07] bg-black/40">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" aria-label="トップへ" className="group inline-flex items-center gap-2">
              <span className="h-px w-5 origin-left bg-white/40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-8 group-hover:bg-white/80" />
              <span className="font-display text-sm tracking-[0.3em] text-white/85 transition-colors duration-300 group-hover:text-white">
                CHARACTER ARCHIVE
              </span>
            </Link>
            <p className="mt-4 text-[11px] font-extralight leading-relaxed tracking-wide text-white/40">
              オリジナルキャラクターの世界観と造形美を静かに提示するアーカイブ。
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="フッターナビ">
              <p className="text-[9px] font-light tracking-[0.45em] text-white/35">MENU</p>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[11px] font-light tracking-[0.28em] text-white/55 transition-colors duration-300 hover:text-white focus-visible:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-[9px] font-light tracking-[0.45em] text-white/35">SOCIAL</p>
              <ul className="mt-4 space-y-2.5">
                {socialLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-light tracking-[0.28em] text-white/55 transition-colors duration-300 hover:text-white focus-visible:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.05] pt-6 text-[10px] font-light tracking-[0.3em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} CHARACTER ARCHIVE</p>
          <p className="tracking-[0.25em] text-white/25">ALL VISUALS ARE FOR DEMONSTRATION</p>
        </div>
      </div>
    </footer>
  );
}
