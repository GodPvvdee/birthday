"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import PhotoGallery from "./PhotoGallery";
import Countdown from "./Countdown";

const HEADLINE = "Happy Birthday My Bubi";

const REVEAL = {
  what: "We're going golfing",
  where: "Mt Bogd",
  when: "Sunday • 11:00 AM",
};

export default function SurpriseScreen() {
  useEffect(() => {
    const colors = ["#ff75a8", "#ab84ff", "#ffc2d8", "#c8a8ff"];
    const fire = () =>
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.55 },
        colors,
        scalar: 1.1,
      });
    fire();
    const t = window.setTimeout(fire, 700);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -4, 4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="text-7xl sm:text-8xl"
        >
          🎂
        </motion.div>
        <h1 className="mt-4 flex flex-wrap justify-center font-display text-5xl leading-[1.05] text-gradient sm:text-7xl md:text-8xl">
          {HEADLINE.split(" ").map((word, wi) => (
            <span key={wi} className="mr-3 inline-flex">
              {word.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.4 + (wi * 0.18 + i * 0.04),
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                  }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          ))}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
            className="ml-1 inline-block"
          >
            ❤️
          </motion.span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2, duration: 0.7, type: "spring", stiffness: 140, damping: 18 }}
        className="mt-12"
      >
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-10 text-center sm:px-12">
          <motion.div
            aria-hidden
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="pointer-events-none absolute -right-6 -top-6 text-7xl opacity-30"
          >
            ⛳
          </motion.div>
          <motion.div
            aria-hidden
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="pointer-events-none absolute -bottom-6 -left-6 text-7xl opacity-30"
          >
            🏔️
          </motion.div>

          <p className="font-display text-2xl text-pink-500 sm:text-3xl">
            …and here&apos;s the secret 💌
          </p>
          <h2 className="mt-3 font-display text-4xl text-gradient sm:text-5xl md:text-6xl">
            {REVEAL.what}
          </h2>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
            <div className="flex items-center gap-2 rounded-full bg-white/55 px-5 py-2 backdrop-blur-md dark:bg-white/10">
              <span className="text-xl">🏔️</span>
              <span className="font-semibold text-pink-700 dark:text-pink-100">
                {REVEAL.where}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/55 px-5 py-2 backdrop-blur-md dark:bg-white/10">
              <span className="text-xl">🕚</span>
              <span className="font-semibold text-pink-700 dark:text-pink-100">
                {REVEAL.when}
              </span>
            </div>
          </div>
          <p className="mt-6 font-serif-r text-lg italic text-pink-700/90 dark:text-pink-50/90 sm:text-xl">
            Bring the cute sporty fit. I&apos;ll bring the clubs and an
            embarrassing amount of love. ❤️⛳
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.7 }}
        className="mt-14"
      >
        <PhotoGallery />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.7, duration: 0.7 }}
        className="mt-12 mb-4"
      >
        <Countdown />
      </motion.div>
    </div>
  );
}
