import { Zap } from "lucide-react";

const footerNavLinks = [
  { label: "About", href: "#about" },
  { label: "Domains", href: "#domains" },
  { label: "Event Flow", href: "#event-flow" },
  { label: "Rules", href: "#rules" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    color: "hover:text-pink-300 hover:border-pink-500/30 hover:bg-pink-500/10 hover:shadow-[0_0_14px_rgba(244,114,182,0.15)]",
    iconColor: "text-pink-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    color: "hover:text-sky-300 hover:border-sky-500/30 hover:bg-sky-500/10 hover:shadow-[0_0_14px_rgba(96,165,250,0.15)]",
    iconColor: "text-sky-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    color: "hover:text-slate-300 hover:border-slate-500/30 hover:bg-slate-500/10 hover:shadow-[0_0_14px_rgba(148,163,184,0.12)]",
    iconColor: "text-slate-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    color: "hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:shadow-[0_0_14px_rgba(129,140,248,0.18)]",
    iconColor: "text-indigo-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
      </svg>
    ),
  },
];

// Split socials into two rows of 2
const socialRow1 = socialLinks.slice(0, 2);
const socialRow2 = socialLinks.slice(2, 4);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian border-t border-border overflow-hidden">

      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      {/* Golden Ratio padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-gr-2xl">

        {/* Main footer row */}
        <div className="flex flex-col items-center gap-gr-xl md:flex-row md:justify-between md:items-start">

          {/* ── Brand block ── */}
          <div className="flex flex-col items-center md:items-start gap-gr-md">
            <div className="flex items-center gap-gr-md">
              <div className="relative w-[42px] h-[42px]">
                <div className="absolute inset-0 rounded-gr bg-gradient-violet opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap size={18} className="text-foreground" />
                </div>
              </div>
              <div>
                <span className="font-black text-xl tracking-tight">
                  <span className="text-gradient-violet">INNO</span>
                  <span className="text-foreground">VEX</span>
                </span>
                <p className="text-gr-xs text-muted-foreground font-mono">Mini Hackathon 2026</p>
              </div>
            </div>
            <p className="text-gr-xs text-muted-foreground font-mono text-center md:text-left max-w-[200px]">
              Organized by ISTE CSE · K.I.T. Kolhapur
            </p>
          </div>

          {/* ── Nav links ── */}
          <nav className="flex flex-wrap items-center justify-center gap-x-gr-xs gap-y-gr-sm max-w-xs md:max-w-none">
            {footerNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-gr-xs sm:text-gr-sm text-muted-foreground hover:text-foreground transition-colors font-mono px-gr-sm py-gr-xs group"
              >
                {link.label}
                {/* Animated underline */}
                <span className="absolute bottom-1 left-2.5 w-0 group-hover:w-[calc(100%-1.25rem)] h-px bg-primary transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* ── Classic Pill Socials ── */}
          <div className="flex flex-col items-center md:items-end gap-gr-sm">
            <p className="text-gr-xs font-mono tracking-widest text-muted-foreground/50 uppercase">
              Follow us
            </p>

            {/* Row 1 */}
            <div className="flex gap-gr-sm">
              {socialRow1.map(({ label, href, color, iconColor, icon }) => (
                <a
                  key={label}
                  href={href}
                  className={`
                    flex items-center gap-gr-sm px-gr-md py-gr-sm rounded-full
                    border border-white/[0.07] bg-white/[0.03]
                    text-gr-xs font-mono tracking-wide text-muted-foreground/60
                    transition-all duration-250
                    ${color}
                  `}
                >
                  <span className={`${iconColor} transition-colors duration-250`}>
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-gr-sm">
              {socialRow2.map(({ label, href, color, iconColor, icon }) => (
                <a
                  key={label}
                  href={href}
                  className={`
                    flex items-center gap-gr-sm px-gr-md py-gr-sm rounded-full
                    border border-white/[0.07] bg-white/[0.03]
                    text-gr-xs font-mono tracking-wide text-muted-foreground/60
                    transition-all duration-250
                    ${color}
                  `}
                >
                  <span className={`${iconColor} transition-colors duration-250`}>
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-gr-xl pt-gr-lg border-t border-border flex flex-col sm:flex-row items-center justify-between gap-gr-md">
          <p className="text-gr-xs text-muted-foreground font-mono text-center sm:text-left">
            © {year} INNOVEX. All rights reserved.
          </p>
          <div className="flex items-center gap-gr-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-gr-xs text-muted-foreground font-mono">Registrations Open</span>
          </div>
        </div>

      </div>
    </footer>
  );
}