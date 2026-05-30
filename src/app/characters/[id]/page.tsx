import { characters, getCharacterById } from "@/data/characters";
import { CharacterDetailClient } from "@/components/CharacterDetailClient";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return characters.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const c = getCharacterById(id);
  if (!c) return { title: "Not Found" };
  return { title: c.name };
}

export default async function CharacterDetailPage({ params }: Props) {
  const { id } = await params;
  const character = getCharacterById(id);
  if (!character) notFound();

  return (
    <main className="min-h-screen-safe text-mist">
      <CharacterDetailClient character={character} />
    </main>
  );
}
