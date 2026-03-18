import { useState, useLayoutEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronDown, Zap } from "lucide-react";
import { SplineScene } from "@/components/ui/spline";

export function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const scrollToAbout = useCallback(() => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToDomains = useCallback(() => {
    document.querySelector("#domains")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-obsidian">

      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Mobile Spline as background */}
      {!isDesktop && (
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full opacity-20">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-obsidian/70" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6">

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 lg:min-h-screen pt-20 lg:pt-0 pb-6 lg:pb-0">


          {/* TEXT BLOCK */}
          <div className="flex-1 w-full text-center lg:text-left flex flex-col items-center lg:items-start gap-5 lg:gap-8 lg:pt-20">

            {/* Main Title */}
            {/* <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-7xl sm:text-8xl md:text-8xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none"
            >
              <span className="block text-foreground">INNO</span>
              <span className="block text-gradient-violet">VEX</span>
            </motion.h1> */}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-7xl sm:text-8xl md:text-8xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none"
            >
              <span className="text-foreground">INNO</span>
              <span className="text-gradient-violet">VEX</span>
            </motion.h1>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-accent tracking-wider uppercase">
                Mini Hackathon 2026
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl font-light text-muted-foreground tracking-widest uppercase font-mono"
            >
              Innovate. Create. Elevate.
            </motion.p>

            {/* Event Info pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 text-sm text-muted-foreground w-full"
            >
              <div className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-xl w-full sm:w-auto justify-center">
                <Calendar size={15} className="text-accent flex-shrink-0" />
                <span className="font-mono text-sm">04 April 2026</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-xl w-full sm:w-auto justify-center">
                <MapPin size={15} className="text-primary flex-shrink-0" />
                <span className="font-mono text-sm">K.I.T. College, Kolhapur</span>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 w-full sm:w-auto"
            >
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-violet font-bold text-foreground shadow-glow-violet hover:shadow-glow-blue transition-all duration-300 hover:scale-105 overflow-hidden active:scale-[0.98] text-base"
              >
                <Zap size={16} className="relative z-10" />
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-gradient-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <button
                onClick={scrollToDomains}
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card border font-semibold text-foreground hover:border-primary/50 hover:shadow-glow-violet transition-all duration-300 hover:scale-105 active:scale-[0.98] text-base"
              >
                View Domains
              </button>
            </motion.div>

            {/* Scroll indicator — desktop */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              onClick={scrollToAbout}
              className="hidden lg:flex flex-col items-start gap-2 text-muted-foreground hover:text-foreground transition-colors mt-4"
            >
              <span className="font-mono text-xs tracking-wider">SCROLL</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ChevronDown size={20} />
              </motion.div>
            </motion.button>
          </div>

          {/* Desktop Spline panel */}
          {isDesktop && (
            <div className="flex-1 relative w-full h-[500px] lg:h-[600px] xl:h-[700px]">
              <div className="absolute inset-0">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={scrollToAbout}
          className="flex lg:hidden flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto pb-4"
        >
          <span className="font-mono text-xs tracking-wider">SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>

      </div>
    </section>
  );
}