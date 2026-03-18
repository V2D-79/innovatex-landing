import { motion } from "framer-motion";
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

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Judging</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-foreground">Evaluation </span>
            <span className="text-gradient-violet">Criteria</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            How we score your masterpiece. Build smart, present boldly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {criteria.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="glass-card rounded-2xl border p-6 text-center group hover:border-primary/30 hover:shadow-glow-violet transition-all duration-500 hover:scale-[1.04] cursor-default"
              >
                <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className={c.color} />
                </div>
                <div className="text-2xl font-black text-gradient-violet mb-2">{c.score}</div>
                <h3 className="text-sm font-bold text-foreground mb-2">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
