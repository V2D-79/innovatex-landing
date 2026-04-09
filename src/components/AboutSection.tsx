import { FadeIn } from "@/components/FadeIn";

export function AboutSection() {
  const stats = [
    { value: "6", label: "Hours", suffix: "HR" },
    { value: "15", label: "Teams", suffix: "MAX" },
    { value: "3", label: "Domains", suffix: "+" },
    { value: "1", label: "Day Event", suffix: "DAY" },
  ];

  return (
    <section id="about" className="section-padding bg-obsidian relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      {/* Section divider at top */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-7xl mx-auto">
        {/* Golden Ratio grid: 1.618fr : 1fr */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-gr-2xl items-center">
          {/* Text */}
          <FadeIn direction="left">
            <span className="font-mono text-gr-xs text-accent tracking-widest uppercase">Who We Are</span>
            <h2 className="mt-gr-md text-gr-xl md:text-gr-xl font-black tracking-tight mb-gr-lg">
              <span className="text-foreground">About </span>
              <span className="text-gradient-violet">INNOVEX</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-gr-lg">
              INNOVEX is a Mini Hackathon organized by{" "}
              <span className="text-foreground font-medium">ISTE CSE</span>. It provides students an
              opportunity to solve real-world problems and build innovative technology solutions while
              working collaboratively in teams.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Participants will engage in a thrilling 6-hour sprint, designing and developing solutions
              across diverse domains — from Artificial Intelligence to Smart IoT and Future Technologies.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-gr-sm mt-gr-lg">
              {["ISTE CSE", "K.I.T. Kolhapur", "Innovation", "Technology", "Teamwork"].map((tag) => (
                <span
                  key={tag}
                  className="px-gr-md py-gr-xs rounded-full glass-card border text-gr-xs font-mono text-accent border-accent/20 transition-all duration-300 hover:bg-accent/10 hover:border-accent/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Stats + Visual */}
          <FadeIn direction="right" delay={150} className="flex flex-col gap-gr-lg">
            {/* Glowing ring visual — Golden Ratio sized rings */}
            <div className="relative flex items-center justify-center h-64">
              <div className="absolute w-[194px] h-[194px] rounded-full border border-primary/20 rotate-45" /> {/* 120 × φ */}
              <div className="absolute w-[120px] h-[120px] rounded-full border border-accent/20 -rotate-12" />
              <div className="absolute w-[74px] h-[74px] rounded-full border border-secondary/20 rotate-90" /> {/* 120 / φ */}
              <div className="w-[46px] h-[46px] rounded-full bg-gradient-violet flex items-center justify-center shadow-glow-violet transition-transform hover:scale-110 duration-500 cursor-default"> {/* 74 / φ */}
                <span className="font-mono font-bold text-foreground text-gr-xs">2026</span>
              </div>
            </div>

            {/* Stats Grid — Golden Ratio padding */}
            <div className="grid grid-cols-2 gap-gr-md">
              {stats.map((stat, i) => (
                <FadeIn
                  key={i}
                  direction="up"
                  delay={i * 100}
                  className="glass-card rounded-gr-lg p-gr-lg border text-center hover:border-primary/30 hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-3xl font-black text-gradient-violet">{stat.value}</div>
                  <div className="font-mono text-gr-xs text-accent mt-gr-xs">{stat.suffix}</div>
                  <div className="text-gr-xs text-muted-foreground mt-gr-xs">{stat.label}</div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
