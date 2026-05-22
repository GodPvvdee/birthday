"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GlowButton from "@/components/GlowButton";
import { useState } from "react";

const message = "Happy Birthday, My Bubi";

export default function Home() {
  const [easterEgg, setEasterEgg] = useState(0);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass relative w-full max-w-3xl rounded-[2.5rem] px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 180, damping: 14 }}
          className="mb-2 select-none text-6xl sm:text-7xl"
          onClick={() => setEasterEgg((e) => e + 1)}
        >
          {easterEgg >= 5 ? "🦄" : "🎂"}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-display text-xl text-pink-500 sm:text-2xl"
        >
          a little something just for you ✨
        </motion.p>

        <h1 className="mt-4 flex flex-wrap justify-center font-display text-5xl leading-tight text-gradient sm:text-7xl">
          {message.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.8 + i * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 14,
              }}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mx-auto mt-8 max-w-xl font-serif-r text-lg italic text-pink-700/80 sm:text-xl"
        >
          Today the world celebrates the day you came into it — but every day,
          I get to celebrate the day you came into mine.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="mt-4 text-sm text-pink-500/80 sm:text-base"
        >
          I made you a little game first. Think you know us well enough? 😉
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <Link href="/quiz" prefetch>
            <GlowButton variant="pink">
              <span>Start the Journey</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                →
              </motion.span>
            </GlowButton>
          </Link>
          <p className="text-xs text-pink-400/80">
            6 questions • a surprise reveal • all my bubi 💕
          </p>
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-8 -top-8 text-5xl opacity-60"
          animate={{ rotate: [0, 10, -10, 0], y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🌸
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 -right-6 text-5xl opacity-60"
          animate={{ rotate: [0, -8, 8, 0], y: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
        >
          💝
        </motion.div>
      </motion.div>

      {easterEgg >= 5 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 font-display text-lg text-purple-500"
        >
          You found a unicorn! 🦄 (I love you a normal amount, I swear.)
        </motion.p>
      )}
    </div>
  );
}
