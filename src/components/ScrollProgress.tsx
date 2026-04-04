import { useEffect, useState, useMemo } from "react";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      // Round to 3 decimal places to avoid excessive precision thrashing
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left bg-gradient-violet transition-transform duration-100 ease-out"
      style={{ transform: `scaleX(${scrollProgress})` }}
    />
  );
}

export function FloatingParticles() {
  const particles = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 10 + (i * 11) % 80, // evenly spread
    size: 2 + (i % 3),
    opacity: 0.1 + (i % 3) * 0.1,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${p.left}%`,
            top: `${15 + (p.id * 10)}%`, // Randomish static positions
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
