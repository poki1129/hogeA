"use client";

import { characters, type Character } from "@/data/characters";
import { isRemoteImage } from "@/lib/image";
import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
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

export function HomeHero() {
  useViewportHeight();
  const router = useRouter();
  const searchParams = useSearchParams();
  const idFromUrl = searchParams.get("id");

  const index = useMemo(() => {
    if (!idFromUrl) return 0;
    const i = characters.findIndex((c) => c.id === idFromUrl);
    return i >= 0 ? i : 0;
  }, [idFromUrl]);

  const current: Character = characters[index]!;

  // 切り替えを即座にするため、他キャラの背景も先読みする
  const [preloadIds, setPreloadIds] = useState<string[]>([]);
  const addPreload = useCallback((id: string) => {
    setPreloadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  useEffect(() => {
    const warm = () => setPreloadIds(characters.map((c) => c.id));
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(warm);
    } else {
      const t = setTimeout(warm, 1000);
      return () => clearTimeout(t);
    }
  }, []);

  const preloadSrcs = preloadIds
    .map((id) => characters.find((c) => c.id === id)?.imageBg)
    .filter((src): src is string => Boolean(src));

  return (
    <section className="relative min-h-screen-safe overflow-hidden bg-ink">
      <m.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <AnimatePresence mode="wait">
          <m.div
            key={current.id}
            className="absolute inset-[-4%]"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ opacity: { duration: 0.9, ease: EASE }, scale: { duration: 9, ease: "easeOut" } }}
          >
            <Image
              src={current.imageBg}
              alt=""
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
              unoptimized={isRemoteImage(current.imageBg)}
              className="object-cover object-center"
            />
          </m.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/35" />
      </m.div>

      <div className="relative z-10 flex min-h-screen-safe flex-col">
        <div className="flex flex-1 flex-col justify-end pb-36 pt-28 md:justify-center md:pb-40 md:pt-20">
          <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
            <AnimatePresence mode="wait">
              <m.div
                key={current.id}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.4 } }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
                className="max-w-xl"
              >
                <m.p
                  className="mb-4 flex items-center gap-3 text-[10px] font-light tracking-[0.55em] text-white/45 md:text-[11px]"
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                >
                  <span className="h-px w-8 bg-white/40" />
                  ORIGINAL CHARACTER
                </m.p>
                <h1 className="overflow-hidden font-display text-4xl font-light tracking-[0.08em] text-white md:text-6xl md:tracking-[0.12em]">
                  <m.span
                    className="inline-block"
                    variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
                  >
                    {current.name}
                  </m.span>
                </h1>
                <m.p
                  className="mt-5 text-sm font-extralight leading-relaxed tracking-wide text-white/75 md:text-base"
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
                >
                  {current.shortTagline}
                </m.p>
                <m.p
                  className="mt-4 max-w-md text-xs font-extralight leading-relaxed text-white/55 md:text-sm"
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
                >
                  {current.heroDescription}
                </m.p>
                <m.div
                  className="mt-10 flex flex-wrap items-center gap-5"
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
                >
                  <Link
                    href={`/characters/${current.id}`}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm border border-white/25 bg-white/[0.04] px-10 py-3 text-[11px] font-light tracking-[0.45em] text-white/90 backdrop-blur-sm transition duration-500 hover:border-white/50"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 translate-y-full bg-white/[0.1] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                      aria-hidden
                    />
                    <span className="relative z-10 flex items-center gap-3">
                      DETAIL
                      <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                    </span>
                  </Link>
                </m.div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        <CharacterStrip
          characters={characters}
          activeId={current.id}
          onPreload={addPreload}
          onSelect={(id) => {
            router.replace(`/spotlight?id=${encodeURIComponent(id)}`, { scroll: false });
          }}
        />
      </div>

      <ImagePreloader srcs={preloadSrcs} />
    </section>
  );
}
