"use client";

import type { Character } from "@/data/characters";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const rowDefs: { label: string; value: (c: Character) => string }[] = [
  { label: "名前", value: (c) => c.name },
  { label: "読み", value: (c) => c.nameReading },
  { label: "年齢", value: (c) => (c.age === "" ? "" : `${c.age}`) },
  { label: "身長", value: (c) => c.height },
  { label: "好きなもの", value: (c) => c.likes },
  { label: "キャッチコピー", value: (c) => c.catchphrase },
];

type Props = { character: Character };

export function CharacterDetailClient({ character: c }: Props) {
  const rows = rowDefs
    .map((r) => ({ label: r.label, value: r.value(c) }))
    .filter((r) => r.value.trim() !== "");

  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div className="pb-24 pt-24 md:pt-28">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl px-6 md:px-10"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
          <m.div
            ref={imgRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm border border-white/[0.08] bg-white/[0.02] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] lg:sticky lg:top-28 lg:max-w-none"
          >
            <m.div className="absolute inset-[-6%]" style={{ y: imgY }}>
              <Image
                src={c.imageMain}
                alt={c.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
              />
            </m.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </m.div>

          <div>
            <m.header
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-white/[0.08] pb-8"
            >
              <p className="flex items-center gap-3 text-[10px] font-light tracking-[0.5em] text-white/40">
                <span className="h-px w-8 bg-white/30" />
                PROFILE
              </p>
              <h1 className="mt-3 font-display text-3xl font-normal tracking-[0.14em] md:text-4xl">
                <span className="text-gradient">{c.name}</span>
              </h1>
            </m.header>

            <dl className="mt-10 space-y-6">
              {rows.map((row, i) => (
                <m.div
                  key={row.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-2 border-b border-white/[0.05] pb-6 sm:grid-cols-[140px_1fr] sm:gap-8"
                >
                  <dt className="text-[10px] font-light tracking-[0.35em] text-white/40">{row.label}</dt>
                  <dd className="text-sm font-extralight leading-relaxed tracking-wide text-white/85">
                    {row.value}
                  </dd>
                </m.div>
              ))}
            </dl>

            {c.introduction.trim() !== "" && (
              <m.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12"
              >
                <h2 className="text-[10px] font-light tracking-[0.45em] text-white/40">紹介文</h2>
                <div className="mt-4 space-y-4 text-sm font-extralight leading-[1.9] tracking-wide text-white/70">
                  {c.introduction.split("\n\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </m.section>
            )}

            {c.gallery.length > 0 && (
              <m.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-14"
              >
                <h2 className="text-[10px] font-light tracking-[0.45em] text-white/40">GALLERY</h2>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {c.gallery.map((src, idx) => (
                    <div
                      key={`${c.id}-gallery-${idx}`}
                      className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/[0.06] bg-white/[0.02]"
                    >
                      <Image
                        src={src}
                        alt={`${c.name} gallery ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 200px"
                        loading="lazy"
                        className="object-cover transition duration-700 hover:scale-[1.02]"
                      />
                    </div>
                  ))}
                </div>
              </m.section>
            )}

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-14"
            >
              <Link
                href="/"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm border border-white/20 bg-transparent px-8 py-2.5 text-[10px] font-light tracking-[0.4em] text-white/80 transition duration-500 hover:border-white/45 hover:text-white"
              >
                <span
                  className="pointer-events-none absolute inset-0 translate-y-full bg-white/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                  aria-hidden
                />
                <span className="relative z-10 flex items-center gap-3">
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1">←</span>
                  BACK TO TOP
                </span>
              </Link>
            </m.div>
          </div>
        </div>
      </m.div>
    </div>
  );
}
