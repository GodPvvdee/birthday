"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import data from "@/data/questions.json";
import QuestionCard from "./QuestionCard";

export default function Quiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const total = data.questions.length;
  const current = data.questions[step];

  useEffect(() => {
    router.prefetch("/surprise");
  }, [router]);

  const onCorrect = () => {
    if (step === total - 1) {
      setFinished(true);
      fireFinale();
      window.setTimeout(() => router.push("/surprise"), 2400);
    } else {
      setStep((s) => s + 1);
    }
  };

  const fireFinale = () => {
    const colors = ["#ff75a8", "#ab84ff", "#ffc2d8", "#c8a8ff", "#ff4d8d"];
    const end = Date.now() + 1800;
    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
        shapes: ["circle"],
        scalar: 1.1,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
        shapes: ["circle"],
        scalar: 1.1,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({
      particleCount: 160,
      spread: 110,
      origin: { y: 0.6 },
      colors,
      scalar: 1.3,
    });
  };

  const progress = ((step + (finished ? 1 : 0)) / total) * 100;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex items-center justify-between text-sm font-semibold text-pink-600 dark:text-pink-200">
        <span className="font-display text-lg">
          Question {Math.min(step + 1, total)} <span className="opacity-50">/ {total}</span>
        </span>
        <span className="font-mono opacity-70">{Math.round(progress)}%</span>
      </div>

      <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-pink-100/70 backdrop-blur-sm dark:bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="h-full rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 shadow-[0_0_20px_rgba(255,105,180,0.7)]"
        />
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.96 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <QuestionCard
              question={current.question}
              emoji={current.emoji}
              options={current.options}
              correctIndex={current.correctIndex}
              wrongMessages={data.wrongMessages}
              rightMessages={data.rightMessages}
              onCorrect={onCorrect}
            />
          </motion.div>
        ) : (
          <motion.div
            key="finale"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl px-8 py-14 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="text-7xl"
            >
              💖
            </motion.div>
            <h2 className="mt-6 font-display text-4xl text-gradient sm:text-5xl">
              You know me by heart
            </h2>
            <p className="mt-3 text-pink-700/80 dark:text-pink-100/80">
              Taking you to something special…
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-10 text-center text-xs text-pink-400/80">
        psst — wrong answers won&apos;t hurt you. just try again 💕
      </p>
    </div>
  );
}
