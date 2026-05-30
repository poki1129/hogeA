"use client";

import { characters } from "@/data/characters";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CharactersIndexContent() {
  return (
    <>
      <m.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-16 border-b border-white/[0.08] pb-10"
      >
        <p className="flex items-center gap-3 text-[10px] font-light tracking-[0.55em] text-white/40">
          <span className="h-px w-8 bg-white/30" />
          INDEX
        </p>
        <h1 className="mt-4 font-display text-3xl font-normal tracking-[0.2em] md:text-4xl">
          <span className="text-gradient">CHARACTERS</span>
        </h1>
        <p className="mt-5 max-w-lg text-sm font-extralight leading-relaxed text-white/55">
          世界観を支えるキャラクターの一覧。各カードから詳細プロフィールとギャラリーをご覧いただけます。
        </p>
      </m.header>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {characters.map((c, i) => (
          <m.article
            key={c.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.06 * i, ease: EASE }}
          >
            <Link href={`/characters/${c.id}`} className="group block">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-white/[0.08] bg-white/[0.02] transition-all duration-500 group-hover:border-white/30 group-hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.85)]">
                <div className="absolute inset-0">
                  <Image
                    src={c.imageMain}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] font-light tracking-[0.4em] text-white/50">NO.{c.id}</p>
                  <h2 className="mt-2 font-display text-xl tracking-[0.12em] text-white">{c.name}</h2>
                  <p className="mt-2 line-clamp-2 text-xs font-extralight leading-relaxed text-white/60">
                    {c.shortTagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[9px] font-light tracking-[0.35em] text-white/0 transition-all duration-500 group-hover:text-white/70">
                    VIEW PROFILE
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </m.article>
        ))}
      </div>
    </>
  );
}
