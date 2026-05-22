"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// "Beyond" — Leon Bridges (Good Thing, 2018)
// https://open.spotify.com/track/1Omt5bfz1tZUCqd26HxbS0
const SPOTIFY_EMBED =
  "https://open.spotify.com/embed/track/1Omt5bfz1tZUCqd26HxbS0?utm_source=generator&theme=0";

export default function MusicToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-end">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={
          open
            ? {
                boxShadow: [
                  "0 0 12px rgba(255,105,180,0.5)",
                  "0 0 28px rgba(255,105,180,0.8)",
                  "0 0 12px rgba(255,105,180,0.5)",
                ],
              }
            : { boxShadow: "0 0 12px rgba(255,105,180,0.3)" }
        }
        transition={{ duration: 2, repeat: Infinity }}
        aria-label={open ? "Hide music player" : "Show music player"}
        aria-expanded={open}
        className="glass relative flex h-11 w-11 items-center justify-center rounded-full text-pink-500 transition-colors hover:text-pink-600"
      >
        <span className="text-lg">{open ? "🎶" : "🎵"}</span>
        {open && (
          <span className="pointer-events-none absolute -bottom-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-pink-500" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass absolute right-0 top-[52px] w-[320px] overflow-hidden rounded-2xl p-2 shadow-xl"
          >
            <iframe
              title="Beyond by Leon Bridges"
              src={SPOTIFY_EMBED}
              width="100%"
              height="152"
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
            <p className="px-2 pt-1 pb-1 text-[10px] text-pink-500/80">
              💕 tap play — log in to Spotify for the full song
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
