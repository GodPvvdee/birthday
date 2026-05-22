"use client";

import { useEffect, useState } from "react";

type Heart = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
  opacity: number;
};

const EMOJIS = ["💕", "💖", "💗", "💓", "💘", "🌸", "✨", "🌺"];

export default function FloatingHearts({ count = 18 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 26,
      duration: 10 + Math.random() * 12,
      delay: Math.random() * 12,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      opacity: 0.4 + Math.random() * 0.5,
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-40px] select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
            filter: "drop-shadow(0 0 8px rgba(255,105,180,0.35))",
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
