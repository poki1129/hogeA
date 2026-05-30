"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Item = { src: string; characterName: string; id: string };

export function GalleryGrid({ items }: { items: Item[] }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((item, i) => (
        <m.div
          key={`${item.id}-${i}`}
          initial={{ opacity: 0, y: 22, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="mb-4 break-inside-avoid"
        >
          <Link
            href={`/characters/${item.id}`}
            className="group relative block overflow-hidden rounded-sm border border-white/[0.07] bg-white/[0.02] shadow-[0_0_0_rgba(0,0,0,0)] transition-shadow duration-500 hover:border-white/25 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className="object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="flex items-center gap-2 text-[9px] font-light tracking-[0.35em] text-white/70">
                  VIEW PROFILE <span>→</span>
                </p>
                <p className="mt-1 text-xs font-extralight tracking-wide text-white">{item.characterName}</p>
              </div>
            </div>
          </Link>
        </m.div>
      ))}
    </div>
  );
}
