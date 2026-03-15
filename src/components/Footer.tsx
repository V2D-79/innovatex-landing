import { motion } from "framer-motion";
import { Zap, Github, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian border-t border-border overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
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

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {["About", "Domains", "Event Flow", "Rules", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Instagram, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
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

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © {year} INNOVEX. Organized by ISTE CSE, K.I.T. College of Engineering, Kolhapur.
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
