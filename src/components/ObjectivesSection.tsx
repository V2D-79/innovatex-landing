import { FadeIn } from "@/components/FadeIn";
import { Lightbulb, Code, Users, Briefcase, Zap } from "lucide-react";

const objectives = [
  {
    icon: Lightbulb,
    title: "Fostering Innovation",
    description: "Spark creative thinking and encourage novel solutions to complex real-world challenges.",
    color: "text-accent",
    glow: "shadow-glow-cyan",
    bg: "bg-accent/10",
  },
  {
    icon: Code,
    title: "Enhancing Technical Skills",
    description: "Push boundaries with cutting-edge tech and sharpen engineering expertise under pressure.",
    color: "text-primary",
    glow: "shadow-glow-violet",
    bg: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Promoting Teamwork",
    description: "Cultivate collaboration, communication, and synergy within diverse, dynamic teams.",
    color: "text-secondary",
    glow: "shadow-glow-blue",
    bg: "bg-secondary/10",
  },
  {
    icon: Briefcase,
    title: "Industry Readiness",
    description: "Bridge the gap between academia and industry with practical, relevant problem statements.",
    color: "text-primary",
    glow: "shadow-glow-violet",
    bg: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Gaining Real-time Experience",
    description: "Experience the thrill of building under real constraints and time pressure.",
    color: "text-accent",
    glow: "shadow-glow-cyan",
    bg: "bg-accent/10",
  },
];

export function ObjectivesSection() {
  return (
    <section id="objectives" className="section-padding bg-obsidian relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="text-center mb-gr-2xl">
          <span className="font-mono text-gr-xs text-accent tracking-widest uppercase">Our Mission</span>
          <h2 className="mt-gr-md text-gr-xl md:text-gr-xl font-black tracking-tight">
            <span className="text-foreground">Core </span>
            <span className="text-gradient-violet">Objectives</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gr-lg">
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <FadeIn
                key={i}
                direction="up"
                delay={i * 80}
                className={`glass-card rounded-gr-lg p-gr-xl border group hover:border-primary/30 hover:${obj.glow} hover:shadow-premium-hover transition-all duration-500 hover:scale-[1.02] cursor-default ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* φ-proportioned icon container: 55×34 ≈ 1.618 */}
                <div className={`w-[55px] h-[34px] rounded-gr ${obj.bg} flex items-center justify-center mb-gr-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className={obj.color} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-gr-sm">{obj.title}</h3>
                <p className="text-gr-sm text-muted-foreground leading-relaxed">{obj.description}</p>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
