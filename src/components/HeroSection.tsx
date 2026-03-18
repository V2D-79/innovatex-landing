import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { SplineScene } from "@/components/ui/spline";

export function HeroSection() {

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

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

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
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

      {/* ─── MOBILE: Robot as full-screen background ─── */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <div className="w-full h-full opacity-30">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-obsidian/60" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-screen pt-20 lg:pt-0">

          {/* LEFT SIDE TEXT — centered on mobile, left-aligned on desktop */}
          <div className="flex-1 text-center lg:text-left space-y-8 pt-15 pb-6 lg:pt-20 lg:pb-0 flex flex-col items-center lg:items-start">

           

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none"
            >
              <span className="block text-foreground">INNO</span>
              <span className="block text-gradient-violet">VEX</span>
            </motion.h1>

             {/* Badge */}
             
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-accent tracking-wider uppercase">
                Mini Hackathon 2026
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl font-light text-muted-foreground tracking-widest uppercase font-mono"
            >
              Innovate. Create. Elevate.
            </motion.p>

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-muted-foreground"
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

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-4"
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
                onClick={() =>
                  document
                    .querySelector("#domains")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-xl glass-card border font-semibold text-foreground hover:border-primary/50 hover:shadow-glow-violet transition-all duration-300 hover:scale-105"
              >
                View Domains
              </button>

            </motion.div>

            {/* Scroll Indicator — desktop only */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              onClick={scrollToAbout}
              className="hidden lg:flex flex-col items-start gap-2 text-muted-foreground hover:text-foreground transition-colors mt-12"
            >
              <span className="font-mono text-xs tracking-wider">SCROLL</span>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </motion.button>

          </div>

          {/* RIGHT SIDE ROBOT — desktop only, hidden on mobile */}
          <div className="hidden lg:flex flex-1 relative w-full h-[400px] lg:h-[600px] xl:h-[700px]">
            <div className="absolute inset-0">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* Mobile Scroll */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={scrollToAbout}
          className="flex lg:hidden flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto mt-8 pb-8"
        >
          <span className="font-mono text-xs tracking-wider">SCROLL</span>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>

      </div>
    </section>
  );
}