import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const rules = [
  "Each team must consist of 3 to 4 members.",
  "College ID Card is compulsory for all participants.",
  "Teams must register before the deadline.",
  "Teams must submit their idea & abstract before shortlisting.",
  "Only 15 teams will be shortlisted for the hackathon.",
  "Shortlisted teams must participate in the full 6-hour hackathon.",
  "All team members must attend the final presentation.",
  "The judges' decision will be final and binding.",
];

export function RulesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rules" className="section-padding bg-obsidian relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Guidelines</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-foreground">Rules & </span>
            <span className="text-gradient-violet">Regulations</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card rounded-3xl border p-8 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                  <ShieldCheck size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <span className="font-mono text-xs text-primary mr-2">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {rule}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
