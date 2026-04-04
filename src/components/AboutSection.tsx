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
      {/* Decorative orbs — reduced to one to cut GPU rasterization */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <FadeIn direction="left">
            <span className="font-mono text-xs text-accent tracking-widest uppercase">Who We Are</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight mb-6">
              <span className="text-foreground">About </span>
              <span className="text-gradient-violet">INNOVEX</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
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
            <div className="flex flex-wrap gap-2 mt-8">
              {["ISTE CSE", "K.I.T. Kolhapur", "Innovation", "Technology", "Teamwork"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full glass-card border text-xs font-mono text-accent border-accent/20 transition-colors hover:bg-accent/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Stats + Visual */}
          <FadeIn direction="right" delay={150} className="flex flex-col gap-6">
            {/* Glowing ring visual — replaced infinite spinning with static styled rings */}
            <div className="relative flex items-center justify-center h-64">
              <div className="absolute w-48 h-48 rounded-full border border-primary/20 rotate-45" />
              <div className="absolute w-36 h-36 rounded-full border border-accent/20 -rotate-12" />
              <div className="absolute w-24 h-24 rounded-full border border-secondary/20 rotate-90" />
              <div className="w-16 h-16 rounded-full bg-gradient-violet flex items-center justify-center shadow-glow-violet transition-transform hover:scale-110 duration-500 cursor-default">
                <span className="font-mono font-bold text-foreground text-sm">2026</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <FadeIn
                  key={i}
                  direction="up"
                  delay={i * 100}
                  className="glass-card rounded-xl p-5 border text-center hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-3xl font-black text-gradient-violet">{stat.value}</div>
                  <div className="font-mono text-xs text-accent mt-1">{stat.suffix}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
