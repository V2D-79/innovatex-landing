import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { SplineScene } from "@/components/ui/spline";

export function HeroSection() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-obsidian">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Grid Lines */}
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

      {/* Two-column layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20 pb-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0 min-h-[calc(100vh-80px)]">

          {/* LEFT — Text Content */}
          <div className="flex-1 flex flex-col justify-center lg:pr-12">
            {/* Event Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border mb-8 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-accent tracking-wider uppercase">
                Mini Hackathon 2026
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-7xl md:text-8xl lg:text-[7rem] xl:text-[9rem] font-black tracking-tight leading-none mb-6"
            >
              <span className="block text-foreground">INNO</span>
              <span className="block text-gradient-violet">VEX</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl font-light text-muted-foreground mb-6 tracking-widest uppercase font-mono"
            >
              Innovate. Create. Elevate.
            </motion.p>

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg text-sm text-muted-foreground">
                <Calendar size={15} className="text-accent" />
                <span className="font-mono">04 April 2026</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg text-sm text-muted-foreground">
                <MapPin size={15} className="text-primary" />
                <span className="font-mono">K.I.T. College, Kolhapur</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 rounded-xl bg-gradient-violet font-semibold text-foreground shadow-glow-violet hover:shadow-glow-blue transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-gradient-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <button
                onClick={() => document.querySelector("#domains")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 rounded-xl glass-card border font-semibold text-foreground hover:border-primary/50 hover:shadow-glow-violet transition-all duration-300 hover:scale-105"
              >
                View Domains
              </button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              onClick={scrollToAbout}
              className="mt-16 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              <span className="font-mono text-xs tracking-wider">SCROLL</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </motion.button>
          </div>

          {/* RIGHT — Spline 3D */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-1 w-full lg:w-auto h-[400px] md:h-[520px] lg:h-[680px] relative"
          >
            {/* Glow behind the 3D model */}
            <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-3xl" />
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
