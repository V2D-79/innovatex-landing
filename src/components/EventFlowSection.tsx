import { FadeIn } from "@/components/FadeIn";
import { UserPlus, FileText, Clock, Presentation, Trophy } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Registration",
    description: "Form your team of 3–4 members and register online before the deadline. Only 15 teams will be shortlisted.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    glowColor: "shadow-glow-violet",
    dotColor: "bg-primary",
  },
  {
    number: "02",
    icon: FileText,
    title: "Idea Submission & Shortlisting",
    description: "Submit your innovative idea and abstract for review. Top teams will be selected for the main event.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
    glowColor: "shadow-glow-cyan",
    dotColor: "bg-accent",
  },
  {
    number: "03",
    icon: Clock,
    title: "6-Hour Hackathon",
    description: "The main event! Build your solution in a focused 6-hour sprint with mentors and resources available.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/30",
    glowColor: "shadow-glow-blue",
    dotColor: "bg-secondary",
  },
  {
    number: "04",
    icon: Presentation,
    title: "Presentation & Judging",
    description: "Demo your solution to a panel of expert judges. Articulate your idea, implementation, and impact.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    glowColor: "shadow-glow-violet",
    dotColor: "bg-primary",
  },
  {
    number: "05",
    icon: Trophy,
    title: "Winner Declaration",
    description: "Winners announced! Recognition, prizes, and glory await the most innovative teams.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
    glowColor: "shadow-glow-cyan",
    dotColor: "bg-accent",
  },
];

export function EventFlowSection() {
  return (
    <section id="event-flow" className="section-padding bg-obsidian relative overflow-hidden">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-4xl mx-auto">
        <FadeIn direction="up" className="text-center mb-gr-2xl">
          <span className="font-mono text-gr-xs text-accent tracking-widest uppercase">Schedule</span>
          <h2 className="mt-gr-md text-gr-xl md:text-gr-xl font-black tracking-tight">
            <span className="text-foreground">Event </span>
            <span className="text-gradient-violet">Flow</span>
          </h2>
        </FadeIn>

        {/* ─── MOBILE: clean left-side vertical timeline ─── */}
        <div className="md:hidden relative pl-gr-xl">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-transparent" />

          <div className="space-y-gr-lg">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn
                  key={i}
                  direction="left"
                  delay={i * 80}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-[21px] top-4 w-3 h-3 rounded-full ${step.dotColor} ring-2 ring-obsidian`} />

                  {/* Card — Golden Ratio padding */}
                  <div className={`glass-card rounded-gr-lg border p-gr-lg ${step.borderColor}`}>
                    <div className="flex items-start gap-gr-md">
                      <div className={`w-[42px] h-[42px] rounded-gr ${step.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={18} className={step.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-gr-sm mb-gr-xs">
                          <span className={`font-mono text-gr-xs font-bold ${step.color}`}>{step.number}</span>
                          <h3 className="text-gr-sm font-bold text-foreground leading-tight">{step.title}</h3>
                        </div>
                        <p className="text-gr-xs text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* ─── DESKTOP: alternating left/right layout ─── */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-gr-2xl">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <FadeIn
                  key={i}
                  direction={isLeft ? "right" : "left"}
                  delay={i * 100}
                  className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  {/* Timeline node */}
                  <div className={`absolute left-1/2 top-6 -translate-x-1/2 w-[21px] h-[21px] rounded-full border-2 ${step.borderColor} ${step.bgColor} flex items-center justify-center z-10`}>
                    <div className={`w-[8px] h-[8px] rounded-full ${step.dotColor}`} />
                  </div>

                  {/* Card — Golden Ratio: occupies 1/φ of the width */}
                  <div className={`w-[calc(50%-34px)] glass-card rounded-gr-lg border p-gr-xl group hover:${step.borderColor} hover:${step.glowColor} hover:shadow-premium-hover transition-all duration-500 hover:scale-[1.02]`}>
                    <div className="flex items-start gap-gr-md">
                      <div className={`w-[55px] h-[34px] rounded-gr ${step.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={18} className={step.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-gr-md mb-gr-sm">
                          <span className={`font-mono text-gr-xs font-bold ${step.color}`}>{step.number}</span>
                          <h3 className="text-gr-base font-bold text-foreground">{step.title}</h3>
                        </div>
                        <p className="text-gr-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
