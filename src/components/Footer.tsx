import { motion } from "framer-motion";
import { Zap, Github, Twitter, Linkedin, Instagram } from "lucide-react";

const footerNavLinks = [
  { label: "About", href: "#about" },
  { label: "Domains", href: "#domains" },
  { label: "Event Flow", href: "#event-flow" },
  { label: "Rules", href: "#rules" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Instagram, href: "#" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian border-t border-border overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* Main footer row */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:items-start">

          {/* Brand block */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl bg-gradient-violet opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap size={18} className="text-foreground" />
                </div>
              </div>
              <div>
                <span className="font-black text-xl tracking-tight">
                  <span className="text-gradient-violet">INNO</span>
                  <span className="text-foreground">VEX</span>
                </span>
                <p className="text-xs text-muted-foreground font-mono">Mini Hackathon 2026</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-mono text-center md:text-left max-w-[200px]">
              Organized by ISTE CSE · K.I.T. Kolhapur
            </p>
          </div>

          {/* Nav links — 2 rows on mobile, 1 row on desktop */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 max-w-xs md:max-w-none">
            {footerNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 rounded-lg glass-card border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-glow-violet transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono text-center sm:text-left">
            © {year} INNOVEX. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-muted-foreground font-mono">Registrations Open</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
