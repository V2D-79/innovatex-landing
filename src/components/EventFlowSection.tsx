import { motion } from "framer-motion";
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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Schedule</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-foreground">Event </span>
            <span className="text-gradient-violet">Flow</span>
          </h2>
        </motion.div>

        {/* ─── MOBILE: clean left-side vertical timeline ─── */}
        <div className="md:hidden relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-transparent" />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-[21px] top-4 w-3 h-3 rounded-full ${step.dotColor} ring-2 ring-obsidian`} />

                  {/* Card */}
                  <div className={`glass-card rounded-2xl border p-5 ${step.borderColor}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl ${step.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={18} className={step.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-mono text-xs font-bold ${step.color}`}>{step.number}</span>
                          <h3 className="text-sm font-bold text-foreground leading-tight">{step.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── DESKTOP: alternating left/right layout ─── */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  {/* Timeline node */}
                  <div className={`absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${step.borderColor} ${step.bgColor} flex items-center justify-center z-10`}>
                    <div className={`w-2 h-2 rounded-full ${step.dotColor}`} />
                  </div>

                  {/* Card */}
                  <div className={`w-[calc(50%-32px)] glass-card rounded-2xl border p-7 group hover:${step.borderColor} hover:${step.glowColor} transition-all duration-500 hover:scale-[1.02]`}>
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
