"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "TOP" },
  { href: "/characters", label: "CHARACTERS" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
] as const;

export function HoverTopNav() {
  const [open, setOpen] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleLeave = useCallback(() => {
    if (!coarse) setOpen(false);
  }, [coarse]);

  return (
    <>
      {/* ホバー検知エリア（PC） */}
      <div
        className={cn(
          "fixed left-0 right-0 top-0 z-50 h-16",
          coarse ? "pointer-events-none" : "pointer-events-auto",
        )}
        onMouseEnter={() => !coarse && setOpen(true)}
        onMouseLeave={handleLeave}
        aria-hidden={coarse}
      />

      {/* スマホ: 控えめなメニュートリガー */}
      {coarse && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="fixed right-4 top-3 z-[60] rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[10px] font-medium tracking-[0.35em] text-white/70 backdrop-blur-md transition hover:border-white/30 hover:text-white/90"
          aria-expanded={open}
          aria-controls="site-top-nav"
        >
          MENU
        </button>
      )}

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
            onMouseEnter={() => !coarse && setOpen(true)}
            onMouseLeave={handleLeave}
          >
            <div
              className={cn(
                "mx-auto",
                coarse
                  ? "w-full max-w-none overflow-x-auto overscroll-x-contain nav-menu-scroll [-webkit-overflow-scrolling:touch]"
                  : "max-w-6xl",
              )}
            >
              <div
                className={cn(
                  "flex flex-nowrap items-center py-4 md:py-5",
                  coarse
                    ? "w-max gap-x-6 pl-4 pr-[4.5rem] sm:gap-x-8 sm:pr-16 md:pr-6"
                    : "justify-center gap-10 px-6 md:gap-14",
                )}
              >
              {links.map((item, i) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
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
                        "group relative block shrink-0 whitespace-nowrap py-1 text-[11px] font-light tracking-[0.42em] transition-colors duration-300",
                        active ? "text-white" : "text-white/55 hover:text-white",
                      )}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {/* アンダーラインのスライド表示 */}
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gradient-to-r from-white/80 to-white/30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                      <span
                        className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-sm bg-white/0 transition-all duration-500 group-hover:bg-white/[0.05] group-hover:shadow-[0_0_24px_rgba(255,255,255,0.07)]"
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
