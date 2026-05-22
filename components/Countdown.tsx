"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SINCE = new Date("2021-08-01T00:00:00").getTime();

type Diff = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getDiff(): Diff {
  const now = Date.now();
  const ms = Math.max(0, now - SINCE);
  const totalSec = Math.floor(ms / 1000);
  const totalMin = Math.floor(totalSec / 60);
  const totalHr = Math.floor(totalMin / 60);
  const totalDays = Math.floor(totalHr / 24);
  const years = Math.floor(totalDays / 365.25);
  const days = Math.floor(totalDays - years * 365.25);
  const hours = totalHr % 24;
  const minutes = totalMin % 60;
  const seconds = totalSec % 60;
  return { years, days, hours, minutes, seconds };
}

const labels: [keyof Diff, string][] = [
  ["years", "years"],
  ["days", "days"],
  ["hours", "hours"],
  ["minutes", "minutes"],
  ["seconds", "seconds"],
];

export default function Countdown() {
  const [diff, setDiff] = useState<Diff | null>(null);

  useEffect(() => {
    setDiff(getDiff());
    const id = window.setInterval(() => setDiff(getDiff()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="glass w-full rounded-3xl px-6 py-8 sm:px-10">
      <p className="text-center font-display text-2xl text-gradient sm:text-3xl">
        Time since we first met
      </p>
      <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-4">
        {labels.map(([key, label]) => (
          <div
            key={key}
            className="flex flex-col items-center rounded-2xl bg-white/40 px-2 py-4 backdrop-blur-md dark:bg-white/10"
          >
            <motion.span
              key={diff?.[key] ?? 0}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="font-display text-3xl text-pink-500 sm:text-4xl"
            >
              {diff?.[key].toString().padStart(2, "0") ?? "--"}
            </motion.span>
            <span className="mt-1 text-[10px] uppercase tracking-widest text-pink-700/70 sm:text-xs dark:text-pink-100/70">
              {label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs italic text-pink-500/70">
        every second of it, the best of my life 💕
      </p>
    </div>
  );
}
