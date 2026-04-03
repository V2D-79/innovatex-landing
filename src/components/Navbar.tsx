import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Domains", href: "#domains" },
  { label: "Event Flow", href: "#event-flow" },
  { label: "Evaluation", href: "#evaluation" },
  { label: "Rules", href: "#rules" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-card border-b py-3" : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">

          {/* ── LEFT: KIT Logo + INNOVEX brand ── */}
          <a href="#" className="flex items-center gap-3 group min-w-0">

            {/* KIT College logo */}
            <div className="relative flex-shrink-0">
              <img
                src="/img/kitlogo.png"
                alt="K.I.T. College"
                className="h-12 w-26 object-cover rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                style={{ filter: "drop-shadow(0 0 6px hsl(263 85% 65% / 0.4))" }}
              />
            </div>

            {/* Vertical divider */}
            <div className="w-px h-7 bg-border flex-shrink-0" />

            {/* INNOVEX wordmark */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="relative w-7 h-7">
                <div className="absolute inset-0 rounded-md bg-gradient-violet opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap size={14} className="text-foreground" />
                </div>
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight leading-none">
                <span className="text-gradient-violet">INNO</span>
                <span className="text-foreground">VEX</span>
              </span>
            </div>
          </a>

          {/* ── CENTRE: Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-1 left-3 right-3 h-px bg-gradient-violet scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </nav>

          {/* ── RIGHT: Desktop CTA + Mobile Hamburger ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex px-5 py-2 text-sm font-semibold rounded-lg bg-gradient-violet text-foreground shadow-glow-violet hover:shadow-glow-blue transition-all duration-300 hover:scale-105"
            >
              Register Now
            </a>

            {/* Mobile Hamburger */}
            <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl glass-card border text-foreground hover:border-primary/40 transition-all duration-200 active:scale-95"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={19} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={19} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Full-screen mobile menu overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-obsidian/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed left-0 right-0 z-50 md:hidden"
              style={{ top: "64px" }}
            >
              <div className="mx-3 mt-2 rounded-2xl glass-card border border-primary/20 overflow-hidden shadow-glow-violet">

                <div className="flex items-center gap-3 px-5 py-3 border-b border-border/60 bg-primary/5">
                 <img
                src="/img/kitlogo.png"
                alt="K.I.T. College"
                className="h-12 w-26 object-cover rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                style={{ filter: "drop-shadow(0 0 6px hsl(263 85% 65% / 0.4))" }}
              />
                  <div>
                    <p className="text-xs font-semibold text-foreground leading-none">K.I.T. College of Engineering</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">ISTE CSE · Kolhapur</p>
                  </div>
                </div>

                <nav className="flex flex-col p-3">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.22 }}
                      onClick={() => handleNavClick(link.href)}
                      className="flex items-center justify-between w-full px-4 py-4 rounded-xl text-left text-foreground hover:bg-primary/10 active:bg-primary/20 transition-colors duration-150 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-semibold text-base">{link.label}</span>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    </motion.button>
                  ))}
                </nav>

                <div className="h-px bg-border mx-4" />
                <div className="p-4">
                  <motion.a
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.22 }}
                    href="https://forms.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-violet text-foreground font-bold text-base shadow-glow-violet active:scale-[0.98] transition-transform duration-150"
                  >
                    <Zap size={16} />
                    Register Now
                  </motion.a>
                  <p className="text-center text-xs text-muted-foreground font-mono mt-3 pb-1">
                    04 April 2026 · K.I.T. College, Kolhapur
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}