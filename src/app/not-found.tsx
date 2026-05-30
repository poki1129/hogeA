import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen-safe flex-col items-center justify-center bg-ink px-6 text-center text-mist">
      <p className="text-[10px] font-light tracking-[0.5em] text-white/40">404</p>
      <h1 className="mt-4 font-display text-2xl tracking-[0.2em] text-white">Page not found</h1>
      <p className="mt-4 max-w-sm text-sm font-extralight text-white/55">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="mt-10 border border-white/25 px-8 py-2 text-[10px] font-light tracking-[0.4em] text-white/85 transition hover:border-white/50"
      >
        TOP
      </Link>
    </main>
  );
}
