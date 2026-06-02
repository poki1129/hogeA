"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// 「TOP」は左上のワードマークがホーム導線を兼ねるためメニューからは省略
const links = [
  { href: "/characters", label: "CAST" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
] as const;

export function HoverTopNav() {
  const [open, setOpen] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ルート遷移したら閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleEnter = useCallback(() => {
    if (!coarse) setOpen(true);
  }, [coarse]);

  const handleLeave = useCallback(() => {
    if (!coarse) setOpen(false);
  }, [coarse]);

  // フォーカスがナビ領域の外へ出たら閉じる（キーボード操作対応）
  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }, []);

  return (
    <>
      {/* ナビ領域：トップバー（ワードマーク＋MENU）・ホバー検知帯・パネルを
          1 つのコンテナにまとめ、上部バンドのどこをホバー／フォーカスしても
          同じようにメニューバーが開くようにする。 */}
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={() => setOpen(true)}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {/* デスクトップ用：上部バンド全幅のホバー検知帯。
            ワードマーク〜MENU の間（中央）をホバーしても開くようにする。 */}
        <div
          aria-hidden
          className={cn(
            "fixed inset-x-0 top-0 z-50 h-16",
            coarse ? "pointer-events-none" : "pointer-events-auto",
          )}
        />

        {/* 常設トップバー：ワードマーク（左）と MENU（右）。
            開いたときのメニューバーと同じ縦リズム（py / items-center）で、
            リンク行と高さが揃う。中央は pointer-events-none でクリックを透過。 */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
          {/* 常設ワードマーク（常時表示・常にクリック可能なホーム導線） */}
          <Link
            href="/"
            aria-label="トップへ"
            aria-current={isHome ? "page" : undefined}
            className="group pointer-events-auto flex items-center gap-2 outline-none"
          >
            <span
              className={cn(
                "h-px origin-left bg-white/40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-8 group-hover:bg-white/80 group-focus-visible:w-8",
                isHome ? "w-8 bg-white/70" : "w-5",
              )}
            />
            <span
              className={cn(
                "text-[10px] font-light tracking-[0.38em] [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] transition-colors duration-300 group-hover:text-white group-focus-visible:text-white md:text-[11px]",
                "text-white",
              )}
            >
              TOP
            </span>
          </Link>

          {/* 常設トリガー（右）= メニューの存在を示す手がかり。
              PC: ホバー／フォーカスで開く（クリックでもトグル）。スマホ: タップでトグル。 */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="group pointer-events-auto flex items-center gap-2.5 outline-none"
            aria-expanded={open}
            aria-controls="site-top-nav"
            aria-label="メニューを開く"
          >
            <span
              className={cn(
                "text-[10px] font-light tracking-[0.4em] [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] transition-colors duration-300",
                open ? "text-white/90" : "text-white/55 group-hover:text-white/90 group-focus-visible:text-white/90",
              )}
            >
              MENU
            </span>
            <span aria-hidden className="flex flex-col items-end gap-[3px]">
              <span
                className={cn(
                  "block h-px bg-white/70 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  open ? "w-4" : "w-4 group-hover:w-5 group-focus-visible:w-5",
                )}
              />
              <span
                className={cn(
                  "block h-px bg-white/70 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  open ? "w-4" : "w-2.5 group-hover:w-5 group-focus-visible:w-5",
                )}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <m.nav
              id="site-top-nav"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed left-0 right-0 top-0 z-[55] border-b border-white/[0.06] bg-black/55 backdrop-blur-xl",
                coarse && "pt-14",
              )}
            >
              <div
                className={cn(
                  "mx-auto",
                  coarse
                    ? "w-full max-w-none overflow-x-auto overscroll-x-contain nav-menu-scroll [-webkit-overflow-scrolling:touch]"
                    : "max-w-6xl",
                )}
              >
                {/* トップバーと同じ py / items-center でリンク行の高さを揃える */}
                <div
                  className={cn(
                    "flex flex-nowrap items-center py-4 md:py-5",
                    coarse
                      ? "w-max gap-x-6 pl-4 pr-[4.5rem] sm:gap-x-8 sm:pr-16 md:pr-6"
                      : "justify-center gap-10 px-6 md:gap-14",
                  )}
                >
                  {links.map((item, i) => {
                    const active = pathname.startsWith(item.href);
                    return (
                      <m.div
                        key={item.href}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => coarse && setOpen(false)}
                          className={cn(
                            "group relative block shrink-0 whitespace-nowrap py-1 text-[11px] font-light tracking-[0.42em] outline-none transition-colors duration-300",
                            active ? "text-white" : "text-white/55 hover:text-white focus-visible:text-white",
                          )}
                        >
                          <span className="relative z-10">{item.label}</span>
                          {/* アンダーラインのスライド表示（ホバー／フォーカス両対応） */}
                          <span
                            aria-hidden
                            className={cn(
                              "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gradient-to-r from-white/80 to-white/30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                              active
                                ? "scale-x-100"
                                : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100",
                            )}
                          />
                          <span
                            className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-sm bg-white/0 transition-all duration-500 group-hover:bg-white/[0.05] group-hover:shadow-[0_0_24px_rgba(255,255,255,0.07)] group-focus-visible:bg-white/[0.05]"
                            aria-hidden
                          />
                        </Link>
                      </m.div>
                    );
                  })}
                </div>
              </div>
            </m.nav>
          )}
        </AnimatePresence>
      </div>

      {/* スマホ: ナビ外タップで閉じる */}
      {coarse && open && (
        <button
          type="button"
          className="fixed inset-0 z-[54] bg-black/40 backdrop-blur-[2px]"
          aria-label="メニューを閉じる"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
