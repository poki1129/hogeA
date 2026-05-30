"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

export function PageFade({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </m.div>
  );
}
