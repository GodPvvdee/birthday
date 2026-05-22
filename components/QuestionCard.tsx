"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Props = {
  question: string;
  emoji: string;
  options: string[];
  correctIndex: number;
  wrongMessages: string[];
  rightMessages: string[];
  onCorrect: () => void;
};

export default function QuestionCard({
  question,
  emoji,
  options,
  correctIndex,
  wrongMessages,
  rightMessages,
  onCorrect,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ type: "ok" | "no"; text: string } | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [locked, setLocked] = useState(false);

  const onPick = (idx: number) => {
    if (locked) return;
    setSelected(idx);
    if (idx === correctIndex) {
      setLocked(true);
      const msg = rightMessages[Math.floor(Math.random() * rightMessages.length)];
      setFeedback({ type: "ok", text: msg });
      window.setTimeout(() => {
        try {
          new Audio(
            "data:audio/wav;base64,UklGRpoCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXYCAAB+AKv+oQEi/4j/uADAAAAArQB6/x4Bxv8R/9oA7P9P/30AbgC4AOf+CwGv/9X+sgCsAOMA8QC0/9b/2QHF/4P/3wHU/8X+CAEm/wn/2gAOAFD/EgHa/zX/IwAUACEAfAA="
          ).play().catch(() => {});
        } catch {}
        onCorrect();
      }, 1100);
    } else {
      const msg = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
      setFeedback({ type: "no", text: msg });
      setShakeKey((k) => k + 1);
      window.setTimeout(() => {
        setFeedback(null);
        setSelected(null);
      }, 1400);
    }
  };

  return (
    <motion.div
      key={shakeKey}
      initial={{ x: 0 }}
      animate={shakeKey ? { x: [0, -12, 12, -8, 8, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.5 }}
      className="glass w-full rounded-3xl px-6 py-8 sm:px-10 sm:py-12"
    >
      <div className="mb-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="text-5xl"
        >
          {emoji}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 font-display text-3xl text-gradient sm:text-4xl"
        >
          {question}
        </motion.h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt, i) => {
          const isPicked = selected === i;
          const isCorrectPick = locked && i === correctIndex;
          const isWrongPick = isPicked && feedback?.type === "no";

          return (
            <motion.button
              key={i}
              onClick={() => onPick(i)}
              disabled={locked}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }}
              whileHover={!locked ? { scale: 1.03, y: -2 } : {}}
              whileTap={!locked ? { scale: 0.97 } : {}}
              className={`relative rounded-2xl border px-5 py-4 text-left font-medium transition-colors backdrop-blur-md
                ${
                  isCorrectPick
                    ? "border-pink-400 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 glow-pink"
                    : isWrongPick
                      ? "border-rose-400 bg-rose-100/70 text-rose-700"
                      : "border-pink-200/70 bg-white/55 text-pink-700 hover:border-pink-300 hover:bg-white/75 dark:bg-white/10 dark:text-pink-100 dark:hover:bg-white/15"
                }
              `}
            >
              <span className="mr-2 text-sm font-bold opacity-60">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
              {isCorrectPick && (
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl"
                >
                  💖
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            className={`mx-auto mt-6 inline-block w-full rounded-full px-5 py-3 text-center text-base font-semibold ${
              feedback.type === "ok"
                ? "bg-gradient-to-r from-pink-200 to-purple-200 text-pink-700"
                : "bg-rose-100 text-rose-600"
            }`}
          >
            {feedback.text}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
