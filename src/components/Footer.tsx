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
          {/* <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 rounded-lg glass-card border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-glow-violet transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div> */}


          {/* Socials - Custom UI */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="flex flex-col gap-2">

              {/* Top Row */}
              <div className="flex gap-2">

                {/* Instagram */}
                <a href="#" className="group">
                  <div className="w-16 h-16 rounded-[90px_8px_8px_8px] bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-pink-500">
                    <Instagram className="text-pink-400 group-hover:text-white" size={20} />
                  </div>
                </a>

                {/* Twitter */}
                <a href="#" className="group">
                  <div className="w-16 h-16 rounded-[8px_90px_8px_8px] bg-gradient-to-br from-sky-500/20 to-sky-600/10 backdrop-blur border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-sky-500">
                    <Twitter className="text-sky-400 group-hover:text-white" size={20} />
                  </div>
                </a>

              </div>

              {/* Bottom Row */}
              <div className="flex gap-2">

                {/* GitHub */}
                <a href="#" className="group">
                  <div className="w-16 h-16 rounded-[8px_8px_8px_90px] bg-gradient-to-br from-gray-500/20 to-gray-700/10 backdrop-blur border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-black">
                    <Github className="text-gray-300 group-hover:text-white" size={20} />
                  </div>
                </a>

                {/* Discord (replace Linkedin) */}
                <a href="#" className="group">
                  <div className="w-16 h-16 rounded-[8px_8px_90px_8px] bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 backdrop-blur border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-indigo-500">
                    <svg
                      viewBox="0 0 48 48"
                      className="w-5 h-5 text-indigo-300 group-hover:text-white"
                      fill="currentColor"
                    >
                      <path d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z" />
                    </svg>
                  </div>
                </a>

              </div>
            </div>
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
