import { useEffect, useRef, useState } from "react";

interface Dot {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  isMerged: boolean;
  mergeTime?: number;
}

const MERGE_DISTANCE = 50;
const SPLIT_DELAY = 2000;
const GREEN_COLOR = "hsl(var(--primary))";
const YELLOW_COLOR = "hsl(48, 95%, 53%)";

export const BouncingDots = () => {
  const [dots, setDots] = useState<Dot[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Initialize dots with random positions and velocities
    const initialDots: Dot[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      size: 16,
      color: GREEN_COLOR,
      isMerged: false,
    }));

    setDots(initialDots);

    const animate = () => {
      setDots((prevDots) => {
        const rect = container.getBoundingClientRect();
        const newDots: Dot[] = [];
        const processed = new Set<number>();

        prevDots.forEach((dot, i) => {
          if (processed.has(dot.id)) return;

          // Check for splits
          if (dot.isMerged && dot.mergeTime && Date.now() - dot.mergeTime > SPLIT_DELAY) {
            // Split into two green dots
            const angle1 = Math.random() * Math.PI * 2;
            const angle2 = angle1 + Math.PI;
            newDots.push({
              id: Date.now() + Math.random(),
              x: dot.x,
              y: dot.y,
              vx: Math.cos(angle1) * 3,
              vy: Math.sin(angle1) * 3,
              size: 16,
              color: GREEN_COLOR,
              isMerged: false,
            });
            newDots.push({
              id: Date.now() + Math.random() + 1,
              x: dot.x,
              y: dot.y,
              vx: Math.cos(angle2) * 3,
              vy: Math.sin(angle2) * 3,
              size: 16,
              color: GREEN_COLOR,
              isMerged: false,
            });
            processed.add(dot.id);
            return;
          }

          // Check for collisions with other dots
          let merged = false;
          for (let j = i + 1; j < prevDots.length; j++) {
            const other = prevDots[j];
            if (processed.has(other.id)) continue;

            const dx = dot.x - other.x;
            const dy = dot.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MERGE_DISTANCE && !dot.isMerged && !other.isMerged) {
              // Merge dots
              const mergedDot: Dot = {
                id: Date.now() + Math.random(),
                x: (dot.x + other.x) / 2,
                y: (dot.y + other.y) / 2,
                vx: (dot.vx + other.vx) / 2,
                vy: (dot.vy + other.vy) / 2,
                size: 24,
                color: YELLOW_COLOR,
                isMerged: true,
                mergeTime: Date.now(),
              };
              newDots.push(mergedDot);
              processed.add(dot.id);
              processed.add(other.id);
              merged = true;
              break;
            }
          }

          if (merged) return;

          // Update position
          let newX = dot.x + dot.vx;
          let newY = dot.y + dot.vy;
          let newVx = dot.vx;
          let newVy = dot.vy;

          // Bounce off walls
          if (newX <= 0 || newX >= rect.width) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(rect.width, newX));
          }
          if (newY <= 0 || newY >= rect.height) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(rect.height, newY));
          }

          newDots.push({
            ...dot,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          });
          processed.add(dot.id);
        });

        return newDots;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full transition-all duration-300"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            opacity: 0.3,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};
