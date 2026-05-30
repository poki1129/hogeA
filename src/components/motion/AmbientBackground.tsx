import { cn } from "@/lib/cn";

/**
 * ページ全体の背景。ノイズや模様のない、完全にフラットな単色。
 */
export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-0 bg-ink", className)}
    />
  );
}
