import { useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
      initial={{ scaleX: 0 }}
    >
      <div className="h-full bg-gradient-violet w-full" />
    </motion.div>
  );
}

export function FloatingParticles() {
  const particles = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 10 + (i * 11) % 80, // evenly spread, no random recalc
    delay: i * 1.2,
    duration: 9 + (i % 3) * 2,
    size: 2 + (i % 3),
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/30 animate-particle-float"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
