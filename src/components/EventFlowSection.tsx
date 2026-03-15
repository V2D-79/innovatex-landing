import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  },
];

export function EventFlowSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="event-flow" className="section-padding bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Schedule</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-foreground">Event </span>
            <span className="text-gradient-violet">Flow</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className={`relative flex ${isLeft ? "md:justify-start" : "md:justify-end"} justify-start`}
                >
                  {/* Timeline node */}
                  <div className={`absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${step.borderColor} ${step.bgColor} hidden md:flex items-center justify-center z-10`}>
                    <div className={`w-2 h-2 rounded-full`} style={{ background: `hsl(var(--${step.color.replace("text-", "")}))` }} />
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-32px)] glass-card rounded-2xl border p-7 group hover:${step.borderColor} hover:${step.glowColor} transition-all duration-500 hover:scale-[1.02]`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={20} className={step.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`font-mono text-xs font-bold ${step.color}`}>{step.number}</span>
                          <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
