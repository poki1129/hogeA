"use client";

import type { Character } from "@/data/characters";
import { m } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  characters: Character[];
  activeId: string;
  onSelect: (id: string) => void;
  /** ホバー／フォーカス時に呼ばれる先読みトリガー（任意） */
  onPreload?: (id: string) => void;
};

export function CharacterStrip({ characters, activeId, onSelect, onPreload }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // 横にあふれている（スクロールが必要）かどうか
  const [overflowing, setOverflowing] = useState(false);

  // 下部バー（SELECT CHARACTER）の実際の高さを CSS 変数 --strip-h に反映。
  // これを使ってスケジュール側のスクロール領域・余白を確保し、干渉を防ぐ。
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty("--strip-h", `${el.offsetHeight}px`);
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
      document.documentElement.style.removeProperty("--strip-h");
    };
  }, []);

  // 実際に収まりきらない場合のみ「左寄せ＋スクロール」、収まるなら中央寄せ
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => setOverflowing(el.scrollWidth > el.clientWidth + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [characters.length]);

  // マウスオーバー中の縦ホイールで横スクロール（上→左 / 下→右）
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // 横にあふれていない（スクロール不要）なら通常の縦スクロールに任せる
      if (el.scrollWidth <= el.clientWidth) return;
      const raw = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (raw === 0) return;
      // 行単位(deltaMode=1)の場合はピクセルに換算
      const delta = e.deltaMode === 1 ? raw * 16 : raw;
      el.scrollLeft += delta;
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-auto fixed bottom-0 left-0 right-0 z-20 border-t border-white/[0.06] bg-gradient-to-t from-black via-black/90 to-transparent pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-10"
    >
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-3 hidden text-center text-[9px] font-light tracking-[0.5em] text-white/35 md:block">
          SELECT CHARACTER
        </p>
        <m.div
          ref={scrollRef}
          className={cn(
            "thumb-scroll flex gap-3 overflow-x-auto pb-1",
            // 収まりきらないときだけ左寄せ＋スクロール。収まるなら中央寄せ
            overflowing ? "justify-start" : "justify-center",
          )}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            // 右端のカードから順に表示し、左へ流れてくる（カードを配るような）演出
            show: { transition: { staggerChildren: 0.07, staggerDirection: -1, delayChildren: 0.25 } },
          }}
        >
          {characters.map((c) => {
            const active = c.id === activeId;
            const thumb = c.imageThumb ?? c.imageBg;
            return (
              <m.button
                key={c.id}
                type="button"
                onClick={() => onSelect(c.id)}
                onMouseEnter={() => onPreload?.(c.id)}
                onFocus={() => onPreload?.(c.id)}
                onPointerDown={() => onPreload?.(c.id)}
                variants={{
                  hidden: { opacity: 0, x: 64, rotate: -5 },
                  show: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.55, ease: EASE } },
                }}
                className={cn(
                  "group relative shrink-0 overflow-hidden rounded-sm border transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active
                    ? "border-white/45 shadow-[0_0_32px_rgba(255,255,255,0.12)]"
                    : "border-white/10 hover:border-white/30",
                )}
                aria-current={active ? "true" : undefined}
                aria-label={`${c.name}を表示`}
              >
                <div
                  className={cn(
                    "relative h-16 w-12 overflow-hidden sm:h-[4.5rem] sm:w-[3.25rem] md:h-20 md:w-14",
                    !active && "opacity-55 group-hover:opacity-100",
                  )}
                >
                  <Image
                    src={thumb}
                    alt=""
                    fill
                    sizes="80px"
                    loading="lazy"
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                  {active && (
                    <m.div
                      layoutId="strip-active-glow"
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/25"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </div>
                <div
                  className={cn(
                    "flex h-9 w-12 items-center justify-center border-t border-white/[0.06] bg-black/60 backdrop-blur-sm transition-colors sm:w-[3.25rem] md:h-10 md:w-14",
                    active ? "text-white" : "text-white/45 group-hover:text-white/85",
                  )}
                >
                  <span className="line-clamp-2 px-1 text-center text-[9px] font-extralight leading-tight tracking-[0.18em] md:text-[10px] md:tracking-[0.22em]">
                    {c.name}
                  </span>
                </div>
              </m.button>
            );
          })}
        </m.div>
      </div>
    </div>
  );
}
