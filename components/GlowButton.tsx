"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type Variant = "pink" | "purple" | "outline";

type Props = Omit<HTMLMotionProps<"button">, "ref"> & {
  variant?: Variant;
  children: React.ReactNode;
};

const variants: Record<Variant, string> = {
  pink:
    "bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white glow-pink",
  purple:
    "bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 text-white glow-purple",
  outline:
    "bg-white/40 text-pink-600 border border-pink-300/60 backdrop-blur",
};

const GlowButton = forwardRef<HTMLButtonElement, Props>(function GlowButton(
  { variant = "pink", className = "", children, ...rest },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold tracking-wide transition-all duration-300 animate-pulse-glow ${variants[variant]} ${className}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 hover:opacity-100"
      />
    </motion.button>
  );
});

export default GlowButton;
