import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { SplineScene } from "@/components/ui/spline";

export function HeroSection() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian">
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

      {/* Spline 3D - Background Layer */}
      <div className="absolute inset-0 z-10 opacity-80">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center pt-20">
        {/* Event Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs text-accent tracking-wider uppercase">
            Mini Hackathon 2026
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-6"
        >
          <span className="block text-foreground">INNO</span>
          <span className="block text-gradient-violet">VEX</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl font-light text-muted-foreground mb-4 tracking-widest uppercase font-mono"
        >
          Innovate. Create. Elevate.
        </motion.p>

        {/* Event Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
            <Calendar size={16} className="text-accent" />
            <span className="font-mono">04 April 2026</span>
          </div>
          <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
            <MapPin size={16} className="text-primary" />
            <span className="font-mono">K.I.T. College, Kolhapur</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
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
          className="mt-20 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto"
        >
          <span className="font-mono text-xs tracking-wider">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
