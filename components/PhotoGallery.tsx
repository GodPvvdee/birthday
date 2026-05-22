"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Slide = {
  gradient: string;
  emoji: string;
  caption: string;
};

const SLIDES: Slide[] = [
  {
    gradient: "from-emerald-300 via-teal-300 to-cyan-300",
    emoji: "⛳",
    caption: "Sunday at Mt Bogd — fairways, sunshine, you",
  },
  {
    gradient: "from-sky-300 via-blue-300 to-indigo-300",
    emoji: "🏔️",
    caption: "the mountain views you keep saying you want",
  },
  {
    gradient: "from-amber-200 via-orange-200 to-pink-300",
    emoji: "🌅",
    caption: "11am light, the prettiest hour of the day",
  },
  {
    gradient: "from-pink-300 via-rose-300 to-fuchsia-300",
    emoji: "🏌️‍♀️",
    caption: "you in the cute sporty fit, me losing on purpose",
  },
  {
    gradient: "from-purple-300 via-pink-300 to-rose-300",
    emoji: "💕",
    caption: "every quiet moment in between",
  },
];

export default function PhotoGallery() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[index];

  return (
    <div className="relative w-full">
      <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-3xl border border-white/40 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${slide.gradient}`}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-8xl drop-shadow-lg sm:text-9xl"
            >
              {slide.emoji}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-6 mt-6 max-w-sm text-center font-display text-2xl text-white drop-shadow-md sm:text-3xl"
            >
              {slide.caption}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="glass absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-pink-600 hover:scale-110 transition-transform"
        >
          ←
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="glass absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-pink-600 hover:scale-110 transition-transform"
        >
          →
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? "w-8 bg-gradient-to-r from-pink-400 to-purple-400 shadow-[0_0_10px_rgba(255,105,180,0.6)]"
                : "w-2 bg-pink-200 hover:bg-pink-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
