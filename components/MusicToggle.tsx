"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MUSIC_SRC =
  "https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;
    setReady(true);
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <motion.button
      onClick={toggle}
      disabled={!ready}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      animate={
        playing
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
      aria-label={playing ? "Pause music" : "Play music"}
      className="glass relative flex h-11 w-11 items-center justify-center rounded-full text-pink-500 transition-colors hover:text-pink-600"
    >
      <span className="text-lg">{playing ? "🎶" : "🎵"}</span>
      {playing && (
        <span className="pointer-events-none absolute -bottom-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-pink-500" />
        </span>
      )}
    </motion.button>
  );
}
