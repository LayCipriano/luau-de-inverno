import { useMemo } from "react";

const LEAF_PATHS = [
  // simple leaf shapes
  "M32 2C18 14 6 26 6 40c0 14 12 22 26 22s26-8 26-22C58 26 46 14 32 2z",
  "M32 4C20 4 8 18 8 34c0 16 10 26 24 26s24-10 24-26C56 18 44 4 32 4zM32 12v44",
  "M32 2c-6 10-22 18-22 32 0 12 10 22 22 22s22-10 22-22C54 20 38 12 32 2z",
];

const COLORS = [
  "oklch(0.65 0.2 30)",   // burnt orange
  "oklch(0.72 0.18 50)",  // amber
  "oklch(0.55 0.18 25)",  // deep red
  "oklch(0.78 0.15 70)",  // gold
];

interface Leaf {
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  path: string;
  rotateStart: number;
  drift: number;
  opacity: number;
}

export function FallingLeaves({ count = 18 }: { count?: number }) {
  const leaves = useMemo<Leaf[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = i * 9301 + 49297;
      const r = (n: number) => ((Math.sin(seed * (n + 1)) + 1) / 2);
      return {
        left: r(1) * 100,
        delay: r(2) * -18,
        duration: 12 + r(3) * 14,
        size: 18 + r(4) * 28,
        color: COLORS[Math.floor(r(5) * COLORS.length)],
        path: LEAF_PATHS[Math.floor(r(6) * LEAF_PATHS.length)],
        rotateStart: r(7) * 360,
        drift: (r(8) - 0.5) * 200,
        opacity: 0.5 + r(9) * 0.4,
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[5]" aria-hidden="true">
      {leaves.map((leaf, i) => (
        <span
          key={i}
          className="absolute -top-16 will-change-transform"
          style={{
            left: `${leaf.left}%`,
            width: leaf.size,
            height: leaf.size,
            opacity: leaf.opacity,
            animation: `leaf-fall ${leaf.duration}s linear ${leaf.delay}s infinite`,
            ["--drift" as string]: `${leaf.drift}px`,
            ["--rot" as string]: `${leaf.rotateStart}deg`,
          }}
        >
          <svg
            viewBox="0 0 64 64"
            className="w-full h-full"
            style={{
              animation: `leaf-spin ${4 + (i % 5)}s ease-in-out infinite`,
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
            }}
          >
            <path d={leaf.path} fill={leaf.color} />
          </svg>
        </span>
      ))}
    </div>
  );
}
