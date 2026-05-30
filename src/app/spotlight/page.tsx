import { HomeHero } from "@/components/HomeHero";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "SPOTLIGHT",
};

function SpotlightFallback() {
  return (
    <div className="flex min-h-screen-safe items-center justify-center bg-ink text-[10px] font-light tracking-[0.4em] text-white/40">
      LOADING
    </div>
  );
}

export default function SpotlightPage() {
  return (
    <main>
      <Suspense fallback={<SpotlightFallback />}>
        <HomeHero />
      </Suspense>
    </main>
  );
}
