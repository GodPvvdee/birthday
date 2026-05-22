"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Trail = {
  id: number;
  x: number;
  y: number;
  emoji: string;
};

const EMOJIS = ["💕", "💖", "✨", "💗", "🌸"];

export default function CursorHearts() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsCoarse(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isCoarse) return;
    let lastTime = 0;
    let nextId = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < 70) return;
      lastTime = now;
      const id = nextId++;
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      setTrails((prev) => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY, emoji }]);
      window.setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== id));
      }, 900);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isCoarse]);

  if (isCoarse) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      <AnimatePresence>
        {trails.map((t) => (
          <motion.span
            key={t.id}
            initial={{ opacity: 0.9, scale: 0.6, x: t.x - 10, y: t.y - 10 }}
            animate={{
              opacity: 0,
              scale: 1.3,
              y: t.y - 50,
              rotate: (Math.random() - 0.5) * 60,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute text-base"
            style={{ left: 0, top: 0 }}
          >
            {t.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
