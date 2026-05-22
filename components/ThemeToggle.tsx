"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08, rotate: isDark ? -15 : 15 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="glass relative flex h-11 w-11 items-center justify-center rounded-full overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.4 }}
          className="text-lg"
        >
          {isDark ? "🌙" : "☀️"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
