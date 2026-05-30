"use client";

import { characters } from "@/data/characters";
import { topBackground, topLandingCopy, topSchedule } from "@/data/topLanding";
import { isRemoteImage } from "@/lib/image";
import { m } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CharacterStrip } from "./CharacterStrip";
import { ImagePreloader } from "./ImagePreloader";

const EASE = [0.22, 1, 0.36, 1] as const;

function useViewportHeight() {
  useEffect(() => {
    const set = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);
}

export function HomeTopLanding() {
  useViewportHeight();
  const router = useRouter();

  // 選択時に即表示できるよう、背景画像を先読みする ID 集合
  const [preloadIds, setPreloadIds] = useState<string[]>([]);
  const addPreload = useCallback((id: string) => {
    setPreloadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  // TOP を開いたときは必ず画面最上部から表示する（スクロール位置の復元対策）
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // 表示モード（/spotlight）のコードと全キャラの背景画像を、
  // ページが落ち着いた頃にバックグラウンドで先読みしておく。
  useEffect(() => {
    router.prefetch("/spotlight");
    const warm = () => setPreloadIds(characters.map((c) => c.id));
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(warm);
    } else {
      const t = setTimeout(warm, 1200);
      return () => clearTimeout(t);
    }
  }, [router]);

  const preloadSrcs = preloadIds
    .map((id) => characters.find((c) => c.id === id)?.imageBg)
    .filter((src): src is string => Boolean(src));

  const titleLines = topLandingCopy.title.split("\n");

  return (
    <section className="relative min-h-screen-safe overflow-hidden">
      {/* TOP 背景（src/data/topLanding.ts の topBackground で切り替え） */}
      {topBackground.type === "color" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: topBackground.color }}
        />
      ) : (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={topBackground.src}
            alt=""
            fill
            priority
            sizes="100vw"
            unoptimized={isRemoteImage(topBackground.src)}
            className="object-cover"
            style={{ objectPosition: topBackground.position ?? "center" }}
          />
          {topBackground.overlay != null && topBackground.overlay > 0 && (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `rgba(0,0,0,${topBackground.overlay})` }}
            />
          )}
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-screen-safe w-full max-w-7xl flex-col md:flex-row md:items-stretch">
        <m.div
          className="flex flex-1 flex-col justify-center px-6 pb-40 pt-24 md:px-10 md:pb-36 md:pt-28"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
        >
          <m.div
            className="flex items-center gap-3"
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
          >
            <span className="h-px w-8 origin-left bg-white/30" />
            <p className="text-[10px] font-light tracking-[0.55em] text-white/45">{topLandingCopy.kicker}</p>
          </m.div>

          <m.h1 className="mt-6 font-display text-4xl font-normal leading-[1.12] tracking-[0.14em] md:text-6xl">
            {titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <m.span
                  className="text-gradient inline-block"
                  variants={{
                    hidden: { y: "110%" },
                    show: { y: "0%", transition: { duration: 1, ease: EASE } },
                  }}
                >
                  {line}
                </m.span>
              </span>
            ))}
          </m.h1>

          <m.p
            className="mt-8 max-w-md text-sm font-extralight leading-relaxed tracking-wide text-white/60"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
          >
            {topLandingCopy.lead}
          </m.p>

          <m.div
            className="mt-10 flex items-center gap-3 text-[10px] font-light tracking-[0.4em] text-white/35"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1, delay: 0.2 } } }}
          >
            <m.span
              className="inline-block h-1.5 w-1.5 rounded-full bg-white/50"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            SCROLL TO SELECT
          </m.div>
        </m.div>

        <m.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="flex w-full shrink-0 flex-col border-t border-white/[0.07] bg-black/30 px-6 pb-44 pt-8 backdrop-blur-md md:w-[min(100%,20rem)] md:border-l md:border-t-0 md:px-5 md:pb-0 md:pt-0"
        >
          <div className="flex min-h-[min(40vh,20rem)] flex-1 flex-col gap-0 md:sticky md:top-0 md:max-h-[calc(100svh-11rem)] md:min-h-0 md:flex-none md:pb-32 md:pt-24">
            <section className="flex min-h-0 flex-1 flex-col">
              <h2 className="shrink-0 text-[10px] font-light tracking-[0.45em] text-white/40">SCHEDULE</h2>
              <ul className="mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 text-sm font-extralight leading-snug text-white/70">
                {topSchedule.map((row, i) => (
                  <m.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: EASE }}
                    className="group border-b border-white/[0.06] pb-4 last:border-0"
                  >
                    <p className="text-[10px] tracking-[0.2em] text-white/45 transition-colors group-hover:text-white/70">
                      {row.date}
                      {row.time ? ` ${row.time}` : ""}
                    </p>
                    <p className="mt-1.5 flex items-center gap-2 tracking-wide transition-colors group-hover:text-white">
                      <span className="font-normal text-white/90">{row.name}</span>
                      {row.status ? (
                        <span className="rounded-sm border border-white/20 px-2 py-0.5 text-[10px] tracking-[0.2em] text-white/70">
                          {row.status}
                        </span>
                      ) : null}
                    </p>
                  </m.li>
                ))}
              </ul>
            </section>
          </div>
        </m.aside>
      </div>

      <CharacterStrip
        characters={characters}
        activeId=""
        onPreload={addPreload}
        onSelect={(id) => {
          router.push(`/spotlight?id=${encodeURIComponent(id)}`);
        }}
      />

      <ImagePreloader srcs={preloadSrcs} />
    </section>
  );
}
