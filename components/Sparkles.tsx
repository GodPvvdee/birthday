"use client";

import { useEffect, useState } from "react";

type Spark = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
};

export default function Sparkles({ count = 30 }: { count?: number }) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const generated: Spark[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 4 + Math.random() * 10,
      delay: Math.random() * 3,
      duration: 1.6 + Math.random() * 2.4,
    }));
    setSparks(generated);
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,182,213,0.6) 40%, rgba(255,182,213,0) 70%)",
            animation: `sparkle-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
