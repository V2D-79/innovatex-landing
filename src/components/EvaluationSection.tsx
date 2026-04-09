import { FadeIn } from "@/components/FadeIn";
import { Sparkles, Wrench, Target, Mic, HeartHandshake } from "lucide-react";

const criteria = [
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Originality and creativity of the idea. How uniquely does it solve the problem?",
    score: "25%",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Wrench,
    title: "Technical Implementation",
    description: "Quality, complexity, and completeness of the technical solution built.",
    score: "25%",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Target,
    title: "Practical Use",
    description: "Real-world applicability, feasibility, and impact of the proposed solution.",
    score: "20%",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Mic,
    title: "Presentation",
    description: "Clarity, confidence, and effectiveness of the final demo and pitch.",
    score: "20%",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: HeartHandshake,
    title: "Teamwork",
    description: "Collaboration, communication, and how well the team worked together.",
    score: "10%",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

export function EvaluationSection() {
  return (
    <section id="evaluation" className="section-padding bg-obsidian relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up" className="text-center mb-gr-2xl">
          <span className="font-mono text-gr-xs text-accent tracking-widest uppercase">Judging</span>
          <h2 className="mt-gr-md text-gr-xl md:text-gr-xl font-black tracking-tight">
            <span className="text-foreground">Evaluation </span>
            <span className="text-gradient-violet">Criteria</span>
          </h2>
          <p className="mt-gr-md text-muted-foreground max-w-xl mx-auto">
            How we score your masterpiece. Build smart, present boldly.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-gr-lg">
          {criteria.map((c, i) => {
            const Icon = c.icon;
            return (
              <FadeIn
                key={i}
                direction="up"
                delay={i * 70}
                className="glass-card rounded-gr-lg border p-gr-lg text-center group hover:border-primary/30 hover:shadow-premium-hover transition-all duration-500 hover:scale-[1.04] cursor-default"
              >
                {/* φ-proportioned icon container */}
                <div className={`w-[55px] h-[34px] rounded-gr ${c.bg} flex items-center justify-center mx-auto mb-gr-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className={c.color} />
                </div>
                <div className="text-gr-lg font-black text-gradient-violet mb-gr-sm">{c.score}</div>
                <h3 className="text-gr-sm font-bold text-foreground mb-gr-sm">{c.title}</h3>
                <p className="text-gr-xs text-muted-foreground leading-relaxed">{c.description}</p>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
