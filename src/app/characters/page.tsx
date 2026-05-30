import { CharactersIndexContent } from "@/components/CharactersIndexContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CHARACTERS",
};

export default function CharactersIndexPage() {
  return (
    <main className="min-h-screen-safe pb-24 pt-28 text-mist md:pt-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <CharactersIndexContent />
      </div>
    </main>
  );
}
