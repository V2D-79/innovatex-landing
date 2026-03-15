import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ObjectivesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="objectives" className="section-padding bg-obsidian relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Our Mission</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-foreground">Core </span>
            <span className="text-gradient-violet">Objectives</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className={`glass-card rounded-2xl p-7 border group hover:border-primary/30 hover:${obj.glow} transition-all duration-500 hover:scale-[1.02] cursor-default ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className={`w-12 h-12 rounded-xl ${obj.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className={obj.color} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{obj.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{obj.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
