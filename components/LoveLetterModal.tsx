"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Sparkles from "./Sparkles";

const LETTER = `My love,

If I'm being honest, I rewrote this letter about ten times — because no version felt big enough to hold what you mean to me. I tried to be poetic. I tried to be funny. In the end, I think the truest thing I can say is this:

Loving you is the easiest thing I have ever done.

You are my favorite room in every house, my favorite hour of every day, my favorite reason to come home. You make the ordinary feel like a celebration and the hard days feel survivable. When the world is loud, you are the soft place I look for.

So today, on the day the world got you — thank you. Thank you for being kind in a way that makes me want to be better. Thank you for laughing at my bad jokes. Thank you for letting me love you out loud.

Happy birthday, my whole heart.

Forever yours,
Me 💕`;

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoveLetterModal({ open, onClose }: Props) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    setTyped("");
    setDone(false);
    let i = 0;
    const tick = () => {
      i++;
      setTyped(LETTER.slice(0, i));
      if (i >= LETTER.length) {
        setDone(true);
        return;
      }
      const ch = LETTER[i - 1];
      const delay = ch === "\n" ? 80 : ch === "." || ch === "," ? 90 : 22 + Math.random() * 22;
      timerRef.current = window.setTimeout(tick, delay);
    };
    timerRef.current = window.setTimeout(tick, 350);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [open]);

  const skip = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setTyped(LETTER);
    setDone(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-pink-900/40 px-4 py-8 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem]"
          >
            <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-12 sm:py-14">
              <Sparkles count={40} />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-pink-600 transition hover:bg-white/80"
              >
                ✕
              </button>

              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-5xl"
                >
                  💌
                </motion.div>
                <h3 className="mt-3 font-display text-3xl text-gradient sm:text-4xl">
                  A letter for you
                </h3>
              </div>

              <div className="relative z-10 mt-6 max-h-[55vh] overflow-y-auto pr-2 scrollbar-hide">
                <pre className="whitespace-pre-wrap font-serif-r text-lg leading-relaxed text-pink-800 dark:text-pink-50 sm:text-xl">
                  {typed}
                  {!done && (
                    <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-pink-500 align-middle" />
                  )}
                </pre>
              </div>

              <div className="relative z-10 mt-8 flex flex-col items-center gap-3">
                {!done ? (
                  <button
                    onClick={skip}
                    className="rounded-full bg-white/60 px-5 py-2 text-sm font-medium text-pink-600 backdrop-blur transition hover:bg-white/80"
                  >
                    skip the typing
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="rounded-2xl bg-white/55 px-5 py-4 backdrop-blur-md dark:bg-white/10">
                      <p className="text-center text-sm text-pink-700 dark:text-pink-100">
                        🎬 a little video / voice memo lives here when you&apos;re
                        ready — just drop it in <code className="font-mono text-xs">/public/message.mp4</code>
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-3 font-semibold text-white shadow-lg shadow-pink-300/40 transition hover:scale-105"
                    >
                      close with a kiss 💋
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
